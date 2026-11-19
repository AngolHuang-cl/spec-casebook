# Video Enhance — Android design pass, the two tooltip screens (2026-11-19, build 2611171)

Design check (figma skill › `references/conformance.md`) of the two screens REQ-030 added to the plan:
3479:106886 (Mode tooltip, TC-035) and 3494:106998 (Enhancement style tooltip, TC-036). The 2026-11-18 pass
(Pixel 10) covered the other 29 routed screens.

**Exception to *All or again* (user, 2026-11-19):** a small run holding only these two screens, checked and reviewed
on its own, rather than a full pass of all 35.

## Setup

- Phone: Sony XQ-BT52 (HQ61563393), Android 12, 1080 × 2520, en-US.
- Build: PowerDirector 16.9.0 (2611171), re-signed debuggable (`android-viewdump.ts prepare --yes-uninstall`,
  approved by the user 2026-11-19: app data cleared; the Figma Agent's app state on this phone was lost).
- Video: `Movies/casebook-ve/ve-0130-1080p30.mp4` (01:30, 1080p, 30 fps), as both frames draw (「01:30」).

## Log

### T1 (2026-11-19, 13:31–13:45 Taipei)

Re-signed debuggable 2611171 installed (data cleared), 「Get Started」, media access allowed, the Pro paywall closed
(the phone's Play account reads Free; not signed in: the tooltip frames draw only the panel). Launcher 「Video Enhance」
→ Demo (「Don't show again」 not ticked) → 「Try It Now」 → ve-0130-1080p30; 60fps tapped (both frames draw 60fps).

- The automatic watch took both tooltip screens from the plain panel (13/13 short texts; the tooltip's own line is
  long): wrong state, replaced by hand captures with the tooltip open.
- With the tooltip popup focused, UiAutomator2's source held only the popup and system bars (even with
  enableMultiWindows): the check now takes the panel's texts from the view data when the source lacks most of them.
- The phone ran font scale 1.15 and display density 460 (default 420): every size item was off. With the user's
  go-ahead both were reset for the captures and put back afterwards. Captures discarded and taken again (T2).

### T2 (13:46) — discarded

Captured at font scale 1.0 / density 420, but the running app kept its old configuration (the view data still read
font scale 1.15, so every sp was off); set aside in `screenshots/design-discarded-t2/`.

### T3 (13:49–13:52 Taipei)

App relaunched (an AI Mini Drama promo and the Pro paywall closed), Launcher 「Video Enhance」 → Demo → 「Try It
Now」 → ve-0130-1080p30, 60fps tapped. **Captured 2 of 2 by hand**, tooltip open, view data at font scale 1.0, density
2.625 (「Mode」 14.86 sp, as on the 11-18 Pixel pass), dark, keyboard down. The phone's font scale 1.15 and density 460
were put back afterwards. Nothing generated, no credits spent, nothing bought, not signed in, 「Don't show again」
never ticked. Logs: `logs/T3-*`.

### Result (settled 2026-11-19)

2 of 2 screens captured with view data, measured, both review passes settled: **12 bugs** (all minor), **3 open
questions**, 8 ok. Ten bugs repeat the 11-18 pass's one cause: the panel headings 「Selected Length」, 「Mode」,
「Enhancement style」, 「fps」, 「Resolution」 drawn Bold where the Design asks Semibold (Medium on Android, KP-066).
New: the tooltip bubble is sized to its text (≈ 236 pt for Mode, ≈ 331 pt for Enhancement style, so 3 lines instead of
4) where the Design's Bubble has a fixed 300 pt width. Questions (the passes split): the bubble's corner radius
(≈ 9 pt against 6 pt) on both screens, and where the Mode bubble sits above its ⓘ (the two Design frames place their
bubbles differently). The page-source artefacts (「00:00」 missing, the ⓘ `control` items) were settled ok.
Next: the user's decisions on the Design tab, then `design.ts … ebugs`.
