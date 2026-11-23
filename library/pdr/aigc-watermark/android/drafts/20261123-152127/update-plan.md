# Update plan — pdr/aigc-watermark / android: approved v2 → draft 20261123-152127

## Spec files
- Unchanged: the 2026-11-17 set · New or changed: none · No longer supplied: none
- Rulings: none new; REQ-009 applied to a row v2 missed (REQ-010).

## Requirement changes
None.

## Case changes
- New (0)
- Modified (1): TC-128 Step 3 now expects the second song to start straight with the music, no spoken clip (R-055, REQ-009); it still expected the clip. Found by the Android R2 run (O-17).
- Removed (0)
- Unchanged: 126

## Found by the analysis
- The v2 update changed the rows that cited the removed clip requirements (R-017, R-032 – R-036) but not TC-128, which cites only R-030 yet asserted the clip in its text. Fixed in SKILL.md step 3.4: a removed or reversed rule is searched for in every row's wording, not only in Spec Refs.

## Not added (value check)
- None.
