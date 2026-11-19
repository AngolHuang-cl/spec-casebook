# AIGC Watermark (Android) — eBug drafts, round R1 (table v1), PDR-A 16.9.0 build 2611161

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-17-r1-full/` — round R1 of draft `drafts/20261117-102353` (table v1, 129 cases), 2026-11-17 14:19 → 20:08 plus the 2026-11-18 sign-in attempts, on Sony XQ-BT52 (Xperia 10 III) / Android 12 (adb HQ61563393) through Appium / UiAutomator2, TR261116-0056 (16.9.0.2611161 R2, SR DRA261109-01), Stage server, Free account ethan.hsu.cl@gmail.com. Tally: 60 Pass, 24 Blocked, 45 Fail.

**Filed by:** ETHAN_HSU on 2026-11-18 (IF3 API, TR261116-0056, attachments uploaded, read back): F-1 DRA262611P0214, F-3 DRA262611P0215, F-4 DRA262611P0216, F-5 DRA262611P0217, F-6 DRA262611P0218, F-7 DRA262611P0219, F-8 DRA262611P0220, F-9 DRA262611P0221, F-11 DRA262611P0222, F-12 DRA262611P0223, F-13 DRA262611P0224, F-14 DRA262611P0225, F-15 DRA262611P0226, F-16 DRA262611P0227. F-10 DRA262611P0229 filed 2026-11-19 on TR261117-0042 (16.9.0.2611171) after the recheck on that build (REQ-006). Not filed: F-2 (held, REQ-003). `filed_bugcodes.md`.

**Status (before filing):** nothing filed, uploaded or commented. First AIGC Watermark batch (`ebug-defaults.ts pdr/aigc-watermark android`: no filed batch), so the review page prefills the filing account from the newest PowerDirector Android casebook batch (Video Enhance 2026-11-11-r1c: Creator ETHAN_HSU, [AIAgent], API) and this run's TR (TR261116-0056, whose header names 16.9.0.2611161), each marked 「confirm」. Dedupe: read-only, Android pool only (per OS, user 2026-10-28): no entry repeats an Android ticket (`dedupe.txt`).

Rules: reviewer rules 2026-10-21 (one action per Repro step, a Spec Link on every entry with the URL on its own line, an image on every entry, the log or file evidence on failure-related ones, no video); `[AIAgent]` / `[AIAgent][UI]` owner RD for defects; open questions the run cannot settle filed to PM (BugBelong PM), `[AIAgent][UX]` for user-experience decisions (2026-11-11). Design outranks PM (2608 draws only Settings and the label size); the C2PA sheet decides which effects are signed (REQ-002). The sheet `[C2PA] GAI effects.xlsx` has no URL: its entries link the Jira it belongs to (Link needed). Severity is proposed; Video Enhance's R1 cards were all filed at 2 by the user's decision.

**What is drafted:** 16 entries (ISS-AWA-01…16): 9 RD Functional, 2 RD UI, 3 PM Functional, 2 PM UX. Entry 10 (music dialog) was held until the signed-in recheck, then rechecked and filed on 16.9.0.2611171 (2026-11-19).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-AWA-01 — The 「AIGC Watermark」 info sheet has an X close button the Design does not draw  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-003  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-004 / R-007 (Design 2608_AIGC Watermark, arrow 3816:10913): the sheet has title, body and 「Got it」 only. The PM Essential mockup draws an X, but the Design is the newer source and wins (pass 7; AGENTS.md Design first). Title and body match the Design word for word; 「Got it」 and system Back work (TC-004 reference on Free, TC-005). The X is button_aigc_watermark_info_close. Seen at TC-003 and again at TC-004's Free reference.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Settings (AIGC Watermark): Info sheet shows an X close button the Design does not draw
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Tap ⓘ next to 「Remove AIGC Watermark」
4. Check the result

Result:
The 「AIGC Watermark」 sheet shows an X close button at its top left.
摘要：「AIGC Watermark」說明面板左上角多了一個 X 關閉鈕。
{16.9.0_awa01_info_sheet_x.jpg}

Expect Result:
The sheet shows the title, the body and 「Got it」 only, with no X, as the Design draws it.
摘要：面板應只有標題、說明文字與「Got it」，不應有 X（依 Design）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Related: The PM spec's Essential mockup does draw an X on this sheet; the Design spec, which is newer, draws none.
Related: PM spec 的 Essential mockup 有畫 X；較新的 Design spec 沒有畫 X。
Spec Link: AIGC Watermark Design spec (Settings), 2608_AIGC Watermark board (ⓘ sheet, arrow 3816:10913; no X) -
https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3815-9037
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/01_ISS-AWA-01/`

---

## 2. ISS-AWA-02 — AI Art results have no 「Full Editor」, so the image rule's Full Editor step cannot be done  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-046  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Question for PM, filed for a decision (AGENTS.md 2026-11-11). R-024 (PM My Artwork Page › Image 類: thumbnail, View and 「Full Editor: timeline 不會有 watermark」). The AI Art result page on Android offers feedback, share, download and 「Turn the image into a video」; Select mode only delete / share / download. Thumbnail and View show no label (as R-024 wants). Either image results get a Full Editor path on Android, or the rule drops it for AI Art. Text to Image has 「Add to Timeline」 instead (ISS-AWA-03).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Art: AI Art result page has no 「Full Editor」, which the AIGC image rule names
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Magic」
3. Tap 「My Artwork」
4. Tap 「AI Art」
5. Tap a result
6. Look for 「Full Editor」
7. Check the result

