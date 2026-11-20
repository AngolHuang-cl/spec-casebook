import re,sys,subprocess,os
ID,style,fps,res,rate,net=sys.argv[1:7]
S=os.path.dirname(os.path.abspath(__file__))
t=open(f'{S}/{ID}.out').read()
def f(p,d='?'):
    m=re.search(p,t); return m.group(1).strip() if m else d
credit=f(r'tv_credit \| (\d+)')
src=f(r'tv_source_info \| ([^ ]+ · \w+)')
sel=[x for x in re.findall(r'chip_\w+ \| ([^|]+?) \|  \| [\d,]+ \| selected',t)][:4]
dis=re.findall(r'chip_\w+ \| ([^|]+?) \|  \| [\d,]+ \|[^\n]*disabled',t)
charge=f(r'tv_charge_per_second \| ([^|]+?) \|')
costs=re.findall(r'tv_enhance_cost \| (\d+)',t); lens=re.findall(r'TextView \| tv_selected_length \| ([\d:]+)',t)[-2:]
tap=f(r'enhance tap ([\d:]+)'); up=f(r'enhance tap [\d:]+\n([^\n]*)')
rt=f(r'recent task ([\d:]+)'); done=f(r'done after \d+ s at ([\d:]+)')
play=f(r'play:\s+([\d:/]+)'); file=f(r'file: (.+?) ->')
pr=f(r'stream\|(.+)'); psnr=f(r'PSNR y:([\d.]+)')
led=f(r'ledger: (.+)'); bal=f(r'pro tab: .*? (\d+) *\n', '?')
tab=f(r'tab: (\S+)')
d=dict(re.findall(r'(\w+)=([^|]+)',pr))
hm=tap[:5]
import datetime as _dt
_now=_dt.datetime.now(); TD=(_now if tap<=_now.strftime('%H:%M:%S') else _now-_dt.timedelta(days=1)).strftime('%Y-%m-%d')
L=subprocess.run([f'{S}/upl',hm,'10',TD],capture_output=True,text=True).stdout
us=re.search(r'([\d:]+)\.\d+ Upload to S3: start',L); ue=re.search(r'([\d:]+)\.\d+ Upload to S3: finish',L)
from datetime import datetime as D
def sec(a,b): return int((D.strptime(b,'%H:%M:%S')-D.strptime(a,'%H:%M:%S')).total_seconds())%86400
upload=f'Upload to S3 {us.group(1)} → {ue.group(1)} = {sec(us.group(1),ue.group(1))} s on {net}' if us and ue else 'upload times not in logcat'
total=sec(tap,done) if done!='?' else '?'
ledrow=re.search(r'Video Enhancer (-\d+) PowerDirector \(Android\) (\S+ [\d:]+)',led)
print(f"ve-real-000320-720p30, panel 「{src}」, 00:03, pill {credit}. Chips: 「{'」「'.join(sel)}」 selected, {'none disabled' if not dis else 'DISABLED: '+','.join(dis)}, 「{charge}」. Right handle to the left handle: Selected Length 「{lens[0] if lens else '?'}」 (as TC-046), CTA 「Enhance {costs[0] if costs else '?'}」; back to the end: 「{lens[1] if len(lens)>1 else '?'}」, 「Enhance {costs[1] if len(costs)>1 else '?'}」. Enhance {tap} → 「{up.strip()[:40]}」 ring at once, no confirmation ({upload}); Recent task {rt}, done {done} (~{total} s from the tap). View: Result plays to {play}; Original / Result toggle. Result over Original: RESULTLOOK (TC-XXX-compare.png; PSNR vs source Y {float(psnr):.1f} dB). Save Result: toast 「Saved to Gallery」, not 「Saved to your device」 (P0096). Saved 「{file}」 → exports/{ID}.mp4: {d.get('codec_name')} {d.get('width')} × {d.get('height')}, {d.get('r_frame_rate')} fps, {d.get('nb_frames')} frames, {float(d.get('duration','0')):.3f} s video. Balance {credit} → {bal} ({tab} tab). Credit Details newest: 「Video Enhancer {ledrow.group(1) if ledrow else '?'} / PowerDirector (Android) / {ledrow.group(2) if ledrow else '?'}」, one row (「Video Enhancer」, not 「AI Video Enhance」, R-203).".replace('TC-XXX',ID))
# --- R2-g2 (Professional) additions: mode = sys.argv[7] if given
mode=sys.argv[7] if len(sys.argv)>7 else 'standard'
if mode=='professional':
    import csv,glob
    C='/Users/ethanhsu/Desktop/pdr-spec-casebook/library/pdr/video-enhance/android/cases.csv'
    R='/Users/ethanhsu/Desktop/pdr-spec-casebook/library/pdr/video-enhance/android/runs/2026-11-18-r2-full'
    cs={r['﻿ID']:r for r in csv.DictReader(open(C))}
    key=lambda ex: re.search(r'After step \d+: 「(\w+)」, 「(\w+)」, 「(\d+)fps」 and 「(\w+)」',ex)
    me=key(cs[ID]['Expected Result']).groups()
    twin=[i for i,r in cs.items() if r['Section']=='Setting combinations' and (k:=key(r['Expected Result'])) and k.groups()==('Standard',)+me[1:]][0]
    def edge(p):
        o=subprocess.run(['ffmpeg','-hide_banner','-ss','1.5','-i',p,'-frames:v','1','-vf','scale=640:360:flags=lanczos,format=gray,sobel,signalstats,metadata=print:key=lavfi.signalstats.YAVG','-f','null','-'],capture_output=True,text=True).stderr
        m=re.search(r'YAVG=([\d.]+)',o); return float(m.group(1)) if m else float('nan')
    es,er,et=edge(f'{S}/src/ve-real-000320-720p30.mp4'),edge(f'{R}/exports/{ID}.mp4'),edge(f'{R}/exports/{twin}.mp4')
    lf=sorted(glob.glob(f'{R}/logs/.live/logcat-*.txt'))[-1]
    dl=[l for l in open(lf,errors='replace') if 'applyEffect status: Done' in l and l[:19]>=TD+' '+tap]
    dlog=dl[0][11:19] if dl else '?'
    timing=sec(rt,dlog) if dl and rt!='?' else '?'
    timed='4.8' in cs[ID]['Expected Result']
    extra=f" Detail against the Standard twin {twin} (same style, fps and resolution; Sobel mean of the 640×360 grey frame at 1.5 s): source {es:.1f}, {twin} {et:.1f}, this Professional result {er:.1f} ({(er/et-1)*100:+.1f}% vs the twin). Timing: Recent task opened {rt} with the card's remaining time shown at once; logcat 「applyEffect status: Done」 {dlog} = {timing} s" + (" (R-204 allows 4.8 – 8 s for 3.2 s)." if timed else " (this row states no time).")
    print('DISP='+('defect' if timed else 'question'))
    print('TIMING='+str(timing))
    print('EXTRA='+extra)
