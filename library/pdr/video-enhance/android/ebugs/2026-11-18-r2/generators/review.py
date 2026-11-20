#!/usr/bin/env python3
"""Build the Video Enhance Android R2 eBug review page from upload/bodies.json (copied from batch 2026-11-11-r1b, 2026-11-19).

Reuses the iOS P9 review page's stylesheet (ios/ebugs/2026-10-27-p9) and its card / decisions script, with Android text, a
PM-questions table and the Blocked groups. Run after ebugs.py, drafts_to_bodies.py, check_ebug_format.py and the dedupe.
Thumbnails are made with `sips` (no Pillow on this machine). Nothing is filed; the page is a self-contained file here.
"""
import base64, csv, json, os, re, subprocess, sys, tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ebugs as G

REPO, OUT, RUN = G.REPO, G.OUT, G.RUN
SHELL = f"{REPO}/library/pdr/ai-mini-drama/ios/ebugs/2026-10-27-p9/20261022_eBug_review_AI-Mini-Drama-P9_16.9.0.html"
PAGE = f"{OUT}/20261119_eBug_review_Video-Enhance-R2_16.9.0.html"

WHY = {
 "ISS-VEA-35": "Defect: after a right-handle trim the playhead sits at the selection end and play does nothing there (R-027).",
 "ISS-VEA-36": "Defect: a 1 fps source opens with no fps chip selected and all disabled; the Design maps 1–30 fps to 30fps (R-043).",
 "ISS-VEA-37": "Defect: with no videos on the phone and full access granted, Add Media shows the partial-access prompt instead of an empty state (PM A2 proposal 「No videos yet」).",
 "ISS-VEA-38": "Defect: with notifications off, the PM's 「Turn on notifications」 dialog never appears after the first upload; TC-119 / TC-120 / TC-211 wait behind it.",
 "ISS-VEA-39": "Defect: a task that failed on the server (apply effect 401) shows the grey placeholder, not the Design's 「Error」 thumbnail.",
 "ISS-VEA-40": "Defect: 「View Details」 on the failed card opens a customer-service 「Need Help?」 dialog, not the Design's error dialog that says the credits were refunded.",
 "ISS-VEA-41": "Defect (KP-007: a missing refund has its own eBug): two failed tasks were refunded only 2.5–3 h after the failure.",
 "ISS-VEA-42": "PM decision (Q-27), proposed Type UX: the Preview frame freezes behind a dragged trim handle. The knob version is DRA262611P0208 (RD); set Belong RD here if you want the two to match.",
 "ISS-VEA-43": "PM decision, proposed Type UX: no import overlay on Android; the expected overlay is iOS UI the spec agent's user approved (no Design or PM frame).",
 "ISS-VEA-44": "PM decision, proposed Type UX: Android's sort keys differ from the iOS list the spec agent's user approved (no Design or PM frame).",
 "ISS-VEA-45": "PM decision (text): the empty Recent task copy; Android 「No Generated Videos」 vs iOS 「No results found」 (no Design or PM frame).",
}
RELATED = {
 "ISS-VEA-35": "New in R2. The full-screen steps of TC-037 are DRA262611P0092 (not repeated).",
 "ISS-VEA-36": "Related, not the same: DRA262611P0073 (open, the 0fps badge where the fps is not read).",
 "ISS-VEA-37": "Blocked in R1; run in R2-x with every video folder moved out of MediaStore and restored after.",
 "ISS-VEA-38": "Blocked in R1; run in R2-x after a pm clear with notifications off (user go-ahead 2026-11-18). O-32: the system permission prompt showed once instead.",
 "ISS-VEA-39": "A real server failure (not injected): the 70-min upload then apply effect 401. The cancelled-card length is DRA262611P0083.",
 "ISS-VEA-40": "Same failed task as F-5. TC-210 (the dialog closes and Recent task stays) passed.",
 "ISS-VEA-41": "Related, different trigger: DRA262611P0079 / P0094 (Home or Leave during the upload, refunded ~3 h later).",
 "ISS-VEA-42": "Judged from screen recordings (R1 judged screenshots and passed). Recordings stay in the run folder; no video attached.",
}
DEF = json.loads(subprocess.run(["node", f"{REPO}/scripts/ebug-defaults.ts", "pdr/video-enhance", "android", "--json"], capture_output=True, text=True, check=True).stdout)  # newest filed batch (2026-11-11-r1c)



