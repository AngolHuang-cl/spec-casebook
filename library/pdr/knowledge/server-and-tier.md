# Server and tier

## KP-004 Switching the tier on iOS
- kind: howto · platform: ios · use: analysis, run · tags: tier, pink
- source: analysis.md verdict rule 5 (spec agent rules, 2026-10-19); exploration KB ai-mini-drama.md (2026-10-08: default and reset)

Launcher › Pink › ☰ › `[0] IAP` › 「status」: Follow account / Free / Pro / Pro+; it defaults to 「System (lock button
in debug mode)」 and returns to it on relaunch unless set again. Verify the tier in Mine and restore the
previous value after the tier group. No purchase or extra account is needed.

## KP-005 Stage or Production on Android
- kind: howto · platform: android · use: run · tags: server
- source: run-android.md › Server (user, 2026-10-28); AIGC Watermark Android run 2026-11-17-r1-full (Stage, yellow bar) · verified: 16.9.0 build 2611161 (2026-11-17)

An empty `testserver.config` in `/sdcard/cyberlink/PDR/` means Stage at the next launch; absent means Production
(`/sdcard/cyberlink/tester.config` holds the SR code and is not the switch). Put it in place before the first launch
of a fresh install: a first launch on Production creates the credit ID there and Stage then rejects signed-out turns
(`403 "Fail to verify uuid"`); `adb shell pm clear <package>` makes a new ID. On Stage the Launcher's top bar is
yellow, on Production dark.

## KP-006 Android tiers and chat limits
- kind: fact · platform: android · use: analysis, run · tags: tier, quota, billing
- source: analysis.md verdict rule 10 (team, 2026-10-19) · verified: 16.9.0 build 2611091 (2026-11-10; Pro via Play, 「You're on the highest plan」; chat limits not checked)

Android sells Pro, not Pro+, through Google Play billing; the tier comes from the signed-in account. Daily chat limits
are server-configured: Free 10, Pro 100.

## KP-068 A Play test subscription ends within hours
- kind: quirk · platform: android · use: run · tags: tier, billing, subscription
- source: Video Enhance Android run 2026-11-10-r1-full O-30; Video Enhance Android run 2026-11-18-r2-full O-17, O-23, O-26, O-28; AIGC Watermark Android run 2026-11-23-r2-changed (Pro from 14:22, still Pro at 15:14); AIGC Watermark Android run 2026-11-23-r3-full O-7 (bought 14:22, lapsed 17:58; no bonus clawback in the credits by 18:12) · verified: 16.9.0 build 2611193 (2026-11-23)

A Play test subscription renews every 30 minutes (the test sheet reads 「NT$1,190.00/30 min」 and 「This is a test
subscription. It will recur according to this schedule.」) and ends after a few renewals: on the shared test account
(`yearly_sub_usd34.99_yfree_202307`) each purchase lasted about 3.5–5.5 h. At the lapse the ledger takes back the unused
monthly bonus (「Monthly Credit Bonus (for Pro Subscribers) −N」) and logcat logs `updateSubscribingStatus: false`, but
Mine and the panel keep acting Pro until the next launch shows 「Free」 「Claim offer」. Run Pro rows early, check the
tier at each segment start, and re-buy on the Play test sheet (「Test card, always approves」, no password); a sheet left
open for hours fails (billing responseCode 6, 「Error / Server error」), so open a fresh one.
AIGC Watermark's runs saw the same: 17:08 → ended by 22:37 (R1), 14:22 → 17:58 (R3, no clawback seen by 18:12).

## KP-093 Sign-in after `pm clear` on Stage
- kind: quirk · platform: android · use: run, ebug · tags: server, sign-in, credits, reset
- source: AIGC Watermark Android run 2026-11-17-r1-full O-27, O-29; corrected by AIGC Watermark Android run 2026-11-23-r3-full O-11 · verified: 16.9.0 build 2611193 (2026-11-23)

On 2611161 (R1), after `adb shell pm clear` on Stage (testserver.config kept), the app showed 「Account Not Found」
(only 「Switch Account」) and stayed signed out; logcat: `bindMember … 403 {"detail":"invalid device identity"}`.
On 2611193 (SM-A5360, R3) the same reset signed in: Google via Chrome (no password) › 「Account Sign In」 › 「Got it」,
`bindMemberSuccess: 0`, +30 loyalty bonus (KP-072). Still run signed-in rows before a `pm clear` and check the log.

