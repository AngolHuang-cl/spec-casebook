# Observations — R1 (android)

- O-1 (closest TC-007; build 2611161 Play Integrity change): after the TC-007 relaunch (14:23:36) CreditSystemManager logged
  `getCreditRemain error, creditSystemStageKeyInfo is null` / `creditSystemUUID is null`, `refreshMemberToken error,
  memberAuthKeyInfo is null`, `getCreditHistory error …`, `checkDailyBonus error` and a `checkFeatureCredit …
  JsonSyntaxException`, right after the StandardIntegrity warm-up; the UUID was read from Preferences
  (2fa1a6ce-…). Mine still read 6410 Credits afterwards (screenshots/R1-a-end-mine.png) and the first launch (14:21)
  logged `totalRemain=6410`. Looks like a start-up race (like KP-067); watch whether a charge or the ledger fails in R1-b.
  Evidence: logs/R1-a-20261117-142408/logcat-live.txt.
- O-2 (setup): the app opened on the 「PowerDirector Pro」 paywall at the segment's first launch (Free account); closed with
  [AID]IAP_Back. Not seen at the TC-007 relaunch.
- O-1 follow-up (R1-b): no `creditSystemUUID is null` or other CreditSystemManager errors during R1-b; all five charges
  went through and the log's `totalRemain` matched the pill each time: 6410 → 6407 (14:27:15) → 6404 (14:28:23) → 6401
  (14:28:50) → 6395 (14:30:56, AI Art 6) → 6392 (14:37:35). Evidence: logs/R1-b-20261117-143905/logcat-live.txt.
- O-3 (closest TC-048 / TC-121): with the switch On, both image tools save the provider's raw file: AI Art
  (files/TC-048-aiart-on.jpg) and Text to Image (files/TC-121-t2i-portrait-on.jpg) carry a C2PA manifest signed
  「Google Media Processing Services」 / 「Google LLC」 (「Created by Google Generative AI.」, SynthID), no CyberLink
  manifest; the Off files carry a CyberLink-signed manifest instead (no Google ingredient kept). TC-121 is filed for
  Text to Image; AI Art On has no row of its own (spec-addition candidate: C2PA of an AI Art file saved On).
- O-4 (closest TC-118, Q-12): Text to Image's default model shows as 「GPT-Image-2.6 Sunburst」, yet the raw file's
  manifest says 「Created by Google Generative AI.」; AI Art's raw file is Google's too (sheet assumes Flux ItiFlux).
  Information for RD's answer to Q-12 (which effect each path calls).
- O-5 (logs): R1-b cases were recorded in batches after the actions, so the by-case windows of TC-009/010/011/047/050/118
  are zero-length; read logcat-live.txt by clock time (T2I generations 14:27:14, 14:28:21, 14:28:49, 14:37:34; AI Art
  14:30:55; saves 14:27:40, 14:28:35, 14:29:02, 14:31, 14:36, 14:37).
- O-6 (closest TC-050 / TC-051 / TC-089): a Text to Image result that has been saved once is never written again: a
  second 「Save」 shows 「Saved to Gallery」 and leaves the first file untouched (same name, mtime and bytes), whatever
  the switch says. AI Art writes a new file each time (2_1794897089161.jpg then 2_1794897373882.jpg).
- O-7 (R1-c credits): Image to Video charges, log `totalRemain` and pill agree: 6392 → 6360 (Veo 3.1 4 s, 32, started
  14:42:22, done 14:43:12) → 6345 (Vidu Q2, 15, 15:00:10) → 6320 (Kling O3, 25, 15:01:03) → 6300 (Pixverse V6, 20,
  15:01:37) → 6260 (Wan 2.7, 40, 15:03:10). A 「Kling 4.0」 task started by mistake at 15:02:16 (helper picked the default
  model) failed 9 s later (`ImageToVideoRepository: applyEffect status: Error null` 15:02:25); its list item says
  「An Error Has Occurred / Credits have been refunded…」 and the balance never moved (6300 before and after), so it cost
  nothing net. Mine › Credits › Details not opened (no Android `ledger` command). Several Image to Video tasks run at
  once: 「Create another one」 is available while one is 「Processing…」.
