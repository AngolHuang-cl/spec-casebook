# Credits

## KF-001 Billed seconds are the ceiling of the video track's own length
- kind: fact · platform: android · use: analysis, run · tags: credits, price, duration
- source: Video Enhance Android run 2026-11-10-r1-full O-5, O-7, O-8, O-19; P0076 check 2026-11-11; Video Enhance Android run 2026-11-18-r2-full O-9, O-14, O-30; Video Enhance Android run 2026-11-24-r3-full R3 TC-269, TC-270 · verified: 16.9.0 build 2611231 (2026-11-24)

The price is rate × the video track's media length (mdhd) rounded up to whole seconds; the MP4 edit list that trims
encoder padding is ignored. ffmpeg / x264 files with B-frames carry ~33 ms of padding (track 1,033 ms for a file that
plays 1.000 s), so an exact 1.000 s one bills 2 s; a 1.000 s file without padding (`-bf 0`, audio or not) bills 1, and
a phone-camera video has none (track = movie length). MediaStore's duration is the longest track (AAC adds ~21 ms), not
what the app bills. 「Selected Length」 truncates, so 「02:30」 means 150.x s. Recent task cards round up the same way.
Price rows quote the video track length (`mp4box`-style read of mdhd, or a padding-free fixture), never ffprobe's.
Except: opened from the Timeline clip toolbar, a 00:30 1080p ffmpeg clip billed 30 s (60 at 2/s), not 31: the Timeline
path may bill the clip's own length (seen once, R2 O-30).

## KF-002 A charge is stamped at the Enhance tap
- kind: fact · platform: android · use: run · tags: credits, ledger, logs
- source: Video Enhance Android run 2026-11-10-r1-full O-13, O-17 · verified: 16.9.0 build 2611231 (2026-11-24)

The Credit Details row 「Video Enhancer」 −N carries the time of the Enhance tap (logcat 「create session response
code->200」), before the local transcode and the upload end. Match ledger rows to tap times. (PM says credits are
taken when the upload reaches the server: that gap is the table's Q-2, not settled here.)

## KF-003 A task that never uploaded is refunded hours later
- kind: quirk · platform: android · use: run · tags: credits, refund, failure
- source: Video Enhance Android run 2026-11-10-r1-full O-11, O-29 and the wrap-up recheck; Video Enhance Android run 2026-11-18-r2-full O-15, O-23; Video Enhance Android run 2026-11-24-r3-full O-8, O-10, O-16 · verified: 16.9.0 build 2611231 (2026-11-25)

Two 30-credit tasks left during the upload (「Leave」 18:38, Home 18:44) stayed charged with 「Retry」 cards, then got
「Generation failed, credits returned +30」 at 21:40 and 22:00 with no app call around them: the server refunds such
tasks about 3 h later. R2 saw the same for a Leave (3 h 9 min) and for tasks whose upload failed with HTTP 400 or 401
(3 h 19 min, 3 h 36 min); R3 (2611231) for S3 upload errors (「unexpected end of stream」, 「Broken pipe」), a Leave and an
apply-effect 401: 3 h 7 min – 3 h 39 min after the charge. Only a task that reached the server and ended `applyEffect
status: Error` was refunded at once. Read the ledger again at the end of the run before calling a refund missing.

## KF-012 The panel's credit pill opens My Credits
- kind: howto · platform: android · use: run · tags: credits, buy-more, panel
- source: Video Enhance Android run 2026-11-18-r2-full O-13 · verified: 16.9.0 build 2611091 (2026-11-18)

Tapping the credit pill on the Video Enhance panel opens My Credits with the full balance, so 「Buy More」 is reachable
without draining the balance first.
