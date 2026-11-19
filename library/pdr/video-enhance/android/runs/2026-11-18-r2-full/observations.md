# Observations — R2 (Android v10, 16.9.0 / 2611091)

- **O-1 (closest TC-317, R2-a 09:43).** After the fresh install, Recent task is empty (「No Generated Videos」) although
  cltqauiap2 ran many Video Enhance tasks in R1 (2026-11-10/11) and the page says 「Tasks are stored on the cloud for 1
  year」: the list is local to the install, the cloud tasks are not listed again. Evidence screenshots/TC-317.png. Whether
  a reinstall should bring the cloud tasks back is a PM question (not filed in a run).
- **O-2 (closest TC-255, R2-a 09:57).** A local video picked through the Google Photos tab (system 「Select a video」 picker,
  casebook-ve, 00:10 720p 30 fps file) opens the panel with the badge 「0fps · 722p」 and the fps chips disabled, while
  the same kind of file from the album chooser reads 「30fps · 722p」 (KF-008 lists stock and Timeline sources; Google
  Photos picks join them). Evidence screenshots/TC-255-photos-pick.png.
- **O-3 (closest TC-095, R2-i 10:24–10:25).** After the Pro test purchase from the Video Enhance panel, the first return to
  the Launcher showed a 「Use credits to enjoy AI features / Congrats! 100 monthly credits have been added with your Pro
  subscription / See how credits work / Create with AI」 dialog (closed with system Back); the Mine tab became 「Pro」
  (VIP). Logcat at the purchase: `acknowledgePurchaseResponse 0` then `acknowledgePurchaseResponse 2 Server error, please
  try again.` beside `doVerifySubscribe status=OK` (as R1; no visible effect). Evidence screenshots/r2i-credits-dialog.png,
  logs/R2-i-20261118-102559/by-case/TC-095.txt.
- **O-4 (closest TC-270, R2-b 10:40).** The 100 fps sources (ve-075999-720p100, ve-080001-720p100) open with badge
  「100fps · 720p」, the 「120fps」 chip preselected and 「Charge 1 credits per second」 (「Enhance ◆ 480」 for 8:00), the
  same rate as 30fps 720p. Whether 120fps should cost more is for the price-grid rows (R2-d2). Evidence
  screenshots/TC-270-s9.png, TC-270-s11.png.
- **O-5 (closest TC-259, R2-b 10:31).** With the whole video selected (02:30 and 01:30 sources) the panel draws no ⓘ next to
  「Selected Length」; it appears once the source is longer than the Mode limit (12:30, 08:00). Not a row's expectation;
  the Design draws the ⓘ on the default state. Evidence screenshots/TC-259-pre.png, TC-041.png.
- **O-6 (closest TC-203, R2-b 10:35).** In Professional the 「Selected Length」 ⓘ bubble reads 「Max 2.5 minutes. Drag to
  choose which part.」 (Standard: 「Max 8 minutes. …」); no row states the Professional wording. Evidence
  screenshots/TC-203-bubble.png.
- **O-7 (closest TC-043 / TC-271, R2-b 10:44–10:46).** Dragging the middle of the selection moves the range with the
  finger when the video fits the strip (05:24, 08:01: the frame slides over the strip) but against the finger when the
  strip is longer than the width (12:30: the frame stays and the strip scrolls). DRA262611P0091 describes only the
  second case.
- **O-8 (closest TC-037, R2-b 10:33).** Play with the playhead at the selection end (where a right-handle trim leaves it)
  does nothing: the time and the icon do not change (recordings/TC-037-play.mp4). Recorded in TC-037's result.
