# Cinematic Reel Creator — Photo Tips (Android) — what the phone needs before a run

None of this can be committed. Check it before the first segment; a new row that needs something new adds it here.

## Phone, app and account
- Phone: Sony XQ-BT52 on adb (serial HQ61563393, Android 12).
- Build: 16.9.0 (2611201), TR261123-0015. The sideloaded APK cannot sign in (DRA262611P0253), so this build comes
  from the Google Play internal test track (REQ-003, 2026-11-24); reinstall from Play if it serves an older version.
  Check `device-android.ts <run dir> build` reads 2611201 at the run start.
- Account: the phone's Google account (acda.test7), signed in with the app's account button, never a password.
- Credits: none. No row generates a video; stop at Add Media and never pick a photo or press Generate.

## Media
- At least one photo in the gallery so Add Media shows its grid (no photo is picked by any row).

## Settings the run changes (and restores)
- App language: TC-017 繁體中文, TC-018 日本語 (`launch --lang zh-Hant|ja`, then `locale reset`).
- The Cinematic Reel Creator tutorial (「What is Cinematic Reel Creator?」) shows on the first entry after an install
  or `pm clear`; close it with X before the first row (it stays closed across relaunches) and note it in the checkpoint.
- Logs: `device-android.ts <run dir> pull-logs <segment>` (not `app-setup.ts`, which is iOS).
