# Board notes — pdr/cinematic-reel-recommendation, spec set 2026-11-23

## d-cinestory — Design 「26.07_v2」 (107:2283), the frame PDRA-661 links

Whole CineStory flow (Launcher, tutorial, template carousel, Add Media, preview, generating, recent tasks, result,
Add Text / Edit Music). Only the 0820 frames belong to PDRA-661:

- **0820 add photo tips tag** (on template page 107:2500): every template card (instances 107:2503–2505, same in
  185:13809) carries a chip 「View photo tips」 with a lightbulb icon at its top-left corner, over the preview video.
  Arrow 1106:5840 「tips --> CineStory」 runs from that chip to the photo tips sheet (1106:5162).
- **0820 add photo tips** (1106:5162, instance 1106:5373 「photo tips」, note 「CMS Link」 → CMS tab Recommendation):
  bottom sheet over the dimmed template page (the template page's header, credit pill 「182」, ? and history stay
  visible behind the dim). Texts: 「For best results with the **Micro Cinema** template, follow this advice:」 (template
  name bold); 「Recommendation」 (blue bar) with two picture items, each a ✓ badge (round/ic_check_circle) at the
  bottom-right and a caption: 「Mid-Distance Framing」, 「Rich Visual Details」; 「Avoid」 (pink bar) with three
  items, ⊗ badge (round/ic_circle_xmark): 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」 (the
  third runs past the sheet's right edge, i.e. the row is wider than the screen); full-width blue 「Got it」 at the
  bottom. No arrow leaves the sheet; no X; Design names no other way to close it.
- **Header 「?」 on the template page** is the tutorial: 「第一次顯示 tutorial video, 點Ｘ收進 ⓘ」, arrow 230:4451 from the
  tutorial's X to the ?. It is not drawn as an entry to the tips.
- **Add Media** (107:2556): header ‹ 「Add Media」 and a camera button; the layer round/ic_info is hidden; no 「?」 is
  drawn. Arrow 108:15190 runs 「Import a Photo」 → Add Media.
- Other dated labels (0709 add Marketing punchliner, 0709 update navigation, 0709 update download rule) and their
  frames are the rest of Cinematic Reel Creator, not this ticket.

## Jira PDRA-661 (spec file 「PDRA-661 Jira description.md」)

- Every template has its own recommendation / avoid; from CMS, opened the same way as I2V (同I2V開法).
- UI: every template has a chip, and the media room 「?」, both open the recommendation page.
- Parent PDRA-627 16.9.0, Alpha build 2026-11-13.

## CMS — Cinestory CMS › Recommendation (links.json)

Six templates, two Recommendation and three Avoid items each (table in the spec file). Pictures: 8 Recommendation and
6 Avoid; 「Rich Visual Details」 has a separate picture for Fast Cut. The JP / EN columns of the picture list are empty.
CMS columns row 20: field recommend_samples. Display names and the localized template names come from the CMS Data and
Template Name Localization tabs.

## PM Figma 「CineStory」

No photo tips content on any page (searched by text, figma-frames.json).
