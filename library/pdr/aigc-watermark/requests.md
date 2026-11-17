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
