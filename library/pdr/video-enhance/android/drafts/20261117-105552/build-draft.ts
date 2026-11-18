// Builds draft 20261117-105552 of pdr/video-enhance for one platform (REQ-020): the spec agent's Android set was
// rebuilt at 4f9efe41 (373 definitions); 47 have no casebook row in its crosswalk. 39 are covered, 2 cannot be encoded
// (719p, 721p), and these 6 become rows: TC-315 – TC-317 new (TC-VE2-331 – 333), TC-063 (TC-VE2-334) and TC-270
// (TC-VE2-435, 437) modified. The same file builds both platforms from their approved cases.csv.
// REQ-021 adds TC-162 (modified) and TC-318 – TC-320 (new): spec agent TC-VE2-298, 300, 301, 285.
// Usage: node library/pdr/video-enhance/android/drafts/20261117-105552/build-draft.ts <ios|android>
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readRecords, writeRecords } from '../../../../../../scripts/lib/csv.ts';

const platform = process.argv[2];
if (platform !== 'ios' && platform !== 'android') throw new Error('Usage: build-draft.ts <ios|android>');
const HERE = dirname(fileURLToPath(import.meta.url));
const TABLE = join(HERE, '..', '..', '..', platform);
const OUT = join(TABLE, 'drafts', '20261117-105552');
const COLS = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
type Row = Record<string, string>;

const rows: Row[] = readRecords(readFileSync(join(TABLE, 'cases.csv'), 'utf8'))
  .map(r => ({ ...r, Change: 'unchanged', 'Change Reason': '' }));
const get = (id: string) => { const r = rows.find(x => x.ID === id); if (!r) throw new Error(id); return r; };
const mark = (r: Row, reason: string) => Object.assign(r, { Change: 'modified', 'Change Reason': `REQ-020: ${reason}` });
const insertAfter = (id: string, ...add: Row[]) => rows.splice(rows.findIndex(r => r.ID === id) + 1, 0, ...add);
const must = (text: string, part: string, id: string) => { if (!text.includes(part)) throw new Error(`${id}: "${part}" not found`); };

// The paid-tier line each platform's rows start with (Android: the signed-in Pro account; iOS: the Pink tier switch).
const tier = get('TC-020').Precondition.split('\n')[0].replace(/^1\. /, '');
const NO_SPEC = 'A difference is a PM question: the rule has no Design or PM basis (filed to PM, AGENTS.md 2026-11-11).';

// TC-063: every Professional resolution, one selected at a time (TC-VE2-334).
const r063 = get('TC-063');
must(r063.Precondition, 'Panel open with a 1080p video', 'TC-063');
r063.Precondition = '1. Panel open with the 00:30 1080p video (ve-0030-1080p30), 「Standard」 and 「1080p」 selected\n2. Note the CTA price';
r063.Action = '1. Tap 「4K」 (or 「720p」 when 4K is disabled)\n2. Tap 「Professional」\n3. Tap 「720p」\n4. Tap 「1080p」\n5. Tap 「4K」';
r063['Expected Result'] = [
  'Step 1: the tapped chip is selected and 「1080p」 unselected',
  'Step 1: the CTA price and 「Charge X credits per second」 change to that resolution\'s rate',
  'Steps 3–5: the tapped Resolution chip is selected and the other two are not (exactly one selected at a time)',
  'Steps 3–5: 「Charge X credits per second」 changes to that resolution\'s Professional rate at 30fps (as in TC-296 – TC-298)',
].join('\n');
r063.Notes = [r063.Notes, 'Professional, each Resolution in turn (spec agent TC-VE2-334) [Req: REQ-020].'].filter(Boolean).join(' ');
mark(r063, 'each Professional resolution tapped in turn, exactly one selected (spec agent TC-VE2-334)');

