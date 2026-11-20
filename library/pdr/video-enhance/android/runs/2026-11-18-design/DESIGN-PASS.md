# Video Enhance — Android design pass (2026-11-18, build 2611171)

Design check (figma skill › `references/conformance.md`, step 2 *A design pass*, *All or again*) for
`pdr/video-enhance`, Android, on the current build. Plan: `android/design/plan.json` — 33 Design screens, 31 routed by
19 rows; 3293:15910 and 3393:18196 (a failed Recent task) excluded: no fault switch on Android.
Screens in journey order: `design.ts pdr/video-enhance android screens`.

The 2026-11-13 pass on the OPPO Reno 11 (build 2611091) captured 24 of 31; this pass captures all 31 again on the
current build, so the check is made on one complete set.

## Setup

- Phone: Google Pixel 10 (frankel), adb serial 58221FDCR003BJ, Android 16, 1080 × 2424.
- Build: PowerDirector 16.9.0 (2611171), re-signed debuggable (`android-viewdump.ts prepare --yes-uninstall`,
  approved by the user 2026-11-18: app data cleared). Original APK kept in `~/.casebook/android/apks/`.
- App language: English (per-app locale; the phone's system language is 繁體中文 — always relaunch with
  `launch --lang en`, a plain `launch` puts Chinese back).
- First launch after the re-install: 「Get Started」 accepted, notifications allowed, the IAP page closed.
- Server: Stage (`/sdcard/cyberlink/PDR/testserver.config` present, empty).
- Videos: `Movies/casebook-ve/` holds ve-000320-720p30, ve-0030-1080p30, ve-0130-1080p30, ve-0500-1080p30,
  ve-1230-1080p60 (casebook-ve-real is not on this phone).
- Account: chenallencw@gmail.com (AllenCW Chen), signed in with the phone's Google button, **Free** at the start
  (`GoogleBillingWrapper: updateSubscribingStatus: false`). REQ-013 account order: the Free-only screens first (D1),
  the paid ones (D2) once a Pro account is available. Any purchase needs the user's go-ahead in chat with the price.

## Segments

| Seg | Screens | Rows | Status |
|---|---|---|---|
| D1 | 7 (Free) | TC-020 TC-042 TC-090 TC-093 | done: 5 captured, 2 kept in scope and not captured |
| D2 | 24 (Pro) | TC-001 TC-010 TC-003 TC-031 TC-038 TC-042 TC-096 TC-110 TC-111 TC-113 TC-114 TC-117 TC-134 TC-143 TC-150 TC-095 | done in D2a + D2b + D2c: 24 captured |

## Log

Each segment appends: captured count, screens not captured (id + reason), credits before/after, account tier,
anything half-done, log pull folder.

### D1 (2026-11-18, 15:49–16:09 Taipei)

**Captured 5 of 7**, all with view data (debuggable build, fontScale 1.0, density 2.625), none `unsettled`,
all dark / keyboard down, Free account, app in English, Stage server.

| Screen | Row | State captured |
|---|---|---|
| 3294:30796 | TC-020 | automatic, on the tap that opened the panel with ve-1230-1080p60 (15/19 texts) |
| 3310:38462 | TC-042 | the same panel by hand (same drawn state as 3294:30796: selection 00:00–08:00, playhead 00:00) |
| 3305:34438 | TC-090 | playhead dragged to **01:01** (Figma 01:00), Selected Length 08:00 |
| 3300:32182 | TC-090 | right trim handle dragged to Selected Length **05:54** (Figma 06:00), playhead **02:33** (Figma 02:30) |
| 3293:13415 | TC-090 | 「PowerDirector Pro」 IAP page opened from the panel CTA |

**Not captured (2).**

- **3293:13491** — the frame does not draw 「Monthly」 selected: it draws the **store purchase sheet** over the IAP
  page (Figma crop: the iOS App Store sheet, 「1-week free trial … NT$1,120.00 per year … Confirm with
  AssistiveTouch」). The Design's own arrow confirms it: `3293:13677 IAP_Btn --> IAP_US`, i.e. pressing **Continue**
  on 3293:13415. On Android that opens Google Play's purchase sheet, which this segment must not open (the account
  must stay Free). Not captured; not faked.
