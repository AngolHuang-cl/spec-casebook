# Quirks

## KP-065 The microphone over iPhone Mirroring
- kind: quirk · platform: ios · use: run · tags: voice, mirroring
- source: exploration KB ai-mini-drama.md

Never tap a mic button while the phone is shown through iPhone Mirroring: the macOS dialog it raises cannot be
dismissed from the session.

## KP-069 The Sony XQ-BT52 cannot play 4K 60fps
- kind: quirk · platform: android · use: analysis, run, ebug · tags: device, decoder, 4k, playback, video-enhance
- source: Video Enhance Android run (Codex, 2026-11-12, `NO_EXCEEDS_CAPABILITIES`); rechecked on the phone, user 2026-11-17 (chat) · verified: Android 12, outside PowerDirector (2026-11-17)

The Sony XQ-BT52 (Xperia 10 III, Snapdragon 690) hardware decoders stop at 3840×2160 30 fps (4096×2160 24, 1080p
120); a 4K 60 H.264 clip fails at decoder setup (`InsufficientResources`, 「Failed to initialize decoder」) in any
player, while 4K 30 plays. A 4K 60/120 result that will not play on it is a phone limit, not an app bug; check
4K 60 playback on the Samsung SM-A5360. Whether the app should offer 4K 60 on such phones is a PM question.

## KP-089 Appium screen recording stops early on the full-screen player
- kind: quirk · platform: android · use: run · tags: recording, player, tools
- source: AIGC Watermark Android run 2026-11-17-r1-full O-11 · verified: 16.9.0 build 2611161 (2026-11-17)

An Appium screen recording of the in-app full-screen result player stops after about 1.5 s with few frames. To judge
what the player draws in its first seconds, take rapid `adb exec-out screencap` captures instead.
