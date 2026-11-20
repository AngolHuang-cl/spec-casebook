# AI Video Enhance (Android) — eBug drafts, round R2 (table v10), PDR-A 16.9.0 build 2611181 (rechecked; R2 ran 2611091)

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-18-r2-full/` — round R2 of draft `drafts/20261117-105552` (table v10, 219 cases), 2026-11-18 09:21 → 2026-11-19 04:46 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, build 2611091, TR261109-0041 (SR DRA261109-01), Stage server, account cltqauiap2@gmail.com, fresh install. Tally: 89 Pass, 121 Fail, 9 Blocked.

**Status:** nothing filed, uploaded or commented. New failures only: R1's filed DRA262611P0071 – P0101 and the Android tickets DRA262611P0113 – P0117 (filed 2026-11-12 on 2611091) are not repeated; an R2 failure one of them covers on Android is kept only in `dedupe.txt` (per OS, overlay rule 7). The review page prefills the filing account from the newest filed batch (`ebug-defaults.ts pdr/video-enhance android`).

**Recheck on the TR's build:** every draft was re-exercised on 16.9.0.2611181 (TR261118-0074, the build to file on) on 2026-11-19 09:17–09:28 (`recheck-2611181/verdicts.md`). 6 reproduced and stay as drafts with 2611181 evidence; 3 could not be re-exercised and are held (below), not filed and not dropped.

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link on its own line and an image on every entry, the logcat excerpt on every failure- or charge-related one, no video). Owner and type: defects RD (Functional or [UI]); open questions and findings with no spec basis to PM, [UX] for a user-experience problem, [UI] for text (AGENTS.md 2026-11-11). Every severity is proposed as 2, as the user decided for the R1 batches.

**What is drafted:** 6 entries: 3 defects (entries 1–3) and 3 open questions filed to PM (entries 4–6). 27 Android tickets cover the other failures (dedupe.txt); 5 questions are cited.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-35 — Play does nothing when the playhead sits at the end of the selection  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-037, O-8  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** New in R2 (R1 recorded TC-037 Pass without trimming first). R-027 (Design ds-main-flow VE · 02: the Preview's play button plays the video from the selection). ve-1230-1080p30 trimmed with the right handle to 02:00–04:01: the trim leaves the playhead at the selection end (「04:01/12:30」); play there does nothing for 2.4 s of readings and a screen recording (time stays 04:01, the icon never changes, the frame does not move). With the playhead dragged back to the selection start, play runs 02:00 → 02:03. The full-screen part of the row is DRA262611P0092 (not repeated). Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: selection 02:00–04:01 with the playhead at 04:01, play does nothing for 3 s (screen recording; logcat shows the decoder start and the TextureView frame rate drop back to 0 within ~0.14 s); positive control from the selection start plays 02:00 → 02:04. The Repro order is now left handle first, then right (moving the left handle last collapsed the selection on 2611181).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Play does nothing when the playhead sits at the selection's end
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 12:30 1080p 30 fps video in Add Media
4. Drag the left trim handle right to 02:00
5. Drag the right trim handle left until 「Selected Length」 reads 「02:00」
6. Tap play under the Preview
7. Wait 3 seconds
8. Check the result

Result:
The playhead sits at the selection end (「04:01/12:30」) and play does nothing: time, frame and icon stay the same.
摘要：修剪後播放頭停在選取範圍結尾，點播放沒有任何反應（時間、畫面、圖示都不變）。
{16.9.0_vea35_playhead_at_end.jpg} {16.9.0_vea35_play_no_change.jpg} {16.9.0_vea35_log.txt}

Expect Result:
Play plays the video from the selection (R-027), e.g. from the selection start when the playhead is at its end.
摘要：點播放應從選取範圍內播放（例如播放頭在結尾時從選取起點開始）。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02: play under the Preview) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/01_ISS-VEA-35/`

---