- **3293:13571** — the frame draws the **「You're all set / Your purchase was successful.」** dialog (arrow
  `3293:13678`, from the sheet). It needs a completed purchase. Not captured; not faked.
  Both are mis-routed in `design/plan.json` (route `TC-093`, control 「Yearly」, fit high): TC-093's 「Monthly」 /
  「Yearly」 taps only select a plan and never reach these two frames. The plan needs either a Pro-purchase route or
  an exclusion with that reason (scope review).

**State differences kept.** 3305:34438 at 01:01 instead of 01:00 and 3300:32182 at 05:54 / 02:33 instead of
06:00 / 02:30: the trim handle and the playhead move in ~1.8 px per second and ignore drags under the touch slop,
so the nearest reachable values were used. Times are words only; the standard check does not compare them, and the
drawn state (trimmed selection, playhead inside it, no hint bubble) matches.

**Extra capture, wrong fixture.** An `els` read on the 12:30-video panel auto-matched **3300:32521** (15/18 texts)
and saved it under TC-042. That frame draws the **01:30** clip whole (「00:00/01:30」, Selected Length 01:30); the
capture holds the 12:30 clip at 08:00. It is a D2 screen — D2 must hand-capture it with ve-0130-1080p30 (a hand
`design 3300:32521` always writes and the newest capture wins).

**Account.** chenallencw@gmail.com (AllenCW Chen), **Free** throughout (`GoogleBillingWrapper:
updateSubscribingStatus: false`; the ☰ menu offers 「Upgrade」). Nothing was purchased and no Google Play sheet was
opened. **Credit balance: none shown** — the credit pill in the panel's top bar holds only an icon, no number, and
logcat has `CreditSystemManager: getCreditRemain error, refreshMemberToken error / creditSystemUUID is null`.

**Half-done on the phone.** Nothing. The app is on the Launcher, English, Stage, Free; the trim state was left
behind with the panel. 「Don't show again」 on the Video Enhance demo dialog was **not** ticked (one-way state kept
for D2). File and media permissions were granted on the first entry (first launch after the re-install).

**Log folder.** `logs/D1-20261118-160835/`.

### Scope: 3293:13491 and 3293:13571 stay in (user, 2026-11-18)

D1 found both frames mis-routed in `android/design/plan.json` (route TC-093, control 「Yearly」): 3293:13491 draws the
store purchase sheet (Figma crop: the iOS App Store sheet, Design arrow 3293:13677 from 「Continue」 on 3293:13415) and
3293:13571 the 「You're all set / Your purchase was successful.」 dialog (arrow 3293:13678), which REQ-012 ruled is the
iOS dialog (TC-093 Notes say the same). The user asked to keep them in scope rather than exclude them, so this pass
leaves them **not captured** with that reason; the run covers 29 of the 31 routed screens.

### D2a (2026-11-18, 17:25–17:38 Taipei)

**Captured 7 of 7**, all with view data (debuggable build, fontScale 1.0), none `unsettled`, all dark / keyboard
down, **Pro** account, app in English, Stage server. Nothing generated, no credits spent, no Google Play sheet
opened.

| Screen | Row | How it was captured |
|---|---|---|
| 3293:14643 | TC-001 | by hand, Launcher as the app opens (Pro) |
| 3293:13055 | TC-001 | by hand, the same Launcher state — the two frames carry identical Figma texts and the crops differ only by the Main Flow copy's flow-arrow dot |
| 3294:23969 | TC-001 | automatic (3/3) on the tap of the Launcher's 「Video Enhance」 shortcut |
| 3293:13369 | TC-010 | automatic (3/5) on 「Try It Now」 → Add Media, Video tab |
| 3293:14941 | TC-003 | by hand: New Project with ve-0130-1080p30, clip selected, clip toolbar 「Enhance」 group open (AI Video Enhance / Fix Shake / AI Color / AI Video Upscaler), as the frame draws it |
| 3293:14884 | TC-134 | automatic (10/12) on the AI Magic tab scrolled to the 「AI Enhance」 section |
| 3328:45377 | TC-031 | automatic (16/19), subscribed panel with ve-1230-1080p60 (60fps · 1080p, Selected Length 08:00, Standard / Natural / 60fps, Enhance 960, credit pill 416) |

