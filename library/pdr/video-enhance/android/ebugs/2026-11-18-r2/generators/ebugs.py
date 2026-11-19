#!/usr/bin/env python3
"""Build the Video Enhance Android eBug drafts for round R2 (table v10, draft 20261117-105552) on 16.9.0 (2611091).

Adapted from ebugs/2026-11-11-r1b/generators/ebugs.py (2026-11-19). Writes
library/pdr/video-enhance/android/ebugs/2026-11-18-r2/20261119_eBug_drafts_Video-Enhance-R2_16.9.0.md, the sibling
_images/ folder (one NN_ISS-ID folder per entry) and logs/. ISS numbering continues after ISS-VEA-34 (R1 batches,
filed as DRA262611P0071 – P0101). New failures only (RUN-PLAN-20261118-R2 › At the end of R2): a failure an R1 ticket
already covers on Android is left off the drafts and kept in dedupe.txt (DEDUPE below, per OS, overlay rule 7); a
question a ruling or ticket answers is cited (CITED). Every Fail row and every observation is mapped; the script stops
when one is missing. Nothing is filed.
"""
import csv, os, re, shutil, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import logx

REPO = logx.REPO
ROOT = f"{REPO}/library/pdr/video-enhance/android"
RUN = logx.RUN
OUT = f"{ROOT}/ebugs/2026-11-18-r2"
NAME = "20261119_eBug_drafts_Video-Enhance-R2_16.9.0"
V, B, TR = "16.9.0", "2611181", "TR261118-0074"  # rechecked on 2611181 (TR261118-0074) 2026-11-19; R2 ran 2611091
B_RUN, TR_RUN = "2611091", "TR261109-0041"
RECHECK = f"{OUT}/recheck-2611181"
TAG = "AIAgent"
FEAT = "AI Video Enhance"
DEVICE = "Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15"
D18, D19 = "2026-11-18", "2026-11-19"
HDR = f"# PowerDirector Mobile for Android {V} ({B}), Stage server, Samsung SM-A5360 / Android 15 (phone time, UTC+8)"

DS_URL = "https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance"
PM_URL = "https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance"
DSB = {"ds-main-flow": ("Main Flow (Free user → IAP)", "3293-13054"), "ds-routing": ("Routing Logic", "3293-14560"),
       "ds-alt-exception": ("Alternative & Exception", "3293-15052"), "ds-ai-video-enhance": ("AI Video Enhance (settings)", "3300-32003")}
PMB = {"pm-main-flow": ("主線 - 選片到拿到成品", "369-438"), "pm-failure-refund": ("失敗與退款", "369-441"),
       "pm-draft-logic": ("Logic 補充 · 對齊 Design 26.09 v2 (9/29)", "405-1108")}


def ds(b, what=None, node=None):
    t, n = DSB[b]
    return f"Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), {t} board{(' ' + what) if what else ''} -\n{DS_URL}?node-id={node or n}"


def pm(b, what=None, node=None):
    t, n = PMB[b]
    return f"Spec Link: AI Video Enhance PM spec, {t} board{(' ' + what) if what else ''} -\n{PM_URL}?node-id={node or n}"


L1 = "Launch the APP"
OPEN = [L1, "Tap 「Video Enhance」 on the Launcher"]
R = lambda a, b: [f"TC-{n}" for n in range(a, b + 1)]
DRAG = ["TC-042", "TC-214", "TC-216", "TC-044", "TC-272"]  # TC-215 (the knob) is DRA262611P0208

