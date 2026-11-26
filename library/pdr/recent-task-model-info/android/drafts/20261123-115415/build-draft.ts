// Builds requirements.md and draft.csv for both platforms of pdr/recent-task-model-info, draft 20261123-115415.
// Usage: node library/pdr/recent-task-model-info/android/drafts/20261123-115415/build-draft.ts
// Source: spec set 2026-11-23 (Figma only): Design 1794:3210 「1006 · Add model information (I2V/T2V)」, the linked
// Design Guideline · Cards (Card/RecentTask) and the Jira text. Model names: KP-082 (Android picker, Free).
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRAFT = '20261123-115415';
const ROOT = join(import.meta.dirname, '..', '..', '..');
const DS = 'https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=';

const I2V = ['Kling 4.0', 'Veo 3.1', 'Vidu Q2', 'Kling O3', 'Pixverse V6', 'Wan 2.7', 'Gemini Omni Flash 1.1', 'Happy Horse 1.1', 'Seedance 2.0', 'Seedance 2.5'];
const T2V = ['Kling 4.0', 'Wan 3.0', 'Seedance 2.5', 'Seedance 2.0', 'Gemini Omni Flash', 'Happy Horse 1.1', 'Wan 2.7', 'Veo 3.1', 'Kling O3'];
const PRO = new Set(['Seedance 2.0', 'Seedance 2.5']);

type Row = { id: string; section: string; pre: string; action: string; expected: string; pri: string; refs: string; notes: string; android?: boolean };
const rows: Row[] = [];
let n = 0;
const add = (r: Omit<Row, 'id'>) => { const id = `TC-${String(++n).padStart(3, '0')}`; rows.push({ id, ...r }); return id; };
const lines = (...a: string[]) => a.join('\n');
const steps = (...a: string[]) => a.length === 1 ? a[0] : a.map((s, i) => `${i + 1}. ${s}`).join('\n');

const ACCOUNT = 'Signed in with the test account (fixtures.md)';
const MYART = 'Open AI Magic › 「My Artwork」';

// ---- My Artwork entry ----
const S1 = 'My Artwork entry';
const tEntryI2V = add({ section: S1, pre: ACCOUNT, action: steps(MYART, 'Tap the 「Image to Video」 card row'),
  expected: lines('Step 1: My Artwork lists a card row per feature, including 「Image to Video」 and 「Text to Video」',
    'Step 2: the Image to Video Recent page opens, titled 「Image to Video」, with one Recent task card per task (newest first)'),
  pri: 'P1', refs: 'R-001, R-060', notes: '' });
add({ section: S1, pre: ACCOUNT, action: steps(MYART, 'Tap the 「Text to Video」 card row'),
  expected: 'The Text to Video Recent page opens, titled 「Text to Video」, with one Recent task card per task',
  pri: 'P1', refs: 'R-001', notes: '' });

// ---- Image to Video ----
const S2 = 'Image to Video — model tag';
const tI2Vdl = add({ section: S2, pre: lines('1. ' + ACCOUNT, '2. A photo in the gallery'),
  action: steps('Open AI Magic › 「Image to Video」 (not a template)', 'Add the photo and pick the model 「Kling 4.0」 last (KP-083)', 'Tap Generate', MYART, 'Tap 「Image to Video」'),
  expected: lines('Step 5: the new task\'s card is in the processing state: 「processing...」 over the thumbnail, the time left and a progress bar, no button',
    'Step 5: under the task name the card shows a grey filled tag reading 「Kling 4.0」'),
  pri: 'P1', refs: 'R-010, R-030', notes: 'Keep this task: TC-004, TC-005 and the state rows use it.' });
const tI2Vdone = add({ section: S2, pre: `The Image to Video task of ${'TC-003'} has finished`,
  action: steps(MYART, 'Tap 「Image to Video」'),
  expected: lines('The task\'s card shows, top to bottom beside the thumbnail: the date and length (「YYYY/MM/DD · m:ss」), the task name, then one grey filled tag reading 「Kling 4.0」',
    'The tag is one line, 20 pt high, and does not touch the 「View」 button at the bottom right',
    'The card is as tall as a card without a tag (120 pt)'),
  pri: 'P1', refs: 'R-010, R-012, R-015, R-016, R-030', notes: '' });
