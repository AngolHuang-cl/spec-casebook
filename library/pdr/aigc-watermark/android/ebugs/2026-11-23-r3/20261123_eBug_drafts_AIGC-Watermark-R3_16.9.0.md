# AIGC Watermark (Android) — eBug drafts, round R3 (table v3, full run), PDR-A 16.9.0 build 2611193

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-23-r3-full/` — round R3 of draft `drafts/20261123-152127` (table v3, 127 rows), 2026-11-23 15:44 → 20:14, on Samsung SM-A5360 (Galaxy A53 5G) / Android 15 (adb R5CTB22S05Y) through Appium / UiAutomator2, PowerDirector 16.9.0 build 2611193 (installed 2026-11-20; TR not identified), Stage server, account cltqauiap2@gmail.com (Pro by Play test subscription, Free 17:58–19:00). Tally: 77 Pass, 19 Fail, 31 Blocked.

**Status:** nothing filed, uploaded or commented. **Recheck 2026-11-24 (09:30–09:48, stable network, run `runs/2026-11-24-recheck-awa18/`): ISS-AWA-18 does not reproduce (0/3) and is withdrawn; nothing in this batch is to be filed.** Dedupe: Android pool only (per OS, user 2026-10-28).

Rules: reviewer rules 2026-10-21 (one action per Repro step, a Spec Link on every entry with the URL on its own line, an image on every entry, the log on failure-related ones, no video); `[AIAgent]` owner RD for defects.

**What is drafted:** no entry to file. ISS-AWA-18 (RD Functional, from observation O-9) is kept below with its full body but **withdrawn**: the 2026-11-24 recheck on a stable network produced every AI voice normally (0/3), so R3's 4/4 is put down to the 19:05–19:36 Wi-Fi loss (O-10). Every one of the 19 Fail rows repeats a filed Android ticket or the R2 draft ISS-AWA-17 and is left off (`dedupe.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ⛔ WITHDRAWN — ISS-AWA-18 — A project with an AI Voice Changer voice cannot be produced: the voice's cache file is missing  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** O-9 (closest TC-067, TC-068, TC-069)  ·  **Reproduce:** 0/3 on a stable network, 2026-11-24 09:36–09:47 (Jill, Kathleen, Margaret; R3: 4/4 at 19:02–19:24 during the Wi-Fi loss O-10)  ·  **Verified on:** 16.9.0.2611193

> **QA note — not pasted into eBug.** **⛔ Withdrawn after recheck (2026-11-24): does not reproduce on a stable network, not to be filed.** Network checked first: Wi-Fi 17F-QAAPP-2.4G, RSSI −44 dBm, `ping 8.8.8.8` 5/5, 20/20 and 10/10 with 0% loss (09:30, 09:48). Pro by a new Play test subscription (test card sheet, 09:32). New project from speech_noise_1.mp4, reopened from 「Project」 each time as the Repro steps say, switch Off: Jill (09:36), Kathleen (09:40) and Margaret (applied 09:44, app cold-restarted, project reopened, produced 09:47) all showed 「Applied」 and 「Produce」 succeeded (「Saved to Gallery」, logcat `page=produceSuccess` 09:37:32, 09:40:39, 09:47:42); each output's audio differs from the source and from the others, so the AI voice is in the video. 「Radio 1」 control produced normally (09:43). `ls` of files/VoiceChanger/Cache/: two converted m4a after Apply (2_<n>.m4a, 3_<n>.m4a), and after ✓ the 2_ file is removed while 3_<n>.m4a stays, so ✓ does not delete the file the project uses; every `Upload to S3` finished in 5–6 s (R3's failure followed an S3 `SocketTimeoutException`). Evidence: runs/2026-11-24-recheck-awa18/ (screenshots awa18-a*–d*, cache-ls.txt, files/awa18-recheck-log.txt, logs/). Reopen only if it is seen again on a good network. R3 record: Seen 19:02–19:24 on Pro (Play test subscription, 19:00), switch On. Every Professional / Mellow / Bright AI voice applied from a clip's 「Audio Tools」 › 「AI Voice Changer」 shows 「Applied」 and 「Voice Changer On」, but 「Produce」 then fails. `adb shell ls` of files/VoiceChanger/Cache/ shows the converted m4a right after Apply (speech_noise_1_1795432979061.m4a, 161,242 B, 19:23) and no m4a right after the panel's ✓, so the ✓ appears to delete the file the project still points at. The Effect voice 「Radio 1」 (no conversion) produced normally (TC-068, TC-069 used it instead). Not this feature's own rule, but it stops the AIGC rows for Voice Changer (R-037, R-038, Q-10) from being judged with a real AI voice. Related, closed: DRA242408-0154 (14.3.0, Voice-Over clip 「Media not found」 after applying AI Voice Changer). With the 6-channel clip the S3 upload also timed out during the 19:05–19:36 Wi-Fi loss (O-10); the speech_noise_1 failure at 19:18 is outside that cause's pattern (the file existed, then was removed).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Voice Changer: Project with an AI voice fails to produce; voice cache m4a missing
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Project」
3. Tap a project holding a video clip with speech
4. Tap the clip on the timeline
5. Tap 「Audio Tools」
6. Tap 「AI Voice Changer」
7. Tap the voice 「Jill」
8. Tap 「Apply」
9. Tap ✓
10. Tap 「Export」
11. Tap 「Produce」
12. Check the result