Result:
The AI Art result page has no 「Full Editor」 (only feedback, share, download, Turn the image into a video).
摘要：AI Art 結果頁沒有「Full Editor」，只有回饋、分享、下載與轉成影片。
{16.9.0_awa02_aiart_result.jpg} {16.9.0_awa02_aiart_select.jpg}

Expect Result:
PM to decide: does an AI Art result open in the editor (「Full Editor」) on Android, or does the rule drop it?
摘要：請 PM 決定：Android 的 AI Art 結果是否應有「Full Editor」，或規則移除此項。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (My Artwork Page) board (Image 類: Full Editor, timeline 不會有 watermark) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/02_ISS-AWA-02/`

---

## 3. ISS-AWA-03 — Text to Image 「Add to Timeline」 puts the saved, labelled file on the timeline  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-049  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-024 (PM My Artwork Page › Image 類: 「Full Editor: timeline 不會有 watermark」). The Text to Image result page's editor button is 「Add to Timeline」 (its Full Editor). Switch Off. The clip on the timeline is TimeLinePhoto_1_1794896846878.jpg, the same name as the file 「Save」 wrote before (Pictures/cyberlink/PowerDirector/Text to Image/1_1794896846878.jpg, labelled), and the AI label shows in the editor preview at 00:00 and still at 00:05 (baked into the photo, not a 2 s overlay). Thumbnail and View are clean. Video results opened with 「Full Editor」 are clean (TC-020 step 6).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Text to Image: 「Add to Timeline」 puts the labelled saved image on the timeline
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Magic」
3. Tap 「My Artwork」
4. Tap 「Text to Image」
5. Tap a result that was saved with the switch Off
6. Tap 「Add to Timeline」
7. Look at the top-left of the preview
8. Check the result

Result:
The timeline photo carries the AI label at its top left (00:00 and 00:05): it is the labelled gallery copy.
摘要：加入時間軸的圖片左上角有 AI 標籤（0 秒與 5 秒皆有），是已存的含標籤檔。
{16.9.0_awa03_t2i_result.jpg} {16.9.0_awa03_timeline_label.jpg} {16.9.0_awa03_timeline_label_later.jpg}

Expect Result:
The image placed on the timeline has no AI label (PM: Full Editor timeline has no watermark).
摘要：加入時間軸的圖片不應有 AI 標籤。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (My Artwork Page) board (Image 類: Full Editor, timeline 不會有 watermark) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/03_ISS-AWA-03/`

---

## 4. ISS-AWA-04 — Saving a Text to Image result a second time writes no new file, so the switch is ignored  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-051, TC-089, O-6  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-025 (image Save follows the switch; Global Rule, Jira 「consistently across export/share/save」) and R-049 (PM Note + Save rule: saving again after changing the switch applies the new value to the new file). TC-051: saved Off at TC-009 (1_1794896846878.jpg, labelled), switch turned On, download again: toast 「Saved to Gallery」, no new file; the gallery copy is byte-identical (MD5 in the attached check), so the user who turned the label off still has only a labelled image. TC-089: the reverse (saved On, then Off: no labelled file). AI Art (TC-048) and Image to Video (O-10) write a new file on each save, so only Text to Image reuses the old one (O-6). The file check is computed from the pulled copies.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Text to Image: A second save of a result writes no new file; the switch change is lost
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「My Artwork」
7. Tap 「Text to Image」
8. Tap a result
9. Tap the download icon
10. Tap the back button
11. Tap ☰ on the Launcher
12. Turn 「Remove AIGC Watermark」 On
13. Tap the back button
14. Tap 「AI Magic」
15. Tap 「My Artwork」
16. Tap 「Text to Image」
17. Tap the same result
18. Tap the download icon
19. Open the saved image in the gallery
20. Check the result

Result:
The second save shows 「Saved to Gallery」 but writes no file: the gallery keeps only the first, labelled copy.
摘要：第二次儲存顯示「Saved to Gallery」卻沒寫入新檔，相簿只有第一次含標籤的檔案。
{16.9.0_awa04_switch_on.jpg} {16.9.0_awa04_saved_toast_on.jpg} {16.9.0_awa04_gallery_copy_labelled.jpg} {16.9.0_awa04_saved_toast_off.jpg} {16.9.0_awa04_file_check.txt}

Expect Result:
Each save writes a new file that follows the switch at that moment (On: no label, Off: label).
摘要：每次儲存都應寫出新檔，並依當下開關決定是否有浮水印。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Global Rule, Note) board (Image watermark; downloaded content is not updated, a new save follows the setting) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/04_ISS-AWA-04/`

---

## 5. ISS-AWA-05 — Sharing an image result with the switch Off gives Instagram an image without the AI label  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-052  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Question for PM, filed for a decision (Q-4): the PM lists Save / Share only under Video; for images it lists thumbnail, View and Full Editor. The Jira's acceptance criterion says the watermark 「appears consistently across export/share/save flows」, and the same 1:1 result saved seconds earlier (TC-011) carries the label, so Save and Share disagree today. RD may take it directly if PM confirms the Jira line. Nothing was posted (composer left with Back › 「Not now」).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Text to Image: Image shared with the switch Off has no AI label; saved copy has one
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「My Artwork」
7. Tap 「Text to Image」
8. Tap a 1:1 result
9. Tap the share icon
10. Tap 「Instagram」
11. Tap 「Feed」
12. Look at the top-left of the image in the composer
13. Check the result

Result:
The image in Instagram's composer has no AI label; the same result saved with 「Save」 has one.
摘要：分享到 Instagram 的圖片沒有 AI 標籤，但同一結果用「Save」存下的有。
{16.9.0_awa05_ig_composer_no_label.jpg} {16.9.0_awa05_saved_copy_labelled.jpg}

Expect Result:
PM to decide: does image Share follow the switch like Save (Jira: consistent across export/share/save)?
摘要：請 PM 決定：圖片分享是否應如儲存一樣依開關加上浮水印。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Global Rule, My Artwork Page) board (Image: 左上角壓上 AIGC Watermark; Save / Share listed under Video only) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
Spec Link: Jira PDRIOS-722 acceptance criteria (consistently across export/share/save) -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/05_ISS-AWA-05/`

