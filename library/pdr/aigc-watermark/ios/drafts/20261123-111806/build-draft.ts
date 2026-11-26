// Builds requirements.md and draft.csv for pdr/aigc-watermark, both platforms, from the 2026-11-17 spec set.
// Usage (repo root): node library/pdr/aigc-watermark/ios/drafts/20261117-102349/build-draft.ts
// Writes the iOS draft (this folder) and the Android draft 20261117-102353. Rows are generated from the feature lists
// below so every scope feature, tool, effect and tier gets its own row (passes 10 and 9).
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'library/pdr/aigc-watermark';
const DRAFTS = { ios: join(ROOT, 'ios/drafts/20261117-102349'), android: join(ROOT, 'android/drafts/20261117-102353') };
type P = 'ios' | 'android';

const DS = 'https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=';
const PMU = 'https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=';

// ---------- scope lists ----------
const VIDEO = ['Video Edit by Chat', 'Image to Video', 'Cinematic Reel Creator', 'Character Motion Swap', 'Video Object Removal',
  'AI Storytelling', 'Text to Video', 'AI Anime Video', 'Talking Avatar'];
const IMAGE = ['AI Art', 'Text to Image'];
const TOOLS = ['AI Text to Speech', 'Voice Changer', 'AI Anime', 'AI Cartoon', 'AI Sketch'];
const LANGS: [string, string][] = [['English', 'ENU'], ['Traditional Chinese', 'CHT'], ['Japanese', 'JPN']];

// [feature, path / model, sheet effect line, signed, signer]
const META: [string, string, string, boolean, string][] = [
  ['Image to Video', 'a Google (Veo) model', 'Ext ItvGoogle', true, 'Google'],
  ['Image to Video', 'a BytePlus (Seedance) model', 'Ext ItvByteplus', true, 'BytePlus'],
  ['Image to Video', 'a Flux model', 'Ext ItvFlux', true, 'Black Forest Labs'],
  ['Image to Video', 'a Kling model', 'Ext ItvKling', false, ''],
  ['Image to Video', 'a Vidu model', 'Ext ItvVidu', false, ''],
  ['Image to Video', 'a Hailuo model', 'Ext ItvHailuo', false, ''],
  ['Image to Video', 'a Pixverse model', 'Ext ItvPixverse', false, ''],
  ['Image to Video', 'an Alibaba (Wan) model', 'Ext ItvAlibaba', false, ''],
  ['Image to Video', 'a Google model with automatic music', 'Apt4 ItvGoogleAutoMusic', true, 'CyberLink'],
  ['Text to Video', 'a Google (Veo) model', 'Ext TtvGoogle', true, 'Google'],
  ['Text to Video', 'a BytePlus (Seedance) model', 'Ext TtvByteplus', true, 'BytePlus'],
  ['Text to Video', 'a Flux model', 'Ext TtvFlux', true, 'Black Forest Labs'],
  ['Text to Video', 'a Kling model', 'Ext TtvKling', false, ''],
  ['Text to Video', 'a Vidu model', 'Ext TtvVidu', false, ''],
  ['Text to Video', 'a Hailuo model', 'Ext TtvHailuo', false, ''],
  ['Text to Video', 'a Pixverse model', 'Ext TtvPixverse', false, ''],
  ['Text to Video', 'an Alibaba (Wan) model', 'Ext TtvAlibaba', false, ''],
  ['Character Motion Swap', 'the Kling model', 'Ext MotionSwapKlingVid / MotionSwapKlingImg', false, ''],
  ['Character Motion Swap', 'the CyberLink model (Wan Animate)', 'Wana WanAnimate / Sca2 MotionSwapScail2', true, 'CyberLink'],
  ['Video Object Removal', 'its only path', 'Vor VideoObjectRemoval', true, 'CyberLink'],
  ['AI Storytelling', 'its default path', 'Ext StorytellingAssetsV3', true, 'Microsoft'],
  ['Cinematic Reel Creator', 'a BytePlus model', 'Ext CineStoryByteplusVendorMusic', true, 'BytePlus'],
  ['Cinematic Reel Creator', 'a Kling model', 'Ext CineStoryKling', false, ''],
  ['Video Edit by Chat', 'a Google model', 'Ext VtvGoogle', true, 'Google'],
  ['Video Edit by Chat', 'a Kling model', 'Ext VtvKling', false, ''],
  ['AI Anime Video', 'its only path', 'Vani VideoAIAnime', true, 'CyberLink'],
  ['Talking Avatar', 'its only path', 'Anch AIAnchor / AIAnchorV2', true, 'CyberLink'],
  ['AI Art', 'its default style', 'Flux ItiFlux (assumed, Q-12)', true, 'CyberLink'],
  ['Text to Image', 'its default model', 'Apt3 / Flux TextToImage', true, 'CyberLink'],
  ['Music Generator', 'a prompt-only song', 'Ext MusicGenerator', false, ''],
  ['Music Generator', 'a song from lyrics', 'Lts LyricsToSong', true, 'CyberLink'],
];
const META_TOOLS: [string, string, boolean, string][] = [
  ['AI Anime', 'AniLcm AIAnime', true, 'CyberLink'], ['AI Cartoon', 'AniLcm AICartoon', true, 'CyberLink'],
  ['AI Sketch', 'AniLcm AISketch', true, 'CyberLink'], ['Voice Changer', 'Apt1 VoiceChangerV2', true, 'CyberLink'],
  ['AI Text to Speech', 'Apt1 TextToSpeechCL', true, 'CyberLink'],
];

// ---------- requirements ----------
type Req = { id: string; sec: string; text: string };
const reqs: Req[] = [];
let rn = 0;
const R = (sec: string, text: string) => { const id = `R-${String(++rn).padStart(3, '0')}`; reqs.push({ id, sec, text }); return id; };