- **O-9 (closest TC-273 / TC-274, R2-c 12:20–12:30).** After a hand drag the Preview time and the handle bubble can read
  one second below the burned-in frame shown at the handle (「04:58」 over frame 00:04:59.000 #8970, 「07:28」 over
  00:07:29.000 #13470): the handle sits a fraction before the frame and the label truncates. A hand-trimmed selection
  whose handle frames are exactly 140 s apart (00:29.867 – 02:49.867) is priced 141, so the price follows the handle
  position, not the frames shown. Not filed (same truncation family as DRA262611P0075).
- **O-10 (closest TC-052, R2-c 12:05).** Add Media's sort sheet gives 「Ascending」 the content-desc
  `[AID]Filter_Name` and 「Descending」 `[AID]Filter_Date` (resource ids `order_asc` / `order_des`), the same as the
  Name and Date sort keys, so an accessibility id cannot tell them apart. Add Media was sorted by Name for picking in
  R2-c and set back to Date / Descending (both checked) at the end.
- **O-11 (closest TC-074, R2-c).** The left-handle cap bubble (「Up to 8 minutes in Standard mode」) was absent from the
  page text ~0.3 s after one release (TC-273 step 2, first try) but present on the recorded retry and on every
  right-handle push; it shows at the cap and stays a while, then goes. Not a finding.
- **O-12 (closest TC-097, R2-d 12:45).** After the 500-credit test purchase the follow-up offer read 「Want to get 50
  Credits, too?」 「Get credits for advanced AI features」 with 「NT$170.00」 and 「Not now」 (the row and the Spec Agent
  name a 100-credit offer); 「Not now」 then showed a 「Check Backup Protection」 dialog over My Credits (「Make sure
  your device backup is enabled to keep your credits safe…」, 「Don't show again」 unticked, 「Back up now」, 「Later」;
  「Later」 tapped). Neither is in the Video Enhance spec; recorded for the analysis.
- **O-13 (closest TC-097, R2-d 12:46).** The Credit page (My Credits) opens from the panel's credit pill with a full
  balance (30294), so Buy More is reachable without a low balance. Its 「Claim」 for the complimentary daily credits
  was left untouched (TC-098 stays parked).
- **O-14 (closest TC-278 – TC-313, R2-d2 13:00).** On ve-1230-1080p30 in Standard (strip ~0.587 s per pixel) the right
  handle released at x 211 reads 「00:29」 and prices 30 s (60 at 2/s), at 212 「00:30」 and 31 s (62). Released at
  sub-pixel positions through adb `input motionevent` (211.01 → 「00:29」 60, 211.02 → 「00:30」 62; 211.05 – 211.8 the
  same 62), the step from 29.x to 30.x s is crossed within 0.01 px (~6 ms) with no position that reads 「00:30」 and
  prices 30 s. So every hand-set 「00:30」 / 「01:30」 is 30.x / 90.x s and the CTA shows rate × 31 / × 91 (R-060 rounds
  up, the label truncates): the price grid's 30 s and 90 s figures cannot be reached; the caps (08:00, 02:30) are exact.
  Same family as DRA262611P0075 and O-9.
- **O-15 (closest TC-112 / TC-110, R2-e 13:22–13:52).** Uploads ran very slowly on 17F_QA_Wifi_5G (link 13 Mbps,
  RSSI −58, ping 17–180 ms): the 92.5 MB ve-real-0130 upload took 25.7 min and ended 「upload response code->400」
  (presigned URL valid 3600 s, so not expired), a ~1 MB clip took 137 s, the gopro clip 19 min (17:08–17:27); R1 did
  the 01:30 clip in 9.5 min and a 3 s clip in ~5 s. The failed task shows in Recent task as 「25000:00:00 / Retry」
  with a blank thumbnail (a Leave-cancelled one as 「3961:06:40」, R1 O-11); its −180 came back as 「Generation
  failed, credits returned +180」 at 16:40, 3 h 19 min later (KF-003).
- **O-16 (closest TC-130, R2-e 13:56).** System Back on Recent task did not land on the Launcher but on a full-screen
  「AI Mini Drama / Turn your ideas and characters into captivating mini dramas. / Continue」 intro page, which hid the
  Launcher (and its 「Good news!」 banner) until its ✕ was tapped.
- **O-17 (closest TC-114 / TC-121, R2-e 13:54).** The Pro test subscription (bought 10:24) lapsed at ~13:54: logcat
  `updateSubscribingStatus: false` from 13:54:54 and Credit Details 「Monthly Credit Bonus (for Pro Subscribers) -12 /
  2026/11/18 13:54」 (the unused monthly bonus taken back). Mine still read 「Pro」 and the panel still let a Standard
  task start at 13:55:16 until a relaunch (14:07) showed 「Free / Claim offer」. The Play sheet reads 「NT$1,190.00/30
  min」 (test subscriptions renew every 30 min and end after a few renewals, KP-068). Re-bought 17:04:26 (「Test card,
  always approves」 / 「This is a test subscription… You will not be charged.」, no password): a sheet left open over
  the 3 h pause failed first (billing responseCode 6, app dialog 「Error / Server error」), a fresh one went through;
  「Monthly Credit Bonus +100 / 17:04」.
- **O-18 (closest TC-115, R2-e 17:08).** Home during 「Video uploading...」 did not cancel the task: transcode and S3
  upload went on in the background and the task completed (contrast R1, where the background call failed).
- **O-19 (closest TC-152 / TC-170, R2-f 17:40–18:51).** The 22.8 MB ve-0130-1080p30 upload (after a 38 s transcode)
  took 70 min on 17F_QA_Wifi_5G (Upload to S3 17:41:15 → 200 at 18:51:22, ~5 KB/s); the very next call 「apply effect
  response code->401」 failed the task (likely an auth token that expired during the upload). The card shows a grey
  placeholder, 1:30 and 「View Details」 (dialog 「Need Help?」, TC-171); −180 charged at the tap (17:40) not refunded
  by 19:22. Small uploads were slow too: 465 KB in 64 s, 4.4 MB in 10 min.
- **O-20 (closest TC-143 / TC-265, R2-f 19:00, 19:13). Contradicts KF-004.** Staying on Recent task, a processing
  card turned completed in place twice (19:00:34, 19:13:46) without reopening the page or tapping a card; 「View」
  worked on the first tap each time.
- **O-21 (closest TC-141, R2-f 19:20).** Android Recents' snapshot of Recent task showed a ‹ at the top left and ⌂ at
  the top right, while the live page (before and after) draws only ⌂ at the top left (btnBack). Snapshot only; not a
  finding until seen live (TC-268-recents3.png).
- **O-22 (closest TC-223 – TC-237, R2-g1 22:08–).** Every 3.2 s 720p upload (ve-real-000320-720p30, 1.0 MB source,
  1.4 s transcode) took 65 s in 「Upload to S3」 (ring at 100% for ~40 s of it) on both 17F_QA_Wifi_5G (RSSI −60,
  175 Mbps link) and the saved 17F-QAAPP-2.4G (RSSI −43; switched 22:20 for TC-224, no faster, switched back 22:27);
  phone ping to 8.8.8.8 16 ms. The slow leg is not the phone's Wi-Fi (same 65 s on both networks); R2-e/R2-f's slow
  big uploads (O-15, O-19) are probably the same upload path.
- **O-23 (R2-g1 start 22:02).** The Pro test subscription re-bought 17:04 had lapsed by 20:34 (「Monthly Credit Bonus
  (for Pro Subscribers) −3 / 20:34」, Mine 「Free」 「Claim offer」, no paywall at launch this time; KP-068). Re-bought
  22:06:10 from My Credits › 「Subscribe Now」 › 「Continue」 on the Google Play test sheet (「Test card, always
  approves」, 「This is a test subscription… You will not be charged.」, no password); 「Monthly Credit Bonus +100 /
  22:06」, 30800 → 30900. After the re-buy the Launcher's last tab reads 「Pro」 (VIP icon) instead of 「Mine」.
  Refunds arrived late: 「Generation failed, credits returned +30 / 20:16」 for TC-113's Leave (−30 17:07, ~3 h 9 min,
  as KF-003) and 「+180 / 21:16」 for TC-152's failed ve-0130 task (−180 17:40, ~3 h 36 min; TC-173 was judged at 19:22).
