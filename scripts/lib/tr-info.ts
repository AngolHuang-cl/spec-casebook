// Which TR a table was last tested on, and that TR's line as eCL shows it (user, 2026-11-24: sort features by TR and
// version). The TR comes from the table's own files: run-state.md and run folder names under runs/, and the top-level
// files of each ebugs/ batch; the newest TR code wins (codes are dated, TRyymmdd-nnnn). Its line comes from the IF3
// REST query TR.SP.GetOldTRData with the filing token (ECL_TOKEN, else ~/.ecl_token; never logged), looked up in the
// background and kept on this computer only (~/.casebook/tr-cache.json, never committed). The token reads every
// ticket with no permission filter, so only the TR's own short fields are kept.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { tableDir } from './library.ts';

const TR = /\bTR(\d{6})-(\d{4})\b/gi;
const CACHE = join(homedir(), '.casebook', 'tr-cache.json');
const FRESH_MS = 6 * 3600_000, RETRY_MS = 10 * 60_000;
const BASE = process.env.ECL_BASE ?? 'https://ecl.cyberlink.com';

export type TrInfo = { code: string; short?: string; build?: string; version?: string; status?: string; created?: string };
type Entry = TrInfo & { at: number; error?: string };

const names = (dir: string) => { try { return readdirSync(dir).sort(); } catch { return []; } };
const isDir = (p: string) => { try { return statSync(p).isDirectory(); } catch { return false; } };
const codes = (text: string) => [...text.matchAll(TR)].map(m => `TR${m[1]}-${m[2]}`);

// file contents, kept until the file changes (the navigation page asks on every view)
const memo = new Map<string, { key: string; codes: string[] }>();
function codesIn(file: string): string[] {
  let st; try { st = statSync(file); } catch { return []; }
  if (!st.isFile() || st.size > 2_000_000) return [];
  const key = `${st.mtimeMs}|${st.size}`, was = memo.get(file);
  if (was?.key === key) return was.codes;
  const found = codes(readFileSync(file, 'utf8')); memo.set(file, { key, codes: found }); return found;
}

/** The newest TR code the table's runs and eBug batches name, or ''. */
export function tableTr(feature: string, platform: string): string {
  const base = tableDir(feature, platform), found: string[] = [];
  const runs = join(base, 'runs');
  for (const n of names(runs)) if (!n.startsWith('_') && isDir(join(runs, n))) found.push(...codes(n), ...codesIn(join(runs, n, 'run-state.md')));
  const ebugs = join(base, 'ebugs');
  for (const b of names(ebugs)) if (isDir(join(ebugs, b))) for (const f of names(join(ebugs, b))) if (/\.(md|json)$/.test(f)) found.push(...codesIn(join(ebugs, b, f)));
  return found.sort().at(-1) ?? '';
}

let cache: Record<string, Entry> | null = null;
const load = () => cache ??= (() => { try { return JSON.parse(readFileSync(CACHE, 'utf8')); } catch { return {}; } })();
const save = () => { try { mkdirSync(join(homedir(), '.casebook'), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache, null, 1), { mode: 0o600 }); } catch {} };

function token(): string {
  const env = (process.env.ECL_TOKEN ?? '').trim();
  if (env) return env;
  try { return readFileSync(join(homedir(), '.ecl_token'), 'utf8').trim(); } catch { return ''; }
}

const pending = new Map<string, Promise<void>>();
async function fetchTr(code: string): Promise<void> {
  const t = token(), all = load();
  if (!t) { all[code] = { code, at: Date.now(), error: 'no token' }; return; }
  try {
    const r = await fetch(`${BASE}/IF3/tsr/api/public/Query/TR.SP.GetOldTRData`, {
      method: 'POST', signal: AbortSignal.timeout(30_000),
      headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ queryModel: 'TR.SP.GetOldTRData', pageIndex: 1, pageSize: 5, conditions: [{ field: 'TRCode', term: { query: code } }] }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const body: any = await r.json();
    const row = (body?.results ?? body?.data?.results ?? []).find((x: any) => String(x.TRCode).toUpperCase() === code);
    if (!row) { all[code] = { code, at: Date.now(), error: 'not found' }; return; }
    const short = String(row.ShortDescription ?? '').trim(), build = String(row.TRBuild ?? '').trim();
    all[code] = { code, at: Date.now(), short, build, status: String(row.Status ?? ''), created: String(row.CreateTime ?? '').slice(0, 10),
      version: (short.match(/\b\d+(?:\.\d+){2,3}\b/) ?? build.match(/\b\d+(?:\.\d+){2,3}\b/))?.[0] ?? '' };
  } catch (e) { all[code] = { ...all[code], code, at: Date.now(), error: String((e as Error).message ?? e).slice(0, 80) }; }
  finally { save(); }
}

/** What is known about a TR now; a missing or stale one is looked up in the background for the next view. */
export function trInfo(code: string): TrInfo | null {
  if (!code) return null;
  const e = load()[code], age = e ? Date.now() - e.at : Infinity;
  if ((!e || age > (e.error ? RETRY_MS : FRESH_MS)) && !pending.has(code)) pending.set(code, fetchTr(code).finally(() => pending.delete(code)));
  return e && !e.error ? { code, short: e.short, build: e.build, version: e.version, status: e.status, created: e.created } : { code };
}

export const trPending = () => pending.size;