add({ section: S2, pre: 'The Image to Video Recent page shows the finished task of TC-003',
  action: steps('Tap 「View」 on that card', 'Tap ‹'),
  expected: lines('Step 1: the Image to Video result page of that task opens (its video plays)', 'Step 2: back on the Image to Video Recent page, the card still shows 「Kling 4.0」'),
  pri: 'P1', refs: 'R-002, R-061', notes: '' });
const i2vRows: Record<string, string> = { 'Kling 4.0': tI2Vdone };
for (const m of I2V.slice(1)) i2vRows[m] = add({ section: S2,
  pre: lines('1. ' + (PRO.has(m) ? 'Signed in with the Pro test account (fixtures.md)' : ACCOUNT), '2. A photo in the gallery'),
  action: steps('Open AI Magic › 「Image to Video」 (not a template)', `Add the photo and pick the model 「${m}」 last`, 'Tap Generate and wait until it finishes', MYART, 'Tap 「Image to Video」'),
  expected: `The new task's card shows the tag 「${m}」 under its name, written as the model picker names it (cut with 「…」 only if it does not fit)`,
  pri: 'P2', refs: 'R-012', notes: PRO.has(m) ? 'Pro-only model (KP-082). Model name from the Android picker (KP-082): use the picker\'s exact name if the build differs.' : 'Model name from the Android picker (KP-082): use the picker\'s exact name if the build differs.' });
const tKeep = add({ section: S2, pre: 'The Image to Video Recent page holds tasks made with two or more different models (TC-003, TC-006 …)',
  action: steps('Open AI Magic › 「Image to Video」 and pick a model none of those tasks used, without generating', 'Go back', MYART, 'Tap 「Image to Video」'),
  expected: lines('Each card still shows the model its own task was generated with', 'No card shows the model picked in step 1'),
  pri: 'P2', refs: 'R-013', notes: '' });

// ---- Text to Video ----
const S3 = 'Text to Video — model tag';
const tT2Vdl = add({ section: S3, pre: ACCOUNT,
  action: steps('Open AI Magic › 「Text to Video」 (not a template)', 'Type a short prompt and pick the model 「Kling 4.0」 last', 'Tap Generate', MYART, 'Tap 「Text to Video」'),
  expected: lines('Step 5: the new task\'s card shows 「processing...」, the time left and a progress bar, no button',
    'Step 5: under the task name the card shows a grey filled tag reading 「Kling 4.0」'),
  pri: 'P1', refs: 'R-011, R-030', notes: 'Close the keyboard (Done or tap outside) before picking the model.' });
const tT2Vdone = add({ section: S3, pre: 'The Text to Video task of TC-016 has finished',
  action: steps(MYART, 'Tap 「Text to Video」'),
  expected: lines('The card shows the date and length, the task name, then one grey filled tag reading 「Kling 4.0」',
    'The tag is one line and does not touch 「View」', 'The card is as tall as a card without a tag (120 pt)'),
  pri: 'P1', refs: 'R-011, R-012, R-015, R-016, R-030', notes: '' });
add({ section: S3, pre: 'The Text to Video Recent page shows the finished task of TC-016',
  action: steps('Tap 「View」 on that card', 'Tap ‹'),
  expected: lines('Step 1: the Text to Video result page of that task opens', 'Step 2: back on the Text to Video Recent page, the card still shows 「Kling 4.0」'),
  pri: 'P1', refs: 'R-002', notes: '' });
const t2vRows: Record<string, string> = { 'Kling 4.0': tT2Vdone };
for (const m of T2V.slice(1)) t2vRows[m] = add({ section: S3,
  pre: PRO.has(m) ? 'Signed in with the Pro test account (fixtures.md)' : ACCOUNT,
  action: steps('Open AI Magic › 「Text to Video」 (not a template)', `Type a short prompt and pick the model 「${m}」 last`, 'Tap Generate and wait until it finishes', MYART, 'Tap 「Text to Video」'),
  expected: `The new task's card shows the tag 「${m}」 under its name, written as the model picker names it (cut with 「…」 only if it does not fit)`,
  pri: 'P2', refs: 'R-012', notes: PRO.has(m) ? 'Pro-only model (KP-082). Model name from the Android picker (KP-082): use the picker\'s exact name if the build differs.' : 'Model name from the Android picker (KP-082): use the picker\'s exact name if the build differs.' });

