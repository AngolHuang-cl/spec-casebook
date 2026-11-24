# TC-321 flagged strings seen on the phone (Video Enhance, Android, build 2611201)

Which of TC-321's Fails (review-asia.md, review-europe.md) actually show on a Video Enhance screen in the phone walks
TC-322 –. The account is Pro, so no purchase screen is on the walk; a string not seen on any walked screen is listed
as "not shown".

| Language | Key | Screen | Screenshot | Shown as in the APK? |
|---|---|---|---|---|
| CHT | iap_golden_week_terms_of_service | not shown on any walked screen (Launcher, Demo, Add Media, panel, bubbles, toast, upload and leave dialogs, Recent task, clip toolbar) | screenshots/CHT-01 … CHT-19b | not seen (Pro account, no purchase screen) |
| CHS | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/CHS-01 … CHS-19b | not seen (Pro account, no purchase screen) |
| JPN | (no TC-321 Fail for JPN) | — | — | — |
| ESP | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/ESP-01 … ESP-19b | not seen (Pro account, no purchase screen) |
| KOR | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/KOR-01 … KOR-19b | not seen (Pro account, no purchase screen) |
| DEU | iap_golden_week_terms_of_service | not shown on any walked screen (Launcher, Demo, Add Media, panel, bubbles, toast, upload and leave dialogs, Recent task, Result, Save toast, clip toolbar) | screenshots/DEU-01 … DEU-19b | not seen (Pro account, no purchase screen) |
| FRA | iap_golden_week_terms_of_service | not shown on any walked screen (Launcher, Demo, Add Media, panel, bubbles, toast, upload and leave dialogs, Recent task, Result, Save toast, clip toolbar) | screenshots/FRA-01 … FRA-19b | not seen (Pro account, no purchase screen) |
| ITA | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/ITA-01 … ITA-19b | not seen (Pro account, no purchase screen) |
| ITA | video_enhance_credits_deduction_duration_confirm_message | not shown (the walk has no credit confirm dialog: Pro account, short tasks) | screenshots/ITA-01 … ITA-19b | not seen |
| RUS | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/RUS-01 … RUS-19b | not seen (Pro account, no purchase screen) |
| PTB | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/PTB-01 … PTB-19b | not seen (Pro account, no purchase screen) |
| NLD | ai_video_anime_checkbox | Demo page checkbox (shown 「Niet' meer tonen」, stray apostrophe) | screenshots/NLD-02-demo.png | yes, exactly as in the APK |
| NLD | dont_show_message_again | not shown (the Video Enhance Demo page uses ai_video_anime_checkbox) | screenshots/NLD-02-demo.png | not seen |
| NLD | video_enhance_hint | not shown on the panel, while the preview plays, in the full-screen preview or on the Result | screenshots/NLD-04-panel.png, NLD-09-preview-play, NLD-10-preview-full, NLD-16-result | not seen |
| NLD | video_enhance_generate_button | not shown: the Demo button reads 「Probeer nu」 and the panel CTA 「Verbeteren」 | screenshots/NLD-02-demo.png, NLD-04-panel.png | not seen |
| NLD | video_enhance_v2_leave_title | Leave dialog title (shown 「Weet Je Zeker Dat Je Wilt Stoppen Met Bewerken?」) | screenshots/NLD-13-leave.png | yes, exactly as in the APK |
| NLD | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/NLD-01 … NLD-19b | not seen (Pro account, no purchase screen) |
| IND | video_enhance_hint | not shown on any walked screen (panel, preview, Result; NLD probe: also not during play or in the full-screen preview) | screenshots/IND-04-panel.png, IND-16-result.png | not seen |
| IND | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/IND-01 … IND-19b | not seen (Pro account, no purchase screen) |
| THA | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/THA-04-panel.png, THA-16-result.png | not seen |
| THA | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/THA-01 … THA-19b | not seen (Pro account, no purchase screen) |
| MAY | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/MAY-04-panel.png, MAY-16-result.png | not seen |
| MAY | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/MAY-01 … MAY-19b | not seen (Pro account, no purchase screen) |
| HIN | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/HIN-04-panel.png, HIN-16-result.png | not seen |
| HIN | iap_golden_week_terms_of_service | not shown on any walked screen | screenshots/HIN-01 … HIN-19b | not seen (Pro account, no purchase screen) |
| ESM | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/ESM-04-panel.png, ESM-16-result.png | not seen |
| ARA | ai_video_anime_checkbox | Demo page checkbox (shown 「لا تظهر مرة أخرى'」, stray apostrophe after the text) | screenshots/ARA-02-demo.png | yes, exactly as in the APK |
| ARA | dont_show_message_again | not shown (the Video Enhance Demo page uses ai_video_anime_checkbox) | screenshots/ARA-02-demo.png | not seen |
| ARA | video_enhance_generating_subtitle | not shown: the dialog right after 「حسّن」 is the upload dialog (「جاري رفع الفيديو…」 / 「يرجى إبقاء التطبيق مفتوحًا」, no English); the generating text only follows a finished upload (~13 min), which the walk cancels | screenshots/ARA-12-processing.png | not seen |
| ARA | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/ARA-04-panel.png, ARA-16-result.png | not seen |
| VIT | video_enhance_uploading_video | not shown: the dialog right after 「Cải thiện」 is titled 「Đang tải video lên…」 (video_enhance_v2_uploading, correct); 「Đang Tải VideoLên」 shows on no walked screen | screenshots/VIT-12-processing.png | not seen |
| VIT | video_enhance_generating_subtitle | not shown: the dialog after 「Cải thiện」 has only 「Đang tải video lên…」 / 「Vui lòng giữ ứng dụng mở」; the generating text only follows a finished upload (~13 min), which the walk cancels | screenshots/VIT-12-processing.png | not seen |
| VIT | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/VIT-04-panel.png, VIT-16-result.png | not seen |
| ARA | video_enhance_uploading_video | not shown (upload dialog uses video_enhance_v2_uploading 「جاري رفع الفيديو…」) | screenshots/ARA-12-processing.png | not seen |
| PLK | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/PLK-04-panel.png, PLK-16-result.png | not seen |
| TRK | ai_video_anime_checkbox | Demo page checkbox (shown 「Bir daha gösterme'」, stray apostrophe) | screenshots/TRK-02-demo.png | yes, exactly as in the APK |
| TRK | video_enhance_generate_button | not shown: the Demo button reads 「Şimdi deneyin」 and the panel CTA 「Geliştir」; 「& Enhance'i deneyin」 shows on no walked screen | screenshots/TRK-02-demo.png, TRK-04-panel.png | not seen |
| FAR | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/FAR-04-panel.png, FAR-16-result.png | not seen |
| HEB | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/HEB-04-panel.png, HEB-16-result.png | not seen |
| SVE | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/SVE-04-panel.png, SVE-16-result.png | not seen |
| DAN | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/DAN-04-panel.png, DAN-16-result.png | not seen |
| NOR | video_enhance_hint | not shown on any walked screen (panel, preview, Result) | screenshots/NOR-04-panel.png, NOR-16-result.png | not seen |
| VIT | video_enhance_uploading_video | not shown (Part 3 retake, Pro re-bought): the upload dialog after 「Cải thiện」 reads 「Đang tải video lên…」 / 「Vui lòng giữ ứng dụng mở」 / 「Hủy」 (video_enhance_v2_uploading, correct); 「Đang Tải VideoLên」 shows nowhere | screenshots/VIT-30-uploading.png, VIT-34-uploading.png | not seen |
| VIT | video_enhance_generating_subtitle | not reached: three uploads in a row failed at S3 (15:16 Broken pipe after 91 s; Retry 15:18 Connection reset after 3 min 45 s; new 9 s task 15:24 Broken pipe at 94 %+ after 11.5 min, logs/VIT-upload-fail-20261124-153639); each time the app went straight to Recent task with a Retry card (208333:20:00), then 「Xem Chi Tiết」, plus a 「Cần Trợ Giúp?」 dialog; no generating screen | screenshots/VIT-31-recent.png, VIT-33c-retry-failed.png, VIT-36-recent-failed.png | not seen |
| ARA | video_enhance_generating_subtitle | not attempted on 2026-11-24 15:37: same S3 upload path failing three times in a row on 17F_QA_Wifi_5G | — | not seen |