**State differences kept.** None. Every capture is in its frame's state; no `--anyway` was used. The panel capture
leaves the Resolution row partly behind the floating Enhance CTA — Figma draws it the same way (the frame's
Resolution texts sit at y 726–778 under the CTA at y 722–782), so no `--part 2` was taken.

**Observations (nothing filed).**

- **Demo page copy is Auto Reframe's.** 3294:23969 on the phone reads 「AI reframe your video for any aspect ratio,
  then fine-tune the crop in real time.」 under the title 「AI Video Enhance」 — the Auto Reframe description, not a
  Video Enhance one.
- **Entry point wording.** The Launcher shortcut and the AI Magic card read 「Video Enhance」; the Design draws
  「AI Video Enhance」 (known, TC-001 Notes: the Design wins). The Demo page's own title is 「AI Video Enhance」.
- **Editor Preview black (TC-003).** With ve-0130-1080p30 on the timeline the Preview area is pure black
  (#000000 sampled across it) while the timeline thumbnails draw the colour bars normally — the same as the
  2026-11-13 pass with the 3.2 s clip, now on a 1:30 clip and build 2611171. Taken from the screenshot only; whether
  the phone's own screen shows the frame was not checked by eye.
- **Clip toolbar.** The phone's order is … Adjust | Background | Enhance | Tools | Duplicate | Mask …; the Design
  draws Opacity | Background | Enhance | Enhance | Tools. The expanded Enhance group holds the four tools the frame
  draws, but with a Pro account none carries the Pro / Pro+ badge and the 「Pro+ Only Upgrade Now」 banner over the
  Preview is absent.
- **AI Magic tab.** No 「Video Quick Actions」 card where the Design draws one (the section holds Video Enhance,
  AI Video Upscaler, Photo Enhance); the fifth bottom-bar item is a gold 「Pro」 where the Design draws 「Mine」; the
  Launcher's top bar shows 「Pro」 where the (free-user) frame draws 「Try Pro+ 7 days for free」.

**Account and credits.** chenallencw@gmail.com, **Pro** (`GoogleBillingWrapper: updateSubscribingStatus: true`
throughout). Credit balance **416** (`CreditSystemManager: getMemberCreditRemain … totalRemain=416`: 100 monthly
Pro bonus + 316 of a 500 credit pack), unchanged over the segment.

**Half-done on the phone.** A project was created for TC-003 (New Project, one clip ve-0130-1080p30) and is saved in
Projects; nothing else was left running. 「Don't show again」 on the Demo page was again **not** ticked. At the end
the app sits on the AI Video Enhance panel with ve-1230-1080p60 loaded, no task started.

**Log folder.** `logs/D2a-20261118-173656/`.

### D2b (2026-11-18, 17:42–17:51 Taipei)

**Captured 7 of 7**, all with view data (debuggable build, fontScale 1.0), none `unsettled`, all dark / keyboard
down, **Pro** account, app in English, Stage server. Nothing generated, no credits spent, no Enhance CTA tapped, no
Google Play or credit-pack store opened.

| Screen | Row | How it was captured |
|---|---|---|
| 3294:31104 | TC-095 | by hand, the panel as the segment found it: ve-1230-1080p60 whole (Selected Length 08:00), Standard / Natural / 60fps / 1080p, Enhance 960, Pro 416 |
| 3669:20362 | TC-110 | by hand, ve-0500-1080p30 whole (Selected Length **05:00**), Mode Standard, Enhance 600 |
| 3669:20463 | TC-110 | by hand, Professional tapped with the 05:00 selection; the toast 「Professional supports clips up to 2:30. Shorten your selection to switch.」 held on screen by an adb `input tap` loop on the Professional chip every 1.2 s while the capture ran (as on 2026-11-13). The toast is in the screenshot, over the Selected Length row, exactly where Figma draws it |
| 3669:20564 | TC-110 | by hand, right handle dragged to Selected Length **02:20** (`fingerdrag`), then Professional tapped — it switches, charge rises to 8 credits/s, Enhance 1128 |
| 3300:32521 | TC-042 | by hand with the **right fixture**: ve-0130-1080p30 whole (Selected Length 01:30, playhead 00:00), replacing D1's auto capture taken from the 12:30 clip at 08:00 |
| 3313:39430 | TC-038 | by hand, ve-0130-1080p30 trimmed to Selected Length **01:01** with the playhead dragged to **00:14**, as the frame draws (Figma 01:00 / 00:14) |
| 3293:15145 | TC-096 | automatic (8/8 texts) on the tap of the **credit pill** in the panel's top bar — the route the 2026-11-13 pass used. No Enhance CTA was tapped |

**`--part 2`: none taken, on any of the 7.** Checked per frame against the source read: in every panel frame
(3313:39430, 3300:32521, 3294:31104, 3669:20362/20463/20564) 「Resolution」 sits at relY 730 and its chips at
relY 766, i.e. **under** the floating CTA (relY 722, height 60) — Figma draws the Resolution row behind the CTA
exactly as the phone does (on the phone: Resolution 1989–2156, cta_bar 2020–2361). The same reasoning D2a used for
3328:45377. 3293:15145 (Credit page) is a short page with nothing below the fold. So one top capture covers each
frame whole; a scrolled part 2 would show a state Figma does not draw.

**State differences kept.**

- **fps chip tapped to 60fps** on 3300:32521, 3313:39430 and the three 3669 frames. All five frames are drawn from a
  60fps source (「60fps · 1080p」, the 60fps chip selected); ve-0130-1080p30 and ve-0500-1080p30 are 30fps sources, so
  the app selected 30fps by default. The chip was tapped so the fps row matches the frame and the check does not
  raise two false colour items per frame. The source label still reads 「30fps · 1080p」 (words, not compared).
  3294:31104 needed nothing: ve-1230-1080p60 selects 60fps by itself.
- **3313:39430 at Selected Length 01:01**, not Figma's 01:00: the trim handle ignores drags under the touch slop
  (the same limit D1 hit at 01:01 / 05:54). The playhead did land on exactly 00:14, and 3669:20362 / 20564 landed on
  exactly 05:00 / 02:20.
- **3313:39430 / 3300:32521 CTA reads 「Enhance ◆ 124 / 180」**, where both frames draw 「Unlock Pro+ to Enhance」 with
  0 credits: the frames are drawn for a non-subscribed iOS user and this segment runs on the Pro account that D2
  needs. The subscribed CTA is what Android shows a Pro account (REQ-017: no Pro+ on Android).
- **3313:39430 filmstrip**: Figma pans the 01:00 window into the clip (a dimmed thumbnail to its left) and draws a
  hand annotation over it; on the phone the selection starts at 00:00, so the dimmed tail is on the right.

**Observations (nothing filed).**

- **Credit page is the Pro card, not Pro+.** 3293:15145 on the phone: 「PowerDirector Pro」 and 「You've unlocked 100
  monthly credits, 50% off all credit packs, and much more!」; the Design draws 「PowerDirector Pro+」 and 「… 50% for
  all credit packs, **100 GB Cloud Storage**, and many more!」. Everything else the frame lists is there and in the
  same order: ‹, 「Details」, 「My Credits」 + info icon, the credit figure (416), 「Buy More」, 「Expiring within 7 days:
  0 credits」, the separator, 「Complimentary daily credits」 / 「Claim once every 24 hours」 / 「Claim」, then the plan
  card. Known: REQ-017, no Android Credit page is drawn.
- **The CTA route to the Credit page was not re-tested.** The page was reached from the credit pill, as the brief
  asked; tapping 「Enhance」 was out of scope for this segment (nothing may be generated and the credits must stay at
  416 for D2c). Whether an Enhance priced above the balance still opens the credit-pack store instead of this page
  (2026-11-13) is therefore unanswered. It can be tested without any charge: the Professional 02:20 state used for
  3669:20564 prices the CTA at **1128**, far over the 416 balance.
- **No current-time / total label until the first scrub.** Figma draws 「00:00/12:30」 at the left of the preview bar
  on every panel frame. On a freshly opened panel the app's `preview_bar` holds only ▶ and the full-screen icon —
  the label appears (「01:01/01:30」, 「02:20/05:00」) only after the playhead or a trim handle has been moved.
- **The toast is a plain Android toast**, light grey on dark text, over the trim area; Figma draws the same box in
  the same place.
- **Professional pricing.** Standard is 2 credits/s, Professional 8 credits/s (02:20 → 1128). Switching fps from
  30 to 60 did not change the price (05:00 stayed 600).
- **The automatic watch captured the three 3669 frames in the wrong state** when `case TC-110` was set while the
  panel still held the 12:30 clip at 08:00 (it matched 16/19 texts and noted 「frames with the same texts」). All
  three were re-captured by hand afterwards and the hand captures are the newest, so they are the ones the check
  will read. Same for 3313:39430 (auto 17/18, then by hand).

**Account and credits.** chenallencw@gmail.com, **Pro** (`GoogleBillingWrapper: updateSubscribingStatus: true`).
Credit balance **416** at the end, unchanged (`CreditSystemManager: getMemberCreditRemain … totalRemain=416`: 100
monthly Pro bonus + 316 of a 500 credit pack). The daily bonus is still unclaimed (`checkDailyBonus,
hasReceivedToday: 0, dailyCredit: 3`) — 「Claim」 was not tapped.

**Half-done on the phone.** Nothing. The app sits on the **AI Video Enhance panel with ve-0130-1080p30 loaded**,
freshly re-picked from Add Media so every setting is back at its default (Selected Length 01:30, Standard, Natural,
30fps, 1080p, Enhance 180) — TC-110's precondition for D2c. 「Don't show again」 on the Video Enhance demo dialog is
still **not** ticked. No task started, no dialog open.

**Log folder.** `logs/D2b-20261118-175054/`.

### D2c (2026-11-18, 17:56–18:16 Taipei)

**Captured 10 of 10**, all with view data (debuggable build, fontScale 1.0), none `unsettled`, all dark / keyboard
down, no `--anyway`, **Pro** account, app in English, Stage server. This is the only segment that spent credits:
**416 before, 276 after — 140 credits over 5 tasks**, under the 250 budget. Nothing bought, nothing claimed (the
daily 3 credits are still unclaimed: `checkDailyBonus, hasReceivedToday: 0, dailyCredit: 3`).

| Screen | Row | How it was captured |
|---|---|---|
| 3293:13651 | TC-114 | by hand, Recent task as the app opened it by itself when the upload of task 1 finished: 2026/11/18, AI Video Enhance 1118, 「Processing…」, 「4 minutes left…」, progress bar, no cancel on the card |
| 3300:31478 | TC-117 | by hand, the same processing card (the two frames carry identical Figma texts) |
| 3293:15687 | TC-001 | by hand, Launcher with the task-completion banner of task 1 (「Good news! Your AI Video Enhance task has been completed. Tap here to view your results.」 + 「View」 / 「Close」). No loop trick was needed: the banner stays until Close or View |
| 3293:13684 | TC-143 | by hand, Result opened from that banner's 「View」: 「Original」 / 「Result」 with Result selected, 00:00/00:03, 「Save Result」 / 「Add to Timeline」 / 「Enhance More」 |
| 3300:31547 | TC-150 | by hand, the same Result page (Alternative & Exception copy) |
| 3293:13664 | TC-143 | by hand, Recent task with task 1 completed (thumbnail, 2026/11/18, AI Video Enhance 1118, 0:04, 「View」), reached again through the panel's history icon |
| 3310:38112 | TC-111 | by hand, generating screen of task 3 (ve-0030-1080p30, 1080p/60fps Standard): ring **0 %**, 「Video uploading...」, 「Please keep the app open」, 「Cancel」 |
| 3388:17754 | TC-111 | by hand, the same uploading moment, Cancel-board copy (identical Figma texts) |
| 3393:18282 | TC-111 | by hand, the leave dialog over that generating screen after 「Cancel」: 「Sure You Want to Leave?」 / 「Your video is still uploading. Leaving this page will cancel the process, and the credits will not be restored.」 with 「Leave」 and 「Keep Uploading」 |
| 3388:17664 | TC-113 | by hand, the panel after cancelling back: 「Leave」 tapped on the dialog of task 5, the panel returns with its selection and settings (Selected Length 00:30, Standard / Natural / 60fps / 1080p) and the CTA 「Enhance ◆ 60」 enabled again |

**Not captured: none.** All 10 are in their frame's state; the saved page sources were re-checked after the segment
(the generating pair holds 「0%」 / 「Video uploading...」 / 「Cancel」, the dialog frame the three dialog strings).

**Tasks and what each cost.**

| # | Clip | Settings | Cost | Outcome and what it served |
|---|---|---|---|---|
| 1 | ve-000320-720p30 | 720p / 60fps / Standard / Natural | **4** | completed. Started by accident (see *Chips under the CTA*). Served 3293:13651, 3300:31478, 3293:15687, 3293:13684, 3300:31547, 3293:13664 — 6 of the 10 screens |
| 2 | ve-000320-720p30 | 1080p / 60fps / Standard | **8** | completed. First attempt at the generating frames; the 3.2 s upload is over in ~5–15 s, so the two captures landed on the panel and on Recent and were discarded and redone. Its completion banner was the one seen later on the Launcher |
| 3 | ve-0030-1080p30 | 1080p / 60fps / Standard | **60** | completed. Served 3310:38112, 3388:17754 and 3393:18282. 「Leave」 could not be reached in time (the `lbl` matcher hit the dialog *title*, which also contains "Leave"), so the upload finished and the dialog dismissed itself |
| 4 | ve-000320-720p30 | 1080p / 60fps / Standard | **8** | completed. Second 「Leave」 attempt on the cheap clip: the upload finished within ~5 s and the dialog closed by itself before the tap |
| 5 | ve-0030-1080p30 | 1080p / 60fps / Standard | **60** | **cancelled with 「Leave」**. Served 3388:17664. The 60 credits were charged and not restored, as the dialog says |

Credits read from the Credit page and logcat: 416 → 412 → 404 → 344 → 336 → **276**
(`CreditSystemManager: getMemberCreditRemain … totalRemain=276`). The 100 monthly Pro bonus credits were spent
first; only the purchased pack is left (`BonusItem(remainCredit=276, category=purchase, eventId=purchase_cp500)`).

**Pricing observed.** Standard is **1 credit/s at 720p and 2 credits/s at 1080p** — the resolution changes the price,
which D2b had not tested (it had only shown that fps does not). 3.2 s → 4 credits at 720p, 8 at 1080p; 30 s → 60 at
1080p.

**State differences kept.**

- **The ring is at 0 %, not Figma's 25 %**, on 3310:38112 and 3388:17754. It stayed at 0 % for the whole upload of
  every task, as the 2026-11-13 pass saw; there is no moment at which the app draws 25 %. 「Video uploading...」 and
  「Please keep the app open」 match.
- **fps 60 and Resolution 1080p tapped** on every panel-bearing frame (3310:38112, 3388:17754, 3393:18282,
  3388:17664). In the source read the selected chip carries a blue stroke `#2589fe` (`Variable/Status/Select/Select`)
  and in these frames it is the **middle** chip of both rows (60fps, 1080p); the sources used here are 30fps, so the
  app selected 30fps and (for the 3.2 s clip) 720p by default. Mode Standard and style Natural are the app's defaults
  and already match. Same reasoning as D2b.
- **Clips and times differ from the frames' 12:30 source at Selected Length 08:00**: the generating and cancel frames
  ran on ve-0030-1080p30 (Selected Length 00:30), the Recent and result frames on ve-000320-720p30 (0:04 cards,
  00:00/00:03 on the Result). Durations and the source label are words, which the standard check does not compare;
  the drawn states match.
- **3293:13664 was captured after returning to Recent from the Result**, not by waiting on the page as TC-143 step 1
  does: the completion was spent on the Launcher banner (3293:15687), which can only be had while the app is on the
  Launcher. Same drawn state (completed card with 「View」).
- **3293:13684 / 3300:31547 were opened from the Launcher banner's 「View」**, not from the Recent card's 「View」 — the
  same Result page either way.
- An earlier insurance capture of 3388:17664 (the default subscribed panel, before task 5) was replaced by the
  post-cancel one; the hand capture after 「Leave」 is the newest and is the one the check will read.

**Observations (nothing filed).**

- **Chips under the CTA start a paid task.** The Resolution chips sit at y 2063–2156 and the floating
  `btn_cta` at y 2094–2210, so a tap on a chip's centre (y ≈ 2109) hits 「Enhance」 and starts a charged task — that is
  how task 1 began. Only the 30 px band y 2063–2093 reaches the chips, and the panel cannot be scrolled out of the
  way (content 1206 px in a 1411 px viewport). Figma draws the same overlap (D2b checked this per frame), so the
  Design has the same trap.
- **The leave dialog has no 「Don't show again」 checkbox**, which Figma draws on 3393:18282 (y 392, above the
  buttons). The two buttons are stacked 「Leave」 over 「Keep Uploading」 as Figma draws them. Nothing one-way was
  therefore available to tick, and nothing was ticked.