## 2. ISS-VEA-37 — With no video on the phone, Add Media shows the partial-access prompt although access to all media is granted  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-023  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** Blocked in R1 (needs an empty gallery); run in R2-x with every video folder moved out of MediaStore (885 → 0 videos, restored after). R-016 (PM pm-draft-logic A2 [建議]: the empty state 「No videos yet」), quoted as the proposal. Whatever the copy, the screen is plainly wrong: PowerDirector holds full video access (READ_MEDIA_VIDEO granted, Android 15), yet Add Media shows the partial-access text and the album list only 「Downloaded 0」. A visible defect is filed even when the exact wording is a proposal (ebugs.md step 1). Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED with 887 → 0 videos (restored after): same text, albums only 「Downloaded」 0.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Empty gallery: Add Media shows the partial-access prompt, not an empty state
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Allow PowerDirector access to all photos and videos
3. Remove every video from the phone's gallery
4. Tap 「Video Enhance」 on the Launcher
5. Tap 「Try It Now」 on the Demo page
6. Check the result

Result:
No tiles; text 「To select photos and videos, add more media from the gallery or allow access to all media.」
摘要：已允許存取全部媒體卻顯示部分存取提示，而非無影片的空狀態。
{16.9.0_vea37_partial_access_text.jpg} {16.9.0_vea37_albums_downloaded_0.jpg}

Expect Result:
An empty state for a phone with no videos (PM A2 proposal: 「No videos yet」; R-016), not the partial-access prompt.
摘要：應顯示無影片的空狀態（PM A2 提案「No videos yet」），而非部分存取提示。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance PM spec, Logic 補充 · 對齊 Design 26.09 v2 (9/29) board (A2 [建議]: Add Media empty state 「No videos yet」) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=405-1108
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (Add Media) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/02_ISS-VEA-37/`

---

## 3. ISS-VEA-38 — With notifications off, no 「Turn on notifications」 dialog appears after the first upload  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-118, TC-119, TC-120, TC-211, O-32  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** Blocked in R1 (system setting); run in R2-x after a pm clear with PowerDirector notifications turned off (permission revoked, channel off; user go-ahead 2026-11-18). R-093 (PM pm-main-flow §4.2 step 6 / §9 / §10.4, arrow 397-1241; PM-only, no Design frame yet): after the first upload the dialog 「Turn on notifications」 / 「We'll let you know when it's done.」 with 「Turn On」 / 「Later」. Two first-install tasks (04:40:12 and 04:42:55, ve-real-000320-720p30, −4 each): the upload ended, Recent task opened, and no dialog showed (also not in the 8 s after; no dialog in logcat). O-32: the app instead raised Android's own 「Allow PowerDirector to send you notifications?」 prompt once, when the first task finished (notify(2) at 04:42:22). TC-119, TC-120 and TC-211 (Turn On / Later) stay Blocked behind it. Notifications were turned back on afterwards. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 10:41–10:55, recheck-2611181/verdicts.md: CONFIRMED 2/2 on Pro (test subscription bought by the user), after a pm clear with notifications off (permission revoked, channel NONE): ve-real-000320-720p30, 「Enhance 4」, uploads 10:46:34 → 10:47:39 and 10:48:30 → 10:49:35, Recent task opened each time and no dialog in 14–15 s of readings or later (watched to 10:54). Android's own prompt showed once at first launch, before notifications were turned off, so O-32's prompt-after-the-task did not repeat; logcat shows the app still posting its done notifications, which Android blocks. Notifications turned back on after.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: With notifications off, no 「Turn on notifications」 dialog after the upload
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Turn off notifications for PowerDirector in Android Settings
3. Tap 「Video Enhance」 on the Launcher
4. Tap 「Try It Now」 on the Demo page
5. Tap a 3 s 720p video in Add Media
6. Tap 「Enhance」
7. Wait until the upload finishes
8. Check the result

Result:
The upload finishes and Recent task opens; no 「Turn on notifications」 dialog appears, on the first task or the second.
摘要：關閉通知後第一次上傳完成，未出現「Turn on notifications」對話框。
{16.9.0_vea38_panel_notifications_off.jpg} {16.9.0_vea38_no_dialog_recent_task_1.jpg} {16.9.0_vea38_no_dialog_recent_task_2.jpg} {16.9.0_vea38_log.txt}

Expect Result:
After the upload, 「Turn on notifications」 with 「Turn On」 and 「Later」 appears (R-093).
摘要：上傳完成後應出現「Turn on notifications」對話框（Turn On / Later）。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance PM spec, 主線 - 選片到拿到成品 board (§4.2 step 6 / §9, arrow 397-1241: notification prompt after the first upload) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=397-1241
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/03_ISS-VEA-38/`

