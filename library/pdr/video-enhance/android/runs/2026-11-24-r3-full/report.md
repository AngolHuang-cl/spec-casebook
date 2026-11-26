# Video Enhance Android — R3 report (table v11, full run on a clean install)

- **Build:** PowerDirector Mobile for Android 16.9.0 (2611231), TR261123-0070 (SR DRA261109-01), APK MD5 checked against `Cyberlink.MD5`; the Play build 2611201 (MUI phase) uninstalled and the TR APK installed at setup.
- **Server:** Stage (yellow bar). **Phone:** Samsung SM-A5360, Android 15, on USB, Wi-Fi 17F_QA_Wifi_5G.
- **Account:** cltqauiap2@gmail.com, Google button sign-in (no password, no 403 this time). Pro from launch (the Play test subscription was still active); it lapsed three times and was bought again on the Play test sheet (see Purchases).
- **Table and draft:** table v11 (246 rows; the 27 MUI rows are their own phase), draft 20261124-150000, phases.json R3 (219 rows, R2's segment order, `origin` R2).
- **When:** 2026-11-24 17:44 → 2026-11-25 05:28 phone time (UTC+8); wrap-up 2026-11-25 from 05:28.
- **Status:** nothing filed, nothing committed.

## Final tally

**90 Pass, 120 Fail, 9 Blocked, 0 Not run** (219 rows). Fail: 83 defect, 37 question. Blocked: 5 test-data, 1 observability, 3 defect (behind DRA262611P0232). `blocked-reasons.json` labels all 9.

| Segment | Rows | Pass | Fail (defect / question) | Blocked |
|---|---|---|---|---|
| R3-a Entry points, Demo page, Add Media | 23 | 13 | 10 (5 / 5) | 0 |
| R3-i Free account rows, Pro purchase | 5 | 5 | 0 | 0 |
| R3-b Panel layout, bubble, trim | 27 | 12 | 15 (5 / 10) | 0 |
| R3-c Defaults, chips, Mode limits | 28 | 25 | 3 (3 / 0) | 0 |
| R3-d Price, eligibility, credit pack | 11 | 5 | 2 (2 / 0) | 4 |
| R3-d2 Price grid (36 combinations) | 36 | 0 | 36 (36 / 0) | 0 |
| R3-e Generating, cancel, background, notifications | 20 | 12 | 5 (3 / 2) | 3 |
| R3-f Recent task, Result, failure | 23 | 11 | 10 (10 / 0) | 2 |
| R3-g1 Standard combinations | 18 | 0 | 18 (17 / 1) | 0 |
| R3-g2 Professional combinations | 18 | 0 | 18 (2 / 16) | 0 |
| R3-h Timeline entry | 10 | 7 | 3 (0 / 3) | 0 |

(TC-004 ran in R3-i once the account was Free; it stays counted in its own segment R3-a.)

## Compared with R2 (`runs/2026-11-18-r2-full`, build 2611091, same 219 row IDs)

| R2 → R3 | Rows | Which |
|---|---|---|
| Fail → Pass | 1 | **TC-173** (refund after a server failure). Not a fix: R3's failed task ended `applyEffect status: Error` and was refunded at once; R2's ended `apply effect 401` after a 70-min upload and was refunded hours later. R3's upload and 401 failures were again refunded only 2 h 14 min – 3 h 39 min later (O-16), so held R2 ISS-VEA-41 still reproduces. |
| Fail → Fail | 120 | Every other R2 failure, with the same disposition. |
| Pass → Fail | 0 | |
| Blocked → Blocked | 9 | Same 9 rows (TC-096, TC-098, TC-207, TC-320 low balance; TC-174 no fault switch; TC-268 no task 2 days old; TC-119 / TC-120 / TC-211 behind DRA262611P0232). |
| Pass → Pass | 89 | |

- **Fixed on 2611231:** TC-037 step 1, DRA262611P0230 (play with the playhead at the selection end now jumps to the selection start and plays; ticket status NeedCodeReview). TC-037 still fails on its full-screen steps (DRA262611P0092). Information only: no comment on the ticket.
- **Behaviour changed, verdict unchanged:** the 8:00 limit bubble now hides by itself a few seconds after release (O-4, DRA262611P0093; TC-044 / TC-216 still fail on the Preview lag, DRA262611P0113).
- **Newly failing / newly blocked:** none.
- **Headline:** 1 not reproduced for a different failure kind (TC-173), 1 step fixed (TC-037 step 1), 120 still failing, 1 new finding (S3 upload drops, below).

## eBug drafts: 1 new (nothing filed)

`library/pdr/video-enhance/android/ebugs/2026-11-24-r3/`: drafts `20261125_eBug_drafts_Video-Enhance-R3_16.9.0.md`, review page `20261125_eBug_review_Video-Enhance-R3_16.9.0.html` (built by `scripts/ebug-review.ts`; no overflow at 600 px with every section open). Format check 0 errors, 0 warnings (`check.txt`); `verify_ebug_drafts.py` reports only the usual "unknown sheet" for the Figma Spec Link (`verify.txt`). The page prefills Creator ETHAN_HSU, [AIAgent] and API from batch 2026-11-24-mui and TR261123-0070 / 2611231 from `review.json` (each to confirm).

| # | ISS | Finding | Rows | Type · Owner |
|---|---|---|---|---|
| 1 | VEA-56 | Short-clip uploads break off at S3 (「unexpected end of stream」 / 「Broken pipe」); the charged task ends on a Retry card | TC-112, TC-121, TC-133, TC-267 first tries; O-6, O-13 | Functional · RD |

- 4 of 18 uploads failed (3 s ◆ 4 at 20:33, 1:30 ◆ 180 at 20:41, 3 s ◆ 4 at 21:04, 0:30 ◆ 31 at 21:33); the other 14 finished in 63–199 s. Log excerpt and the red-boxed Recent task screenshot on the card. Related, not duplicates: DRA262611P0236 (slow upload), DRA262611P0083 (failed card length).
- **Network doubt:** the knowledge pass added KP-105 (17F_QA_Wifi_5G loses packets, from the AIGC Watermark recheck). Recheck a few short uploads on 17F-QAAPP-2.4G before filing VEA-56, or file it for RD to judge the missing retry.
- **Dedupe** (`ecl_query.py dedupe`, PowerDirector Mobile for Android, 209 candidates, 60 open on 16.9.0, each read against the entry): no duplicate. Every other R3 failure sits on its open Android ticket (`dedupe.txt`, 32 tickets, incl. R2's filed P0231 – P0235); O-7 (Leave did not stop the S3 PUT) is DRA262611P0094. PM rulings P0088 (Close), P0096 (Cancelled), P0097 (Close) cited as in R2. The 1.033 s → 2 credits and 30 s → 31 s billing are P0076 / P0075.
- **Not drafted (still-failing R2 findings, never filed):** ISS-VEA-39 (failed task shows the grey placeholder, TC-170), ISS-VEA-40 (「View Details」 opens 「Need Help?」, TC-171), ISS-VEA-41 (refund ~3 h after a failure). R2 held them because they could not be re-exercised on 2611181; R3 reproduced all three on 2611231. Listed under Held on the review page.
- **O-9** (smear trails on a 1080p result) is not a defect: seen only on the synthetic ve-000396 pattern, not on a real clip at 1080p (O-15).

## PM and table questions (no eBug drafted)

- **Closed PM tickets P0088 / P0096 / P0097** (from R2): TC-013, TC-144, TC-152 and the combination rows still fail only on these rulings (「Saved to Gallery」 keeps most of TC-239 – TC-254 failing). The table has not taken the rulings yet: a user decision.
- **KP-070:** Credit Details again dropped the 2026-11 group after local midnight (R3-g1 – R3-h); ledger read from logcat. Still held for a daytime and month-boundary recheck.
- **O-5:** the credit-pack follow-up offer now reads 1000 credits (the row says 100, R2 saw 50) and the pack page opens on an Annual Auto Pass card; the row only needs 「Not now」.
- **O-8:** a Retry on a failed upload re-uploaded and the task ended `applyEffect status: Error` (refunded at once); seen once.

## Credits, purchases and refunds

- **Charged:** 1,944 credits (R3-e 232, R3-f 256, R3-g1 208, R3-g2 1,008, R3-h 240), each at the Enhance tap (KF-002); after local midnight read from logcat getCreditHistory (KP-070).
- **Refunds:** +403: +4 at 21:08 (21:04 task, applyEffect Error, at once), +4 23:40, +180 and +4 00:19, +31 00:40, +180 01:19 (the upload failures and the 401 task, 2 h 14 min – 3 h 39 min later). None outstanding. Net 1,541.
- **Purchases** (Google Play test sheet 「Test card, always approves」 / 「You will not be charged」, no password; AGENTS.md *Test purchases in the app*): Pro test subscription 19:19:42 (TC-095), 23:22:26, 03:20:12 (lapsed ~18:44, 23:05, ~02:50; O-3, O-12); 500-credit pack 19:54:17 (TC-097). +100 Monthly Credit Bonus at each Pro purchase; +30 loyalty bonus at the TC-013 re-sign-in.
- **Balance:** 30,638 (setup, 17:49) → 30,009 (05:27).

## Phone and settings changes

- PowerDirector uninstalled and the TR APK installed (setup); `pm clear` once for TC-013 (logs pulled first), then Get Started, every permission allowed, Google sign-in (bindMemberSuccess 0).
- Every video folder hidden for TC-023 and restored with identical MediaStore counts (1,189); the system recreated `/sdcard/Movies/.thumbnails` meanwhile, moved aside to `/sdcard/.casebook-recreated/Movies-20261124` so the restore could run (`phone-settings.ts restore` refuses when a folder reappears: script gap, not fixed).
- Notifications off 20:21 – 20:31 for TC-118 … TC-120 / TC-211, back on and read back.
- Wi-Fi off/on for TC-100 (19:56), online again after.
- Google Drive consent granted for the test account (TC-255).
- Add Media sort changed for picking and set back to Date / Descending each segment. Phone on the Launcher, Stage, Pro.
- Several 「Project 11-24」 / 「Project 11-25」 test projects left in the app's Project list.

## Blockers

None on the device. 9 rows stay Blocked (above). No usage-limit pause.

## Time, tokens, usage, coverage

- **Time** (`run-log.ts time --cases`): wall 11 h 43 m (17:44 → 05:28), test time 9 h 06 m, idle 2 h 37 m in 6 gaps over 15 min (long upload waits: the 70-min 01:30 1080p upload, R3-h's 23.5-min uploads). Per segment: a 52 m, i 12 m, b 25 m, c 26 m, d 18 m, d2 20 m, e 1 h 00 m, f 48 m, g1 1 h 26 m, g2 2 h 31 m, h 47 m.
- **Tokens** (run folder ledger `tokens.jsonl`, Progress page, claude-opus-5-5). Run (setup to R3-h): 1,513 messages; input 3.3 k, cache write 3.30 M, cache read 265.0 M, output 575 k; 268.9 M processed, 3.88 M fresh (input + cache write + output); 33.5 M weighted.
- **Plan usage, 「est. from token rate」** (`runs/usage-calibration.json`, Android borrows iOS P1): run ≈ **271 %** of a 1× Pro 5-hour window (≈ 2.7 windows), weekly ≈ 46 % of a 1× Pro week; ≈ 43 % / 7 % of the 6.25× Team seat. Account total (shared, upper bound): 181 % 5-hour and 37.5 % weekly Pro-% during the active spans (`runs/usage.jsonl`, weekly 20 % → 26 % of the seat from R3 prepare to wrap-up start).
- **Coverage** (`coverage-page.ts pdr/video-enhance android --runs 2026-11-24-r3-full` → `android/coverage.html`): controls 75 ran, 3 blocked, 50 n/a; flow arrows 33 ran, 2 blocked; spec notes 99 of 112 traced (71 ran, 4 blocked, 24 n/a); board images 11 of 12. Same as R2. No tap proof (Android writes no `taps.jsonl`).
- **Design captures** rode on the run on the release build, without view data: they do not count for the design check (REQ-013).

## Observations

16 (O-1 – O-17; no O-14 entry in `observations.md`, its content, the hand-set 「00:30」 / 「01:30」 priced 31 / 91 s, is in the R3-d2 log line and on DRA262611P0075). Each is mapped in the drafts' row map: on the card (O-6, O-13), on existing tickets (O-4 P0093, O-7 P0094, O-11 P0081), held R2 ISS-VEA-41 (O-10, O-16), the rest not raised with a reason.

## Local run media

Per AGENTS.md *Local run media: newest run only* (R3 is now the newest complete full run): 2,765 files, 1,730.8 MiB moved to the Trash under `run-media-prune-20261125/pdr-spec-casebook/` with the folder layout kept — R2 (`2026-11-18-r2-full`) 2,008 files, 1,414.7 MiB (PNG 782.5, MP4 460.4, other files over 1 MiB 171.9) and the MUI run (`2026-11-24-mui`) 757 files, 316.0 MiB (PNG 258.5, other over 1 MiB 57.5). R1, the P0076 check and the two design runs had no untracked media left. Git-tracked files, small text and logs up to 1 MiB stay. The user empties the Trash.

## Knowledge

Knowledge-inbox subagent (domain-knowledge skill), its reply:

> Inbox and R3 observations processed; `knowledge.ts pdr/video-enhance --check` passes (121 entries; 114 for pdr/aigc-watermark). Nothing committed, nothing read from logs/.
> Corrected KP-068 (shortest test subscription 3 h 28 min; 「Expired」 −100 after 「Returned」 +20; tap Subscribe by bounds), KP-071 (follow-up pack varies, 50 or 1000; Annual Auto Pass card pre-selected), KP-078 (`lbl Pro` also matches 「New Project」), KF-003 (refunds 3 h 7 min – 3 h 39 min after the charge; applyEffect Error refunded at once), KF-010 (small uploads also break off on a lossy Wi-Fi; Retry re-uploads with no new charge; Leave / Home do not stop the upload), KF-005 / KF-007 (R3 timings, stale banner).
> Verified on 2611231: KF-001, 002, 004, 006, 008, 009, 011, 013; KP-003, 006, 008, 067, 070, 072, 074, 075, 093, 094, 101, and the corrected entries.
> Added KP-105 (17F_QA_Wifi_5G loses packets and breaks uploads; recheck on 17F-QAAPP-2.4G before filing), KF-014 (Recent task has two layouts by entry path, O-11), KF-015 (synthetic ve-000396 smears at 1080p, a real clip does not, O-9 / O-15).
> Inbox I-002 filed as KP-106 (Pro AI voices produce on a stable network); KP-104 superseded by KP-106.
> Left out: O-1, O-2, O-4, the phone-settings restore gap, the stale Appium session, the IAP 「Continue」 wait.
> Watch: the Android run brief is ~29.5 KB, above the skill's ~20 KB guideline; merge or trim later.