Result:
Produce fails: 「…/VoiceChanger/Cache/<clip>.m4a is missing.」 The file is deleted at ✓.
摘要：套用 AI 變聲後輸出失敗，變聲快取 m4a 在按 ✓ 後被刪除。
{16.9.0_awa18_produce_missing.jpg} {16.9.0_awa18_log.txt}

Expect Result:
The project is produced with the applied AI voice.
摘要：應能正常輸出含 AI 變聲的影片。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Related: DRA242408-0154 (closed, 14.3.0): Voice-Over clip shows 「Media not found」 after applying AI Voice Changer
Spec Link: Remove AIGC Watermark PM spec, pm-rules board (Timeline AI content: Text-2-Speech, Voice Changer, AI Anime, AI Cartoon, AI Sketch; Export, Share follow the setting) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261123_eBug_drafts_AIGC-Watermark-R3_16.9.0_images/01_ISS-AWA-18/`

---

## Not raised (observations, for the record)

| Item | What | Why |
|---|---|---|
| ISS-AWA-18 (O-9) | AI Voice Changer: project with an AI voice failed to Produce, 「…/VoiceChanger/Cache/<clip>.m4a is missing」 | ⛔ withdrawn 2026-11-24: 0/3 on a stable network (Jill, Kathleen, Margaret produced; Radio 1 control produced); R3's 4/4 fell inside the Wi-Fi loss O-10 |

## Reconciliation against the run

19 Fail (14 defect, 5 question), 31 Blocked, 0 Not run, observations O-1 … O-11.

| Step | Count | Running total |
|---|---|---|
| Fail rows | 19 | 19 |
| → left off: same-OS ticket, open or RD-resolved (`dedupe.txt`) | −17 | 2 |
| → left off: repeats the unfiled R2 draft ISS-AWA-17 (TC-119) | −1 | 1 |
| → not raised: table question, Effect voice only (TC-068) | −1 | 0 |
| + observation O-9 (Produce fails with an AI voice) | +1 | 1 |
| → withdrawn: ISS-AWA-18 does not reproduce on a stable network (recheck 2026-11-24, 0/3) | −1 | **0 entries** |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-051, TC-089 | Fail | defect | not drafted: repeat DRA262611P0216 (RDResolved, still reproduces on 2611193) |
| TC-121 | Fail | defect | not drafted: repeats DRA262611P0218 (Assigned) |
| TC-017, TC-020, TC-023, TC-026, TC-035, TC-038, TC-041 | Fail | defect | not drafted: repeat DRA262611P0219 (Assigned) |
| TC-054, TC-057 | Fail | defect | not drafted: repeat DRA262611P0229 (NewCreated) |
| TC-061 | Fail | defect | not drafted: repeats DRA262611P0223 (Assigned) |
| TC-119 | Fail | defect | not drafted: repeats R2 draft ISS-AWA-17 (awaiting filing decision) |
| TC-064, TC-067, TC-070 | Fail | question | not drafted: repeat DRA262611P0224 (Q-10, NewCreated) |
| TC-068 | Fail | question | not drafted: R1 kept it as a table question (Effect voices may not be AI content); ISS-AWA-18 withdrawn, so the AI-voice check can run on a stable network |
| TC-008 | Fail | question | not drafted: repeats DRA262611P0227 (Q-1, NewCreated) |
| TC-128 | Blocked | defect | upstream TC-054 (DRA262611P0229) |
| TC-055, TC-056 | Blocked | defect | upstream TC-054 |
| other Blocked | Blocked | test-data / observability | Instagram not installed; Flux / Hailuo / Vidu / Pixverse (T2V), Video Object Removal, editor AI Style Transfer not on 2611193; no lyrics path; timeline asset C2PA unreadable (Q-13) |
| O-9 | observation | — | 1. ISS-AWA-18, ⛔ withdrawn (recheck 2026-11-24: 0/3 on a stable network) |
| O-8 | observation | — | DRA262611P0225 no longer reproduces (dialog now at 「Export」; TC-084 / TC-085 Pass): information only, no comment (rule 6) |
| O-4 | observation | — | Talking Avatar auto-saves: no spec basis, knowledge (KP-079) |
| O-1 … O-3, O-5 … O-7, O-10, O-11 | observation | — | knowledge / environment / tooling; not drafted |