---

## 4. ISS-VEA-43 — Picking a large local video opens the panel with no import overlay, percentage or 「Cancel」 (iOS-observed UI)  ·  Class: Functional  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-315  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** **Open question filed to PM for a decision.** **Proposed Type UX** (a PM decision on a user-experience problem, AGENTS.md 2026-11-11): drafted as Functional so the format checks pass; choosing Type UX on the review page adds [UX] at filing. R-205 has no Design or PM basis: it is the iOS UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-331, REQ-020); a finding with no spec basis is filed to PM for a decision (AGENTS.md 2026-11-11). Screen recording of the tap on ve-1230-1080p60 (12:30, 256 MB): the panel slides in within ~0.4 s, no overlay, percentage or 「Cancel」 in any frame. Android may simply not need an import step for a local file; PM to say whether Android should match iOS. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: the panel (「60fps · 1080p」) opens within ~0.4 s; no overlay, percentage or 「Cancel」 in the recording.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Picking a video opens the panel with no import overlay or 「Cancel」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap 「Try It Now」 on the Demo page
4. Tap a 12:30 1080p 60 fps video in Add Media
5. Watch the screen until the panel opens
6. Check the result

Result:
The panel opens within about 0.4 s; no import overlay, percentage or 「Cancel」 shows.
摘要：點選大檔影片後約 0.4 秒直接開啟面板，沒有匯入進度與 Cancel（iOS 有）。
{16.9.0_vea43_no_import_overlay_frames.jpg} {16.9.0_vea43_panel_open.jpg}

Expect Result:
PM to decide whether Android shows iOS's import overlay with a percentage and 「Cancel」 (R-205).
摘要：請 PM 決定 Android 是否需要與 iOS 相同的匯入進度遮罩與 Cancel。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (Add Media → panel: no import step drawn) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/04_ISS-VEA-43/`

---

## 5. ISS-VEA-44 — Add Media's sort offers Name / Date / Duration / Resolution / File size, not the iOS list (iOS-observed UI)  ·  Class: Functional  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-316, O-10  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** **Open question filed to PM for a decision.** **Proposed Type UX** (a PM decision on a user-experience problem, AGENTS.md 2026-11-11): drafted as Functional so the format checks pass; choosing Type UX on the review page adds [UX] at filing. R-206 has no Design or PM basis (the Design draws Add Media without a sort control): it is the iOS UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-332, REQ-020). Android's 「Sort by」 offers 「Name」, 「Date」, 「Duration」, 「Resolution」, 「File size」 and both orders; closing it without a choice keeps the order (that part passes). O-10 (test note, not raised): the order rows carry the content-desc of the Name / Date keys. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: same five keys and both orders (O-10 unchanged).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Add Media sort keys differ from iOS (no Default or Modified Date)
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap 「Try It Now」 on the Demo page
4. Tap the sort control in Add Media
5. Check the result

Result:
「Sort by」 offers 「Name」, 「Date」, 「Duration」, 「Resolution」, 「File size」 with 「Ascending」 / 「Descending」.
摘要：Android 排序選項與 iOS 不同（沒有 Default 與 Modified Date）。
{16.9.0_vea44_sort_keys.jpg}

Expect Result:
PM to decide the Android sort keys; iOS shows 「Default」, 「Date」, 「Duration」, 「Modified Date」 (R-206).
摘要：請 PM 決定 Android 的排序選項是否需與 iOS 一致。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (Add Media: no sort control drawn) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/05_ISS-VEA-44/`

---

