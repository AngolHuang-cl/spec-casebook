# Cinematic Reel Creator — Photo Tips (Recommendation page) — request ledger

Every request that changes what this feature's tables must cover or how its runs are done, from the user, a
colleague, a reviewer or RD. The spec analysis re-applies every **table** entry on each new or updated draft
(skill: "Standing inputs"), and `check.ts` fails a draft whose `requirements.md` does not cite each open table entry
for its platform. **run** entries are followed by the run rules; **analysis** entries change how the spec is read.
Add new entries at the bottom with the next ID; never renumber. Mark an entry `superseded by REQ-…` in Status instead
of deleting it.

| ID | Date | From | Request | Kind | Platform | Status |
|---|---|---|---|---|---|---|
| REQ-001 | 2026-11-23 | user | New feature: Jira PDRA-661 「(UX) Add recommendation page for Cinemantic Reel Creeator」 (PDRIOS-738), TRs TR261019-014 and TR260923-022. Run the casebook and the figma skill on it. Specs: the Jira page (saved HTML), Design Figma https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=107-2283, the Cinestory CMS sheet it names (tab Recommendation). Both platforms. | analysis | both | open: drafts 2026-11-23 |
| REQ-002 | 2026-11-24 | user | MUI test: the table gets an MUI section (Translation and Truncation rows per language) for the 26 languages of `library/pdr/product.json` › `mui` (CHT … UKR; ENU is the base), with those eBug tags. No translation sheet: the run judges each translation and lists doubtful ones on the eBug review page for the user to file or accept (`mui.json`, spec-casebook `references/mui.md`). | table | both | open |
| REQ-003 | 2026-11-24 | user | Check on the phone whether TR261123-0015 (Android 16.9.0.2611201) implements the recommendation page; the sideloaded APK cannot sign in (DRA262611P0253), so the TR build is installed from the Google Play internal test track (Play link; reinstall if Play serves an older version). | run | android | done 2026-11-24: implemented (chip and sheet, CMS items match); no 「?」 in Add Media (Q-1) |
| REQ-004 | 2026-11-24 | user | Test the feature with the casebook skill: full on-device run of the approved v1 table. Android only (no iPhone connected), build 16.9.0 (2611201), TR261123-0015. | run | android | done 2026-11-24: runs/2026-11-24-r1-full, 12 Pass / 6 Fail / 3 Blocked; nothing filed |
| REQ-005 | 2026-11-24 | user | Draft the eBug review page for the Android R1 run (2026-11-24-r1-full). | ebug | android | done 2026-11-24: filed on TR261123-0015 as ETHAN_HSU, DRA262611P0289 (Add Media 「?」, Q-1), DRA262611P0290 (mixed language, Q-2) |
| REQ-006 | 2026-11-25 | user | Check TR261019-014 and TR260923-022 and make sure everything listed in them is tested, reading every tab of the sheets they link (I2V Recommendation: 7 tabs; Cinestory CMS: 9 tabs); ask about anything unclear. | analysis | android | open 2026-11-25: sheets saved as specs/2026-11-25; user rulings (order and JP pictures by app language for 繁中/简中/日本語/한국어, all 28 languages, card text in scope, Fast Cut caption 「Rich Visual Details」); draft android/drafts/20261125-115636 (75 rows: 54 new, TC-017/018 modified) on the review page |
