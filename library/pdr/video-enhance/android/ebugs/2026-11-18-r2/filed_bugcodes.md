# AI Video Enhance Android — R2 eBugs filed 2026-11-19

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261118-0074](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261118-0074) · 16.9.0 build 2611181 (TR header 「16.9.0.2611181 (Deluxe)」) · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md`

Found in R2 on 2611091, every card re-exercised on 2611181 before filing (`recheck-2611181/verdicts.md`). ISS-VEA-39 / 40 / 41 held (not re-verified on 2611181), not filed.

**Read back:** Creator, severity, belong, TR, version 16.9.0, build 2611181 and Short Description match what was sent (`readback.log`); every attachment is on its page (`files.log`). Status 「BugNeedReview」. Dedupe re-run right before filing (`dedupe-recheck.txt`, 1,058 candidates): no duplicate. No existing ticket was commented on.

**Still to do on the web form:** OS Language (the API cannot set it).

| BugCode | ISS | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|
| [DRA262611P0230](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0230) | ISS-VEA-35 | 2 | RD | 3 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Play does nothing when the playhead sits at the selection's end |
| [DRA262611P0231](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0231) | ISS-VEA-37 | 2 | RD | 2 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Empty gallery: Add Media shows the partial-access prompt, not an empty state |
| [DRA262611P0232](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0232) | ISS-VEA-38 | 2 | RD | 4 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: With notifications off, no 「Turn on notifications」 dialog after the upload |
| [DRA262611P0233](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0233) | ISS-VEA-43 | 2 | PM | 2 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Picking a video opens the panel with no import overlay or 「Cancel」 |
| [DRA262611P0234](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0234) | ISS-VEA-44 | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Add Media sort keys differ from iOS (no Default or Modified Date) |
| [DRA262611P0235](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0235) | ISS-VEA-45 | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Empty Recent task reads 「No Generated Videos」, not 「No results found」 |