// ---- Long names ----
const S4 = 'Long model names';
const tLong = add({ section: S4, pre: 'The Image to Video Recent page holds a task made with 「Gemini Omni Flash 1.1」 (TC-011), the longest model name',
  action: steps(MYART, 'Tap 「Image to Video」', 'Look at that task\'s card'),
  expected: lines('The tag shows the whole name on one line, or, when it does not fit, the start of the name ending in 「…」',
    'The tag never wraps to a second line and does not overlap 「View」'),
  pri: 'P2', refs: 'R-014', notes: 'Q-4: the spec gives no maximum tag width; the row assumes the tag may use the width under the name up to the card\'s right padding.' });
const tFont = add({ section: S4, pre: 'As TC-027',
  action: steps('Set the phone\'s font size (and display size) to the largest', MYART, 'Tap 「Image to Video」', 'Look at the 「Gemini Omni Flash 1.1」 card', 'Set the font and display size back'),
  expected: lines('Step 4: the tag is cut with 「…」 on one line and does not overlap 「View」 or leave the card',
    'Step 4: the card keeps the height of the cards around it'),
  pri: 'P3', refs: 'R-014, R-016', notes: 'Phone setting changed and restored by the run (AGENTS.md › Phone settings for fixtures).' });

// ---- No model ----
const S5 = 'Cards without a model';
const tTplI2V = add({ section: S5, pre: lines('1. ' + ACCOUNT, '2. A photo in the gallery'),
  action: steps('Start an Image to Video template (Launcher 「What\'s Trending」 or the Template tab) with the photo', 'Generate and wait until it finishes', MYART, 'Tap 「Image to Video」'),
  expected: lines('The template task\'s card shows the date and length and the name, and no model tag',
    'No empty line or gap is left where the tag would be', 'The card is as tall as a card with a tag (120 pt)'),
  pri: 'P1', refs: 'R-020, R-016', notes: 'Q-3: if the template lets the user pick a model, record whether the card shows it.' });
const tTplT2V = add({ section: S5, pre: ACCOUNT,
  action: steps('Start a Text to Video template (Launcher or the Template tab)', 'Generate and wait until it finishes', MYART, 'Tap 「Text to Video」'),
  expected: lines('The template task\'s card shows no model tag and no empty line', 'The card is as tall as a card with a tag (120 pt)'),
  pri: 'P2', refs: 'R-020, R-016', notes: 'Q-3 as TC-029. If the build offers no Text to Video template, record Blocked as test-data.' });
const tCRC = add({ section: S5, pre: 'The account has at least one finished Cinematic Reel Creator task',
  action: steps(MYART, 'Tap 「Cinematic Reel Creator」'),
  expected: lines('No card on the Cinematic Reel Creator Recent page shows a model tag', 'No card leaves an empty line for one', 'Every card is 120 pt tall'),
  pri: 'P1', refs: 'R-021, R-016', notes: 'Use an existing task; a new Cinematic Reel costs 70 credits (KP-091).' });
const tOther = add({ section: S5, pre: ACCOUNT,
  action: steps(MYART, 'Open the Recent page of every other feature My Artwork lists (not Image to Video, Text to Video, Text to Image or Cinematic Reel Creator)'),
  expected: 'No card on those pages shows a model tag or an empty line for one',
  pri: 'P2', refs: 'R-021', notes: 'Record which features My Artwork lists; if none besides the four, record that and pass on TC-031.' });
const tTTI = add({ section: S5, pre: 'The account has at least one finished Text to Image task (default model 「GPT-Image-2.6 Sunburst」, KP-082)',
  action: steps(MYART, 'Tap 「Text to Image」'),
  expected: 'The Text to Image Recent page shows no model tag on its items (Design 1006 names only I2V and T2V)',
  pri: 'P2', refs: 'R-022', notes: 'Q-1: the Jira title also names TTI. If the build shows a model here, record it: a PM decision, not a Fail.' });

