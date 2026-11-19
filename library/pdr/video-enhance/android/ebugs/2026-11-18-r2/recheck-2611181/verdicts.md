# R2 eBug drafts rechecked on PDR-A 16.9.0.2611181 (TR261118-0074)

Drafts: `../20261119_eBug_drafts_Video-Enhance-R2_16.9.0.md`, entries 1–9 (found on 16.9.0.2611091).
Recheck: 2026-11-19 09:17–09:28 (CST), Samsung SM-A5360 (R5CTB22S05Y) / Android 15, Stage (yellow Launcher bar,
`[AID]Stage_Server`), account cltqauiap2@gmail.com. Build read back with `device-android.ts build`:
`versionName 16.9.0 versionCode 2611181 lastUpdateTime 2026-11-19 09:16:10`; `/sdcard/cyberlink/PDR/testserver.config`
present before and after the pm clear. **Tier: Free** (Mine 「Free」 「Claim offer」, 29562 credits; the Pro test
subscription bought in R2 has lapsed, KP-068). Nothing filed, commented, bought or charged; no credits spent.

Driving: `node scripts/device-android.ts <this folder> …` (activity.log here), logcat captured from 09:17:27 to 09:28
(`logs/pre-clear-20261119-092343/`, `logs/recheck-20261119-092808/`, full logs local only, `.gitignore` here);
excerpt `logs/16.9.0.2611181_vea35_log.txt`. Recordings in `recordings/`, raw screenshots in `screenshots/`, the
evidence copies are the `16.9.0.2611181_*.jpg` files in this folder.

