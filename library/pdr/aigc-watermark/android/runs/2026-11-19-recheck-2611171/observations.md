# Observations — music dialog recheck on 2611171 (2026-11-19)

- O-1 (closest TC-054 / TC-057 / TC-128, RC-a 2026-11-19 08:56-09:00): recheck of R1's music dialog on PowerDirector 16.9.0
  build 2611171 (TR261117-0042, R3), installed fresh 2026-11-18 14:43 by another tester (R1 O-30), not reinstalled.
  Signed in acda.test7@gmail.com, Free (Mine 「Free」 「Claim offer」), Stage (yellow bar, [AID]Stage_Server), English
  (en-US). Found: 「Remove AIGC Watermark」 **On**, 「Remove watermark」 Off, app on the other tester's AI Video Enhance
  setup (left with Back twice, nothing generated there). Set the AIGC switch Off, then AI Music Generator (intro shown,
  its 「Don't show again」 unticked) › Acoustic / Dreamy / Cinematic, 2 songs › 「Generate for ◆ 10」: no 「AIGC
  Watermark」 dialog, straight to 「Generating...」; 2 songs in ~15 s, 10 credits (2529 → 2519, log and Mine). Same as
  R1 on 2611161, so the dialog is still missing on 2611171 (F-10 / TC-054). Caveat: the other tester used this install
  before the run; whether they ticked a music 「Don't show again」 cannot be read without a debuggable build or a
  `pm clear` (not done: KP-072). Opening the generator again left an empty editor project behind it (as R1 O-19).
  End: switch restored On (read back, screenshots/RC-end-switch.png), language unchanged en-US, app on the Launcher.
  log-slice windows look shifted by the time zone (all cases at 01:00:02); the case results quote clock times instead.
