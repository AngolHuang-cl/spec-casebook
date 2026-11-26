# Run state — MUI MUI: 26 languages (translations from the APK, truncation on the phone)

Table: library/pdr/video-enhance/android/cases.csv
Started: 2026-11-24T04:03:58.541Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-24T04:09:17.356Z · next TC-321 (MUI-apk)
{"Not run":27}

MUI-apk done (TC-321 Fail, 35 fails, 67 doubts). Phone walks TC-322 – TC-347 not run: app signed out on the SM-A5360 (Google sign-in 403 APP_UNRECOGNIZED on 2611231, as R3); iOS QA iPhone offline. eBug drafts wait for the walks' screenshots (an image on every entry).

### 2026-11-24T04:33:48.695Z · next TC-322 (MUI-CHT)
{"Fail":1,"Not run":26}

Setup (phone walks): SM-A5360 R5CTB22S05Y, PowerDirector 16.9.0 build 2611201, Stage (yellow bar, [AID]Stage_Server), signed in cltqauiap2@gmail.com, Pro (Pro tab: You're on the highest plan), 30,742 credits. Media/audio permissions granted (photo picker first got limited access by mistake, then full access via adb pm grant). Recent task: empty (No Generated Videos), so no completed and no failed task: Result/Save and error-dialog steps are skipped in every walk. Project made in English: Project 11-24 with ve-0130-1080p60.mp4 (1:30); clip toolbar groups the tool under Enhance › AI Video Enhance (setup-15/17). Picked ve-1230-1080p60.mp4 for the panel (badge 60fps · 1080p). Demo page English description reads 'AI reframe your video for any aspect ratio, then fine-tune the crop in real time.' (setup-03).

### 2026-11-24T04:44:36.600Z · next TC-323 (MUI-CHS)
{"Fail":1,"Pass":1,"Not run":25}

MUI-CHT done: TC-322 Pass, no truncation; offline toast not shown (TC-100 defect); no completed/failed task so Result/Save/error dialog skipped; 34 credits (16 s task left).

### 2026-11-24T04:48:12.955Z · next TC-324 (MUI-JPN)
{"Fail":1,"Pass":2,"Not run":24}

MUI-CHS done: TC-323 Pass, no truncation; doubt TD-W1 (Launcher 視頻画质增强, Traditional 視); 34 credits.

### 2026-11-24T04:51:37.466Z · next TC-325 (MUI-ESP)
{"Fail":1,"Pass":3,"Not run":23}

MUI-JPN done: TC-324 Pass, no truncation (processing title breaks 中… onto line 2, shown in full); 34 credits.

### 2026-11-24T04:58:02.401Z · next TC-326 (MUI-KOR)
{"Fail":1,"Pass":4,"Not run":22}

MUI-ESP done: TC-325 Pass, no truncation; doubt TD-W2 (editor 'Tools de audio'); 34 credits. (A first ESP attempt went astray into New Project via lbl Pro matching Proyecto; backed out, no project saved.)

### 2026-11-24T05:01:23.606Z · next TC-327 (MUI-DEU)
{"Fail":1,"Pass":5,"Not run":21}

MUI-KOR done: TC-326 Pass, no truncation; 34 credits. Batch CHT–KOR: 5 Pass, 0 truncations, 170 credits (five 16 s tasks left at the upload; refunds expected ~3 h later, KF-003). Phone back in en-US (plain launch + locale reset).

### 2026-11-24T05:23:33.503Z · next TC-327 (MUI-DEU)
{"Fail":1,"Pass":5,"Not run":21}

Fixture made (English): one completed Video Enhance task, AI Video Enhance 1124, 0:11 on its Recent task card, from ve-1230-1080p60.mp4 (60fps · 1080p badge), Standard · Natural · 60fps · 1080p defaults, selection 00:00–00:10 (the trim handle ignores drags under ~23 px, so 10 s was reached as +23 s then −13 s from the start; not moved to 00:30). Price 22 credits (Enhance ◆ 22; 11 billed seconds × 2, KF-001). Tapped Enhance 13:06:16; upload ~13 min (0% → 90% at 13:16, gone 13:19:30; KF-013: over 1 minute), then Processing… '5 minutes left…' → View at ~13:23:15 (Processing 3.7 min, about 17 min in all). Recent task now: the completed card (View) and one old card with Retry and length 208333:20:00 (an earlier walk's cancelled upload, KF-010) — no card with View Details / Error, so the error-dialog step stays skipped. Screens FIX-01…06. Phone in en-US.

### 2026-11-24T05:29:11.905Z · next TC-328 (MUI-FRA)
{"Fail":2,"Pass":5,"Not run":20}

MUI-DEU done: TC-327 Fail (defect): panel title 「Video optimieren mit…」 ellipsized; Selected Length bubble covers the 「g」 descender of 「Ausgewählte」. Result/Save toast walked on the fixture task (card 0:11, 「Ansicht」). Doubt TD-W3 (Fix Bewegung). 20 credits (9 s task). Walk tips: Launcher may show the 「Good news」 banner first (back, back clears it); shortcut tap 881 1037; the 60fps 12:30 is the second 12:30 tile (x≈520); 10 s trim = drag right handle 980→120 (00:00), 160→200 (+23 s), 200→177 (−13 s); drags under ~23 px are ignored. Phone back in en-US.

### 2026-11-24T05:33:20.842Z · next TC-329 (MUI-ITA)
{"Fail":3,"Pass":5,"Not run":19}

MUI-FRA done: TC-328 Fail (defect): only the Selected Length time bubble over the 「g」 of 「Longueur」; no ellipsis. 22 credits. Walk helper: scratchpad walk.sh parts 1–3 (same steps as DEU). Phone back in en-US.

### 2026-11-24T05:37:27.741Z · next TC-330 (MUI-RUS)
{"Fail":3,"Pass":6,"Not run":18}

MUI-ITA done: TC-329 Pass, no VE truncation; TD-W4 (Launcher Cinematic Reel label cut, other feature); 22 credits. Phone back in en-US.

### 2026-11-24T05:43:04.235Z · next TC-331 (MUI-PTB)
{"Fail":4,"Pass":6,"Not run":17}

MUI-RUS done: TC-330 Fail (defect): fps chips 「N кадров/сек」 wrap and grow (second line hidden under Enhance on the opening view). Doubts TD-W5–W7. 22 credits. Launcher layout varies between visits: tap the shortcut by label (lbl Улучшение видео) when 881 1037 misses. Phone back in en-US.

### 2026-11-24T05:47:16.551Z · next TC-332 (MUI-NLD)
{"Fail":5,"Pass":6,"Not run":16}

MUI-PTB done: TC-331 Fail (defect): panel title 「Otimizador de vídeo …」 ellipsized; time bubble over the 「p」 of 「Comprimento」. 20 credits. Batch DEU–PTB: 1 Pass (ITA), 4 Fail (DEU, PTB title ellipsis; RUS fps chips; DEU/FRA/PTB time bubble over a descender), 106 credits for the five walks + 22 for the fixture task. Recent task has the completed fixture card (0:11) and only cancelled 「Retry」 cards (no View Details). Phone back in en-US. Next: TC-332.

### 2026-11-24T05:53:45.029Z · next TC-333 (MUI-IND)
{"Fail":5,"Pass":7,"Not run":15}

MUI-NLD done: TC-332 Fail (defect): panel title 「Video verbeteren me…」 ellipsized. TC-321 strings on screen: Demo checkbox 「Niet' meer tonen」 (ai_video_anime_checkbox), leave title; video_enhance_hint and 「Probeer & Enhance」 not shown anywhere (panel, preview play, full screen, Result). 22 credits. Launcher had two layouts again (first tap opened Horrorfilm; retaken as NLD-01b). Phone back in en-US.

### 2026-11-24T05:57:44.449Z · next TC-334 (MUI-THA)
{"Fail":5,"Pass":8,"Not run":14}

MUI-IND done: TC-333 Pass; notes: time bubble over 「Panjang」 j/g (OBS-MUI-1), clip toolbar group 「Sempurnaka / n」 mid-word break (TD-W8). Hint not shown. 22 credits. Helpers: scratchpad walk2.sh L CODE (part 1, retries the shortcut), walk3.sh L (parts 2+3), then tap the Enhance group in the clip toolbar by hand. Phone back in en-US.

### 2026-11-24T06:01:29.550Z · next TC-335 (MUI-MAY)
{"Fail":6,"Pass":8,"Not run":13}

MUI-THA done: TC-334 Fail (defect): panel title ellipsized; fps chips 「N เฟรมต่อวินาที」 wrap and grow (as RUS); clip toolbar AI Video Enhance label loses its 3rd line 「AI」. Hint not shown. 22 credits. Phone back in en-US.

### 2026-11-24T06:04:40.076Z · next TC-336 (MUI-HIN)
{"Fail":6,"Pass":9,"Not run":12}

MUI-MAY done: TC-335 Pass; note time bubble over 「Panjang」 j/g (OBS-MUI-1). Hint not shown. 22 credits. Phone back in en-US.

### 2026-11-24T06:08:07.782Z · next TC-337 (MUI-ESM)
{"Fail":6,"Pass":10,"Not run":11}

MUI-HIN done: TC-336 Pass, no truncation. Hint not shown. 22 credits. Phone back in en-US.

### 2026-11-24T06:11:23.118Z · next TC-338 (MUI-ARA)
{"Fail":6,"Pass":11,"Not run":10}

MUI-ESM done: TC-337 Pass, no truncation (note: upload dialog subtitle has no side padding). Hint not shown. 22 credits. Batch NLD–ESM: 2 Fail (NLD title; THA title, fps chips, toolbar label lost 「AI」), 4 Pass, 132 credits. video_enhance_hint and 「Probeer & Enhance」 not shown on any Video Enhance screen; 「Niet' meer tonen」 shown on the NLD Demo page (NLD-02-demo). Phone back in en-US. Next: TC-338.

### 2026-11-24T06:17:14.923Z · next TC-339 (MUI-VIT)
{"Fail":7,"Pass":11,"Not run":9}

MUI-ARA done: TC-338 Fail (defect): panel title 「تحسين الفيديو بالذكاء الا…」 ellipsized. Demo 「لا تظهر مرة أخرى'」 stray apostrophe on screen (TC-321); generating subtitle and hint not shown (walk cancels at upload). RTL: Launcher/Demo/panel not mirrored, Recent task/Result/bubbles mirrored (TD-W9); mixed digits (TD-W10). Launcher showed the grid layout first, then the top-entry layout (881 1037 works). 20 credits. Phone back in en-US.

### 2026-11-24T06:21:58.542Z · next TC-340 (MUI-PLK)
{"Fail":7,"Pass":12,"Not run":8}

MUI-VIT done: TC-339 Pass, no Video Enhance truncation. TC-321 strings: 「Đang Tải VideoLên」 not on screen (upload dialog uses video_enhance_v2_uploading 「Đang tải video lên…」), generating subtitle and hint not shown. TD-W11 (editor toolbar). 22 credits. Phone back in en-US.

### 2026-11-24T06:26:58.601Z · next TC-341 (MUI-TRK)
{"Fail":7,"Pass":13,"Not run":7}

MUI-PLK done: TC-340 Pass, no truncation; time bubble over 「Wybrana」 y (OBS-MUI-1). Hint not shown. TD-W12 price-line plural. walk.sh part 3 missed the View button when the 0:11 card sat at the bottom (y=2053): Result/Save retaken from Recent task. 20 credits. Phone back in en-US.

### 2026-11-24T06:31:07.527Z · next TC-342 (MUI-FAR)
{"Fail":7,"Pass":14,"Not run":6}

MUI-TRK done: TC-341 Pass, no truncation. 「Bir daha gösterme'」 on the Demo page (TC-321); 「& Enhance'i deneyin」 not shown. 48 credits (trim stopped at 00:23). Phone back in en-US.

### 2026-11-24T06:35:00.708Z · next TC-343 (MUI-HEB)
{"Fail":7,"Pass":15,"Not run":5}

MUI-FAR done: TC-342 Pass, no truncation; RTL layout as ARA (Demo/panel not mirrored, TD-W9; mixed digits as TD-W10). Hint not shown. 22 credits. Phone back in en-US.

### 2026-11-24T06:38:57.689Z · next TC-344 (MUI-SVE)
{"Fail":7,"Pass":16,"Not run":4}

MUI-HEB done: TC-343 Pass, no truncation (he-IL took, no iw needed); RTL layout as ARA/FAR (TD-W9). Hint not shown. 22 credits. Batch ARA–HEB: 1 Fail (ARA panel title), 5 Pass, 154 credits. Phone back in en-US. Next: TC-344.

### 2026-11-24T06:44:08.476Z · next TC-345 (MUI-DAN)
{"Fail":7,"Pass":17,"Not run":3}

MUI-SVE done: TC-344 Pass, no truncation; notes: Launcher shortcut 'Videoförbättri/ng' and clip toolbar 'AI-videoförbättrin/g' break mid-word (full). Hint not shown. 22 credits. Phone back in en-US.

### 2026-11-24T06:50:05.382Z · next TC-346 (MUI-NOR)
{"Fail":7,"Pass":18,"Not run":2}

MUI-DAN done: TC-345 Pass, no truncation; notes: time bubble on 'Valgt' g (OBS-MUI-1), toolbar 'AI-videoforbedrin/g' mid-word. First Enhance tap right after Wi-Fi on did nothing (network timeout); dialogs retaken, trim stopped at 00:23: 48 credits. Hint not shown. Phone back in en-US.

### 2026-11-24T06:53:55.851Z · next TC-347 (MUI-UKR)
{"Fail":7,"Pass":19,"Not run":1}

MUI-NOR done: TC-346 Pass, no truncation (panel title 'Forbedre video med AI' fits); time bubble on 'Valgt' g (OBS-MUI-1). Hint not shown. 48 credits (trim stopped at 00:23). Phone back in en-US.

### 2026-11-24T06:57:39.881Z · all recorded
{"Fail":7,"Pass":20}

MUI-UKR done: TC-347 Pass, no truncation; time bubble on 'Вибрана' р (OBS-MUI-1). 22 credits. Batch SVE–UKR: 4 Pass, 0 truncations, 140 credits. Phone back in en-US. Next: Part 2 (Result screens CHT–KOR), Part 3 (VIT/ARA generating subtitle).

### 2026-11-24T07:08:18.752Z · all recorded
{"Fail":7,"Pass":20}

Part 2 done: Result and Save toast walked on the completed 0:11 task for CHT, CHS, JPN, ESP, KOR (screenshots <TAG>-15c-recent, -16-result, -17-save-toast); no truncation (JPN 「タイムラインに追加」 wraps 加 to line 2, shown in full, note); TC-322–326 re-recorded Pass with the added screens. No credits. Phone back in en-US. Next: Part 3 (VIT/ARA generating subtitle, ~13 min upload each).

### 2026-11-24T07:11:54.508Z · all recorded
{"Fail":7,"Pass":20}

Part 3 BLOCKED (15:10): in VIT the 9 s selection's 「Cải thiện」 opened the PowerDirector Pro purchase page instead of the upload (VIT-29b-uploading, VIT-29c-after-iap); the Pro tab now reads Pro / Free with 'Get offer' (VIT-29d-pro-tab): the Google Play test subscription (yearly, license tester) has lapsed, so the account is free tier. The run brief says never buy anything, so the subscription was not bought again: VIT/ARA generating subtitles not captured, no credits used (balance 30018). Needs the user's go-ahead to re-buy the test subscription (AGENTS.md › Test purchases) or another Pro account. Phone back in en-US.

### 2026-11-24T07:15:21.046Z · all recorded
{"Fail":7,"Pass":20}

Pro re-subscribed (user, 2026-11-24): Mine/Pro tab 'Claim offer' → yearly NT$1190/Year (selected) → Continue → Google Play sheet 'PowerDirector Yearly Subscription', 'NT$1,190.00/30 min', 'Test card, always approves', 'This is a test subscription. It will recur according to this schedule. You will not be charged.' → Subscribe tapped 15:14:32. Pro tab at 15:15 reads 'You're on the highest plan…'; credits 30018 → 30118 (+100 monthly). Screens SUB-01-offer … SUB-04-pro-tab (SUB-03 first opened a Play legal link in Chrome by a label tap; back, then the button). Test sub renews every 30 min. Next: Part 3 VIT then ARA generating subtitle.

### 2026-11-24T07:37:09.274Z · all recorded
{"Fail":7,"Pass":20}

Part 3 retake (VIT) BLOCKED by S3 uploads: Pro re-bought 15:14 (test card sheet). VIT 10 s task 15:16 → upload dialog 「Đang tải video lên…」 (VIT-30-uploading), S3 Broken pipe after 91 s → Recent task Retry card (VIT-31-recent); Retry 15:18 → Connection reset 15:22 + 「Cần Trợ Giúp?」 (VIT-33c); new 9 s task 15:24 → Broken pipe at 94 %+ 15:36 (VIT-34-uploading, VIT-35-after-upload, VIT-36-recent-failed). Generating subtitle never shown; ARA not attempted. Credits: 30018 → +100 monthly (Pro) 30118 → 30076: 22 + 20 charged for the two failed tasks, not refunded by 15:37 (check later). Logs logs/VIT-upload-fail-20261124-153639. Phone back in en-US, Pro. Next: retry VIT/ARA when S3 uploads (cl-aol-media-demo s3-accelerate) work again, or on another network.
