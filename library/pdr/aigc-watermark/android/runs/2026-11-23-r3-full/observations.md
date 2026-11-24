# Observations — R3 (android, 16.9.0 2611193)

- **O-1 (closest TC-049, 2026-11-23 15:55).** Text to Image result page › 「Add to Timeline」 writes the image to the
  gallery by itself (Pictures/cyberlink/PowerDirector/Text to Image/1_1795420434658.jpg, 1376 × 768) with no Save tap,
  and with the switch Off that file carries the AI label; the editor clip itself shows none. A later 「Save」 of the same
  result then reuses that file (KP-080). Evidence: files/TC-049-add-to-timeline-gallery.jpg, screenshots/TC-049-editor.png.
- **O-2 (closest TC-117, 2026-11-23 16:01 and 16:11).** AI Art, default style 「Baby Face」 with 「Try with example」 failed
  twice with the banner 「Session timeout. Try again to proceed.」 (grey tile with ⓘ): upload, apply effect and task
  polling all returned 200, the 6 credits were charged (totalRemain 31159 → 31153 at 16:01:46 / 16:11:43) and returned
  about 20 s later (→ 31159 at 16:02:06 / 16:12:05), so the refund worked (KP-007). The second try was the banner's
  retry. AI Art rows used the existing R2 Baby Face result (My Artwork, Nov 23) instead.
  Evidence: screenshots/TC-117-session-timeout.png, screenshots/O-2-aiart-session-timeout-x2.png, logcat 16:01–16:12.
- **O-3 (closest TC-021 / TC-022, 2026-11-23 16:32–16:34).** The same Veo 3.1 result saved with the switch Off is stored
  1280 × 720 with a -90° display matrix (KP-084 pattern), saved On it is stored 720 × 1280 upright with no matrix; both
  play upright. The Off save re-encodes to burn the label, the On save keeps the provider's layout. No visible effect.
  Evidence: files/TC-021-itv-veo-off.mp4, files/TC-022-itv-veo-on.mp4 (ffprobe).
- **O-4 (closest TC-041 / TC-042, 2026-11-23 17:26) — contradicts KP-079 / KF-006.** Talking Avatar wrote its result to
  the gallery by itself when the task finished (Movies/cyberlink/PowerDirector/Talking Avatar/TalkingAvatar - Nov 23 -
  1 - 1795425965333.mp4, 17:26:05, 1,484,473 B), before the result was ever opened (the task list was left at ~17:25
  and first reopened at 17:43). The switch was Off, and that copy carries the AI label (10–51 px at 0.0 / 1.9 s) and one
  CyberLink manifest. KP-079 says Talking Avatar (2611193) writes only when the result is first opened; on this run it
  wrote at task finish like Video Edit by Chat (17:14, 17:25) and AI Anime Video (17:01). Evidence:
  files/O-4-avatar-auto-copy.mp4, `ls -l` of the folder.
- **O-5 (closest TC-023 / TC-041, 2026-11-23 17:30–17:43).** My Artwork tiles for Cinematic Reel Creator and Talking
  Avatar kept reading 「Processing...」 well after the tasks had finished (task lists showed 「View」, the avatar file was
  written 17:26); each tile updated only after its task list was opened once and My Artwork reopened. No AI label in
  either state. Evidence: screenshots/TC-026-myartwork.png (17:37, both 「Processing...」), TC-023-tile-crop.png,
  TC-041-tile-crop.png.
- **O-6 (closest TC-032 / TC-110, 2026-11-23 17:27–17:28).** AI Storytelling's media upload logged two
  `GenericRemoteSource: uploadFile: error, error=java.net.SocketTimeoutException: timeout -1` (17:27:39, 17:28:10)
  while the screen showed 「Media Uploading... 8%」; the upload then went on by itself and the story was generated
  (25 credits, no refund needed). No visible error. Evidence: logs/R3-d-20261123-175702/by-case/TC-017.txt (window).
