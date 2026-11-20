// Phone settings a row's fixture or setup needs, set by the run itself (user, 2026-11-18; AGENTS.md › Team preferences,
// "Phone settings for fixtures"): app notifications, the app's runtime permissions, and which folders the gallery
// (MediaStore) shows. Android only, over adb; the iOS equivalent is not scripted yet (run.md step 4).
// Every command that changes something reads the result back and exits 1 when it did not take; `status` changes nothing.
// Usage: node scripts/phone-settings.ts <command> <serial> [package] [args] [--feature <product>/<feature>]
//   notifications <serial> <package> off|on|status
//                             Android 13+: the POST_NOTIFICATIONS runtime permission (pm revoke / grant, flags user-set,
//                             and user-fixed while off so the app cannot pop its own request mid-row) plus the
//                             POST_NOTIFICATION app-op, so Settings › Apps › <app> › Notifications shows the same switch.
//                             Read back from dumpsys package, appops and dumpsys notification (AppSettings importance).
//                             Revoking a runtime permission kills the app's process: relaunch it after `off`.
//   permissions <serial> <package> grant-all | status
//                             grant every runtime (dangerous) permission the package requests (photos and videos in
//                             full, microphone…); permissions this Android no longer grants (READ/WRITE_EXTERNAL_STORAGE
//                             for an app targeting 33+) are listed as skipped, any other one left ungranted fails
//   gallery <serial> hide|restore|status [folder…]
//                             hide: move each /sdcard folder (or single video file, e.g. one straight in DCIM/) into /sdcard/.casebook-hidden/ (a dot folder with .nomedia,
//                             which MediaStore skips) and rescan, until MediaStore lists no video under it; restore: move
//                             it back to exactly where it was (refused if something is there now) and rescan until its
//                             videos are listed again; restore with no folder restores everything held. status: videos
//                             MediaStore sees in all and per top folder (or per folder given) and what is held.
//                             Folders: "00PDRa_Testing_Material", "/sdcard/DCIM/Camera" or "/storage/emulated/0/…".
// [package] may be left out with --feature <product>/<feature> (android.package in library/<product>/product.json) or
// CASEBOOK_ANDROID_PACKAGE. Restore what a row changed right after the row (run.md step 4).
// Exit codes: 0 done, 1 did not take, 2 usage, 75 phone not reachable over adb.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { BLOCKER, env } from './lib/device-common.ts';

const ANDROID_HOME = process.env.ANDROID_HOME ?? process.env.ANDROID_SDK_ROOT ?? join(homedir(), 'Library/Android/sdk');
const ADB = existsSync(join(ANDROID_HOME, 'platform-tools/adb')) ? join(ANDROID_HOME, 'platform-tools/adb') : 'adb';
const HOLD = '/sdcard/.casebook-hidden';
const EXT = '/storage/emulated/0';

const argv = process.argv.slice(2);
const fi = argv.indexOf('--feature');
const feature = fi >= 0 ? argv.splice(fi, 2)[1] : undefined;
const [cmd, serial, ...rest] = argv;
const usage = (msg?: string): never => {
  if (msg) console.error(msg);
  console.error('Usage: node scripts/phone-settings.ts notifications <serial> [package] off|on|status\n' +
    '       node scripts/phone-settings.ts permissions <serial> [package] grant-all|status\n' +
    '       node scripts/phone-settings.ts gallery <serial> hide|restore|status [folder…]\n' +
    '       [package] may be replaced by --feature <product>/<feature>');
  process.exit(2);
};
const fail = (msg: string): never => { console.error(`phone-settings: ${msg}`); process.exit(1); };
if (!cmd || !serial) usage();

