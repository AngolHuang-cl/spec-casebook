// Draft 20261124-150000 (both platforms; the iOS draft folder holds the same file): the MUI section [Req: REQ-041].
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md and phases.json in this folder from the approved table
// (v10 Android / v7 iOS) plus the MUI rows for the languages of library/pdr/product.json › mui (spec-casebook
// references/mui.md): Android one APK translation row and one truncation walk per language, iOS one walk per language. Run: node library/pdr/video-enhance/<platform>/drafts/20261124-150000/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const FEATURE_DIR = dirname(TABLE);
const ios = PLATFORM === 'ios';

const product = JSON.parse(readFileSync(join(FEATURE_DIR, '..', 'product.json'), 'utf8'));
const LANGS: { tag: string; name: string; code: string }[] = product.mui.languages.filter((l: any) => l.code !== product.mui.base);
const RTL: string[] = product.mui.rtl ?? [];

const R_TR = 'R-208', R_TC = 'R-209';
const FIRST_ID = 321;

// ---- the walk: every screen of the feature, by the rows that already reach it; no new task is started ----
const pro = ios
  ? 'Tier Pro+ (Launcher › Pink › ☰ › [0] IAP › status = Pro+, checked in Mine) with enough credits'
  : 'Signed in with a Pro account (no tier switch on Android) with enough credits';
const pre = (L: { name: string; code: string }) => [
  `App language set to ${L.name} (\`launch --lang ${L.code}\`)`,
  `After the row a plain \`launch\`${ios ? '' : ' (`locale reset`)'} restores the language`,
  pro,
  'The 12:30 1080p 60 fps test video in the album',
  'A completed and a failed Video Enhance task already in Recent task (TC-143, TC-170; without a failed one the error dialog is not reached)',
  'A project with one video clip of 2:30 or less on the timeline (TC-003)',
  'The Demo page not dismissed for good (TC-014 not run yet on this install)',
].map((s, i) => `${i + 1}. ${s}`).join('\n');

const steps: [string, string][] = [
  // [action, English strings the step's screen shows]
  ['On the Launcher, read the big shortcut (TC-001)', 'Launcher shortcut: 「AI Video Enhance」'],
  ['Tap the shortcut and read the Demo page (TC-010)', 'Demo page: 「AI Video Enhance」, the description, 「Don’t show again」, 「Try It Now」'],
  ['Tap 「Try It Now」 and read Add Media (TC-020)', 'Add Media: its title and the 「Video」 tab'],
  ['Pick the 12:30 video and read the panel (TC-033)', 'Panel: 「AI Video Enhance」, 「Selected Length」, 「Mode」, 「Standard」, 「Professional」, 「Enhancement style」, 「Natural」, 「Sharp」, 「fps」, 「Resolution」, 「60fps · 1080p」, 「Enhance ◆ <credits>」, 「Charge X credits per second」'],
  ['Tap ⓘ next to 「Selected Length」 and read the bubble (TC-031)', 'Selected Length bubble: 「Max 8 minutes. Drag to choose which part.」'],
  ['Tap ⓘ next to 「Mode」 and read the bubble (TC-035)', 'Mode bubble: 「Standard: Great quality · up to 8 min」, 「Professional: Maximum detail · up to 2:30」'],
  ['Tap ⓘ next to 「Enhancement style」 and read the bubble (TC-036)', 'Enhancement style bubble: 「Natural: Lighter enhancement with fewer artifacts, for a more realistic look」, 「Sharp: Moderate enhancement for a sharp, clear image」'],
  ...(ios ? [['Switch the tier to Free (Pink) and read the CTA (TC-090)', 'Free CTA: 「Unlock Pro+ to Enhance」, 「Charge X credits per second」'], ['Switch the tier back to Pro+ (Pink)', '']] as [string, string][] : []),
  ['Trim the selection to 00:30–05:30 and tap 「Professional」 (TC-071)', 'Mode toast: 「Professional supports clips up to 2:30. Shorten your selection to switch.」'],
  ['Turn Wi-Fi off and tap 「Enhance」 (TC-100)', 'Offline toast: 「Upload failed. Check your connection and try again.」'],
  ['Turn Wi-Fi on', ''],
  ['Trim the selection to 00:30–00:40 (a 10 s task: leaving it costs its small price, TC-113)', ''],
  ['Tap 「Enhance」 and read the processing dialog (TC-110)', 'Processing dialog: 「Video uploading...」, 「Please keep the app open」, 「Cancel」'],
  ['Tap 「Cancel」 at once and read the leave dialog (TC-111)', 'Leave dialog: 「Sure You Want to Leave?」, 「Your video is still uploading. Leaving this page will cancel the process, and the credits will not be restored.」, 「Leave」, 「Keep Uploading」'],
  ['Tap 「Leave」', ''],
  ['Open Recent task and read the completed and failed cards (TC-143, TC-170)', 'Recent task cards: 「View」, 「Error」, 「View Details」'],
  ['Tap 「View」 on the completed card and read the Result (TC-143)', 'Result: its title and 「Save Result」'],
  ['Tap 「Save Result」 (TC-152)', 'Save toast: 「Saved to your device」'],
  ['Go back to Recent task and tap 「View Details」 on the failed card (TC-171)', 'Error dialog: 「An Error Has Occurred」, 「Credits have been refunded.」, 「The server may be busy. Please try again later or use a different video.」, 「OK」'],
  ['Open the project, tap the clip and read the clip toolbar (TC-003)', 'Clip toolbar: 「AI Video Enhance」 (inside 「Enhance」 when the toolbar groups the tools)'],
];
const walk = steps.map(([a], i) => `${i + 1}. ${a}`).join('\n');
const checkList = steps.filter(([, s]) => s).map(([, s]) => s);

