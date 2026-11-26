#!/usr/bin/env python3
"""Red-boxed jpg copies of the MUI run's screenshots for the 2026-11-24-mui eBug drafts.

Boxes were placed by looking at each screenshot (1080 x 2400, SM-A5360). Run from anywhere:
    python3 generators/images.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(HERE)
SHOTS = os.path.join(BATCH, "..", "..", "runs", "2026-11-24-mui", "screenshots")
IMG = os.path.join(BATCH, "20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images")
RED = (255, 0, 0)

TITLE = (130, 95, 700, 205)          # panel title beside the credit pill
ENTRIES = {
    "01_ISS-VEA-47": [("DEU-11-panel-trimmed", "vea47_deu_panel_title_ellipsized", [TITLE])],
    "02_ISS-VEA-48": [("RUS-04-panel", "vea48_rus_fps_chips_under_enhance", [(55, 1860, 1025, 1995)]),
                      ("RUS-04c-panel-scrolled", "vea48_rus_fps_chips_two_lines", [(55, 1505, 1025, 1680)])],
    "03_ISS-VEA-49": [("PTB-04-panel", "vea49_ptb_panel_title_ellipsized", [TITLE])],
    "04_ISS-VEA-50": [("NLD-04-panel", "vea50_nld_panel_title_ellipsized", [TITLE])],
    "05_ISS-VEA-51": [("THA-04-panel", "vea51_tha_title_and_fps_chips", [(130, 95, 680, 205), (55, 1875, 1025, 1995)]),
                      ("THA-04b-panel-scrolled", "vea51_tha_fps_chips_two_lines", [(55, 1495, 1025, 1675)]),
                      ("THA-19b-enhance-group", "vea51_tha_toolbar_label_loses_ai", [(140, 1990, 350, 2175)])],
    "06_ISS-VEA-52": [("ARA-04-panel", "vea52_ara_panel_title_ellipsized", [(130, 95, 700, 205)])],
    "07_ISS-VEA-53": [("NLD-02-demo", "vea53_nld_checkbox_apostrophe", [(140, 1895, 600, 1990)]),
                      ("ARA-02-demo", "vea53_ara_checkbox_apostrophe", [(140, 1915, 560, 2005)]),
                      ("TRK-02-demo", "vea53_trk_checkbox_apostrophe", [(140, 1895, 650, 1990)])],
    "08_ISS-VEA-54": [("NLD-13-leave", "vea54_nld_leave_title", [(235, 850, 840, 990)])],
    "09_ISS-VEA-55": [("DEU-04-panel", "vea55_deu_time_bubble_over_label", [(55, 965, 530, 1100)])],
}
MONTAGE = ["DEU", "FRA", "RUS", "PTB", "IND", "MAY", "VIT", "PLK", "TRK", "DAN", "NOR", "UKR"]


def boxed(src, boxes):
    im = Image.open(os.path.join(SHOTS, src + ".png")).convert("RGB")
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle(b, outline=RED, width=8)
    return im


def font(size):
    for p in ("/System/Library/Fonts/Helvetica.ttc", "/System/Library/Fonts/Supplemental/Arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def montage(path):
    """Each language's Selected Length label (DEU-04 … UKR-04 panels), 2 columns, the covered letters boxed."""
    cw, ch, lab = 600, 150, 110
    cols, rows = 2, (len(MONTAGE) + 1) // 2
    out = Image.new("RGB", (cols * (cw + lab), rows * ch), "white")
    d = ImageDraw.Draw(out)
    f = font(40)
    for i, tag in enumerate(MONTAGE):
        x0, y0 = (i % cols) * (cw + lab), (i // cols) * ch
        crop = Image.open(os.path.join(SHOTS, f"{tag}-04-panel.png")).convert("RGB").crop((40, 960, 40 + cw, 960 + ch))
        cd = ImageDraw.Draw(crop)
        cd.rectangle((12, 3, 175, 145), outline=RED, width=6)
        out.paste(crop, (x0 + lab, y0))
        d.text((x0 + 12, y0 + 52), tag, fill="black", font=f)
    out.save(path, quality=88)


def main():
    for folder, shots in ENTRIES.items():
        dst = os.path.join(IMG, folder)
        os.makedirs(dst, exist_ok=True)
        for src, slug, boxes in shots:
            boxed(src, boxes).save(os.path.join(dst, f"16.9.0_{slug}.jpg"), quality=85)
    montage(os.path.join(IMG, "09_ISS-VEA-55", "16.9.0_vea55_time_bubble_12_languages.jpg"))


if __name__ == "__main__":
    main()
