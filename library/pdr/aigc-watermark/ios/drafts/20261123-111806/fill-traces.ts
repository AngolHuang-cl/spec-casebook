// Fills annotation-trace.json and control-trace.json of both AIGC Watermark drafts (run after build-draft.ts,
// annotations.ts and controls.ts). Rows are found by the requirements they cite, so a rebuild keeps the traces right.
// Usage (repo root): node library/pdr/aigc-watermark/ios/drafts/20261117-102349/fill-traces.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRAFTS = { ios: 'library/pdr/aigc-watermark/ios/drafts/20261117-102349', android: 'library/pdr/aigc-watermark/android/drafts/20261117-102353' };

function parseCsv(t: string): string[][] {
  const out: string[][] = []; let row: string[] = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"' && t[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); out.push(row); row = []; f = ''; } else f += c;
  }
  if (f || row.length) { row.push(f); out.push(row); }
  return out;
}

const ANN: Record<string, string> = {
  'd-aigc-settings@1256,264': 'R-013',
  'd-aigc-settings@1979,264': 'R-014',
  'pm-export@37,39': 'label: board title',
  'pm-export@672,432': 'R-043',
  'pm-export@832,602': 'R-044',
  'pm-music@37,44': 'R-027, R-031',
  'pm-music@582,289': 'R-027',
  'pm-music@1092,289': 'R-029',
  'pm-music@320,292': 'ui: AI Music Generator credit pill (Music Generator feature)',
  'pm-music@830,292': 'ui: AI Music Generator credit pill (Music Generator feature)',
  'pm-music@1340,292': 'ui: AI Music Generator credit pill (Music Generator feature)',
  'pm-music@353,505': 'ui: AI Music Generator genre chips (Music Generator feature)',
  'pm-music@863,505': 'ui: AI Music Generator genre chips (Music Generator feature)',
  'pm-music@1373,505': 'ui: AI Music Generator genre chips (Music Generator feature)',
  'pm-music@158,595': 'ui: AI Music Generator form (Music Generator feature)',
  'pm-music@723,629': 'R-027',
  'pm-music@1233,629': 'R-029',
  'pm-music@337,952': 'ui: AI Music Generator length and count sliders (Music Generator feature)',
  'pm-music@847,952': 'ui: AI Music Generator length and count sliders (Music Generator feature)',
  'pm-music@1360,999': 'ui: AI Music Generator length and count sliders (Music Generator feature)',
  'pm-rules@76,94': 'R-012, R-014, R-015, R-017',
  'pm-rules@484,479': 'R-018, R-019, R-020, R-021, R-024, R-025, R-032, R-033, R-034, R-035, R-037, R-038, R-039, R-048',
  'pm-rules@1308,606': 'R-040',
  'pm-rules@1441,606': 'R-040',
  'pm-settings@37,61': 'R-001, R-002, R-003',
  'pm-settings@658,226': 'R-004, R-007',
  'pm-settings@281,299': 'ui: Menu Pro+ banner (subscription feature)',
  'pm-settings@850,299': 'ui: Menu Pro+ banner (subscription feature)',
  'pm-rules@76,130': 'Q-14',
  'pm-rules@76,178': 'R-013',
  'pm-rules@76,238': 'R-014',
  'pm-rules@76,250': 'Q-5',
};

for (const [p, dir] of Object.entries(DRAFTS)) {
  const rows = parseCsv(readFileSync(join(dir, 'draft.csv'), 'utf8')).slice(1).filter(r => r[0]);
  const by = (...reqs: string[]) => rows.filter(r => reqs.some(q => r[6].split(/,\s*/).includes(q))).map(r => r[0]);
  const where = (f: (r: string[]) => boolean) => rows.filter(f).map(r => r[0]);
  const first = (a: string[]) => a.slice(0, 1);

  const at = JSON.parse(readFileSync(join(dir, 'annotation-trace.json'), 'utf8'));
  const OFF: Record<string, [number, number]> = { 'pm-rules': [-1700, -150], 'pm-settings': [250, -150], 'pm-export': [250, 2120], 'pm-music': [250, 3480], 'd-aigc-settings': [-585, 2362] };
  const ann: Record<string, string> = {};
  for (const [k, v] of Object.entries(ANN)) { const [b, xy] = k.split('@'); const [x, y] = xy.split(',').map(Number); ann[`${b}@${x + OFF[b][0]},${y + OFF[b][1]}`] = v; }
  for (const b of at.blocks) { if (!ann[b.id]) throw new Error(`no trace for ${b.id}`); b.trace = ann[b.id]; }
  writeFileSync(join(dir, 'annotation-trace.json'), JSON.stringify(at, null, 2) + '\n');

  const switchOn = where(r => /Turn 「Remove AIGC Watermark」 On|Turn the switch (On|Off)/.test(r[3]));
  const ct = JSON.parse(readFileSync(join(dir, 'control-trace.json'), 'utf8'));
  const other = (why: string) => `n/a: other feature: ${why}`;
  const P: Record<string, string> = {
    'Got it': by('R-007').join(', '),
    'Get free trial': other('Menu subscription banner'),
    'Remove Watermark': other('the PowerDirector watermark switch (Remove Watermark), not the AIGC one'),
    'Generate Music': by('R-007').join(', '),
    'Don’t show again': by('R-046').join(', '),
    'AI Music Generator': other('AI Music Generator back button'),
    'Go to My AI Music': other('Music Generator progress popup'),
    'Menu': other('Menu page back button'),
  };
  for (const e of ct.entries) {
    const n = e.name as string, l = (e.label || '') as string;
    let v: string | undefined;
    if (n === 'Switch') v = switchOn.join(', ');
    else if (n === 'round/ic_info') v = by('R-004', 'R-005', 'R-006').join(', ');
    else if (n === 'round/ic_remove_ai' || n === 'round/ic_image_off') v = 'n/a: decorative row icon (the row itself is not a button; the switch is)';
    else if (n === 'checkbox') v = by('R-030').join(', ');
    else if (n === 'check') v = by('R-046').join(', ');
    else if (n === 'cta') v = [...first(by('R-028')), ...first(by('R-029')), ...first(by('R-045')), ...first(by('R-044'))].join(', ');
    else if (n === 'round/ic_xmark' && e.board === 'pm-settings') v = 'n/a: the PM info sheet X; the Design sheet (priority) has no X, so the app is not expected to draw one';
    else if (n === 'round/ic_xmark') v = other('Music Generator progress popup X');
    else if (n === 'chips') v = other('AI Music Generator Vocal On / Off');
    else if (n === 'menu_list') v = other('Menu rows of other features (Tutorials & Tips, My Artwork, Preferences, account, Information)');
    else if (/^round\/ic_(cloud_upload|crown|cutout_advanced|film_sparkle|speech_2_text)$/.test(n)) v = other('Menu subscription banner icons');
    else if (/^(ic_history_n|back|round\/ic_chevron_left|round\/ic_add_image)$/.test(n)) v = other('AI Music Generator page controls');
    else if (n === 'Top_Navigation_menu') v = other('Menu page back button');
    else if (P[l]) v = P[l];
    if (!v) throw new Error(`${p}: no press for ${e.group} ${n} ${l}`);
    e.press = v; e.how = v.startsWith('n/a') ? 'manual' : 'manual';
  }
  writeFileSync(join(dir, 'control-trace.json'), JSON.stringify(ct, null, 2) + '\n');
  console.log(p, 'annotations', at.blocks.length, 'controls', ct.entries.length);
}
