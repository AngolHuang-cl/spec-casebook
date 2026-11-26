# Update plan — pdr/recent-task-model-info / android: new table → draft 20261123-115415

## Spec files
- New: Recent Task Model Info - Design Figma 1794-3210.md (Design 1006 frame), Design Guideline Cards - Card-RecentTask.md (the frame's Guideline link), PDRA Jira - Add model information in recent task.md. Figma only, no PDF, no PM spec.

## Found by the analysis
- Annotation trace: 22 blocks traced (the 1006 rules in Dark and Light, the Guideline box, the context boards' notes and 9 items of the linked Guideline).
- Linked Guideline (step 9): 「showModel 只有使用者自己選 model 時打開(例 I2V Custom),範本生成不開」 → R-020 (template generations show no tag) → TC-029, TC-030, TC-034. Not on the 1006 board itself.
- Pass 2 job states: chosen-model I2V / T2V, templates and Cinematic Reel Creator × processing / done / unselect / select / error / nsfw (the 1006 rule 「規則相同」) → TC-003, TC-004, TC-016, TC-017, TC-034 – TC-039.
- Pass 4 numbers: card height 120 with or without the tag (R-016), tag 20 high (R-015).
- Pass 5 persistence: R-040 → TC-040 (reopen the page, restart the app); R-041 → TC-041 (tasks from before the build, Q-2).
- Pass 10 variants: one generating row per model the picker offers (R-012: 10 Image to Video, 9 Text to Video models, KP-082), long name at default and largest text size (R-014), Dark and Light (R-050).
- Android system Back (pass 8, REQ-051): R-070 → TC-044 – TC-046 (Recent page, edit mode, result page).

## Not added (value check)
- Tablet width (Guideline 「tablet 40」 margin): no tablet in the test fixtures; the design check measures the phone only.
- Card/Artwork processing / error backgrounds (Guideline box): My Artwork redesign, not this ticket.
- Result page share icons, Quick actions, credit pill, View more, bottom tabs, Recent media strip (context boards): other features (n/a in control-trace.json).
- 「Delete」 in edit mode: destructive and not part of this ticket; edit mode rows never tap it.
- A new Cinematic Reel Creator generation (70 credits): existing tasks are enough to check that no tag shows (TC-031).
- Text to Video error / edit-mode rows: the same Card/RecentTask component, checked once on Image to Video (Job states grid).

## Questions for PM
- Q-1 Text to Image: the Jira title names TTI but the Design 1006 frame and the Guideline say only I2V / T2V show the model. Should Text to Image show it? (TC-033 assumes no tag)
- Q-2 Tasks generated before this build: show their model or not? (TC-041 records which)
- Q-3 A template that lets the user pick a model: tag or not? (TC-029, TC-030 assume no tag)
- Q-4 Maximum tag width before 「…」 (TC-027, TC-028 assume up to the card's right padding)
- Q-5 System Back in edit mode: does it act like 「Cancel」? (TC-045 assumes so)

## Questions for you
- None blocking. Error and NSFW cards are parked until a task fails or is flagged on its own (no failure fixture).