def thumb(path):
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, "t.jpg")
        subprocess.run(["sips", "-Z", "900", "-s", "format", "jpeg", "-s", "formatOptions", "60", path, "--out", out],
                       check=True, capture_output=True)
        return "data:image/jpeg;base64," + base64.b64encode(open(out, "rb").read()).decode()


s = open(SHELL, encoding="utf-8").read()
style = s[:s.index("</style>")]
style = style.replace("<title>AI Mini Drama P9 eBugs</title>", "<title>Video Enhance R2 eBugs</title>")
# Log excerpts start collapsed and wrap like the other card text; nothing in a card may push it wider than the page
# (user, 2026-10-28: half-width window).
style += """
.logbox summary{padding:8px 10px;font-size:13px;font-weight:600;cursor:pointer}
.logbox summary span{font:12px var(--mono);opacity:.75;margin-left:6px;font-weight:400}
.logbox pre{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;margin:0;padding:8px 10px}
.card,.card>*,main,section,details,.dupbox,.myread,.sd,.bar,.chips,.strip{min-width:0;max-width:100%}
.card pre,.card code,.dupbox,.myread,.sd,td{overflow-wrap:anywhere}
.card img{max-width:100%;height:auto}
.strip,.bar{flex-wrap:wrap}
table{max-width:100%}
.tblwrap,.scrollx{overflow-x:auto;max-width:100%}
"""
i = s.index("const DATA = ") + len("const DATA = ")
_, end = json.JSONDecoder().raw_decode(s[i:])
tail = s[i + end:]

# after filing, the page shows every card (bodies-all.json, no decisions applied) and marks the held ones
_all = f"{OUT}/upload/bodies-all.json"
bodies = json.load(open(_all if os.path.exists(_all) and os.path.exists(f"{OUT}/filed_bugcodes.json") else f"{OUT}/upload/bodies.json", encoding="utf-8"))
# After filing (2026-10-28): cards show the boxed frames as uploaded and each card carries its BugCode.
FILED_JSON = f"{OUT}/filed_bugcodes.json"  # absent until this batch is filed
filed = None
if os.path.exists(FILED_JSON):
    fj = json.load(open(FILED_JSON, encoding="utf-8"))
    filed = {"meta": {**fj["meta"], "method": "API", "tag": "AIAgent"},
             "bugs": {x["iss"]: {"code": x["bugcode"], "sev": x["severity"], "belong": x["belong"], "files": len(x["attachments"])}
                      for x in fj["bugs"]}}
FILING_DIR = f"{OUT}/upload_filing"
def src(b, f):
    p = os.path.join(FILING_DIR, f)
    return p if filed and os.path.exists(p) else os.path.join(b["images_dir"], f)
E = {e["iss"]: e for e in G.E}
entries = []
for k, b in bodies.items():
    e = E[b["iss"]]
    imgs = [{"src": thumb(src(b, f)), "name": f} for f in b["files"] if f.endswith(".jpg")]
    logs = [f for f in b["files"] if f.endswith(".txt")]
    logtext = [{"name": f, "text": open(os.path.join(b["images_dir"], f), encoding="utf-8").read()} for f in logs]
    d = None
    rel = RELATED.get(b["iss"], "Read-only ECL dedupe (whole Android Video Enhance pool, 182 tickets, 2026-11-19): no duplicate (dedupe.txt).")
    if logs:
        rel += f" Logcat excerpt attached: {', '.join(logs)} (token-checked; URL queries cut) — text in the Log section below."
    entries.append(dict(n=int(b["entry"]), iss=b["iss"], title=b["title"], type="UX" if e.get("ux") else b["type"], sev=int(b["sev"]), belong=b["belong"],
                        out=int(b["out"]), times=int(b["times"]), short=b["short"], desc=b["desc"], note=b["qa_note"],
                        why=WHY[b["iss"]], imgs=imgs, cases=e["cases"],
                        dup={"code": d[0], "status": d[1], "text": d[2]} if d else None,
                        related=rel, logs=logtext, action="hold" if d else "file"))