# kind: "defect" (filed as a bug) or "pm" (an open question filed to PM for a decision).
# imgs: (path under the run folder without .png, slug)
E = [
 dict(iss="ISS-VEA-35", kind="defect", title="Play does nothing when the playhead sits at the end of the selection",
      cls="Functional", sev=2, owner="RD", cases=["TC-037", "O-8"], rep=(1, 1),
      short="Play does nothing when the playhead sits at the selection's end",
      note="New in R2 (R1 recorded TC-037 Pass without trimming first). R-027 (Design ds-main-flow VE · 02: the Preview's play button plays the video from the selection). ve-1230-1080p30 trimmed with the right handle to 02:00–04:01: the trim leaves the playhead at the selection end (「04:01/12:30」); play there does nothing for 2.4 s of readings and a screen recording (time stays 04:01, the icon never changes, the frame does not move). With the playhead dragged back to the selection start, play runs 02:00 → 02:03. The full-screen part of the row is DRA262611P0092 (not repeated). Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: selection 02:00–04:01 with the playhead at 04:01, play does nothing for 3 s (screen recording; logcat shows the decoder start and the TextureView frame rate drop back to 0 within ~0.14 s); positive control from the selection start plays 02:00 → 02:04. The Repro order is now left handle first, then right (moving the left handle last collapsed the selection on 2611181).",
      steps=OPEN + ["Tap a 12:30 1080p 30 fps video in Add Media", "Drag the left trim handle right to 02:00", "Drag the right trim handle left until 「Selected Length」 reads 「02:00」", "Tap play under the Preview", "Wait 3 seconds"],
      res="The playhead sits at the selection end (「04:01/12:30」) and play does nothing: time, frame and icon stay the same.",
      res_zh="修剪後播放頭停在選取範圍結尾，點播放沒有任何反應（時間、畫面、圖示都不變）。",
      exp="Play plays the video from the selection (R-027), e.g. from the selection start when the playhead is at its end.",
      exp_zh="點播放應從選取範圍內播放（例如播放頭在結尾時從選取起點開始）。",
      imgs=[("recheck/16.9.0.2611181_vea35_playhead_at_end_0401.jpg", "vea35_playhead_at_end"), ("recheck/16.9.0.2611181_vea35_play_no_change_after_3s.jpg", "vea35_play_no_change")],
      logfile="recheck/logs/16.9.0.2611181_vea35_log.txt",
      links=[ds("ds-main-flow", "(VE · 02: play under the Preview)")]),

 dict(iss="ISS-VEA-36", kind="defect", title="A 1 fps video opens the panel with no fps chip selected and all three disabled",
      cls="Functional", sev=2, owner="RD", cases=["TC-052"], rep=(1, 1),
      short="1 fps video opens with no fps chip selected and all fps chips disabled",
      note="Step 1 of TC-052 is new in table v10 (REQ-015; the Spec Agent saw the same). R-043 (Design ds-ai-video-enhance 預設值規則 + 對照表: source 1–30 fps → 「30fps」). ve-fps1-1080p (10 s, 1 fps): badge 「1fps · 1080p」 is right, but no fps chip is selected and 30fps / 60fps / 120fps are all drawn disabled; 「Enhance 20」, 「Charge 2 credits per second」. 24, 29 and 30 fps sources select 「30fps」 as specified. Related, not the same: DRA262611P0073 (badge 「0fps」 and chips disabled for stock and Timeline clips, where the fps is not read at all); here the fps is read correctly. No log line for the chip state.",
      steps=OPEN + ["Tap a 10 s 1080p video recorded at 1 fps in Add Media", "Look at the fps chips"],
      res="Badge 「1fps · 1080p」, but no fps chip is selected and 「30fps」, 「60fps」 and 「120fps」 are all disabled.",
      res_zh="1 fps 影片進入面板後沒有選中任何 fps，三個 fps 選項都反灰不可選。",
      exp="「30fps」 is selected and the chips are enabled as for any 1–30 fps source (R-043).",
      exp_zh="來源 1–30 fps 應預設選中 30fps，fps 選項可用。",
      imgs=[("screenshots/TC-052-s1", "vea36_1fps_no_chip"), ("screenshots/TC-052-s2", "vea36_24fps_30_selected")],
      links=[ds("ds-ai-video-enhance", "(預設值規則 + 對照表: 1–30 fps → 30fps)")]),

 dict(iss="ISS-VEA-37", kind="defect", title="With no video on the phone, Add Media shows the partial-access prompt although access to all media is granted",
      cls="Functional", sev=2, owner="RD", cases=["TC-023"], rep=(1, 1),
      short="Empty gallery: Add Media shows the partial-access prompt, not an empty state",
      note="Blocked in R1 (needs an empty gallery); run in R2-x with every video folder moved out of MediaStore (885 → 0 videos, restored after). R-016 (PM pm-draft-logic A2 [建議]: the empty state 「No videos yet」), quoted as the proposal. Whatever the copy, the screen is plainly wrong: PowerDirector holds full video access (READ_MEDIA_VIDEO granted, Android 15), yet Add Media shows the partial-access text and the album list only 「Downloaded 0」. A visible defect is filed even when the exact wording is a proposal (ebugs.md step 1). Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED with 887 → 0 videos (restored after): same text, albums only 「Downloaded」 0.",
      steps=[L1, "Allow PowerDirector access to all photos and videos", "Remove every video from the phone's gallery", "Tap 「Video Enhance」 on the Launcher", "Tap 「Try It Now」 on the Demo page"],
      res="No tiles; text 「To select photos and videos, add more media from the gallery or allow access to all media.」",
      res_zh="已允許存取全部媒體卻顯示部分存取提示，而非無影片的空狀態。",
      exp="An empty state for a phone with no videos (PM A2 proposal: 「No videos yet」; R-016), not the partial-access prompt.",
      exp_zh="應顯示無影片的空狀態（PM A2 提案「No videos yet」），而非部分存取提示。",
      imgs=[("recheck/16.9.0.2611181_vea37_partial_access_text.jpg", "vea37_partial_access_text"), ("recheck/16.9.0.2611181_vea37_albums_downloaded_0.jpg", "vea37_albums_downloaded_0")],
      links=[pm("pm-draft-logic", "(A2 [建議]: Add Media empty state 「No videos yet」)"), ds("ds-main-flow", "(Add Media)")]),

 dict(iss="ISS-VEA-38", kind="defect", title="With notifications off, no 「Turn on notifications」 dialog appears after the first upload",
      cls="Functional", sev=2, owner="RD", cases=["TC-118", "TC-119", "TC-120", "TC-211", "O-32"], rep=(2, 2),
      short="With notifications off, no 「Turn on notifications」 dialog after the upload",
      note="Blocked in R1 (system setting); run in R2-x after a pm clear with PowerDirector notifications turned off (permission revoked, channel off; user go-ahead 2026-11-18). R-093 (PM pm-main-flow §4.2 step 6 / §9 / §10.4, arrow 397-1241; PM-only, no Design frame yet): after the first upload the dialog 「Turn on notifications」 / 「We'll let you know when it's done.」 with 「Turn On」 / 「Later」. Two first-install tasks (04:40:12 and 04:42:55, ve-real-000320-720p30, −4 each): the upload ended, Recent task opened, and no dialog showed (also not in the 8 s after; no dialog in logcat). O-32: the app instead raised Android's own 「Allow PowerDirector to send you notifications?」 prompt once, when the first task finished (notify(2) at 04:42:22). TC-119, TC-120 and TC-211 (Turn On / Later) stay Blocked behind it. Notifications were turned back on afterwards. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 10:41–10:55, recheck-2611181/verdicts.md: CONFIRMED 2/2 on Pro (test subscription bought by the user), after a pm clear with notifications off (permission revoked, channel NONE): ve-real-000320-720p30, 「Enhance 4」, uploads 10:46:34 → 10:47:39 and 10:48:30 → 10:49:35, Recent task opened each time and no dialog in 14–15 s of readings or later (watched to 10:54). Android's own prompt showed once at first launch, before notifications were turned off, so O-32's prompt-after-the-task did not repeat; logcat shows the app still posting its done notifications, which Android blocks. Notifications turned back on after.",
      steps=[L1, "Turn off notifications for PowerDirector in Android Settings", "Tap 「Video Enhance」 on the Launcher", "Tap 「Try It Now」 on the Demo page", "Tap a 3 s 720p video in Add Media", "Tap 「Enhance」", "Wait until the upload finishes"],
      res="The upload finishes and Recent task opens; no 「Turn on notifications」 dialog appears, on the first task or the second.",
      res_zh="關閉通知後第一次上傳完成，未出現「Turn on notifications」對話框。",
      exp="After the upload, 「Turn on notifications」 with 「Turn On」 and 「Later」 appears (R-093).",
      exp_zh="上傳完成後應出現「Turn on notifications」對話框（Turn On / Later）。",
      imgs=[("recheck/16.9.0.2611181_vea38_panel_notifications_off.jpg", "vea38_panel_notifications_off"), ("recheck/16.9.0.2611181_vea38_no_dialog_recent_task_1.jpg", "vea38_no_dialog_recent_task_1"), ("recheck/16.9.0.2611181_vea38_no_dialog_recent_task_2.jpg", "vea38_no_dialog_recent_task_2")],
      logfile="recheck/logs/16.9.0.2611181_vea38_log.txt",
      links=[pm("pm-main-flow", "(§4.2 step 6 / §9, arrow 397-1241: notification prompt after the first upload)", "397-1241")]),

 dict(iss="ISS-VEA-39", kind="defect", title="A task that failed on the server shows the grey placeholder, not the 「Error」 thumbnail",
      cls="UI", sev=2, owner="RD", cases=["TC-170", "O-19"], rep=(1, 1),
      short="Failed task card shows the grey placeholder, not the 「Error」 thumbnail",
      note="Blocked in R1 (no fault switch on Android); a real server failure came in R2-f: TC-152's 01:30 task (ve-0130-1080p30, Enhance 17:40:35) uploaded for 70 min on a slow link (Upload to S3 17:41:15 → 200 at 18:51:22), then 「apply effect response code->401」 (18:51:22) and Recent task opened. R-140 (Design ds-alt-exception Generation Failed; ds-routing 失敗卡片; PM pm-failure-refund): an 「Error」 thumbnail and 「View Details」. The card has 「View Details」 and no Retry (right) but the thumbnail is the same grey placeholder the cancelled cards use (DRA262611P0083 is the cancelled card's length; not repeated). Reproduce 1/1: one real failure.",
      steps=OPEN + ["Tap a 1:30 1080p video in Add Media", "Tap 「Enhance」", "Wait until the task fails on the server", "Look at the task's card in Recent task"],
      res="The failed card shows a grey placeholder thumbnail (no 「Error」), 1:30 and 「View Details」.",
      res_zh="伺服器端失敗的任務卡片顯示灰色預設縮圖，沒有「Error」縮圖。",
      exp="The failed task's card shows the 「Error」 thumbnail and 「View Details」 (R-140).",
      exp_zh="失敗任務卡片應顯示「Error」縮圖與 View Details。",
      imgs=[("screenshots/TC-152-card", "vea39_failed_card_placeholder")],
      log=("Failed task: charge at the tap, 70-min upload, apply effect 401", [("TC-152 Enhance tap", D18, "17:40:30", "17:41:20"), ("TC-152 upload end and failure", D18, "18:51:15", "18:51:30")]),
      links=[ds("ds-alt-exception", "(Generation Failed: Recent card with the Error thumbnail)"), ds("ds-routing", "(失敗卡片)")]),

 dict(iss="ISS-VEA-40", kind="defect", title="「View Details」 on a failed task opens 「Need Help?」 instead of the error dialog that says the credits were refunded",
      cls="UI", sev=2, owner="RD", cases=["TC-171", "TC-210"], rep=(1, 1),
      short="Failed task's View Details opens 「Need Help?」, not the error dialog",
      note="Same real failure as ISS-VEA-39 (apply effect 401, 18:51:22). R-141 / R-191 (Design ds-alt-exception Recent dialog, flow arrow 3393-18071; PM pm-failure-refund arrow 377-1127): 「An Error Has Occurred」 / 「Credits have been refunded.」 / 「The server may be busy. Please try again later or use a different video.」 with 「OK」. The app opens a customer-service dialog instead; 「Not now」 closes it and Recent task stays (TC-210 Pass). 「Send Feedback」 was not tapped. Nothing in the app tells the user the credits come back (and they came back only 3 h 36 min later, ISS-VEA-41).",
      steps=OPEN + ["Tap the Recent task icon in the panel's top bar", "Tap 「View Details」 on the failed task's card"],
      res="A dialog 「Need Help?」 with 「Not now」 and 「Send Feedback」 opens; it says nothing about the credits.",
      res_zh="點失敗卡片的 View Details 開啟「Need Help?」客服對話框，而非錯誤說明與退款提示。",
      exp="The dialog 「An Error Has Occurred」 / 「Credits have been refunded.」 with 「OK」 opens (R-141).",
      exp_zh="應開啟「An Error Has Occurred」對話框，說明點數已退還，並有 OK 按鈕。",
      imgs=[("screenshots/TC-171-dialog", "vea40_need_help_dialog"), ("screenshots/TC-152-card", "vea40_failed_card")],
      log=("Failed task behind the card: apply effect 401", [("TC-152 upload end and failure", D18, "18:51:15", "18:51:30")]),
      links=[ds("ds-alt-exception", "(flow arrow 3393-18071: View Details → 「An Error Has Occurred」)", "3393-18071"), pm("pm-failure-refund", "(arrow 377-1127: failure dialog)", "377-1127")]),

 dict(iss="ISS-VEA-41", kind="defect", title="Credits of a task that failed come back only 3 h 19 – 3 h 36 min later, not at the failure",
      cls="Functional", sev=2, owner="RD", cases=["TC-173", "TC-112", "O-15", "O-23"], rep=(2, 2),
      short="Credits for a failed task are refunded only 3+ hours after the failure",
      note="R-142 (Design ds-routing 「生成失敗系統自動退還 credit」; PM pm-failure-refund §8.6) and KP-007 (team rule: a missing or wrong refund is a defect with its own eBug, even when the failure itself is filed). Two real failures in R2: (1) TC-152's task, −180 at the tap 17:40, failed 18:51:22 (apply effect 401); at 18:55 and 19:22 no refund row; 「Generation failed, credits returned +180」 at 21:16 (2 h 25 min after the failure, 3 h 36 min after the charge). (2) TC-112's 01:30 task, −180 at 13:21, upload 400 at 13:48; refund +180 at 16:40 (2 h 52 min after the failure, 3 h 19 min after the charge). The refunds have no app log line (server side). Related, different trigger: DRA262611P0079 / P0094 (Home or Leave during the upload charged, refunded ~3 h later). The failed-upload card of (2) (「25000:00:00」 with Retry) is DRA262611P0083's symptom and is not repeated.",
      steps=[L1, "Tap 「Pro」 on the Launcher", "Note the credit balance", "Tap 「Video Enhance」 on the Launcher", "Tap a 1:30 1080p video in Add Media", "Tap 「Enhance」", "Wait until the task fails on the server", "Tap 「Pro」 on the Launcher", "Tap 「Details」 under Credits"],
      res="The balance stays 180 lower, with only 「Video Enhancer -180」 in Credit Details; the refund came 2.5–3 h later.",
      res_zh="伺服器失敗後點數未立即退還，退款紀錄要 3 小時後才出現。",
      exp="The credits come back automatically when the task fails: balance restored, refund in the ledger (R-142).",
      exp_zh="任務失敗時應自動退還點數，餘額回復並出現退款紀錄。",
      imgs=[("screenshots/TC-173-ledger", "vea41_no_refund_after_failure"), ("screenshots/TC-112-ledger", "vea41_upload_failed_charge")],
      log=("Two failed tasks: charge at the tap and the failure (refunds are server-side, no app line)", [("TC-152 Enhance tap", D18, "17:40:30", "17:41:20"), ("TC-152 failure", D18, "18:51:15", "18:51:30"), ("TC-112 upload 400", D18, "13:47:50", "13:48:30")]),
      links=[ds("ds-routing", "(「生成失敗系統自動退還 credit」)"), pm("pm-failure-refund", "(§8.6 automatic refund)")]),

 # ---------------------------------------------------------------- open questions filed to PM for a decision
 dict(iss="ISS-VEA-42", kind="pm", title="While a trim handle is dragged, the Preview frame lags 0.4–1.5 s behind the handle (Q-27)",
      cls="Functional", ux=True, sev=2, owner="PM", cases=DRAG, rep=(5, 5),
      short="Preview frame freezes behind the trim handle while it is dragged",
      note="Q-27 (REQ-015): R-031 and R-193 (Design ds-ai-video-enhance Length; ds-main-flow VE · 01 knob) say the Preview shows the frame at the dragged handle or playhead, but no source says how closely it must keep up; table assumption: no visible lag (within ~0.5 s at 4 frames a second), a larger gap filed to PM. Judged from screen recordings of the whole drag on fixtures that burn their time into every frame (run-android.md › Judging a drag): the bubble, the Preview time, 「Selected Length」 and the CTA follow at once, but the frame stays on an older one: TC-042 right handle (frame 0 for 1.4 s while the handle went 07:43 → 06:15), TC-214 left handle (gap up to 1:26 for 1.5 s), TC-216 left handle to the cap (frame stuck for the whole 1.9 s drag), TC-044 right handle to the cap (stuck for 1.9 s), TC-272 (Standard 05:24 video, 1.35 s). The right frame shows 0.1–0.4 s after release. The playhead knob (TC-215, frame 0 for 2.1 s) is DRA262611P0208 (Android, Assigned, RD, build 2611161: 「Preview lags behind the double-arrow seek handle」), so it is not repeated here; that ticket is an RD defect, so the reviewer may set this card to RD to match it. In R1 these rows were judged from screenshots and passed; the recordings are what changed (and the rows' 「no visible lag」 check is new in table v10). Recordings stay in the run folder (no video attached, overlay rule 3).",
      steps=OPEN + ["Tap a 12:30 1080p 30 fps video in Add Media", "Drag the right trim handle slowly from 08:00 to 06:00", "Watch the Preview frame during the drag"],
      res="Time and length follow the handle at once, but the Preview frame stays on an older frame for up to 1.9 s.",
      res_zh="拖曳裁切把手時，預覽畫面停在舊畫面，放開後才跟上。",
      exp="PM to decide how closely the Preview must follow a drag (Q-27); the table assumes no visible lag (R-031, R-193).",
      exp_zh="請 PM 決定拖曳時預覽畫面可接受的延遲（Q-27）；目前假設不可有明顯延遲。",
      imgs=[("recordings/TC-042-sheet-1", "vea42_right_handle_frame_frozen"), ("recordings/TC-216-tcgrid", "vea42_left_handle_burned_in_times"), ("screenshots/TC-042-after", "vea42_after_release")],
      links=[ds("ds-ai-video-enhance", "(Length: the Preview shows the frame at the dragged handle)"), ds("ds-main-flow", "(VE · 01: playhead knob and bubble)")]),

 dict(iss="ISS-VEA-43", kind="pm", title="Picking a large local video opens the panel with no import overlay, percentage or 「Cancel」 (iOS-observed UI)",
      cls="Functional", ux=True, sev=2, owner="PM", cases=["TC-315"], rep=(1, 1),
      short="Picking a video opens the panel with no import overlay or 「Cancel」",
      note="R-205 has no Design or PM basis: it is the iOS UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-331, REQ-020); a finding with no spec basis is filed to PM for a decision (AGENTS.md 2026-11-11). Screen recording of the tap on ve-1230-1080p60 (12:30, 256 MB): the panel slides in within ~0.4 s, no overlay, percentage or 「Cancel」 in any frame. Android may simply not need an import step for a local file; PM to say whether Android should match iOS. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: the panel (「60fps · 1080p」) opens within ~0.4 s; no overlay, percentage or 「Cancel」 in the recording.",
      steps=OPEN + ["Tap 「Try It Now」 on the Demo page", "Tap a 12:30 1080p 60 fps video in Add Media", "Watch the screen until the panel opens"],
      res="The panel opens within about 0.4 s; no import overlay, percentage or 「Cancel」 shows.",
      res_zh="點選大檔影片後約 0.4 秒直接開啟面板，沒有匯入進度與 Cancel（iOS 有）。",
      exp="PM to decide whether Android shows iOS's import overlay with a percentage and 「Cancel」 (R-205).",
      exp_zh="請 PM 決定 Android 是否需要與 iOS 相同的匯入進度遮罩與 Cancel。",
      imgs=[("recheck/16.9.0.2611181_vea43_no_import_overlay_frames.jpg", "vea43_no_import_overlay_frames"), ("recheck/16.9.0.2611181_vea43_panel_open_60fps.jpg", "vea43_panel_open")],
      links=[ds("ds-main-flow", "(Add Media → panel: no import step drawn)")]),

 dict(iss="ISS-VEA-44", kind="pm", title="Add Media's sort offers Name / Date / Duration / Resolution / File size, not the iOS list (iOS-observed UI)",
      cls="Functional", ux=True, sev=2, owner="PM", cases=["TC-316", "O-10"], rep=(1, 1),
      short="Add Media sort keys differ from iOS (no Default or Modified Date)",
      note="R-206 has no Design or PM basis (the Design draws Add Media without a sort control): it is the iOS UI the spec agent's user approved on 2026-10-12 (spec agent TC-VE2-332, REQ-020). Android's 「Sort by」 offers 「Name」, 「Date」, 「Duration」, 「Resolution」, 「File size」 and both orders; closing it without a choice keeps the order (that part passes). O-10 (test note, not raised): the order rows carry the content-desc of the Name / Date keys. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED: same five keys and both orders (O-10 unchanged).",
      steps=OPEN + ["Tap 「Try It Now」 on the Demo page", "Tap the sort control in Add Media"],
      res="「Sort by」 offers 「Name」, 「Date」, 「Duration」, 「Resolution」, 「File size」 with 「Ascending」 / 「Descending」.",
      res_zh="Android 排序選項與 iOS 不同（沒有 Default 與 Modified Date）。",
      exp="PM to decide the Android sort keys; iOS shows 「Default」, 「Date」, 「Duration」, 「Modified Date」 (R-206).",
      exp_zh="請 PM 決定 Android 的排序選項是否需與 iOS 一致。",
      imgs=[("recheck/16.9.0.2611181_vea44_sort_keys.jpg", "vea44_sort_keys")],
      links=[ds("ds-main-flow", "(Add Media: no sort control drawn)")]),

 dict(iss="ISS-VEA-45", kind="pm", title="Empty Recent task reads 「No Generated Videos」 with 「Create another one」, not 「No results found」 (iOS-observed UI)",
      cls="UI", sev=2, owner="PM", cases=["TC-317"], rep=(1, 1),
      short="Empty Recent task reads 「No Generated Videos」, not 「No results found」",
      note="R-207 has no Design or PM basis (the Design draws no empty Recent task): it is the iOS UI the spec agent's user approved (spec agent TC-VE2-333, REQ-020). Text owner PM: the spec must supply the empty-state copy (text rule, 2026-11-11). Seen on the fresh install before any task. O-1 (not raised, for the report): the account's R1 tasks were not listed after the reinstall although the page says 「Tasks are stored on the cloud for 1 year」. Rechecked on 16.9.0.2611181 (TR261118-0074), 2026-11-19 09:17–09:28, recheck-2611181/verdicts.md: CONFIRMED after a pm clear and sign-in: empty Recent task, 「No Generated Videos」 and 「Create another one」 (O-1 again: the account's older tasks are not listed).",
      steps=OPEN + ["Tap 「Try It Now」 on the Demo page", "Tap a video in Add Media", "Tap the Recent task icon in the panel's top bar"],
      res="Recent task shows no card, 「No Generated Videos」 and the button 「Create another one」.",
      res_zh="無任務時顯示「No Generated Videos」，非 iOS 的「No results found」。",
      exp="PM to give the empty Recent task copy; iOS shows 「No results found」 (R-207).",
      exp_zh="請 PM 決定 Recent task 空狀態文案（iOS 為「No results found」）。",
      imgs=[("recheck/16.9.0.2611181_vea45_empty_recent_task.jpg", "vea45_empty_recent_task")],
      links=[ds("ds-main-flow", "(Recent task: no empty state drawn)")]),
]