const script = (L: { tag: string }) => ({
  CHT: 'traditional characters, Taiwan wording', CHS: 'simplified characters', PTB: 'Brazilian Portuguese', ESM: 'Mexican Spanish',
  ESP: 'Spanish of Spain', NOR: 'Norwegian Bokmål',
} as Record<string, string>)[L.tag];
const translationLines = (L: { tag: string; name: string }) => {
  const sc = script(L);
  return [
    `Every string shows in ${L.name}${sc ? ` (${sc})` : ''} and says what the English says`,
    'No string is left in English',
    'No string shows a key, a placeholder (%@, {0}, <n>) or another language',
    'Numbers, times and credits are filled in',
    'The feature name and the terms (Mode, Standard, Professional, Enhancement style, Natural, Sharp, Enhance) read the same on every screen',
    'No translation sheet (REQ-041): a string that only seems off is a translation doubt in the run\'s mui-doubts.md, not a fail',
  ];
};
const truncationLines = (L: { tag: string; name: string }) => [
  'Every string on every screen of the walk shows in full: none ends in 「…」, is cut at an edge or loses a line',
  'No string overlaps another element or runs out of its button, chip, bubble, toast or dialog',
  'The CTA 「Enhance ◆ <credits>」, the chips (Standard, Professional, Natural, Sharp, fps, Resolution) and the dialog buttons keep their size and place',
  'Longest strings first: the leave dialog body, the error dialog body, the Professional toast, the three bubbles, 「Charge X credits per second」',
  ...(RTL.includes(L.tag) ? [`${L.name} is right-to-left: text runs from the right and no string is clipped at the left edge`] : []),
];