---

## 6. ISS-AWA-06 — An image saved with the switch On carries Google's C2PA manifest, not CyberLink's  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-121, O-3  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-050 / R-052: the sheet lists Text to Image (Apt3 TextToImage) as 有簽章 (CyberLink), and the switch only controls the visible watermark (Jira 「UI setting 是控 visible watermark是否開or關」). With the switch Off the same model's file carries a CyberLink manifest (TC-118, Pass). With the switch On the app saves the provider's raw file: c2patool shows signer 「Google Media Processing Services」 / 「Google LLC」, 「Created by Google Generative AI.」, SynthID. AI Art On does the same (O-3; no row of its own, included as a second file in the attachment). Link needed: the sheet has no URL; the Spec Link points at the Jira the sheet belongs to.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Text to Image: Image saved with the switch On is signed by Google, not CyberLink (C2PA)
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 On
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「Text to Image」
7. Enter a prompt
8. Tap Generate
9. Wait for the result
10. Tap the download icon
11. Read the saved file's Content Credentials (c2patool)
12. Check the result

Result:
The On save carries a Google-signed manifest (Created by Google Generative AI) and no CyberLink manifest.
摘要：開關開啟時存下的圖片帶的是 Google 簽章的 C2PA，而非 CyberLink。
{16.9.0_awa06_t2i_result_on.jpg} {16.9.0_awa06_c2pa.txt}

Expect Result:
The saved image carries the CyberLink-signed manifest whatever the switch says, as the Off save does.
摘要：不論開關，存下的圖片都應帶 CyberLink 簽章的 C2PA（同關閉時）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: [C2PA] GAI effects.xlsx (sheet a, row Apt3 TextToImage 有簽章 (CyberLink)), the C2PA list for Jira PDRIOS-722 -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Global Rule) board (the switch controls the visible watermark only, per Jira) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/06_ISS-AWA-06/`

---

## 7. ISS-AWA-07 — The full-screen player of a video result shows the 「AI」 badge over its first seconds  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-020, TC-017, TC-023, TC-026, TC-035, TC-038, TC-041, O-15  ·  **Reproduce:** 7/7  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-018 (PM My Artwork Page › Video 類: thumbnail no, View no watermark, Full Editor timeline no). Switch Off. Seen in all seven video tools that ran: Image to Video (Veo 3.1, TC-020), Video Edit by Chat (TC-017), Cinematic Reel Creator (TC-023), Character Motion Swap (TC-026), Text to Video (TC-035), AI Anime Video (TC-038), Talking Avatar (TC-041). The badge is the app's own view aigc_badge_overlay, over 00:00–00:01, gone from 00:02 (rapid screencaps; Appium's recorder stops after ~1.5 s in this player, O-11). The result page's still preview also draws it when the switch is Off and none when On (O-15; Character Motion Swap's draws none). Tiles and the Full Editor timeline are clean in every tool. TC-023's tile mark is the input photo's own label (test data), not part of this entry.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] My Artwork: Full-screen player of a video result shows the 「AI」 badge over the first ~1 s
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「My Artwork」
7. Tap 「Image to Video」
8. Tap 「View」 on a finished task
9. Tap the preview
10. Watch the top-left corner during the first 2 seconds
11. Check the result

Result:
The full-screen player shows an 「AI」 badge at the top left over 00:00–00:01 (all 7 video tools).
摘要：全螢幕播放器開頭約 1 秒左上角出現「AI」標章（7 個影片功能皆同）。
{16.9.0_awa07_i2v_player_badge.jpg} {16.9.0_awa07_i2v_player_strip.jpg} {16.9.0_awa07_vebc_player_strip.jpg} {16.9.0_awa07_t2v_player_badge.jpg} {16.9.0_awa07_anime_result_preview.jpg}

Expect Result:
The View player shows no watermark (PM: My Artwork video View has no watermark).
摘要：View 播放器不應顯示任何浮水印。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (My Artwork Page) board (Video 類: View 不會有 watermark) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/07_ISS-AWA-07/`

---

## 8. ISS-AWA-08 — Videos from models the sheet lists as unsigned (Kling, Vidu, Pixverse, Wan) are saved with a CyberLink C2PA manifest  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-093, TC-094, TC-096, TC-097, TC-102, TC-106, TC-107, TC-114, O-14  ·  **Reproduce:** 8/8  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-051 and REQ-002 (user ruling: the sheet is correct on which effects are signed): Ext ItvKling, ItvVidu, ItvPixverse, ItvAlibaba, TtvKling, TtvAlibaba, MotionSwapKlingVid and VtvKling are 無簽章, so their output carries no manifest. Every Off save from them carries one CyberLink-signed manifest (claim generator 「PowerDirector Mobile for Android」 16.9.0, c2pa.created trainedAlgorithmicMedia, no ingredient): Image to Video Kling O3 / Vidu Q2 / Pixverse V6 / Wan 2.7 (TC-093/094/096/097), Text to Video Kling O3 / Wan 2.7 (TC-102/106), Character Motion Swap Kling Motion Control (TC-107), Video Edit by Chat Kling O3 (TC-114). The providers' raw files in the app cache show Kling does sign (「Kling AI C2PA Claim Signing」, O-14), so the sheet may be out of date for Kling; RD may forward to PM. The *AutoMusic rows (有簽章 CyberLink) do not apply: sound was Off except Pixverse V6 / Wan 2.7 (sound On), whose models have no AutoMusic row. Link needed: the sheet has no URL.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Image to Video: Kling, Vidu, Pixverse, Wan 2.7 saves carry a C2PA manifest; the sheet says none
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「Image to Video」
7. Pick a photo
8. Pick the model 「Kling O3」
9. Tap Generate
10. Wait for the task to finish
11. Tap 「View」
12. Tap 「Save」
13. Read the saved file's Content Credentials (c2patool)
14. Check the result

