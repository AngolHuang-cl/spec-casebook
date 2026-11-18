# Run state — R1 Full run of the draft (android)

Table: library/pdr/aigc-watermark/android/cases.csv
Started: 2026-11-17T06:19:00.331Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-17T06:24:40.501Z · next TC-009 (R1-b)
{"Pass":4,"Blocked":7,"Fail":1,"Not run":117}

R1-a done. Build 16.9.0 (2611161) installed 2026-11-17 14:17 (TR261116-0056). Stage (yellow top bar, testserver.config present). Signed in ethan.hsu.cl@gmail.com, Free (Mine: Free / Claim offer); no Pro account on the phone. Credits 6410 (Mine, 14:2x, after relaunch). Settings has 「Remove AIGC Watermark」 (below 「Remove watermark」, above 「Preferences」); it read On at segment start, left Off at the end. App language device default (en). Logs pulled R1-a-20261117-142408 (logcat capture still running). feature.json: removed (?i) from the log regexes (JS RegExp rejected it; the i flag is already applied). Nothing half-done.

### 2026-11-17T06:39:37.534Z · next TC-020 (R1-c)
{"Pass":13,"Blocked":7,"Fail":7,"Not run":102}

R1-b done (14:25-14:39). Switch read Off at start; turned On for TC-051/048/053/121, Off again for TC-089; left Off. Signed in Free ethan.hsu.cl@gmail.com, Stage. Credits 6392 (pill and log totalRemain 14:38). Generations used: T2I x4 (GPT-Image-2.6 Sunburst default; 9:16 tulip, 16:9 tulip, 1:1 tulip, 9:16 sunflower) 3 each, AI Art x1 (Baby Face, example photo) 6. Saved files in files/ (TC-009/010/011 Off, TC-047 Off, TC-048 On, TC-051 gallery copy, TC-121 On). Instagram composer left twice without posting; app back in front. An editor project was created by TC-049 「Add to Timeline」 (tulip photo), left via Home. Logs pulled R1-b-20261117-143905 (logcat capture still running). Two Appium servers listed by status (4724 and 4725), left alone. Nothing half-done.

### 2026-11-17T07:07:26.383Z · next TC-017 (R1-d)
{"Pass":19,"Blocked":10,"Fail":14,"Not run":86}

R1-c done (14:40-15:07). Switch read Off at start; On for TC-022/045/122/087, Off again for TC-088 and the model rows; left Off. Signed in Free ethan.hsu.cl@gmail.com, Stage (yellow bar). Credits 6260 (pill 15:06, log totalRemain 15:06:28). Generations: Image to Video Veo 3.1 4 s (32), Vidu Q2 (15), Kling O3 (25), Pixverse V6 (20), Wan 2.7 (40); a Kling 4.0 task failed and was refunded (O-7). Seedance 2.0/2.5 Pro-only. Saved files in files/ (TC-021 Off, TC-022 On, TC-093/094/096/097 Off) and their c2patool JSON; 6 Image to Video files now in Movies/cyberlink/PowerDirector/Image to Video. Instagram composer left twice with Start over, nothing posted. An editor project was created by TC-020 Full Editor (Veo result), left via Back. Logs pulled R1-c-20261117-150646 (logcat capture still running). Two Appium servers listed by status (4724 and 4725), left alone. App on the Launcher. Nothing half-done.

### 2026-11-17T08:08:28.217Z · next TC-012 (R1-e)
{"Pass":35,"Blocked":15,"Fail":24,"Not run":55}

R1-d done (15:07-16:08). Switch read Off at start; On for TC-019/028/025/034/043/040, Off again from TC-039 on; left Off (read back unchecked 16:08). Signed in Free ethan.hsu.cl@gmail.com, Stage (yellow bar). Credits 5924 (pill 16:08, log totalRemain 16:07:41). Generations: Video Edit by Chat Gemini Omni Flash 1.1 (72) and Kling O3 (45); Character Motion Swap Wan 2.2 Animate (39) and Kling Motion Control (60); Cinematic Reel Horror Movie (70, BytePlus); AI Storytelling (free trial, 0; Pro needed for more); AI Anime Video Vivid 10 s (40); Talking Avatar (10). Saved/exported files and c2patool JSON in files/ (TC-018/019/024/025/027/028/033/034/039/040/042/043/107/113) plus provider raw files and auto-saves in files/auto/. Projects created: MOV_0046 test project (TC-029 search), Full Editor projects from VEbC, anime, CMS, cinematic, Talking Avatar Add to Timeline, and the story turned into a timeline (Full Edit); all left via Home/Back. No AIGC 「Don't show again」 ticked (export dialog seen at TC-033, left unticked); editor hint 「Double tap on preview…」 Don't show again also left unticked. Logs pulled R1-d-20261117-160752 (logcat capture still running). Two Appium servers listed by status (4724 and 4725), left alone. App on the Launcher. Nothing half-done.