# Dedupe re-run on the full Android pool (2026-11-19, 182 candidates; the first pass read 90, see ebug-tr-filer
# references/dedupe.md): two drafts are open same-OS tickets filed 2026-11-12 on 2611091, so they leave the drafts and
# the review page and go to DEDUPE below (overlay rule 7). Their text stays here for the record.
SAME_OS = {"ISS-VEA-36": "DRA262611P0115", "ISS-VEA-42": "DRA262611P0113"}
E_ALL = E
E = [e for e in E_ALL if e["iss"] not in SAME_OS]
# Recheck on 2611181 (2026-11-19, recheck-2611181/verdicts.md): only CONFIRMED items reach the review page
# (ebug-tr-filer › Verifying on the device). ISS-VEA-38 was confirmed at 10:41–10:55 once the user bought Pro; these three could not be re-exercised on the TR's build; held, not dropped.
HELD = {
 "ISS-VEA-39": "not re-verified on 2611181: R2's failed task card is gone (wiped by R2-x's pm clear) and Android has no fault switch to make a server failure",
 "ISS-VEA-40": "not re-verified on 2611181: same as ISS-VEA-39, no failed card to open 「View Details」 on",
 "ISS-VEA-41": "not re-verified on 2611181: needs a real server failure, 180 credits and a 3+ hour wait for the refund",
}
E_HELD = [e for e in E if e["iss"] in HELD]
E = [e for e in E if e["iss"] not in HELD]

