# Video Enhance Android — R2 report (table v10, full run on a clean install)

- **Build:** PowerDirector Mobile for Android 16.9.0 (2611091), the same build as R1 (TR261109-0041, SR DRA261109-01), APK MD5 checked, uninstalled and installed again at setup.
- **Server:** Stage. **Phone:** Samsung SM-A5360, Android 15, on USB.
- **Account:** cltqauiap2@gmail.com, Google button sign-in (no password). Free at the start; Pro test subscription bought when paid rows came (it lapsed three times, see Purchases).
- **Table and draft:** table v10 (219 rows; 51 new since R1), draft 20261117-105552, phases.json R2, REQ-022.
- **When:** 2026-11-18 09:21 → 2026-11-19 04:46 phone time (UTC+8); wrap-up 2026-11-19 from 04:47.
- **Status:** nothing filed, nothing committed.

## Final tally

**89 Pass, 121 Fail, 9 Blocked, 0 Not run** (219 rows). Fail: 84 defect, 37 question. Blocked: 5 test-data, 1 observability, 3 defect (upstream of TC-118).

| Segment | Rows | Pass | Fail (defect / question) | Blocked |
|---|---|---|---|---|
| R2-a Entry points, Demo page, Add Media | 23 | 13 | 10 (5 / 5) | 0 |
| R2-i Free account rows, Pro purchase | 5 | 5 | 0 | 0 |
| R2-b Panel layout, bubble, trim | 27 | 12 | 15 (5 / 10) | 0 |
| R2-c Defaults, chips, Mode limits | 28 | 25 | 3 (3 / 0) | 0 |
| R2-d Price, eligibility, credit pack | 11 | 5 | 2 (2 / 0) | 4 |
| R2-d2 Price grid (36 combinations) | 36 | 0 | 36 (36 / 0) | 0 |
| R2-e Generating, cancel, background, notifications | 20 | 12 | 5 (3 / 2) | 3 |
| R2-f Recent task, Result, failure | 23 | 10 | 11 (11 / 0) | 2 |
| R2-g1 Standard combinations | 18 | 0 | 18 (17 / 1) | 0 |
| R2-g2 Professional combinations | 18 | 0 | 18 (2 / 16) | 0 |
| R2-h Timeline entry | 10 | 7 | 3 (0 / 3) | 0 |

R2-x (04:27–04:46) reran the rows Blocked for a phone setting or consent; their results sit in their own segments (TC-255, TC-023 in R2-a; TC-118 – TC-120, TC-211 in R2-e).

## Compared with R1 (`runs/2026-11-10-r1-full`, 168 rows, same build)

