# Observations — R2 (2611193, SM-A5360)

- **O-1 (TC-121, TC-118)** Text to Image saved with 「Remove AIGC Watermark」 On writes Google's raw file: a PNG
  (1024 × 1024, 2,157,262 bytes) under a `.jpg` name (`1_1795404764471.jpg`), with Google's C2PA manifest only. Saved
  Off, the same model gives a real JPEG (930,582 bytes) re-signed by CyberLink. Confirms KF-001 on 2611193. libclc2pa
  was loaded only at 11:37:43, right as the On file was written. Evidence: files/TC-121-t2i-on.*, files/TC-118-t2i-off.*.
- **O-2 (all C2PA rows)** This computer has no c2patool (fixtures.md says /opt/homebrew/bin, installed 2026-11-17 on
  another machine), and `brew install c2patool` and `git` both stop on 「You have not agreed to the Xcode license」.
  Accepting it (`sudo xcodebuild -license accept`) is the user's. The segment read every file with
  files/c2pa_inspect.py (JUMBF/CBOR parser: manifest count, signer certificate via openssl, COSE ES256 signature,
  assertion hashes, c2pa.hash.data / c2pa.hash.bmff.v3 hard binding; certificate trust not checked). Its results match
  what c2patool reported in R1 for the same kinds of file. Re-read the files with c2patool once it is installed.
  **Resolved (2026-11-23 14:30):** c2patool 0.29.0 is now installed (/opt/homebrew/bin); the orchestrator re-read
  R2-a's files with it and all verdicts held (files/c2patool-recheck-R2-a.md); R2-b used c2patool directly.
- **O-3 (TC-091; KP-082)** Image to Video on 2611193 (Free, Stage) lists Kling 4.0, Kling O3, Pixverse V6, Wan 3.0,
  Gemini Omni Flash 1.1, Happy Horse 1.1, Seedance 2.0 (Pro), Veo 3.1, Vidu Q2, Wan 2.7: Seedance 2.5 is gone (R1 on
  2611161 had it) and Wan 3.0 is new. O-3 contradicts KP-082 (Seedance 2.0 and 2.5; no Wan 3.0).
- **O-4 (TC-118, TC-117, TC-090)** With the switch Off the Image to Video result page's still preview draws the 「AI」
  badge (screenshots/TC-090-result.png, as KF-004 says), but the Text to Image and AI Art result pages draw none
  (screenshots/TC-118-result.png, TC-117-open.png). KF-004 does not say whether it covers image results; no row of this
  segment judges it.

## R2-b (12:00–13:30)

- **O-5 (TC-116; contradicts KP-079 / KF-006)** Talking Avatar did not write its result when the task finished
  (banner ~12:56, nothing new under Movies/ at 12:59): the file appeared at 13:00:36, the moment the result was opened
  from the task list (View), still with no 「Save」 tap. AI Anime Video (12:31) and Video Edit by Chat (12:40, 12:46)
  did write at finish. Which moment KF-006's switch-state rule uses for Talking Avatar therefore needs a recheck.
- **O-6 (TC-111)** Cinematic Reel Creator's Quick actions 「Save」 writes to Movies/cyberlink/PowerDirector/**Video
  Enhance**/ with an 「ImageToVideo - …」 name (ImageToVideo - Nov 23 - 1 - 1795410123538.mp4), not a Cinematic Reel
  folder, and showed no 「Saved to Gallery」 toast that `waitfor` caught.
- **O-7 (TC-112; refund OK)** Cinematic Reel 「Handheld Camera」 (Kling, AICinematicShorts
  genvideo_1_sec_kling_o3pro_enable_1080p, −48 at 12:43) sat on 「Retry」 in the task list after its S3 upload finished
  (12:44:18; no 「apply effect」 call logged). 「Retry」 at 13:03:56 re-uploaded, then `applyEffect status: Error null`
  (13:04:48); 「View Details」: 「An Error Has Occurred / Credits have been refunded. Please try again later.」 Ledger
  「Generation failed, credits returned +48」 2026/11/23 13:04; balance 31221 → 31269. A second Kling template (Micro
  Cinema) was used for TC-112. Evidence: screenshots/TC-112-started.png, TC-112-error-list.png,
  TC-112-handheld-error.png, ledger.png.
- **O-8 (TC-108, TC-107; contradicts KF-004)** With the switch Off, Character Motion Swap's result page draws the 「AI」
  badge on its still preview (screenshots/TC-108-result.png); KF-004 says that page draws none either way. The
  Cinematic Reel result page draws it too (waitfor-timeout-20261123-130333.png). No row of this segment judges it.
