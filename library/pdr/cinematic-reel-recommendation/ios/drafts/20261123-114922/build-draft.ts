// Builds requirements.md and draft.csv for pdr/cinematic-reel-recommendation (PDRA-661, photo tips) for one platform.
// Usage: node build-draft.ts <ios|android> <out dir>
// The two platforms share every requirement and row; Android adds system Back (team rule 2026-10-28) rows TC-020, TC-021.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const platform = process.argv[2] as 'ios' | 'android';
const out = process.argv[3];
if (!['ios', 'android'].includes(platform) || !out) { console.error('Usage: node build-draft.ts <ios|android> <out dir>'); process.exit(2); }
const android = platform === 'android';

const DS = 'https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=';
// CMS › Recommendation (gid 1744053327), templates in the CMS Order list for MyEdit / PDR / PHD
const T = [
  { name: 'Horror Movie', id: 'Horror Movie', rec: ['People in Frame', 'Layered Depth'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { name: 'Micro Cinema', id: 'Micro_Cinema', rec: ['Mid-Distance Framing', 'Rich Visual Details'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { name: 'One-Take Shot', id: 'One_Take_Shot', rec: ['Mid-Distance Framing', 'Layered Depth'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { name: 'Time Lapse', id: 'Time_Lapse', rec: ['Visible Sky', 'Cityscape or Landscape'], avoid: ['Portrait as Subject', 'Indoor Close-up', 'Extreme Close-up'] },
  { name: 'Handheld Camera', id: 'Handheld_Camera', rec: ['Layered Depth', 'Rich Visual Details'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { name: 'Fast Cut', id: 'Fast_Cut', rec: ['Sense of Motion', 'Rich Visual Details'], avoid: ['Static Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
];
const q = (s: string) => `「${s}」`;
const list = (a: string[]) => a.length === 2 ? `${q(a[0])} and ${q(a[1])}` : `${q(a[0])}, ${q(a[1])} and ${q(a[2])}`;
const pad = (n: number) => `TC-${String(n).padStart(3, '0')}`;

type Row = { ID: string; Section: string; Precondition: string; Action: string; 'Expected Result': string; Priority: string; 'Spec Ref': string; Notes: string };
const rows: Row[] = [];
const PRE = ['PowerDirector signed in on the test account', 'App language English', 'The Cinematic Reel Creator tutorial was dismissed before (its template page opens directly)'];
const pre = (extra: string[] = []) => [...PRE, ...extra].map((l, i) => `${i + 1}. ${l}`).join('\n');
const open = 'Launcher › 「Cinematic Reel Creator」';

// 1. Chip on each template card → that template's tips (TC-001 – TC-006)
T.forEach((t, i) => {
  const first = t.name === 'Micro Cinema';
  rows.push({
    ID: pad(i + 1), Section: 'View photo tips chip',
    Precondition: pre([`${open} open on its template page`]),
    Action: [`1. Swipe the template cards to the ${q(t.name)} card`, '2. Tap 「View photo tips」 on that card'].join('\n'),
    'Expected Result': [
      'Step 1: the card shows a 「View photo tips」 chip with a lightbulb icon at its top-left corner',
      'Step 2: the photo tips sheet opens from the bottom over the dimmed template page',
      ...(first ? ['Step 2: the template page header (‹, credit pill, ?, history) stays visible behind the dim'] : []),
      `Step 2: the sheet reads 「For best results with the ${t.name} template, follow this advice:」 with ${q(t.name)} in bold`,
      `Step 2: 「Recommendation」 (blue bar) lists ${list(t.rec)}, each a picture with a ✓ badge at its bottom-right and the caption under it`,
      `Step 2: 「Avoid」 (pink bar) lists ${list(t.avoid)}, each a picture with a ⊗ badge and the caption under it (swipe the row left to read the third)`,
      'Step 2: a full-width 「Got it」 button is at the bottom',
    ].join('\n'),
    Priority: first ? 'P1' : 'P2',
    'Spec Ref': ['R-001', 'R-002', 'R-003', 'R-006', 'R-007', 'R-008', 'R-012', ...(first ? ['R-011', 'R-015'] : [])].join(', '),
    Notes: `CMS › Recommendation row ${t.id}. Find the card by its name: the CMS Order differs by region (Global, JP/TW/KOR/CHS, MyEdit/PDR/PHD).${first ? ' Design 0820 add photo tips draws this template.' : ''}`,
  });
});

// 2. The sheet itself
rows.push({
  ID: 'TC-007', Section: 'Photo tips sheet',
  Precondition: pre([`${open} open on its template page`, 'The 「Micro Cinema」 card in view']),
  Action: ['1. Tap 「View photo tips」 on the 「Micro Cinema」 card', '2. Tap 「Got it」', '3. Tap 「View photo tips」 on the same card again'].join('\n'),
  'Expected Result': [
    'Step 2: the sheet closes and the dim is gone',
    'Step 2: the template page shows the 「Micro Cinema」 card, as before step 1',
    'Step 3: the same Micro Cinema tips sheet opens again',
  ].join('\n'),
  Priority: 'P1', 'Spec Ref': 'R-010, R-003',
  Notes: 'Only 「Got it」 is drawn as a way to close (Q-3).',
});
rows.push({
  ID: 'TC-008', Section: 'Photo tips sheet',
  Precondition: pre([`${open} open on its template page`, 'The Micro Cinema photo tips sheet open (its 「View photo tips」 chip)']),
  Action: '1. Swipe the 「Avoid」 row left\n2. Swipe it back right',
  'Expected Result': [
    'Before step 1: the third Avoid item runs past the right edge of the sheet',
    'Step 1: 「Extreme Close-up」 comes fully into view with its ⊗ badge and caption',
    'Step 1: the 「Recommendation」 row does not move',
    'Step 2: 「Flat Composition」 is back at the left edge',
  ].join('\n'),
  Priority: 'P2', 'Spec Ref': 'R-009',
  Notes: 'Design draws the third Avoid item cut off at the right edge; whether the row scrolls is not written (Q-5).',
});
rows.push({
  ID: 'TC-009', Section: 'Photo tips sheet',
  Precondition: pre([`${open} open on its template page`]),
  Action: ['1. Tap 「View photo tips」 on the 「Handheld Camera」 card', '2. Tap 「Got it」', '3. Tap 「View photo tips」 on the 「Fast Cut」 card'].join('\n'),
  'Expected Result': [
    'Step 1: 「Rich Visual Details」 shows the general Rich Visual Details picture',
    'Step 3: 「Rich Visual Details」 shows a different picture, the one made for Fast Cut',
  ].join('\n'),
  Priority: 'P3', 'Spec Ref': 'R-013',
  Notes: 'CMS picture list: 「Rich Visual Details (畫面細節豐富) for Fast Cut」 is its own picture. Compare the two screenshots.',
});

// 3. Media room 「?」 (PM-only, Jira) — TC-010 – TC-015
T.forEach((t, i) => {
  rows.push({
    ID: pad(10 + i), Section: 'Media room ?',
    Precondition: pre([`${open} open on its template page`]),
    Action: [`1. Swipe the template cards to the ${q(t.name)} card`, '2. Tap 「Import a Photo」', '3. Tap 「?」 in the Add Media header'].join('\n'),
    'Expected Result': [
      'Step 2: the Add Media room opens and shows a 「?」 in its header',
      `Step 3: the photo tips sheet opens with 「For best results with the ${t.name} template, follow this advice:」`,
      `Step 3: 「Recommendation」 lists ${list(t.rec)}`,
      `Step 3: 「Avoid」 lists ${list(t.avoid)}`,
    ].join('\n'),
    Priority: t.name === 'Micro Cinema' ? 'P1' : 'P2',
    'Spec Ref': 'R-004, R-005, R-012',
    Notes: 'PM-only: no Design frame yet (Design 26.07_v2 draws Add Media without a 「?」; its ⓘ layer is hidden). Jira PDRA-661: 「media room "?"」. Q-1.',
  });
});
rows.push({
  ID: 'TC-016', Section: 'Media room ?',
  Precondition: pre([`${open} open on its template page`, 'Add Media opened from the 「Micro Cinema」 card (「Import a Photo」), no photo picked']),
  Action: '1. Tap 「?」 in the Add Media header\n2. Tap 「Got it」',
  'Expected Result': [
    'Step 2: the sheet closes and Add Media is shown again',
    'Step 2: Add Media keeps its tab (Recents) and no photo is picked',
  ].join('\n'),
  Priority: 'P2', 'Spec Ref': 'R-004, R-010',
  Notes: 'PM-only: no Design frame yet (Q-1).',
});

// 4. Language (template name from CMS Template Name Localization)
for (const [id, lang, name] of [['TC-017', '繁體中文', '微電影畫境'], ['TC-018', '日本語', 'マイクロシネマ']]) {
  rows.push({
    ID: id, Section: 'Language',
    Precondition: [`1. PowerDirector signed in on the test account`, `2. App language ${lang} (${android ? 'Android Settings › Apps › PowerDirector › Language' : 'iOS Settings › PowerDirector › Language'})`, '3. Cinematic Reel Creator open on its template page'].join('\n'),
    Action: '1. Swipe to the Micro Cinema card\n2. Tap the photo tips chip on it',
    'Expected Result': [
      `Step 2: the sheet's first sentence names the template as 「${name}」`,
      'Step 2: the sentence, the two headings and every caption are whole, not cut off and not garbled',
      'Step 2: 「Got it」 is shown in the app language',
    ].join('\n'),
    Priority: 'P3', 'Spec Ref': 'R-015',
    Notes: `CMS Template Name Localization: ${name}. Whether the captions are translated is open (Q-2): record their language, do not fail on it. Restore English after the row.`,
  });
}

// 5. Data source
rows.push({
  ID: 'TC-019', Section: 'Data source',
  Precondition: pre([`${open} open on its template page`, android ? 'Logcat recording from app start' : 'App log cleared before opening the feature']),
  Action: ['1. Tap 「View photo tips」 on the 「Micro Cinema」 card', '2. Tap 「Got it」', '3. Tap 「View photo tips」 on the 「Time Lapse」 card', '4. Tap 「Got it」', '5. Pull the app log'].join('\n'),
  'Expected Result': [
    'Step 5: the log shows the template data from the CMS with recommend_samples for each template',
    'Step 5: the items each sheet showed match that template\'s recommend_samples',
  ].join('\n'),
  Priority: 'P3', 'Spec Ref': 'R-014',
  Notes: 'Hidden clause (pass 9). Park (needs: cms-log) if the log shows no CMS template data.',
});

if (android) {
  rows.push({
    ID: 'TC-020', Section: 'Photo tips sheet',
    Precondition: pre([`${open} open on its template page`, 'The Micro Cinema photo tips sheet open (its chip)']),
    Action: 'Press system Back',
    'Expected Result': 'The sheet closes and the template page shows the 「Micro Cinema」 card\nThe app does not leave Cinematic Reel Creator',
    Priority: 'P2', 'Spec Ref': 'R-016',
    Notes: 'System back on every sheet (team rule 2026-10-28). Design draws only 「Got it」 (Q-3): assumed to act like it.',
  });
  rows.push({
    ID: 'TC-021', Section: 'Media room ?',
    Precondition: pre([`${open} open on its template page`, 'Add Media opened from the 「Micro Cinema」 card, its photo tips sheet open (「?」)']),
    Action: 'Press system Back',
    'Expected Result': 'The sheet closes and Add Media is shown again\nNo photo is picked',
    Priority: 'P2', 'Spec Ref': 'R-016, R-004',
    Notes: 'System back on every sheet (team rule 2026-10-28). PM-only entry (Q-1).',
  });
}

// order: Android TC-020 after TC-008, TC-021 after TC-016 (REQ-033)
const order = (r: Row) => ({ 'TC-020': 8.5, 'TC-021': 16.5 } as Record<string, number>)[r.ID] ?? +r.ID.slice(3);
rows.sort((a, b) => order(a) - order(b));

const cols = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'] as const;
const cell = (v: string) => /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
const csv = [cols.join(','), ...rows.map(r => cols.map(c => cell(c === 'Change' ? 'new' : c === 'Change Reason' ? '' : (r as any)[c] ?? '')).join(','))].join('\n') + '\n';
writeFileSync(join(out, 'draft.csv'), csv);

// requirements.md
const arrowsOther: [string, string, string][] = [
  ['110-15623', 'Preview 「Generate」 → Analyzing & Generating', 'generation flow'],
  ['108-15191', 'Add Media photo → preview with 「Generate」', 'photo pick'],
  ['111-16517', 'Analyzing & Generating → progress step', 'generation progress'],
  ['111-23987', 'Analyzing & Generating → recent tasks (Processing)', 'generation progress'],
  ['111-24458', 'Recent tasks → done card with 「View」', 'recent tasks'],
  ['111-17798', '「View later」 → recent tasks', 'generation flow'],
  ['111-21605', '「Create another one」 → template page', 'generation flow'],
  ['111-23476', 'Recent task 「View」 → result page', 'result page'],
  ['111-26343', 'Result 「Add Text」 → title templates', 'result page'],
  ['111-28894', 'Result 「Edit Music」 → music library', 'result page'],
  ['230-4451', 'Tutorial ✕ → template page (tutorial folds into ?)', 'first-run tutorial'],
  ['230-3698', 'Template page history → empty recent tasks', 'recent tasks'],
];
const vrows = (r: string, from: number) => T.map((t, i) => `| ${r} | template=${t.name} | ${pad(from + i)} |`).join('\n');
const req = `# Cinematic Reel Creator — Photo Tips (Recommendation page) — requirements (${platform})
Spec: PDRA-661 Jira description.md, Cinematic Reel Recommendation - Design Figma 107-2283.md, Cinestory CMS - Recommendation.md (spec set specs/2026-11-23, Figma-only: Design frame 107:2283 「26.07_v2」 read 2026-11-23, board d-cinestory)

Scope: Jira PDRA-661 (PDRIOS-738), 「(UX) Add recommendation page for Cinemantic Reel Creeator」, the Design's 0820 frames 「add photo tips tag」 and 「add photo tips」, and the CMS tab Recommendation. The rest of the 26.07_v2 board is the existing Cinematic Reel Creator flow and is not this ticket's table.

## View photo tips chip
- R-001 [DS:d-cinestory 0820 add photo tips tag 1106:5843] Every template card on the Cinematic Reel Creator template page shows a 「View photo tips」 chip with a lightbulb icon at the card's top-left corner, over the preview video.
- R-002 [DS: flow arrow 1106-5840 ${DS}1106-5840] Template card 「View photo tips」 → photo tips sheet: tapping the chip opens the photo tips sheet over the template page.
- R-003 [Jira PDRA-661 「每個template有各自的 recommendation/avoid」] Each template has its own recommendation page: the chip on a card opens the tips of that card's template, named in the sheet.

## Media room ?
- R-004 [Jira PDRA-661 「每個 template 會有 chip & media room "?" 都可以打開 recommendation page」] The Add Media room opened from a template (「Import a Photo」) has a 「?」 that opens the photo tips of that template. PM-only: no Design frame yet (Design 26.07_v2 draws Add Media without a 「?」, its round/ic_info layer hidden; Q-1).
- R-005 [DS: flow arrow 108-15190 ${DS}108-15190] Template card 「Import a Photo」 → Add Media: the Add Media room opens. Walked by: TC-010 – TC-015.

## Photo tips sheet
- R-006 [DS:d-cinestory 0820 add photo tips 1106:5841] The sheet opens with 「For best results with the <template> template, follow this advice:」, the template name in bold.
- R-007 [DS:d-cinestory 0820 add photo tips] Under 「Recommendation」 (blue bar) the template's two recommended items are shown, each a picture with a ✓ badge at its bottom-right and its caption below.
- R-008 [DS:d-cinestory 0820 add photo tips] Under 「Avoid」 (pink bar) the template's three items to avoid are shown, each a picture with a ⊗ badge and its caption below.
- R-009 [DS:d-cinestory 0820 add photo tips] The Avoid row is wider than the sheet: the third item runs past the right edge and is reached by swiping the row (Q-5).
- R-010 [DS:d-cinestory 0820 add photo tips] 「Got it」 at the bottom closes the sheet and returns to the screen it was opened from, unchanged (Q-3).
- R-011 [DS:d-cinestory 0820 add photo tips] The sheet covers the lower part of the screen; the template page behind it is dimmed, its header still visible.

## Content from CMS
- R-012 [Link: Cinestory CMS › Recommendation; Jira 「from CMS」] Each template shows the items of its CMS row: Horror Movie — Recommendation 「People in Frame」, 「Layered Depth」, Avoid 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Micro Cinema — 「Mid-Distance Framing」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; One-Take Shot — 「Mid-Distance Framing」, 「Layered Depth」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Time Lapse — 「Visible Sky」, 「Cityscape or Landscape」 / 「Portrait as Subject」, 「Indoor Close-up」, 「Extreme Close-up」; Handheld Camera — 「Layered Depth」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Fast Cut — 「Sense of Motion」, 「Rich Visual Details」 / 「Static Composition」, 「Visible Text or Logos」, 「Extreme Close-up」.
- R-013 [Link: Cinestory CMS › Recommendation, picture list] Fast Cut's 「Rich Visual Details」 uses its own picture (「Rich Visual Details for Fast Cut」), not the one the other templates show for that item.
- R-014 [Jira 「from CMS (同I2V開法)」; CMS columns row 20 recommend_samples] The recommendations are server-configured in the CMS (field recommend_samples per template), not built into the app.
- R-015 [Link: Cinestory CMS › Template Name Localization] The template name in the sheet follows the app language (Micro Cinema: CHT 「微電影畫境」, JPN 「マイクロシネマ」); whether the sentence and captions are translated is open (Q-2).
${android ? `
## System back
- R-016 [Rule 8: Android system Back, team rule 2026-10-28] On Android, system Back on the photo tips sheet closes it like 「Got it」 and returns to the screen it was opened from (Q-3).
` : ''}
## Other Cinematic Reel Creator arrows on the board (not PDRA-661)
${arrowsOther.map(([n, e, w], i) => `- R-${String((android ? 17 : 16) + i).padStart(3, '0')} [DS: flow arrow ${n} ${DS}${n}] ${e}. — NOT TESTABLE: ${w} of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.`).join('\n')}

## Open questions
- Q-1 Media room 「?」: the Jira says the Add Media room has a 「?」 that opens the recommendation page, but the Design 26.07_v2 draws Add Media without one (the round/ic_info layer is hidden), and the template page's own 「?」 is the tutorial. Where is the 「?」, what icon, and does it show the tips of the template the room was opened from? Assumption: a 「?」 in the Add Media header opens the tips of that template; 「Got it」 returns to Add Media. R-004, TC-010 – TC-016${android ? ', TC-021' : ''}.
- Q-2 Language: the CMS gives the template names in every language, but the picture list's JP and EN columns are empty and the sheet sentence has no translation in the spec. Are the sentence, headings and captions translated? Assumption: the template name follows the app language; rows record the rest and do not fail on it. R-015, TC-017, TC-018.
- Q-3 Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it${android ? ', and does system Back' : ''}? Assumption: only 「Got it」 is checked${android ? '; system Back closes the sheet like it' : ''}. R-010${android ? ', R-016' : ''}, TC-007${android ? ', TC-020, TC-021' : ''}.
- Q-4 Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)? Assumption: none written; no row until PM answers. R-001, R-012, R-014.
- Q-5 Scrolling: the Design draws the third Avoid item past the sheet's edge. Does the Avoid row scroll sideways, and would the Recommendation row scroll if a template had more than two? Assumption: the Avoid row scrolls sideways. R-009, TC-008.

## Added 2026-11-23 — coverage passes and standing inputs
### Flow arrows walked by existing rows
- R-002 (arrow 1106-5840): TC-001 – TC-006 tap the chip.
- R-005 (arrow 108-15190): Walked by: TC-010 – TC-015.

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-014 | The items come from the CMS field recommend_samples, not the app | The app log after a log pull (CMS template data), compared with what each sheet showed | TC-019 |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
${vrows('R-012', 1)}
${vrows('R-001', 1)}
${T.map((t, i) => `| R-004 | template=${t.name} | ${pad(10 + i)} |`).join('\n')}
| R-015 | language=ENU | TC-002 |
| R-015 | language=CHT | TC-017 |
| R-015 | language=JPN | TC-018 |

### Combinations
- Not combined: template, language (the language only changes the sheet's words; one template, Micro Cinema, is read in each language)

### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (the tips sheet runs no generation and charges nothing) |
${android ? '| KP-066 Android text is held to the Android equivalent of the iOS font | n/a (no text rule in this table; it applies to the design check of the sheet, figma skill) |\n' : ''}${android ? `
### System back
- Photo tips sheet (from the chip): TC-020 closes it, back on the template page.
- Photo tips sheet (from the Add Media 「?」): TC-021 closes it, back on Add Media.
- Template page, Add Media and the rest of Cinematic Reel Creator: n/a (not PDRA-661; the feature's own table).
` : ''}
### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 (analysis, both) | R-001 – R-015 (the whole table) |
`;
writeFileSync(join(out, 'requirements.md'), req);
console.log(`${platform}: ${rows.length} rows`);