const newRows: string[][] = [];
let n = FIRST_ID;
if (!ios) {
  // Android: every translation from the build's APK, no phone (references/mui.md §3)
  newRows.push([`TC-${n++}`, 'MUI', [
    '1. The APK of the build under test in `~/.casebook/android/apks/<build>/` (the one installed for the run)',
    '2. `mui.json` names the feature\'s string prefixes (`android_prefixes`)',
  ].join('\n'), [
    '1. Run `node scripts/mui-strings.ts pdr/video-enhance --apk <build dir> --out <run dir>/mui`',
    '2. Read every string of `mui-strings.json` in each language against its English',
  ].join('\n'), [
    `Each of the ${LANGS.length} languages (${LANGS.map(l => l.tag).join(', ')}) has its own text for every string of the feature: none shows the English default or another locale's text`,
    'No string is left identical to English, except names and units (「fps」, 「1080p」, product names)',
    'Placeholders and line breaks match the English in every language',
    'Each translation says what the English says, in that language\'s script and regional wording (CHT traditional and Taiwan, CHS simplified, PTB Brazilian, ESM Mexican)',
    'The feature name and the terms (Mode, Standard, Professional, Enhancement style, Natural, Sharp, Enhance) are translated the same way in every string',
    'No translation sheet (REQ-041): a string that only seems off is a translation doubt in mui-doubts.md, not a fail',
  ].join('\n'), 'P2', `${R_TR}; REQ-041`, 'MUI, all languages from the APK (no phone, no credits). The phone rows below check only truncation.', 'new', 'REQ-041: MUI translations read from the build']);
}
LANGS.forEach(L => {
  const id = `TC-${n++}`;
  if (ios) newRows.push([id, 'MUI', pre(L), walk, [...translationLines(L), ...truncationLines(L), ...checkList].join('\n'),
    'P2', `${R_TR}; ${R_TC}; REQ-041`, `MUI ${L.tag} (${L.code}). One \`texts\` read and screenshot per screen; no new task (the 10 s leave costs its small price).`, 'new', 'REQ-041: MUI walk per language (translation and truncation)']);
  else newRows.push([id, 'MUI', pre(L), walk, [...truncationLines(L), ...checkList].join('\n'),
    'P2', `${R_TC}; REQ-041`, `MUI ${L.tag} (${L.code}). Truncation only (translations come from the APK, TC-${FIRST_ID}); one \`texts\` read and screenshot per screen; no new task.`, 'new', 'REQ-041: MUI truncation walk per language']);
});
const LAST_ID = n - 1;

