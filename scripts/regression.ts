// Mark a table as in the regression suite (converted to AT, automated test), or take the mark off (user, 2026-11-25).
// The Dashboard (scripts/pages.ts, first page) lists marked features under 「Regression (AT)」; every other table is
// waiting for its conversion. The same can be done on the Dashboard itself (the AT button on each table, this computer
// only). The mark is library/<product>/<feature>/regression.json (lib/regression.ts), committed.
// Usage: node scripts/regression.ts                                   list every table and its state
//        node scripts/regression.ts <product>/<feature> <ios|android|both> [--since YYYY-MM-DD] [--note "<where the AT lives>"]
//        node scripts/regression.ts <product>/<feature> <ios|android|both> --off
import { existsSync } from 'node:fs';
import { PLATFORMS, arg, listFeatures, tableDir } from './lib/library.ts';
import { readRegression, setRegression } from './lib/regression.ts';

const [feature, which] = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && !['--since', '--note'].includes(all[i - 1]));
const tables = (f: string) => PLATFORMS.filter(p => existsSync(tableDir(f, p)));

if (!feature) {
  for (const f of listFeatures()) for (const p of tables(f)) {
    const r = readRegression(f)[p];
    console.log(`${f} ${p}: ${r ? `in regression (AT) since ${r.since}${r.note ? ` — ${r.note}` : ''}` : 'waiting for AT'}`);
  }
} else {
  const platforms = which === 'both' ? tables(feature) : [which];
  if (!platforms.length) { console.error(`No table under library/${feature}/`); process.exit(1); }
  const off = process.argv.includes('--off');
  try {
    for (const p of platforms) {
      const m = setRegression(feature, p, !off, { since: arg('since'), note: arg('note') });
      console.log(`${feature} ${p}: ${m ? `in regression (AT) since ${m.since}` : 'waiting for AT (mark removed)'}`);
    }
  } catch (e: any) { console.error(e?.message ?? String(e)); process.exit(1); }
}
