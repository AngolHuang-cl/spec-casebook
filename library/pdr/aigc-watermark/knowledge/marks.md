# Marks, badges and dialogs

## KF-004 The 「AI」 badge on previews is an overlay view
- kind: fact · platform: android · use: analysis, run · tags: badge, preview, player
- source: AIGC Watermark Android run 2026-11-17-r1-full O-11, O-15 · verified: 16.9.0 build 2611161 (2026-11-17)

The 「AI」 badge on a result's still preview and full-screen player is a view of its own (`aigc_badge_overlay`), not
part of the file. The full-screen player draws it over the first 2 s; the result page's still preview draws it with the
switch Off and not with it On. Character Motion Swap's result page draws none either way, its player does.

## KF-005 When the export 「AIGC Watermark」 dialog appears
- kind: fact · platform: android · use: analysis, run · tags: export, dialog, produce
- source: AIGC Watermark Android run 2026-11-17-r1-full O-23, O-24 · verified: 16.9.0 build 2611161 (2026-11-17)

With the switch Off the dialog appears after 「Produce」 on the Produce sheet (after the Free Pro paywall when it
shows), never on 「Export」, for projects holding Text to Speech, AI Anime Video, AI Cartoon or AI Sketch content. It
does not appear for an AI Music Generator song, a Voice Changer 「Effect」 voice (Off and On exports identical) or a
non-AI project: those are not treated as AI content on export.

## KF-006 Automatic gallery copies follow the switch at finish time
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, switch
- source: AIGC Watermark Android run 2026-11-17-r1-full O-13 · verified: 16.9.0 build 2611161 (2026-11-17)

A tool that saves its result by itself (KP-079) labels that copy by the switch state when the task finishes: Off
gives the label (Video Edit by Chat, Talking Avatar), On none (AI Anime Video). Set the switch before the task ends.
