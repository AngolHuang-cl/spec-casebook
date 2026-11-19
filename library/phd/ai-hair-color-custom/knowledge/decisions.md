# Decisions: what not to assert (AI Hair Color Custom)

## KF-001 Two-colour Custom styles need both colours to generate
- kind: decision · platform: android · use: analysis, run, ebug · tags: custom, base-color, highlight-color, generate · authority: team
- source: user 2026-11-18 (REQ-009, R2 eBug review, ISS-HCC-20: 「更新知識, 都要選才能生成」)

For a two-colour Custom style (Ombré, Balayage …) Generate is enabled only after both Base Color and Highlight
Color are chosen. Base Color alone does not generate; this replaces the 2026-11-13 ruling (REQ-003 / REQ-007).
Do not assert that Generate works with Base only.

## KF-002 No toast for a missing colour
- kind: decision · platform: android · use: analysis, run, ebug · tags: custom, generate, toast · authority: team
- source: user 2026-11-18 (REQ-009, ISS-HCC-21: 「不用toast, generate沒有亮起來user就該知道不能generate」)

When a required colour is missing no toast or message is expected: Generate staying disabled is enough. Do not file
a missing toast as a bug.

## KF-003 Solid hides the Highlight Color row
- kind: decision · platform: android · use: analysis, run, ebug · tags: custom, solid, highlight-color · authority: team
- source: user 2026-11-18 (REQ-009, ISS-HCC-19: 「隱藏就好」)

With the Solid style the Highlight Color row is hidden, not greyed out. Do not expect a disabled Highlight row.

## KF-004 ✕ / Back on a result lands in the Edit Room
- kind: decision · platform: android · use: analysis, run, ebug · tags: result, navigation, edit-room · authority: team
- source: user 2026-11-18 (REQ-009, ISS-HCC-25: 「回到edit room是正常的」)

Leaving a generated result with ✕ or system Back lands in the Edit Room. This is correct; do not file it.

## KF-005 Edit Room Quick Action has no Hair Color tool
- kind: decision · platform: android · use: analysis, run, ebug · tags: edit-room, quick-action, entry · authority: team
- source: user 2026-11-18 (REQ-009, ISS-HCC-18: 「quick action本來就沒有要加hair color」)

The Edit Room's Quick Action row is not meant to have a 「Hair Color」 tool. AI Hair Color is reached through
Portrait › Hair (and AI Photos on the Launcher). Do not file its absence from Quick Action.

## KF-006 No-face message wording is accepted
- kind: decision · platform: android · use: analysis, run, ebug · tags: no-face, message, wording · authority: team
- source: user 2026-11-18 (REQ-009, ISS-HCC-17: 「用字不同沒關係」)

The app's 「No face detected. A face is required for this feature.」 is accepted although the PM spec words it
differently. Do not file the wording difference.
