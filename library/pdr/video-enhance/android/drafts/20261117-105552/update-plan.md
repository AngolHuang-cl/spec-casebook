# Update plan — pdr/video-enhance / android: approved v9 → draft 20261117-105552

REQ-020 (user, 2026-11-17): the spec agent rebuilt its Android set at commit 4f9efe41 (2026-11-13): 373 definitions,
the 271 TC-VE2 cases plus 61 new ones and 41 source-rule samples. Its `android-casebook-crosswalk.json` maps every
Android v9 row to its cases; 47 of its cases had no row (TC-VE2-331 – 336, TC-VE2-400 – 440). Read one by one: 39 are
covered, 2 cannot be encoded, 6 become rows here. Mapping:
`android/comparisons/20261117_casebook-vs-spec-agent.mapping.json`. Rows are built by `build-draft.ts` in the
Android draft folder (the same file for both platforms) from the approved `cases.csv`. The spec agent's set is
Android-only; the six rules hold on iOS too, so iOS gets the same rows.

## Spec files
- Unchanged: spec set 2026-11-03 (Design HceGLJVaxnKsv7gXSXzKWh page 2974:19965, PM mppB4GYkuVMVvHrdBeSAAU; Figma only).

## Requirement changes
- New: R-205 (import progress and Cancel), R-206 (Add Media sort options), R-207 (Recent task empty state). Source:
  the spec agent's user-approved observed UI (2026-10-12, seen on iOS, contracts VE-1012-S001-B001 – B004). The Design
  and PM are silent, so REQ-008 makes them rows; a difference is a PM question, not a defect.
- R-030 and R-046 unchanged; their rows run more scenarios.
- REQ-021: R-131 also says the paste-back keeps the clip's position, transitions and audio; R-132 also names a
  modified clip (both from PM D4 [建議], the text the rows already cite). R-073 unchanged; it gets a row of its own.

## Case changes
- New (6):
  - TC-315 local import shows a percentage and 「Cancel」 before the panel opens (TC-VE2-331), after TC-020
  - TC-316 the sort panel's four orders and Ascending / Descending (TC-VE2-332), after TC-315
  - TC-317 Recent task with no task shows 「No results found」 (TC-VE2-333), after TC-141
  - TC-320 ‹ on the Credit page with nothing bought or claimed: panel, balance and tasks unchanged (TC-VE2-285), after
    TC-096 and before the rows that change the balance (REQ-021)
  - TC-318 the clip is trimmed during generation: nothing pasted back (TC-VE2-300), after TC-164 (REQ-021)
  - TC-319 the project is closed during generation: nothing pasted back (TC-VE2-301), after TC-318 (REQ-021)
- Modified (3):
  - TC-063 Professional: 720p, 1080p and 4K tapped in turn, exactly one selected each time (TC-VE2-334)
  - TC-270 07:59.99 and 08:00.01 at 100 fps, one hundredth either side of 8:00 (TC-VE2-435, TC-VE2-437)
  - TC-162 the paste-back keeps the transitions at both ends and the audio (TC-VE2-298) (REQ-021)
- Removed (0). Unchanged: 210.

## Already covered (no change)
- fps samples 1, 24, 29, 30, 31, 50, 59, 60, 61, 119, 120, 144, 240 (TC-VE2-400 – 412): TC-052 – TC-055.
- Resolution samples 360p, 480p, 718p, 720p, 722p, 900p, 1080p, 1081p, 1200p, 1440p, 2160p, 4320p: TC-056 – TC-058, TC-022.
- Length samples 1, 479, 479.97, 480, 480.03, 481 s: TC-270; 30 s: TC-277; 90 s: every 01:30 row (TC-041, TC-278 –);
  149.99 / 150 s: TC-261; 150.01 / 750 s: TC-262.
- TC-VE2-335 (top-left Back → Add Media): TC-038 (R-028; Android also TC-202, system Back). TC-VE2-336 (Pro or Pro+ with credits: Enhance
  enabled): every priced row (TC-270, TC-278 – TC-313).

## Not added
- TC-VE2-416 (719p) and TC-VE2-418 (721p): an odd height cannot be encoded as 4:2:0 H.264; 718p and 722p stand in
  (TC-056, TC-057), as in REQ-016.
- TC-VE2-077, 078, 175 stay as in REQ-016 (the spec agent holds them too).

## Fixtures
- `ve-075999-720p100` and `ve-080001-720p100` in `fixtures/make-videos.ts` (TC-270).
- An account with no Video Enhance task (TC-317): a Free account that never had a paid tier; never delete tasks.
- TC-315 uses the existing 12:30 1080p 60 fps video and a screen recording.

## No duplicates (REQ-021)
Before adding, every row was searched for transitions, audio, a modified clip, a closed project and a Credit page
closed untouched: none. TC-164 deletes the clip, TC-098 closes the Credit page after a claim, Android TC-207 uses
system Back. No two rows of the draft share a precondition and action.

## Rerun
TC-063, TC-270 and TC-315 – TC-317 run in the next round; none spends credits.
REQ-021: TC-162, TC-318 and TC-319 each spend one 00:30 task; TC-320 is parked with TC-096 (needs a low balance).
