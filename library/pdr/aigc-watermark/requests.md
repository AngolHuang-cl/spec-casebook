# AIGC Watermark — request ledger

Every request that changes what this feature's tables must cover or how its runs are done, from the user, a
colleague, a reviewer or RD. The spec analysis re-applies every **table** entry on each new or updated draft
(skill: "Standing inputs"), and `check.ts` fails a draft whose `requirements.md` does not cite each open table entry
for its platform. **run** entries are followed by the run rules; **analysis** entries change how the spec is read.
Add new entries at the bottom with the next ID; never renumber. Mark an entry `superseded by REQ-…` in Status instead
of deleting it.

| ID | Date | From | Request | Kind | Platform | Status |
|---|---|---|---|---|---|---|
| REQ-001 | 2026-11-17 | user | New PowerDirector feature: visible AIGC watermark on result video, image and audio, plus C2PA metadata (Jira PDRIOS-722). Specs: PM Figma https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1, Design Figma https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3815-9037, the Jira text and the sheet 「[C2PA] GAI effects.xlsx」. Analyze and make the test plan, both platforms. | analysis | both | done: approved v1 2026-11-17 (ios 127 rows, android 129 rows); run plans runs/RUN-PLAN-20261117-R1.md |
| REQ-002 | 2026-11-17 | user | Ruling: the sheet 「[C2PA] GAI effects.xlsx」 is correct on which features are C2PA-signed and which are not. It overrides the Jira line 「meta data server side會always打sign」: rows expect a manifest only on outputs of 有簽章 effects, and none from 無簽章 effects. | table | both | open |
| REQ-003 | 2026-11-18 | user | eBug review of Android R1 (F-2): AI Art has no 「Full Editor」; the analysis must not write a control a category rule names (R-024 「Image 類 … Full Editor」) into a member that lacks it. TC-046 drops its 「Full Editor」 step on the next draft (an Open question only if the PM wants one). Rule added to analysis.md pass 10 and knowledge KP-090. | table | both | open: TC-046 to change on the next draft |
| REQ-004 | 2026-11-18 | user | Android sign-in: the app is signed in with the Google account on the phone first (acda.test7 on the Sony), and the agent may tap 「Continue as …」 in Chrome; the user is asked only when that fails (AGENTS.md, fixtures.md). | run | android | open |
| REQ-005 | 2026-11-18 | user | eBug review of Android R1: file F-1, F-3–F-9, F-11–F-16 on TR261116-0056 (API, ETHAN_HSU, [AIAgent]) with the reviewer's severities; F-1 notes that the PM spec does draw the X; F-11 filed after checking it against the PM 純 Audio rule (R-032/R-033); F-2 held (REQ-003); F-10 kept until the phone is free for the music recheck. | run | android | done 2026-11-18: 14 filed and read back, DRA262611P0214 – P0227 (41 attachments; `android/ebugs/2026-11-17-r1/filed_bugcodes.md`); F-1's added Note lines labelled `Related:` for the format check; F-2 and F-10 held; OS Language still to set on the web form |
