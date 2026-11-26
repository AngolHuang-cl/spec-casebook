# Recent Task Model Info — request ledger

Every request that changes what this feature's tables must cover or how its runs are done, from the user, a
colleague, a reviewer or RD. The spec analysis re-applies every **table** entry on each new or updated draft
(skill: "Standing inputs"), and `check.ts` fails a draft whose `requirements.md` does not cite each open table entry
for its platform. **run** entries are followed by the run rules; **analysis** entries change how the spec is read.
Add new entries at the bottom with the next ID; never renumber. Mark an entry `superseded by REQ-…` in Status instead
of deleting it.

| ID | Date | From | Request | Kind | Platform | Status |
|---|---|---|---|---|---|---|
| REQ-001 | 2026-11-23 | user | New PowerDirector ticket 「(UI) Add model information in recent task (I2V/T2V/TTI)」 (PDRA, parent PDRA-627 16.9.0), Design Final https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3210, no PM spec: run the casebook and figma skills on it. | analysis | both | open: drafts 20261123-115415 (android, ios) in review |
| REQ-002 | 2026-11-24 | user | MUI test: the table gets an MUI section (Translation and Truncation rows per language) for the 26 languages of `library/pdr/product.json` › `mui` (CHT … UKR; ENU is the base), with those eBug tags. No translation sheet: the run judges each translation and lists doubtful ones on the eBug review page for the user to file or accept (`mui.json`, spec-casebook `references/mui.md`). | table | both | open: drafts 20261126-100000 (android TC-047 – TC-073, ios TC-044 – TC-069; R-080, R-081) in review |
| REQ-003 | 2026-11-24 | user | Check on the phone whether TR261123-0015 (Android 16.9.0.2611201) implements the model tag; install the TR build from the Google Play internal test track (Play link; reinstall if Play serves an older version), since the sideloaded APK cannot sign in (DRA262611P0253). | run | android | done 2026-11-24: not implemented (no model view on Image to Video / Text to Video Recent cards) |