- O-8 (closest TC-021 / TC-022 / TC-122): the CyberLink manifest's digitalSourceType looks swapped: the Off save, which
  carries the burned-in label, says `trainedAlgorithmicMedia`, while the On save (no label, unedited) says
  `compositeWithTrainedAlgorithmicMedia`. Files files/TC-021-c2pa.json, files/TC-022-c2pa.json. No row checks the
  digitalSourceType value: spec-addition candidate / question for RD.
- O-9 (closest TC-091): both BytePlus models (「Seedance 2.0」, 「Seedance 2.5」) are Pro-only on Image to Video:
  Generate reads 「Subscribe Pro to Unlock」 on the Free account. Flux and Hailuo are not offered at all; 「Gemini Omni
  Flash 1.1」 and 「Happy Horse 1.1」 are offered but the sheet names no vendor for them (Gemini is presumably Google).
- O-10 (closest TC-021 / TC-022, cf. O-6): unlike Text to Image, an Image to Video result saved a second time writes a
  NEW file (Off 1794898379103.mp4, then On 1794898577328.mp4 from the same Veo result). The number after the date in
  the file name counts saves, not tasks (Vidu = 「Custom 2」 saved as 「- 2 -」, Wan 2.7 = 「Custom 6」 saved as 「- 5 -」).
- O-11 (closest TC-020): the in-app full-screen player draws the 「AI」 badge from a view of its own
  (`aigc_badge_overlay`) over the first 2 s; Android's Appium screen recording of that player stops after ~1.5 s (few
  frames written), so the player rows were judged from rapid `adb exec-out screencap` captures (recordings/TC-020-player-caps/).
- O-12 (logs): in R1-c the cases were named with `device-android.ts case`, but log-slice cuts by the results.csv times,
  so the generations (14:42–14:43, 15:00–15:03) fall in TC-020 / TC-091 windows. Read logcat-live.txt by clock time.
- O-13 (closest TC-018 / TC-042 / TC-040): several tools save their result to the gallery by themselves when the task
  finishes, with no 「Save」 tap, following the switch at that moment: Video Edit by Chat (Kling 15:19:21, Gemini
  15:30:10, both Off → labelled), Talking Avatar (15:30:57, Off → labelled), AI Anime Video (15:39:24, On → no label).
  Character Motion Swap and Cinematic Reel Creator did not. Copies in files/auto/. Whether an automatic gallery copy is
  intended is not in the spec (spec-addition candidate / question for PM).