## 6. ISS-VEA-45 — Empty Recent task reads 「No Generated Videos」 with 「Create another one」, not 「No results found」 (iOS-observed UI)  ·  Class: UI  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-317  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** **Open question filed to PM for a decision.** R-207 has no Design or PM basis (the Design draws no empty Recent task): it is the iOS UI the spec agent's user approved (spec agent TC-VE2-333, REQ-020). Text owner PM: the spec must supply the empty-state copy (text rule, 2026-11-11). Seen on the fresh install before any task. O-1 (not raised, for the report): the account's R1 tasks were not listed after the reinstall although the page says 「Tasks are stored on the cloud for 1 year」. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED after a pm clear and sign-in: empty Recent task, 「No Generated Videos」 and 「Create another one」 (O-1 again: the account's older tasks are not listed).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Empty Recent task reads 「No Generated Videos」, not 「No results found」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap 「Try It Now」 on the Demo page
4. Tap a video in Add Media
5. Tap the Recent task icon in the panel's top bar
6. Check the result

Result:
Recent task shows no card, 「No Generated Videos」 and the button 「Create another one」.
摘要：無任務時顯示「No Generated Videos」，非 iOS 的「No results found」。
{16.9.0_vea45_empty_recent_task.jpg}

Expect Result:
PM to give the empty Recent task copy; iOS shows 「No results found」 (R-207).
摘要：請 PM 決定 Recent task 空狀態文案（iOS 為「No results found」）。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (Recent task: no empty state drawn) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-R2_16.9.0_images/06_ISS-VEA-45/`

---

## Held — not re-verified on 16.9.0.2611181 (not drafted for filing)

Found on 2611091 in R2 (text kept in the generator); they go back to the drafts once rechecked on the TR's build.

| ISS | Finding | Rows | Why held |
|---|---|---|---|
| ISS-VEA-39 | A task that failed on the server shows the grey placeholder, not the 「Error」 thumbnail | TC-170, O-19 | not re-verified on 2611181: R2's failed task card is gone (wiped by R2-x's pm clear) and Android has no fault switch to make a server failure |
| ISS-VEA-40 | 「View Details」 on a failed task opens 「Need Help?」 instead of the error dialog that says the credits were refunded | TC-171, TC-210 | not re-verified on 2611181: same as ISS-VEA-39, no failed card to open 「View Details」 on |
| ISS-VEA-41 | Credits of a task that failed come back only 3 h 19 – 3 h 36 min later, not at the failure | TC-173, TC-112, O-15, O-23 | not re-verified on 2611181: needs a real server failure, 180 credits and a 3+ hour wait for the refund |

## Already filed on Android (dedupe.txt only, not drafted)

| Ticket | Finding | R2 rows / observations |
|---|---|---|
| DRA262611P0071 | Launcher / AI Magic name 「Video Enhance」 | TC-002 |
| DRA262611P0086 | Demo page description is AI Reframe's text | TC-011, O-34 |
| DRA262611P0101 | 8K converted to Full HD, 「0fps · 1080p」 (steps 1–3) | TC-022 |
| DRA262611P0089 | Under-1 s and MKV sources not greyed (TC-022 steps 4–5, TC-269 0.9 s) | TC-022, TC-269 |
| DRA262611P0074 | No Preview time at rest | TC-033, TC-259, TC-215 |
| DRA262611P0075 | Shown lengths truncated while price and limit round up: 「02:30」 refused by Professional; a hand-set 「00:30」 / 「01:30」 priced 31 / 91 s (the 36 price-grid rows; the ticket's O-5b already records 「one second over the shown length」) | TC-259 … TC-313 (41) |
| DRA262611P0076 | Exact-second files billed one extra second (padding, KF-001) | TC-269, TC-270 |
| DRA262611P0077 | Offline Enhance shows nothing | TC-100 |
| DRA262611P0078 | Ring 0% then stalls | TC-110 |
| DRA262611P0083 | Failed / cancelled task card with a nonsense length (「25000:00:00」) and Retry, blank thumbnail | TC-112 |
| DRA262611P0082 | Recent task notice 「1 year」 / 「Select」 | TC-140, TC-144 |
| DRA262611P0081 | Recent task has no ‹; Back to the Launcher | TC-141, TC-208 |
| DRA262611P0084 | Tasks far over 1.5–2.5× their length (R-204) | TC-265 … TC-238 (22) |
| DRA262611P0095 | Notification copy is the banner's | TC-133 |
| DRA262611P0090 | Strip not re-laid to 2:30 in Professional | TC-045, TC-264 |
| DRA262611P0087 | Handles meet, 「00:00」 under 1 s | TC-046, TC-217 |
| DRA262611P0091 | Dragging the selection moves the range against the finger | TC-043, O-7 |
| DRA262611P0092 | Full-screen preview: no close, restarts at 00:00 (steps 4–5) | TC-037 |
| DRA262611P0093 | Limit bubble covers the Preview time | TC-044, TC-216 |
| DRA262611P0099 | Timeline clip over 8:00 opens capped at 08:00 | TC-161 |
| DRA262611P0100 | Timeline result not pasted back; Add to Timeline makes a new project | TC-162, TC-165 |
| DRA262611P0208 | Preview lags behind the double-arrow seek handle (knob); Android, Assigned, RD, filed 2026-11-17 on 2611161 by another tester | TC-215 |
| DRA262611P0073 | 「0fps」 badge for a non-album pick (Google Photos joins stock and Timeline sources, KF-008) | O-2 |
| DRA262611P0115 | 1 fps source: no fps chip selected, all disabled (was ISS-VEA-36; 「A 1fps source has no selectable output frame rate」, Assigned, RD, filed 2026-11-12 on 2611091) | TC-052 |
| DRA262611P0113 | Preview frame lags behind a dragged trim handle, Q-27 (was ISS-VEA-42; 「Clarification: allowed Preview delay while trimming」, Assigned, RD, filed 2026-11-12 on 2611091) | TC-042, TC-214, TC-216, TC-044, TC-272 |
| DRA262611P0116 | Credit Details names the debit 「Video Enhancer」, R-203 (Assigned, RD, filed 2026-11-12; replaces the citation of iOS DRI261895P0021) | TC-219 … TC-254 (36) |
| DRA262611P0117 | Source total 「02:30」 for a 150.03 s video, not rounded up to 「02:31」 (Assigned, RD, filed 2026-11-12) | TC-259 |

## Cited instead of filed

| Question | Rows | Answered by | Why not filed |
|---|---|---|---|
| Q-18 backgrounding during the upload | TC-115, O-18 | DRA262611P0079 | Filed in R1 (PM). In R2 Home no longer ended the task: the upload went on in the background and the task finished (charged 30). The decision Q-18 asks for is that ticket's. |
| 「Don't show again」 saved on ‹ (TC-013) | TC-013 | DRA262611P0088 (Close) | Android PM ticket from R1, closed on the same build 2611091 (the IF3 API gives no reason): read as PM accepting the app's behaviour; the row should follow the ruling (table update for the user). |
| Save Result toast 「Saved to Gallery」 (R-122) | TC-152 – TC-254 (38 rows) | DRA262611P0096 (Cancelled) | Android PM ticket from R1, Cancelled on the same build: read as PM keeping 「Saved to Gallery」; 38 rows fail on it, so the table should take the ruling (user). |
| 「Select」 offers only Delete / what 「Manage」 opens (Q-8) | TC-144 | DRA262611P0097 (Close) | Android PM ticket from R1, closed on the same build: read as PM accepting Select with Delete only; the 「1 year」 / 「Select」 label stays DRA262611P0082 (open). |
| Q-9 Back from Add Media | TC-021, TC-201 | DRA242410-0142 | Android ticket, Close (fixed 15.1.0): Back on the media picker opened with Try It Now goes to the Launcher on purpose (R1b withdrew ISS-VEA-17). |

## Not raised (observations, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| O-1 | R1's cloud tasks not listed after the reinstall (page says 「stored on the cloud for 1 year」) | No row states it; a PM question for the report (named in ISS-VEA-45's note). |
| O-3 | Congrats credits dialog; acknowledge 「Server error」 line | As R1; Android has no 「You're all set」 (REQ-012 ruling). |
| O-4 | 100 fps source → 「120fps」 chip at the 30fps 720p rate | As R-063 (the price grid passed on rates). |
| O-5 | No ⓘ next to Selected Length while the whole video fits the limit | No row states it; for the analysis. |
| O-6 | Professional ⓘ bubble 「Max 2.5 minutes. Drag to choose which part.」 | No row states the wording; for the analysis. |
| O-10 | Sort order rows carry the Name / Date content-desc | Accessibility id note for the scripts (ISS-VEA-44 names it). |
| O-11 | Left-handle cap bubble absent once ~0.3 s after release | Shown on the retry and every push; not a finding. |
| O-12 | 50-credit follow-up offer and 「Check Backup Protection」 dialog | Not in the Video Enhance spec; for the analysis. |
| O-13 | My Credits opens from the credit pill with a full balance | Route note. |
| O-16 | System Back on Recent task showed the AI Mini Drama intro page | Another feature's promotion page; not this feature. |
| O-17 | Pro test subscription lapsed ~13:54 | Environment (KP-068). |
| O-20 | Processing card turned complete in place (contradicts KF-004) | Knowledge correction, not a finding. |
| O-21 | Android Recents snapshot drew ‹ and ⌂ | Snapshot only; the live page has ⌂ only (DRA262611P0081). |
| O-22 | 65 s per MB upload on both Wi-Fi networks | Environment (server upload path); behind the slow tasks. |
| O-24 | Stray −4 task from an agent batch error | Agent error, not a result. |
| O-25 | After local midnight Credit Details shows no 2026-11 group | Held: recheck in daytime and across a month boundary before filing (O-31 repeats it). |
| O-26 | Pro lapsed again by 02:09 | Environment (KP-068). |
| O-27 | 4K 120 fps result black for 5 s on the first ▶ | Played on recheck; not a finding unless it repeats. |
| O-28 | Play test sheet renews every 30 min | Environment (KP-068). |
| O-29 | 00:30 1080p Timeline uploads took 23–24 min | Environment (upload path). |
| O-30 | Timeline panel prices a 00:30 clip at 30 s (no +1 padding) | Knowledge question for KF-001, not a failure. |
| O-31 | Credit Details still without a 2026-11 group at 04:26 | Held with O-25. |
| O-33 | Sign-in after pm clear: marketing box ticked by default; +30 Loyalty bonus | Account flow, not this feature. |
| Blocked (9) | 3 defect, 1 observability, 5 test-data | No verdict; TC-119 / TC-120 / TC-211 wait behind ISS-VEA-38. |

## Reconciliation against the run

121 Fail (84 defect, 37 question), 9 Blocked, 34 observations (O-1 … O-34). Each maps to an entry here, an R1 ticket (dedupe), a citation, or not raised; a row may map to several.

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-002 | Fail | defect | dedupe DRA262611P0071 |
| TC-011 | Fail | defect | dedupe DRA262611P0086 |
| TC-201 | Fail | defect | cited DRA242410-0142 |
| TC-021 | Fail | question | cited DRA242410-0142 |
| TC-315 | Fail | question | 4. ISS-VEA-43 (PM decision) |
| TC-316 | Fail | question | 5. ISS-VEA-44 (PM decision) |
| TC-317 | Fail | question | 6. ISS-VEA-45 (PM decision) |
| TC-022 | Fail | defect | dedupe DRA262611P0101; dedupe DRA262611P0089 |
| TC-023 | Fail | defect | 2. ISS-VEA-37 |
| TC-013 | Fail | question | cited DRA262611P0088 (Close) |
| TC-033 | Fail | defect | dedupe DRA262611P0074 |
| TC-259 | Fail | question | dedupe DRA262611P0074; dedupe DRA262611P0075; dedupe DRA262611P0117 |
| TC-037 | Fail | defect | 1. ISS-VEA-35; dedupe DRA262611P0092 |
| TC-270 | Fail | defect | dedupe DRA262611P0076 |
| TC-042 | Fail | question | dedupe DRA262611P0113 |
| TC-214 | Fail | question | dedupe DRA262611P0113 |
| TC-043 | Fail | question | dedupe DRA262611P0091 |
| TC-215 | Fail | question | dedupe DRA262611P0074; dedupe DRA262611P0208 |
| TC-044 | Fail | question | dedupe DRA262611P0093; dedupe DRA262611P0113 |
| TC-216 | Fail | question | dedupe DRA262611P0093; dedupe DRA262611P0113 |
| TC-272 | Fail | question | dedupe DRA262611P0113 |
| TC-045 | Fail | question | dedupe DRA262611P0090 |
| TC-264 | Fail | question | dedupe DRA262611P0090 |
| TC-046 | Fail | defect | dedupe DRA262611P0087 |
| TC-217 | Fail | defect | dedupe DRA262611P0087 |
| TC-052 | Fail | defect | dedupe DRA262611P0115 |
| TC-263 | Fail | defect | dedupe DRA262611P0075 |
| TC-274 | Fail | defect | dedupe DRA262611P0075 |
| TC-269 | Fail | defect | dedupe DRA262611P0089; dedupe DRA262611P0076 |
| TC-100 | Fail | defect | dedupe DRA262611P0077 |
| TC-278 | Fail | defect | dedupe DRA262611P0075 |
| TC-279 | Fail | defect | dedupe DRA262611P0075 |
| TC-280 | Fail | defect | dedupe DRA262611P0075 |
| TC-281 | Fail | defect | dedupe DRA262611P0075 |
| TC-282 | Fail | defect | dedupe DRA262611P0075 |
| TC-283 | Fail | defect | dedupe DRA262611P0075 |
| TC-284 | Fail | defect | dedupe DRA262611P0075 |
| TC-285 | Fail | defect | dedupe DRA262611P0075 |
| TC-286 | Fail | defect | dedupe DRA262611P0075 |
| TC-287 | Fail | defect | dedupe DRA262611P0075 |
| TC-288 | Fail | defect | dedupe DRA262611P0075 |
| TC-289 | Fail | defect | dedupe DRA262611P0075 |
| TC-290 | Fail | defect | dedupe DRA262611P0075 |
| TC-291 | Fail | defect | dedupe DRA262611P0075 |
| TC-292 | Fail | defect | dedupe DRA262611P0075 |
| TC-293 | Fail | defect | dedupe DRA262611P0075 |
| TC-294 | Fail | defect | dedupe DRA262611P0075 |
| TC-295 | Fail | defect | dedupe DRA262611P0075 |
| TC-296 | Fail | defect | dedupe DRA262611P0075 |
| TC-297 | Fail | defect | dedupe DRA262611P0075 |
| TC-298 | Fail | defect | dedupe DRA262611P0075 |
| TC-299 | Fail | defect | dedupe DRA262611P0075 |
| TC-300 | Fail | defect | dedupe DRA262611P0075 |
| TC-301 | Fail | defect | dedupe DRA262611P0075 |
| TC-302 | Fail | defect | dedupe DRA262611P0075 |
| TC-303 | Fail | defect | dedupe DRA262611P0075 |
| TC-304 | Fail | defect | dedupe DRA262611P0075 |
| TC-305 | Fail | defect | dedupe DRA262611P0075 |
| TC-306 | Fail | defect | dedupe DRA262611P0075 |
| TC-307 | Fail | defect | dedupe DRA262611P0075 |
| TC-308 | Fail | defect | dedupe DRA262611P0075 |
| TC-309 | Fail | defect | dedupe DRA262611P0075 |
| TC-310 | Fail | defect | dedupe DRA262611P0075 |
| TC-311 | Fail | defect | dedupe DRA262611P0075 |
| TC-312 | Fail | defect | dedupe DRA262611P0075 |
| TC-313 | Fail | defect | dedupe DRA262611P0075 |
| TC-110 | Fail | defect | dedupe DRA262611P0078 |
| TC-112 | Fail | defect | held ISS-VEA-41 (not re-verified on 2611181); dedupe DRA262611P0083 |
| TC-115 | Fail | question | cited DRA262611P0079 |
| TC-118 | Fail | defect | 3. ISS-VEA-38 |
| TC-133 | Fail | question | dedupe DRA262611P0095 |
| TC-140 | Fail | defect | dedupe DRA262611P0082 |
| TC-141 | Fail | defect | dedupe DRA262611P0081 |
| TC-208 | Fail | defect | dedupe DRA262611P0081 |
| TC-152 | Fail | defect | cited DRA262611P0096 (Cancelled) |
| TC-144 | Fail | defect | dedupe DRA262611P0082; cited DRA262611P0097 (Close) |
| TC-265 | Fail | defect | dedupe DRA262611P0084 |
| TC-266 | Fail | defect | dedupe DRA262611P0084 |
| TC-267 | Fail | defect | dedupe DRA262611P0084 |
| TC-170 | Fail | defect | held ISS-VEA-39 (not re-verified on 2611181) |
| TC-171 | Fail | defect | held ISS-VEA-40 (not re-verified on 2611181) |
| TC-173 | Fail | defect | held ISS-VEA-41 (not re-verified on 2611181) |
| TC-223 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-225 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-224 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-226 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-221 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-227 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-228 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-222 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-229 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-230 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-220 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-231 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-232 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-233 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-234 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-235 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-236 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-237 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-238 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-219 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-239 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-240 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-241 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-242 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-243 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-244 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-245 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-246 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-247 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-248 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-249 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-250 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-251 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-252 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-253 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-254 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-161 | Fail | question | dedupe DRA262611P0099 |
| TC-162 | Fail | question | dedupe DRA262611P0100 |
| TC-165 | Fail | question | dedupe DRA262611P0100 |
| TC-211 | Blocked | defect | 3. ISS-VEA-38 |
| TC-119 | Blocked | defect | 3. ISS-VEA-38 |
| TC-120 | Blocked | defect | 3. ISS-VEA-38 |
| O-1 | observation | — | not raised |
| O-2 | observation | — | dedupe DRA262611P0073 |
| O-3 | observation | — | not raised |
| O-4 | observation | — | not raised |
| O-5 | observation | — | not raised |
| O-6 | observation | — | not raised |
| O-7 | observation | — | dedupe DRA262611P0091 |
| O-8 | observation | — | 1. ISS-VEA-35 |
| O-9 | observation | — | dedupe DRA262611P0075 |
| O-10 | observation | — | 5. ISS-VEA-44 (PM decision); not raised |
| O-11 | observation | — | not raised |
| O-12 | observation | — | not raised |
| O-13 | observation | — | not raised |
| O-14 | observation | — | dedupe DRA262611P0075 |
| O-15 | observation | — | held ISS-VEA-41 (not re-verified on 2611181) |
| O-16 | observation | — | not raised |
| O-17 | observation | — | not raised |
| O-18 | observation | — | cited DRA262611P0079 |
| O-19 | observation | — | held ISS-VEA-39 (not re-verified on 2611181) |
| O-20 | observation | — | not raised |
| O-21 | observation | — | not raised |
| O-22 | observation | — | not raised |
| O-23 | observation | — | held ISS-VEA-41 (not re-verified on 2611181) |
| O-24 | observation | — | not raised |
| O-25 | observation | — | not raised |
| O-26 | observation | — | not raised |
| O-27 | observation | — | not raised |
| O-28 | observation | — | not raised |
| O-29 | observation | — | not raised |
| O-30 | observation | — | not raised |
| O-31 | observation | — | not raised |
| O-32 | observation | — | 3. ISS-VEA-38 |
| O-33 | observation | — | not raised |
| O-34 | observation | — | dedupe DRA262611P0086 |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 2, 3 |
| PM | 4, 5, 6 |

### Filing order

Defects first (**1**, **2**, **3**), then the PM decisions (**4**, **5**, **6**). Nothing is filed until the review page's decisions come back.