// ---- States ----
const S6 = 'Card states';
const tTplDl = add({ section: S6, pre: lines('1. ' + ACCOUNT, '2. A photo in the gallery'),
  action: steps('Start an Image to Video template with the photo and tap Generate', MYART, 'Tap 「Image to Video」 while it is processing'),
  expected: lines('The processing card (「processing...」, time left, progress bar) shows no model tag', 'It is as tall as the other cards'),
  pri: 'P2', refs: 'R-030, R-020', notes: 'Can be the generation of TC-029, looked at while it runs.' });
const tUnsel = add({ section: S6, pre: 'The Image to Video Recent page holds tagged cards (TC-003) and a template card (TC-029)',
  action: steps(MYART, 'Tap 「Image to Video」', 'Tap 「Manage」'),
  expected: lines('Step 3: every card shows an empty checkbox at its top right', 'Step 3: tagged cards keep their model tag and template cards still show none',
    'Step 3: the page shows 「Select All」 and 「Cancel」 and a 「Delete」 bar', 'Step 3: every card keeps its height'),
  pri: 'P2', refs: 'R-030', notes: 'Design: 「點擊 Select 進入編輯狀態」; the board draws 「Manage」 as the entry. Never tap 「Delete」.' });
const tSel = add({ section: S6, pre: 'As TC-035, in edit mode',
  action: 'Tap the checkbox of a card with a model tag',
  expected: lines('Its checkbox is ticked', 'Its model tag still shows, unchanged', 'The other cards stay unticked'),
  pri: 'P2', refs: 'R-030', notes: '' });
const tSelAll = add({ section: S6, pre: 'As TC-035, in edit mode',
  action: steps('Tap 「Select All」', 'Tap 「Deselect All」', 'Tap 「Cancel」'),
  expected: lines('Step 1: every checkbox is ticked and the button reads 「Deselect All」', 'Steps 1–2: every tagged card keeps its tag and template cards show none',
    'Step 2: every checkbox is empty', 'Step 3: the page leaves edit mode and every card shows 「View」 again with the same tags'),
  pri: 'P2', refs: 'R-030', notes: 'Never tap 「Delete」.' });
const tErr = add({ section: S6, pre: 'An Image to Video task made with a chosen model has failed (needs a failure fixture)',
  action: steps(MYART, 'Tap 「Image to Video」'),
  expected: lines('The failed card shows 「Error」 with the caution icon over the thumbnail and 「Retry」', 'It still shows the model tag of the chosen model', 'It is 120 pt tall'),
  pri: 'P2', refs: 'R-030', notes: 'Parked: no fault switch on Android (KP-003); run when a task fails by itself. KP-081: the Image to Video page itself reads 「An Error Has Occurred」.' });
const tNsfw = add({ section: S6, pre: 'An Image to Video or Text to Video task made with a chosen model was flagged as inappropriate (needs an NSFW fixture)',
  action: steps(MYART, 'Open that feature\'s Recent page'),
  expected: lines('The card shows the visibility-off icon over the thumbnail and 「View Details」', 'It still shows the model tag', 'It is 120 pt tall'),
  pri: 'P3', refs: 'R-030', notes: 'Parked: needs an input the server flags.' });

// ---- Persistence ----
const S7 = 'Persistence';
const tPersist = add({ section: S7, pre: 'The Image to Video Recent page shows tagged cards (TC-003 …)',
  action: steps('Tap ‹ to go back to My Artwork', 'Tap 「Image to Video」 again', 'Close the app completely and open it again', MYART, 'Tap 「Image to Video」'),
  expected: lines('Step 1: My Artwork shows again', 'Steps 2 and 5: every card shows the same model tag as before'),
  pri: 'P2', refs: 'R-040', notes: '' });
const tOld = add({ section: S7, pre: 'The account has Image to Video or Text to Video tasks generated with a chosen model before this build was installed',
  action: steps(MYART, 'Open the Image to Video and Text to Video Recent pages', 'Look at the older cards'),
  expected: lines('Each older card shows either its model tag or no tag line at all', 'No card shows an empty tag', 'Every card is 120 pt tall'),
  pri: 'P3', refs: 'R-041', notes: 'Q-2: the spec does not say whether older tasks get the tag; record which.' });

// ---- Appearance ----
const S8 = 'Appearance';
const tDark = add({ section: S8, pre: lines('1. The app shows the dark appearance (phone in dark theme)', '2. Tagged cards exist (TC-003 …)'),
  action: steps(MYART, 'Tap 「Image to Video」'),
  expected: 'The model tag is a grey filled tag with readable text on the dark card, as on the Dark board',
  pri: 'P3', refs: 'R-050', notes: 'Phone setting changed and restored by the run.' });
