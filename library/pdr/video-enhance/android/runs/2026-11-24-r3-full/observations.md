# Observations — R3 (2026-11-24-r3-full)

- **O-1** (R3-b, near TC-032 / TC-030): the first Video Enhance panel open after TC-013's `pm clear` showed the
  first-run bubble 「Max 8 minutes. Drag to choose which part.」 by itself again (gone by 2.7 s). So the "seen" flag is
  local app data and `pm clear` resets it, like the Demo page's state before TC-013. Evidence
  screenshots/TC-032-first-open.png.
- **O-2** (R3-b, TC-037): on 2611231, play with the playhead at the selection end jumps to the selection start and plays
  (「02:00」 → 「02:02」). In R2 (build 2611091) play there did nothing: fixed or changed on 2611231. Recording
  recordings/TC-037-play-at-end.mp4. Full-screen still opens at the video start with no close control (P0092).
- **O-3** (R3-b, end of segment): the Play test subscription lapsed during R3-b (KP-068): ledger 「Expired」 −100 at
  18:44:39 and +20 「Returned」 at 18:40:00; logcat `updateSubscribingStatus: false` from 19:00:42 (true until 18:44:36).
  Balance 30830 → 30750, nothing charged by Video Enhance (no create session). The app kept acting Pro (Mine 「Pro」,
  Professional selectable) without a relaunch. Purchased ~4 h earlier, within KP-068's 3.5–5.5 h.
- **O-4** (R3-b, TC-044): the bubble 「Up to 8 minutes in Standard mode」 at the 8:00 cap went away by itself a few
  seconds after release (R2 saw it stay after release); while shown it still covers the Preview time and play (P0093).
- **O-5** (R3-d, TC-097, 19:54): after the 500-credit test purchase the follow-up offer read 「Want to get 1000 Credits,
  too?」 (「Get credits for advanced AI features」, 「NT$2,010.00」, 「Not now」): the row says 100, R2 saw 50 (R2 O-12). The
  offered pack varies between purchases; the row's 「If … shows」 step only needs 「Not now」. 「Check Backup Protection」
  followed again (KP-071, 「Later」). The pack page also opened on an 「Annual Auto Pass Discount」 card (1000 +1000,
  NT$2490) pre-selected with 「Continue with the best deal」; tapping the 500 tile changed the CTA to 「Get 500 Credits for
  NT$1190」. screenshots/TC-097-packs.png, TC-097-after.png.
- **O-6** (R3-e, TC-121 / TC-112): S3 uploads fail on this Wi-Fi (17F_QA_Wifi_5G) as they did in the MUI phase
  (~15:16–15:36). A 2.1 MB 3.2 s 720p upload (Enhance 20:33:04, Upload to S3 start 20:33:08) ended at 20:35:41 with
  `exception->java.io.IOException: unexpected end of stream on https://cl-aol-media-demo.s3-accelerate.amazonaws.com/...`
  (`EOFException: \n not found`), no upload response code; Recent task showed a failed card 「888:53:20 / Retry」
  (grey placeholder, nonsense length), charged −4 at 20:33. The 01:30 1080p upload (TC-112, start 20:41:08) failed at
  20:49:41 with `SocketException: Broken pipe` → 「25000:00:00 / Retry」, −180. Uploads that worked took 63–70 s for
  1–2 MB (KF-013: over 1 minute is a bug, P0236). Refunds expected ~3 h later (KF-003); recheck at the run end.
- **O-7** (R3-e, TC-113): 「Leave」 at 20:58:17 did not stop the S3 upload: logcat 「Upload to S3: start」 20:58:06 →
  「upload response code->200」 / 「Upload to S3: finish」 20:59:12, 55 s after Leave, with no 「Apply Effect」 after it
  (no task was created; Recent task shows the failed 「888:53:20 / Retry」 card, −4 not restored as the dialog says).
  The dialog says leaving 「will cancel the process」: the file still went up. Harmless to the user except data use;
  worth a line to RD with TC-113.
