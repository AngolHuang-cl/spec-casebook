# Update plan — Video Enhance (ios), draft 20261124-150000

Based on approved v7 (205 rows). Same spec set; the change comes from the request ledger.

## Summary
- New: 26 rows in a new last section **MUI** (TC-321 – TC-346) for the 26 languages of
  `library/pdr/product.json` › `mui` [REQ-041]: one walk per language that checks translation and truncation together (the app bundle cannot be read on the QA iPhone).
- Modified: none. Removed: none.

## Requirements
- New R-208 (translation) and R-209 (truncation); `### Variants` gains a line per requirement × language.

## How the rows run
- The MUI rows are their own phase `MUI` in phases.json, run on request (string freeze, new languages, before
  release), never part of a full run.
- Each walk reaches every screen by the rows that already do, one `texts` read and screenshot per screen, and starts no
  task: the only cost is the 10 s task left at the leave dialog (TC-113: its small price is not restored).
- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  `mui-doubts.md` and the eBug review page's Translation doubts panel.

## Not added
- The completion banner and the system notification (TC-130, TC-133): reading them needs a finished task per
  language (26 generations). Left out on iOS; Android reads their text from the APK.
- The notification prompt 「Turn on notifications」 (TC-118): it shows only until it is answered (TC-120), so walking
  it in 26 languages needs a reset of the app's state per language (and PowerDirector cannot be reinstalled on the QA iPhone).
- The IAP and Credit pages: shared with other features, not this feature's strings.
