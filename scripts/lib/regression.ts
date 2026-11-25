// Which tables are in the regression suite, i.e. converted to AT (automated test) (user, 2026-11-25). The mark lives
// in library/<product>/<feature>/regression.json ({ "<platform>": { "since": "YYYY-MM-DD", "note"? } }) and is
// committed, so every computer's Dashboard shows the same. A table without it is waiting for its conversion.
// Written by scripts/regression.ts and by the Dashboard's AT button (scripts/pages.ts, this computer only).
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { LIBRARY, assertIds, tableDir, writeJson } from './library.ts';

export type AtMark = { since: string; note?: string };
const fileOf = (feature: string) => join(LIBRARY, feature, 'regression.json');
export function readRegression(feature: string): Record<string, AtMark> {
  try { return existsSync(fileOf(feature)) ? JSON.parse(readFileSync(fileOf(feature), 'utf8')) : {}; } catch { return {}; }
}
/** Today in Taipei, the date a mark gets when none is given. */
export const taipeiToday = () => new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);

/** Mark a table as in regression (AT), or take the mark off. */
export function setRegression(feature: string, platform: string, on: boolean, opts: { since?: string; note?: string } = {}): AtMark | null {
  assertIds(feature, platform);
  if (!existsSync(tableDir(feature, platform))) throw new Error(`No ${platform} table for ${feature}`);
  const since = opts.since ?? taipeiToday();
  if (!/^\d{4}-\d\d-\d\d$/.test(since)) throw new Error('since takes YYYY-MM-DD');
  const all = readRegression(feature);
  if (on) all[platform] = { since, ...(opts.note?.trim() ? { note: opts.note.trim() } : {}) }; else delete all[platform];
  if (Object.keys(all).length) writeJson(fileOf(feature), all); else rmSync(fileOf(feature), { force: true });
  return all[platform] ?? null;
}