- **O-9 (contradicts KP-082 / KP-083)** Text to Video on 2611193 (Free, Stage) lists Kling 4.0, Wan 3.0, Seedance 2.0
  (Pro, 「Subscribe Pro to Unlock」), Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3: no Seedance 2.5
  (KP-082 lists it). Video Edit by Chat lists Seedance 2.5 (default), Seedance 2.0, Gemini Omni Flash 1.1, Happy Horse,
  Kling O3, PixVerse V6; Kling O3 picked before the source video stayed selected after the source was picked (KP-083:
  resets to Seedance 2.5). Prices seen: T2V Veo 3.1 4s Fast 28, Kling O3 5s 1080p 30, Wan 2.7 5s 1080p 40; VEC Gemini
  Omni Flash 1.1 8/s (40 for 5 s), Kling O3 5/s (25); Motion Swap Wan 2.2 Animate 3/s (39), Kling Motion Control 6/s
  (60); Cinematic Reel templates: Horror Movie 70 (Seedance 2.0 720p), Micro Cinema / Handheld Camera / One-Take Shot /
  Time Lapse 48, Fast Cut 72; AI Anime Video 10 s 40; Talking Avatar 10. The credit ledger's log line
  (`getCreditHistory … actionId=…`) names each charge's provider and model, the only place Cinematic Reel's model shows.
- **O-10** S3 uploads of 10–13 s source videos took 4–8 minutes on this phone's Wi-Fi (AI Anime Video, Motion Swap),
  with 「100% Uploading / Please keep the app open」 on screen the whole time; a 5 s clip (Video Edit by Chat) ~1.5 min.
- **O-11 (TC-110)** AI Storytelling on this Free account: 「Subscribe Pro to Unlock」 in place of the create button, and
  its history 「Generated Story」 is empty, so no story exists to export (KP-085's one free story is used up).
- **O-12 (TC-110, switch Off)** AI Storytelling 「Export」 (Pro, 14:34) first shows 「AIGC Watermark / Your exported
  file will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」 with 「Don't show again」,
  Cancel and Export (screenshots/TC-110-export.png); the story editor's preview draws the 「AI」 badge
  (screenshots/leave.png). 「Don't show again」 was left unchecked. No row of this segment judges the dialog.
- **O-13 (TC-110)** The exported story's manifest says c2pa.created with digitalSourceType
  compositeWithTrainedAlgorithmicMedia; every other video result in R2 says trainedAlgorithmicMedia. Both mark AI
  content; the rows do not ask for a type.
- **O-14 (Pro, 14:22)** On Pro, Seedance 2.0 runs in Image to Video (Standard, 5 s, 40) and Text to Video (Fast 720p
  5 s, 40); the ledger names them bytedance seedance2.0fast. The model lists were not re-read on Pro, so TC-092/095
  (Flux, Hailuo) and TC-101/103/104/105 stay Blocked as recorded on Free.

## R2-c (14:42–15:14)

- **O-14 resolved (Pro, 14:44 / 14:49)** Model lists re-read on Pro: Image to Video lists the same 10 models (Kling 4.0,
  Kling O3, Pixverse V6, Wan 3.0, Gemini Omni Flash 1.1, Happy Horse 1.1, Seedance 2.0, Veo 3.1, Vidu Q2, Wan 2.7), Text
  to Video the same 8 (Kling 4.0, Wan 3.0, Seedance 2.0, Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling
  O3): no Flux, Hailuo, Vidu (T2V) or Pixverse (T2V), so TC-092/095/101/103/104/105 stay Blocked n/a
  (screenshots/o14-itv-models1/2.png, o14-ttv-models1/2.png). The Launcher hero now reads 「Create with Seedance 2.5」.
- **O-15 (TC-059)** The phone's third-party 「File Manager」 (com.alphainventor.filemanager, the default handler for the
  Music folder) cannot play an AI Music Generator song: media session 「Codec not supported : audio/mp4a-latm」. The songs
  are AAC at 96 kHz; Samsung's sound player plays them. A 96 kHz song is unusual for a music file; whether other common
  players fail too is not checked. No row judges it.
- **O-16 (TC-054 / TC-057, R1 Fail still on 2611193)** With the switch Off, 「Generate for ◆ 10」 (14:49:31) went straight
  to 「Generating...」: no 「AIGC Watermark」 dialog, as R1 found (TC-054 / TC-057 Fail). TC-014's step 「answer the AIGC
  dialog with 「Generate」」 had no dialog to answer; TC-014 judges only the clip.
- **O-17 (table, TC-128)** TC-128 Step 3 still expects 「the second song still starts with the spoken clip」, which
  contradicts REQ-009 (no song carries the clip) that changed TC-014 / TC-058 – TC-063. TC-128 was not in R2's changed
  rows; its expected result needs the same update.
- **O-18 (tooling)** A `device-android.ts hold` on a My AI Music row (14:57) never returned (moved to the background,
  stopped after 2 min); after it Appium taps on that screen and later screens were dropped or partly taken, and the
  My AI Music page went blank (only its title) with Back and ← doing nothing, until `restart` (15:06). After the
  restart the same controls worked (History, +). Not an app finding; prefer `adb shell input` or `restart` after a
  hung command.
- **O-19 (TC-060)** Adding a song from My AI Music opens 「Select Range」 (default 00:00–00:10, 「Import Full Song」
  unticked). Exporting the photo + song project with the switch Off showed no AIGC dialog and wrote no C2PA claim
  (as KF-005 / R1 TC-061); libclc2pa.so was loaded at that export (15:08:22) all the same.