const tLight = add({ section: S8, pre: lines('1. The app shows the light appearance (phone in light theme)', '2. Tagged cards exist (TC-003 …)'),
  action: steps(MYART, 'Tap 「Image to Video」'),
  expected: 'The model tag is a grey filled tag with readable text on the light card, as on the Light board',
  pri: 'P3', refs: 'R-050', notes: 'Phone setting changed and restored by the run.' });

// ---- Android system Back ----
const S9 = 'System Back';
const tBackRecent = add({ section: S9, pre: 'The Image to Video Recent page is open', action: 'Press system Back',
  expected: 'My Artwork shows again', pri: 'P3', refs: 'R-070', notes: '', android: true });
const tBackEdit = add({ section: S9, pre: 'The Image to Video Recent page is in edit mode with one card ticked', action: 'Press system Back',
  expected: lines('Edit mode closes as with 「Cancel」', 'No task is deleted and every card keeps its tag'),
  pri: 'P3', refs: 'R-070', notes: 'Q-5: the spec draws only 「Cancel」; the row assumes Back acts like it.', android: true });
const tBackResult = add({ section: S9, pre: 'The result page of a tagged task is open (TC-005 step 1)', action: 'Press system Back',
  expected: 'The Image to Video Recent page shows again with the card\'s tag unchanged', pri: 'P3', refs: 'R-070', notes: '', android: true });