results = list(csv.DictReader(open(f"{RUN}/results.csv", encoding="utf-8-sig")))
counts = {}
for r in results:
    counts[r["Result"]] = counts.get(r["Result"], 0) + 1
from blocked import group as bgroup  # noqa: E402
blocked = [[r["ID"], f"{bgroup(r)} · {r['Disposition']} — {r['Actual'][:240]}{'…' if len(r['Actual']) > 240 else ''}"]
           for r in results if r["Result"] == "Blocked"]
bcount = {}
for r in results:
    if r["Result"] == "Blocked":
        bcount[bgroup(r)] = bcount.get(bgroup(r), 0) + 1
data = {
 "entries": entries,
 "blocked": blocked,
 "counts": counts,
 "rechecks": [],
 "fixes": [[f"{code} — {what}", "ALREADY FILED ON ANDROID — dedupe.txt only: " + (f"{cs[0]} … {cs[-1]} ({len(cs)} items)" if len(cs) > 8 else ", ".join(cs))] for cs, code, what in G.DEDUPE]
          + [[f"{t} ({(it[0] + ' – ' + it[-1] + ', ' + str(len(it)) + ' rows') if len(it) > 5 else ', '.join(it)})", f"CITED, NOT FILED — {code}: {why}"] for t, it, code, why in G.CITED]
          + [[k, f"NOT RAISED — {a}: {b}"] for k, a, b in G.OBS_NOT]
          + [[f"{e['iss']} — {e['title']} ({', '.join(e['cases'])})", f"HELD, NOT RE-VERIFIED ON {G.B} — {G.HELD[e['iss']]}"] for e in G.E_HELD],
 "defaults": {"found": True, "from": f"the Video Enhance Android batch {DEF['from']} (filed {DEF['filed_on']})", "creator": DEF["creator"],
              "tr": G.TR, "tr_prev": DEF["tr"], "tag": DEF["tag"], "method": DEF["method"], "version": G.V, "build": G.B},
 "filed": filed,
}
nhold = sum(1 for e in entries if e["action"] == "hold")
FN = {e["iss"]: e["n"] for e in entries}
def F(*iss):
    return ", ".join(f"F-{FN[i]}" for i in iss)
KIND = {e["iss"]: e["kind"] for e in G.E}
DEFF = ", ".join(f"F-{e['n']}" for e in entries if KIND[e["iss"]] == "defect")
PMF = ", ".join(f"F-{e['n']}" for e in entries if KIND[e["iss"]] == "pm")
ND, NPM = DEFF.count("F-"), PMF.count("F-")
_UX = [f"F-{e['n']}" for e in entries if KIND[e["iss"]] == "pm" and E[e["iss"]].get("ux")]
UXF = (", ".join(_UX[:-1]) + " and " + _UX[-1] + " are") if len(_UX) > 1 else (f"{_UX[0]} is" if _UX else "none is")
TXF = ", ".join(f"F-{e['n']}" for e in entries if KIND[e["iss"]] == "pm" and not E[e["iss"]].get("ux")) or "none"
FILED_LINE = ("Nothing has been filed, uploaded or commented." if not filed else
  f"Filed from your decisions (decisions.md): {len(filed['bugs'])} bugs.")