# Questions answered by a ruling or ticket: cited, not filed.
CITED = [
 ("Q-18 backgrounding during the upload", ["TC-115", "O-18"], "DRA262611P0079",
  "Filed in R1 (PM). In R2 Home no longer ended the task: the upload went on in the background and the task finished (charged 30). The decision Q-18 asks for is that ticket's."),
 ("「Don't show again」 saved on ‹ (TC-013)", ["TC-013"], "DRA262611P0088 (Close)",
  "Android PM ticket from R1, closed on the same build 2611091 (the IF3 API gives no reason): read as PM accepting the app's behaviour; the row should follow the ruling (table update for the user)."),
 ("Save Result toast 「Saved to Gallery」 (R-122)", ["TC-152", "TC-223"] + R(219, 254), "DRA262611P0096 (Cancelled)",
  "Android PM ticket from R1, Cancelled on the same build: read as PM keeping 「Saved to Gallery」; 38 rows fail on it, so the table should take the ruling (user)."),
 ("「Select」 offers only Delete / what 「Manage」 opens (Q-8)", ["TC-144"], "DRA262611P0097 (Close)",
  "Android PM ticket from R1, closed on the same build: read as PM accepting Select with Delete only; the 「1 year」 / 「Select」 label stays DRA262611P0082 (open)."),
 ("Q-9 Back from Add Media", ["TC-021", "TC-201"], "DRA242410-0142",
  "Android ticket, Close (fixed 15.1.0): Back on the media picker opened with Try It Now goes to the Launcher on purpose (R1b withdrew ISS-VEA-17)."),
]

