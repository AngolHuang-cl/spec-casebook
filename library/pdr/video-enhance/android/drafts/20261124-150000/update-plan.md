# Update plan — Video Enhance (android), draft 20261124-150000

Based on approved v10 (219 rows). Same spec set; the change comes from the request ledger.

## Summary
- New: 27 rows in a new last section **MUI** (TC-321 – TC-347) for the 26 languages of
  `library/pdr/product.json` › `mui` [REQ-041]: one row reads every translation from the build's APK (no phone, no credits), then one truncation walk per language on the phone.
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
- The Free-account CTA (「Unlock Pro to Enhance」, TC-090) on the phone: Android has no tier switch. Its translations
  are read from the APK (TC-321); only its truncation is not walked.
- The completion banner and the system notification on the phone: a finished task per language. Their translations
  are read from the APK; only their truncation is not walked.
- The notification prompt 「Turn on notifications」 (TC-118): it shows only until it is answered (TC-120), so walking
  it in 26 languages needs a reset of the app's state per language (`pm clear` signs the app out); its text is in the APK read.
- The IAP and Credit pages: shared with other features, not this feature's strings.