- O-14 (closest TC-107 / TC-114 / TC-111 / TC-113): the providers' raw files in the app cache
  (/sdcard/Android/data/<pkg>/files/…, readable over adb on this phone) carry their own valid C2PA manifests: Kling AI
  (「Kling AI C2PA Claim Signing」) for Kling O3 and Kling Motion Control, Google for Gemini Omni Flash, BytePlus
  (BytePlus_ModelArk) for Cinematic Reel 「Horror Movie」; CyberLink for Wan 2.2 Animate, AI Anime Video and Talking
  Avatar. Every Off and On save replaces the provider manifest with a CyberLink one. The sheet lists Kling as 無簽章, yet
  Kling does sign (information for RD / PM, Q-12). Files: files/auto/*-c2pa.json, cms-klingmc-raw.mp4, crc-raw.mp4.
- O-15 (closest TC-017 / TC-023 / TC-038 / TC-041): the result page's still preview draws the 「AI」 badge
  (aigc_badge_overlay) when the switch is Off and none when On (AI Anime Video seen both ways); Character Motion Swap's
  result page draws none in either state, yet its full-screen player does. The R1-c note that the still preview shows
  none (TC-020) was taken with the switch On.
- O-16 (test data, closest TC-023 / TC-025 / TC-032–034): the photos used for Cinematic Reel Creator and AI Storytelling
  were this run's labelled Text to Image Off saves, so their own 「AI」 marks appear inside those results; each verdict
  separates them (size, position, present in the raw provider file or in both Off and On files). Next time use
  unlabelled photos (fixtures.md: add a clean portrait photo set). AI Storytelling needs Pro after its one free trial,
  so it could not be redone.
- O-17 (closest TC-032 / TC-029): AI Storytelling results are not in My Artwork (they live under AI Storytelling ›
  history 「Generated Story」 and are exported, not saved), and Video Object Removal is not offered on Android 2611161
  (Q-11 assumed both). Video Edit by Chat resets its model to 「Seedance 2.5」 after a source video is picked; pick the
  model after the video. AI Anime Video's result page has a top tab also called 「Save」, so `lbl Save` hits the tab:
  use `id save_button`.
- O-18 (R1-e, Text to Video): the model list on 2611161 (Free) is Kling 4.0, Wan 3.0, Seedance 2.5 (Pro), Seedance 2.0
  (Pro), Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3: no Vidu, Pixverse, Hailuo or Flux (TC-101/103/104/105
  n/a), although Image to Video offers Vidu and Pixverse. The form opens on 「Kling 4.0」 each time (pick the model after
  「Create another one」). Text to Video does not auto-save to the gallery (unlike O-13); each Save writes a new file, Off and
  On (as O-10). Portrait results are stored 1920 × 1080 with a -90° display matrix (Kling O3 1080p, Wan 2.7 720p); the label
  is drawn in the displayed top-left corner, right size. Credits, pill and log agree: 5924 → 5894 (Kling O3 30) → 5866
  (Veo 3.1 4 s Fast 28) → 5836 (Kling O3 30) → 5811 (Wan 2.7 720p 25); all four tasks finished, none failed.
- O-19 (closest TC-054 / TC-059 / TC-120, R1-f): AI Music Generator on 2611161 is AIMusicGeneratorV2 (log: Google Lyria 3 Pro,
  5 credits a song): Genre / Mood / Theme chips, song length and number of songs (default 2, 「Generate for ◆ 10」); no
  description box, no lyrics path, unlike the PM board (「Generate for ◆ 6」). Opening it from AI Magic creates an editor
  project 「AI Music Generator 11-17」 behind it. My AI Music rows offer play, favourite and + (add to timeline); there is no
  Download: every finished song is written by itself to /sdcard/Music/cyberlink/PowerDirector/AI Music Generator/ (same
  bytes as the app's Results copy). No song of this segment (English, Chinese, Japanese, Off or On) starts with a spoken
  clip, and none carries a C2PA manifest. Older songs from 2025-04-30 are in the same folder (not this run's).
- O-20 (closest TC-120 / TC-098): after the `locale reset` relaunch AI Magic showed 「No Internet Connection」 with the credit
  pill 「--」 and Image to Video read 「0」 credits while the phone was online (ping OK); a plain relaunch fixed it (5771).
  Same start-up race as O-1 (CreditSystemManager `checkFeatureCredit … JsonSyntaxException` at each launch).
- O-21 (closest TC-061 / TC-062): on the Free account a 「PowerDirector Pro」 paywall opens after every Produce, over the
  「Saved to Gallery」 page; closed with [AID]IAP_Back, the file was saved.
- O-22 (closest TC-073 / TC-076, R1-g): AI Style Transfer › 「AI Cartoon」 (Elf) and 「AI Sketch」 (Oil Painting) on the portrait
  photo DSC_0047.JPG return the styled image turned 90° (face lying sideways) in the preview and in the exports
  (files/TC-074-cartoon-off.mp4 at 11 s, files/TC-077-sketch-off.mp4). The original photo shows upright. Not an AIGC row;
  likely an EXIF-orientation issue in the style-transfer path (RD). Evidence screenshots/O-22-cartoon-rotated.png,
  screenshots/TC-078-sketch-applied.png.
- O-23 (closest TC-065 / TC-084, R1-g): the export 「AIGC Watermark」 dialog does exist on 2611161 and appears for projects
  holding Text to Speech, AI Anime Video, AI Cartoon or AI Sketch content (switch Off), always AFTER 「Produce」 on the
  Produce sheet (on Free, after the Pro paywall when that shows), never on 「Export」. It did not appear for the AI Music
  project (TC-061), the Voice Changer 「Radio 1」 project (TC-068) or a non-AI project (TC-082). Since it shows here with
  「Don't show again」 unticked, the R1-f caveat (a pre-run 「Don't show again」 hiding it) is ruled out for the export
  dialog: the music project is simply not treated as AI content on export. (The music-generator dialog of TC-054 is a
  different dialog; still rechecked in R1-h.)
- O-24 (closest TC-067 / TC-068): AI Voice Changer on Free applies only the 「Effect」 tab voices (Radio 1 / Radio 2 free,
  Telephone / Chipmunk Pro); every Professional / Mellow / Bright AI voice is Pro (tap = 10 s preview with 「Unlock the
  10-second limit now」). An Effect voice charges nothing and does not make the project AI content (no dialog, no label,
  the Off and On exports are byte-identical in size).
- O-25 (R1-g, credits): pill and log agree 5746 → 5744 (Text to Speech, 2) → 5704 (AI Anime Video from the editor, Vivid 10 s, 40).
  AI Cartoon and AI Sketch charged nothing although the feature list prices AICartoon / AISketch gen_1_img at 1 credit
  (free uses, or not charged). The editor's AI Anime Video task took ~22 min (「17 minutes left…」); its result is added with
  「Add to Timeline」 as a clip after the source clip, not in place of it.
- O-26 (R1-g, driving): the editor shows 「Double tap on preview to watch your video at full screen.」 on the first Play of
  every project opening (closed with X, 「Don't show again」 left unticked); playback runs behind it, so the preview rows
  closed it, seeked to 0:00 and played again. The Launcher ☰ only opens on the Home tab: after leaving an editor the
  Launcher can come back on the Project tab (tap Home at 107,2335 first). `lbl Project` hits 「New Project」.
- O-27 (closest TC-054 / TC-008, R1-h, post-reset music recheck): after `pm clear` (TC-008) the app could not be signed in
  again: the Sign In page's Google button opens Chrome's Google sign-in, and the phone's only Google account is not the
  run's account (ethan.hsu.cl@gmail.com needs its email and password typed, user only). Signed out on Stage the credit
  pill reads 0; AI Music Generator (switch Off, Acoustic / Dreamy / Cinematic, 2 songs) 「Generate Music」 opened the
  「PowerDirector Pro」 paywall straight away, with no 「AIGC Watermark」 dialog before it. Inconclusive for TC-054: the
  dialog could come after the credit check. The R1-f caveat (a kept 「Don't show again」) is now cleared by the reset, so
  one signed-in generation with the switch Off settles TC-054 (and lets TC-128 run). Evidence
  screenshots/R1-h-music-filled.png, screenshots/R1-h-music-after-generate.png. Also: the reset left the switch On by
  default (TC-008); set Off afterwards. TC-129 ticked the export dialog's 「Don't show again」 before the reset; the reset
  cleared it.
- O-28 (closest TC-054 / TC-128, R1-i 2026-11-18 09:10-09:13, sign-in for the music recheck): the phone's Google account
  (acda.test7, authorized by the user 2026-11-18) could not sign the app in without a step outside the brief. Mine ›
  User Sign in › Google button opens Chrome (ChromeTabbedActivity), not the Android account chooser: first Chrome's own
  「Sign in to Chrome」 sheet (「Continue as Acda」 / 「Skip」; continuing would sign the Chrome browser itself into
  acda.test7, a browser account change, not taken), then after Skip the web page accounts.google.com 「Sign in to
  continue to CyberLink」 with an empty 「Email or phone」 box and no account list (typing the address would lead to
  Google's password/verification step, user only). Nothing typed; Chrome left on that page in the background. The app
  stays signed out (Mine 「Free」, credit log totalRemain=0), Stage (yellow bar, [AID]Stage_Server), switch Off, English.
  No generation possible, so TC-054/057 stay Fail and TC-055/056/128 Blocked as recorded (O-27). To finish: the user
  either taps 「Continue as Acda」 (signs Chrome in) or signs the app in by hand, then one Generate Music with the
  switch Off settles TC-054 and lets TC-055/056/057 and TC-128 (last) run. Evidence screenshots/R1-i-signin2.png,
  screenshots/R1-i-after-continue.png, screenshots/R1-i-chrome-page.png, screenshots/R1-i-end-switch.png.
- O-29 (closest TC-054 / TC-128, R1-i2 2026-11-18 09:15-09:18, sign-in with the approved route): Mine › User Sign in ›
  Google › Chrome 「Sign in to Chrome」 › 「Continue as Acda」 (user-approved 2026-11-18) worked on Google's side: Chrome
  signed in and landed on mauth-stage.cyberlink.com/auth/all-set (「You Are All Set!」, Stage auth), no password asked.
  Back in the app the dialog 「Account Not Found」 「Looks like you signed in with a different account. Use your original
  one to access credits and cloud files.」 with only 「Switch Account」 opened, and the app stayed signed out (Mine
  「Free」, 「User Sign in」, credit log totalRemain=0). Log: `CreditSystemManager: bindMember … 403
  {"detail":"invalid device identity"}` then `[updateAfterLogin] bindMember failed` (09:17:23), right after a Play
  Integrity (StandardIntegrity) call. So the app binds the credit account to the device and the Stage credit server
  rejects this phone's identity after the TC-008 `pm clear` (compare O-27 and run-android.md's 「Fail to verify
  uuid」 note); the dialog's text blames the account although the log names the device. Not retried. Still no
  generation possible: TC-054/057 Fail, TC-055/056/128 Blocked unchanged. Needs RD/the user: a device identity Stage
  accepts (or the original account ethan.hsu.cl@gmail.com signed in by the user, which may hit the same 403). Evidence
  screenshots/R1-i2-chrome2.png, screenshots/R1-i2-account-not-found.png, screenshots/R1-i2-end-switch.png; log
  excerpt logs/R1-i2-20261118-091804.
- O-30 (closest TC-054 / TC-128, R1-j 2026-11-19 08:50-08:52, music recheck precheck): recheck NOT run, the phone no
  longer has the build under test. `dumpsys package`: PowerDirector 16.9.0 versionCode **2611171** (not 2611161),
  firstInstallTime = lastUpdateTime 2026-11-18 14:43:25 (a fresh install by the phone's other user, new app uid 11809,
  installer com.google.android.packageinstaller), so the R1 app data, Stage sign-in state and the music dialog's
  「Don't show again」 state are gone with it. `testserver.config` still in /sdcard/cyberlink/PDR/. Found in front: AI
  Video Enhance setup (VideoEnhanceSetupActivity, another user's work, credit pill 2349, so signed in on that build;
  left untouched, nothing tapped). The R1 log capture up to the reinstall shows the other user's sign-in on 2611161 at
  2026-11-18 10:45: `bindMember … 403 {"detail":"invalid device identity"}` (10:45:48) then `bindMemberSuccess: 1`
  (10:45:52), totalRemain=0 — so the 403 of O-29 was followed by a successful bind on a retry. No rows changed: TC-054/057
  Fail, TC-055/056/128 Blocked stay as recorded against 2611161. Evidence screenshots/R1-j-phone-found.png, logs
  R1-j-precheck-20261119-085154.
