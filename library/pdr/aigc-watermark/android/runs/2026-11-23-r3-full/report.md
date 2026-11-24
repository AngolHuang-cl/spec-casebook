# AIGC Watermark Android — R3 report (full run of table v3)
- Build 16.9.0 (2611193), installed 2026-11-20 (not reinstalled; TR not identified), Stage. Phone Samsung SM-A5360 /
  Android 15 (R5CTB22S05Y). Account cltqauiap2@gmail.com: Pro (R2's Play test subscription) until it lapsed 17:58,
  Free 17:58–19:00, Pro again from 19:00 (Play test subscription, test card). Table v3 (127 rows), draft
  20261123-152127, phase R3: every row. 2026-11-23 15:44–20:14. Nothing filed or committed.

## Final tally
**77 Pass, 19 Fail (14 defect, 5 question), 31 Blocked (23 test-data, 3 defect upstream, 5 observability by
policy), 0 Not run, 0 Inconclusive.**

| Segment | Rows | Pass | Fail | Blocked |
|---|---|---|---|---|
| R3-a Settings: switch, tiers, ⓘ sheet, persistence | 7 | 7 | 0 | 0 |
| R3-b Image results, image C2PA, re-save | 15 | 10 | 3 | 2 |
| R3-c Image to Video, C2PA per model | 16 | 11 | 1 | 4 |
| R3-d Other video results | 31 | 22 | 5 | 4 |
| R3-e Text to Video | 13 | 8 | 1 | 4 |
| R3-f Music Generator | 14 | 7 | 4 | 3 |
| R3-g Editor tools, export dialog, project export | 28 | 11 | 4 | 13 |
| R3-h One-way states | 3 | 1 | 1 | 1 |

(R3-a's Free rows TC-001/003/005/006 were Blocked on Pro first and re-run Pass once the subscription lapsed.)

**What works on 2611193:**
- Settings: the ⓘ sheet has no X any more (TC-003 Pass; R1's DRA262611P0214); the switch turns On on Free with no
  paywall and keeps its value.
- C2PA: every saved video result (I2V Veo 3.1, Seedance 2.0, Kling O3, Vidu Q2, Pixverse V6, Wan 2.7, Gemini Omni
  Flash 1.1; T2V Kling O3, Veo 3.1, Wan 2.7; Video Edit by Chat, Cinematic Reel, Motion Swap, AI Anime Video, Talking
  Avatar, AI Storytelling) and every image saved Off carries exactly one valid CyberLink manifest, no ingredient.
- Label: every Off save labelled over 0–1.9 s at 12% of the short side, none at 2.1 s; every On save unlabelled.
- Export dialog: opens at the editor's 「Export」 (O-8); Cancel returns to the editor (TC-084 / TC-085 Pass, R1's
  DRA262611P0225 no longer reproduces); 「Don't show again」 silences it for the next export of the project and both
  exports keep the label (TC-129, AI Anime project: the editor has no AI Sketch on 2611193).
- Music: no spoken clip in any song (REQ-009).

## Fail details (all repeats; none drafted)
| Rows | Finding | eBug |
|---|---|---|
| TC-051, TC-089 | Text to Image: a second Save writes no new file, so the switch change is lost | DRA262611P0216 (**RDResolved**, still reproduces on 2611193) |
| TC-121 | Text to Image saved On keeps Google's file and manifest, no CyberLink manifest | DRA262611P0218 (Assigned) |
| TC-017, TC-020, TC-023, TC-026, TC-035, TC-038, TC-041 | Full-screen player draws the 「AI」 badge over the first ~1–4 s (I2V, T2V, Video Edit by Chat, Cinematic Reel, Motion Swap, AI Anime Video, Talking Avatar) | DRA262611P0219 (Assigned) |
| TC-054, TC-057 | Music Generate opens no AIGC dialog with the switch Off | DRA262611P0229 (NewCreated) |
| TC-061 | Music + photo project exports with no AIGC dialog and no label | DRA262611P0223 (Assigned) |
| TC-119 | Songs carry no C2PA manifest | R2 draft ISS-AWA-17 (not filed yet) |
| TC-064, TC-067, TC-070 (question) | No AI label in the editor preview (Q-10) | DRA262611P0224 (NewCreated) |
| TC-068 (question) | Voice Changer Effect voice: export has no dialog, no label; the Pro AI voices cannot be produced (O-9) | table question (R1); O-9 drafted as ISS-AWA-18 |
| TC-008 (question) | 「Remove AIGC Watermark」 On after `pm clear`, signed out and after sign-in (Q-1) | DRA262611P0227 (NewCreated) |

Correction at wrap-up: R3-b's results and the plan Log named DRA262611P0217 for TC-051 / TC-089; the second-Save
ticket is DRA262611P0216 (P0217 is the share-without-label ticket). Fixed in results.csv and the plan Log.

## Compared with R1 (2611161, table v1, Sony XQ-BT52) and R2 (2611193, changed rows)
- Fixed in the build: info sheet X gone (TC-003, P0214); editor preview of an AI-art photo unlabelled (TC-049); export
  dialog at 「Export」 with a clean Cancel (TC-084 / TC-085, P0225).
- Gone from the build: AI Style Transfer (AI Cartoon / AI Sketch) in the editor (TC-073 – TC-078 Blocked; P0226, the
  90° turn, cannot be rechecked there), Video Object Removal, Flux / Hailuo / Vidu-T2V / Pixverse-T2V models.
- Pass now because the table changed (REQ-007 – REQ-009, not the build): the C2PA rows TC-090 – TC-114 and TC-122 (one
  CyberLink manifest expected) and the music rows TC-014, TC-058, TC-059 (no spoken clip expected).
- Unchanged: P0216, P0218, P0219, P0223, P0224, P0227, P0229, and R2's ISS-AWA-17 (TC-119).
- Phone, not build: Instagram rows Blocked (not installed on the SM-A5360; R1's Sony had it).
- R2 → R3 on the same build: same results on every shared row; R3 adds the full table.

## Blocked reasons (`blocked-reasons.json`)
- test-data: Instagram not installed (TC-044, TC-045, TC-052, TC-053, TC-079, TC-080); models not offered (TC-092,
  TC-095, TC-101, TC-103, TC-104, TC-105); Video Object Removal not offered (TC-029 – TC-031, TC-109); no AI Cartoon /
  AI Sketch in the editor (TC-073 – TC-078); no lyrics path (TC-120).
- defect upstream TC-054 / P0229: TC-055, TC-056, TC-128.
- observability by policy (Q-13): TC-123 – TC-127.

## Observations (`observations.md`, O-1 … O-11)
- O-9 (**drafted ISS-AWA-18**): a project with a Pro AI Voice Changer voice cannot be produced: 「…VoiceChanger/Cache/
  <clip>.m4a is missing」; the cache m4a is deleted at the panel's ✓.
- Knowledge contradicted: O-4 (Talking Avatar auto-saves at task finish; KP-079), O-8 (export dialog at 「Export」;
  KF-005), O-11 (after `pm clear` on Stage the account signed in again, bindMember success; KP-093).
- O-1 Add to Timeline writes a labelled gallery copy; O-2 AI Art 「Session timeout」 ×2 (refunded); O-3 Veo Off save
  stored rotated; O-5 stale 「Processing...」 tiles; O-6 Storytelling upload timeouts (recovered); O-7 subscription
  lapse, switch On on Free with no paywall; O-10 Wi-Fi loss 19:05–19:36 (environment).

## Coverage (`coverage-page.ts … --runs 2026-11-23-r3-full` → `android/coverage.html`, local)
Controls: 8 pressed (by row), 1 not run, 32 n/a; arrows: 9 walked, 1 blocked (music dialog); spec notes 32/32 traced
(18 ran, 14 n/a). No tap proofs: this run wrote no `taps.jsonl`.

## Credits
31171 (15:45, Pro) → 31156 (R3-b) → 30984 (R3-c, 6 I2V) → 30627 (R3-d, 9 generations) → 30529 (R3-e, 3 T2V) → 30484
(R3-f, 2 music runs + 1 I2V) → 30542 (R3-g: −2 TTS, +100 Pro bonus, −40 AI Anime Video) → 30572 (R3-h sign-in, +30
loyalty bonus). Refunds: AI Art 「Session timeout」 ×2 (O-2). No failure without a refund.

## Time and tokens
- `run-log.ts time`: wall 4 h 31 m (15:44–20:14), test 4 h 31 m, idle 0. Per segment: R3-a 7 m, R3-b 31 m, R3-c 22 m,
  R3-d 1 h 16 m, R3-e 15 m, R3-f 22 m, R3-g 1 h 30 m, R3-h 7 m.
- Tokens (`token-usage.ts --since 07:43Z`, the 9 transcripts naming the run, through this wrap-up): 1,232 messages,
  input 2.7 k, cache write 1.98 M, cache read 248.9 M, output 447 k. Usage-card percentages: Progress page and
  `runs/usage.jsonl` (read by the orchestrator).

## eBug drafts: 1 entry (`ebugs/2026-11-23-r3/`)
| # | Finding | Rows | Type · Sev · Owner |
|---|---|---|---|
| ISS-AWA-18 | AI Voice Changer: project with an AI voice fails to produce; the voice's cache m4a is missing | O-9 (TC-067 – TC-069) | Func · S2 · RD |

- Format check 0 errors; review page `20261123_eBug_review_AIGC-Watermark-R3_16.9.0.html` (no TR for 2611193 found).
- Dedupe (Android pool, 160 Voice Changer tickets + an 「is missing」 search): no duplicate; DRA242408-0154 (closed,
  Voice-Over 「Media not found」) named as related. All 19 Fail rows left off (`dedupe.txt`).

## Phone left
Launcher Home after `pm clear` (20:12) and sign-in: qau2 CLT / cltqauiap2@gmail.com, Pro (Play test subscription from
19:00, lapses within hours, KP-068), 30572 credits, Stage (yellow bar, testserver.config in place), 「Remove AIGC
Watermark」 Off (read back 20:14). Local data wiped by the reset: projects, My Artwork history, every 「Don't show
again」 state. logcat capture running.
