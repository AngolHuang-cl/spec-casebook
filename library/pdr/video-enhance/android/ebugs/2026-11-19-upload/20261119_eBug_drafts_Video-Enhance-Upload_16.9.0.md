# AI Video Enhance (Android) — eBug draft, slow upload, PDR-A 16.9.0 build 2611181

**Source:** the user's ruling of 2026-11-19 (「for the upload problem, anything more than 1 minute is unacceptable」, KF-013, REQ-027) on the upload timings of round R2 (`library/pdr/video-enhance/android/runs/2026-11-18-r2-full/`, 2611091), reproduced on 16.9.0.2611181 (TR261118-0074) on 2026-11-19 at 10:46, 10:48 and 11:35 (`../2026-11-18-r2/recheck-2611181/verdicts.md` › Slow upload).

**Status:** nothing filed. Dedupe (whole Android pool, 「Video Enhance」 / 「AI Video Enhance」, 2026-11-19): no ticket on the upload leg. Related, not the same: DRA262611P0084 (total task time against 1.5–2.5× the length), DRA262608-0071 / 0072 (processing progress), DRA252508-0102 (closed NAB, 15.6.0: 「Always displays 100% while uploading」): the ring was declined then, so this card asks only for the time and describes the ring as a symptom.

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay. Severity proposed 2, as for the other Video Enhance batches.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-46 — Uploading even a 1 MB clip takes 65 s; the ring sits at 100% for about a minute  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-110, O-15, O-22  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611181

> **QA note — not pasted into eBug.** Standard: the user's ruling 2026-11-19 (an upload over 1 minute is unacceptable, KF-013); the spec gives no upload time, so the Expect Result cites the ruling and the Design's upload dialog (R-085, VE · 03 Generating). On 2611181 the 1.02 MB clip ve-real-000320-720p30 uploaded in 65.0 s three times (「Upload to S3: start」 → 「upload response code->200」: 10:46:34 → 10:47:39, 10:48:30 → 10:49:35, 11:35:04.690 → 11:36:09.713). In the 11:35 pass the dialog read 「0%」 at +2–4 s and 「100%」 from +6 s to +68 s (32 readings), then closed; the app logs nothing during that minute. Wi-Fi 17F_QA_Wifi_5G, 5 GHz, RSSI −58, 195 Mbps; the identical 65 s whatever the clip and a ring already at 100% point to a fixed wait (a timeout, or the server holding its answer) rather than the network — a reading, not proven. R2 on 2611091 (52 uploads, 4 h 26 m in all): 1.02 MB 64–74 s (41 uploads), 0.47 MB 65 s, 0.13 MB 17 s, 4.42 MB 9 min 54 s, 7.63 MB about 23 min 18 s (4), 22.8 MB 70 min 7 s, 37.8 MB 18 min 47 s, 92.5 MB 25 min 41 s then failed with code 400. R1 (2026-11-10, same build) uploaded a 3 s clip in about 1 s (KF-005), so the slowness may have started on the server side. If you prefer the [Performance] tag as on DRA262611P0084, change the Short Description on the review page.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: A 1 MB upload takes 65 s; the ring sits at 100% for about a minute
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap 「Try It Now」 on the Demo page
4. Tap a 3 s 720p video of about 1 MB in Add Media
5. Tap 「Enhance」
6. Wait until Recent task opens
7. Check the result

Result:
A 1.02 MB clip takes 65 s to upload; the ring shows 「100%」 after 6 s, then waits about a minute.
摘要：1 MB 影片上傳要 65 秒，進度環 6 秒就到 100% 後停約一分鐘。
{16.9.0_vea46_upload_0pct_4s.jpg} {16.9.0_vea46_upload_100pct_6s.jpg} {16.9.0_vea46_upload_100pct_56s.jpg} {16.9.0_vea46_log.txt}

Expect Result:
The upload finishes within 1 minute (QA standard, 2026-11-19).
摘要：上傳應在 1 分鐘內完成。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Related: round R2 on 2611091: 7.6 MB took about 23 min, 22.8 MB 70 min, 92.5 MB failed after 26 min (code 400)
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 03 Generating: upload dialog with progress ring; time standard: QA ruling 2026-11-19, over 1 minute is unacceptable) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261119_eBug_drafts_Video-Enhance-Upload_16.9.0_images/01_ISS-VEA-46/`