- **A cancelled task still appears in Recent task** — as a card with 「Retry」 and duration **8333:20:00**
  (≈ 30,000,000 s, plainly a unit error). TC-113's Expected Result says no completed result for a cancelled task
  appears in Recent; a 「Retry」 card does, and its duration is wrong.
- **The cancelled task was charged.** 60 credits taken and not restored, which is what the dialog promises and what
  the Design (newer, outranks PM §8) says; TC-113's Q-2 can be decided on this evidence with the user.
- **Results land in the gallery without 「Save Result」.** Each completed task added a new item at the top of Add
  Media (two 00:03 and one 00:30 by the end) although 「Save Result」 was never tapped.
- **‹ on the Result returns to the Launcher** when the Result was opened from the Launcher completion banner, not to
  Recent task (TC-143 step 3 expects Recent when it was opened from the Recent card).
- **No 「Added」 badge on the completed Recent card**, which Figma draws on 3293:13664 (y 158 x 36).
- **The generating overlay is its own window.** The page sources of 3310:38112 and 3388:17754 hold only the overlay's
  texts (0 %, 「Video uploading...」, 「Please keep the app open」, 「Cancel」); the panel behind is dimmed on the
  screenshot but absent from the source, so the check will see the frame's panel texts as covered, not missing.
- **Upload windows.** ve-000320-720p30 ≈ 5–15 s, ve-0030-1080p30 ≈ 50–60 s. When the upload finishes the app leaves
  the generating screen for Recent task by itself, and that also dismisses the leave dialog — a short clip cannot hold
  the dialog long enough to answer it.
