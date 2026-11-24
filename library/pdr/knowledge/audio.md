# Audio tools

## KP-086 AI Music Generator on Android
- kind: fact · platform: android · use: analysis, run · tags: ai-music, credits, price
- source: AIGC Watermark Android run 2026-11-17-r1-full O-19; AIGC Watermark Android run 2026-11-23-r2-changed TC-063, TC-014 · verified: 16.9.0 build 2611193 (2026-11-23)

Android has AIMusicGeneratorV2 (log: Google Lyria 3 Pro): Genre / Mood / Theme chips, song length and number of songs
(default 2, 「Generate for ◆ 10」, 5 credits a song); no description box and no lyrics path, unlike the PM board
(「Generate for ◆ 6」). Opening it from AI Magic creates an editor project 「AI Music Generator <MM-DD>」 behind it.

## KP-087 Generated songs are written to Music by themselves
- kind: fact · platform: android · use: run · tags: ai-music, files, save
- source: AIGC Watermark Android run 2026-11-17-r1-full O-19; AIGC Watermark Android run 2026-11-23-r2-changed TC-059, TC-119 · verified: 16.9.0 build 2611193 (2026-11-23)

My AI Music rows offer play, favourite and + (add to timeline), no Download: every finished song is written to
/sdcard/Music/cyberlink/PowerDirector/AI Music Generator/ (same bytes as the app's copy). Older songs from other runs
share the folder; match by time.

## KP-088 AI Voice Changer on a Free account
- kind: fact · platform: android · use: analysis, run · tags: voice-changer, tier, credits
- source: AIGC Watermark Android run 2026-11-17-r1-full O-24 · verified: 16.9.0 build 2611161 (2026-11-17)

On Free only the 「Effect」 tab applies: Radio 1 / Radio 2 free, Telephone / Chipmunk Pro. Every Professional /
Mellow / Bright AI voice is Pro (a tap plays a 10 s preview with 「Unlock the 10-second limit now」). An Effect voice
charges nothing.

## KP-096 Generated songs are 96 kHz AAC that some players reject
- kind: quirk · platform: android · use: run, ebug · tags: ai-music, files, player
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-15, TC-119 · verified: 16.9.0 build 2611193 (2026-11-23)

AI Music Generator songs are AAC at 96 kHz (`.m4a`, encoder Lavf). Samsung's sound player plays them; the phone's
third-party 「File Manager」 (com.alphainventor.filemanager) fails with 「Codec not supported : audio/mp4a-latm」. Play
them in Samsung's player; whether other common players fail is unchecked.

## KP-097 Adding a song from My AI Music opens 「Select Range」
- kind: fact · platform: android · use: run · tags: ai-music, editor, audio
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-19, TC-060 · verified: 16.9.0 build 2611193 (2026-11-23)

Add Music › AI Music Generator › My AI Music › + opens 「Select Range」 (default 00:00–00:10, 「Import Full Song」
unticked); ✓ puts that range on the audio track. Tick 「Import Full Song」 for the whole song.

## KP-104 A Pro AI Voice Changer voice makes the project fail to produce
- kind: quirk · platform: android · use: run, ebug · tags: voice-changer, produce, export
- source: AIGC Watermark Android run 2026-11-23-r3-full O-9 (drafted ISS-AWA-18) · verified: 16.9.0 build 2611193 (2026-11-23)

Any Professional AI voice (Jill, Kathleen, Lila, Margaret…) applied from a clip's 「Audio Tools」 shows 「Applied」, but
「Produce」 fails: 「PowerDirector Mobile cannot produce the video. …/VoiceChanger/Cache/<clip>_<n>.m4a is missing.」 The
cache m4a exists after Apply and is gone after the panel's ✓. Effect voices (「Radio 1」) produce normally.
