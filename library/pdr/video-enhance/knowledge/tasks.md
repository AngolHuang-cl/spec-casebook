# Tasks and results

## KF-004 Recent task may or may not refresh in place; Back leaves it to the Launcher
- kind: quirk · platform: android · use: run · tags: recent-task, back
- source: Video Enhance Android run 2026-11-10-r1-full O-9, O-12, O-15, O-21; corrected by Video Enhance Android run 2026-11-18-r2-full O-16, O-20 · verified: 16.9.0 build 2611231 (2026-11-24)

In R1 a card done on the server stayed 「Processing…」 (「<n> minutes left…」 never counted down) until Recent task was
reopened or a card tapped, and a 「View」 tapped right after the list opened could do nothing. In R2 (same build) a
processing card turned completed in place twice with the page left open, and 「View」 worked on the first tap. So
neither is reliable: a refresh row records which it saw, and a dead 「View」 is tapped again. System Back on Recent task
goes toward the Launcher, not the panel (whether by design is TC-208's call); once it landed on the full-screen
「AI Mini Drama」 intro page (✕ to close), which hid the Launcher.

## KF-005 Task timings
- kind: fact · platform: android · use: run · tags: timing, upload, wait
- source: Video Enhance Android run 2026-11-10-r1-full O-14, O-26, O-28; Video Enhance Android run 2026-11-18-r2-full O-15, O-19, O-22, O-29; Video Enhance Android run 2026-11-24-r3-full R3-g1, R3-g2, R3-h · verified: 16.9.0 build 2611231 (2026-11-25)

The ring sits at 「0%」 through a local transcode (38 s for 01:30 1080p) before the upload; a 01:30 1080p upload took
9.5 min, a 3 s 720p one 1 s. From the Enhance tap to Done a 3.2 s clip took 66–151 s in Standard (4K the longest) and
208–544 s in Professional. In R2 (2026-11-18) the upload leg was far slower on both office Wi-Fi networks, not the
phone's link: 65 s per 1 MB clip, 23–24 min for 7.6 MB, 70 min for 22.8 MB; processing after it took 2–4 min. R3 (2611231)
matched: tap to Done 62–135 s Standard, 215–553 s Professional, 23.5 min uploads for 7.6 MB. Plan waits from these,
not from the spec's seconds, and allow for slow-upload days.

## KF-006 Results are written to the phone twice
- kind: fact · platform: android · use: run · tags: storage, save, result
- source: Video Enhance Android run 2026-11-10-r1-full O-21, O-23 · verified: 16.9.0 build 2611231 (2026-11-24)

At 「Done」 the app writes the result to Movies/cyberlink/PowerDirector/Video Enhance/ (「VideoEnhance - <date> - <n> -
<ms>.mp4」) without a media scan, so the gallery does not show it; 「Save Result」 writes a second identical copy and
scans that one (each tap another). Count files there by run time, not by number. Logcat's 「DownloadUriTask: …URI is
not absolute」 after each Done has no visible effect.

## KF-007 Completion is announced twice
- kind: fact · platform: android · use: run · tags: notification, banner
- source: Video Enhance Android run 2026-11-10-r1-full O-15, O-20; Video Enhance Android run 2026-11-18-r2-full O-16; Video Enhance Android run 2026-11-24-r3-full O-13 · verified: 16.9.0 build 2611231 (2026-11-24)

Each completed task posts a system notification even with the app in front, and an in-app 「Good news! …」 banner that
waits on the Launcher until 「Close」 and covers its top tiles; a stale one also blocks the Launcher's page source.
Close it before tapping or reading there.

## KF-009 Recent task lists only this install's tasks
- kind: fact · platform: android · use: analysis, run · tags: recent-task, reinstall, cloud
- source: Video Enhance Android run 2026-11-18-r2-full O-1 · verified: 16.9.0 build 2611231 (2026-11-24)

After a fresh install Recent task read 「No Generated Videos」 although the same account had run many tasks a week
before and the page says 「Tasks are stored on the cloud for 1 year」: the list is kept per install and cloud tasks are
not listed again. Whether a reinstall should bring them back is a PM question, not a row expectation yet.

## KF-010 A very long upload fails the task
- kind: quirk · platform: android · use: run · tags: upload, failure, retry
- source: Video Enhance Android run 2026-11-18-r2-full O-15, O-18, O-19; Video Enhance Android run 2026-11-24-r3-full O-6, O-7, O-8, O-13 · verified: 16.9.0 build 2611231 (2026-11-24)

A 92.5 MB upload that took 26 min ended 「upload response code->400」, and a 22.8 MB one that took 70 min failed at the
next call 「apply effect response code->401」 (likely an expired token). Such a task's card shows 「Retry」 or 「View
Details」 with a blank or grey thumbnail and a nonsense length (「25000:00:00」); its credits come back hours later
(KF-003). On a lossy Wi-Fi (KP-105) small uploads also break off (`IOException: unexpected end of stream`,
`SocketException: Broken pipe`) with cards 「888:53:20」 or 「8342:30:00」 / 「Retry」. 「Retry」 re-uploads with no new
charge. Home or 「Leave」 during 「Video uploading...」 does not stop the upload (after Leave it still finished, but no
task was created). Use small sources when the upload is slow.

## KF-013 An upload over 1 minute is a bug
- kind: decision · platform: both · use: analysis, run · tags: upload, timing, performance
- source: user ruling 2026-11-19 (REQ-027); Video Enhance Android run 2026-11-24-r3-full O-6, O-13 (63–70 s for 1–2 MB, 23.5 min for 7.6 MB) · verified: 16.9.0 build 2611231 (2026-11-25)

The 「Video uploading...」 leg (logcat 「Upload to S3: start」 → 「upload response code->200」) must finish within 1
minute; anything longer is unacceptable and filed, whatever the file size or network. R2 measured 65 s for a 1.02 MB
clip (41 uploads), 23 min for 7.6 MB and 70 min for 22.8 MB; 2611181 repeated 65 s for 1.02 MB twice. KF-005's
timings are what the build does, not what it should do.

## KF-014 Recent task has two layouts
- kind: fact · platform: android · use: run · tags: recent-task, navigation, back
- source: Video Enhance Android run 2026-11-24-r3-full O-11 (TC-132, TC-140, TC-141) · verified: 16.9.0 build 2611231 (2026-11-24)

Opened from the panel's Recent task icon, or by itself after a panel Enhance, Recent task has only ⌂ (top left) and
「Create another one」. Reached through Result › 「Enhance More」 › Enhance it has ‹ (btnBack, top left) and ⌂ (btnHome,
top right) and no 「Create another one」; ‹ there goes to Add Media. A Recent task row records which way it came in.