// ---- draft.csv: every approved row unchanged, then the MUI section ----
const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8').replace(/^﻿/, ''));
const head = [...approved[0], 'Change', 'Change Reason'];
const rows = approved.slice(1).filter(r => r.length > 1).map(r => [...r, 'unchanged', '']);
writeFileSync(join(DIR, 'draft.csv'), '﻿' + toCsv([head, ...rows, ...newRows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const intro = `\nDraft 20261124-150000 [Req: REQ-041]: the MUI section (spec-casebook references/mui.md). Every PowerDirector feature is
tested in the ${LANGS.length} languages of \`library/pdr/product.json\` › \`mui\` besides English; there is no translation sheet, so
each translation is judged by the run and doubtful ones go to the eBug review. ${ios
  ? 'iOS reads translations on the phone (the app bundle cannot be read on the QA iPhone): one walk per language checks translation and truncation together.'
  : 'Android reads every translation from the build\'s APK (one row, no phone); the phone walks one row per language for truncation only.'}
The MUI rows are their own phase (phases.json \`MUI\`), never part of a full run. New: ${R_TR}, ${R_TC}; ${newRows.length} rows, TC-${FIRST_ID} – TC-${LAST_ID}.\n`;
req = req.replace(/\n## (Entry points)/, `${intro}\n## $1`);
const section = `## MUI
- ${R_TR} [Req: REQ-041] Every user-facing string of the feature (Launcher shortcut, Demo page, Add Media, panel and its bubbles${ios ? ', Free CTA' : ''}, Mode toast, offline toast, processing and leave dialogs, Recent task cards, completion banner, Result and its save toast, system notification, error dialog, clip toolbar entry) shows in each language of the product list (${LANGS.map(l => l.tag).join(', ')}), in that language's own words with the English meaning, with no English, key or placeholder left. No translation sheet: the run judges each string; doubtful ones are listed for the eBug review, not failed.${ios ? '' : ' Android reads them from the build (`mui-strings.ts`).'}
- ${R_TC} [Req: REQ-041] In each of those languages no string of the feature is truncated, clipped or overlapping, and every control keeps its size and place${RTL.length ? `; the right-to-left languages (${RTL.join(', ')}) run from the right` : ''}.

`;
req = req.replace(/\n## Open questions/, `\n${section}## Open questions`);
const addToTable = (heading: string, lines: string[]) => {
  const i = req.indexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/); if (!m) throw new Error(`no table under ### ${heading}`);
  const at = i + m.index! + m[0].length - 1;
  req = req.slice(0, at) + '\n' + lines.join('\n') + req.slice(at);
};
const walkId = (i: number) => `TC-${FIRST_ID + (ios ? 0 : 1) + i}`;
addToTable('Variants', LANGS.flatMap((L, i) => [
  `| ${R_TR} | ${L.tag} (${L.name}) | ${ios ? walkId(i) : `TC-${FIRST_ID}`} |`, `| ${R_TC} | ${L.tag} (${L.name}) | ${walkId(i)} |`]));
addToTable('Request ledger coverage', [`| REQ-041 (table: MUI test in the ${LANGS.length} languages of the product list, no translation sheet) | ${R_TR}, ${R_TC} (TC-${FIRST_ID} – TC-${LAST_ID}) |`]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/video-enhance', platform: PLATFORM, title: manifest.title, draft: '20261124-150000',
  created_at: '2026-11-24T07:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Video Enhance (${PLATFORM}), draft 20261124-150000

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger.

## Summary
- New: ${newRows.length} rows in a new last section **MUI** (TC-${FIRST_ID} – TC-${LAST_ID}) for the ${LANGS.length} languages of
  \`library/pdr/product.json\` › \`mui\` [REQ-041]: ${ios
  ? 'one walk per language that checks translation and truncation together (the app bundle cannot be read on the QA iPhone).'
  : 'one row reads every translation from the build\'s APK (no phone, no credits), then one truncation walk per language on the phone.'}
- Modified: none. Removed: none.

## Requirements
- New ${R_TR} (translation) and ${R_TC} (truncation); \`### Variants\` gains a line per requirement × language.

## How the rows run
- The MUI rows are their own phase \`MUI\` in phases.json, run on request (string freeze, new languages, before
  release), never part of a full run.
- Each walk reaches every screen by the rows that already do, one \`texts\` read and screenshot per screen, and starts no
  task: the only cost is the 10 s task left at the leave dialog (TC-113: its small price is not restored).
- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  \`mui-doubts.md\` and the eBug review page's Translation doubts panel.

## Not added
${ios ? `- The completion banner and the system notification (TC-130, TC-133): reading them needs a finished task per
  language (${LANGS.length} generations). Left out on iOS; Android reads their text from the APK.
` : `- The Free-account CTA (「Unlock Pro to Enhance」, TC-090) on the phone: Android has no tier switch. Its translations
  are read from the APK (TC-${FIRST_ID}); only its truncation is not walked.
- The completion banner and the system notification on the phone: a finished task per language. Their translations
  are read from the APK; only their truncation is not walked.
`}- The notification prompt 「Turn on notifications」 (TC-118): it shows only until it is answered (TC-120), so walking
  it in ${LANGS.length} languages needs a reset of the app's state per language${ios ? ' (and PowerDirector cannot be reinstalled on the QA iPhone)' : ' (`pm clear` signs the app out); its text is in the APK read'}.
- The IAP and Credit pages: shared with other features, not this feature's strings.
`);

// ---- phases.json: the earlier rounds as they were, plus the MUI phase (never part of a full run) ----
const prevPhases = (() => { for (const d of ['20261117-105552']) { const f = join(TABLE, 'drafts', d, 'phases.json'); if (existsSync(f)) return JSON.parse(readFileSync(f, 'utf8')); } return null; })();
const muiPhase = {
  id: 'MUI', name: `MUI: ${LANGS.length} languages (${ios ? 'translation and truncation on the phone' : 'translations from the APK, truncation on the phone'})`,
  note: 'REQ-041 (user, 2026-11-24). Run on request, never in a full run. One segment per language after the base-language rows; every segment ends with a plain launch (Android: locale reset). Doubtful translations go to mui-doubts.md (references/mui.md §3).',
  segments: [
    ...(ios ? [] : [{ id: 'MUI-apk', name: 'Translations from the APK (no phone)', cases: [`TC-${FIRST_ID}`] }]),
    ...LANGS.map((L, i) => ({ id: `MUI-${L.tag}`, name: `${L.name} (${L.code})`, cases: [walkId(i)] })),
  ],
};
const phases = prevPhases
  ? { ...prevPhases, draft: '20261124-150000', current: ['MUI'], phases: [...prevPhases.phases.filter((p: any) => p.id !== 'MUI'), muiPhase] }
  : { draft: '20261124-150000', current: ['MUI'], needs: {}, unavailable: {}, phases: [muiPhase] };
writeFileSync(join(DIR, 'phases.json'), JSON.stringify(phases, null, 2) + '\n');

// Chinese copy: start from the approved one, so only the new rows need translating (zh-copy.ts export / merge)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${rows.length} approved rows + ${newRows.length} MUI rows → ${join(DIR, 'draft.csv')}`);
