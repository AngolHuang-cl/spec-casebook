// Writes phases.json for both AIGC Watermark drafts from their draft.csv (run after build-draft.ts).
// Usage (repo root): node library/pdr/aigc-watermark/ios/drafts/20261117-102349/build-phases.ts
// Segments follow the journey and reuse one generation per feature: generate once, Save with the switch Off, Save
// again with it On, read both files' C2PA, then move on. One-way states (「Don’t show again」 ×2, the fresh-install
// default) run last (analysis.md, coverage rule 9).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRAFTS = { ios: ['library/pdr/aigc-watermark/ios/drafts/20261117-102349', '20261117-102349'], android: ['library/pdr/aigc-watermark/android/drafts/20261117-102353', '20261117-102353'] } as const;

function parseCsv(t: string): string[][] {
  const out: string[][] = []; let row: string[] = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"' && t[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); out.push(row); row = []; f = ''; } else f += c;
  }
  return out;
}

const SEGS = [
  ['a', 'Settings: the switch row, tiers, ⓘ sheet, persistence', 'Free tier first, then each paid tier; restore the tier at the end. Leave the switch Off when done.'],
  ['b', 'Image results: Text to Image (portrait, landscape, square), AI Art, image C2PA, re-save', 'One Text to Image generation per aspect ratio; each result is saved Off, then On. Keep the files for c2patool.'],
  ['c', 'Image to Video: tile → list → View, Save Off / On, Share, already-saved files, C2PA per model', 'One generation per model the build offers (n/a for a model it lacks). The Save Off / On files of the first model feed the already-saved rows.'],
  ['d', 'Other video results: Video Edit by Chat, Cinematic Reel Creator, Character Motion Swap, Video Object Removal, AI Storytelling, AI Anime Video, Talking Avatar', 'One generation per feature (per model where a C2PA row names one).'],
  ['e', 'Text to Video: portrait / landscape label size, Save Off / On, C2PA per model', ''],
  ['f', 'Music Generator: dialog, Cancel, Generate, spoken clip (Preview, Download, timeline, export), languages, C2PA', 'Language rows switch the app language and restore it after the segment.'],
  ['g', 'Editor: TTS, Voice Changer, AI Anime, AI Cartoon, AI Sketch on the timeline, export dialog, project export rules', 'One project per tool; reuse it for preview, export Off and export On.'],
  ['h', 'One-way states last: music and export 「Don’t show again」, default on a fresh install', 'Each row here leaves a state the UI cannot undo; the default row resets the app (Android pm clear) and runs very last.'],
] as const;

for (const [p, [dir, id]] of Object.entries(DRAFTS)) {
  const rows = parseCsv(readFileSync(join(dir, 'draft.csv'), 'utf8')).slice(1).filter(r => r[0]);
  const seg = (r: string[]): string => {
    const [ , sec, pre, act, , , refs] = r, all = pre + act;
    const rs = refs.split(/,\s*/);
    if (rs.some(x => ['R-009', 'R-030', 'R-046'].includes(x))) return 'h';
    if (sec === 'Settings entry' || (sec === 'Android system Back' && /info sheet/.test(pre))) return 'a';
    if (sec === 'Music Generator (pure audio)' || /Music Generator|music|song/i.test(all)) return 'f';
    if (sec === 'Editor — AI content on the timeline' || sec === 'Export dialog' || (sec === 'Android system Back' && /export/.test(pre)) || /project with/i.test(pre)) return 'g';
    if (/Text to Image|AI Art/.test(all)) return 'b';
    if (/Image to Video/.test(all) || sec === 'Already-saved content') return 'c';
    if (/Text to Video/.test(all)) return 'e';
    return 'd';
  };
  const bySeg: Record<string, string[]> = {};
  for (const r of rows) (bySeg[seg(r)] ??= []).push(r[0]);
  const needs: Record<string, string[]> = {};
  for (const r of rows) {
    const n: string[] = [];
    const all = r[2] + r[3];
    if (/Generate|result|song|AI Anime|AI Cartoon|AI Sketch|Text to Speech|Voice Changer/.test(all) && !/^Settings/.test(r[1])) n.push('credits');
    if (/Instagram/.test(all)) n.push('share-app');
    if (/c2patool|Content Credentials/.test(all)) n.push('c2pa-tool');
    if (/App language/.test(r[2])) n.push('app-language');
    if (/Fresh install/.test(r[2])) n.push('fresh-install');
    if (/Find a way to read the generated asset/.test(r[3])) n.push('observability-asset');
    if (n.length) needs[r[0]] = [...new Set(n)];
  }
  const unavailable: Record<string, string> = {
    'observability-asset': 'observability: a timeline tool\'s generated asset stays inside the project; no file to read its C2PA manifest from (Q-13)',
    ...(p === 'ios' ? { 'fresh-install': 'PowerDirector cannot be reinstalled on the QA iPhone (AGENTS.md, until lifted)' } : {}),
  };
  const phases = {
    draft: id, current: ['R1'], needs, unavailable,
    phases: [{
      id: 'R1', name: `Full run of the draft (${p})`, round: true,
      note: 'Every saved or exported file is copied to the computer and checked there: frames at 0.0 / 1.9 / 2.1 s with ffmpeg, the label size in pixels on the full-resolution file, C2PA with c2patool. Read the switch at every segment start and record it. Never post to Instagram.',
      segments: SEGS.filter(([s]) => bySeg[s]?.length).map(([s, name, note]) => ({ id: `R1-${s}`, name, ...(note ? { note } : {}), cases: bySeg[s] })),
    }],
  };
  writeFileSync(join(dir, 'phases.json'), JSON.stringify(phases, null, 2) + '\n');
  console.log(p, Object.fromEntries(Object.entries(bySeg).map(([k, v]) => [k, v.length])), 'rows', rows.length);
}
