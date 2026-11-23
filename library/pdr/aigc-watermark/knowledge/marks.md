# Marks, badges and dialogs

## KF-004 The 「AI」 badge on previews is an overlay view
- kind: fact · platform: android · use: analysis, run · tags: badge, preview, player
- source: AIGC Watermark Android run 2026-11-17-r1-full O-11, O-15; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-4, O-8 · verified: 16.9.0 build 2611193 (2026-11-23)

The 「AI」 badge on a result's still preview and full-screen player is a view of its own (`aigc_badge_overlay`), not
part of the file. The full-screen player draws it over the first 2 s. With the switch Off the video result pages' still
preview draws it (Image to Video, Character Motion Swap, Cinematic Reel on 2611193; 2611161 drew none on Motion Swap);
Text to Image and AI Art result pages draw none. With the switch On the still preview draws none.

## KF-005 When the export 「AIGC Watermark」 dialog appears
- kind: fact · platform: android · use: analysis, run · tags: export, dialog, produce
- source: AIGC Watermark Android run 2026-11-17-r1-full O-23, O-24; AIGC Watermark Android run 2026-11-23-r2-changed O-12, O-19 · verified: 16.9.0 build 2611193 (2026-11-23)

With the switch Off the dialog appears after 「Produce」 on the Produce sheet (after the Free Pro paywall when it
shows), not on the editor's 「Export」, for projects holding Text to Speech, AI Anime Video, AI Cartoon or AI Sketch content. It
does not appear for an AI Music Generator song, a Voice Changer 「Effect」 voice (Off and On exports identical) or a
non-AI project: those are not treated as AI content on export.
AI Storytelling is the exception: its 「Export」 shows the dialog at once (「Your exported file will include an AIGC
watermark. To remove the watermark, go to Menu > Settings.」, 「Don't show again」, Cancel, Export).

## KF-006 Automatic gallery copies follow the switch when they are written
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, switch
- source: AIGC Watermark Android run 2026-11-17-r1-full O-13; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-5 · verified: 16.9.0 build 2611161 (2026-11-17)

A tool that saves its result by itself (KP-079) labels that copy by the switch state when it writes it: Off gives the
label (Video Edit by Chat), On none (AI Anime Video); both write at task finish. Talking Avatar writes when the result
is first opened (2611193), so which moment's switch state it uses needs a recheck: keep the switch unchanged until the
result has been opened.
