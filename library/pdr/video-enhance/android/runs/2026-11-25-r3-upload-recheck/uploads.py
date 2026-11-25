import glob, re, sys, os
# Upload summary from the live logcat: every 「Upload to S3」 start with its finish or exception, key-free.
R = os.path.dirname(os.path.abspath(__file__))
lines = []
for f in sorted(glob.glob(f'{R}/logs/.live/logcat-*.txt')):
    lines += open(f, errors='replace').read().splitlines()
pat = re.compile(r'create session response|Upload to S3|upload response|applyEffect status: (Done|Error)|exception->|unexpected end of stream|Broken pipe|Connection reset|SocketTimeout|totalRemain=')
cur = None; ups = []
for l in lines:
    if not pat.search(l): continue
    t = l[11:19]
    if 'Upload to S3: start' in l: cur = {'start': t, 'end': None, 'err': None}; ups.append(cur)
    elif 'Upload to S3: finish' in l and cur and not cur['end']: cur['end'] = t
    elif cur and not cur['end'] and not cur['err'] and re.search(r'unexpected end of stream|Broken pipe|Connection reset|SocketTimeout', l):
        m = re.search(r'(java\.\w+\.\w+: [^/]*?)( on https?://[^/ ]+)?(/|$)', l)
        cur['err'] = (t, (m.group(1) + (m.group(2) or '')) if m else l[40:140])
from datetime import datetime as D
def s(a, b): return int((D.strptime(b, '%H:%M:%S') - D.strptime(a, '%H:%M:%S')).total_seconds()) % 86400
for u in ups:
    if u['err']: print(f"{u['start']} → BREAK {u['err'][0]} after {s(u['start'], u['err'][0])} s: {u['err'][1]}" + (f" (finish line {u['end']})" if u['end'] else ''))
    elif u['end']: print(f"{u['start']} → {u['end']} ok {s(u['start'], u['end'])} s")
    else: print(f"{u['start']} → no finish yet")
print(f"uploads {len(ups)}, breaks {sum(1 for u in ups if u['err'])}")
