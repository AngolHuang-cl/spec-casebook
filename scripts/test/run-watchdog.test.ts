import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { appendFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SCRIPT = join(import.meta.dirname, '..', 'run-watchdog.ts');
const run = (dir: string, extra: string[]) => new Promise<{ code: number | null; out: string }>(ok => {
  const p = spawn(process.execPath, [SCRIPT, dir, '--every', '0.2', ...extra]); let out = '';
  p.stdout.on('data', d => out += d); p.on('close', code => ok({ code, out }));
});
const runDir = () => { const d = mkdtempSync(join(tmpdir(), 'watchdog-')); writeFileSync(join(d, 'run-state.md'), '# Run\n\n## Checkpoints\n\n### 2026-11-23T00:00:00Z · next TC-001 (A)\n{}\n'); return d; };

test('exits 3 when nothing changes', async () => {
  const r = await run(runDir(), ['--stall-min', '0.02']);
  assert.equal(r.code, 3); assert.match(r.out, /^STALL /m);
});

test('exits 0 on a new checkpoint', async () => {
  const d = runDir(); const p = run(d, ['--stall-min', '1']);
  setTimeout(() => appendFileSync(join(d, 'run-state.md'), '\n### 2026-11-23T01:00:00Z · next TC-010 (B)\n{}\n'), 500);
  const r = await p; assert.equal(r.code, 0); assert.match(r.out, /DONE .*next TC-010/);
});

test('activity keeps it waiting; live logcat does not', async () => {
  const d = runDir(); mkdirSync(join(d, 'logs', '.live'), { recursive: true });
  const t0 = Date.now(), p = run(d, ['--stall-min', '0.03']);   // 1.8 s
  const iv = setInterval(() => appendFileSync(join(d, 'activity.log'), `${new Date().toISOString()} tap x\n`), 300);
  setTimeout(() => clearInterval(iv), 2500);
  const live = setInterval(() => appendFileSync(join(d, 'logs', '.live', 'logcat.txt'), 'line\n'), 200);
  const r = await p; clearInterval(live);
  assert.equal(r.code, 3); assert.ok(Date.now() - t0 > 3500, 'stalled only after activity stopped');
});

test('a long waitfor extends the allowance', async () => {
  const d = runDir(); writeFileSync(join(d, 'activity.log'), `${new Date().toISOString()} waitfor Done|Failed --timeout 1\n`);
  const t0 = Date.now(), r = await run(d, ['--stall-min', '0.01', '--max-hours', '0.0015']);   // 0.6 s stall, 5.4 s cap
  // allowance = (1 + 300) s, so the cap ends it, not a stall
  assert.equal(r.code, 4); assert.ok(Date.now() - t0 > 5000);
});
