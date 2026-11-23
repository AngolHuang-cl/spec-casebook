# Run state — R2 Round 2: rows v2 changed (REQ-007 – REQ-009)

Table: library/pdr/aigc-watermark/android/cases.csv
Started: 2026-11-23T03:29:09.065Z

## Environment
- Device: Samsung SM-A5360 (a53x), adb serial R5CTB22S05Y over USB, Android 15, 1080 × 2400; awake, no keyguard. The run
  folder's `.serial` pins it (written by `restart R5CTB22S05Y`). Appium (Android) on 127.0.0.1:4724 started by
  `restart` (pid 69999); the 4725 server (pid 20626) is the iOS one, left alone.
- Build: PowerDirector 16.9.0 versionCode 2611193 (installed 2026-11-20 16:20, not reinstalled). TR unknown (no TR for
  2611193 in the repo; not searched further).
- Server: Stage (Launcher top bar yellow; /sdcard/cyberlink/PDR/testserver.config present).
- Account: cltqauiap2@gmail.com (「qau2 CLT」), tier Free (Mine 「Free」 「Claim offer」, Launcher last tab 「Mine」).
- Credits: 31827 (Mine, 2026-11-23 11:33; AI Video Enhance pill showed a stale 31377 at segment start).
- 「Remove AIGC Watermark」: On at segment start (Menu › Settings, switch checked). 「Remove watermark」 untouched.
- No Pink / Log stage timings / Write Log on Android (KP-003). logcat capture started 11:30 (`logs/.live/`).
- Left behind by an earlier session: AI Video Enhance setup screen (backed out to the Launcher, nothing changed).

## Checkpoints

### 2026-11-23T03:59:24.228Z · next TC-099 (R2-b)
{"Pass":9,"Fail":1,"Blocked":3,"Not run":26}

R2-a done (13/13: 9 Pass, 1 Fail TC-121, 3 Blocked test-data TC-091/092/095). Phone SM-A5360 R5CTB22S05Y, 16.9.0 (2611193), Stage (yellow bar), cltqauiap2@gmail.com Free. 「Remove AIGC Watermark」 is OFF now (was On at segment start; turned Off 11:47 after TC-121/TC-122). Credits 31651 (log totalRemain 11:56). App left on the Image to Video task list (Custom 1–6 saved; files in files/). Logs pulled 11:58 to logs/R2-a-20261123-115850, logcat capture still running. c2patool missing on this computer and git/brew blocked by the unaccepted Xcode license: C2PA read with files/c2pa_inspect.py (O-2). Recipe added: recipes/itv-generate.steps. Album picker remembers 00PDRa_Testing_Material (photo_9_16.jpg at 539,1783).