- **O-24 (agent error, R2-g1 22:32).** A malformed batch call opened the panel with TC-221 named as the case and tapped
  Enhance on the defaults (Standard / Natural / 30fps / 720p): one extra task, −4 at 22:32, completed 22:35; not a row
  result. TC-221 ran again properly afterwards; its log window starts at the later case mark.
- **O-25 (closest TC-238 – TC-254 last step, R2-g2 00:04–02:10).** After local midnight (2026-11-19, UTC+8; the server's
  createTime still 2026-11-18 UTC) Mine › Credits › Details opened on a 「2026-10」 group with no 2026-11 group at all,
  also after a force-stop and relaunch (02:10, R2-g2-ledger-relaunch.png), while the screen's own server reply
  (logcat `getCreditHistory … GGetMemberUsageResponse`) listed this run's VideoEnhanceV2 charges first. Before
  midnight (23:46, 23:53) the same screen showed them. Looks like the month grouping drops the current month when local
  and UTC dates differ; recheck in daytime and across a month boundary before filing (closest TC-150-family ledger rows).
- **O-26 (R2-g2 02:09).** The Pro test subscription re-bought 22:06:10 read Pro at 02:08 (Pro tab, TC-254) and
  「Free」 「Claim offer」 after the 02:09 relaunch; the panel shows 「Unlock Pro to Enhance」 (KP-068, ~4 h this time).
  Not re-bought: R2-g2 was done. R2-h needs Pro again (approved re-buy on the Play test sheet).
