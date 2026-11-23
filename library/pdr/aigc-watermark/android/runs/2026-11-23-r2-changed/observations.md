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
