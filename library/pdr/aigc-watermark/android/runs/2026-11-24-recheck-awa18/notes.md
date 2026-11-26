# Recheck ISS-AWA-18 on a stable network (2026-11-24)

Build 16.9.0.2611193, SM-A5360 R5CTB22S05Y, Stage.

## Network (09:30)
- `wifi status`: Wi-Fi on · connected to "17F-QAAPP-2.4G" (RSSI −44, 52 Mbps, 2437 MHz)
- `ping -c 5 8.8.8.8`: 5/5, 0% loss, avg 79 ms; `ping -c 20 -i 0.5`: 20/20, 0% loss, avg 38 ms
- 09:48 again: `ping -c 10 8.8.8.8` 10/10, 0% loss, avg 25 ms

## Tier
- 09:31 Mine 「Free」 「Claim offer」 (R3's test subscription lapsed). 09:32 Play sheet 「Test card, always approves」 / 「This is a test subscription… You will not be charged.」 → Subscribe. Mine 「Pro」, 30612 credits.

## ISS-AWA-18 recheck (speech_noise_1.mp4, new Project 11-24, switch Off, AIGC dialog → Export, no 「Don't show again」)
| Time | Voice | After Apply | After ✓ | Produce |
|---|---|---|---|---|
| 09:36–09:38 | Jill (Professional) | 2_…209161.m4a + 3_…209690.m4a | 3_ only | Saved to Gallery (produceSuccess 09:37:32) |
| 09:39–09:40 | Kathleen | new 2_ + 3_ | 3_ only | Saved to Gallery (09:40:39) |
| 09:41–09:43 | Radio 1 (Effect, control) | no m4a | — | Saved to Gallery (09:43:36), no AIGC dialog |
| 09:44–09:47 | Margaret, app cold-restarted before Produce | new 2_ + 3_ | 3_ only | Saved to Gallery (09:47:42) |

Audio of each output differs from the source and from each other (PCM md5), so the AI voice is in the video. Every Upload to S3 finished in 5–6 s.
**Result: does not reproduce, 0/3 AI voices.** Draft entry withdrawn. Detail: cache-ls.txt, files/awa18-recheck-log.txt, logs/.