# Same-OS (Android) tickets that already cover an R2 failure: left off the drafts, kept in dedupe.txt (overlay rule 7).
DEDUPE = [
 (["TC-002"], "DRA262611P0071", "Launcher / AI Magic name 「Video Enhance」"),
 (["TC-011", "O-34"], "DRA262611P0086", "Demo page description is AI Reframe's text"),
 (["TC-022"], "DRA262611P0101", "8K converted to Full HD, 「0fps · 1080p」 (steps 1–3)"),
 (["TC-022", "TC-269"], "DRA262611P0089", "Under-1 s and MKV sources not greyed (TC-022 steps 4–5, TC-269 0.9 s)"),
 (["TC-033", "TC-259", "TC-215"], "DRA262611P0074", "No Preview time at rest"),
 (["TC-259", "TC-263", "TC-274", "O-9", "O-14"] + R(278, 313), "DRA262611P0075", "Shown lengths truncated while price and limit round up: 「02:30」 refused by Professional; a hand-set 「00:30」 / 「01:30」 priced 31 / 91 s (the 36 price-grid rows; the ticket's O-5b already records 「one second over the shown length」)"),
 (["TC-269", "TC-270"], "DRA262611P0076", "Exact-second files billed one extra second (padding, KF-001)"),
 (["TC-100"], "DRA262611P0077", "Offline Enhance shows nothing"),
 (["TC-110"], "DRA262611P0078", "Ring 0% then stalls"),
 (["TC-112"], "DRA262611P0083", "Failed / cancelled task card with a nonsense length (「25000:00:00」) and Retry, blank thumbnail"),
 (["TC-140", "TC-144"], "DRA262611P0082", "Recent task notice 「1 year」 / 「Select」"),
 (["TC-141", "TC-208"], "DRA262611P0081", "Recent task has no ‹; Back to the Launcher"),
 (["TC-265", "TC-266", "TC-267"] + R(219, 222) + R(224, 238), "DRA262611P0084", "Tasks far over 1.5–2.5× their length (R-204)"),
 (["TC-133"], "DRA262611P0095", "Notification copy is the banner's"),
 (["TC-045", "TC-264"], "DRA262611P0090", "Strip not re-laid to 2:30 in Professional"),
 (["TC-046", "TC-217"], "DRA262611P0087", "Handles meet, 「00:00」 under 1 s"),
 (["TC-043", "O-7"], "DRA262611P0091", "Dragging the selection moves the range against the finger"),
 (["TC-037"], "DRA262611P0092", "Full-screen preview: no close, restarts at 00:00 (steps 4–5)"),
 (["TC-044", "TC-216"], "DRA262611P0093", "Limit bubble covers the Preview time"),
 (["TC-161"], "DRA262611P0099", "Timeline clip over 8:00 opens capped at 08:00"),
 (["TC-162", "TC-165"], "DRA262611P0100", "Timeline result not pasted back; Add to Timeline makes a new project"),
 (["TC-215"], "DRA262611P0208", "Preview lags behind the double-arrow seek handle (knob); Android, Assigned, RD, filed 2026-11-17 on 2611161 by another tester"),
 (["O-2"], "DRA262611P0073", "「0fps」 badge for a non-album pick (Google Photos joins stock and Timeline sources, KF-008)"),
 (["TC-052"], "DRA262611P0115", "1 fps source: no fps chip selected, all disabled (was ISS-VEA-36; 「A 1fps source has no selectable output frame rate」, Assigned, RD, filed 2026-11-12 on 2611091)"),
 (DRAG, "DRA262611P0113", "Preview frame lags behind a dragged trim handle, Q-27 (was ISS-VEA-42; 「Clarification: allowed Preview delay while trimming」, Assigned, RD, filed 2026-11-12 on 2611091)"),
 (R(219, 254), "DRA262611P0116", "Credit Details names the debit 「Video Enhancer」, R-203 (Assigned, RD, filed 2026-11-12; replaces the citation of iOS DRI261895P0021)"),
 (["TC-259"], "DRA262611P0117", "Source total 「02:30」 for a 150.03 s video, not rounded up to 「02:31」 (Assigned, RD, filed 2026-11-12)"),
]