Result:
Each saved file carries a CyberLink-signed C2PA manifest (8 of 8 unsigned-model saves).
摘要：無簽章模型產出的影片存檔都帶有 CyberLink 簽章的 C2PA（8 個皆是）。
{16.9.0_awa08_kling_o3_saved.jpg} {16.9.0_awa08_t2v_wan27_model.jpg} {16.9.0_awa08_kling_mc_saved.jpg} {16.9.0_awa08_c2pa.txt}

Expect Result:
Output of an effect the sheet marks 無簽章 carries no C2PA manifest.
摘要：表上標示「無簽章」的效果，產出檔案不應帶 C2PA。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: [C2PA] GAI effects.xlsx (sheet a, rows Ext ItvKling, ItvVidu, ItvPixverse, ItvAlibaba, TtvKling, TtvAlibaba, MotionSwapKlingVid, VtvKling 無簽章), the C2PA list for Jira PDRIOS-722 -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/08_ISS-AWA-08/`

---

## 9. ISS-AWA-09 — Videos from provider-signed paths (Google, BytePlus, Microsoft) are saved with only a CyberLink manifest  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-090, TC-122, TC-099, TC-113, TC-111, TC-110, O-14  ·  **Reproduce:** 6/6  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-050 and REQ-002: the sheet lists Ext ItvGoogle, TtvGoogle, VtvGoogle 有簽章 (Google), CineStoryByteplusVendorMusic 有簽章 (BytePlus) and StorytellingAssetsV3 有簽章 (Microsoft). The saved files carry one CyberLink manifest and no provider manifest or ingredient: Image to Video Veo 3.1 Off (TC-090) and On (TC-122), Text to Video Veo 3.1 (TC-099), Video Edit by Chat Gemini Omni Flash 1.1 (TC-113), Cinematic Reel Creator 「Horror Movie」 (TC-111). The raw provider files in the app cache keep the Google / BytePlus manifests (O-14), so the app replaces them on save. TC-110 (AI Storytelling) caveat: the story used the user's own media; no generated asset was visible, so the Microsoft asset may not have been called (Q-12) — RD to confirm. Link needed: the sheet has no URL.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Image to Video: Veo, Gemini, BytePlus saves carry CyberLink's C2PA manifest, not the provider's
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「Image to Video」
7. Pick a photo
8. Pick the model 「Veo 3.1」
9. Tap Generate
10. Wait for the task to finish
11. Tap 「View」
12. Tap 「Save」
13. Read the saved file's Content Credentials (c2patool)
14. Check the result

Result:
The saved file carries only a CyberLink-signed manifest; the provider's (Google) manifest is gone.
摘要：存檔只帶 CyberLink 簽章，原供應商（Google 等）的 C2PA 不見了。
{16.9.0_awa09_veo_saved.jpg} {16.9.0_awa09_gemini_saved.jpg} {16.9.0_awa09_c2pa.txt}

Expect Result:
The saved file carries the manifest signed by the party the sheet names (Google, BytePlus, Microsoft).
摘要：存檔應帶表上所列簽章方（Google、BytePlus、Microsoft）的 C2PA。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: [C2PA] GAI effects.xlsx (sheet a, rows Ext ItvGoogle, TtvGoogle, VtvGoogle 有簽章 (Google), CineStoryByteplusVendorMusic (BytePlus), StorytellingAssetsV3 (Microsoft)), the C2PA list for Jira PDRIOS-722 -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/09_ISS-AWA-09/`

---

## 10. ISS-AWA-10 — AI Music Generator starts generating with no 「AIGC Watermark」 dialog when the switch is Off  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-054, TC-057  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611171

> **⛔ QA note — do NOT paste into eBug; resolve before filing.** Rechecked 2026-11-19 on 16.9.0 build 2611171 (TR261117-0042, R3; runs/2026-11-19-recheck-2611171, O-1), acda.test7 (Free), Stage, English: switch set Off, AI Music Generator (intro's 「Don't show again」 unticked, 「Try It Now」), Acoustic / Dreamy / Cinematic, 2 songs, 「Generate for ◆ 10」 at 08:58:22 went straight to 「Generating...」; 10 credits taken (2529 → 2519). Same as R1 on 2611161 (1/1). R-027 (PM Music Generator Case, arrow 97:1818, 「If Remove AIGC Watermark toggle off」): 「Generate」 opens the dialog 「AIGC Watermark」 (「Your generated music will include an AIGC watermark…」, 「Don’t show again」, 「Cancel」, 「Generate」). Caveat: the 2611171 install was used by another tester before the run; a music 「Don't show again」 ticked by them cannot be read without a debuggable build. User decision 2026-11-18/19: recheck on 2611171, then file on TR261117-0042. TC-055 / TC-056 / TC-128 stay Blocked upstream. The build's generator is the V2 form (Genre / Mood / Theme, Lyria, 5 credits a song), not the PM board's 「Describe your idea」 form (O-19).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Music Generator: Generate starts with no 「AIGC Watermark」 dialog when the switch is Off
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「AI Music Generator」
7. Tap 「Try It Now」 on the intro
8. Tap 「Acoustic」 under Genre
9. Tap 「Dreamy」 under Mood
10. Tap 「Cinematic」 under Theme
11. Tap 「Generate for ◆ 10」
12. Check the result