const S_SET = 'Settings entry';
const rRow = R(S_SET, `[DS:d-aigc-settings] Menu › Settings has the row 「Remove AIGC Watermark」: the remove-AI icon, the text, an ⓘ right after the text and a switch at the right (no chevron).`);
const rFreeOrder = R(S_SET, `[DS:d-aigc-settings; PM:pm-settings Essential User] For a free (Essential) user the row sits directly below 「Remove Watermark」 and above 「Preferences」.`);
const rPaid = R(S_SET, `[PM:pm-settings Paid User] For a paid user Settings shows 「Remove AIGC Watermark」 and no 「Remove Watermark」 row, followed by 「Preferences」 (PM-only: no Design frame of the paid Menu).`);
const rInfo = R(S_SET, `[DS: flow arrow 3816-10913 ${DS}3816-10913; DS:d-aigc-settings] Tapping ⓘ dims the Menu and opens a bottom sheet: title 「AIGC Watermark」, body 「Depending on applicable laws and regulations, you may need to label or watermark AI-generated content before sharing it publicly. This feature is provided to help you meet those requirements.」 and the button 「Got it」.`);
const rInfoFree = R(S_SET, `[PM: flow arrow 4-1680 ${PMU}4-1680] A free (Essential) user's ⓘ opens the same sheet. Walked by the free-tier ⓘ row.`);
const rInfoPaid = R(S_SET, `[PM: flow arrow 4-1679 ${PMU}4-1679] A paid user's ⓘ opens the same sheet. Walked by the paid-tier ⓘ row.`);
const rGotIt = R(S_SET, `[DS:d-aigc-settings] 「Got it」 closes the sheet and returns to the Menu with the switch unchanged. The Design sheet has no X; the PM sheet's X is older (pass 7: Design wins), so no X is expected.`);
const rSwitch = R(S_SET, `[Jira PDRIOS-722; PM:pm-music 「If Remove AIGC Watermark toggle off」] The switch decides whether later results carry the visible AIGC watermark: Off = results get the watermark, On = results are saved, shared and exported without it.`);
const rDefault = R(S_SET, `[Q-1] On a fresh install the switch is Off (results carry the watermark). Assumption: the dialogs say results 「will include an AIGC watermark」; both mockups draw the switch On.`);
const rPersist = R(S_SET, `[Q-1; pass 5] The switch keeps its value after the app is closed and opened again.`);
const rNoGate = R(S_SET, `[PM:pm-settings Essential User; Q-2] A free user can turn the switch On with no paywall or upgrade prompt, and it takes effect (the Essential mockup draws it On).`);

const S_ART = 'Watermark artwork and placement';
const rImgPos = R(S_ART, `[PM:pm-rules Global Rule; DS:d-aigc-settings AI label] An image result carries the AI label at its top-left corner.`);
const rSize = R(S_ART, `[DS:d-aigc-settings 「AI label 大小佔 img 短邊的 12% (包含 padding)」; Jira] The label with its padding is 12% of the image's short side (1080 px short side → 130 px label), in portrait, landscape and square images.`);
const rAsset = R(S_ART, `[DS:d-aigc-settings 「下載 500*500，已含 padding 的版本」; PM:pm-rules 圖檔 link] The label is the AI label asset (dark rounded square, white 「AI」 in a bracket frame with a sparkle), not text or another icon.`);
const rVidPos = R(S_ART, `[PM:pm-rules Global Rule 「Video: 左上角前兩秒壓上 AIGC Watermark」] A video result carries the label at its top-left during its first two seconds only: present at 0.0 s and 1.9 s, gone from 2.1 s on.`);
const rVidSize = R(S_ART, `[DS:d-aigc-settings; Q-3] In a video the label is 12% of the frame's short side, as for images, in portrait and landscape videos.`);
const rAudio = R(S_ART, `[PM:pm-rules Global Rule; Jira 「audio watermark用多國」] An audio result starts with the canned clip 「This audio was generated by AI.」 in the app's language (Q-5: which languages).`);

const S_VID = 'My Artwork — video results';
const rVidNoWm = R(S_VID, `[PM:pm-rules My Artwork Page › Video 類] A video result's My Artwork thumbnail, its View player and its timeline after 「Full Editor」 show no watermark.`);
const rVidSaveOff = R(S_VID, `[PM:pm-rules 「Save, Share: 會根據 Preference 設定來決定會不會有 watermark (僅加前兩秒)」] With the switch Off, 「Save」 writes the video with the label in its first two seconds.`);
const rVidSaveOn = R(S_VID, `[PM:pm-rules Save, Share; Jira] With the switch On, 「Save」 writes the video with no label.`);
const rVidShare = R(S_VID, `[PM:pm-rules Save, Share; Jira 「consistently across export/share/save」] Sharing a video result to a Share Video target follows the switch the same way: Off = the shared video has the label in its first two seconds, On = none.`);
const rArrowTile = R(S_VID, `[PM: flow arrow 86-968 ${PMU}86-968] My Artwork › Image to Video tile → the Image to Video task list. Walked by the Image to Video no-watermark row.`);
const rArrowView = R(S_VID, `[PM: flow arrow 86-970 ${PMU}86-970] Task list 「View」 → the result page with Share Video, 「Full Editor」 and 「Save」. Walked by the Image to Video no-watermark row.`);

const S_IMG = 'My Artwork — image results';
const rImgNoWm = R(S_IMG, `[PM:pm-rules My Artwork Page › Image 類] An image result's thumbnail, its View and its timeline after 「Full Editor」 show no watermark.`);
const rImgSave = R(S_IMG, `[PM:pm-rules Global Rule; Jira; Q-4] 「Save」 of an image result follows the switch: Off = the saved image has the label at its top-left, On = none.`);
const rImgShare = R(S_IMG, `[Jira 「consistently across export/share/save」; Q-4] Sharing an image result follows the switch the same way.`);

const S_AUD = 'Music Generator (pure audio)';
const rMDlg = R(S_AUD, `[PM:pm-music; PM: flow arrow 97-1818 ${PMU}97-1818] With the switch Off, 「Generate for ◆ 6」 opens the dialog 「AIGC Watermark」: 「Your generated music will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, the checkbox 「Don’t show again」, 「Cancel」 and 「Generate」 (PM-only: no Design frame).`);
const rMCancel = R(S_AUD, `[PM: flow arrow 97-1820 ${PMU}97-1820] 「Cancel」 closes the dialog and returns to the AI Music Generator page with the inputs kept, nothing generated and no credits taken.`);
const rMGen = R(S_AUD, `[PM: flow arrow 97-1819 ${PMU}97-1819] 「Generate」 starts the generation: the popup 「Generating...」 with a percentage and 「Go to My AI Music」 appears.`);
const rMNoShow = R(S_AUD, `[PM:pm-music 「Don’t show again」] After 「Generate」 with 「Don’t show again」 ticked, later generations with the switch Off start without the dialog.`);
const rMOn = R(S_AUD, `[PM:pm-music 「If Remove AIGC Watermark toggle off」; Jira; Q-6] With the switch On, 「Generate」 starts at once with no dialog and the song has no spoken clip.`);
const rMPrev = R(S_AUD, `[PM:pm-rules 純 Audio 類 Preview] A song made with the switch Off plays 「This audio was generated by AI」 at its start in the My AI Music preview.`);
const rMDown = R(S_AUD, `[PM:pm-rules 純 Audio 類 Download] The downloaded file of that song starts with the clip.`);
const rMTl = R(S_AUD, `[PM:pm-rules 純 Audio 類 「Add to timeline: 不會聽到」 (red, newest)] Added to the timeline, the same song plays without the clip.`);
const rMExp = R(S_AUD, `[PM:pm-rules 純 Audio 類 「Export, Share: …Project 0~2 秒有沒有 icon 的 watermark」 (red, newest)] Exporting or sharing a project that holds the song follows the switch: Off = the project's first two seconds carry the label, On = none.`);
const rMServer = R(S_AUD, `[PM:pm-rules Scope 「Music Generator → Server」] The music clip is added by the server at generation: the switch value at the moment of 「Generate」 decides, and the downloaded file carries it while the timeline copy does not.`);