// ---- requirements.md ----
function requirements(platform: 'ios' | 'android') {
  const act = (id: string) => platform === 'android' || !rows.find(r => r.id === id)?.android;
  const R = (ids: string[]) => ids.filter(act).join(', ');
  const fontStep = platform === 'android' ? 'Settings › Display › Font size and Display size' : 'Settings › Display & Brightness › Text Size (and Accessibility › Larger Text)';
  const md = `# Recent Task Model Info — requirements (${platform})
Spec: Recent Task Model Info - Design Figma 1794-3210.md (Design frame 「1006 · Add model information (I2V/T2V)」 ${DS}1794-3210, read 2026-11-23),
Design Guideline Cards - Card-RecentTask.md (the board's link 「開啟 Guideline · Cards ↗」, https://www.figma.com/design/qSdtJ1wbHddNm6ebWvF4ia/?node-id=142-4496, extracted/links.json)
and PDRA Jira - Add model information in recent task.md (Jira text pasted by the user, parent PDRA-627 16.9.0).
Figma-only spec set 2026-11-23, no PDF and no PM spec for this ticket. Source order: Design (1006 frame), then its linked Guideline.
The section's Video and Video · 編輯模式 boards (1794:3214, 1794:3217) are read as context: they draw where the Recent
task cards live and how edit mode looks, with cards drawn before the model tag existed.
Model names come from the ${platform === 'android' ? 'Android' : 'Android (no iOS list known yet)'} picker as seen on a Free account (KP-082); the rows quote the picker's name.

## My Artwork entry
- R-001 [DS:d-recent-video] AI Magic › My Artwork lists a card row per feature (Cinematic Reel Creator, Text to Video, Image to Video, Text to Image); tapping a feature's card opens that feature's Recent page (its history), titled with the feature.
- R-002 [DS:d-recent-video] On a Recent page, 「View」 on a finished card opens that feature's result page for the task.

## Model tag
- R-010 [DS:d-model-info 規則; DS:figma 1006 · Add model information (I2V/T2V) 1794:3210] An Image to Video task generated with a model the user chose (Image to Video opened from AI Magic, not a template) shows on its Recent task card a grey filled tag with the model name under the task name.
- R-011 [DS:d-model-info 規則] A Text to Video task generated with a model the user chose shows the same tag on its Recent task card.
- R-012 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] The tag reads the name of the model chosen when the task was generated, for each model the picker offers (Image to Video: ${I2V.join(', ')}; Text to Video: ${T2V.join(', ')}).
- R-013 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] Each card keeps the model of its own task: picking another model later does not change an existing card's tag.
- R-014 [DS:d-model-info 「過長以 … 截斷」] A model name too long for the tag is cut with 「…」 on one line; the tag never wraps and never overlaps 「View」 (checked at the default text size and at the largest, ${fontStep}).
- R-015 [DS:d-model-info 有 model; link: model tag style] The tag sits under the task name, beside the thumbnail and above the bottom row with 「View」: a grey filled S tag, 20 pt high, one line of text${platform === 'android' ? ' (weights held to Roboto, [KB: KP-066])' : ''}.
- R-016 [DS:d-model-info 「卡片高度維持 120」; link: size] Every Recent task card is 120 pt tall, with or without the tag; a card without a model leaves no empty line.

## Cards without a model
- R-020 [link: showModel only for a user-chosen model] An Image to Video or Text to Video task generated from a template shows no model tag (「範本生成不開」).
- R-021 [DS:d-model-info 「其他功能（如 Cinematic Reel Creator）沒有 model，整行不顯示」] Recent task cards of every other feature (Cinematic Reel Creator and any other feature My Artwork lists) show no model tag and no line for one.
- R-022 [DS:d-model-info title 「(I2V / T2V)」; Q-1] Text to Image Recent items show no model tag (the Design names only I2V and T2V; the Jira title also names TTI, Q-1).

## Card states
- R-030 [DS:d-model-info 「done / downloading / unselect / select / error / nsfw 規則相同」; link: state table] The model rule is the same in every card state: a card with a chosen model shows its tag while processing (「processing...」, time left, progress bar, no button), when done (「View」), unselected and selected in edit mode (checkbox), failed (「Error」, 「Retry」) and flagged (「View Details」); a card without a model shows none in any state.

## Persistence
- R-040 [DS:d-recent-video 「Tasks are stored on the cloud for 1 Year」; Rule: persistence] The tag stays the same after leaving and reopening the Recent page and after closing and reopening the app (tasks are stored on the cloud).
- R-041 [Q-2] Tasks generated before this build show either their model tag or no tag line; never an empty tag (assumption until PM answers Q-2).

## Appearance
- R-050 [DS:d-model-info Dark / Light] The tag is drawn in both the dark and the light appearance, as on the Dark and Light boards.
${platform === 'android' ? `
## System Back
- R-070 [Rule: Android system Back, REQ-051] System Back on the Recent page returns to My Artwork, in edit mode closes edit mode like 「Cancel」 (Q-5) and on a result page returns to the Recent page.
` : ''}
## Open questions
- Q-1 Text to Image: the Jira title is 「Add model information in recent task (I2V/T2V/TTI)」, but the Design frame 1006, its rules and the Guideline all say only I2V and T2V show the model, and the Text to Image Recent page is drawn as prompt tiles, not Recent task cards. Should Text to Image show its model (e.g. 「GPT-Image-2.6 Sunburst」), and where? Assumption: Design, no tag on Text to Image. R-022, TC-033.
- Q-2 Tasks generated before the build with the model tag: should they show their model? The spec is silent. Assumption: either the tag or no tag line, never an empty tag, card 120 pt. R-041, TC-041.
- Q-3 Templates: the Guideline says a template generation never shows the model (「範本生成不開」). If an Image to Video or Text to Video template lets the user pick a model, does its card show it? Assumption: no tag on any template generation. R-020, TC-029, TC-030.
- Q-4 Tag width: the spec says a long name is cut with 「…」 but gives no maximum width for the tag. Assumption: the tag may use the width under the name up to the card's right padding, never overlapping 「View」. R-014, TC-027, TC-028.
${platform === 'android' ? `- Q-5 System Back in edit mode: the spec draws only 「Cancel」. Assumption: Back acts like 「Cancel」 and deletes nothing. R-070, TC-045.\n` : ''}
## Added 2026-11-23 — coverage passes and standing inputs

### Job states

| Job | processing | done | unselect | select | error | nsfw |
|---|---|---|---|---|---|---|
| Image to Video, chosen model | ${tI2Vdl} | ${tI2Vdone} | ${tUnsel} | ${tSel}, ${tSelAll} | ${tErr} | ${tNsfw} |
| Text to Video, chosen model | ${tT2Vdl} | ${tT2Vdone} | n/a (same Card/RecentTask component; edit mode checked on Image to Video, ${tUnsel}) | n/a (as unselect) | n/a (one error row, ${tErr}; no failure fixture) | ${tNsfw} |
| Image to Video template | ${tTplDl} | ${tTplI2V} | ${tUnsel} | ${tSelAll} | n/a (no failure fixture; same rule as ${tErr}) | n/a (no NSFW fixture) |
| Text to Video template | n/a (same as ${tTplDl}) | ${tTplT2V} | n/a (as ${tUnsel}) | n/a (as ${tSelAll}) | n/a (no failure fixture) | n/a (no NSFW fixture) |
| Cinematic Reel Creator | n/a (a new reel costs 70 credits; existing tasks used) | ${tCRC} | n/a (edit mode checked on Image to Video) | n/a (as unselect) | n/a (no failure fixture) | n/a (no NSFW fixture) |

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-040 | Tasks are stored on the cloud, so the model comes back from the server after the app restarts | The Recent page after closing and reopening the app | ${tPersist} |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
${I2V.map(m => `| R-012 | i2v model=${m} | ${i2vRows[m]} |`).join('\n')}
${T2V.map(m => `| R-012 | t2v model=${m} | ${t2vRows[m]} |`).join('\n')}
| R-014 | text size=default | ${tLong} |
| R-014 | text size=largest | ${tFont} |
| R-030 | state=processing | ${tI2Vdl}, ${tT2Vdl}, ${tTplDl} |
| R-030 | state=done | ${tI2Vdone}, ${tT2Vdone} |
| R-030 | state=unselect | ${tUnsel} |
| R-030 | state=select | ${tSel}, ${tSelAll} |
| R-030 | state=error | ${tErr} |
| R-030 | state=nsfw | ${tNsfw} |
| R-050 | appearance=Dark | ${tDark} |
| R-050 | appearance=Light | ${tLight} |

### Combinations
- Not combined: i2v model, t2v model, text size, state, appearance (each is checked on its own: the model only sets the tag's text, the others are the rule's states and display settings, never chosen together with a model)

### Flow arrows walked by existing rows
- R-060 [DS: flow arrow 1036-3983 ${DS}1036-3983] My Artwork feature card → Recent page: the feature's history opens. Walked by: ${tEntryI2V}.
- R-061 [DS: flow arrow 1036-3984 ${DS}1036-3984] Recent page 「View」 → the feature's result page. Walked by: TC-005.
${platform === 'android' ? `
### System back
- My Artwork: n/a (a main tab page; the feature adds nothing there)
- Recent page: ${tBackRecent}
- Recent page in edit mode: ${tBackEdit}
- Result page: ${tBackResult}
` : ''}
### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (this ticket only adds the tag; the error card is checked for the tag, ${tErr}) |
${platform === 'android' ? '| KP-066 Android text is held to the Android equivalent of the iOS font | R-015 |\n' : ''}
### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 | R-001 – R-050 (the analysis itself) |
`;
  return md.replace(/\n{3,}/g, '\n\n');
}

