// The current status of eBugs the casebook filed, read from eCL on request (user, 2026-11-25: the Dashboard shows the
// bugs still open beside the ones filed, with a Refresh button). One IF3 REST query per bug code (TSR.EbugSearch,
// BugCode term; the endpoint takes no list of codes) with the filing token (ECL_TOKEN, else ~/.ecl_token; never
// logged). Only the status is kept, on this computer (~/.casebook/ebug-status.json, never committed): the token reads
// every ticket with no permission filter. Reading only: nothing is written to a ticket (AGENTS.md, No comments on
// existing eBugs).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CACHE = join(homedir(), '.casebook', 'ebug-status.json');
const BASE = process.env.ECL_BASE ?? 'https://ecl.cyberlink.com';
// Statuses that mean the bug is finished (ebug-tr-filer ecl_query.py CLOSED); everything else is still open
const CLOSED = new Set(['close', 'closed', 'cancelled', 'canceled', 'nab', "won't fix", 'wont fix', 'notreproducible', 'creatorclose', 'external issue']);
export const isOpenStatus = (status: string) => !CLOSED.has(status.trim().toLowerCase());

type Entry = { status: string; at: number };
let cache: Record<string, Entry> | null = null;
const load = () => cache ??= (() => { try { return JSON.parse(readFileSync(CACHE, 'utf8')); } catch { return {}; } })();
const save = () => { try { mkdirSync(join(homedir(), '.casebook'), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache, null, 1), { mode: 0o600 }); } catch {} };
function token(): string {
  const env = (process.env.ECL_TOKEN ?? '').trim();
  if (env) return env;
  try { return readFileSync(join(homedir(), '.ecl_token'), 'utf8').trim(); } catch { return ''; }
}

/** What eCL said about a bug the last time it was asked, or null. */
export const bugStatus = (code: string): Entry | null => load()[code] ?? null;

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
// eCL's query endpoints share one rate bucket (about 25 calls in a burst): one call at a time, spaced, and a 429 (refused
// before processing) waits and tries again, as ecl_if3.py does
const SPACING_MS = 1200, BACKOFF_MS = 15_000, TRIES = 4, FRESH_MS = 15 * 60_000;
async function fetchOne(code: string, t: string): Promise<void> {
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(`${BASE}/IF3/tsr/api/public/Query/TSR.EbugSearch`, {
      method: 'POST', signal: AbortSignal.timeout(30_000),
      headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ queryModel: 'TSR.EbugSearch', pageIndex: 1, pageSize: 5, conditions: [{ field: 'BugCode', term: { query: code } }] }),
    });
    if (r.status === 429 && attempt < TRIES - 1) { await wait(BACKOFF_MS * (attempt + 1)); continue; }
    if (!r.ok) throw new Error(r.status === 429 ? 'eCL is rate limiting (HTTP 429); try again in a minute' : `eCL answered HTTP ${r.status}`);
    const body: any = await r.json();
    const row = (body?.results ?? body?.data?.results ?? []).find((x: any) => String(x.BugCode).toUpperCase() === code.toUpperCase());
    if (row) load()[code] = { status: String(row.Status ?? ''), at: Date.now() };
    return;
  }
}

let busy: Promise<unknown> | null = null;
/** Ask eCL for these bugs' statuses now: those never read first, then the oldest readings; one read within the last 15
 *  minutes is kept. One refresh runs at a time, and it stops at the first error (what was read is kept). */
export async function refreshBugs(codes: string[]): Promise<{ asked: number; read: number; fresh: number; error?: string }> {
  const t = token(), all = [...new Set(codes)];
  if (!t) return { asked: all.length, read: 0, fresh: 0, error: 'No eCL token on this computer (ECL_TOKEN or ~/.ecl_token).' };
  while (busy) await busy.catch(() => {});
  const list = all.filter(c => Date.now() - (load()[c]?.at ?? 0) > FRESH_MS).sort((a, b) => (load()[a]?.at ?? 0) - (load()[b]?.at ?? 0));
  let read = 0, error = '';
  const run = (async () => { for (const c of list) { try { await fetchOne(c, t); read++; } catch (e) { error = String((e as Error).message ?? e).slice(0, 120); break; } await wait(SPACING_MS); } })();
  busy = run;
  try { await run; } finally { busy = null; save(); }
  return { asked: all.length, read, fresh: all.length - list.length, ...(error ? { error } : {}) };
}
