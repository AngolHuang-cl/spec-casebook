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
  **Tier Pro from 2026-11-23 14:22:** Google Play test subscription bought on the phone (Mine › 「Claim offer」 ›
  Yearly NT$1190 › Continue; Play sheet 「Test card, always approves」, 「This is a test subscription… You will not be
  charged」, billed every 30 min as Play test subscriptions renew; user approval in chat 2026-11-23). Mine then reads
  「Pro / You're on the highest plan」, +100 monthly credits (31221 → 31321). Test renewals end after a few cycles, so
  a later segment re-checks the tier on Mine and buys again if it lapsed to Free.
- Credits: 31827 (Mine, 2026-11-23 11:33; AI Video Enhance pill showed a stale 31377 at segment start).
- 「Remove AIGC Watermark」: On at segment start (Menu › Settings, switch checked). 「Remove watermark」 untouched.
- No Pink / Log stage timings / Write Log on Android (KP-003). logcat capture started 11:30 (`logs/.live/`).
- Left behind by an earlier session: AI Video Enhance setup screen (backed out to the Launcher, nothing changed).

## Checkpoints

### 2026-11-23T03:59:24.228Z · next TC-099 (R2-b)
{"Pass":9,"Fail":1,"Blocked":3,"Not run":26}

R2-a done (13/13: 9 Pass, 1 Fail TC-121, 3 Blocked test-data TC-091/092/095). Phone SM-A5360 R5CTB22S05Y, 16.9.0 (2611193), Stage (yellow bar), cltqauiap2@gmail.com Free. 「Remove AIGC Watermark」 is OFF now (was On at segment start; turned Off 11:47 after TC-121/TC-122). Credits 31651 (log totalRemain 11:56). App left on the Image to Video task list (Custom 1–6 saved; files in files/). Logs pulled 11:58 to logs/R2-a-20261123-115850, logcat capture still running. c2patool missing on this computer and git/brew blocked by the unaccepted Xcode license: C2PA read with files/c2pa_inspect.py (O-2). Recipe added: recipes/itv-generate.steps. Album picker remembers 00PDRa_Testing_Material (photo_9_16.jpg at 539,1783).

### 2026-11-23T06:41:32.779Z · next TC-014 (R2-c)
{"Pass":23,"Fail":1,"Blocked":7,"Not run":8}

R2-b done (18/18: 13 Pass, 5 Blocked test-data TC-101/103/104/105/109). TC-112 Pass (Cinematic Reel Kling O3 「Micro Cinema」, file written at Save 14:19). Account bought the Pro test subscription at 14:22 (Play test card; Mine reads Pro; record in Environment); then re-ran TC-091 (ITV Seedance 2.0), TC-100 (TTV Seedance 2.0), TC-110 (AI Storytelling): all Pass, one CyberLink manifest each by c2patool 0.29.0. Phone SM-A5360 R5CTB22S05Y, 16.9.0 (2611193), Stage, cltqauiap2@gmail.com **Pro** (test subscription renews every 30 min and may lapse: re-check Mine before R2-c). 「Remove AIGC Watermark」 **Off** (read back 14:22). Credits 31216 (14:40). App left on the credit ledger (Details) above Image to Video. Logs pulled 14:41 to logs/R2-b-20261123-144110; the one logcat capture (since 11:58) still runs. c2patool now at /opt/homebrew/bin (O-2 resolved). Next: R2-c (Music Generator) from TC-014; not started.

### 2026-11-23T07:15:08.427Z · all recorded
{"Pass":29,"Fail":2,"Blocked":8}

R2-c done (8/8: 6 Pass, 1 Fail TC-119 music has no C2PA manifest, 1 Blocked test-data TC-120 no lyrics path). O-14: model lists re-read on Pro, still no Flux/Hailuo/Vidu/Pixverse (6 Blocked rows annotated). Phase R2 complete: 39/39. Phone SM-A5360 R5CTB22S05Y, 16.9.0 (2611193), Stage, cltqauiap2@gmail.com Pro (updateSubscribingStatus true 15:14). 「Remove AIGC Watermark」 Off (turned On 15:11 for TC-063, Off again 15:13:56, read back unchecked). Credits 31171 (log 15:13:39; ITV Gemini 25, two music batches 10 each). App on the Launcher. Logs pulled 15:14 to logs/R2-c-20261123-151408; logcat capture still runs. Projects left: two photo_9_16 projects (one with song 01) from 15:04 and 14:45.
