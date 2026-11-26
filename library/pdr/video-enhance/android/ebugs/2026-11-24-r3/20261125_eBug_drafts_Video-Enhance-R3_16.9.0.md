# AI Video Enhance (Android) — eBug drafts, round R3 (table v11), PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-24-r3-full/` — round R3 of draft `drafts/20261124-150000` (table v11, 219 non-MUI cases), 2026-11-24 17:44 → 2026-11-25 05:28 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, build 2611231, TR261123-0070 (SR DRA261109-01), Stage server, account cltqauiap2@gmail.com, fresh install. Tally: 90 Pass, 120 Fail, 9 Blocked.

**Status:** nothing filed, uploaded or commented. New findings only: every R3 row failed as in R2, so every failed row sits on an existing Android ticket (`dedupe.txt`, per OS, overlay rule 7), on a citation, or on one of the three R2 findings that were held and never filed, drafted here (entries 1–3). One finding was new in this run (ISS-VEA-56); it did not reproduce and was dropped. The review page prefills the filing account from the newest filed batch (`ebug-defaults.ts pdr/video-enhance android`).

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link on its own line and an image on every entry, the logcat excerpt on every failure- or charge-related one, no video). Owner and type: defects RD (Functional or [UI]); open questions and findings with no spec basis to PM (AGENTS.md 2026-11-11). Severity proposed as 2, as for the earlier Video Enhance batches.

