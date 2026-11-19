# Quirks

## KF-008 The source badge reads 0fps for some sources
- kind: quirk · platform: android · use: run · tags: panel, badge, fps
- source: Video Enhance Android run 2026-11-10-r1-full O-2, O-31; Video Enhance Android run 2026-11-18-r2-full O-2 · verified: 16.9.0 build 2611091 (2026-11-18)

The panel's badge reads 「0fps · <res>」 with every fps chip disabled for stock downloads (Pexels, Pixabay, gettyimages),
an 8K file after the convert dialog, some Timeline clips, a Timeline clip whose file is gone and a local file picked
through the Google Photos tab (system 「Select a video」 picker), while the same kind of local file from the album
chooser reads its fps. Use a local Add Media file for fps rows.

## KF-011 Hand-set trim lengths land on x.y seconds
- kind: quirk · platform: android · use: analysis, run · tags: trim, handles, price
- source: Video Enhance Android run 2026-11-18-r2-full O-7, O-9, O-14, O-30 · verified: 16.9.0 build 2611091 (2026-11-18)

A trim handle placed by hand never ends on a whole second: 「00:30」 is 30.x s and bills 31 (sub-pixel adb releases
cross 29.x → 30.x within 0.01 px), so the price grid's 30 s and 90 s prices cannot be reached by dragging; the caps
(08:00, 02:30) are exact. Labels truncate and can read one second below the frame at the handle. Handles ignore drags
under ~25 px (overshoot and return). Dragging the selection's middle moves it with the finger when the video fits the
strip, against it (the strip scrolls) when the strip is wider than the screen.
