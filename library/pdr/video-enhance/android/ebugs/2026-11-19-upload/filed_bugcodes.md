# AI Video Enhance Android — slow-upload eBug filed 2026-11-19

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261118-0074](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261118-0074) · 16.9.0 build 2611181 · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md`

Standard: the user's ruling 2026-11-19, an upload over 1 minute is unacceptable (KF-013). **Read back:** Creator, severity, belong, TR, version, build and Short Description match (`readback.log`); 4 attachments on the page (`files.log`). Dedupe re-run right before filing (`dedupe-recheck.txt`, 1,064 candidates): DRA262611P0078 (the ring's frozen waits on the same dialog, open) judged related, not the same — it asks for a moving ring, this one for the upload time. No existing ticket was commented on.

**Still to do on the web form:** OS Language (the API cannot set it).

| BugCode | ISS | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|
| [DRA262611P0236](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0236) | ISS-VEA-46 | 2 | RD | 4 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: A 1 MB upload takes 65 s; the ring sits at 100% for about a minute |
