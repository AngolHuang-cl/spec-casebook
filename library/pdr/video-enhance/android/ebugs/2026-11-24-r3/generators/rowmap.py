"""Row-by-row map for the R3 drafts: R2's map, updated for 2611231 (R3 wrap-up, 2026-11-25)."""
import csv, re, sys
base = 'library/pdr/video-enhance/android/'
r2md = open(base + 'ebugs/2026-11-18-r2/20261119_eBug_drafts_Video-Enhance-R2_16.9.0.md', encoding='utf-8').read()
m2 = {}
for line in r2md.split('### Row-by-row map')[1].split('### Owner split')[0].splitlines():
    c = [x.strip() for x in line.strip('|').split('|')]
    if len(c) == 4 and c[0].startswith('TC-'):
        m2[c[0]] = c[3]
fix = {
    'TC-023': 'dedupe DRA262611P0231 (filed from R2 ISS-VEA-37)',
    'TC-315': 'dedupe DRA262611P0233 (PM, filed from R2 ISS-VEA-43)',
    'TC-316': 'dedupe DRA262611P0234 (PM, filed from R2 ISS-VEA-44)',
    'TC-317': 'dedupe DRA262611P0235 (PM, filed from R2 ISS-VEA-45)',
    'TC-118': 'dedupe DRA262611P0232 (filed from R2 ISS-VEA-38)',
    'TC-119': 'dedupe DRA262611P0232', 'TC-120': 'dedupe DRA262611P0232', 'TC-211': 'dedupe DRA262611P0232',
    'TC-037': 'dedupe DRA262611P0092 (steps 4–5); step 1 now passes (DRA262611P0230 looks fixed on 2611231)',
    'TC-112': '3. ISS-VEA-41 (refund 3 h 29 min after the failure); S3 upload broke off (dropped ISS-VEA-56, network); dedupe DRA262611P0083 (card length)',
    'TC-170': '1. ISS-VEA-39 (held in R2, never filed; reproduced on 2611231)',
    'TC-171': '2. ISS-VEA-40 (held in R2, never filed; reproduced on 2611231)',
    'TC-133': 'dedupe DRA262611P0095; its first try hit the dropped ISS-VEA-56 (network)',
    'TC-267': 'dedupe DRA262611P0084; dedupe DRA262611P0076 (◆ 31); its first try hit the dropped ISS-VEA-56 (network)',
    'TC-096': 'blocked test-data (low balance)', 'TC-320': 'blocked test-data (low balance)',
    'TC-207': 'blocked test-data (low balance)', 'TC-098': 'blocked test-data (low balance)',
    'TC-268': 'blocked test-data (no task 2 days old)', 'TC-174': 'blocked observability (no server-failure switch)',
}
rows = list(csv.DictReader(open(base + 'runs/2026-11-24-r3-full/results.csv', encoding='utf-8-sig')))
out = ['| Item | Result | Disposition | Became |', '|---|---|---|---|']
for r in rows:
    if r['Result'] not in ('Fail', 'Blocked'):
        continue
    i = r['ID']
    out.append(f"| {i} | {r['Result']} | {r['Disposition']} | {fix.get(i) or m2.get(i) or 'UNMAPPED'} |")
obs = {
    'O-1': 'not raised', 'O-2': 'not raised (DRA262611P0230 fixed: information only, no comment)',
    'O-3': 'not raised', 'O-4': 'dedupe DRA262611P0093 (bubble now hides by itself)', 'O-5': 'not raised',
    'O-6': 'not raised (dropped ISS-VEA-56)', 'O-7': 'dedupe DRA262611P0094', 'O-8': 'not raised', 'O-9': 'not raised (O-15)',
    'O-10': '3. ISS-VEA-41', 'O-11': 'dedupe DRA262611P0081', 'O-12': 'not raised', 'O-13': 'not raised (dropped ISS-VEA-56)',
    'O-15': 'not raised', 'O-16': '3. ISS-VEA-41', 'O-17': 'not raised',
}
for k, v in obs.items():
    out.append(f'| {k} | observation | — | {v} |')
print('\n'.join(out))
print('UNMAPPED' in '\n'.join(out), file=sys.stderr)