- **O-27 (closest TC-254, R2-g2 02:08).** The 4K 120 fps Professional result (the largest, 384 frames) stayed black
  with the play head at 0 for 5 s after ▶ on the Result screen right after Done; rechecked 02:16 from Recent task ›
  View it played to 00:03/00:03. Every other 4K result played in the run. A slow first load, not a finding unless it
  repeats.
- **O-28 (R2-h 02:19, re-buy).** The Play test sheet for the yearly plan reads 「NT$1,190.00/30 min」 and 「This is a
  test subscription. It will recur according to this schedule.」: the test subscription renews every 30 minutes, which
  explains the lapses within hours (KP-068, O-17, O-26). Re-bought 02:20:15 from the panel's 「Unlock Pro to Enhance」 ›
  「PowerDirector Pro」 › Continue › Subscribe (test card, no password); Mine Pro at 02:22 and 04:27.
- **O-29 (R2-h, uploads).** Each 00:30 1080p Timeline upload (ve-0030-1080p30, 7.6 MB) took 23–24 min (02:32–02:55,
  03:00–03:24, 03:29–03:52, 03:57–04:20), ~3 min per MB, slower than R2-g1's 65 s per MB (O-22). Processing after the
  upload was 2–4 min (Good news at +3.4, +3.9, +2.2, +4.2 min).
- **O-30 (R2-h, Timeline panel).** Opening AI Video Enhance from the clip toolbar prices a 00:30 Timeline clip
  (ve-0030-1080p30) at 60 = 30 s × 2, not 31 × 2 as KF-001's padding rule gives for Add Media (R1's ve-0030-720p30 read
  「Enhance ◆ 31」 at 1/s): the Timeline path may bill the clip's own length. Also the trim handles ignore drags under
  ~25 px (touch slop), so fine positions need overshoot and return (TC-276).
- **O-31 (R2-h 04:26, ledger).** After local midnight Credit Details again opened on 「2026-10」 with no 2026-11 group
  (O-25 repeats at 04:26); charges matched from logcat getCreditHistory.
- **O-32 (R2-x 04:42, TC-118).** With notifications turned off (USER_FIXED), the app still raised Android's own
  「Allow PowerDirector to send you notifications?」 prompt once, about when the first task finished (notify(2) at
  04:42:22), after an extra `pm clear-permission-flags … user-fixed` left it askable; the in-app 「Turn on
  notifications」 dialog of R-093 never showed. Evidence: TC-118-v2-sysprompt.png.
- **O-33 (R2-x 04:35, sign-in after pm clear).** The Google-button sign-in after a `pm clear` opened mauth-stage
  「Welcome! Enter your email to get started」 with the address prefilled and a marketing box ticked by default
  (unticked before Continue), then 「You Are All Set!」; the sign-in added 「Loyalty Credit Bonus (for PowerDirector
  Subscribers) +30」 (04:35:05). The first launch after the clear already read Pro (credits intro 「100 monthly credits
  have been added with your Pro subscription」) before sign-in.
- **O-34 (R2-x 04:37, Demo page).** The Demo page's description reads 「AI reframe your video for any aspect ratio,
  then fine-tune the crop in real time.」 (AI Reframe's text) again after the pm clear, as TC-011 recorded in R2-a.
