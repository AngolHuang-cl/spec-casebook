# Credits

## KP-007 A failed generation refunds its credits
- kind: rule · platform: both · use: analysis, run, ebug · tags: credits, refund · authority: team
- source: run.md step 8 (user, 2026-10-19) · verified: 16.9.0 build 2611091 (2026-11-10)

A failed item costs nothing net; a partial failure costs only the items that succeeded. A missing or wrong refund is
a defect with its own eBug, even when the failure itself is already filed.

## KP-008 Reading the credits ledger
- kind: howto · platform: both · use: run · tags: credits, refund, ledger
- source: run.md step 8 (user, 2026-10-19); Video Enhance Android run 2026-11-10-r1-full O-16, O-17, O-25 · verified: 16.9.0 build 2611091 (2026-11-10)

Mine › Credits › Details lists charge rows by tool (Text to Image / Text to Speech / AI Video Generator / Video
Enhancer) with the platform (「PowerDirector (Android)」) and a refund row 「Generation failed, credits returned +N」.
The account is shared: rows nobody in the run made appear (a 「Credit Pack (2000 credits) +2000」 on 2026-11-10), so
match rows by time and amount, never by balance difference alone. Balances lag: the credit pill is stale until its
screen is reopened, and the Pro tab can trail one charge behind the ledger (Android); quote the next fresh pill.

## KP-041 Daily free credits
- kind: fact · platform: both · use: analysis, run · tags: credits, claim
- source: exploration KB mine-page.md (2026-09-07 PDRM TestFlight, and 2026-09-29, 16.9.0 build 189315, Free); Android: Video Enhance run 2026-11-10-r1-full O-27 (offer seen, not claimed)

My Credits carries 「Complimentary daily credits / Claim once every 24 hours / Claim」; a claim gives 5 credits
(toast 「5 Credits Received · valid for 7 days」). Yet 「Expiring within 7 days」 stays 「0 credit」 after it
(ISS-MP-27, DRI261893-0042). Android's Mine › Credit page shows the same 「Complimentary daily credits ‹Claim›」
offer (16.9.0 build 2611091); its amount there is unchecked.

## KP-067 Credits read 「--」 right after a Play purchase
- kind: quirk · platform: android · use: run · tags: credits, billing, logs
- source: Video Enhance Android run 2026-11-10-r1-full O-1 · verified: 16.9.0 build 2611091 (2026-11-10)

Right after a Google Play subscription, Mine › Credits shows 「--」 and every launch logs `getCreditRemain error,
creditSystemUUID is null` (also `doVerifyPurchase error`, `checkFeatureCredit … JsonSyntaxException`). A relaunch a
minute later shows the balance with the monthly credits added; relaunch before reading prices or the pill.

## KP-070 Credit Details drops the current month after local midnight
- kind: quirk · platform: android · use: run, ebug · tags: credits, ledger, date
- source: Video Enhance Android run 2026-11-18-r2-full O-25, O-31 · verified: 16.9.0 build 2611091 (2026-11-19)

Between local midnight (UTC+8) and the server's UTC date change, Mine › Credits › Details opened on the previous
month's group with no current-month group, also after a relaunch, while logcat `getCreditHistory` listed the new
charges; before midnight they showed. Read ledger rows in daytime or from logcat; recheck across a month boundary
before filing.

## KP-071 Buying credits is followed by an offer and a backup dialog
- kind: fact · platform: android · use: analysis, run · tags: credits, buy-more, dialog
- source: Video Enhance Android run 2026-11-18-r2-full O-12 · verified: 16.9.0 build 2611091 (2026-11-18)

After a 500-credit test purchase the app offered 「Want to get 50 Credits, too?」 (「NT$170.00」, 「Not now」); 「Not
now」 then opened 「Check Backup Protection」 over My Credits (「Back up now」, 「Later」, 「Don't show again」 unticked).
Neither is in a feature spec; close both before the next step.