// TC-270: one hundredth of a second either side of 8:00 (TC-VE2-435, TC-VE2-437), 100 fps fixtures.
const r270 = get('TC-270');
must(r270.Action, '8. Go back and open it with the 08:01 video', 'TC-270');
r270.Precondition += '\n4. Videos of 07:59.99 (ve-075999-720p100) and 08:00.01 (ve-080001-720p100) at 100 fps in the album, lengths checked with ffprobe';
r270.Action += [
  '', '9. Go back and open it with the 07:59.99 video', '10. Drag the playhead to the right handle',
  '11. Go back and open it with the 08:00.01 video', '12. Drag the playhead to the right handle',
].join('\n');
r270['Expected Result'] += [
  '',
  'Steps 9–10: the whole video is selected: the frame at the right handle is the video\'s last (burned-in 07:59.99)',
  'Steps 9–10: 「Selected Length」 shows 479.99 s as the app rounds it (record it)',
  'Steps 11–12: the selection is 00:00–08:00, not the whole video: the frame at the right handle reads 08:00.00, not the last frame',
  'Steps 11–12: 「Selected Length」 「08:00」',
].join('\n');
r270.Notes += ' Steps 9–12: one hundredth either side of 8:00 at 100 fps (spec agent TC-VE2-435, TC-VE2-437) [Req: REQ-020]; their price is not asserted (a 100 fps source defaults to 「120fps」).';
mark(r270, 'one hundredth either side of 8:00 (07:59.99, 08:00.01 at 100 fps; spec agent TC-VE2-435, TC-VE2-437)');

const fresh = (r: Omit<Row, 'Change' | 'Change Reason'>, reason: string): Row => ({ ...r, Change: 'new', 'Change Reason': `REQ-020: ${reason}` });

const t315 = fresh({
  ID: 'TC-315', Section: 'Add Media', Priority: 'P3', 'Spec Ref': 'R-205',
  Precondition: `1. ${tier}\n2. Add Media open from the feature\n3. A large local video in the album (the 12:30 1080p 60 fps ve-1230-1080p60)\n4. A screen recording running (the import may last under a second)`,
  Action: '1. Tap that video\'s thumbnail\n2. Watch the screen until the panel opens',
  'Expected Result': [
    'Before the panel opens, an import overlay shows the progress as a percentage (the number itself is not asserted)',
    'The overlay has a 「Cancel」 control',
    'The panel then opens with that video in the Preview',
  ].join('\n'),
  Notes: `Observed UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-331, VE-1012-S001-B001 / B002, seen on iOS); neither the Design nor the PM draws an import step [Req: REQ-020]. Only that 「Cancel」 is there: what it does is not specified. ${platform === 'android' ? 'On Android a local pick may open the panel with no import step: judge from the recording. ' : ''}${NO_SPEC}`,
}, 'local import progress and Cancel (spec agent TC-VE2-331)');

const t316 = fresh({
  ID: 'TC-316', Section: 'Add Media', Priority: 'P3', 'Spec Ref': 'R-206',
  Precondition: `1. ${tier}\n2. Add Media open from the feature`,
  Action: '1. Tap the sort control\n2. Close the sort panel without choosing anything',
  'Expected Result': [
    'Step 1: the sort panel offers 「Default」, 「Date」, 「Duration」 and 「Modified Date」',
    'Step 1: it offers both orders, 「Ascending」 and 「Descending」',
    'Step 2: the panel closes and the videos keep their order',
  ].join('\n'),
  Notes: `Observed UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-332, VE-1012-S001-B003, seen on iOS); the Design draws Add Media without a sort control [Req: REQ-020]. ${NO_SPEC}`,
}, 'media sort options (spec agent TC-VE2-332)');

const t317 = fresh({
  ID: 'TC-317', Section: 'Recent task', Priority: 'P3', 'Spec Ref': 'R-207, R-113',
  Precondition: `1. Signed in with an account that has never run AI Video Enhance (e.g. a Free account that never had a paid tier)${platform === 'ios' ? ': the Pink tier switch does not empty an account\'s tasks' : ''}\n2. Never delete tasks to empty the list\n3. Panel open with any video`,
  Action: 'Tap the Recent task icon in the panel\'s top bar',
  'Expected Result': 'Recent task opens with no task card\nIt shows 「No results found」',
  Notes: `Observed UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-333, VE-1012-S001-B004, seen on iOS); the Design draws no empty Recent task [Req: REQ-020]. Needs an account with no Video Enhance task (fixtures). ${NO_SPEC}`,
}, 'Recent task empty state (spec agent TC-VE2-333)');

