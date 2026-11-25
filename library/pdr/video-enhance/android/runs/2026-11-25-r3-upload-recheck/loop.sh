#!/bin/bash
# ISS-VEA-56 upload recheck (2026-11-25): one short-clip Video Enhance task per line of a rows file
# (ID style fps res, as recipes/combo-row/g1-rows.txt), upload only and let the task finish; no View / Save.
# Usage: loop.sh <rows file> <tag> [expected SSID]   (RUN is this folder). Writes tasks.tsv lines:
# tag ID ssid tap_time recent_time done_time newest_card_action enhance_cost pill_before
RUN=/Users/ethanhsu/Desktop/pdr-spec-casebook/library/pdr/video-enhance/android/runs/2026-11-25-r3-upload-recheck
export RUN
D="node /Users/ethanhsu/Desktop/pdr-spec-casebook/scripts/device-android.ts $RUN"
TAG=$2; WANT=${3:-}
ssid() { adb -s R5CTB22S05Y shell cmd wifi status 2>/dev/null | grep -o 'connected to "[^"]*"' | head -1 | sed 's/connected to //;s/"//g'; }
home() { for i in 1 2 3 4 5; do $D texts 2>/dev/null | grep -q "AI Mini Drama" && return 0; $D back >/dev/null 2>&1; sleep 2; $D tapif Close >/dev/null 2>&1; done; $D activate >/dev/null 2>&1; sleep 3; $D texts | grep -q "AI Mini Drama"; }
while read -r ID ST FP RS <&3; do
  [ -n "$RS" ] || continue
  ID="$TAG-$ID"
  S=$(ssid); [ -n "$WANT" ] && [ "$S" != "$WANT" ] && { echo "$ID: Wi-Fi is '$S', not '$WANT': stopping"; exit 2; }
  $D case $ID >/dev/null 2>&1
  home || { echo "$ID: not on the Launcher"; $D shot $ID-lost >/dev/null; exit 1; }
  $D lbl "Video Enhance" >/dev/null || exit 1; sleep 3
  $D tapif Close >/dev/null 2>&1
  if ! $D texts | grep -q casebook-ve-real; then $D tap 120 500 >/dev/null; sleep 2; $D lbl casebook-ve-real >/dev/null; sleep 3; fi
  $D tap 864 840 >/dev/null; sleep 4
  $D texts | grep -q "Selected Length" || { echo "$ID: panel not open"; $D shot $ID-nopanel >/dev/null; exit 1; }
  PILL=$($D els tv_credit | cut -d'|' -f3 | tr -d ' ' | head -1)
  $D fingerdrag 540 1750 540 1250 10 >/dev/null; sleep 1
  $D id chip_style_$ST >/dev/null; $D id chip_fps_$FP >/dev/null; $D id chip_resolution_$RS >/dev/null; sleep 1
  COST=$($D els tv_enhance_cost | cut -d'|' -f3 | tr -d ' ' | head -1)
  $D shot $ID-panel >/dev/null
  TAP=$(date +%T); $D id layout_enhance >/dev/null
  $D waitfor "Processing|minutes left|Retry|View Details" --fail "Unlock Pro to Enhance|Upgrade to Pro|Not enough credits" --timeout 1800 >/dev/null || { echo "$ID: no Recent task"; $D shot $ID-stuck >/dev/null; exit 1; }
  RT=$(date +%T); $D shot $ID-task >/dev/null
  DONE=$(/Users/ethanhsu/Desktop/pdr-spec-casebook/library/pdr/video-enhance/android/recipes/combo-row/waitdone 1800 | grep -o '[0-9:]*$')
  FIRST=$($D els btn_action | grep 'TextView | btn_action |' | head -1 | cut -d'|' -f3 | tr -d ' ')
  $D shot $ID-end >/dev/null
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$TAG" "$ID" "$S" "$TAP" "$RT" "$DONE" "$FIRST" "$COST" "$PILL" | tee -a $RUN/tasks.tsv
  home >/dev/null
done 3< "$1"
echo "LOOP-END $TAG $(date +%T)"
