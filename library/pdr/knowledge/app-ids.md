# Accessibility ids

## KP-009 Android accessibility ids are content-descs
- kind: fact · platform: android · use: run · tags: ids
- source: run-android.md (team, 2026-10-27); Video Enhance Android run 2026-11-10-r1-full O-22, O-30 · verified: 16.9.0 build 2611091 (2026-11-10)

PowerDirector's Android accessibility ids are content-descs starting `[AID]` (e.g. `[AID]IAP_Back`); match them with
`lbl`, not `id`. Many controls also carry resource ids that `id` matches (`tv_premium` for the Launcher's Pro tab,
`iv_back`, `top_toolbar_back`); prefer them over a bare-text `lbl`, which matches the first text containing it
(`lbl Pro` opened 「New Project」). Don't rely on `[AID]…_Server` to tell the server: the Launcher's top-bar colour does (KP-005).

## KP-073 Add Media's sort order options reuse the sort key ids
- kind: quirk · platform: android · use: run · tags: add-media, sort, aid
- source: Video Enhance Android run 2026-11-18-r2-full O-10 · verified: 16.9.0 build 2611091 (2026-11-18)

In Add Media's sort sheet 「Ascending」 carries content-desc `[AID]Filter_Name` and 「Descending」 `[AID]Filter_Date`,
the same as the Name and Date keys; tap them by resource id (`order_asc`, `order_des`). Set the sort back to Date /
Descending after a run changes it.