- `lbl "Leave"` matches the dialog **title** 「Sure You Want to Leave?」; the button needs `id action1Button`.
- The Demo page still carries Auto Reframe's description (as D2a found) and its 「Don't show again」 checkbox was
  never ticked.

**Half-done on the phone.** Five AI Video Enhance tasks sit in Recent task: four completed (0:04, 0:30, 0:04, 0:04)
and one 「Retry」 card from the cancelled task 5. Three enhanced result videos were added to the device gallery. The
app is on the **Launcher**, English, Stage, Pro, **276 credits**, with the completion banner closed; no task is
running, no dialog open, and 「Don't show again」 is still not ticked on the Demo page or anywhere else.

**Log folder.** `logs/D2c-20261118-181526/`.

### Result (settled 2026-11-18)

29 of the 31 routed screens captured (all with view data), 29 measured, both review passes settled:
**195 bugs** (20 major, 168 minor, 7 cosmetic), **62 open questions**, 246 ok, 11 n/a.
Most differences repeat one defect: headings, titles, the credit figure and CTA labels drawn Bold where the Design
asks Semibold (Roboto Medium on Android, KP-066). The major ones: no current-time / total-length readout on a
freshly opened panel's preview bar; the 「Max 8 minutes. Drag to choose which part.」 hint bubble never shown; the Free
account's credit pill without its figure; the Demo page's top bar without the Recent-task button; the Recent page's
header (house where the Design draws back, no home button at the right); no 「Don't show again」 on the leave dialog;
the 「Video Quick Actions」 tile missing from AI Magic.
Next: the user's decisions on the Design tab (Bug / OK / N/A, eBug ticks), then `design.ts … ebugs`.