const S_TL = 'Editor — AI content on the timeline';
const rTlPrev = R(S_TL, `[PM:pm-rules 「當 Timeline 有 Text-2-Speech, Voice Changer、AI Anime、AI Cartoon、AI Sketch 的 AI Content 時 / Timeline: 會根據 Preference 設定來決定會不會有 watermark」; Q-10] With such AI content on the timeline, the editor preview shows the label over the project's first two seconds when the switch is Off, and none when it is On.`);
const rTlExp = R(S_TL, `[PM:pm-rules 「Export, Share: 會根據 Preference 設定來決定有沒有 icon 的 watermark」] Exporting a project with such AI content follows the switch: Off = the produced file has the label in its first two seconds, On = none.`);
const rTlShare = R(S_TL, `[PM:pm-rules Export, Share] Sharing such a project from the editor follows the switch the same way.`);
const rTlFirst = R(S_TL, `[PM:pm-rules example 「非 AI 素材」 / 「AI 素材」; Q-9] The label goes on the project's first two seconds even when the first clip is not AI content and the AI clip comes later.`);
const rTlNone = R(S_TL, `[Q-7] A project with no AI content exports with no dialog and no label.`);
const rTlArt = R(S_TL, `[Jira 「consistently across export/share/save」; Q-19] A My Artwork video opened with 「Full Editor」 and exported follows the switch like other AI content: Off = label in the first two seconds, On = none.`);

const S_EXP = 'Export dialog';
const rEDlg = R(S_EXP, `[PM:pm-export; PM: flow arrow 86-955 ${PMU}86-955] With the switch Off and AI content in the project, Editor 「Export」 opens the dialog 「AIGC Watermark」: 「Your exported file will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, 「Don’t show again」, 「Cancel」, 「Export」 (PM-only: no Design frame).`);
const rEProd = R(S_EXP, `[PM: flow arrow 86-956 ${PMU}86-956] Dialog 「Export」 closes it and opens the Produce sheet (Resolution, 「Produce」).`);
const rECancel = R(S_EXP, `[PM:pm-export] 「Cancel」 closes the dialog and stays in the editor with nothing produced (PM draws no arrow: Q-7 covers the gap).`);
const rENoShow = R(S_EXP, `[PM:pm-export 「Don’t show again」; Q-8] After 「Export」 with 「Don’t show again」 ticked, later exports with the switch Off skip the dialog but still carry the label.`);
const rEOn = R(S_EXP, `[PM:pm-export; Jira] With the switch On, 「Export」 goes straight to the Produce sheet with no dialog.`);

const S_KEEP = 'Already-saved content';
const rKeep = R(S_KEEP, `[PM:pm-rules Note 「已下載過的 AI Content，不會因為 Preference 改變設定而動態更新」] A file already saved or downloaded keeps the watermark state it was saved with when the switch is changed later.`);
const rResave = R(S_KEEP, `[PM:pm-rules Save, Share; Jira] Saving the same result again after changing the switch applies the new value to the new file.`);

const S_META = 'C2PA metadata';
const rMeta = R(S_META, `[Jira 「加meta data」; Req: REQ-002; sheet c2pa-gai-effects.md] A result made by an effect the sheet marks 有簽章 carries a C2PA manifest (Content Credentials) signed by the party the sheet names.`);
const rNoMeta = R(S_META, `[Req: REQ-002; sheet c2pa-gai-effects.md] A result made by an effect the sheet marks 無簽章 carries no C2PA manifest.`);
const rMetaToggle = R(S_META, `[Jira 「UI setting 是控 visible watermark是否開or關」; 「meta data server side」] The switch does not touch the metadata: with the switch On a signed effect's saved result still carries its manifest.`);
const rMetaTool = R(S_META, `[PM:pm-rules timeline AI content; Req: REQ-002] Timeline AI content made by a 有簽章 effect (AI Anime, AI Cartoon, AI Sketch, Voice Changer, AI Text to Speech) is signed as the sheet says — NOT TESTABLE on the phone: the generated asset stays inside the project and no file of it can be read (Q-13).`);

const S_BACK = 'Android system Back';
const rBack = R(S_BACK, `[pass 8, REQ-051 rule] On Android, system Back on the 「AIGC Watermark」 info sheet, the export dialog and the music dialog acts like their dismiss button (「Got it」 / 「Cancel」): the sheet or dialog closes and nothing is generated or exported.`);

// ---------- rows ----------
type Row = { sec: string; pre: string; act: string; exp: string; pri: string; refs: string[]; notes?: string; plat?: P; needs?: string[] };
const rows: Row[] = [];
const add = (r: Row) => rows.push(r);
const tier = (p: P, t: string) => p === 'ios' ? `Tier ${t} (Launcher › Pink › ☰ › [0] IAP › status = ${t})` : `Signed in with the ${t} test account (fixtures.md)`;
const sw = (v: 'Off' | 'On') => `Menu › Settings › 「Remove AIGC Watermark」 is ${v}`;
const lines = (...a: string[]) => a.map((s, i) => `${i + 1}. ${s}`).join('\n');
const frameCheck = 'Grab frames of the file at 0.0 s, 1.9 s and 2.1 s on the computer (ffmpeg)';