| ISS | Draft | Verdict on 2611181 | Draft Result text |
|---|---|---|---|
| ISS-VEA-35 | 1 | **CONFIRMED** (positive control plays) | matches; Repro steps 4–5 need rewording |
| ISS-VEA-37 | 2 | **CONFIRMED** | matches |
| ISS-VEA-38 | 3 | **CONFIRMED** 2/2 (after the user's own test re-buy) | matches |
| ISS-VEA-39 | 4 | **not-re-verified** (R2's failed card is gone) | — |
| ISS-VEA-40 | 5 | **not-re-verified** (same) | — |
| ISS-VEA-41 | 6 | **not-re-verified** (needs a real failure + hours) | — |
| ISS-VEA-43 | 7 | **CONFIRMED** | matches |
| ISS-VEA-44 | 8 | **CONFIRMED** | matches |
| ISS-VEA-45 | 9 | **CONFIRMED** | matches |

---

## ISS-VEA-35 — Play does nothing when the playhead sits at the selection end — CONFIRMED

- 09:20 Add Media › album casebook-ve › the 12:30 1080p 30 fps tile (panel badge 「30fps · 1080p」) › panel opens at
  Selected Length 「08:00」.
- Right trim handle dragged left until Selected Length read 「01:45」, then nudged right to 「02:00」 (selection 00:00–02:00,
  Preview 「02:00/12:30」). Dragging the **left** handle right as the draft's step 5 says collapsed the selection to
  「00:00」 (the handles meet, DRA262611P0087 / TC-046), so the R2 state was rebuilt the way R2's TC-037 actually
  reached it: right handle dragged right until Selected Length read 「02:00」 again → selection 02:00–04:01, playhead at
  the selection end, Preview time 「04:01/12:30」 (`16.9.0.2611181_vea35_playhead_at_end_0401.jpg`).
- 09:20:53 tapped play (iv_play): readings at ~0.5 s intervals and the screenshot after ~3 s all 「04:01/12:30」, the
  icon stays ▶, the frame does not change (`16.9.0.2611181_vea35_play_no_change_after_3s.jpg`; recording
  `recordings/16.9.0.2611181_vea35-play-at-end.mp4`, frame strip `16.9.0.2611181_vea35_play_at_end_frames.jpg`).
  Logcat: at the tap the decoder flushes and resumes and the TextureView frame rate goes 30.0 → 0.0 after 0.12 s
  (09:20:53.412 → .534): playback starts and stops at once (`logs/16.9.0.2611181_vea35_log.txt`).
- Positive control, same screen: playhead dragged back to the selection start (「02:00/12:30」), play → 「02:01」,
  「02:02」, 「02:03」, then 「02:04」 after pause (`16.9.0.2611181_vea35_control_playhead_at_start.jpg`,
  `…_control_playing_0203.jpg`, `recordings/16.9.0.2611181_vea35-control-play-from-start.mp4`).
- **Result text:** still exact (「04:01/12:30」, nothing changes). **Repro steps 4–5 need rewording** (as written they
  collapse the selection): proposed
  4. Drag the right trim handle left until 「Selected Length」 reads 「02:00」
  5. Drag the right trim handle right until the selection is 02:00–04:01 (「Selected Length」 reads 「02:00」)
  — or simpler: "4. Drag the left trim handle right to 02:00 / 5. Drag the right trim handle left until 「Selected Length」 reads 「02:00」".
  Either way the last handle moved must be the right one, which leaves the playhead at the selection end.
- The draft can now carry a log excerpt (the 30.0 → 0.0 frame-rate pair); the QA note's "the log has no line" can go.

## ISS-VEA-37 — Empty gallery shows the partial-access prompt — CONFIRMED

- 09:21 `phone-settings.ts gallery status`: 887 videos; READ_MEDIA_VIDEO granted (full access, plus
  READ_MEDIA_VISUAL_USER_SELECTED). 09:21:36–09:21:48 hid every folder with videos (Movies/cyberlink,
  Movies/SpecAgentVE-20261113, Movies/casebook-ve, DCIM, 00PDRa_Testing_Material, Movies/casebook-ve-real,
  Download/Quick Share, Movies/VE test, Movies/VEParity-1230 / -0130 / -0130-60) → MediaStore 0.
- Relaunched, Launcher › Video Enhance › 「Try It Now」 (09:22:08): Add Media, album 「All」, no tiles, text
  「To select photos and videos, add more media from the gallery or allow access to all media.」
  (`16.9.0.2611181_vea37_partial_access_text.jpg`); album list shows only 「Downloaded」 「0」
  (`16.9.0.2611181_vea37_albums_downloaded_0.jpg`).
- Restored 09:22–09:23; `gallery status` reads 887 again with the same per-folder counts. (The first `restore` refused
  Movies/cyberlink because the app had recreated empty `Movies/cyberlink/PowerDirector/{Slow Motion,Video Enhance,Video
  Upscaler}` folders on launch; those were empty — 0 files — and were removed, then `restore` completed.)
- **Result text:** exact. QA note: the sort button is now **enabled** on the empty screen (`enabled="true"`), R2 said
  disabled — drop "the sort button is disabled" from the note.

## ISS-VEA-38 — No 「Turn on notifications」 dialog after the upload — CONFIRMED (2/2)

**Recheck (10:41–10:55).**
- **Purchase.** The user tapped 「Subscribe」 on the Google Play test sheet themselves, after the agent's two attempts
  were refused (below). At 10:41:02 Mine read 「Pro」, 「You're on the highest plan…」, 29662 credits
  (`16.9.0.2611181_vea38_mine_pro.jpg`). The +100 is the Pro monthly credit.
- **Reset.**
  - 10:41:14 `adb shell pm clear`; testserver.config stayed, the Launcher bar was yellow (Stage).
  - 「Get Started」, then Android's 「Allow PowerDirector to send you notifications?」 at first launch
    (`16.9.0.2611181_vea38_system_prompt_first_launch.jpg`) → Allow (AGENTS.md first-launch rule).
  - 「Congrats! 100 monthly credits have been added with your Pro subscription」 → Back.
  - The Pro tab read Pro before sign-in. Google-button sign-in (mauth-stage 「You Are All Set!」, 「Got it」, no
    password): 10:42:56 Pro, cltqauiap2@gmail.com, 29692 credits (`16.9.0.2611181_vea38_pro_after_clear_signin.jpg`).
- **Notifications off.** 10:43:00 `phone-settings.ts notifications … off`: POST_NOTIFICATIONS revoked
  (USER_SET|USER_FIXED), app-op ignore, channel importance NONE.
- **Path.** Video Enhance › 「Try It Now」 › File access 「Next」 › music Allow › photos/videos 「Allow all」 › album
  casebook-ve-real › ve-real-000320-720p30 (panel: 「30fps · 720p」, Selected Length 「00:03」, Standard / Natural /
  30fps / 720p, 「Enhance 4」, 「Charge 1 credits per second」) (`16.9.0.2611181_vea38_panel_notifications_off.jpg`).
- **Task 1.** 10:46:29 「Enhance」, then the overlay 「Video uploading...」 / 「Please keep the app open」 / 「Cancel」.
  The upload ran 10:46:34 → 10:47:39 (upload 200, apply effect 200), and Recent task opened at 10:47:39.9 with a
  「Processing…」 「4 minutes left…」 card. The screen was read every ~2 s to 10:47:54 (14 s): only Recent task, no
  「Turn on notifications」, 「Turn On」 or 「Later」 (`16.9.0.2611181_vea38_no_dialog_recent_task_1.jpg`).
- **Task 2.** Same path from 「Create another one」 › 「Try It Now」, same file. 10:48:26 「Enhance」, upload 10:48:30 →
  10:49:35, Recent task at 10:49:36.2. Read to 10:49:51 (15 s), no dialog
  (`16.9.0.2611181_vea38_no_dialog_recent_task_2.jpg`). Watched to 10:54:15: no dialog of any kind.
- **System prompt.** Android's own prompt showed only at first launch (above). None during or after the tasks: the
  permission was revoked user-fixed, unlike R2's O-32, where it came once when the first task finished. Logcat shows
  the app still posting its task-done notifications, `NotificationManager … notify(2…)` at 10:48:41 and
  `notify(4…)` at 10:50:47, which the system blocks.
- **Credits.** 29692 → 29688 (10:48:00, task 1) → 29684 (Pro tab 10:55:04): **8 credits** (2 × 4). Nothing else
  was bought or spent.
- **Not counted.** One earlier tap at 10:44:13 hit the panel title, not the button (`lbl Enhance` matched 「AI Video
  Enhance」): no session, no charge.
- **Log excerpt.** `logs/16.9.0.2611181_vea38_log.txt` (create session, upload, apply effect, Recent task, credit
  totals, NotificationManager; URLs and credit details removed). Full logs are in `logs/vea38-*/` (local only).
- **Restored.** 10:54:41 notifications back on: granted, app-op allow, importance DEFAULT, read back.
- **Result text:** still exact ("The upload finishes and Recent task opens; no 「Turn on notifications」 dialog
  appears, on the first task or the second."). The QA note's O-32 sentence (system prompt at task end) did not repeat
  here. In this flow the system prompt comes at first launch and was answered Allow before notifications were
  turned off.

**Earlier attempts (agent purchase refused).**
- 09:34: Mine › 「Claim offer」 › PowerDirector Pro › 「Continue」 opened the Google Play sheet 「PowerDirector Yearly
  Subscription」 「NT$1,190.00/30 min」, payment 「Test card, always approves」, 「This is a test subscription. It will
  recur according to this schedule. You will not be charged.」
  (`16.9.0.2611181_vea38_play_test_sheet_not_subscribed.jpg`). The agent's own permission layer refused the
  「Subscribe」 tap. Sheet closed; nothing bought.
- 09:50–09:52: retried after the user added an `autoMode.allow` rule. Same sheet, refused again (the rule most
  likely loads only in a new session). Sheet closed, still Free, nothing spent.

## ISS-VEA-39 — Failed task card shows the grey placeholder — not-re-verified

- 09:18 Video Enhance › Recent task (from the Demo page's icon, before any reset) lists only two cards, both
  「2026/11/19」 「AI Video Enhance 1119」 「0:04」 「View」 (R2-x's 04:40 / 04:42 tasks). R2's failed 01:30 task (18:51
  apply-effect 401, 「View Details」) is gone: R2-x's `pm clear` at 04:34 wiped the local Recent task list
  (`16.9.0.2611181_vea39-40_recent_task_no_failed_card.jpg`). No server fault switch on Android, so no failure could
  be made; no credits spent trying.

## ISS-VEA-40 — View Details opens 「Need Help?」 — not-re-verified

- Same as ISS-VEA-39: no failed card to open.

## ISS-VEA-41 — Refund 3+ hours after a failure — not-re-verified

- Needs a real server failure, ~180 credits and hours of waiting; not attempted (brief). No failed card left from R2.

## ISS-VEA-43 — No import overlay / percentage / Cancel for a large file — CONFIRMED

- 09:19:24 recording started; tapped the 12:30 1080p 60 fps tile (casebook-ve sorted by File size, largest first;
  panel badge 「60fps · 1080p」 confirms ve-1230-1080p60, 256 MB). Frames at 5 fps: tap highlight at 0.4 s, the panel
  has slid in by 0.8 s; no overlay, percentage or 「Cancel」 in any frame; Selected Length 「08:00」 found 5 s after the
  command (that includes the waitfor poll) (`recordings/16.9.0.2611181_vea43-pick-1230p60.mp4`,
  `16.9.0.2611181_vea43_no_import_overlay_frames.jpg`, `16.9.0.2611181_vea43_panel_open_60fps.jpg`).
- **Result text:** still matches ("within about 0.4 s; no import overlay, percentage or 「Cancel」").

## ISS-VEA-44 — Add Media sort keys — CONFIRMED

- 09:18:26 Add Media › sort button: 「Sort by」 with 「Name」, 「Date」 (checked), 「Duration」, 「Resolution」, 「File size」,
  「Ascending」, 「Descending」 (checked) (`16.9.0.2611181_vea44_sort_keys.jpg`). Closed with Back, order unchanged.
  O-10 still there: 「Ascending」 carries content-desc `[AID]Filter_Name`, 「Descending」 `[AID]Filter_Date`.
- **Result text:** exact.

## ISS-VEA-45 — Empty Recent task copy — CONFIRMED

- After the pm clear and sign-in: Video Enhance › 「Try It Now」 › Add Media (album 「All」) › first tile (00:03, panel
  「30fps · 720p」) › Recent task icon (09:27:49): no card, 「No Generated Videos」 (no_generated_text) and the button
  「Create another one」 (btn_edit_another), header 「Tasks are stored on the cloud for 1 year. Please download any you
  want to keep in local storage.」 (`16.9.0.2611181_vea45_empty_recent_task.jpg`).
- **Result text:** exact. O-1 repeats: the account's two tasks from 04:40 / 04:42 (listed at 09:18) are not shown after
  the pm clear + sign-in, although the page says tasks are stored on the cloud for 1 year.

---

## Other observations (not bugs, not filed)

- Account tier is Free again on 2611181 (Pro test subscription lapsed; KP-068). The user re-bought it at ~10:40 for ISS-VEA-38.
- Demo page subtitle is still AI Reframe's 「AI reframe your video for any aspect ratio, then fine-tune the crop in real
  time.」 (R2 TC-011 / O-34; already known).
- `phone-settings.ts gallery restore` refuses a folder the app recreated while hidden (PowerDirector makes empty
  `Movies/cyberlink/PowerDirector/…` folders at launch). Worth teaching the script to merge or remove an empty recreated
  folder.
- The first-launch notification prompt needed a second tap on 「Allow」 (the first `lbl Allow` hit the title text).
- Task 2's card still read 「Processing…」 「4 minutes left…」 at 10:54, although the log posted a task-done
  notification (notify 4) at 10:50:47 (task durations: DRA262611P0084).
- Phone left (10:55): PowerDirector on the Pro tab, signed in as cltqauiap2 (**Pro**, 29684), Stage, notifications on,
  photos/videos 「Allow all」, gallery 887 videos as before. Recent task holds the two new 0:04 tasks from 10:46 / 10:48.

## Slow upload (user ruling: over 1 minute is unacceptable)

**Finding.** On 16.9.0.2611181 the 「Video uploading...」 step for the 1.02 MB clip ve-real-000320-720p30 (1,018,610 bytes,
00:03, 30fps · 720p) takes 65 s, every time: 10:46:34 → 10:47:39 and 10:48:30 → 10:49:35 (ISS-VEA-38 tasks), and
11:35:04.690 → 11:36:09.713 here (logcat "Upload to S3: start" → "upload response code->200"). The dialog's
percentage reaches 100% within ~6 s of the tap and then sits at 100% for about a minute before it closes.

**Run (11:34–11:36).** Stage (yellow Launcher bar, `[AID]Stage_Server`), cltqauiap2 on Pro, notifications on, Wi-Fi
network 17F_QA_Wifi_5G (5 GHz, RSSI −58 dBm, link 195 Mbps). Launcher › Video Enhance › 「Try It Now」 › album
casebook-ve-real › ve-real-000320-720p30: panel 「30fps · 720p」, Selected Length 「00:03」, Standard / Natural / 30fps /
720p, 「Enhance 4」, 「Charge 1 credits per second」. 11:35:00 「Enhance」; the dialog was read with `texts` every ~2 s
and left alone (no Cancel, no Home). Only the one task was run: the upload was over 60 s again, so no second task.

| Time | Since tap | Dialog | Logcat |
|---|---|---|---|
| 11:35:00 | 0 s | (tap 「Enhance」) | 11:35:01.9 Create session start → 11:35:03.3 response 200; Transcode 11:35:03.3 → 11:35:04.5 |
| 11:35:03 | +2 s | 「0%」 「Video uploading...」 「Please keep the app open」 「Cancel」 | |
| 11:35:05 | +4 s | 「0%」 (`16.9.0.2611181_upload_t04s_0pct.jpg`) | 11:35:04.690 **Upload to S3: start** |
| 11:35:07 | +6 s | 「100%」 (`16.9.0.2611181_upload_t05s.jpg`) | |
| 11:35:08 – 11:35:30 | +8 – +29 s | 「100%」 at every reading (12 readings) | |
| 11:35:32 | +31 s | 「100%」 (`16.9.0.2611181_upload_t30s.jpg`) | |
| 11:35:34 – 11:35:55 | +33 – +54 s | 「100%」 at every reading (11 readings) | |
| 11:35:57 | +56 s | 「100%」 (`16.9.0.2611181_upload_t55s.jpg`) | |
| 11:35:59 – 11:36:07 | +58 – +66 s | 「100%」 (5 readings) | |
| 11:36:08 | +68 s | 「100%」, last reading with the dialog (`16.9.0.2611181_upload_end.jpg`) | 11:36:09.713 **upload response code->200**, Upload to S3: finish |
| 11:36:10 | +70 s | dialog gone, Recent task 「Processing…」 「4 minutes left…」 | 11:36:10.103 apply effect 200; 11:36:10.300 Recent task opens |

- **Upload duration (logcat): 65.0 s** (11:35:04.690 → 11:36:09.713). Tap to Recent task: ~70 s.
- **The percentage does not move after +6 s.** It goes 0% → 100% between +4 s and +6 s and then sits at 100% for
  ~63 s; the four screenshots t05s / t30s / t55s / end are pixel-identical (same MD5). The app logs no progress lines
  during the upload. The same 65 s three times, on a good 5 GHz link with the bytes apparently sent in seconds, looks
  more like a fixed wait (a timeout or a held server response) than a slow network; not proven.
- Readings: `screenshots/slow-r1-readings.tsv` (every reading's texts; screenshots `screenshots/slow-r1-t*.png`, local).
- Log excerpt: `logs/16.9.0.2611181_upload_log.txt` (URL, key and credit-detail lines removed). Full logs
  `logs/slow-upload-20261119-113618/` (local only).
- **Credits.** 29684 → 29680 (Pro tab 11:38): **4 credits**, the one task. Nothing bought.
- The task finished within ~1.5 min of the upload: going back from Recent task at ~11:37:40 showed the in-app
  「Good news! Your AI Video Enhance task has been completed. Tap here to view your results.」 (「View」 / 「Close」), closed
  with 「Close」.
- Phone left (11:38): PowerDirector on the Pro tab, cltqauiap2 **Pro** 29680, Stage, notifications on, Wi-Fi
  17F_QA_Wifi_5G, logcat capture stopped. Recent task holds the new 0:04 task from 11:35.