function adb(args: string[], timeout = 60_000): string {
  return execFileSync(ADB, ['-s', serial, ...args], { encoding: 'utf8', timeout, maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
}
const sh = (line: string, timeout?: number) => adb(['shell', line], timeout);
// Like sh, but returns stdout+stderr and never throws (pm prints refusals on stderr with exit 255).
function shTry(line: string): { ok: boolean; out: string } {
  try { return { ok: true, out: sh(`${line} 2>&1`) }; } catch (e: any) { return { ok: false, out: `${e.stdout ?? ''}${e.stderr ?? ''}` || String(e.message) }; }
}
const q = (s: string) => `'${s.replace(/'/g, `'\\''`)}'`;
const pause = (sec: number) => execFileSync('sleep', [String(sec)]);

// The phone is there and authorized, or exit 75.
{
  let line = '';
  try { line = execFileSync(ADB, ['devices'], { encoding: 'utf8' }).split('\n').find(l => l.startsWith(`${serial}\t`)) ?? ''; } catch {}
  if (!/\tdevice$/.test(line.trim() ? line : '')) {
    console.error(`BLOCKER (device): adb does not see ${serial} as an authorized device (${line.trim() || 'absent'}). Plug it in by USB, unlock it and allow USB debugging.`);
    process.exit(BLOCKER);
  }
}
const sdk = Number(sh('getprop ro.build.version.sdk').trim());

function packageArg(args: string[]): [string, string[]] {
  if (args[0] && /^[a-z][\w]*(\.[\w]+)+$/i.test(args[0])) return [args[0], args.slice(1)];
  const fromEnv = env('ANDROID_PACKAGE');
  if (fromEnv) return [fromEnv, args];
  if (feature) {
    const product = feature.split('/')[0];
    const file = join(import.meta.dirname, '..', 'library', product, 'product.json');
    const pkg = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8'))?.android?.package : undefined;
    if (!pkg) usage(`No android.package in ${file}`);
    return [pkg, args];
  }
  return usage('Give the package, or --feature <product>/<feature>.');
}

// Runtime permissions as dumpsys package lists them: name → granted, flags.
function runtimePerms(pkg: string): Map<string, { granted: boolean; flags: string }> {
  const out = sh(`dumpsys package ${pkg}`);
  if (!out.includes(`Package [${pkg}]`)) fail(`${pkg} is not installed on ${serial}`);
  const m = new Map<string, { granted: boolean; flags: string }>();
  const sec = out.split(/runtime permissions:/)[1] ?? '';
  for (const l of sec.split('\n').slice(1)) {
    const r = /^\s+([\w.]+): granted=(true|false)(?:, flags=\[\s*([^\]]*)\])?/.exec(l);
    if (!r) break;
    m.set(r[1], { granted: r[2] === 'true', flags: (r[3] ?? '').trim() });
  }
  return m;
}

// ---- notifications ------------------------------------------------------------------------------------------------
const NOTIF = 'android.permission.POST_NOTIFICATIONS';
function notifState(pkg: string) {
  const p = runtimePerms(pkg).get(NOTIF);
  const op = /POST_NOTIFICATION: (\w+)/.exec(shTry(`appops get ${pkg} POST_NOTIFICATION`).out)?.[1] ?? 'default';
  const imp = new RegExp(`AppSettings: ${pkg.replace(/\./g, '\\.')} \\(\\d+\\) importance=(\\w+)`).exec(sh('dumpsys notification'))?.[1] ?? 'unlisted';
  return { granted: p?.granted ?? false, flags: p?.flags ?? '', op, imp, line: `notifications ${p?.granted ? 'on' : 'off'} · ${NOTIF.split('.').pop()} granted=${p?.granted ?? 'not requested'} [${p?.flags ?? ''}] · app-op ${op} · channel importance ${imp}` };
}
function notifications(args: string[]) {
  const [pkg, [want]] = packageArg(args);
  if (!['on', 'off', 'status'].includes(want)) usage('notifications … off|on|status');
  if (sdk < 33) fail(`Android SDK ${sdk}: notifications are a runtime permission only on Android 13+; not scripted below that`);
  if (!runtimePerms(pkg).has(NOTIF) && want !== 'status') fail(`${pkg} does not request ${NOTIF}`);
  if (want === 'status') { console.log(notifState(pkg).line); return; }
  if (want === 'off') {
    shTry(`pm revoke ${pkg} ${NOTIF}`);
    shTry(`pm set-permission-flags ${pkg} ${NOTIF} user-set user-fixed`);
    shTry(`appops set ${pkg} POST_NOTIFICATION ignore`);
  } else {
    shTry(`pm clear-permission-flags ${pkg} ${NOTIF} user-fixed`);
    shTry(`pm grant ${pkg} ${NOTIF}`);
    shTry(`pm set-permission-flags ${pkg} ${NOTIF} user-set`);
    shTry(`appops set ${pkg} POST_NOTIFICATION allow`);
  }
  // The notification service follows the permission asynchronously: give it a few seconds.
  let s = notifState(pkg);
  for (let i = 0; i < 6; i++) {
    const permOk = s.granted === (want === 'on');
    const opOk = want === 'on' ? s.op !== 'ignore' && s.op !== 'deny' : s.op !== 'allow';
    const impOk = s.imp === 'unlisted' || (want === 'off') === (s.imp === 'NONE');
    if (permOk && opOk && impOk) { console.log(s.line); return; }
    pause(1); s = notifState(pkg);
  }
  fail(`notifications did not turn ${want}: ${s.line}`);
}

// ---- permissions --------------------------------------------------------------------------------------------------
// Refusals that mean "this Android does not grant it to this app", not "the grant failed".
const NOT_GRANTABLE = /not a changeable permission type|has not requested|Unknown permission|hard restricted|is not a runtime|SecurityException/i;
function permissions(args: string[]) {
  const [pkg, [want]] = packageArg(args);
  if (!['grant-all', 'status'].includes(want)) usage('permissions … grant-all|status');
  const show = (m: Map<string, { granted: boolean; flags: string }>) =>
    [...m].map(([n, v]) => `  ${v.granted ? 'granted ' : 'DENIED  '} ${n}${v.flags ? ` [${v.flags}]` : ''}`).join('\n');
  if (want === 'status') { console.log(`${pkg} runtime permissions:\n${show(runtimePerms(pkg))}`); return; }
  const skipped: string[] = [];
  for (const [name, v] of runtimePerms(pkg)) {
    if (v.granted) continue;
    if (name === NOTIF) shTry(`pm clear-permission-flags ${pkg} ${NOTIF} user-fixed`);
    const r = shTry(`pm grant ${pkg} ${name}`);
    if (!r.ok || /Exception|Error/.test(r.out)) {
      if (NOT_GRANTABLE.test(r.out)) skipped.push(`${name} (${r.out.split('\n').find(l => NOT_GRANTABLE.test(l))?.trim().slice(0, 140)})`);
      continue;
    }
    shTry(`pm set-permission-flags ${pkg} ${name} user-set`);
    if (name === NOTIF) shTry(`appops set ${pkg} POST_NOTIFICATION allow`);
  }
  const after = runtimePerms(pkg);
  // Storage permissions are no-ops for an app targeting Android 13+ on Android 13+: the system keeps them denied.
  const obsolete = (n: string) => sdk >= 33 && /^android\.permission\.(READ|WRITE)_EXTERNAL_STORAGE$/.test(n);
  const left = [...after].filter(([n, v]) => !v.granted && !obsolete(n) && !skipped.some(s => s.startsWith(`${n} `)));
  for (const [n, v] of after) if (!v.granted && obsolete(n) && !skipped.some(s => s.startsWith(`${n} `))) skipped.push(`${n} (not granted on Android 13+ to apps targeting 33+)`);
  console.log(`${pkg} runtime permissions:\n${show(after)}`);
  if (skipped.length) console.log(`skipped (this Android does not grant them):\n  ${skipped.join('\n  ')}`);
  if (left.length) fail(`still denied: ${left.map(([n]) => n).join(', ')}`);
  console.log('grant-all: every grantable runtime permission is granted');
}

// ---- gallery ------------------------------------------------------------------------------------------------------
const norm = (f: string) => {
  const rel = f.replace(/^\/(sdcard|storage\/emulated\/0)\/?/, '').replace(/\/+$/, '');
  if (!rel || rel.startsWith('.casebook-hidden') || rel.includes('..')) usage(`Not a folder under /sdcard: ${f}`);
  return rel;
};
const heldName = (rel: string) => rel.replace(/\//g, '__');
function mediaVideos(): string[] {
  const out = shTry('content query --uri content://media/external/video/media --projection _data').out;
  return [...out.matchAll(/_data=(.*)$/gm)].map(m => m[1].trim());
}
// A held path may be a folder or a single video file (a video straight in DCIM/ that no subfolder holds).
const under = (paths: string[], rel: string) => paths.filter(p => p === `${EXT}/${rel}` || p.startsWith(`${EXT}/${rel}/`)).length;
const exists = (p: string) => shTry(`[ -e ${q(p)} ] && echo yes`).out.trim() === 'yes';
function held(): { name: string; path: string; videos: number; at: string }[] {
  const out = shTry(`for f in ${HOLD}/*.json; do [ -f "$f" ] && cat "$f" && echo; done`).out;
  return out.split('\n').filter(l => l.trim().startsWith('{')).map(l => JSON.parse(l));
}
function rescan(paths: string[]) {
  // MediaProvider rescans the whole primary volume on this call (shell may do it on Android 11+); the per-folder
  // broadcasts are the fallback for builds where the call is refused.
  shTry('content call --uri content://media --method scan_volume --arg external_primary');
  for (const p of paths) shTry(`am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d ${q(`file://${p}`)}`);
}
function waitMedia(ok: (paths: string[]) => boolean, sec = 60): string[] {
  let paths = mediaVideos();
  for (let t = 0; t < sec && !ok(paths); t += 2) { pause(2); paths = mediaVideos(); }
  return paths;
}
function gallery(args: string[]) {
  const [want, ...folders] = args;
  if (!['hide', 'restore', 'status'].includes(want)) usage('gallery … hide|restore|status [folder…]');
  const rels = folders.map(norm);
  if (want === 'status') {
    const paths = mediaVideos(), h = held();
    console.log(`MediaStore videos: ${paths.length}`);
    if (rels.length) for (const r of rels) console.log(`  ${under(paths, r)}  /sdcard/${r}${exists(`/sdcard/${r}`) ? '' : ' (folder not there)'}`);
    else {
      const per = new Map<string, number>();
      for (const p of paths) { const top = p.startsWith(`${EXT}/`) ? p.slice(EXT.length + 1).split('/').slice(0, -1).slice(0, 2).join('/') || '(root)' : p.split('/').slice(0, 4).join('/'); per.set(top, (per.get(top) ?? 0) + 1); }
      for (const [k, n] of [...per].sort((a, b) => b[1] - a[1])) console.log(`  ${n}  ${k}`);
    }
    console.log(h.length ? `held in ${HOLD}:\n${h.map(x => `  /sdcard/${x.path} (${x.videos} videos, hidden ${x.at})`).join('\n')}` : `nothing held in ${HOLD}`);
    return;
  }
  if (want === 'hide') {
    if (!rels.length) usage('gallery hide needs at least one folder');
    shTry(`mkdir -p ${HOLD} && touch ${HOLD}/.nomedia`);
    const before = mediaVideos();
    for (const r of rels) {
      const src = `/sdcard/${r}`, dst = `${HOLD}/${heldName(r)}`;
      if (!exists(src)) fail(`hide: ${src} does not exist`);
      if (exists(dst)) fail(`hide: ${dst} is already held; restore it first`);
      const rec = JSON.stringify({ name: heldName(r), path: r, videos: under(before, r), at: new Date().toISOString() });
      const mv = shTry(`mv ${q(src)} ${q(dst)} && echo ${q(rec)} > ${q(`${dst}.json`)} && echo moved`);
      if (!mv.out.includes('moved') || exists(src) || !exists(dst)) fail(`hide: moving ${src} failed: ${mv.out.trim()}`);
    }
    rescan(rels.map(r => `${EXT}/${r}`));
    const after = waitMedia(p => rels.every(r => under(p, r) === 0));
    const still = rels.filter(r => under(after, r) > 0);
    for (const r of rels) console.log(`hidden /sdcard/${r}: MediaStore lists ${under(after, r)} videos there (was ${under(before, r)})`);
    console.log(`MediaStore videos: ${after.length} (was ${before.length})`);
    if (still.length) fail(`MediaStore still lists videos under ${still.join(', ')} (the folders are moved; restore puts them back)`);
    return;
  }
  // restore
  const h = held();
  const todo = rels.length ? rels.map(r => h.find(x => x.path === r) ?? fail(`restore: /sdcard/${r} is not held in ${HOLD}`)) : h;
  if (!todo.length) { console.log(`nothing held in ${HOLD}`); return; }
  for (const x of todo) {
    const src = `${HOLD}/${x.name}`, dst = `/sdcard/${x.path}`;
    if (exists(dst)) fail(`restore: ${dst} exists again; move it away first (held copy stays in ${src})`);
    const mv = shTry(`mkdir -p ${q(dst.replace(/\/[^/]+$/, ''))} && mv ${q(src)} ${q(dst)} && rm -f ${q(`${src}.json`)} && echo moved`);
    if (!mv.out.includes('moved') || !exists(dst)) fail(`restore: moving ${src} back failed: ${mv.out.trim()}`);
  }
  rescan(todo.map(x => `${EXT}/${x.path}`));
  const after = waitMedia(p => todo.every(x => under(p, x.path) >= x.videos));
  for (const x of todo) console.log(`restored /sdcard/${x.path}: MediaStore lists ${under(after, x.path)} videos there (${x.videos} when hidden)`);
  const short = todo.filter(x => under(after, x.path) < x.videos);
  if (short.length) fail(`MediaStore lists fewer videos than before under ${short.map(x => x.path).join(', ')} (files are back; a rescan may still be running)`);
}

switch (cmd) {
  case 'notifications': notifications(rest); break;
  case 'permissions': permissions(rest); break;
  case 'gallery': gallery(rest); break;
  default: usage(`Unknown command ${cmd}`);
}