function build(p: P) {
  rows.length = 0;
  const free = 'Free', paids = p === 'ios' ? ['Pro', 'Pro+'] : ['Pro'];
  // Settings
  add({ sec: S_SET, pre: tier(p, free), act: lines('Open Home › ☰ Menu', 'Scroll to 「Settings」'), exp: 'The row 「Remove AIGC Watermark」 shows the remove-AI icon, the text, an ⓘ right after the text and a switch at the right, with no chevron\nIt sits directly below 「Remove Watermark」 and above 「Preferences」', pri: 'P2', refs: [rRow, rFreeOrder] });
  for (const t of paids) add({ sec: S_SET, pre: tier(p, t), act: lines('Open Home › ☰ Menu', 'Scroll to 「Settings」'), exp: `「Remove AIGC Watermark」 is shown with its ⓘ and switch\nThere is no 「Remove Watermark」 row\n「Preferences」 follows it`, pri: 'P2', refs: [rPaid], notes: 'PM-only: no Design frame of the paid Menu (Design 2608).' });
  add({ sec: S_SET, pre: lines(tier(p, free), 'Menu › Settings open'), act: 'Tap the ⓘ beside 「Remove AIGC Watermark」', exp: 'The Menu dims and a bottom sheet opens\nTitle 「AIGC Watermark」\nBody 「Depending on applicable laws and regulations, you may need to label or watermark AI-generated content before sharing it publicly. This feature is provided to help you meet those requirements.」\nOne button 「Got it」, no X', pri: 'P2', refs: [rInfo, rInfoFree], notes: 'PM draws an X on the sheet; the Design (newer source by priority) has none.' });
  add({ sec: S_SET, pre: lines(tier(p, paids[0]), 'Menu › Settings open'), act: lines('Tap the ⓘ beside 「Remove AIGC Watermark」', 'Tap 「Got it」'), exp: 'Step 1: the same 「AIGC Watermark」 sheet opens\nStep 2: the sheet closes, the Menu is shown again and the switch keeps its value', pri: 'P2', refs: [rInfoPaid, rGotIt] });
  if (p === 'android') add({ sec: S_BACK, pre: lines(tier(p, free), 'The 「AIGC Watermark」 info sheet is open'), act: 'Press system Back', exp: 'The sheet closes like 「Got it」\nThe Menu stays open with the switch unchanged', pri: 'P2', refs: [rBack] });
  add({ sec: S_SET, pre: lines(tier(p, free), sw('Off')), act: lines('Turn 「Remove AIGC Watermark」 On', 'Leave the Menu and open it again'), exp: 'Step 1: the switch turns On with no paywall, upgrade prompt or sign-in request\nStep 2: the switch is still On', pri: 'P1', refs: [rNoGate, rSwitch], notes: 'Q-2: tier gating not stated; the Essential mockup draws the switch On.' });
  add({ sec: S_SET, pre: sw('On'), act: lines('Close the app completely', 'Open it again', 'Open ☰ Menu › Settings'), exp: '「Remove AIGC Watermark」 is still On', pri: 'P2', refs: [rPersist] });
  add({ sec: S_SET, pre: p === 'ios' ? 'Fresh install of the build (not possible on the QA iPhone: recorded Blocked as test-data)' : lines('Logs pulled', 'Reset (part of this case): adb shell pm clear the app', 'Sign in again'), act: lines('Open the app and get past the first-launch screens', 'Open ☰ Menu › Settings'), exp: '「Remove AIGC Watermark」 is Off', pri: 'P1', refs: [rDefault], notes: p === 'ios' ? 'Q-1. PowerDirector cannot be reinstalled on the QA iPhone (AGENTS.md): Blocked --as test-data.' : 'Q-1. One-way: runs last in its phase.', needs: p === 'ios' ? ['fresh-install'] : [] });

  // Artwork / size variants (Text to Image aspect ratios, Text to Video landscape)
  for (const [shape, dims] of [['portrait (9:16)', '1080 × 1920 → label 130 px'], ['landscape (16:9)', '1920 × 1080 → label 130 px'], ['square (1:1)', '1080 × 1080 → label 130 px']]) {
    add({ sec: S_ART, pre: lines(sw('Off'), `A Text to Image result in ${shape} in My Artwork`), act: lines('Open the result', 'Tap 「Save」', 'Copy the saved image to the computer'), exp: `The AI label sits in the top-left corner\nIts outer box (padding included) is 12% of the short side (${dims}, ±2 px)\nIt is the AI label artwork: dark rounded square, white 「AI」 in a bracket frame, sparkle at the top right`, pri: shape.startsWith('portrait') ? 'P1' : 'P2', refs: [rImgPos, rSize, rAsset], notes: 'Measure on the full-resolution file, not a screenshot. If the build saves another resolution, 12% of its short side applies.', needs: ['credits'] });
  }
  for (const [shape, dims] of [['portrait (9:16)', '1080 × 1920'], ['landscape (16:9)', '1920 × 1080']]) {
    add({ sec: S_ART, pre: lines(sw('Off'), `A Text to Video result in ${shape} in My Artwork`), act: lines('Open the result', 'Tap 「Save」', 'Copy the saved video to the computer', frameCheck), exp: `0.0 s and 1.9 s: the AI label is in the top-left corner, 12% of the short side (${dims} → 130 px, ±2 px)\n2.1 s and every later frame checked (middle, last): no label`, pri: 'P1', refs: [rVidPos, rVidSize, rAsset], notes: 'Q-3: video size assumed 12% like images. Q-16: a result shorter than 2 s keeps the label throughout (assumption, not asserted).', needs: ['credits'] });
  }
  for (const [lang, code] of LANGS) {
    add({ sec: S_ART, pre: lines(`App language ${lang} (${code})`, sw('Off')), act: lines('Generate a song in AI Music Generator (answer the AIGC dialog with 「Generate」)', 'Play it in My AI Music from the start'), exp: `The song opens with the spoken clip 「This audio was generated by AI.」 in ${lang}\nThe music follows the clip`, pri: code === 'ENU' ? 'P1' : 'P2', refs: [rAudio], notes: 'Q-5: language list not stated; the PM sample audio (SharePoint) could not be opened. Evidence: screen recording with sound.', needs: ['credits', 'app-language'] });
  }

  // Video results per feature
  for (const f of VIDEO) {
    const i2v = f === 'Image to Video';
    add({ sec: S_VID, pre: lines(sw('Off'), `A finished ${f} result in My Artwork`), act: i2v
      ? lines('Open AI Magic › 「My Artwork」', 'Look at the Image to Video tile', 'Tap it', 'Tap 「View」 on the result', 'Play the first 3 s', 'Tap 「Full Editor」 and play the first 3 s')
      : lines('Open AI Magic › 「My Artwork」', `Look at the ${f} thumbnail`, 'Open the result and play its first 3 s', 'Tap 「Full Editor」 and play the first 3 s'),
      exp: i2v ? 'Step 2: the tile shows no AI label\nStep 3: the Image to Video task list opens\nStep 4: the result page opens with Share Video, 「Full Editor」 and 「Save」\nSteps 5–6: no AI label in the player or the editor preview'
        : 'Step 2: the thumbnail shows no AI label\nSteps 3–4: no AI label in the player or the editor preview',
      pri: 'P2', refs: i2v ? [rVidNoWm, rArrowTile, rArrowView] : [rVidNoWm], notes: 'The switch is Off so a label would show if the rule were broken.', needs: ['credits'] });
    add({ sec: S_VID, pre: lines(sw('Off'), `The ${f} result page open`), act: lines('Tap 「Save」', 'Copy the saved video to the computer', frameCheck), exp: '0.0 s and 1.9 s: the AI label is in the top-left corner at 12% of the short side\n2.1 s and later: no label\nThe rest of the video is unchanged', pri: 'P1', refs: [rVidSaveOff], notes: 'Keep this file for the C2PA rows and the already-saved rows.', needs: ['credits'] });
    add({ sec: S_VID, pre: lines(sw('On'), `The same ${f} result page open`), act: lines('Tap 「Save」', 'Copy the saved video to the computer', frameCheck), exp: 'No AI label at 0.0 s, 1.9 s or later', pri: 'P1', refs: [rVidSaveOn, rSwitch], needs: ['credits'] });
  }
  add({ sec: S_VID, pre: lines(sw('Off'), 'An Image to Video result page open', 'Instagram installed and signed in on the phone'), act: lines('Tap 「Instagram」 under Share Video', 'Look at the video in Instagram\'s composer', 'Leave Instagram without posting'), exp: 'Instagram opens with the video\nIts first 2 s show the AI label at the top-left, later frames none\nNothing is posted', pri: 'P2', refs: [rVidShare], notes: 'Never post. Evidence: screen recording of the composer preview.', needs: ['credits', 'share-app'] });
  add({ sec: S_VID, pre: lines(sw('On'), 'The same Image to Video result page open', 'Instagram installed and signed in'), act: lines('Tap 「Instagram」 under Share Video', 'Look at the video in Instagram\'s composer', 'Leave Instagram without posting'), exp: 'The video shows no AI label\nNothing is posted', pri: 'P2', refs: [rVidShare], needs: ['credits', 'share-app'] });

  // Image results per feature
  for (const f of IMAGE) {
    add({ sec: S_IMG, pre: lines(sw('Off'), `A finished ${f} result in My Artwork`), act: lines('Open AI Magic › 「My Artwork」', `Look at the ${f} thumbnail`, 'Open the result', 'Tap 「Full Editor」'), exp: 'Step 2: the thumbnail shows no AI label\nStep 3: the result shows no AI label\nStep 4: the editor preview shows no AI label', pri: 'P2', refs: [rImgNoWm], needs: ['credits'] });
    add({ sec: S_IMG, pre: lines(sw('Off'), `The ${f} result open`), act: lines('Tap 「Save」', 'Copy the saved image to the computer'), exp: 'The AI label is in the top-left corner at 12% of the short side', pri: 'P1', refs: [rImgSave], notes: 'Q-4: PM states Save / Share only for videos; images assumed the same (Global Rule, Jira).', needs: ['credits'] });
    add({ sec: S_IMG, pre: lines(sw('On'), `The same ${f} result open`), act: lines('Tap 「Save」', 'Copy the saved image to the computer'), exp: 'The image has no AI label', pri: 'P1', refs: [rImgSave], needs: ['credits'] });
  }
  add({ sec: S_IMG, pre: lines(sw('Off'), 'A Text to Image result open', 'Instagram installed and signed in'), act: lines('Share it to Instagram', 'Look at the image in Instagram\'s composer', 'Leave without posting'), exp: 'The image shows the AI label at the top-left\nNothing is posted', pri: 'P2', refs: [rImgShare], notes: 'Q-4. Never post.', needs: ['credits', 'share-app'] });
  add({ sec: S_IMG, pre: lines(sw('On'), 'The same Text to Image result open', 'Instagram installed and signed in'), act: lines('Share it to Instagram', 'Look at the image in Instagram\'s composer', 'Leave without posting'), exp: 'The image shows no AI label\nNothing is posted', pri: 'P2', refs: [rImgShare], needs: ['credits', 'share-app'] });

  // Music
  add({ sec: S_AUD, pre: lines(sw('Off'), 'AI Music Generator open with a description typed'), act: 'Tap 「Generate for ◆ 6」', exp: 'The dialog 「AIGC Watermark」 opens\nBody 「Your generated music will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」\nAn unticked checkbox 「Don’t show again」\nButtons 「Cancel」 and 「Generate」', pri: 'P2', refs: [rMDlg], notes: 'PM-only: no Design frame yet (Design 2608). Credit price on the button is the build\'s, not checked here.' });
  add({ sec: S_AUD, pre: lines(sw('Off'), 'The music 「AIGC Watermark」 dialog open', 'Credit balance read'), act: 'Tap 「Cancel」', exp: 'The dialog closes\nThe AI Music Generator page shows the same description and settings\nNothing is generating\nThe credit balance is unchanged', pri: 'P2', refs: [rMCancel] });
  if (p === 'android') add({ sec: S_BACK, pre: lines(sw('Off'), 'The music 「AIGC Watermark」 dialog open'), act: 'Press system Back', exp: 'The dialog closes like 「Cancel」\nNothing is generating', pri: 'P2', refs: [rBack] });
  add({ sec: S_AUD, pre: lines(sw('Off'), 'The music 「AIGC Watermark」 dialog open'), act: 'Tap 「Generate」 (checkbox left unticked)', exp: 'The dialog closes\nThe popup 「Generating...」 with a percentage and 「Go to My AI Music」 appears', pri: 'P1', refs: [rMGen], needs: ['credits'] });
  add({ sec: S_AUD, pre: lines(sw('Off'), 'The song from the previous row finished in My AI Music'), act: 'Play it from the start in My AI Music', exp: 'It opens with 「This audio was generated by AI.」, then the music', pri: 'P1', refs: [rMPrev], notes: 'Evidence: screen recording with sound.', needs: ['credits'] });
  add({ sec: S_AUD, pre: 'The same song in My AI Music', act: lines('Download it', 'Play the downloaded file in the phone\'s Files / music app'), exp: 'The file opens with the spoken clip', pri: 'P1', refs: [rMDown, rMServer], needs: ['credits'] });
  add({ sec: S_AUD, pre: 'The same song in My AI Music', act: lines('Add it to the timeline of a new project', 'Play the project from 0:00'), exp: 'The song plays without the spoken clip', pri: 'P1', refs: [rMTl, rMServer], notes: 'Red line on pm-rules (newest PM edit).', needs: ['credits'] });
  add({ sec: S_AUD, pre: lines(sw('Off'), 'The project from the previous row (only the song and one non-AI photo)'), act: lines('Tap 「Export」', 'Tap 「Export」 in the AIGC dialog', 'Tap 「Produce」', 'Copy the file to the computer', frameCheck), exp: 'Steps 1–2: the export AIGC dialog appears and leads to the Produce sheet\nStep 5: the AI label is at the top-left at 0.0 s and 1.9 s, gone at 2.1 s\nStep 5: no spoken clip at the start', pri: 'P1', refs: [rMExp], needs: ['credits'] });
  add({ sec: S_AUD, pre: lines(sw('On'), 'The same project'), act: lines('Tap 「Export」', 'Tap 「Produce」', 'Copy the file to the computer', frameCheck), exp: 'Step 1: no AIGC dialog, the Produce sheet opens directly\nStep 4: no AI label in any frame', pri: 'P2', refs: [rMExp], needs: ['credits'] });
  add({ sec: S_AUD, pre: lines(sw('On'), 'AI Music Generator open with a description typed'), act: lines('Tap 「Generate for ◆ 6」', 'When the song is ready, play it from the start in My AI Music'), exp: 'Step 1: no AIGC dialog, the generation starts at once\nStep 2: the song has no spoken clip', pri: 'P1', refs: [rMOn, rMServer], notes: 'Q-6: PM rules say Preview / Download always hear the clip; the music case shows the dialog only with the switch Off. Assumption: the switch at generation decides.', needs: ['credits'] });

  // Timeline tools
  for (const t of TOOLS) {
    add({ sec: S_TL, pre: lines(sw('Off'), `A new project with one non-AI video clip and ${t} content added from the editor`), act: 'Play the project from 0:00 in the editor preview', exp: 'The AI label shows at the top-left of the preview for the first two seconds, then disappears', pri: 'P2', refs: [rTlPrev], notes: 'Q-10: assumption for the timeline wording.', needs: ['credits'] });
    add({ sec: S_TL, pre: lines(sw('Off'), `The same project with ${t} content`), act: lines('Tap 「Export」', 'Tap 「Export」 in the AIGC dialog', 'Tap 「Produce」', 'Copy the file to the computer', frameCheck), exp: 'Step 1: the export AIGC dialog appears\nStep 2: the Produce sheet opens\nStep 5: the AI label is at the top-left at 0.0 s and 1.9 s, gone at 2.1 s', pri: 'P1', refs: [rTlExp, rEProd], needs: ['credits'] });
    add({ sec: S_TL, pre: lines(sw('On'), `The same project with ${t} content`), act: lines('Play from 0:00 in the editor', 'Tap 「Export」', 'Tap 「Produce」', 'Copy the file to the computer'), exp: 'Step 1: no AI label in the preview\nStep 2: no AIGC dialog, the Produce sheet opens directly\nStep 4: no AI label in any frame', pri: 'P1', refs: [rTlPrev, rTlExp, rEOn], needs: ['credits'] });
  }
  add({ sec: S_TL, pre: lines(sw('Off'), 'A project with AI Text to Speech content'), act: lines('Share the project to Instagram from the editor\'s share screen', 'Look at the video in Instagram\'s composer', 'Leave without posting'), exp: 'The first 2 s show the AI label at the top-left\nNothing is posted', pri: 'P2', refs: [rTlShare], notes: 'Never post.', needs: ['credits', 'share-app'] });
  add({ sec: S_TL, pre: lines(sw('On'), 'The same project'), act: lines('Share the project to Instagram from the editor', 'Look at the video in the composer', 'Leave without posting'), exp: 'No AI label\nNothing is posted', pri: 'P2', refs: [rTlShare], needs: ['credits', 'share-app'] });
  add({ sec: S_TL, pre: lines(sw('Off'), 'A project whose first clip is a 5 s non-AI clip', 'An AI Anime clip follows it from 0:05'), act: lines('Export it (answer the AIGC dialog with 「Export」)', 'Copy the file to the computer', frameCheck), exp: 'The AI label is on the non-AI clip at 0.0 s and 1.9 s\nNo label from 2.1 s on, including over the AI Anime clip at 0:05', pri: 'P2', refs: [rTlFirst], notes: 'Q-9: from the PM example (badge on the first, non-AI clip).', needs: ['credits'] });
  add({ sec: S_TL, pre: lines(sw('Off'), 'A project with only non-AI clips, text and stickers'), act: lines('Tap 「Export」', 'Tap 「Produce」', 'Copy the file to the computer'), exp: 'Step 1: no AIGC dialog, the Produce sheet opens directly\nStep 3: no AI label', pri: 'P2', refs: [rTlNone], notes: 'Q-7.' });
  add({ sec: S_TL, pre: lines(sw('Off'), 'An Image to Video result opened with 「Full Editor」 (no other change)'), act: lines('Tap 「Export」', 'Tap 「Export」 in the AIGC dialog if shown', 'Tap 「Produce」', 'Copy the file to the computer', frameCheck), exp: 'The AIGC dialog appears\nThe produced file has the AI label at 0.0 s and 1.9 s, none from 2.1 s', pri: 'P2', refs: [rTlArt], notes: 'Q-19: the PM says only that the timeline shows no watermark; export assumed to follow the switch.', needs: ['credits'] });

  // Export dialog
  add({ sec: S_EXP, pre: lines(sw('Off'), 'A project with AI Anime content'), act: 'Tap 「Export」', exp: 'The dialog 「AIGC Watermark」 opens over the dimmed editor\nBody 「Your exported file will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」\nAn unticked checkbox 「Don’t show again」\nButtons 「Cancel」 and 「Export」', pri: 'P2', refs: [rEDlg], notes: 'PM-only: no Design frame yet (Design 2608).', needs: ['credits'] });
  add({ sec: S_EXP, pre: 'The export 「AIGC Watermark」 dialog open', act: 'Tap 「Cancel」', exp: 'The dialog closes\nThe editor stays open with the project unchanged\nNo Produce sheet and no export', pri: 'P2', refs: [rECancel] });
  if (p === 'android') add({ sec: S_BACK, pre: 'The export 「AIGC Watermark」 dialog open', act: 'Press system Back', exp: 'The dialog closes like 「Cancel」\nThe editor stays open, nothing is exported', pri: 'P2', refs: [rBack] });

  // Already saved
  add({ sec: S_KEEP, pre: 'The video saved with the switch Off in the Image to Video save row', act: lines('Turn the switch On', 'Open the saved video again in the phone\'s gallery'), exp: 'The saved video still shows the AI label in its first 2 s', pri: 'P2', refs: [rKeep] });
  add({ sec: S_KEEP, pre: 'The video saved with the switch On in the Image to Video save row', act: lines('Turn the switch Off', 'Open that saved video again in the gallery'), exp: 'It still has no AI label', pri: 'P2', refs: [rKeep] });
  add({ sec: S_KEEP, pre: lines(sw('Off'), 'A Text to Image result already saved once with the switch On'), act: lines('Open the result again in My Artwork', 'Tap 「Save」', 'Compare the two saved files'), exp: 'The new file has the AI label\nThe earlier file still has none', pri: 'P2', refs: [rResave], needs: ['credits'] });

  // C2PA
  for (const [f, path, eff, signed, who] of META) {
    add({ sec: S_META, pre: lines(sw('Off'), `${/^[AEIOU]/.test(f) ? 'An' : 'A'} ${f} result made with ${path}`), act: lines('Save (or download) the result', 'Copy the file to the computer', 'Read its Content Credentials (c2patool <file>)'), exp: signed ? `A C2PA manifest is present and valid\nIts signer is ${who}\nIt marks the content as AI-generated` : 'No C2PA manifest is found in the file', pri: 'P2', refs: [signed ? rMeta : rNoMeta], notes: `Sheet line: ${eff} (${signed ? `有簽章 (${who})` : '無簽章'}). Q-12: RD to confirm which effect the build calls for this path; n/a when the build does not offer the model.`, needs: ['credits', 'c2pa-tool'] });
  }
  add({ sec: S_META, pre: lines(sw('On'), 'A Text to Image result'), act: lines('Tap 「Save」', 'Copy the file to the computer', 'Read its Content Credentials (c2patool <file>)'), exp: 'The image has no AI label\nThe C2PA manifest is still present, signed by CyberLink', pri: 'P1', refs: [rMetaToggle, rMeta], needs: ['credits', 'c2pa-tool'] });
  add({ sec: S_META, pre: lines(sw('On'), 'An Image to Video result made with a Google model'), act: lines('Tap 「Save」', 'Copy the file to the computer', 'Read its Content Credentials'), exp: 'The video has no AI label\nThe C2PA manifest is still present, signed by Google', pri: 'P1', refs: [rMetaToggle, rMeta], needs: ['credits', 'c2pa-tool'] });
  for (const [t, eff, , who] of META_TOOLS) {
    add({ sec: S_META, pre: `A project with ${t} content`, act: lines('Find a way to read the generated asset as a file', 'Read its Content Credentials'), exp: `The ${t} asset carries a C2PA manifest signed by ${who}`, pri: 'P3', refs: [rMetaTool], notes: `Sheet line: ${eff} 有簽章 (${who}). Parked: the asset stays inside the project (Q-13).`, needs: ['observability-asset'] });
  }

  // one-way rows last
  add({ sec: S_AUD, pre: lines(sw('Off'), 'The music AIGC dialog open'), act: lines('Tick 「Don’t show again」', 'Tap 「Generate」', 'When it finishes, start another generation'), exp: 'Step 2: the generation starts\nStep 3: no AIGC dialog, the second generation starts at once\nStep 3: the second song still starts with the spoken clip', pri: 'P2', refs: [rMNoShow], notes: 'One-way state: runs after every row that needs the music dialog. Q-8: does it also silence the export dialog?', needs: ['credits'] });
  add({ sec: S_EXP, pre: lines(sw('Off'), 'A project with AI Sketch content', 'The export dialog has never been silenced'), act: lines('Tap 「Export」', 'Tick 「Don’t show again」', 'Tap 「Export」 and produce', 'Tap 「Export」 again on the same project', 'Produce and copy both files to the computer'), exp: 'Step 4: no AIGC dialog, the Produce sheet opens directly\nStep 5: both files have the AI label in their first 2 s', pri: 'P2', refs: [rENoShow], notes: 'One-way state: runs after every row that needs the export dialog (pass 9 of the coverage rules). Q-8.', needs: ['credits'] });

  // Number rows
  const pfx = p === 'ios' ? 'TC-' : 'TC-';
  return rows.map((r, i) => ({ ...r, id: `${pfx}${String(i + 1).padStart(3, '0')}` }));
}