Result:
No 「AIGC Watermark」 dialog opens: the popup 「Generating...」 appears at once and 10 credits are taken.
摘要：未出現「AIGC Watermark」對話框，直接顯示「Generating...」並扣 10 點。
{16.9.0_awa10_2611171_music_form.jpg} {16.9.0_awa10_2611171_generating_no_dialog.jpg} {16.9.0_awa10_2611171_log.txt}

Expect Result:
With the switch Off, Generate first opens the 「AIGC Watermark」 dialog with Cancel and Generate.
摘要：開關關閉時，按生成應先跳出「AIGC Watermark」對話框（Cancel / Generate）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-music (Music Generator Case) board (If Remove AIGC Watermark toggle off: AIGC Watermark dialog, arrow 97:1818) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=97-1818
Related: Also seen on 16.9.0.2611161 (TR261116-0056), installed as an upgrade with adb install -r; on both installs QA did not tick a music 「Don't show again」.
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/10_ISS-AWA-10/`

---

## 11. ISS-AWA-11 — Songs made with the switch Off have no spoken 「This audio was generated by AI.」 clip  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-014, TC-015, TC-016, TC-058, TC-059, O-19  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-017 / R-032 / R-033 (PM Global Rule: Audio 「在開頭加上罐頭音效 “This audio was generated by AI.”，需要多國」; 純 Audio 類: Preview and Download hear it; Scope 「Music Generator → Server」). Six songs in English, Traditional Chinese and Japanese (switch Off, app language switched) start with music at 0.00 s at full level; the 0–5 s spectrograms show only the song and no speech, and two songs' first 2 s do not match (no shared canned clip). Judged from the pulled files (phone audio cannot be recorded over adb); the My AI Music preview plays the same file (TC-058). There is no Download button on 2611161: each song is written by itself to Music/cyberlink/PowerDirector/AI Music Generator/, same MD5 as the app's copy (TC-059). Which languages exist is Q-5; the clip is missing in every language, so this is filed as a defect.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Music Generator: Songs made with the switch Off lack 「This audio was generated by AI.」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「AI Magic」
6. Tap 「AI Music Generator」
7. Tap a Genre, a Mood and a Theme
8. Tap 「Generate for ◆ 10」
9. Tap 「Go to My AI Music」
10. Wait for the songs to finish
11. Tap play on the first song
12. Listen to the first 5 seconds
13. Check the result

Result:
The song starts straight with music; no 「This audio was generated by AI.」 clip in English, Chinese or Japanese.
摘要：歌曲一開始就是音樂，沒有「This audio was generated by AI.」語音（英、中、日皆無）。
{16.9.0_awa11_my_ai_music_playing.jpg} {16.9.0_awa11_en_first5s.jpg} {16.9.0_awa11_zh_first5s.jpg} {16.9.0_awa11_ja_first5s.jpg}

Expect Result:
A song made with the switch Off starts with the spoken clip in the app's language, in preview and file.
摘要：開關關閉時生成的歌曲，開頭應有對應語言的 AI 生成語音提示。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Global Rule, 純 Audio 類) board (Audio: 開頭加上罐頭音效 This audio was generated by AI., 需要多國) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/11_ISS-AWA-11/`

---

## 12. ISS-AWA-12 — A project holding an AI Music Generator song exports with no AIGC dialog and no AI label  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-061, O-23  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** R-035 (PM 純 Audio 類, red = newest: 「Export, Share: 會根據 Preference 設定來決定 Project 0~2 秒有沒有 icon 的 watermark」) and R-043. Switch Off. Project: a camera photo plus song 1 (00:00–00:10). 「Export」 › 「Produce」 gave no 「AIGC Watermark」 dialog, and the file (1080 × 1920, 10.07 s) has no AI label at 0.0 / 1.9 s (only the Free 「PowerDirector」 watermark); c2patool: no claim. The same export path shows the dialog and the label for Text to Speech, AI Anime, AI Cartoon and AI Sketch projects with 「Don't show again」 unticked (TC-065/071/074/077, O-23), so the music is simply not treated as AI content.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Export: Project with an AI Music Generator song exports with no AIGC dialog or AI label
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「New Project」
6. Add a photo
7. Tap 「Audio」
8. Tap 「AI Music Generator」
9. Tap + on a generated song
10. Tap 「Export」
11. Tap 「Produce」
12. Open the produced video
13. Check the result

Result:
No 「AIGC Watermark」 dialog opens and the produced video has no AI label in its first 2 seconds.
摘要：匯出時沒有「AIGC Watermark」對話框，成品前 2 秒也沒有 AI 標籤。
{16.9.0_awa12_produce_no_dialog.jpg} {16.9.0_awa12_export_0s_no_label.jpg} {16.9.0_awa12_tts_export_label_control.jpg}