### 2026-11-17T08:23:23.931Z · next TC-014 (R1-f)
{"Pass":39,"Blocked":20,"Fail":28,"Not run":42}

R1-e done (16:09-16:23). Switch read Off at start; On for TC-037 only, Off again from TC-106; left Off (read back unchecked 16:22:54). Signed in Free ethan.hsu.cl@gmail.com, Stage (yellow bar). Credits 5811 (pill 16:23, log totalRemain 16:22:56). Generations (Text to Video): Kling O3 9:16 1080p (Custom 1, 30), Veo 3.1 16:9 4 s Fast (Custom 2, 28), Kling O3 16:9 1080p (Custom 3, 30), Wan 2.7 9:16 720p (Custom 4, 25). Saved files and c2patool JSON in files/ (TC-012/013/036/037/106); 5 files now in Movies/cyberlink/PowerDirector/Text to Video. A Full Editor project was created by TC-035 (balloon clip), left via Home; editor hint 「Double tap on preview…」 closed with X, Don't show again unticked; Text to Video intro 「Don't show again」 unticked. Logs pulled R1-e-20261117-162306 (logcat capture still running). Two Appium servers listed by status (4724 and 4725), left alone. App on the Launcher. Nothing half-done.

### 2026-11-17T09:20:50.761Z · next TC-064 (R1-g)
{"Pass":44,"Blocked":23,"Fail":36,"Not run":26}

R1-f done (16:24-17:20; paused ~16:52-17:10 by an API outage). Switch read Off at start; On for TC-062/063 only, Off again from TC-015; left Off (read back 17:20, screenshots/R1-f-end-switch.png). App language: zh-Hant for TC-015, ja for TC-016, restored with locale reset (system locale en-US, Launcher English). Signed in Free ethan.hsu.cl@gmail.com, Stage (yellow bar). Credits 5746 (pill 17:20, log totalRemain 17:20:03). Generations: AI Music Generator x4 (2 songs x 5 each: en Off, en On, zh Off, ja Off; 10 each), Image to Video Gemini Omni Flash 1.1 5 s with AI sound (25, task Custom 7). Files in files/ (TC-061/062 exports, TC-098 save + c2pa json) and files/music/ (songs, spectrograms). Songs auto-saved to Music/cyberlink/PowerDirector/AI Music Generator. Project 「AI Music Generator 11-17」 (DSC_0047 + song 1) and the generator's own empty projects; left via Home. Don't show again: NOT ticked anywhere - the music AIGC dialog never appeared (TC-054), the export AIGC dialog never appeared for the music project (TC-061), the music intro 「Don't show again」 and the editor hint 「Double tap on preview…」 left unticked. So TC-128 (music) and TC-129 (export) states are untouched. Logs pulled R1-f-20261117-172022 (logcat capture still running). Two Appium servers (4724, 4725) left alone. App on the Launcher. Nothing half-done.

### 2026-11-17T11:58:32.448Z · next TC-008 (R1-h)
{"Pass":59,"Blocked":23,"Fail":44,"Not run":3}