const csvq = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;

for (const p of ['ios', 'android'] as P[]) {
  const out = build(p);
  const head = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
  const csv = [head.join(',')].concat(out.map(r => [r.id, r.sec, r.pre, r.act, r.exp, r.pri, r.refs.join(', '), r.notes ?? '', 'new', 'New table (REQ-001)'].map(csvq).join(','))).join('\n') + '\n';
  writeFileSync(join(DRAFTS[p], 'draft.csv'), csv);
  const byReq = (id: string) => out.filter(r => r.refs.includes(id)).map(r => r.id);
  const reqText = (rq: Req) => {
    if (rq.id === rBack && p === 'ios') return null;
    const walked = [rInfoFree, rInfoPaid, rArrowTile, rArrowView].includes(rq.id) ? ` Walked by: ${byReq(rq.id).join(', ')}.` : '';
    return `- ${rq.id} ${rq.text}${walked}`;
  };
  const secs = [...new Set(reqs.map(r => r.sec))];
  let md = `# AIGC Watermark — requirements (${p})
Spec: AIGC Watermark - PM Figma 0-1.md (text of the PM Figma page ${PMU}0-1, read 2026-11-17),
AIGC Watermark - Design Figma 3815-9037.md (Design frame 「2608_AIGC Watermark」 ${DS}3815-9037, read 2026-11-17),
PDRIOS-722 Jira description.md (pasted by the user) and [C2PA] GAI effects.xlsx (extracted/c2pa-gai-effects.md).
Figma-only spec set 2026-11-17, no PDF. Source order: Design, then PM; the sheet decides which effects are signed (REQ-002).

The Design draws only the Settings row, its info sheet and the AI label size. The export and music dialogs, the
per-class rules (My Artwork, audio, timeline) and the paid Menu are PM-only (pass 7) and are checked again when the
Design draws them. Saved files are checked on the computer: frames by ffmpeg, the label size in pixels, Content
Credentials with c2patool (fixtures.md).
`;
  for (const s of secs) {
    const items = reqs.filter(r => r.sec === s).map(reqText).filter(Boolean);
    if (items.length) md += `\n## ${s}\n${items.join('\n')}\n`;
  }
  md += `
## Open questions
- Q-1 What is the switch's value on a fresh install, and is it kept across restarts? Both mockups draw 「Remove AIGC Watermark」 On; the dialogs say results 「will include an AIGC watermark」. Assumption: Off on a fresh install (results carry the watermark), kept after a restart. ${rDefault}, ${rPersist}.
- Q-2 Is the switch free for every tier? The Essential (free) mockup draws it On next to the paid 「Remove Watermark」. Assumption: free for all tiers, no paywall. ${rNoGate}.
- Q-3 The 12% rule names images (「img 短邊」). Assumption: a video's label is also 12% of the frame's short side, at the same top-left corner with no margin beyond the asset's own padding. ${rVidSize}.
- Q-4 The PM lists Save / Share only under Video; Image lists thumbnail, View and Full Editor. Assumption: image Save and Share follow the switch too (Global Rule, Jira 「consistently across export/share/save」). ${rImgSave}, ${rImgShare}.
- Q-5 Which languages does the spoken clip come in, and what picks it (app language, phone language, the song's language)? The sample audio link on the PM board is on SharePoint and could not be opened. Assumption: the app language; English, Traditional Chinese and Japanese are checked. ${rAudio}.
- Q-6 Does the switch remove the spoken clip from music? PM rules say Preview and Download always hear it; the Music Generator case shows the dialog only 「If Remove AIGC Watermark toggle off」 and the Jira says the setting controls the watermark. Assumption: the switch value at 「Generate」 decides; On gives a song with no clip. ${rMOn}, ${rMServer}.
- Q-7 When does the export dialog appear? The PM draws it after 「Export」 with no condition and no Cancel arrow. Assumption: only with the switch Off and AI content in the project; a project with no AI content exports with no dialog and no label; 「Cancel」 stays in the editor. ${rTlNone}, ${rECancel}, ${rEDlg}.
- Q-8 Do the export and music dialogs share one 「Don’t show again」? Assumption: separate. ${rMNoShow}, ${rENoShow}.
- Q-9 The PM example puts the AI badge on the first clip, which is 「非 AI 素材」. Assumption: the label goes on the project's first two seconds wherever the AI clip is. ${rTlFirst}.
- Q-10 「Timeline: 會根據 Preference 設定來決定會不會有 watermark」 for TTS, Voice Changer, AI Anime, AI Cartoon, AI Sketch, while My Artwork results show none in the timeline. Assumption: the editor preview shows the label over the project's first two seconds when the switch is Off. ${rTlPrev}.
- Q-11 Which scope items are My Artwork results and which are editor tools? Assumption: videos = ${VIDEO.join(', ')}; images = ${IMAGE.join(', ')}; timeline tools = ${TOOLS.join(', ')} (the PM timeline note names them); Music Generator = pure audio. Rows of a feature the build lacks on ${p} are n/a.
- Q-12 Which sheet effect does each PDR feature and model call, and how should QA read the manifest? The Jira's 「加meta data的方式」 kit is a SharePoint folder that could not be opened. Assumption: the effect named in each C2PA row's Notes; c2patool (or contentcredentials.org/verify) on the saved file. ${rMeta}, ${rNoMeta}.
- Q-13 Should an editor export that holds signed AI content carry C2PA metadata, and can a timeline tool's generated asset be read as a file? The spec is silent; no row asserts the exported project's metadata, and the timeline-tool rows are parked. ${rMetaTool}.
- Q-14 The PM 「AIGC Watermark Spec.pptx」 (SharePoint) could not be opened; it may hold margin, opacity or per-feature rules not in Figma.
- Q-16 A video result shorter than two seconds: assumption the label stays for the whole video (no row asserts it). ${rVidPos}.
- Q-17 The Jira is iOS (PDRIOS-722). Is Android in the same release with the same rules? The Android table assumes so.
- Q-19 A My Artwork video opened with 「Full Editor」 and exported: the PM says only that the timeline shows no watermark. Assumption: the export follows the switch like other AI content. ${rTlArt}.

## Added 2026-11-17 — coverage passes and standing inputs

### Job states
| Job | Start/loading | Success | Failure | Retry | Stop | Leave and return | Done notice |
|---|---|---|---|---|---|---|---|
| Save result with watermark | n/a (spec silent: Save's own feedback is the result page's, unchanged) | ${byReq(rVidSaveOff)[0]} | n/a (spec silent) | n/a (spec silent) | n/a (no stop) | n/a (spec silent) | n/a (spec silent) |
| Export project with watermark | n/a (the Produce sheet is the editor's, unchanged) | ${byReq(rTlExp)[0]} | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) |
| Music generation with watermark | ${byReq(rMGen)[0]} | ${byReq(rMPrev)[0]} | n/a (Music Generator's own table) | n/a (Music Generator's own table) | n/a (spec silent) | n/a (spec silent) | n/a (Music Generator's own table) |

### Exit × stage
| Stage | Dismiss button | System Back (Android) |
|---|---|---|
| Info sheet open | ${byReq(rGotIt).join(', ')} | ${p === 'android' ? byReq(rBack)[0] : 'n/a (iOS has no system Back)'} |
| Music dialog open | ${byReq(rMCancel).join(', ')} | ${p === 'android' ? byReq(rBack)[1] : 'n/a (iOS has no system Back)'} |
| Export dialog open | ${byReq(rECancel).join(', ')} | ${p === 'android' ? byReq(rBack)[2] : 'n/a (iOS has no system Back)'} |

### Error classes
| Job | Any error class |
|---|---|
| Save / export / music generation with watermark | n/a (the spec names no error classes for the watermark; generation errors belong to each AI feature's table) |

### Hidden clauses
| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| ${rMeta} | C2PA manifest signed by the sheet's party | c2patool on the saved file copied to the computer | ${byReq(rMeta).join(', ')} |
| ${rNoMeta} | no manifest from 無簽章 effects | c2patool on the saved file | ${byReq(rNoMeta).join(', ')} |
| ${rMetaToggle} | the switch leaves the metadata alone | c2patool on a file saved with the switch On | ${byReq(rMetaToggle).join(', ')} |
| ${rMServer} | the server adds the music clip at generation; the timeline copy has none | the downloaded file against the timeline playback | ${byReq(rMServer).join(', ')} |
| ${rKeep} | saved files are not updated later | the gallery copy after the switch changes | ${byReq(rKeep).join(', ')} |
| ${rMCancel} | Cancel takes no credits | the credit balance before and after | ${byReq(rMCancel).join(', ')} |
| ${rMetaTool} | timeline-tool assets are signed | no file to read on the phone (parked, Q-13) | ${byReq(rMetaTool).join(', ')} |

### Variants
| Requirement | Variant | Rows |
|---|---|---|
`;
  const paids = p === 'ios' ? ['Pro', 'Pro+'] : ['Pro'];
  const v = (id: string, name: string, f: (r: any) => boolean) => { md += `| ${id} | ${name} | ${out.filter(r => r.refs.includes(id) && f(r)).map(r => r.id).join(', ')} |\n`; };
  for (const t of paids) v(rPaid, `tier ${t}`, r => r.pre.includes(`${t} `) || r.pre.includes(`= ${t})`));
  for (const s of ['portrait', 'landscape', 'square']) v(rSize, s, r => r.pre.includes(s));
  for (const [l] of LANGS) v(rAudio, l, r => r.pre.includes(l));
  for (const f of VIDEO) { v(rVidSaveOff, f, r => r.pre.includes(`${f} result`)); v(rVidSaveOn, f, r => r.pre.includes(`${f} result`)); v(rVidNoWm, f, r => r.pre.includes(`${f} result`)); }
  for (const f of IMAGE) { v(rImgSave, f, r => r.pre.includes(`${f} result`)); v(rImgNoWm, f, r => r.pre.includes(`${f} result`)); }
  for (const t of TOOLS) { v(rTlPrev, t, r => r.pre.includes(`${t} content`)); v(rTlExp, t, r => r.pre.includes(`${t} content`)); }
  for (const [f, path] of META) v(META.find(m => m[0] === f && m[1] === path)![3] ? rMeta : rNoMeta, `${f} · ${path}`, r => r.pre.includes(`${f} result made with ${path}`));
  md += `
### Flow arrows walked by existing rows
- ${rInfoFree}, ${rInfoPaid}, ${rArrowTile}, ${rArrowView}: walked by the rows named on each requirement. The other arrows are requirements with their own rows (3816-10913 ${rInfo}, 86-955 ${rEDlg}, 86-956 ${rEProd}, 97-1818 ${rMDlg}, 97-1819 ${rMGen}, 97-1820 ${rMCancel}).

### Domain rules
| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (this feature adds no failure path; generation failures belong to each AI feature's table) |
${p === 'android' ? '| KP-066 Android text against the Android font | n/a (design check only, figma skill) |\n' : ''}
### Request ledger coverage
| Ledger entry | Requirements |
|---|---|
| REQ-002 | ${rMeta}, ${rNoMeta} |
`;
  writeFileSync(join(DRAFTS[p], 'requirements.md'), md);
  console.log(p, out.length, 'rows', reqs.length, 'requirements');
}
