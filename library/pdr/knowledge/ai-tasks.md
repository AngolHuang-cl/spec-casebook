# AI task completion (shared by every AI tool)

## KP-055 Completion banner in the editor
- kind: fact · platform: ios · use: analysis, run · tags: ai-task, banner
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

When a background AI task ends, the editor shows 「Good news! Your <Task> task has been completed. Tap here to view your
results.」 with 「Close」 and 「View」, over the top of the preview. Banners queue: dealing with one shows the next
finished task. Close was not tested.

## KP-056 Task list states
- kind: rule · platform: ios · use: analysis, run · tags: ai-task, task-list, download · authority: observed
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

In a tool's task list a finished item still downloading shows a placeholder, 「Downloading.」 and a progress bar and
no 「View」; once downloaded it shows its thumbnail and 「View」 (CineStory F15/F16). The list settles by itself.

## KP-057 Result page
- kind: fact · platform: ios · use: analysis, run · tags: ai-task, result
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

Before / After tabs where the tool has them (After selected), else one result; then a Share Video row, 「Add to
Timeline」 and 「You might also like」.

## KP-058 Result page exits
- kind: quirk · platform: ios · use: run · tags: ai-task, result, navigation
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

「Add to Timeline」 returns to the editor with the clip selection lost (root toolbar); the result page's ‹ goes to the
tool's task list, not the editor it came from (ISS-ATC-04, same back-stack gap as KP-026).

## KP-059 Banner View opens before the media is ready
- kind: risk · platform: ios · use: analysis, run, ebug · tags: ai-task, banner, download
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

ISS-ATC-01/02 (High): the banner's 「View」 is offered before the result has downloaded and opens a black result
(00:00/00:00, no loader); the same item from the task list after download plays fine. 「Add to Timeline」 there is a
silent no-op (ISS-ATC-03: the duration reading does not change). Vary: tap the banner's View at once.

## KP-060 Full-screen result player may trap the user
- kind: risk · platform: ios · use: run · tags: ai-task, player
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion) (unverified on a real phone)

Seen only through mirroring (ISS-ATC-05): once the full-screen player's controls auto-hide, taps only toggle play and
neither the controls nor ‹ come back. Recheck on the phone before filing.

## KP-061 Completion and error states the specs leave open
- kind: question · platform: both · use: analysis · tags: ai-task, banner, design
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

CineStory F17 says inform users 「when the task is done」 without saying server-done or downloaded. The banner button
is 「View」 in CineStory F02 and 「View Result」 in Video Object Removal F116 (the build says View). The F15 error
states 「Retry」 and 「View Details」 were never reached.

## KP-079 Some tools save their result to the gallery by themselves
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, results
- source: AIGC Watermark Android run 2026-11-17-r1-full O-13, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-5 · verified: 16.9.0 build 2611193 (2026-11-23)

Video Edit by Chat and AI Anime Video write the result to the gallery when the task finishes, with no 「Save」 tap.
Talking Avatar (2611193) writes it only when the result is first opened (task list › View), still with no Save tap.
Character Motion Swap, Cinematic Reel Creator and Text to Video do not. Whether this is intended is not in any spec.

## KP-080 What a second Save does
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, files
- source: AIGC Watermark Android run 2026-11-17-r1-full O-6, O-10, O-18 · verified: 16.9.0 build 2611161 (2026-11-17)

A Text to Image result saved once is never written again: a second 「Save」 says 「Saved to Gallery」 and leaves the
first file as it was. AI Art, Image to Video and Text to Video write a new file on every Save. In Image to Video file
names the number after the date counts saves, not tasks.

## KP-081 Several Image to Video tasks can run at once
- kind: fact · platform: android · use: run · tags: image-to-video, tasks
- source: AIGC Watermark Android run 2026-11-17-r1-full O-7 · verified: 16.9.0 build 2611161 (2026-11-17)

「Create another one」 is available while a task is 「Processing…」, so generations can overlap to save time. A failed
task's list item reads 「An Error Has Occurred / Credits have been refunded…」.

## KP-082 Models and tools offered on Android
- kind: fact · platform: android · use: analysis, run · tags: models, tier, image-to-video, text-to-video, video-edit-by-chat
- source: AIGC Watermark Android run 2026-11-17-r1-full O-9, O-17, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-3, O-9, O-14 · verified: 16.9.0 build 2611193 (2026-11-23)

