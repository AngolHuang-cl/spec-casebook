// Watch a run folder while a segment runs elsewhere (a subagent or worker session) and exit only when the segment is
// done or has stalled. It is a plain OS loop that reads file times, so it uses no model tokens while it waits; the
// orchestrator starts it as a background command next to each segment and is woken when it exits (user, 2026-11-23).
// Usage:
//   node scripts/run-watchdog.ts <run dir> [--stall-min 20] [--every 60] [--max-hours 8] [--also <path>]...
// Exits:
//   0  DONE     a new checkpoint appeared in run-state.md (the segment finished)
//   3  STALL    nothing in the run folder changed for --stall-min minutes (a waitfor with a longer --timeout, the
//               last line of activity.log, extends the allowance to that timeout plus 5 minutes)
//   4  TIMEOUT  --max-hours passed with neither
//   2  usage error
// Activity is the newest modification time of any file in the run folder (activity.log, run-state.md, results.csv,
// screenshots, files…) and of each --also path (e.g. the segment subagent's transcript). logs/ is stat'ed but not
// walked, so the live logcat capture (logs/.live/) never counts as activity.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name: string, def: number) => { const i = args.indexOf(name); if (i < 0) return def; const v = Number(args.splice(i, 2)[1]); if (!(v > 0)) usage(); return v; };
function usage(): never { console.error('Usage: node scripts/run-watchdog.ts <run dir> [--stall-min 20] [--every 60] [--max-hours 8] [--also <path>]...'); process.exit(2); }
const also: string[] = [];
for (let i; (i = args.indexOf('--also')) >= 0;) { const p = args.splice(i, 2)[1]; if (!p) usage(); also.push(p); }
const stallMin = opt('--stall-min', 20), every = opt('--every', 60), maxHours = opt('--max-hours', 8);
const runDir = args[0];
if (!runDir || args.length > 1 || !existsSync(runDir)) usage();

const STATE = join(runDir, 'run-state.md'), ACTIVITY = join(runDir, 'activity.log');
const checkpoints = () => { try { return readFileSync(STATE, 'utf8').split('\n### ').length - 1; } catch { return 0; } };
const mtime = (p: string) => { try { return statSync(p).mtimeMs; } catch { return 0; } };

function newest(dir: string): number {
  let t = mtime(dir);
  let entries; try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return t; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) t = Math.max(t, e.name === 'logs' && dir === runDir ? mtime(p) : newest(p));
    else t = Math.max(t, mtime(p));
  }
  return t;
}
const activity = () => Math.max(newest(runDir), ...also.map(p => { try { return statSync(p).isDirectory() ? newest(p) : mtime(p); } catch { return 0; } }));

function lastLine(): string {
  try { const s = readFileSync(ACTIVITY, 'utf8').trimEnd(); return s.slice(s.lastIndexOf('\n') + 1); } catch { return ''; }
}
// A long wait the segment asked for: `waitfor … --timeout S` as the last command.
function allowanceMs(line: string): number {
  const base = stallMin * 60_000, m = / waitfor\b.*--timeout\s+(\d+)/.exec(line);
  return m ? Math.max(base, (Number(m[1]) + 300) * 1000) : base;
}
const fmt = (ms: number) => new Date(ms).toISOString().replace(/\.\d+Z$/, 'Z');

const start = Date.now(), startCheckpoints = checkpoints();
console.log(`watching ${runDir}: stall after ${stallMin} min without activity, check every ${every} s, give up after ${maxHours} h`);

function tick() {
  const now = Date.now();
  if (checkpoints() > startCheckpoints) {
    const st = readFileSync(STATE, 'utf8');
    console.log(`DONE ${runDir}: new checkpoint ${st.slice(st.lastIndexOf('\n### ') + 5).split('\n')[0]}`);
    process.exit(0);
  }
  // Idle time counts from the watchdog's start at the earliest: the folder may have been quiet between segments.
  const last = activity(), line = lastLine(), idle = now - Math.max(last, start);
  if (idle > allowanceMs(line)) {
    console.log(`STALL ${runDir}: no activity for ${Math.round(idle / 60_000)} min (last change ${fmt(last)}; last command: ${line || 'none'}).`);
    console.log(`Check usage first (a usage-limit wait looks the same), then stop the segment and resume with: node scripts/run-log.ts ${runDir} next`);
    process.exit(3);
  }
  if (now - start > maxHours * 3_600_000) {
    console.log(`TIMEOUT ${runDir}: ${maxHours} h with no new checkpoint (activity is still moving: last change ${fmt(last)}).`);
    process.exit(4);
  }
  setTimeout(tick, every * 1000);
}
tick();
