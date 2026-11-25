# ISS-VEA-56 upload recheck — 2026-11-25 (not part of R3's results)

Draft: `ebugs/2026-11-24-r3/20261125_eBug_drafts_Video-Enhance-R3_16.9.0.md` ISS-VEA-56 (4 of 18 short-clip uploads broke
off at S3 on 17F_QA_Wifi_5G in R3, 2026-11-24 evening). Recheck asked before filing (KP-105).

## Setup
- Samsung SM-A5360 (R5CTB22S05Y), Android 15; PowerDirector 16.9.0 build 2611231; Stage (yellow bar, `[AID]Stage_Server`);
  cltqauiap2@gmail.com, Pro.
- Clip ve-real-000320-720p30 (3.2 s 720p30, album casebook-ve-real), Standard mode, the 18 chip combinations of
  `recipes/combo-row/g1-rows.txt` (R3-g1 rows TC-219 – TC-237 standard set). Driver `loop.sh`: open the panel, set the chips,
  Enhance, wait for Recent task and for the task to finish, read the newest card's action, back to the Launcher. No View or Save.
- Upload results from logcat (`uploads.py`: every 「Upload to S3: start」 with its finish or an exception such as
  「unexpected end of stream」, 「Broken pipe」, 「Connection reset」, 「SocketTimeout」). Logs: `logs/` (git-ignored).

## Results
| Network | When | Ping before / after (8.8.8.8) | Tasks | Uploads OK | Breaks | Upload time | Cards |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 17F-QAAPP-2.4G (2437 MHz, RSSI −41) | 09:30 – 10:27 | 0% / 0% loss | 18 | 18 | 0 | 65 – 66 s each | 18 × 「View」 |
| 17F_QA_Wifi_5G (5805 MHz, RSSI −59) | 10:57 – 11:16 | 0% / 0% loss | 6 | 6 | 0 | 65 – 67 s each | 6 × 「View」 |

- No `exception->` line and no `applyEffect status: Error` in the whole capture; each task had exactly one
  「Upload to S3」 start (no retry needed, none seen).
- Every upload of the ~2 MB clip took 65 – 67 s on both networks, whatever the output setting: the same slowness as
  DRA262611P0236, and so uniform it looks like a fixed wait rather than bandwidth.
- Credits: each task charged once at create session (4 / 8 / 12 / 24 / 32 by setting; logcat totalRemain 30009 →
  29833 over the 2.4G set, last charge shown after the purchase). No failed task, so no refund to track.
- Pro: logcat `updateSubscribingStatus: false` already at 09:29 (KP-068 lapse); the panel acted Pro until 10:30, when it
  showed 「Unlock Pro to Enhance」 (first 5G attempt stopped there, no task started: `loop-w5-attempt1-prolapse.out`).
  Re-bought at 10:56 on the Play test sheet (「Test card, always approves」, 「You will not be charged」;
  `screenshots/play-1.png`): `updateSubscribingStatus: true`, +100 monthly bonus (29833 → 29901 after the pending −32).
- End: Pro, logcat totalRemain 29865 (one −24 charge still to show, so about 29841). Wi-Fi left on 17F-QAAPP-2.4G
  (fixtures.md names no network, only 「Wi-Fi on」).

## Reading
0 breaks in 24 uploads today (18 on 2.4G, 6 on the 5G network that failed 4 of 18 last night), with no packet loss on
either. The R3 breaks did not reproduce on either network: they line up with the 5G network's packet-loss episodes
(KP-105) rather than a fault in the app's upload. The app has no retry at the upload: R3's breaks each ended the charged
task on a Retry card at once (one start, no second attempt), which is the part RD could still be asked to judge.