Expect Result:
With the switch Off the export shows the dialog and the video carries the label over 0–2 s.
摘要：開關關閉時匯出應跳出對話框，成品前 2 秒左上角有 AI 標籤。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (純 Audio 類) board (Export, Share: Project 0~2 秒 icon watermark by the setting, red = newest) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
Spec Link: Remove AIGC Watermark PM spec, pm-export (Export Flow) board (AIGC Watermark dialog, arrow 86:955) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-955
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/12_ISS-AWA-12/`

---

## 13. ISS-AWA-13 — With the switch Off the editor preview shows no AI label for AI content on the timeline  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-064, TC-070, TC-073, TC-076  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Question for PM, filed for a decision (Q-10). PM: 「當 Timeline 有 Text-2-Speech, Voice Changer、AI Anime、AI Cartoon、AI Sketch 的 AI Content 時 / Timeline: 會根據 Preference 設定來決定會不會有 watermark」, while the My Artwork rules say results show no watermark on the timeline. The table assumed the preview shows the label over the project's first 2 s with the switch Off. Switch Off: Text to Speech (TC-064), AI Anime (TC-070), AI Cartoon (TC-073), AI Sketch (TC-076) projects play from 0:00 with no label (only the Free 「PowerDirector」 watermark); their exports do carry it (TC-065/071/074/077 Pass). Voice Changer (TC-067) is left out: the Free account can only apply Effect voices, which may not be AI content (see Not raised).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Timeline: Preview shows no AI label for TTS, AI Anime, AI Cartoon or AI Sketch content
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Tap 「New Project」
6. Add a video
7. Tap 「Audio」
8. Tap 「Text to Speech」
9. Type a sentence
10. Tap Generate
11. Tap play from 00:00
12. Look at the top-left of the preview
13. Check the result

Result:
The editor preview shows no AI label over 00:00–00:02 (Text to Speech, AI Anime, AI Cartoon, AI Sketch).
摘要：編輯器預覽前 2 秒沒有 AI 標籤（TTS、AI Anime、AI Cartoon、AI Sketch 皆同）。
{16.9.0_awa13_tts_preview.jpg} {16.9.0_awa13_anime_preview.jpg} {16.9.0_awa13_sketch_preview.jpg}

Expect Result:
PM to decide: does the editor preview show the label for timeline AI content with the switch Off?
摘要：請 PM 決定：開關關閉時，時間軸上有 AI 內容，編輯器預覽是否要顯示標籤。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Timeline AI content) board (Timeline: 會根據 Preference 設定來決定會不會有 watermark) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/13_ISS-AWA-13/`

---

## 14. ISS-AWA-14 — The export 「AIGC Watermark」 dialog opens after 「Produce」, and its 「Cancel」 returns to the Produce sheet  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-084, TC-085  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Question for PM, filed for a decision (user-experience order of the flow, [AIAgent][UX] with BugBelong PM). R-043 / R-044 / R-045 (PM Export Flow, arrows 86:955 / 86:956; PM-only, no Design frame): Editor 「Export」 › dialog › 「Export」 › Produce sheet; 「Cancel」 stays in the editor (Q-7). The app opens the Produce sheet on 「Export」 and shows the dialog only after 「Produce」 (on Free after the Pro paywall when it shows), over the dimmed sheet; 「Cancel」 leaves the user on the Produce sheet. The dialog's content matches the PM word for word. Same order in TC-033 and TC-065.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Export: AIGC dialog opens after 「Produce」, not on 「Export」; Cancel returns to Produce
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ on the Launcher
3. Turn 「Remove AIGC Watermark」 Off
4. Tap the back button
5. Open a project that holds AI Anime content
6. Tap 「Export」
7. Tap 「Produce」
8. Tap 「Cancel」 on the dialog
9. Check the result

Result:
The dialog shows only after 「Produce」, and 「Cancel」 returns to the Produce sheet, not the editor.
摘要：對話框在按「Produce」之後才出現，按「Cancel」回到 Produce 面板而非編輯器。
{16.9.0_awa14_produce_sheet_first.jpg} {16.9.0_awa14_dialog_after_produce.jpg} {16.9.0_awa14_cancel_back_to_sheet.jpg}

Expect Result:
PM to decide: should 「Export」 open the dialog first (PM flow), with 「Cancel」 back to the editor?
摘要：請 PM 決定：是否應按「Export」即先出對話框，「Cancel」回編輯器。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-export (Export Flow) board (Export, then the AIGC Watermark dialog, then the Produce sheet; arrow 86:955) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-955
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/14_ISS-AWA-14/`

---

## 15. ISS-AWA-15 — AI Cartoon and AI Sketch return a portrait photo turned 90°  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** O-22  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Off-case observation O-22 (R1-g, closest TC-073 / TC-076): AI Style Transfer › 「AI Cartoon」 (Elf) and 「AI Sketch」 (Oil Painting) on the portrait camera photo DSC_0047.JPG return the styled image lying sideways, in the preview and in both exports (files/TC-074-cartoon-off.mp4 at 11 s, TC-077-sketch-off.mp4); the original photo shows upright on the same timeline. Likely the EXIF orientation is dropped in the style-transfer path. Not an AIGC watermark rule: no spec states it, so the basis is the editor's own display of the source photo. No Android ticket matches (dedupe.txt).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Editor (AI Style Transfer): AI Cartoon and AI Sketch results of a portrait photo are turned 90°
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「New Project」
3. Add a portrait photo taken with the phone camera
4. Tap the photo clip
5. Tap 「Effects」
6. Tap 「AI Style Transfer」
7. Tap 「AI Cartoon」
8. Tap 「Elf」
9. Wait for the result
10. Look at the preview
11. Check the result

Result:
The styled photo is drawn turned 90° (face lying sideways); the original photo shows upright.
摘要：套用 AI Cartoon / AI Sketch 後，直式照片被轉 90 度（人臉橫躺）。
{16.9.0_awa15_cartoon_rotated.jpg} {16.9.0_awa15_sketch_rotated.jpg}

Expect Result:
The styled photo keeps the original photo's orientation.
摘要：套用風格後的照片應維持原照片方向。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Remove AIGC Watermark PM spec, pm-rules (Scope) board (AI Cartoon, AI Sketch are timeline AI content tools) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
Basis: In-product — Editor: the same portrait photo shows upright on the timeline before the style is applied
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/15_ISS-AWA-15/`