bsum = ", ".join(f"{v} {k}" for k, v in sorted(bcount.items(), key=lambda x: -x[1]))
body = f'''</style>

<div class="wrap">
  <header style="display:grid;gap:10px">
    <div class="eyebrow">pdr-spec-casebook · PowerDirector Mobile for Android · eBug filing review</div>
    <h1>AI Video Enhance Android — round R2, rechecked on {G.B}: {len(entries)} new cards ({ND} defects, {NPM} PM decisions)</h1>
    <p class="lede">These cards are the eBug entries exactly as they would be filed, for the failures R2 found (on 2611091) that no Android ticket covers yet, each re-exercised on {G.V}.{G.B}, the build of {G.TR}, on 2026-11-19 (recheck-2611181/verdicts.md); the evidence on every card is from {G.B}. {len(G.E_HELD)} R2 findings ({", ".join(e["iss"] for e in G.E_HELD)}) could not be re-exercised on {G.B} and are held, listed below with the reason. For each one, set file or hold, severity, owner and type, then use Copy decisions and paste the result back. {FILED_LINE} R1's DRA262611P0071 – P0101 and the Android tickets DRA262611P0113 – P0117 (filed 2026-11-12) are not repeated: every R2 failure they cover is listed below as already filed (dedupe.txt only, no comment added). Three R1 PM tickets were closed on this same build (P0088, P0096, P0097); they are cited as rulings, not re-filed, and their rows need a table update. Run: {counts.get("Pass", 0)} Pass, {counts.get("Fail", 0)} Fail, {counts.get("Blocked", 0)} Blocked of {len(results)}; every Fail and observation is mapped in the drafts file. Failure- and charge-related cards show their logcat excerpt under 「Log」. Cards proposed as Type UX are drafted as Functional (the format checks) and preset to UX here.</p>
    <dl class="facts">
      <div><dt>Version</dt><dd>16.9.0</dd></div>
      <div><dt>Build No</dt><dd>{G.B} (TR OneDrive APK, MD5 checked); R2 ran 2611091</dd></div>
      <div><dt>Server</dt><dd>Stage server</dd></div>
      <div><dt>Device</dt><dd>Samsung SM-A5360 · Android 15</dd></div>
      <div><dt>Account</dt><dd class="need" id="f-acct">needed</dd></div>
      <div><dt>TRCode</dt><dd class="need" id="f-tr">{G.TR}? confirm</dd></div>
      <div><dt>Product</dt><dd>PowerDirector Mobile for Android · Generic v16.9</dd></div>
    </dl>
  </header>

  <section class="panel" aria-labelledby="bd">
    <h2 id="bd">Batch decisions</h2>
    <div class="decisions">
      <label for="acct">Filing account (Creator)
        <input type="text" id="acct" class="pending" placeholder="ECL login, e.g. ETHAN_HSU">
        <small>{DEF['creator']} from the Video Enhance Android batch {DEF['from']} (filed {DEF['filed_on']}) — confirm. Becomes Creator on every ticket.</small>
      </label>
      <label for="tag">Source tag
        <input type="text" id="tag" class="pending" value="AIAgent">
        <small>[AIAgent], as for every casebook batch.</small>
      </label>
      <label for="tr">TRCode
        <input type="text" id="tr" class="pending" value="{G.TR}">
        <small>{G.TR}, build {G.V}.{G.B} (TR header read 2026-11-19), where every card was rechecked. The R1 batches went on {DEF['tr']} (2611091), so "Same TR" does not apply — confirm.</small>
      </label>
      <div class="radios" role="radiogroup" aria-labelledby="mlab">
        <span id="mlab" style="font-weight:600">Filing method</span>
        <label><input type="radio" name="method" id="m-api" value="API" checked> API (new way) <small>ecl_if3.py create plus attachment upload, if the Android v16.9 template is on IF3.</small></label>
        <label><input type="radio" name="method" id="m-web" value="Browser form"> Browser form (old way) <small>ECL web form through the browser pane, every field by hand.</small></label>
      </div>
    </div>
  </section>

  <section class="panel" aria-labelledby="tl">
    <h2 id="tl">Where the run landed</h2>
    <div class="tally" id="tally"></div>
    <p class="cal"><b>Proposed severities:</b> every card S2, as you decided for the R1 batches; no S1. <b>Defects</b> ({DEFF}): owner RD. <b>PM decisions</b> ({PMF}): BugBelong PM; {UXF} proposed as Type UX (a PM decision on a user-experience problem, [AIAgent][UX]), {TXF} as UI (text).</p>
    <div class="toolbar">
      <button type="button" id="fileAll">File all</button>
      <button type="button" id="holdAll">Hold all</button>
      <button type="button" id="reset">Reset to proposal</button>
    </div>
  </section>

  <main id="cards" style="display:grid;gap:16px"></main>

  <section class="panel" aria-labelledby="nf">
    <h2 id="nf">Already filed on Android, cited and not raised</h2>
    <p class="cal" style="margin:0">Team rule (2026-10-21): no comments, no reopen, no reject on existing tickets.</p>
    <div class="tbl"><table id="fxtbl"><thead><tr><th>Item</th><th>Outcome</th></tr></thead><tbody></tbody></table></div>
  </section>

  <section class="panel" aria-labelledby="gp">
    <h2 id="gp">Gaps you should know about</h2>
    <p class="cal" style="margin:0">{counts.get("Blocked", 0)} cases are <b>Blocked</b> with no verdict: {bsum}.</p>
    <div class="tbl"><table id="blk"><thead><tr><th>Case</th><th>Why it is Blocked</th></tr></thead><tbody></tbody></table></div>
  </section>

  <section class="panel" aria-labelledby="cd">
    <h2 id="cd">Copy decisions</h2>
    <div class="toolbar"><button type="button" class="primary" id="copy">Copy decisions</button><span id="copied" class="cal" role="status"></span></div>
    <textarea id="out" readonly aria-label="Decisions table"></textarea>
  </section>
</div>

<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Evidence">
  <img id="lbimg" alt="">
  <div class="cap"><button type="button" id="lbprev">← Prev</button><span id="lbcap"></span><button type="button" id="lbnext">Next →</button><button type="button" id="lbclose">Close</button></div>
</div>

<script>
const DATA = '''
R = [
 ('`<section class="logbox"><h4>Log <span>${esc(l.name)}</span></h4><pre>${esc(l.text)}</pre></section>`',
  '`<details class="logbox"><summary>Log <span>${esc(l.name)}</span></summary><pre>${esc(l.text)}</pre></details>`'),
 ('const KEY = "amd-ebug-review-20261027-p9-v1";', 'const KEY = "ve-ebug-review-20261119-r2-android-v1";'),
 ("`<span class=\"chip\"><b>392</b> P9 cases</span>", f"`<span class=\"chip\"><b>{len(results)}</b> R2 cases</span>"),
 ("add(document.getElementById(\"tr\").closest(\"label\"), `${DEF.tr} for build 189872 — confirm. ${DEF.from} used ${DEF.tr_prev} (build ${DEF.build}), so \"Same TR\" does not apply to this build.`);",
  "add(document.getElementById(\"tr\").closest(\"label\"), `${DEF.tr} — build " + G.B + ", rechecked there; the R1 batches used ${DEF.tr_prev} (2611091). Confirm.`);"),
 ('const rtb = document.querySelector("#rctbl tbody");\nDATA.rechecks.forEach(([c, k, s, w]) => rtb.insertAdjacentHTML("beforeend", `<tr><td class="mono">${esc(c)}</td><td class="mono">${esc(k)}</td><td>${esc(s)}</td><td>${esc(w)}</td></tr>`));\n', ''),
# Copy decisions: copy synchronously first (execCommand works where the async Clipboard API is refused, e.g. a file
 # opened in an app's preview pane), the Clipboard API second, and say why when both are refused (user, 2026-11-11).
 ('  navigator.clipboard.writeText(t.value).then(() => { msg.textContent = "Copied. Paste it back in the chat."; })\n    .catch(() => { t.focus(); t.select(); msg.textContent = "Copy was blocked. The text is selected; press Cmd+C."; });',
  '  const ok = () => { msg.textContent = "Copied. Paste it back in the chat."; };\n  t.focus(); t.select(); let done = false; try { done = document.execCommand("copy"); } catch (e) {}\n  if (done) { ok(); return; }\n  (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).then(ok, () => { msg.textContent = "This window does not allow copying (an app preview pane can block it; open the file in Safari or Chrome). The text is selected: press Cmd+C."; });'),
 ("fT.textContent = `${DEF.tr} — this build (189872), confirm`;", "fT.textContent = `${DEF.tr} — this build (" + G.B + "), confirm`;"),
]
for a, b in R:
    if a not in tail:
        sys.exit(f"shell text not found: {a[:90]}")
    tail = tail.replace(a, b, 1)
html = style + body + json.dumps(data, ensure_ascii=False).replace("</", "<\\/") + tail
if not html.lstrip().lower().startswith("<meta charset"):
    html = '<meta charset="utf-8">\n' + html
if 'name="viewport"' not in html:
    html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">', 1)
left = re.findall(r"189872|P9 case|iPhone 17", html[:html.index("const DATA")] + html[html.index("const KEY"):])
if left:
    print(f"note: iOS text left in the page: {left}")
open(PAGE, "w", encoding="utf-8").write(html)
print(f"wrote {PAGE} ({len(html) // 1024} KB, {len(entries)} cards, {nhold} on hold)")