**What is drafted:** 3 entries, all defects, owner RD: the R2 findings ISS-VEA-39 / 40 / 41, held in R2 because they could not be re-exercised on 2611181 and never filed. R3 reproduced all three on 16.9.0.2611231 (TR261123-0070) on real server failures, and their evidence (screenshots red-boxed, log excerpts) is from that run (`generators/held.py`). Deduped again against the whole Android pool on 2026-11-25 (`dedupe.txt`): no same-OS match. ISS-VEA-56 (S3 upload breaks) was dropped by the user on 2026-11-25 after the recheck (`runs/2026-11-25-r3-upload-recheck/result.md`): 24 uploads on two networks, 0 breaks, so the R3 breaks were network loss (KP-105). It is listed under Not raised. ISS-VEA-19 and ISS-VEA-26 stay held by the reviewers' rulings and are not drafted.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-39 — A task that failed on the server shows the grey placeholder, not the 「Error」 thumbnail  ·  Class: UI  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-170  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Held in R2 (found on 2611091, not re-exercised on 2611181), never filed; R3 reproduced it on 16.9.0.2611231 (TR261123-0070) on two real server failures (Android has no fault switch for Video Enhance): (1) the 21:54 task (ve-0130-1080p30, 01:30, ◆ 180, TC-152's run) uploaded for 70 min, then 「apply effect response code->401」 at 23:05:23; its card reads 「2026/11/24 · 1:30」 / 「View Details」 with the grey placeholder (TC-152-failed.png); (2) the 21:04 task (3.2 s 720p, ◆ 4) ended 「applyEffect status: Error null」 at 21:08:03 after a retried upload (O-8); its card (TC-170, 21:25) has 「View Details」 and no Retry, as expected, but the same placeholder. R-140 (Design Alternative & Exception, Generation Failed: Recent frame 3293:15910 draws an 「Error」 thumbnail with 「View Details」; Routing Logic 失敗卡片 「Error 縮圖 + View Details」; PM 失敗與退款). The placeholder is the one the upload-failed 「Retry」 cards use. Dedupe (Android, 2026-11-25): related, not the same, DRA262611P0083 (open, RD: a cancelled task's card with a nonsense length and Retry; its Expect also names the Error thumbnail, but its Result is the cancelled card): the 「888:53:20」 length on card (2) is P0083's symptom and is not repeated here; this entry is the server-failed card, whose length (1:30) and button (View Details) are right. Closed DRA262604-0094 (same failed task twice) and DRA242410-0021 (no View details button) are other symptoms.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Failed task card shows the grey placeholder, not the 「Error」 thumbnail
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 1:30 1080p video in Add Media
4. Tap 「Enhance」
5. Wait until the task fails on the server
6. Look at the failed task's card in Recent task
7. Check the result

Result:
The failed task's card (「View Details」, no Retry) shows the grey placeholder thumbnail, not the 「Error」 thumbnail.
摘要：伺服器端失敗的任務卡片顯示灰色預設縮圖，而非「Error」縮圖。
{16.9.0_vea39_401_card_placeholder.jpg} {16.9.0_vea39_error_card_placeholder.jpg} {16.9.0_vea39_log.txt}

Expect Result:
The failed task's card shows the 「Error」 thumbnail with 「View Details」 (R-140).
摘要：失敗任務卡片應顯示「Error」縮圖與 View Details。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Alternative & Exception board (Generation Failed: Recent card with the Error thumbnail) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-15910
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Routing Logic board (失敗卡片: Error 縮圖 + View Details) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-14560
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Video-Enhance-R3_16.9.0_images/01_ISS-VEA-39/`

---

## 2. ISS-VEA-40 — 「View Details」 on a failed task opens 「Need Help?」 instead of the error dialog that says the credits were refunded  ·  Class: UI  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-171  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Held in R2, never filed; reproduced in R3 on 16.9.0.2611231 (TR261123-0070) on both real failed cards of ISS-VEA-39: TC-171 (21:26) on the 21:04 task (applyEffect status Error) and again on the 21:54 task (apply effect 401, TC-152-viewdetails.png). R-141 / R-191 (Design Alternative & Exception flow arrow 3393-18071: the failed card's 「View Details」 → Recent 3393:18196 with the dialog; PM 失敗與退款 arrow 377-1127): 「An Error Has Occurred」 / 「Credits have been refunded.」 / 「The server may be busy. Please try again later or use a different video.」 with 「OK」. The app opens a customer-service dialog 「Need Help?」 / 「For further assistance, please contact customer service.」 with 「Not now」 and 「Send Feedback」; 「Not now」 closes it and Recent task stays (TC-210 Pass on system Back); 「Send Feedback」 was not tapped. Nothing tells the user the credits come back: the 21:04 task was refunded at the failure (+4 at 21:08:03, log), the 401 task only 2 h 14 min later (ISS-VEA-41). Text owner RD: the Design and PM state the dialog text and the app shows another dialog (text rule, 2026-11-11). Dedupe (Android, 2026-11-25): no open ticket on this dialog; DRA242410-0021 (closed, 14.5.0: no View details button) is another symptom.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Failed task's 「View Details」 opens 「Need Help?」, not the error dialog
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 1:30 1080p video in Add Media
4. Tap 「Enhance」
5. Wait until the task fails on the server
6. Tap 「View Details」 on the failed task's card in Recent task
7. Check the result

Result:
A dialog 「Need Help?」 with 「Not now」 and 「Send Feedback」 opens; it says nothing about the error or the credits.
摘要：點失敗卡片的 View Details 開啟「Need Help?」客服對話框，未說明錯誤與點數退還。
{16.9.0_vea40_need_help_dialog.jpg} {16.9.0_vea40_need_help_dialog_401_card.jpg} {16.9.0_vea40_log.txt}

Expect Result:
The dialog 「An Error Has Occurred」 / 「Credits have been refunded.」 with 「OK」 opens (R-141).
摘要：應開啟「An Error Has Occurred」對話框，說明點數已退還，並有 OK 按鈕。
Spec string: 「An Error Has Occurred」
Spec string: 「Credits have been refunded.」
Spec string: 「The server may be busy. Please try again later or use a different video.」

[AI Recommendation]
Title: An Error Has Occurred
Body: Credits have been refunded. The server may be busy. Please try again later or use a different video.
Buttons: OK

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Alternative & Exception board (flow arrow 3393-18071: View Details to 「An Error Has Occurred」) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3393-18071
Spec Link: AI Video Enhance PM spec, 失敗與退款 board (arrow 377-1127: failure dialog) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=377-1127
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Video-Enhance-R3_16.9.0_images/02_ISS-VEA-40/`

---

## 3. ISS-VEA-41 — Credits of a task that failed come back only 2–3.5 hours after the failure, not at the failure  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-112, O-10, O-16  ·  **Reproduce:** 4/5  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Held in R2 (needed a real failure and a 3+ hour wait), never filed; R3 reproduced it on 16.9.0.2611231 (TR261123-0070). R-142 (Design Routing Logic 「生成失敗系統自動退還 credit」; PM 失敗與退款 §8.6) and KP-007 (team rule: a missing or late refund is a defect with its own eBug). Five charged tasks failed in R3 with no user action (Credit Details and the app's getCreditHistory records, log): −180 21:54 (01:30 1080p, apply effect 401 at 23:05:23) → +180 at 01:19:08 (2 h 14 min after the failure; R3-f-ledger.png at 23:17 shows no refund); −180 20:40 (TC-112, S3 upload broke off at 20:49:41) → +180 at 00:19:08 (3 h 29 min); −4 20:33 → +4 at 23:40 (3 h 4 min, TC-226-ledger.png); −31 21:33 → +31 at 00:40 (3 h 6 min). Only the 21:04 task that ended 「applyEffect status: Error」 was refunded at the failure (+4 at 21:08:03), which is why TC-173 passed in R3. The S3 breaks themselves were network loss (ISS-VEA-56 dropped, KP-105); the late refund is the server's. The refunds have no app log line (server side). Dedupe (Android, 2026-11-25): related, different trigger: DRA262611P0079 / P0094 (open, RD: Home or 「Leave」 during the upload charged, refunded ~3 h later); a task that fails by itself is not covered by them. The failed-upload 「Retry」 card of TC-112 (「25000:00:00」) is DRA262611P0083 and is not repeated.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Credits of a failed task come back only 2–3.5 hours after the failure
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 1:30 1080p video in Add Media
4. Tap 「Enhance」
5. Wait until the task fails on the server
6. Tap ⌂ in Recent task
7. Tap 「Video Enhance」 on the Launcher
8. Tap a video in Add Media
9. Tap the credit balance in the panel's top bar
10. Tap 「Details」 on My Credits
11. Check the result

Result:
After the failure Credit Details has only 「Video Enhancer -180」; the refund came 2 h 14 min later (others: about 3 h).
摘要：任務失敗後點數未立即退還，退款紀錄 2–3.5 小時後才出現。
{16.9.0_vea41_no_refund_after_401.jpg} {16.9.0_vea41_refund_3h_later.jpg} {16.9.0_vea41_log.txt}

Expect Result:
The credits come back automatically when the task fails: balance restored, refund row in Credit Details (R-142).
摘要：任務失敗時應立即自動退還點數，餘額回復並出現退款紀錄。
Spec string: 「生成失敗系統自動退還 credit」

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Routing Logic board (「生成失敗系統自動退還 credit」) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-14560
Spec Link: AI Video Enhance PM spec, 失敗與退款 board (§8.6 automatic refund) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=369-441
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Video-Enhance-R3_16.9.0_images/03_ISS-VEA-41/`

---


## Already filed on Android (dedupe.txt only, not drafted)

Every other R3 failure is on the ticket R2 named (`dedupe.txt`), plus R2's filed DRA262611P0231 – P0235 (TC-023, TC-118 and its three Blocked rows, TC-315, TC-316, TC-317). O-7 (「Leave」 did not stop the S3 PUT; no refund until hours later) is DRA262611P0094. DRA262611P0230 (play at the selection end) did not reproduce on 2611231 (TC-037 step 1 now plays): information only, no comment.

## Cited instead of filed

| Question | Rows | Answered by | Why not filed |
|---|---|---|---|
| Q-18 backgrounding during the upload | TC-115 | DRA262611P0079 | As R2. |
| 「Don't show again」 saved on ‹ | TC-013 | DRA262611P0088 (Close) | PM ruling, as R2; the table still expects the old behaviour (user decision). |
| Save Result toast 「Saved to Gallery」 | TC-152, TC-223 – TC-254 | DRA262611P0096 (Cancelled) | PM ruling, as R2; the rows still fail on it (user decision). |
| 「Select」 offers only Delete | TC-144 | DRA262611P0097 (Close) | As R2. |
| Q-9 Back from Add Media | TC-021, TC-201 | DRA242410-0142 | As R2. |

## Not raised (observations, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| O-1 | First-run bubble back after `pm clear` | Local flag, expected. |
| O-2 | Play at the selection end now plays (2611231) | DRA262611P0230 looks fixed; information only. |
| O-3 / O-12 / O-17 | Pro test subscription lapsed and was re-bought | Environment (KP-068). |
| O-4 | 8:00 cap bubble now hides by itself after release | Behaviour change on DRA262611P0093; TC-044 / TC-216 still fail on it. |
| O-5 | Follow-up offer 「1000 Credits」, Annual Auto Pass card pre-selected | Not in the Video Enhance spec. |
| ISS-VEA-56 | 4 of 18 short-clip uploads broke off at S3 (「unexpected end of stream」 / 「Broken pipe」); charged task ended on Retry, refunded ~3 h later | Dropped by the user 2026-11-25: 0 breaks in 24 uploads on 17F-QAAPP-2.4G and 17F_QA_Wifi_5G (`runs/2026-11-25-r3-upload-recheck/`); network loss (KP-105). The app does not retry a broken upload by itself (not filed). |
| O-8 | Retry on a failed upload re-uploaded, then the task ended 「applyEffect status: Error」 (refunded at once) | Seen once; one other retry (new task) worked. With the dropped ISS-VEA-56. |
| O-9 / O-15 | Smear trails on the 1080p result of the synthetic ve-000396 pattern only | Not seen on a real clip at 1080p (O-15): pattern-specific, not a defect. |
| O-11 | Recent task via 「Enhance More」 has ‹ and ⌂ | Variant of DRA262611P0081. |
| KP-070 | Credit Details drops the current month after local midnight | As R2 (O-25 / O-31), held for a daytime and month-boundary recheck. |
| Blocked (9) | 5 test-data, 1 observability, 3 behind DRA262611P0232 | No verdict. |

## Reconciliation against the run

120 Fail (83 defect, 37 question), 9 Blocked (5 test-data, 1 observability, 3 defect), 16 observations (O-1 – O-17; no O-14 entry in observations.md, its content is in the R3-d2 log line: DRA262611P0075). Each maps to an entry here (1–3, the R2 findings ISS-VEA-39 / 40 / 41 held in R2 and drafted now: TC-170, TC-171, TC-112, O-10, O-16), an Android ticket (dedupe), a citation, or not raised; a row may map to several. Entries: 0 new R3 findings (ISS-VEA-56 dropped) + 3 R2 findings reproduced on 2611231 = 3.

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-002 | Fail | defect | dedupe DRA262611P0071 |
| TC-011 | Fail | defect | dedupe DRA262611P0086 |
| TC-201 | Fail | defect | cited DRA242410-0142 |
| TC-021 | Fail | question | cited DRA242410-0142 |
| TC-315 | Fail | question | dedupe DRA262611P0233 (PM, filed from R2 ISS-VEA-43) |
| TC-316 | Fail | question | dedupe DRA262611P0234 (PM, filed from R2 ISS-VEA-44) |
| TC-317 | Fail | question | dedupe DRA262611P0235 (PM, filed from R2 ISS-VEA-45) |
| TC-022 | Fail | defect | dedupe DRA262611P0101; dedupe DRA262611P0089 |
| TC-023 | Fail | defect | dedupe DRA262611P0231 (filed from R2 ISS-VEA-37) |
| TC-013 | Fail | question | cited DRA262611P0088 (Close) |
| TC-033 | Fail | defect | dedupe DRA262611P0074 |
| TC-259 | Fail | question | dedupe DRA262611P0074; dedupe DRA262611P0075; dedupe DRA262611P0117 |
| TC-037 | Fail | defect | dedupe DRA262611P0092 (steps 4–5); step 1 now passes (DRA262611P0230 looks fixed on 2611231) |
| TC-270 | Fail | defect | dedupe DRA262611P0076 |
| TC-042 | Fail | question | dedupe DRA262611P0113 |
| TC-214 | Fail | question | dedupe DRA262611P0113 |
| TC-043 | Fail | question | dedupe DRA262611P0091 |
| TC-215 | Fail | question | dedupe DRA262611P0074; dedupe DRA262611P0208 |
| TC-044 | Fail | question | dedupe DRA262611P0093; dedupe DRA262611P0113 |
| TC-216 | Fail | question | dedupe DRA262611P0093; dedupe DRA262611P0113 |
| TC-272 | Fail | question | dedupe DRA262611P0113 |
| TC-045 | Fail | question | dedupe DRA262611P0090 |
| TC-264 | Fail | question | dedupe DRA262611P0090 |
| TC-046 | Fail | defect | dedupe DRA262611P0087 |
| TC-217 | Fail | defect | dedupe DRA262611P0087 |
| TC-052 | Fail | defect | dedupe DRA262611P0115 |
| TC-263 | Fail | defect | dedupe DRA262611P0075 |
| TC-274 | Fail | defect | dedupe DRA262611P0075 |
| TC-269 | Fail | defect | dedupe DRA262611P0089; dedupe DRA262611P0076 |
| TC-096 | Blocked | test-data | blocked test-data (low balance) |
| TC-320 | Blocked | test-data | blocked test-data (low balance) |
| TC-207 | Blocked | test-data | blocked test-data (low balance) |
| TC-098 | Blocked | test-data | blocked test-data (low balance) |
| TC-100 | Fail | defect | dedupe DRA262611P0077 |
| TC-278 | Fail | defect | dedupe DRA262611P0075 |
| TC-279 | Fail | defect | dedupe DRA262611P0075 |
| TC-280 | Fail | defect | dedupe DRA262611P0075 |
| TC-281 | Fail | defect | dedupe DRA262611P0075 |
| TC-282 | Fail | defect | dedupe DRA262611P0075 |
| TC-283 | Fail | defect | dedupe DRA262611P0075 |
| TC-284 | Fail | defect | dedupe DRA262611P0075 |
| TC-285 | Fail | defect | dedupe DRA262611P0075 |
| TC-286 | Fail | defect | dedupe DRA262611P0075 |
| TC-287 | Fail | defect | dedupe DRA262611P0075 |
| TC-288 | Fail | defect | dedupe DRA262611P0075 |
| TC-289 | Fail | defect | dedupe DRA262611P0075 |
| TC-290 | Fail | defect | dedupe DRA262611P0075 |
| TC-291 | Fail | defect | dedupe DRA262611P0075 |
| TC-292 | Fail | defect | dedupe DRA262611P0075 |
| TC-293 | Fail | defect | dedupe DRA262611P0075 |
| TC-294 | Fail | defect | dedupe DRA262611P0075 |
| TC-295 | Fail | defect | dedupe DRA262611P0075 |
| TC-296 | Fail | defect | dedupe DRA262611P0075 |
| TC-297 | Fail | defect | dedupe DRA262611P0075 |
| TC-298 | Fail | defect | dedupe DRA262611P0075 |
| TC-299 | Fail | defect | dedupe DRA262611P0075 |
| TC-300 | Fail | defect | dedupe DRA262611P0075 |
| TC-301 | Fail | defect | dedupe DRA262611P0075 |
| TC-302 | Fail | defect | dedupe DRA262611P0075 |
| TC-303 | Fail | defect | dedupe DRA262611P0075 |
| TC-304 | Fail | defect | dedupe DRA262611P0075 |
| TC-305 | Fail | defect | dedupe DRA262611P0075 |
| TC-306 | Fail | defect | dedupe DRA262611P0075 |
| TC-307 | Fail | defect | dedupe DRA262611P0075 |
| TC-308 | Fail | defect | dedupe DRA262611P0075 |
| TC-309 | Fail | defect | dedupe DRA262611P0075 |
| TC-310 | Fail | defect | dedupe DRA262611P0075 |
| TC-311 | Fail | defect | dedupe DRA262611P0075 |
| TC-312 | Fail | defect | dedupe DRA262611P0075 |
| TC-313 | Fail | defect | dedupe DRA262611P0075 |
| TC-110 | Fail | defect | dedupe DRA262611P0078 |
| TC-112 | Fail | defect | 3. ISS-VEA-41 (refund 3 h 29 min after the failure); S3 upload broke off (dropped ISS-VEA-56, network); dedupe DRA262611P0083 (card length) |
| TC-115 | Fail | question | cited DRA262611P0079 |
| TC-118 | Fail | defect | dedupe DRA262611P0232 (filed from R2 ISS-VEA-38) |
| TC-211 | Blocked | defect | dedupe DRA262611P0232 |
| TC-119 | Blocked | defect | dedupe DRA262611P0232 |
| TC-120 | Blocked | defect | dedupe DRA262611P0232 |
| TC-133 | Fail | question | dedupe DRA262611P0095; its first try hit the dropped ISS-VEA-56 (network) |
| TC-140 | Fail | defect | dedupe DRA262611P0082 |
| TC-141 | Fail | defect | dedupe DRA262611P0081 |
| TC-208 | Fail | defect | dedupe DRA262611P0081 |
| TC-152 | Fail | defect | cited DRA262611P0096 (Cancelled) |
| TC-144 | Fail | defect | dedupe DRA262611P0082; cited DRA262611P0097 (Close) |
| TC-265 | Fail | defect | dedupe DRA262611P0084 |
| TC-266 | Fail | defect | dedupe DRA262611P0084 |
| TC-267 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0076 (◆ 31); its first try hit the dropped ISS-VEA-56 (network) |
| TC-268 | Blocked | test-data | blocked test-data (no task 2 days old) |
| TC-170 | Fail | defect | 1. ISS-VEA-39 (held in R2, never filed; reproduced on 2611231) |
| TC-171 | Fail | defect | 2. ISS-VEA-40 (held in R2, never filed; reproduced on 2611231) |
| TC-174 | Blocked | observability | blocked observability (no server-failure switch) |
| TC-223 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-225 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-224 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-226 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-221 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-227 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-228 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-222 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-229 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-230 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-220 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-231 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-232 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-233 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-234 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-235 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-236 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-237 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-238 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-219 | Fail | defect | dedupe DRA262611P0084; dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-239 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-240 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-241 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-242 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-243 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-244 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-245 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-246 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-247 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-248 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-249 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-250 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-251 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-252 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-253 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-254 | Fail | question | dedupe DRA262611P0116; cited DRA262611P0096 (Cancelled) |
| TC-161 | Fail | question | dedupe DRA262611P0099 |
| TC-162 | Fail | question | dedupe DRA262611P0100 |
| TC-165 | Fail | question | dedupe DRA262611P0100 |
| O-1 | observation | — | not raised |
| O-2 | observation | — | not raised (DRA262611P0230 fixed: information only, no comment) |
| O-3 | observation | — | not raised |
| O-4 | observation | — | dedupe DRA262611P0093 (bubble now hides by itself) |
| O-5 | observation | — | not raised |
| O-6 | observation | — | not raised (dropped ISS-VEA-56) |
| O-7 | observation | — | dedupe DRA262611P0094 |
| O-8 | observation | — | not raised |
| O-9 | observation | — | not raised (O-15) |
| O-10 | observation | — | 3. ISS-VEA-41 |
| O-11 | observation | — | dedupe DRA262611P0081 |
| O-12 | observation | — | not raised |
| O-13 | observation | — | not raised (dropped ISS-VEA-56) |
| O-15 | observation | — | not raised |
| O-16 | observation | — | 3. ISS-VEA-41 |
| O-17 | observation | — | not raised |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 2, 3 |
| PM | — |

### Filing order

1, 2, 3 (ISS-VEA-39, ISS-VEA-40, ISS-VEA-41), in that order: 1 and 2 are the same failed card, 3 the refund behind it. ISS-VEA-56 was dropped (network).