R1-g done (18:42-19:58). Switch read Off at start; On for TC-066/080, TC-069, TC-072, TC-075/078; Off again from TC-076 on; left Off (read back 19:57, screenshots/R1-g-end-switch.png). App language English (system en-US, untouched). Signed in Free ethan.hsu.cl@gmail.com, Stage (yellow bar). Credits 5704 (Mine 19:57, log totalRemain 19:57:50): Text to Speech 2, AI Anime Video (editor, Vivid 10 s) 40; AI Cartoon / AI Sketch no charge. Projects created: Project 11-17(2) TTS, (3) Voice Changer Radio 1, (4) AI Anime (MOV_0044 trimmed to 5 s + anime clip), (5) AI Cartoon (9:16), (6) AI Sketch, (7) non-AI text+sticker, and the Image to Video Custom 7 Full Editor project reused as Project 11-17; plus two empty projects left by mis-taps. Exports pulled to files/ (TC-065/066/068/069/071/072/074/075/077/078/081/082/083) with frames in files/frames/. Instagram composer left twice with Start over, nothing posted. Don't show again: NOT ticked anywhere - export 「AIGC Watermark」 dialog seen 9 times (TC-065/071/074/077/081/083/084-086) and left unticked; music AIGC dialog not met in this segment; AI Anime Video intro, editor hint 「Double tap on preview…」 and the 8K/UHD 「Converting for Better Performance」 notice all left unticked. TC-128/129 states untouched. Logs pulled R1-g-20261117-195756 (logcat capture still running). Two Appium servers (4724, 4725) left alone. App on the Launcher Home tab. Nothing half-done.

### 2026-11-17T12:08:11.240Z · all recorded
{"Pass":60,"Blocked":24,"Fail":45}

R1-h done (19:59-20:08). TC-129 Pass (export 「Don't show again」 ticked on Project 11-17(6), second export no dialog, both files labelled). Logs pulled R1-h-prereset-20261117-200146 before adb shell pm clear (no uninstall). TC-008 Fail question: switch defaults On on the fresh install. App NOT signed in after the reset: Google button opens Chrome sign-in with only acda.test7 on the phone; ethan.hsu.cl@gmail.com needs a typed password (user only). Signed out, Stage (yellow bar, testserver.config kept), credits 0. TC-128 Blocked defect (upstream TC-054; post-reset music recheck hit the 0-credit Pro paywall, no AIGC dialog, inconclusive, O-27). First-launch: Get Started accepted, Pro paywall closed, file-access permission allowed (Next, Allow, ALLOW). Switch set Off after TC-008 (read back unchecked). Language English. Chrome left on accounts.google.com sign-in page in the background (nothing typed). Music generator left an empty project. Logs pulled R1-h-20261117-200750 (logcat capture still running). Appium 4724/4725 left alone. App on the Launcher Home tab. Run complete: 0 Not run. Pending for the user: sign in ethan.hsu.cl@gmail.com, then recheck TC-054 / run TC-128.

### 2026-11-18T01:12:57.460Z · all recorded
{"Pass":60,"Blocked":24,"Fail":45}

R1-i (2026-11-18 09:10-09:13): music recheck NOT done. Sign-in with the phone's Google account acda.test7 stopped: the app's Google button opens Chrome, which offers 「Sign in to Chrome」 (signs the browser in; not taken, Skip) and then the web 「Email or phone」 form with no account chooser (nothing typed) - O-28. App signed out, Free, credits 0 (log totalRemain=0), Stage (yellow bar), Remove AIGC Watermark Off (read back screenshots/R1-i-end-switch.png), English. No credits spent, no rows changed: TC-054/057 Fail, TC-055/056/128 Blocked. Chrome left on accounts.google.com sign-in in the background. Logs pulled R1-i-20261118-091240 (logcat capture still running). Appium 4724/4725 left alone. App on the Launcher. Pending for the user: sign the app in (Continue as Acda in Chrome, or by hand), then recheck TC-054 and run TC-055/056/057, TC-128 last.

### 2026-11-18T01:18:20.423Z · all recorded
{"Pass":60,"Blocked":24,"Fail":45}

R1-i2 (2026-11-18 09:15-09:18): signed Chrome into acda.test7 with 「Continue as Acda」 (user-approved); Google/Stage auth finished (mauth-stage …/all-set, no password), but the app showed 「Account Not Found」 (Switch Account only) and stayed signed out: CreditSystemManager bindMember 403 {"detail":"invalid device identity"} (O-29). No tier beyond Free/signed out, credits 0, no generation, no credits spent, no rows changed (TC-054/057 Fail, TC-055/056/128 Blocked). Chrome on the phone is now signed into acda.test7, left on the all-set page in the background. End: Launcher Home, Stage (yellow bar, [AID]Stage_Server), Remove AIGC Watermark Off (read back screenshots/R1-i2-end-switch.png), English. Logs pulled R1-i2-20261118-091804 (logcat capture still running). Appium 4724/4725 left alone. Pending: a device identity Stage accepts (RD) or the user signing in, then the music recheck (TC-054, 055/056/057, TC-128 last).
