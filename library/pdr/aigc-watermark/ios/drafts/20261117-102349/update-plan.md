# Update plan — pdr/aigc-watermark / ios: new table → draft 20261117-102349

New table (REQ-001). Built by `build-draft.ts` (rows and requirements), `fill-traces.ts` (annotation and control
traces) and `build-phases.ts` (run plan) in this folder; the Android draft 20261117-102353 is built by the same script.

## Spec files
- New: AIGC Watermark - PM Figma 0-1.md, AIGC Watermark - Design Figma 3815-9037.md, PDRIOS-722 Jira description.md,
  [C2PA] GAI effects.xlsx (spec set 2026-11-17, Figma-only, no PDF).

## Case changes
- New (127): Settings entry 8, artwork and placement 8, My Artwork videos 29, images 8, Music Generator 10,
  editor timeline 20, export dialog 3, already-saved content 3, C2PA metadata 38 (31 by feature and model, 2 with the
  switch On, 5 timeline tools parked).

## Found by the analysis
- Annotation trace: 32 blocks traced (pm-rules 8 incl. 4 link items, pm-settings 4, pm-export 3, pm-music 15,
  design 2); every rule block has a requirement, Music Generator form and Menu banner text traced `ui:`.
- Flow arrows: 10 (Design 1, PM 9); the PM export arrow 86-956 was read as leaving 「Cancel」 and corrected to
  「Export」 from its tail point.
- Pass 7 PM-only: the export and music dialogs, the paid Menu, all per-class rules (Design draws only Settings and
  the label size). PM info sheet X dropped: the Design sheet has none.
- Pass 9 hidden clauses: C2PA signed / unsigned / unaffected by the switch (c2patool on the saved file); music clip
  added by the server (downloaded file vs timeline); saved files not updated later; Cancel takes no credits.
- Pass 10 variants: 9 video features, 2 image features, 5 timeline tools, 3 image shapes, 2 video shapes, 3 clip
  languages, paid tiers Pro and Pro+, and every C2PA effect line that applies to a scope feature (sheet, REQ-002).
- Red PM lines (newest edit): music added to the timeline has no clip; its project export follows the switch.
- PM example 「非 AI 素材 / AI 素材」: label on the project's first 2 s wherever the AI clip is (Q-9).

## Not added (value check)
- Exported-project C2PA metadata: the spec is silent (Q-13); no row asserts it.
- A video result shorter than 2 s: spec silent (Q-16); no row.
- Effects in the sheet that no PDR scope feature uses (PhotoDirector / other products: AIHairstyle, AIRoom,
  ObjectRemovalV2, GlowUp, TtiStyle*, PhotoEnhance…): not this feature's table.
- The sheet's non-AI Audio / Photo effects (AudioDenoise, VocalRemoval…): 無簽章 by nature, no PDR scope feature.
- Credit prices on 「Generate for ◆ 6」 and the Produce sheet's options: other features' tables.

## PM-only rows
- Music dialog, music Cancel / Generate / Don't show again, export dialog, export Cancel / Don't show again, the paid
  Menu row, every My Artwork / audio / timeline rule row: Notes 「PM-only: no Design frame yet (Design 2608)」 where a
  screen is drawn only by the PM.

## Questions for PM
- Q-1 default of the switch · Q-2 tier gating · Q-3 video label size · Q-4 image Save / Share · Q-5 clip languages ·
  Q-6 does the switch remove the music clip · Q-7 when the export dialog shows · Q-8 shared Don't show again ·
  Q-9 label on the first clip · Q-10 timeline preview · Q-11 class of each scope item · Q-16 videos under 2 s ·
  Q-17 Android in the same release · Q-19 Full Editor export.

## Questions for RD
- Q-12 which sheet effect each feature and model calls, and how QA should read the manifest (the C2PA kit on
  SharePoint could not be opened) · Q-13 exported-project metadata, readable timeline assets.

## Questions for you
- Q-14 the PM 「AIGC Watermark Spec.pptx」 and the sample audio are on SharePoint and could not be opened here: send
  copies if they hold rules.