// REQ-021: scenarios of the spec agent's new cases that no row ran (TC-VE2-298, 300, 301, 285). Checked against every
// row first: no row mentions transitions, audio, a modified clip, a closed project or an untouched Credit page close.
const req21 = (r: Row, change: string, reason: string) => Object.assign(r, { Change: change, 'Change Reason': `REQ-021: ${reason}` });
const D4 = 'PM D4 [建議] (proposal): a difference is a PM question. PM-only: no Design frame yet (Q-11).';

// TC-162: the paste-back keeps the clip's transitions and audio (TC-VE2-298).
const r162 = get('TC-162');
must(r162.Precondition, '2. A project with a 00:30 clip', 'TC-162');
r162.Precondition = r162.Precondition.replace('2. A project with a 00:30 clip',
  '2. A project with a 00:30 clip between two other clips, a transition at each end of it and a music track under it');
r162['Expected Result'] += '\nThe transitions at both ends of the clip are still there\nThe clip\'s sound and the music track play as before';
r162.Notes += ' Transitions and audio kept: PM D4 [建議] 「位置、轉場、音訊保留」 (spec agent TC-VE2-298) [Req: REQ-021].';
req21(r162, 'modified', 'transitions and audio kept after the paste-back (spec agent TC-VE2-298)');

const t318 = req21({
  ID: 'TC-318', Section: 'Timeline entry', Priority: 'P3', 'Spec Ref': 'R-132',
  Precondition: 'A Timeline task processing (TC-162 setup)',
  Action: '1. Trim 5 s off the end of the clip on the timeline\n2. Wait until the task completes',
  'Expected Result': 'Nothing is pasted into the project: the trimmed clip stays as it is\nThe result is in Recent task',
  Notes: `Twin of TC-164 for a modified clip (spec agent TC-VE2-300) [Req: REQ-021]. ${D4} Spends one 00:30 task.`,
} as Row, 'new', 'paste-back cancelled by a modified clip (spec agent TC-VE2-300)');

const t319 = req21({
  ID: 'TC-319', Section: 'Timeline entry', Priority: 'P3', 'Spec Ref': 'R-132',
  Precondition: 'A Timeline task processing (TC-162 setup)',
  Action: '1. Leave the editor to the Launcher (the project closes)\n2. Wait until the task completes\n3. Open the project again',
  'Expected Result': 'Step 3: nothing was pasted into the project: the original clip is still there\nThe result is in Recent task',
  Notes: `Twin of TC-164 for a closed project (spec agent TC-VE2-301) [Req: REQ-021]. ${D4} Spends one 00:30 task.`,
} as Row, 'new', 'paste-back cancelled by a closed project (spec agent TC-VE2-301)');

// Runs before TC-097 / TC-098, which change the balance (one-way state).
const t320 = req21({
  ID: 'TC-320', Section: 'Eligibility and purchase', Priority: 'P2', 'Spec Ref': 'R-073',
  Precondition: '1. Credit page open from the panel (TC-096), nothing bought or claimed\n2. The panel\'s selection and settings noted',
  Action: 'Tap ‹ on the Credit page',
  'Expected Result': 'The panel is back with the same video, selection and settings\nThe balance is unchanged\nNo upload starts and Recent task gets no card',
  Notes: 'Parked with TC-096 (needs low-balance). PM C2 [建議] (spec agent TC-VE2-285) [Req: REQ-021]. TC-098 closes the page after a claim.',
} as Row, 'new', 'Credit page closed with nothing bought or claimed (spec agent TC-VE2-285)');

insertAfter('TC-164', t318, t319);
insertAfter('TC-096', t320);
insertAfter('TC-020', t315, t316);
insertAfter('TC-141', t317);

writeFileSync(join(OUT, 'draft.csv'), writeRecords(COLS, rows));
const count = (c: string) => rows.filter(r => r.Change === c).length;
console.log(`${platform}: ${rows.length} rows — new ${count('new')}, modified ${count('modified')}, unchanged ${count('unchanged')}`);
