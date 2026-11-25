#!/usr/bin/env python3
"""Evidence for the three R2 findings held and never filed (ISS-VEA-39 / 40 / 41), drafted in the R3 batch (2026-11-25).

R3 (16.9.0 build 2611231, TR261123-0070) reproduced all three. This script copies their R3 screenshots as red-boxed
JPEGs into 20261125_eBug_drafts_Video-Enhance-R3_16.9.0_images/NN_ISS-VEA-xx/ and writes each log excerpt (logs/ and the
entry's image folder). The entry text itself is in the draft .md. Log filter as R2's logx.py (tokens dropped, URL queries
cut at '?'); the credit ledger is summarised from logcat getCreditHistory records (amount, category, time, no ids).
Run from the repo root: python3 library/pdr/video-enhance/android/ebugs/2026-11-24-r3/generators/held.py
"""
import datetime as dt, glob, os, re, shutil, sys
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, *[".."] * 7))
ROOT = f"{REPO}/library/pdr/video-enhance/android"
RUN = f"{ROOT}/runs/2026-11-24-r3-full"
OUT = f"{ROOT}/ebugs/2026-11-24-r3"
NAME = "20261125_eBug_drafts_Video-Enhance-R3_16.9.0"
V = "16.9.0"
HDR = "# PowerDirector Mobile for Android 16.9.0 (2611231), Stage server, Samsung SM-A5360 / Android 15 (phone time, UTC+8)"
D24, D25 = "2026-11-24", "2026-11-25"

KEEP = re.compile(
    r"Create session: (start|end)|create session response|Transcode: (start|finish)|Upload to S3|upload response"
    r"|applyEffect status|Apply Effect|apply effect response|AIVideoAnimeServerAPI|System\.err: (java\.net\.SocketException|java\.io\.IOException|\tSuppressed)"
    r"|Toast +: show: caller|getMemberCreditRemain", re.I)
DROP = re.compile(r"memberToken|access_?token|authorization|bearer|x-goog-signature|signature=|refreshMemberToken|Glide", re.I)
REMAIN = re.compile(r"totalRemain=(\d+)")


def logfiles():
    return sorted(glob.glob(f"{RUN}/logs/R3-*/logcat-live.txt"))


def seg_of(path):
    return os.path.basename(os.path.dirname(path))


def lines(day, t0, t1):
    got, seen, last, src = [], set(), None, set()
    for f in logfiles():
        for line in open(f, encoding="utf-8", errors="replace"):
            p = line.split(" ", 2)
            if len(p) < 3 or p[0] != day or not (t0 <= p[1][:8] <= t1):
                continue
            if not KEEP.search(line) or DROP.search(line):
                continue
            line = line.rstrip()
            if "getMemberCreditRemain" in line:
                m = REMAIN.search(line)
                if not m or m.group(1) == last:
                    continue
                last = m.group(1)
                line = f"{p[0]} {p[1]} CreditSystemManager: totalRemain={last}"
            line = re.sub(r"(https?://[^\s'\"?]+)\?[^\s'\")]*", r"\1?…", line)
            line = re.sub(r"^(\S+ \S+) +\d+ +\d+ [VDIWE] ", r"\1 ", line)
            if line in seen:
                continue
            seen.add(line)
            src.add(seg_of(f))
            got.append(line[:300])
    got.sort()
    return got, sorted(src)


REC = re.compile(r"RecordItem\(creditUsage=(-?\d+), featureId=([^,]*), unit=[^,]*, actionId=([^,]*), category=(\w+),"
                 r"(?:(?!RecordItem).)*?createTime=(\S+?)\+00:00(?:(?!RecordItem).)*?detail=([^,]*)")