On 2611193 (Free and Pro list the same): Image to Video offers Kling 4.0, Kling O3, Pixverse V6, Wan 3.0, Gemini Omni
Flash 1.1, Happy Horse 1.1, Seedance 2.0 (Pro), Veo 3.1, Vidu Q2, Wan 2.7; Text to Video Kling 4.0, Wan 3.0, Seedance
2.0 (Pro), Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3; Video Edit by Chat Seedance 2.5 (default),
Seedance 2.0, Gemini Omni Flash 1.1, Happy Horse, Kling O3, PixVerse V6. No Flux, Hailuo, or Seedance 2.5 in I2V / T2V
(2611161 had 2.5 and no Wan 3.0 in I2V). Video Object Removal is not offered. Lists are server-set: reread each build.

## KP-083 Model pickers reset
- kind: quirk · platform: android · use: run · tags: models, image-to-video, text-to-video, video-edit-by-chat
- source: AIGC Watermark Android run 2026-11-17-r1-full O-7, O-17, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-9 · verified: 16.9.0 build 2611161 (2026-11-17); Video Edit by Chat part 2611193 (2026-11-23)

Image to Video and Text to Video open on 「Kling 4.0」 each time (also after 「Create another one」). On 2611161 Video
Edit by Chat reset to 「Seedance 2.5」 after a source video was picked; on 2611193 a model picked before the source
stays selected. Still read the model back right before Generate.

## KP-084 Portrait Text to Video files are stored landscape
- kind: fact · platform: android · use: run · tags: text-to-video, files, orientation
- source: AIGC Watermark Android run 2026-11-17-r1-full O-18 · verified: 16.9.0 build 2611161 (2026-11-17)

A portrait result is stored 1920 × 1080 with a -90° display matrix (Kling O3 1080p, Wan 2.7 720p); players show it
upright. Read sizes and positions in the displayed orientation.

## KP-085 AI Storytelling results live in its own history
- kind: fact · platform: android · use: analysis, run · tags: ai-storytelling, my-artwork, tier
- source: AIGC Watermark Android run 2026-11-17-r1-full O-16, O-17; AIGC Watermark Android run 2026-11-23-r2-changed O-11 · verified: 16.9.0 build 2611193 (2026-11-23)

AI Storytelling results are not in My Artwork: they are under AI Storytelling › history 「Generated Story」 and are
exported, not saved. A Free account gets one free story; more need Pro.

## KP-090 AI Art's result page has no 「Full Editor」
- kind: fact · platform: both · use: analysis, run, ebug · tags: ai-art, results, full-editor
- source: user, 2026-11-18 (eBug review of AIGC Watermark Android R1, F-2) · verified: 16.9.0 build 2611161 (2026-11-17, TC-046)

AI Art results cannot be opened in the editor: the result page has no 「Full Editor」 (Android shows feedback, share,
download and 「Turn the image into a video」). A spec rule for every image result that names 「Full Editor」 (AIGC
Watermark R-024) applies to AI Art without that step; Text to Image does have it.

## KP-098 Gemini Omni Flash 1.1 in Image to Video always generates sound
- kind: fact · platform: android · use: analysis, run · tags: image-to-video, models, sound
- source: AIGC Watermark Android run 2026-11-23-r2-changed TC-098 · verified: 16.9.0 build 2611193 (2026-11-23)

With 「Gemini Omni Flash 1.1」 picked in Image to Video, 「Generate Sound by AI」 is On and its Off is greyed out; the
result has an audio track (5 s, 25 credits).

## KP-099 Cinematic Reel Creator saves into the Video Enhance folder
- kind: quirk · platform: android · use: run, ebug · tags: cinematic-reel, save, files
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-6 · verified: 16.9.0 build 2611193 (2026-11-23)

Cinematic Reel Creator's Quick actions 「Save」 writes to Movies/cyberlink/PowerDirector/Video Enhance/ with an
「ImageToVideo - <date> - N - <ms>.mp4」 name, not a Cinematic Reel folder, and no 「Saved to Gallery」 toast was caught.
Find the file there by time.

## KP-100 Source video uploads take minutes
- kind: quirk · platform: android · use: run · tags: upload, ai-task, timing
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-7, O-10 · verified: 16.9.0 build 2611193 (2026-11-23)

Tools that upload a source video (AI Anime Video, Character Motion Swap, Video Edit by Chat, Cinematic Reel) show
「100% Uploading / Please keep the app open」 for 4–8 min with a 10–13 s clip and about 1.5 min with a 5 s clip on the
SM-A5360's Wi-Fi. A Cinematic Reel task can then sit on 「Retry」 in the task list; Retry re-uploads and may fail with a
refund (KP-007). Plan waits and keep the app in front.