- **O-8** (R3-e, after TC-133's failed upload; near R3-f's Retry / failure rows): 「Retry」 on the failed card
  「888:53:20」 (TC-133's first task, S3 `unexpected end of stream` 21:06:38, −4 at 21:04) was tapped by mistake at
  21:06:5x (a tap meant for a grid tile). It re-uploaded with no new create session (Upload to S3 21:06:58 → 200 at
  21:08:02, 64 s), then `apply effect response code->200` but `applyEffect status: Error null` 0.3 s later; the card
  turned 「View Details」 (grey placeholder, 「888:53:20」). No new charge; Credit Details then showed 「Generation failed, credits returned +4」 stamped 2026/11/24
  21:04 (seen 21:18; the refund came once the retried task ended in Error, not hours later as KF-003). screenshots/retry-check.png, retry-after.png.
- **O-9** (R3-f, TC-152): the 1080p result of ve-000396-1080p30 (Standard / Natural / 30fps / 1080p, ◆ 8, done 23:11)
  carries heavy smear / block trails along the moving coloured lines from about 1 s on (frames 30, 60, 100 of the saved
  file 「VideoEnhance - Nov 24 - 13 - 1795533096619.mp4」), which the source does not have; the 720p results of the same
  synthetic family (TC-266's 3.2 s, TC-267's 0:30) are clean. Possibly the enhancer on this synthetic pattern at
  1080p; worth checking on a real 1080p clip in the combination rows (R3-g) before any filing. Evidence
  screenshots/TC-152-result-frames.png, TC-152-source-frames.png, TC-152-playA.png; exports/TC-152-saved.mp4 (local).
- **O-10** (R3-f, refunds): at 23:17 Credit Details still had no 「Generation failed, credits returned」 row for
  R3-e's −4 20:33, −180 20:40, −4 20:58 (upload failures, Retry cards), nor for R3-f's −31 21:33 (S3 Broken pipe,
  card 「8342:30:00 / Retry」) and −180 21:54 (70-min upload then `apply effect response code->401` at 23:05:23,
  card 「1:30 / View Details」). Only the 21:04 task that ended `applyEffect status: Error` was refunded at once (+4,
  stamped 21:08). KF-003: such refunds came ~3 h later in R2; recheck all five at the run end. Balance 30866 (Mine 23:17).
- **O-11** (R3-f, near TC-141 / TC-142): Recent task reached through Result › 「Enhance More」 › Enhance comes up as a
  variant with ‹ (btnBack, top left) and ⌂ (btnHome, top right) and no 「Create another one」; ‹ there goes to Add
  Media. Opened from the panel's icon or by itself after a panel Enhance it has only ⌂ (top left) and 「Create another
  one」 (TC-140 / TC-141). Same as R3-e TC-132's note.
- **O-12** (R3-f, 23:05:23): the Play test subscription (bought 19:19:42) lapsed: logcat `updateSubscribingStatus:
  false`; the relaunch at 23:15 (TC-268) shows Free (Launcher 「Pro」 button, Mine tab, 「Free」 「Claim offer」). ~3 h
  46 min, inside KP-068. R3-g needs Pro again: buy it from the panel's IAP on the Play test sheet.
- **O-13** (R3-f, 21:33 / 21:54): S3 uploads still flaky and slow (O-6): 1 of 5 uploads broke off (21:34:12 Broken pipe
  after 31 s); working uploads took 16 s (1.0 s 720p), 79 s (3.2 s 720p, 465 KB), 199 s (3.96 s 1080p), 9 min 51 s
  (0:30 720p) and 70 min (01:30 1080p, then 401). A stale completion banner from an earlier task was still waiting on
  the Launcher at 23:10 and blocked the Launcher's page source until 「Close」.
- **O-15** (R3-g1, follow-up to O-9): no smear or block trails on the real clip. The 1080p results of
  ve-real-000320-720p30 (TC-225, TC-221, TC-222 Natural 30/60/120 fps; TC-220, TC-233, TC-236 Sharp 30/60/120 fps)
  were compared with the source at full size (frames 1, 2, 2.5 and 3 s): moving edges (walls, HUD, thumb) are clean,
  like the 720p and 4K results. O-9's trails show only on the synthetic ve-000396 pattern so far; treat O-9 as a
  pattern-specific artifact until a real clip shows it. Evidence screenshots/TC-225-o9-frames.png, TC-225-o9-crop.png,
  R3-g1-o9-1080p.png.
- **O-16** (R3-g1, refunds, KF-003 / O-10): four of the five outstanding refunds arrived during the segment, each as
  「Generation failed, credits returned」 stamped at the refund time: +4 at 23:40 (R3-e −4 20:33, 3 h 7 min), +180 and
  +4 at 00:19:08 (R3-e −180 20:40 and −4 20:58, 3 h 39 min / 3 h 21 min), +31 at 00:40 (R3-f −31 21:33, 3 h 7 min)
  (logcat getCreditHistory, category returned; balance jumps in TC-226, TC-232, TC-237). Still missing at 00:42: R3-f's
  −180 21:54 (apply effect 401 at 23:05; ~3 h after the failure would be ~02:05): recheck at the run end.
- **O-17** (R3-g1, tier and ledger): the Pro test subscription was bought again at 23:22:26 from the panel's 「Unlock
  Pro to Enhance」 › IAP 「Continue」 › Play test sheet (「Test card, always approves」, 「You will not be charged」,
  「NT$1,190.00/30 min」), Subscribe tapped by bounds (540,2174): onPurchasesUpdated 23:22:31, Monthly Credit Bonus
  +100 (30866 → 30966), Pro tab 「You're on the highest plan」. After local midnight Credit Details opened on the
  2026-10 group with no 2026-11 group (KP-070 again), so rows from TC-229 on read the charge from logcat
  getCreditHistory (each one VideoEnhanceV2 debit of the CTA price, actionId names the combination, e.g.
  genvideo_1_sec_byteplus_std_hd_720p_30fps for Sharp: 「hd」 = Sharp, 「natural」 = Natural).