| R1 → R2 | Rows | Which |
|---|---|---|
| Fail → Pass | 1 | TC-131: DRA262611P0080 (black Result from the banner's View) **not reproduced**, not fixed: same build, and the banner was tapped after the task had finished, so R1's race was not hit. |
| Fail → Fail (still failing) | 66 | Every other R1 failure, all on their R1 tickets (P0071 – P0101). |
| Pass → Fail | 8 | TC-037 (new defect: play at the selection end does nothing), TC-052 (step 1, the 1 fps source, is new in v10), TC-112 (slow link: upload ended S3 400; card 「25000:00:00 / Retry」, P0083), TC-043 (direction, P0091, filed after R1), **TC-042, TC-214, TC-044, TC-216 (evidence method)**. |
| Blocked → Fail (newly runnable) | 5 | TC-023 (empty gallery), TC-118 (notifications off), TC-170, TC-171, TC-173 (a real server failure came). |
| Blocked → Pass (newly runnable) | 3 | TC-255 (Drive consent), TC-097 (credit pack, approved purchase), TC-210. |
| Blocked → Blocked | 8 | Low balance (3), TC-174, TC-268, TC-119 / TC-120 / TC-211 (now behind the TC-118 defect). |
| Pass → Pass | 77 | |
| New rows (v10) | 51 | 8 Pass, 42 Fail, 1 Blocked. The 42: 36 price-grid rows (P0075), TC-270 (P0076), TC-274 (P0075), TC-272 (drag lag), TC-315 / TC-316 / TC-317 (iOS-observed UI). |

- **Verdicts changed only by the evidence method.** TC-042, TC-214, TC-044 and TC-216 passed in R1 from screenshots; R2 judged them from screen recordings of the whole drag on fixtures with burned-in time (run-android.md › Judging a drag; v10 added the 「no visible lag」 check, Q-27): bubble, Preview time, length and price follow at once, the Preview frame stays on an older frame for up to ~2 s. TC-215 failed in R1 for P0074 and now also on the lag (the knob is DRA262611P0208, filed 2026-11-17 by another tester). TC-272 is a new row judged the same way.
- **Disposition changes without a behaviour change:** TC-219 – TC-222, TC-224 – TC-238 question → defect (v10 checks the task time against R-204, P0084); TC-152 / TC-144 question → defect; TC-259 / TC-215 defect → question.
- **Behaviour changed on the same build:** TC-115 Home during the upload no longer ends the task (upload ran on in the background, task finished; R1: the background call failed); still Q-18 / P0079.
- **Headline:** 0 fixed (same build), 1 not reproduced, 66 still failing, 55 new Fail rows (9 new eBug drafts; the rest on existing tickets), 8 rows newly runnable.

## eBug drafts: 9 new (nothing filed)

`library/pdr/video-enhance/android/ebugs/2026-11-18-r2/`: drafts `20261119_eBug_drafts_Video-Enhance-R2_16.9.0.md`, review page `20261119_eBug_review_Video-Enhance-R2_16.9.0.html`, generators in `generators/`. Format check 0 errors, 0 warnings (`check.txt`, 9 entries); `verify_ebug_drafts.py` reports only "unknown sheet" for the Figma Spec Links, as for every Video Enhance batch. Every severity proposed S2. The page prefills Creator ETHAN_HSU, TR261109-0041, [AIAgent], API from batch 2026-11-11-r1c (each to confirm).

| # | ISS | Finding | Rows | Type · Owner |
|---|---|---|---|---|
| 1 | VEA-35 | Play does nothing when the playhead sits at the selection's end | TC-037, O-8 | Functional · RD |
| 2 | VEA-37 | Empty gallery: Add Media shows the partial-access prompt, not an empty state | TC-023 | Functional · RD |
| 3 | VEA-38 | With notifications off, no 「Turn on notifications」 dialog after the upload | TC-118 (TC-119/120/211 behind it), O-32 | Functional · RD |
| 4 | VEA-39 | Failed task card shows the grey placeholder, not the 「Error」 thumbnail | TC-170, O-19 | UI · RD |
| 5 | VEA-40 | Failed task's View Details opens 「Need Help?」, not the error / refund dialog | TC-171 | UI · RD |
| 6 | VEA-41 | Failed task's credits refunded only 2.5–3 h after the failure (KP-007) | TC-173, TC-112 | Functional · RD |
| 7 | VEA-43 | No import overlay / 「Cancel」 when picking a video (iOS-observed UI) | TC-315 | UX proposed · PM |
| 8 | VEA-44 | Add Media sort keys differ from iOS | TC-316 | UX proposed · PM |
| 9 | VEA-45 | Empty Recent task reads 「No Generated Videos」, not 「No results found」 | TC-317 | UI · PM |

- **Withdrawn after the full-pool dedupe (2026-11-19):** the first dedupe searched only Short Descriptions containing 「AI Video Enhance」 (90 of the 182 Android Video Enhance tickets) and its word-overlap ranking scored the rewordings under the cut, so two open Android tickets filed 2026-11-12 on 2611091 were missed. **VEA-36** (1 fps: no fps chip selected, TC-052) is **DRA262611P0115** 「A 1fps source has no selectable output frame rate」 and **VEA-42** (Preview frame lags a dragged trim handle, Q-27; TC-042, TC-214, TC-216, TC-044, TC-272) is **DRA262611P0113** 「Clarification: allowed Preview delay while trimming」 (both Assigned, RD): left off the drafts and the page, kept in `dedupe.txt`. Also now in `dedupe.txt`: **DRA262611P0116** (Credit Details names the debit 「Video Enhancer」, TC-219 – TC-254, which were cited to the iOS DRI261895P0021) and **DRA262611P0117** (source total 02:30 for 150.03 s, TC-259). **DRA262611P0114** (credit-pack purchase returns to My Credits) matches no R2 failure (TC-097 passed). Every open 16.9.0 ticket in the pool (33) was read against every draft; no other match.
- **Logs:** cards 3–6 carry their logcat excerpt (charge at the tap, the 70-min upload, 「apply effect response code->401」, the S3 400; refunds have no app line). Images on every card; no video.
- **UX cards** are drafted Class Functional (the format checks reject `[AIAgent][UX]` drafts) and preset to Type UX on the review page, as R1b did.
- **Dedupe (whole Android Video Enhance pool, 182 tickets, read-only; `dedupe-query.txt`, `dedupe.txt`).** Open Android tickets cover the other failures (P0071, P0073 – P0078, P0081 – P0084, P0086, P0087, P0089 – P0093, P0095, P0099 – P0101, P0113, P0115 – P0117, and DRA262611P0208 for the knob): kept in `dedupe.txt` only, no comment added. Status read 2026-11-19: all open except P0072 (cancelled, REQ-011) and three PM tickets closed on this same build: **P0088 (Close)** 「Don't show again」 saved on ‹ (TC-013), **P0096 (Cancelled)** 「Saved to Gallery」 (TC-152, TC-223 and the 36 combination rows), **P0097 (Close)** 「Select」 offers only Delete (TC-144). The API gives no reason; they are read as PM rulings and cited, not re-filed. The table should take these rulings (38 rows fail only on 「Saved to Gallery」): a user decision.
- **Not checked at 600 px:** the browser pane refused the local file (as in R1); the page uses the R1b wrap rules.

## PM and table questions (no eBug drafted)

- **O-1:** after the reinstall Recent task listed none of R1's tasks although it says 「Tasks are stored on the cloud for 1 year」 (KF-009). PM question.
- **O-25 / O-31:** after local midnight Credit Details opened on 「2026-10」 with no 2026-11 group (twice, also after a relaunch); possible defect, recheck in daytime and across a month boundary before filing (KP-070).
- **O-30:** the Timeline panel bills a 00:30 clip at 30 s, Add Media at 31 s (KF-001 padding).
- **O-5 / O-6 / O-12:** no ⓘ while the whole video fits; the Professional bubble wording; the 50-credit follow-up offer and Backup Protection dialog: no row states them (next analysis).
- **Closed PM tickets P0088 / P0096 / P0097:** update TC-013, TC-144, TC-152 and the combination rows to the rulings.

## Credits, purchases and refunds

- **Charged:** 1,937 credits in 53 tasks (R2-e 252, R2-f 217, R2-g1 212 incl. one stray −4 from an agent batch error (O-24), R2-g2 1,008, R2-h 240, R2-x 8), each stamped at the Enhance tap (KF-002); after local midnight matched from logcat getCreditHistory (O-25).
- **Refunds:** +390: +180 16:40 (TC-112, upload 400 at 13:48), +30 20:16 (TC-113 Leave at 17:07), +180 21:16 (TC-152, apply effect 401 at 18:51). Net 1,547.
- **Purchases** (Google Play test sheet 「Test card, always approves」, no charge, no password; approved by the user for this run): Pro test subscription 10:24:38, 17:04:26, 22:06:10, 02:20:15 (renews every 30 min; lapsed ~13:54, by 20:34 and by 02:09; O-17, O-23, O-26, O-28); 500-credit pack 12:45:22 (TC-097).
- **Other ledger rows:** +100 Monthly Credit Bonus at each Pro purchase (4×), −12 and −3 bonus taken back at lapses, +30 Loyalty Credit Bonus at the 04:35 sign-in.
- **Balance:** 30,194 (Free, 09:35) → 29,562 (Pro, 04:46); the ledger reconciles exactly.

## Phone and settings changes

- PowerDirector uninstalled and installed again (setup); `pm clear` twice (10:07 for TC-013, 04:34 for TC-118), each followed by Get Started, every permission allowed and the Google sign-in.
- Wi-Fi off/on for TC-100 (12:47–12:48); switched to the saved 17F-QAAPP-2.4G 22:20–22:27 and back (O-22).
- Every video folder hidden from MediaStore for TC-023 (04:32–04:34), restored with identical counts (885).
- PowerDirector notifications off for TC-118 (04:34–04:46), back on and read back.
- Google Drive consent accepted for the test account (TC-255).
- Add Media sort changed for picking and set back to Date / Descending each time. All restored; phone on Mine (Pro), Stage.

## Blockers

None on the device. 9 rows stay Blocked: TC-096, TC-098, TC-207, TC-320 (low balance), TC-174 (failure while backgrounded; no fault switch on Android), TC-268 (no task 2 days old), TC-119, TC-120, TC-211 (behind ISS-VEA-38). Three usage-limit pauses.

## Time, tokens, usage, coverage

- **Time.** Wall 19 h 24 m (09:21 → 04:46). Paused at usage limits 10:57–12:02, 14:08–17:01, 19:22–22:02 (6 h 38 m): **active run time 12 h 46 m**. `run-log.ts time` also drops five upload waits over 15 min (TC-152's 70-min upload, R2-h's 23–24-min uploads; 2 h 27 m): test time 10 h 19 m. Per segment (test time): a 57 m, i 14 m, b 32 m, c 33 m, d 14 m, d2 29 m, e 1 h 34 m, f 46 m, g1 1 h 34 m, g2 2 h 38 m, h 48 m.
- **Tokens** (run folder ledger, Progress page, claude-opus-5-5). Run (setup to R2-x): 1,749 messages; input 3.9 k, cache write 8.73 M, cache read 307.9 M, output 707 k; 317.3 M processed, 9.44 M fresh (input + cache write + output). Wrap-up so far: 97 messages, 18.5 M processed.
- **Plan usage, 「est. from token rate」** (`runs/usage-calibration.json`: iOS P1 = 300 % of a 1× Pro 5-hour window for 37.08 M weighted tokens; weights input 1, cache write 1.25, cache read 0.1, output 5): run ≈ **366 %** of a 1× Pro 5-hour window (≈ 3.7 windows), weekly ≈ 61 % of a 1× Pro week; with the wrap-up so far 388 % / 65 %. Account total (shared, Team seat 6.25×, upper bound): 1,431 % 5-hour and 481 % weekly Pro-% during the active spans (`runs/usage.jsonl`, 29 snapshots).
- **Coverage** (`coverage-page.ts pdr/video-enhance android --runs 2026-11-18-r2-full` → `android/coverage.html`): controls 75 ran, 3 blocked, 50 n/a (R1: 66 / 12 / 50); flow arrows 33 ran, 2 blocked (R1: 26 / 9); spec notes 99 of 112 traced (71 ran, 4 blocked, 24 n/a); board images 11 of 12. No tap proof (Android writes no `taps.jsonl`).
- **Design captures** rode on the run on the release build, without view data: they do not count for the design check (REQ-013).

## Observations

34 (O-1 – O-34) in `observations.md`, each mapped in the drafts file: on cards (O-8, O-15, O-19, O-23, O-32; O-10 in a note), on existing tickets (O-2 P0073, O-7 P0091, O-9 / O-14 P0075, O-34 P0086), cited (O-18 P0079), the rest not raised with a reason.

Knowledge-inbox subagent (domain-knowledge skill), its reply:

> The knowledge inbox was empty, so nothing was filed from it; `knowledge.ts --check` passes (85 entries OK).
> Corrected KF-004 (O-20: a processing card can turn completed in place; neither behaviour is reliable; Back once landed on the AI Mini Drama intro, O-16).
> Corrected KP-068: the Play test subscription renews every 30 min and ends after a few renewals (~3.5–5.5 h); the unused bonus is taken back at the lapse; the app acts Pro until a relaunch; re-buy from a fresh sheet (an old one fails with responseCode 6).
> Verified on 16.9.0 / 2611091: KF-001 (+ Timeline exception, O-30), KF-003 (+ 400/401 upload failures, 3 h 9 m – 3 h 36 m), KF-005 (slower uploads), KF-008 (+ Google Photos picks), KF-007.
> Added KF-009 (Recent task lists only this install's tasks), KF-010 (a very long upload fails the task), KF-011 (hand-set trims land on x.y s), KF-012 (credit pill opens My Credits).
> Added KP-070 (Credit Details drops the current month after local midnight), KP-071 (50-credit offer and Backup Protection dialog), KP-072 (what a Pro purchase or sign-in changes), KP-073 (sort-order ids reuse the key ids).
> Left out as not durable knowledge: O-4 – O-6, O-8, O-11, O-21, O-24, O-27, O-32, O-34. Nothing committed.

## What the user decides

1. **The eBug review page** (9 cards): file or hold, severity, owner and type.
2. **The three closed PM tickets** (P0088, P0096, P0097): take them as rulings and update the table rows.
3. **O-25 / O-31** (Credit Details month): recheck in daytime before filing.