# Observations not raised (each with its reason)
OBS_NOT = [
 ("O-1", "R1's cloud tasks not listed after the reinstall (page says 「stored on the cloud for 1 year」)", "No row states it; a PM question for the report (named in ISS-VEA-45's note)."),
 ("O-3", "Congrats credits dialog; acknowledge 「Server error」 line", "As R1; Android has no 「You're all set」 (REQ-012 ruling)."),
 ("O-4", "100 fps source → 「120fps」 chip at the 30fps 720p rate", "As R-063 (the price grid passed on rates)."),
 ("O-5", "No ⓘ next to Selected Length while the whole video fits the limit", "No row states it; for the analysis."),
 ("O-6", "Professional ⓘ bubble 「Max 2.5 minutes. Drag to choose which part.」", "No row states the wording; for the analysis."),
 ("O-10", "Sort order rows carry the Name / Date content-desc", "Accessibility id note for the scripts (ISS-VEA-44 names it)."),
 ("O-11", "Left-handle cap bubble absent once ~0.3 s after release", "Shown on the retry and every push; not a finding."),
 ("O-12", "50-credit follow-up offer and 「Check Backup Protection」 dialog", "Not in the Video Enhance spec; for the analysis."),
 ("O-13", "My Credits opens from the credit pill with a full balance", "Route note."),
 ("O-16", "System Back on Recent task showed the AI Mini Drama intro page", "Another feature's promotion page; not this feature."),
 ("O-17", "Pro test subscription lapsed ~13:54", "Environment (KP-068)."),
 ("O-20", "Processing card turned complete in place (contradicts KF-004)", "Knowledge correction, not a finding."),
 ("O-21", "Android Recents snapshot drew ‹ and ⌂", "Snapshot only; the live page has ⌂ only (DRA262611P0081)."),
 ("O-22", "65 s per MB upload on both Wi-Fi networks", "Environment (server upload path); behind the slow tasks."),
 ("O-24", "Stray −4 task from an agent batch error", "Agent error, not a result."),
 ("O-25", "After local midnight Credit Details shows no 2026-11 group", "Held: recheck in daytime and across a month boundary before filing (O-31 repeats it)."),
 ("O-26", "Pro lapsed again by 02:09", "Environment (KP-068)."),
 ("O-27", "4K 120 fps result black for 5 s on the first ▶", "Played on recheck; not a finding unless it repeats."),
 ("O-28", "Play test sheet renews every 30 min", "Environment (KP-068)."),
 ("O-29", "00:30 1080p Timeline uploads took 23–24 min", "Environment (upload path)."),
 ("O-30", "Timeline panel prices a 00:30 clip at 30 s (no +1 padding)", "Knowledge question for KF-001, not a failure."),
 ("O-31", "Credit Details still without a 2026-11 group at 04:26", "Held with O-25."),
 ("O-33", "Sign-in after pm clear: marketing box ticked by default; +30 Loyalty bonus", "Account flow, not this feature."),
]
OBS_ALL = [f"O-{i}" for i in range(1, 35)]


def jpg(src, dst):
    subprocess.run(["sips", "-Z", "1400", "-s", "format", "jpeg", "-s", "formatOptions", "80", src, "--out", dst],
                   check=True, capture_output=True)


def build_map():
    m = {}
    for n, e in enumerate(E, 1):
        for c in e["cases"]:
            m.setdefault(c, []).append(f"{n}. {e['iss']}" + (" (PM decision)" if e["kind"] == "pm" else ""))
    for e in E_HELD:
        for c in e["cases"]:
            m.setdefault(c, []).append(f"held {e['iss']} (not re-verified on {B})")
    for cases, code, what in DEDUPE:
        for c in cases:
            m.setdefault(c, []).append(f"dedupe {code}")
    for title, items, code, _ in CITED:
        for c in items:
            m.setdefault(c, []).append(f"cited {code}")
    for k, _, why in OBS_NOT:
        m.setdefault(k, []).append("not raised")
    return {k: "; ".join(dict.fromkeys(v)) for k, v in m.items()}


