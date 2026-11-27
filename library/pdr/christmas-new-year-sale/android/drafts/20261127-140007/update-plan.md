# Update plan — v3 → draft 20261127-140007 (REQ-011)

Same spec set (specs/2026-11-20). User, 2026-11-27: DRA262611P0311 re-checked under the PM rule 「未訂閱 Auto Pass 的用戶會看到 Auto Pass 的 Credit Sales；若已訂閱 Auto Pass，則會看到 2000 Credit Pack 的 Credit Sales」 (R-048, Q-14). Run R6 showed the app follows it: without Auto Pass the page leads with the Auto Pass sale, with Auto Pass it shows 「Auto Pass activated」 and the 1000+1000 pack. The ticket is NAB, and v3 rows that expected the 2000 pack without Auto Pass are wrong.

## Requirements
- R-046 modified: the 1000+1000 Special Offer pack and 「Get 2000 credits for …」 are for a paid user **with** Credit Auto Pass (R-048).
- R-048 variants split by season: without Auto Pass TC-125, TC-120 (Christmas), TC-121 (New Year); with Auto Pass TC-126, TC-122 (Christmas), TC-205, TC-123 (New Year).
- Why the analysis missed it: R-048 (the Q-14 ruling) was applied to TC-125 / TC-126 only; the whole-page rows TC-120 / TC-121 kept the Design frame, which draws both offers on one page. A ruling that splits a screen by state must be carried to every row that looks at that screen.

## Rows
- TC-120, TC-121 modified: the no-Auto-Pass page — Auto Pass sale card on top, no 1000+1000 pack and no 「Get 2000 credits for …」; banner, packs, footer and countdown checks kept. Spec Ref adds R-048, drops R-046.
- TC-122, TC-123 modified: precondition 「Credit Auto Pass subscribed」, run after TC-150.
- New TC-205 (after TC-126): New Year credit page with Auto Pass.
- All other 199 v3 rows unchanged.

## Not added
- 「Get 2000 **C**redits」 capital C (app) vs 「credits」 (Design): text difference seen in R6, not a row change; for an eBug if wanted.