const esc = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
for (const platform of ['android', 'ios'] as const) {
  const dir = join(ROOT, platform, 'drafts', DRAFT);
  const head = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
  const out = rows.filter(r => platform === 'android' || !r.android).map(r => {
    let notes = r.notes;
    if (platform === 'ios') notes = notes.replace(/Model name from the Android picker \(KP-082\)/, 'Model name from the Android picker (KP-082; no iOS list yet)').replace('No fault switch on Android (KP-003)', 'No failure fixture');
    if (platform === 'ios') notes = notes.replace('Parked: no fault switch on Android (KP-003); run when a task fails by itself. KP-081: the Image to Video page itself reads 「An Error Has Occurred」.', 'Parked: needs a failure fixture (Pink fault switch if the build has one); run when a task fails by itself.');
    let pre = r.pre;
    if (platform === 'ios' && r.id === tFont) { /* same text: the phone's font size */ }
    return [r.id, r.section, pre, r.action, r.expected, r.pri, r.refs, notes, 'new', 'New table (spec set 2026-11-23)'].map(esc).join(',');
  });
  writeFileSync(join(dir, 'draft.csv'), '﻿' + [head.join(','), ...out].join('\n') + '\n');
  writeFileSync(join(dir, 'requirements.md'), requirements(platform));
  console.log(platform, out.length, 'rows');
}
