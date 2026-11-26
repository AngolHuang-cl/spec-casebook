# AI Video Enhance Android — R3 eBugs filed 2026-11-25

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261123-0070](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261123-0070) · 16.9.0 build 2611231 (TR header 「16.9.0.2611231 (Deluxe)」, re-read before filing) · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md`

The R2 findings ISS-VEA-39 / 40 / 41 (held in R2, never filed), reproduced in R3 on 2611231. ISS-VEA-56 was dropped (network loss); ISS-VEA-19 / 26 stay held by the reviewers' rulings.

**Read back:** Creator, severity, belong, TR, version 16.9.0, build 2611231, Short Description and description match what was sent (`readback.log`); every attachment is on its page (`files.log`). Status 「BugNeedReview」. Format check re-run before filing: 0 errors (`check-prefile.txt`). Dedupe re-run right before filing (`dedupe-prefile.txt`, `dedupe-prefile-text.txt`; 209 Android candidates, 60 open on 16.9.0): no same-OS duplicate. No existing ticket was commented on.

**Still to do on the web form:** OS Language (the API cannot set it).

| BugCode | ISS | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|
| [DRA262611P0292](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0292) | ISS-VEA-39 | 2 | RD | 3 | PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Failed task card shows the grey placeholder, not the 「Error」 thumbnail |
| [DRA262611P0293](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0293) | ISS-VEA-40 | 2 | RD | 3 | PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Failed task's 「View Details」 opens 「Need Help?」, not the error dialog |
| [DRA262611P0294](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0294) | ISS-VEA-41 | 2 | RD | 3 | PDR-A 16.9.0 - [AIAgent] AI Video Enhance: Credits of a failed task come back only 2–3.5 hours after the failure |

| Feature | Platform | AI Found # | Created # | Known # |
|---|---|---|---|---|
| AI Video Enhance | Android | 3 | 3 | 0 |