---

## 16. ISS-AWA-16 — 「Remove AIGC Watermark」 is On on a fresh install, so results carry no watermark by default  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-008  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611161

> **QA note — not pasted into eBug.** Question for PM, filed for a decision (Q-1, a default that decides what every new user's results look like: [AIAgent][UX], BugBelong PM). R-009 assumed Off: the music and export dialogs say results 「will include an AIGC watermark」 and the Jira's acceptance criterion is that the watermark is visible; but both mockups (Design 2608 and PM Essential) draw the switch On, and the build follows the drawings. After adb shell pm clear (fresh data, same build) and 「Get Started」, Menu › Settings reads On, signed out; it read On at the run's start too.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Settings (AIGC Watermark): 「Remove AIGC Watermark」 is On by default on a fresh install
```

**Description:**

```
Repro Steps:
1. Launch the APP for the first time after clearing its data
2. Tap 「Get Started」
3. Close the 「PowerDirector Pro」 page
4. Tap ☰ on the Launcher
5. Read 「Remove AIGC Watermark」
6. Check the result

Result:
On a fresh install the switch 「Remove AIGC Watermark」 is On, so results get no watermark.
摘要：全新安裝後「Remove AIGC Watermark」預設為開啟，產出不帶浮水印。
{16.9.0_awa16_switch_on_fresh.jpg}

Expect Result:
PM to decide the default: Off (results watermarked, as the dialogs say) or On (as both mockups draw)?
摘要：請 PM 決定預設值：關閉（依對話框文案加浮水印）或開啟（依設計稿）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AIGC Watermark Design spec (Settings), 2608_AIGC Watermark board (Settings row; switch drawn On) -
https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3815-9037
Spec Link: Remove AIGC Watermark PM spec, pm-settings (Entry) board (Essential User: switch drawn On) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0_images/16_ISS-AWA-16/`

---

# Not raised (for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| TC-067 | Voice Changer 「Radio 1」 project: no label in the editor preview (switch Off) | Free can only apply Effect voices; the sheet lists the plain Audio VoiceChanger as a non-AI effect (無簽章, 非 AI effect), so these may correctly not count as AI content. Rerun with a Pro AI voice (Professional / Mellow / Bright) before judging. |
| TC-068 | Voice Changer 「Radio 1」 project exports with no dialog and no label | Same as TC-067: table question (the row needs an AI voice, Pro). Not a bug yet. |
| O-1 | Credit-key errors in logcat right after a relaunch | Start-up race; balance still read; not seen again in R1-b. |
| O-2 | Pro paywall at first launch (Free account) | Normal for Free. |
| O-4 | Text to Image 「GPT-Image-2.6 Sunburst」 raw file is Google-made | Information for RD (Q-12). |
| O-5 | R1-b by-case log windows are zero-length | Tooling note. |
| O-7 | Image to Video charges match; a mistaken Kling 4.0 task failed and was refunded | Refund correct (net 0). |
| O-8 | CyberLink manifest's digitalSourceType looks swapped between Off and On saves | No row checks the value; spec-addition candidate / RD question (report). |
| O-9 | Seedance Pro-only; no Flux / Hailuo | Environment (rows Blocked). |
| O-10 | Image to Video writes a new file per save | Correct; context for ISS-AWA-04. |
| O-11 | Appium recorder stops in the player | Tooling; folded into ISS-AWA-07's note. |
| O-12 | log-slice windows vs generations | Tooling note. |
| O-13 | Several tools auto-save their result to the gallery when the task finishes | Spec silent; PM question candidate (report), not drafted. |
| O-16 | Test photos carried the run's own labels | Test data note (fixtures). |
| O-17 | AI Storytelling not in My Artwork; Video Object Removal absent; driving notes | Environment / driving. |
| O-18 | Text to Video model list; rotated portrait storage | Environment; label drawn correctly. |
| O-20 | 「No Internet Connection」 after a locale relaunch; fixed by relaunch | Start-up race like O-1. |
| O-21 | Pro paywall after every Produce (Free) | Normal for Free. |
| O-24 | Voice Changer Effect voices free, AI voices Pro | Context for TC-067 / TC-068. |
| O-25 | AI Cartoon / AI Sketch charged nothing; editor AI Anime 22 min | Credits note. |
| O-26 | Editor full-screen hint; Launcher ☰ only on Home | Driving note. |
| O-27 | After pm clear the app could not be signed in | Environment; ISS-AWA-10 recheck pending. |
| O-28 | Google sign-in opens Chrome with no account chooser | Environment; sign-in left to the user. |
| O-29 | 「Account Not Found」 after sign-in; bindMember 403 invalid device identity | Same build already has DRA262611P0200 (Sign in CL account fail, S1, Assigned, TR261116-0056): dedupe.txt only. |
| Blocked (24) | 3 defect, 5 observability, 16 test-data | No verdict (reasons in report.md and blocked-reasons.json); TC-055 / TC-056 / TC-128 wait for the music recheck. |

## Reconciliation against the run

45 Fail (35 defect, 10 question), 24 Blocked, 0 Not run, 29 observations (O-1 … O-29).

| Step | Count | Running total |
|---|---|---|
| Fail rows + observations | 74 | 74 |
| → not raised (2 Voice Changer rows, 22 observations incl. O-29, an open Android ticket) | −24 | 50 |
| → merged: 50 rows / observations share 16 defects or questions | −34 | **16 entries** |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-003 | Fail | defect | 1. ISS-AWA-01 |
| TC-046 | Fail | question | 2. ISS-AWA-02 |
| TC-049 | Fail | defect | 3. ISS-AWA-03 |
| TC-051 | Fail | defect | 4. ISS-AWA-04 |
| TC-052 | Fail | defect | 5. ISS-AWA-05 |
| TC-089 | Fail | defect | 4. ISS-AWA-04 |
| TC-121 | Fail | defect | 6. ISS-AWA-06 |
| TC-020 | Fail | defect | 7. ISS-AWA-07 |
| TC-090 | Fail | defect | 9. ISS-AWA-09 |
| TC-093 | Fail | defect | 8. ISS-AWA-08 |
| TC-094 | Fail | defect | 8. ISS-AWA-08 |
| TC-096 | Fail | defect | 8. ISS-AWA-08 |
| TC-097 | Fail | defect | 8. ISS-AWA-08 |
| TC-122 | Fail | defect | 9. ISS-AWA-09 |
| TC-017 | Fail | defect | 7. ISS-AWA-07 |
| TC-023 | Fail | defect | 7. ISS-AWA-07 |
| TC-026 | Fail | defect | 7. ISS-AWA-07 |
| TC-038 | Fail | defect | 7. ISS-AWA-07 |
| TC-041 | Fail | defect | 7. ISS-AWA-07 |
| TC-107 | Fail | defect | 8. ISS-AWA-08 |
| TC-110 | Fail | defect | 9. ISS-AWA-09 |
| TC-111 | Fail | defect | 9. ISS-AWA-09 |
| TC-113 | Fail | defect | 9. ISS-AWA-09 |
| TC-114 | Fail | defect | 8. ISS-AWA-08 |
| TC-035 | Fail | defect | 7. ISS-AWA-07 |
| TC-099 | Fail | defect | 9. ISS-AWA-09 |
| TC-102 | Fail | defect | 8. ISS-AWA-08 |
| TC-106 | Fail | defect | 8. ISS-AWA-08 |
| TC-014 | Fail | defect | 11. ISS-AWA-11 |
| TC-015 | Fail | defect | 11. ISS-AWA-11 |
| TC-016 | Fail | defect | 11. ISS-AWA-11 |
| TC-054 | Fail | defect | 10. ISS-AWA-10 (rechecked on 2611171, filed) |
| TC-057 | Fail | defect | 10. ISS-AWA-10 (rechecked on 2611171, filed) |
| TC-058 | Fail | defect | 11. ISS-AWA-11 |
| TC-059 | Fail | defect | 11. ISS-AWA-11 |
| TC-061 | Fail | defect | 12. ISS-AWA-12 |
| TC-064 | Fail | question | 13. ISS-AWA-13 |
| TC-067 | Fail | question | not raised |
| TC-068 | Fail | question | not raised |
| TC-070 | Fail | question | 13. ISS-AWA-13 |
| TC-073 | Fail | question | 13. ISS-AWA-13 |
| TC-076 | Fail | question | 13. ISS-AWA-13 |
| TC-084 | Fail | question | 14. ISS-AWA-14 |
| TC-085 | Fail | question | 14. ISS-AWA-14 |
| TC-008 | Fail | question | 16. ISS-AWA-16 |
| O-1 | observation | — | not raised |
| O-2 | observation | — | not raised |
| O-3 | observation | — | 6. ISS-AWA-06 |
| O-4 | observation | — | not raised |
| O-5 | observation | — | not raised |
| O-6 | observation | — | 4. ISS-AWA-04 |
| O-7 | observation | — | not raised |
| O-8 | observation | — | not raised |
| O-9 | observation | — | not raised |
| O-10 | observation | — | not raised |
| O-11 | observation | — | not raised |
| O-12 | observation | — | not raised |
| O-13 | observation | — | not raised |
| O-14 | observation | — | 8. ISS-AWA-08; 9. ISS-AWA-09 |
| O-15 | observation | — | 7. ISS-AWA-07 |
| O-16 | observation | — | not raised |
| O-17 | observation | — | not raised |
| O-18 | observation | — | not raised |
| O-19 | observation | — | 11. ISS-AWA-11 |
| O-20 | observation | — | not raised |
| O-21 | observation | — | not raised |
| O-22 | observation | — | 15. ISS-AWA-15 |
| O-23 | observation | — | 12. ISS-AWA-12 |
| O-24 | observation | — | not raised |
| O-25 | observation | — | not raised |
| O-26 | observation | — | not raised |
| O-27 | observation | — | not raised |
| O-28 | observation | — | not raised |
| O-29 | observation | — | not raised (existing ticket, dedupe.txt) |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 15 |
| PM | 2, 5, 13, 14, 16 |

### Filing order

By severity: **4**, **11**, **1**, **2**, **3**, **5**, **6**, **7**, **8**, **9**, **12**, **13**, **14**, **15**, **16**; **10** only after the music recheck. Nothing is filed until the review page's decisions come back.
