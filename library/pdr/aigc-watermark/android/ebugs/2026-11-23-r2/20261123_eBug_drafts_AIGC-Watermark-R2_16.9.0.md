# AIGC Watermark (Android) — eBug drafts, round R2 (table v2, rows changed), PDR-A 16.9.0 build 2611193

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-23-r2-changed/` — round R2 of draft `drafts/20261123-111806` (table v2, 39 changed rows, REQ-007 – REQ-009), 2026-11-23 11:30 → 15:14, on Samsung SM-A5360 (Galaxy A53 5G) / Android 15 (adb R5CTB22S05Y) through Appium / UiAutomator2, PowerDirector 16.9.0 build 2611193 (installed 2026-11-20; TR not identified), Stage server, account cltqauiap2@gmail.com (Free, Pro test subscription from 14:22). Tally: 29 Pass, 2 Fail, 8 Blocked.

**Status:** nothing filed, uploaded or commented. Dedupe: Android pool only (per OS, user 2026-10-28).

Rules: reviewer rules 2026-10-21 (one action per Repro step, a Spec Link on every entry with the URL on its own line, an image on every entry, the log or file evidence on failure-related ones, no video); `[AIAgent]` owner RD for defects. Since REQ-007 / REQ-008 (RD rulings on DRA262611P0220 / P0221, 2026-11-23) every saved AI result is expected to carry exactly one CyberLink-signed manifest (R-050, R-056).

**What is drafted:** 1 entry (ISS-AWA-17), RD Functional. TC-121 repeats the open Android ticket DRA262611P0218 and is left off (`dedupe.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-AWA-17 — AI Music Generator songs carry no C2PA manifest  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-119  ·  **Reproduce:** 4/4 (two songs with the switch Off, two with it On)  ·  **Verified on:** 16.9.0.2611193

> **QA note — not pasted into eBug.** R-050 (Jira PDRA-649: scope 「result video, result image, result audio」, 「meta data server side會always打sign」; REQ-007: every saved result carries a CyberLink manifest whatever the sheet says) and R-056 (REQ-008). The sheet line Ext MusicGenerator 無簽章 names the provider's file only (REQ-007). Android has no Download in My AI Music: every finished song is written to /sdcard/Music/cyberlink/PowerDirector/AI Music Generator/ by itself (KP-087), the same bytes as the app's Results copy. Both copies of all four songs read 「No claim found」. In the same session an Image to Video save (TC-098) carried the expected single CyberLink manifest. PM's 「no need to handle watermark for audio」 (PDRA-649) was ruled to mean the spoken clip only (REQ-009), not the metadata. R1 on 2611161 found no manifest either, when the table still expected none. Not a repeat of DRA262611P0222 (spoken clip) or P0229 (music dialog).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Music Generator: Generated songs carry no C2PA manifest (Content Credentials)
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Magic」
3. Tap 「AI Music Generator」
4. Tap 「Try It Now」
5. Tap the chips Acoustic, Dreamy and Cinematic
6. Tap 「Generate for 10」
7. Wait for the songs in My AI Music
8. Copy the saved song from Music/cyberlink/PowerDirector/AI Music Generator to a computer
9. Read the song's Content Credentials (c2patool)
10. Check the result

Result:
The saved song has no C2PA manifest: c2patool reports 「No claim found」, switch On or Off.
摘要：產生的歌曲完全沒有 C2PA 中繼資料，開關開或關都一樣。
{16.9.0_awa17_my_ai_music.png} {16.9.0_awa17_c2pa.txt} {16.9.0_awa17_log.txt}

Expect Result:
The saved song carries one C2PA manifest signed by CyberLink, as other AI results do.
摘要：存下的歌曲應帶一份 CyberLink 簽章的 C2PA，與其他 AI 結果相同。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: Jira PDRA-649 (scope: result video, result image, result audio; meta data server side always signs) -
https://cyberlinkcorp.atlassian.net/browse/PDRA-649
Spec Link: [C2PA] GAI effects.xlsx (sheet a, row Ext MusicGenerator), the C2PA list for Jira PDRIOS-722 -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
<Claude Reviewed>
```

**Images:** `20261123_eBug_drafts_AIGC-Watermark-R2_16.9.0_images/01_ISS-AWA-17/`

---

## Reconciliation against the run

2 Fail (2 defect), 8 Blocked, 0 Not run, observations O-1 … O-19.

| Step | Count | Running total |
|---|---|---|
| Fail rows | 2 | 2 |
| → left off: same-OS open ticket (TC-121 = DRA262611P0218) | −1 | **1 entry** |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-119 | Fail | defect | 1. ISS-AWA-17 |
| TC-121 | Fail | defect | not drafted: repeats DRA262611P0218 (open, Android; `dedupe.txt`) |
| TC-092, TC-095, TC-101, TC-103, TC-104, TC-105 | Blocked | test-data | model not offered on 2611193 (re-read on Pro) |
| TC-109 | Blocked | test-data | Video Object Removal not in 2611193 |
| TC-120 | Blocked | test-data | no song-from-lyrics path on Android |
| O-1 | observation | — | part of TC-121 (P0218) |
| O-16 | observation | — | repeats DRA262611P0229 (music dialog), not drafted |
| O-17 | observation | — | table fix (TC-128 still expects the clip), not a bug |
| O-2 … O-15, O-18, O-19 | observation | — | knowledge / tooling / no spec basis; not drafted |