- **O-7 (closest TC-037 / R3-a TC-006, 2026-11-23 17:58–18:07).** The R2 Play test subscription (bought 14:22) lapsed:
  logcat `GoogleBillingWrapper: updateSubscribingStatus: false` 17:58:55, the Pro paywall opened by itself at the R3-e
  restart (KP-074), Mine reads 「Free」 「Claim offer」 and the last Launcher tab 「Mine」; credits stayed 30627 (no monthly
  bonus clawback seen by 18:12). On this Free account Menu › Settings › 「Remove AIGC Watermark」 turned On (read back
  checked 18:05) with no paywall, upgrade prompt or sign-in request, and back Off 18:07. R3-e ran on Free: Seedance 2.0
  showed 「Subscribe Pro to Unlock」, so TC-100 used R2's Seedance result. Not re-bought. R3-a's Free rows (TC-001,
  TC-003, TC-005, TC-006) can be retested while the account stays Free. Evidence: screenshots/r3e-start.png,
  r3e-mine.png, TC-037-switch-on.png, TC-100-free-seedance.png.

## O-8 The export 「AIGC Watermark」 dialog now opens at 「Export」, before the Produce sheet (TC-065, TC-084)
On 2611193 (18:44) the editor's 「Export」 opened the 「AIGC Watermark」 dialog over the dimmed editor; its 「Export」 then
opened the Produce sheet, and the Free paywall followed 「Produce」. R1 on 2611161 (and KF-005) had it only after
「Produce」, over the Produce sheet. Contradicts KF-005 (dialog timing). Evidence: screenshots/TC-065-export.png,
screenshots/TC-065-sheet.png.

## O-9 Projects with a Pro AI Voice Changer voice cannot be produced (TC-067 – TC-069)
On 2611193 (Pro, 19:02–19:24) every AI Voice Changer Professional voice applied from a clip's 「Audio Tools」 shows
「Applied」 and 「Voice Changer On」, but 「Produce」 then fails: 「PowerDirector Mobile cannot produce the video.
/storage/emulated/0/Android/data/com.cyberlink.powerdirector.DRA140225_01/files/VoiceChanger/Cache/<clip>_<n>.m4a is
missing. Check the project and ensure all the media files are available.」 (OK / Report). `ls` of the Cache folder shows
the m4a right after Apply (speech_noise_1_1795432979061.m4a, 161,242 B, 19:23) and no m4a right after the panel's ✓.
With the 6-channel clip 「AAC 6ch 44.1 KHz.mp4」 the S3 upload timed out (`Upload to S3: finish` right after
`SocketTimeoutException`) and the UI still showed 「Applied」. The Effect voice 「Radio 1」 produced normally. Seen with
Jill, Kathleen, Lila, Margaret on two clips; not this feature's rule (Voice Changer). Evidence:
screenshots/O-9-vc-missing.png, screenshots/O-9-vc-missing-speech.png, logcat 19:02:53, 19:13:39, 19:18:03.

## O-10 Wi-Fi 17F_QA_Wifi_5G lost most packets 19:05–19:36; the phone moved to 17F-QAAPP-2.4G (environment)
From about 19:05 the SM-A5360's Wi-Fi (17F_QA_Wifi_5G, RSSI −60) dropped 50–80% of pings with 0.2–4.6 s round trips;
Android logged CMD_UNWANTED_NETWORK, Google Play said 「No internet connection」 once, CreditSystemManager got
`Unexpected response code for CONNECT: 502` and AI Anime Video's page hung on its spinner. `device-android.ts wifi off`
/ `on` at 19:36 rejoined 17F-QAAPP-2.4G (0% loss, ~20 ms); the rest of R3-g ran on it. Not an app finding.

## O-11 After `pm clear` on Stage the account signed in again (TC-008, 2026-11-23 20:12–20:13)
After `adb shell pm clear` (testserver.config kept, Stage), Menu › 「Sign in to CyberLink」 › Google went through
Chrome straight to mauth-stage 「You Are All Set!」 (Chrome already signed in, no password), and the app showed 「Account
Sign In / Credits & cloud AI tasks on this device will be stored under your account…」 › 「Got it」; Menu then showed qau2
CLT / cltqauiap2@gmail.com, logcat `CreditSystemManager: bindMember, bindMemberSuccess: 0` 20:13:10 and
`totalRemain=30572` (30542 + 30, KP-072 loyalty bonus). No 「Account Not Found」 and no 403 「invalid device identity」.
Contradicts KP-093 (on this SM-A5360 with 2611193 the reset device signed in). Evidence:
screenshots/TC-008-after-signin.png, TC-008-after-gotit.png; logs/.live/logcat-20261123-201159.txt.