def ledger(utc0, utc1, debit_end=None, debits=None):
    """Distinct VideoEnhanceV2 debits and 'returned' refunds with createTime in [utc0, utc1] (UTC, ISO), first seen when."""
    recs = {}
    for f in logfiles():
        for line in open(f, encoding="utf-8", errors="replace"):
            if "getCreditHistory" not in line:
                continue
            seen_at = line[:23]
            for m in REC.finditer(line):
                usage, feat, action, cat, ct, detail = m.groups()
                if not (utc0 <= ct <= utc1):
                    continue
                if not (cat == "returned" or (cat == "consume" and feat == "VideoEnhanceV2" and ct <= (debit_end or utc1))):
                    continue
                k = (ct, usage, cat)
                if k not in recs or seen_at < recs[k][0]:
                    recs[k] = (seen_at, action, detail.strip(), seg_of(f))
    out = []
    for (ct, usage, cat), (seen_at, action, detail, seg) in sorted(recs.items()):
        local = (dt.datetime.fromisoformat(ct) + dt.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S")
        if cat == "consume" and debits and local[11:] not in debits:
            continue
        what = "Generation failed, credits returned" if cat == "returned" else f"Video Enhancer ({action})"
        out.append(f"{local}  {int(usage):+d}  {cat:<8}  {what}   (first in logcat {seen_at}, logs/{seg})")
    return out


def excerpt(name, title, secs, led=None):
    L = [f"# {title}", HDR,
         "# Video Enhance task lines (create session = the charge, transcode, S3 upload, apply effect, errors, toasts) and the",
         "# balance when it changes; tokens dropped, URL queries cut at '?'.", ""]
    for label, day, t0, t1 in secs:
        got, src = lines(day, t0, t1)
        if not got:
            sys.exit(f"empty log window {label} {day} {t0}-{t1}")
        L.append(f"## {label} ({day} {t0}–{t1}; " + ", ".join(f"logs/{s}/logcat-live.txt" for s in src) + ")")
        L += got + [""]
    if led:
        label, u0, u1, *de = led
        rows = ledger(u0, u1, de[0] if de else None, de[1] if len(de) > 1 else None)
        if not rows:
            sys.exit(f"empty ledger {label}")
        L.append(f"## {label}")
        L.append("# From the app's getCreditHistory responses in logcat (server records; time = the record's createTime in UTC+8).")
        L.append("# Refunds are server-side: the app logs no line when one is made.")
        L += rows + [""]
        if len(de) > 2:
            L += de[2] + [""]
    txt = "\n".join(L)
    if re.search(r"eyJ[A-Za-z0-9_-]{10,}|Bearer |ya29\.|X-Goog-Signature|memberToken|sid=|purchaseToken", txt):
        sys.exit(f"token-like text left in {name}")
    os.makedirs(f"{OUT}/logs", exist_ok=True)
    p = f"{OUT}/logs/{name}"
    open(p, "w", encoding="utf-8").write(txt)
    return p


def boxed(src, dst, boxes):
    im = Image.open(f"{RUN}/screenshots/{src}.png").convert("RGB")
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle(b, outline=(255, 0, 0), width=8)
    im.save(dst, "JPEG", quality=82)


# (folder, images [(screenshot, slug, [boxes in 1080x2400 px])], log)
E = [
 ("01_ISS-VEA-39",
  [("TC-152-failed", "vea39_401_card_placeholder", [(46, 468, 1034, 802)]),
   ("TC-170-card", "vea39_error_card_placeholder", [(46, 1212, 1034, 1546)])],
  ("16.9.0_vea39_log.txt", "ISS-VEA-39 Two tasks that failed on the server: apply effect 401, applyEffect status Error",
   [("21:54 task: Enhance tap (charge 180)", D24, "21:54:15", "21:55:30"),
    ("21:54 task: upload ends 70 min later, apply effect 401", D24, "23:05:15", "23:05:30"),
    ("21:04 task: Enhance tap (charge 4)", D24, "21:04:05", "21:04:20"),
    ("21:04 task: retried upload, applyEffect status Error", D24, "21:06:50", "21:08:05")], None)),
 ("02_ISS-VEA-40",
  [("TC-171-dialog", "vea40_need_help_dialog", [(160, 967, 919, 1386)]),
   ("TC-152-viewdetails", "vea40_need_help_dialog_401_card", [(160, 967, 919, 1386), (46, 468, 1034, 802)])],
  ("16.9.0_vea40_log.txt", "ISS-VEA-40 The failed tasks behind the cards: applyEffect status Error (refunded at once), apply effect 401",
   [("21:04 task: retried upload, applyEffect status Error", D24, "21:06:50", "21:08:05"),
    ("21:54 task: upload ends, apply effect 401", D24, "23:05:15", "23:05:30")],
   ("Ledger: the 21:04 task's charge and its refund at the failure", "2026-11-24T13:04:00", "2026-11-24T13:08:59", None, {"21:04:12"}))),
 ("03_ISS-VEA-41",
  [("R3-f-ledger", "vea41_no_refund_after_401", [(60, 1368, 1020, 1566)]),
   ("TC-226-ledger", "vea41_refund_3h_later", [(60, 1110, 1020, 1314)])],
  ("16.9.0_vea41_log.txt", "ISS-VEA-41 Charged tasks that failed, and when their credits came back",
   [("20:40 task (01:30 1080p, charge 180): Enhance tap", D24, "20:40:15", "20:41:10"),
    ("20:40 task: S3 upload breaks off (Broken pipe), task failed", D24, "20:49:40", "20:49:45"),
    ("21:54 task (01:30 1080p, charge 180): Enhance tap", D24, "21:54:15", "21:55:30"),
    ("21:54 task: upload ends, apply effect 401", D24, "23:05:15", "23:05:30")],
   ("Ledger: Video Enhancer debits and 'Generation failed, credits returned' refunds, the failed tasks' debits and every refund to 2026-11-25 01:30",
    "2026-11-24T12:30:00", "2026-11-24T17:30:00", "2026-11-24T14:00:00",
    {"20:33:06", "20:40:19", "20:58:04", "21:04:12", "21:33:30", "21:54:23"},
    ["## Which refund belongs to which charge (run notes O-10 / O-16; amounts and order match)",
     "-4   20:33:06  S3 upload broke off 20:35:41            refund +4   23:40:00  3 h 4 min after the failure",
     "-180 20:40:19  S3 upload broke off 20:49:41 (above)    refund +180 00:19:08  3 h 29 min after the failure",
     "-4   20:58:04  「Leave」 during the upload (DRA262611P0094, not this bug)   refund +4 00:19:08",
     "-4   21:04:12  applyEffect status Error 21:08:03       refund +4   21:08:03  at once (the expected behaviour)",
     "-31  21:33:30  S3 upload broke off 21:34:12            refund +31  00:40:00  3 h 6 min after the failure",
     "-180 21:54:23  apply effect 401 at 23:05:23 (above)    refund +180 01:19:08  2 h 14 min after the failure"]))),
]


def main():
    root = f"{OUT}/{NAME}_images"
    if os.path.isdir(root):
        shutil.rmtree(root)
    for folder, imgs, (logname, title, secs, led) in E:
        os.makedirs(f"{root}/{folder}")
        for src, slug, boxes in imgs:
            boxed(src, f"{root}/{folder}/{V}_{slug}.jpg", boxes)
        p = excerpt(logname, title, secs, led)
        shutil.copy(p, f"{root}/{folder}/")
        print(folder, sorted(os.listdir(f"{root}/{folder}")))


if __name__ == "__main__":
    main()