def main():
    rows = list(csv.DictReader(open(f"{RUN}/results.csv", encoding="utf-8-sig")))
    last = {}
    for r in rows:
        last[r["ID"]] = r
    rows = list(last.values())
    tally = {}
    for r in rows:
        tally[r["Result"]] = tally.get(r["Result"], 0) + 1
    fails = [r["ID"] for r in rows if r["Result"] == "Fail"]
    disp = {r["ID"]: r["Disposition"] for r in rows}
    blocked = [r for r in rows if r["Result"] == "Blocked"]
    obs_file = open(f"{RUN}/observations.md", encoding="utf-8").read()
    obs = [o for o in OBS_ALL if re.search(rf"^- \*\*{o} ", obs_file, re.M)]
    if len(obs) != len(OBS_ALL):
        sys.exit(f"observations found: {obs}")
    MAP = build_map()
    missing = [k for k in fails + obs if k not in MAP]
    if missing:
        sys.exit(f"reconciliation incomplete: missing {missing}")
    q_unfiled = [k for k in fails if disp[k] == "question" and not re.search(r"PM decision|cited |dedupe ", MAP[k])]
    if q_unfiled:
        sys.exit(f"Fail (question) rows with no PM card, citation or ticket: {q_unfiled}")

    img_root = f"{OUT}/{NAME}_images"
    if os.path.isdir(img_root):
        shutil.rmtree(img_root)
    os.makedirs(img_root)
    os.makedirs(f"{OUT}/logs", exist_ok=True)
    L = []
    w = L.append
    nd = sum(1 for e in E if e["kind"] == "defect")
    npm = len(E) - nd
    w(f"# AI Video Enhance (Android) — eBug drafts, round R2 (table v10), PDR-A {V} build {B} (rechecked; R2 ran {B_RUN})")
    w("")
    w(f"**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-18-r2-full/` — round R2 of draft `drafts/20261117-105552` (table v10, {len(rows)} cases), 2026-11-18 09:21 → 2026-11-19 04:46 on {DEVICE[8:]}, build {B_RUN}, {TR_RUN} (SR DRA261109-01), Stage server, account cltqauiap2@gmail.com, fresh install. Tally: " + ", ".join(f"{v} {k}" for k, v in tally.items()) + ".")
    w("")
    w("**Status:** nothing filed, uploaded or commented. New failures only: R1's filed DRA262611P0071 – P0101 and the Android tickets DRA262611P0113 – P0117 (filed 2026-11-12 on 2611091) are not repeated; an R2 failure one of them covers on Android is kept only in `dedupe.txt` (per OS, overlay rule 7). The review page prefills the filing account from the newest filed batch (`ebug-defaults.ts pdr/video-enhance android`).")
    w("")
    w(f"**Recheck on the TR's build:** every draft was re-exercised on {V}.{B} ({TR}, the build to file on) on 2026-11-19 09:17–09:28 (`recheck-2611181/verdicts.md`). {len(E)} reproduced and stay as drafts with 2611181 evidence; {len(E_HELD)} could not be re-exercised and are held (below), not filed and not dropped.")
    w("")
    w("Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link on its own line and an image on every entry, the logcat excerpt on every failure- or charge-related one, no video). Owner and type: defects RD (Functional or [UI]); open questions and findings with no spec basis to PM, [UX] for a user-experience problem, [UI] for text (AGENTS.md 2026-11-11). Every severity is proposed as 2, as the user decided for the R1 batches.")
    w("")
    w(f"**What is drafted:** {len(E)} entries: {nd} defects (entries 1–{nd}) and {npm} open questions filed to PM (entries {nd + 1}–{len(E)}). {len(DEDUPE)} Android tickets cover the other failures (dedupe.txt); {len(CITED)} questions are cited.")
    w("")
    w("Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.")
    w("")
    for n, e in enumerate(E, 1):
        folder = f"{n:02d}_{e['iss']}"
        os.makedirs(f"{img_root}/{folder}")
        names = []
        for png, slug in e["imgs"]:
            src = f"{RECHECK}/{png[8:]}" if png.startswith("recheck/") else f"{RUN}/{png}.png"
            if not os.path.exists(src):
                sys.exit(f"missing screenshot {src}")
            name = f"{V}_{slug}.jpg"
            jpg(src, f"{img_root}/{folder}/{name}")
            names.append(name)
        if e.get("logfile"):
            p = f"{RECHECK}/{e['logfile'][8:]}"
            ln = f"{V}_vea{e['iss'][-2:]}_log.txt"
            shutil.copy(p, f"{img_root}/{folder}/{ln}")
            names.append(ln)
        if e.get("log"):
            title, secs = e["log"]
            p = logx.excerpt(f"{OUT}/logs/{V}_vea{e['iss'][-2:]}_log.txt", f"{e['iss']} {title}", HDR, secs)
            shutil.copy(p, f"{img_root}/{folder}/")
            names.append(os.path.basename(p))
        tagtype = "" if e["cls"] == "Functional" else f"[{e['cls']}]"
        short = f"PDR-A {V} - [{TAG}]{tagtype} {FEAT}: {e['short']}"
        if len(short) > 125:
            sys.exit(f"{e['iss']} short description {len(short)} > 125")
        for s in e["steps"]:
            if ">" in s or "›" in s:
                sys.exit(f"{e['iss']} step has a chain: {s}")
        w("---"); w("")
        w(f"## {n}. {e['iss']} — {e['title']}  ·  Class: {e['cls']}  ·  Severity: S{e['sev']}  ·  Owner: {e['owner']}")
        w("")
        w(f"**Report step:** {', '.join(e['cases'])}  ·  **Reproduce:** {e['rep'][0]}/{e['rep'][1]}  ·  **Verified on:** {V}.{B}")
        w("")
        kind = "**Open question filed to PM for a decision.** " if e["kind"] == "pm" else ""
        if e.get("ux"):
            kind += "**Proposed Type UX** (a PM decision on a user-experience problem, AGENTS.md 2026-11-11): drafted as Functional so the format checks pass; choosing Type UX on the review page adds [UX] at filing. "
        w(f"> **QA note — not pasted into eBug.** {kind}{e['note']}")
        w("")
        w("**Short Description:**"); w(""); w("```"); w(short); w("```"); w("")
        w("**Description:**"); w(""); w("```"); w("Repro Steps:")
        for i, s in enumerate(e["steps"], 1):
            w(f"{i}. {s}")
        w(f"{len(e['steps']) + 1}. Check the result")
        w(""); w("Result:"); w(e["res"]); w(f"摘要：{e['res_zh']}"); w(" ".join("{" + x + "}" for x in names))
        w(""); w("Expect Result:"); w(e["exp"]); w(f"摘要：{e['exp_zh']}")
        w(""); w("Note:"); w(DEVICE)
        if e.get("basis"):
            w(e["basis"])
        for l in e["links"]:
            w(l)
        w("<Claude Reviewed>"); w("```"); w("")
        w(f"**Images:** `{NAME}_images/{folder}/`"); w("")

    w("---"); w("")
    w(f"## Held — not re-verified on {V}.{B} (not drafted for filing)")
    w("")
    w("Found on 2611091 in R2 (text kept in the generator); they go back to the drafts once rechecked on the TR's build.")
    w("")
    w("| ISS | Finding | Rows | Why held |")
    w("|---|---|---|---|")
    for e in E_HELD:
        w(f"| {e['iss']} | {e['title']} | {', '.join(e['cases'])} | {HELD[e['iss']]} |")
    w("")
    w("## Already filed on Android (dedupe.txt only, not drafted)")
    w("")
    w("| Ticket | Finding | R2 rows / observations |")
    w("|---|---|---|")
    for cases, code, what in DEDUPE:
        cs = f"{cases[0]} … {cases[-1]} ({len(cases)})" if len(cases) > 8 else ", ".join(cases)
        w(f"| {code} | {what} | {cs} |")
    w("")
    w("## Cited instead of filed")
    w("")
    w("| Question | Rows | Answered by | Why not filed |")
    w("|---|---|---|---|")
    for title, items, code, why in CITED:
        its = f"{items[0]} – {items[-1]} ({len(items)} rows)" if len(items) > 5 else ", ".join(items)
        w(f"| {title} | {its} | {code} | {why} |")
    w("")
    w("## Not raised (observations, for the record)")
    w("")
    w("| Item | What was seen | Why not raised |")
    w("|---|---|---|")
    for k, a, b in OBS_NOT:
        w(f"| {k} | {a} | {b} |")
    bd = {}
    for r in blocked:
        bd[r["Disposition"]] = bd.get(r["Disposition"], 0) + 1
    w(f"| Blocked ({len(blocked)}) | " + ", ".join(f"{v} {k}" for k, v in sorted(bd.items())) + " | No verdict; TC-119 / TC-120 / TC-211 wait behind ISS-VEA-38. |")
    w("")
    w("## Reconciliation against the run")
    w("")
    nq = sum(1 for f in fails if disp[f] == "question")
    w(f"{len(fails)} Fail ({len(fails) - nq} defect, {nq} question), {len(blocked)} Blocked, {len(obs)} observations (O-1 … O-{len(obs)}). Each maps to an entry here, an R1 ticket (dedupe), a citation, or not raised; a row may map to several.")
    w("")
    w("### Row-by-row map")
    w("")
    w("| Item | Result | Disposition | Became |")
    w("|---|---|---|---|")
    for k in fails:
        w(f"| {k} | Fail | {disp[k]} | {MAP[k]} |")
    for r in blocked:
        if r["ID"] in MAP:
            w(f"| {r['ID']} | Blocked | {r['Disposition']} | {MAP[r['ID']]} |")
    for k in obs:
        w(f"| {k} | observation | — | {MAP[k]} |")
    w("")
    w("### Owner split")
    w("")
    w("| Owner | Entries |")
    w("|---|---|")
    for o in ("RD", "PM"):
        w(f"| {o} | " + (", ".join(str(i) for i, e in enumerate(E, 1) if e["owner"] == o) or "—") + " |")
    w("")
    w("### Filing order")
    w("")
    w("Defects first (" + ", ".join(f"**{i}**" for i, e in enumerate(E, 1) if e["kind"] == "defect") + "), then the PM decisions (" + ", ".join(f"**{i}**" for i, e in enumerate(E, 1) if e["kind"] == "pm") + "). Nothing is filed until the review page's decisions come back.")
    w("")
    open(f"{OUT}/{NAME}.md", "w", encoding="utf-8").write("\n".join(L))
    # dedupe.txt: same-OS matches kept for traceability only
    D = ["# Dedupe per OS (user, 2026-10-28): same-OS matches are left off the drafts and the review page.",
         "# R2 failures already covered by the Android tickets filed from R1 (DRA262611P0071 – P0101), on 2026-11-12 (P0113 – P0117) or another Android ticket.",
         "# The ECL pool candidates for the new entries are in dedupe-query.txt.", ""]
    for cases, code, what in DEDUPE:
        D.append(f"{code}\t{what}\t{', '.join(cases)}")
    D += ["", "# Pool re-read 2026-11-19 (dedupe-query.txt): product PowerDirector Mobile for Android, terms 「AI Video Enhance」 and",
          "# 「Video Enhance」, 182 candidates (the first pass searched only 「AI Video Enhance」: 90, and ranked P0113 / P0115 under the cut).",
          "# Every open 16.9.0 ticket (33) was read against every draft. Judged:",
          "# ISS-VEA-36 1 fps chips = DRA262611P0115 (open, RD): same fixture class, same symptom. Left off the drafts (above).",
          "# ISS-VEA-42 trim-handle drag lag = DRA262611P0113 (open, RD): trim endpoint at 00:09 while the Preview stays at 0. Left off (above).",
          "# Credit Details 「Video Enhancer」 (TC-219 – TC-254) = DRA262611P0116 (open, RD); was cited to iOS DRI261895P0021. Moved above.",
          "# TC-259 source total 02:30 = DRA262611P0117 (open, RD), beside P0074 / P0075. Added above.",
          "# DRA262611P0114 (credit-pack purchase returns to My Credits, open): no R2 failure; TC-097 (500-credit pack) passed. No draft affected.",
          "# ISS-VEA-41 late refund: DRA262611P0079 / P0094 (open) are Home / Leave during the upload, refunded ~3 h later; a failed task is a different trigger. Not duplicates; named as related.",
          "# ISS-VEA-38 notification dialog: DRA252503-0299 / DRA262604-0102 (closed) are the upload dialog. Not duplicates.",
          "# ISS-VEA-39 / 40: DRA262604-0094 (closed, same failed task twice), DRA242410-0021 (closed, no View details button), DRA262611P0083 (open, cancelled card length). Not duplicates.",
          "# ISS-VEA-45 empty Recent task: DRA262611P0082 (open, notice label), DRA262603-0102 / DRA242411-0023 / DRA242410-0074 (closed). Not duplicates.",
          "# ISS-VEA-35, 37, 43, 44: no candidate (P0080, P0085, P0098 and the rest are other symptoms).",
          "# Closed same-OS PM tickets on the same build (P0088, P0096, P0097) are cited as rulings in the drafts, not re-filed."]
    open(f"{OUT}/dedupe.txt", "w", encoding="utf-8").write("\n".join(D) + "\n")
    print(f"wrote {len(E)} entries ({nd} defects, {npm} PM) → {OUT}/{NAME}.md")
    return MAP, fails


if __name__ == "__main__":
    main()
