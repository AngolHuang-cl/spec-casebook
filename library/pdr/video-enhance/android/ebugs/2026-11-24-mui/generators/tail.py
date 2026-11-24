#!/usr/bin/env python3
"""Fill the drafts' closing sections (held, not raised, dedupe, doubts, reconciliation) at <<TAIL>>."""
import os, re
B = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUN = os.path.join(B, "..", "..", "runs", "2026-11-24-mui")
MD = os.path.join(B, "20261124_eBug_drafts_Video-Enhance-MUI_16.9.0.md")

held = [
    ("iap_golden_week_terms_of_service", "CHT, CHS, ESP, KOR, DEU, FRA, ITA, RUS, PTB, IND, THA, MAY, HIN (13)", "「Terms of Service」 left in English", "Shown on no walked screen: the account is Pro, so no purchase screen is on the walk, and the key is a shared IAP key; whether a Video Enhance purchase screen uses it is unchecked."),
    ("video_enhance_hint", "NLD, ESM, ARA, VIT, PLK, FAR, HEB, SVE, DAN, NOR (10)", "「Video Enhance」 / 「Enhance」 left in English (VIT: most of the sentence)", "The preview hint never showed in any language: not on the panel, while the preview plays, in the full-screen preview or on the Result (NLD probe, onscreen.md)."),
    ("video_enhance_generating_subtitle", "ARA, VIT (2)", "ARA 「AI Enhanced Video」 left in English; VIT garbled 「AI Cải thiệnd Videocủa」", "The generating screen follows a finished upload (~13 min); the walks cancel at the upload, and Part 3's three VIT uploads failed at S3 (Broken pipe / Connection reset, logs/VIT-upload-fail-20261124-153639); ARA was not attempted."),
    ("video_enhance_uploading_video", "VIT (1)", "「Đang Tải VideoLên」", "Not shown: the upload dialog uses video_enhance_v2_uploading 「Đang tải video lên…」 (correct) (VIT-12, VIT-30, VIT-34)."),
    ("dont_show_message_again", "NLD, ARA (2)", "stray apostrophe 「Niet' meer weergeven」, 「لا' تظهر مرة أخرى」", "Not shown: the Video Enhance Demo page uses ai_video_anime_checkbox (entry 7). RD may fix both keys together."),
    ("video_enhance_generate_button", "NLD, TRK (2)", "「Probeer & Enhance」, 「& Enhance'i deneyin」 (the `&amp;` strings)", "Not shown: the Demo button reads 「Probeer nu」 / 「Şimdi deneyin」 and the panel CTA 「Verbeteren」 / 「Geliştir」."),
    ("video_enhance_credits_deduction_duration_confirm_message", "ITA (1)", "「della trasmissione」 (of the broadcast) for 「throughout」", "Not shown: the walk has no credit confirm dialog (Pro account, short tasks)."),
]

not_raised = [
    ("Line wraps shown in full", "JPN processing title (中… on line 2) and 「タイムラインに追加」; IND clip toolbar group 「Sempurnaka / n」 (also doubt TD-W8); SVE Launcher 「Videoförbättri / ng」 and toolbar 「AI-videoförbättrin / g」; DAN toolbar 「AI-videoforbedrin / g」; multi-line bubbles, toasts and dialog bodies in most languages", "Every string is whole (TC-322 – TC-347 expect no ellipsis, cut or lost line); mid-word breaks are wording / hyphenation doubts, not truncation."),
    ("Other features' strings on the Launcher and in the editor", "ESP 「Tools de audio」 (TD-W2), DEU 「Fix Bewegung」 (TD-W3), ITA Cinematic Reel label cut (TD-W4), RUS Upscaler label and 「Инстру менты」 (TD-W7), VIT 「Dụngcụ」 / 「Mặtnạ」 / Upscaler label (TD-W11), NOR 「Bytte av karakte / rbevegelse」, UKR 「Чат-редагуван / ня」, 「Кінематог / рафічні」", "Not Video Enhance strings; listed as doubts for the user's call (other features' owners), not drafted here."),
    ("ESM upload dialog subtitle", "「Mantén la aplicación abierta」 line without side padding (TC-337 note)", "Whole and inside the dialog; a spacing point for the design check, not MUI."),
    ("Offline toast", "Not shown in any language (Wi-Fi off, Enhance does nothing)", "DRA262611P0077 (open, Android): the string could not be seen, so it is not judged."),
    ("Demo description", "AI Reframe's text in every language, English included", "DRA262611P0086 (open, Android)."),
    ("Empty credit pill on the first panel visit after a language launch", "Pill empty and CTA dead until the panel is reopened (CHT, DEU, DAN)", "KP-067 (known quirk), not language-related."),
    ("Upload failures in the capture attempt (Part 3, VIT)", "Three uploads in a row failed at S3 (Broken pipe after 91 s; Retry: Connection reset; new 9 s task: Broken pipe at 94 %), each ending on Recent task with a Retry card and 「Cần Trợ Giúp?」; 22 + 20 credits charged and not refunded by 15:37", "An observation of the network / upload path during the capture, not MUI (run-state.md, logs/VIT-upload-fail-20261124-153639). Refunds come about 3 h later (KF-003); check the balance before raising anything (KP-007). Failed-task cards with a nonsense length are DRA262611P0083."),
    ("RTL layout and digits", "Launcher, Demo and panel not mirrored in ARA / FAR / HEB while Recent task, Result and bubbles are; mixed Arabic-Indic and Latin digits on the ARA panel", "Doubts TD-W9 and TD-W10 (your call): no spec says which layout is intended."),
    ("Test subscription lapsed during Part 3", "「Cải thiện」 opened the Pro purchase page; re-bought with the user's go-ahead (test card)", "Fixture, not a finding."),
]

def main():
    t = open(MD, encoding="utf-8").read()
    out = []
    out.append("## Held — APK-only translation fails never seen on a Video Enhance screen (not drafted)\n")
    out.append("TC-321 found 35 fails in the APK strings; the walks saw 4 of them on screen (entries 7 and 8). The other 31 are held: a translation bug needs a screenshot of the wrong text on the feature's screen (an image on every entry, overlay rule 3), and these never showed (`mui/onscreen.md`). Build 2611201's APK has the same strings as 2611231's, so they are still in the app; they become entries when a run reaches their screen.\n")
    out.append("| Key | Languages | APK text | Why held |\n|---|---|---|---|")
    for k, l, a, w in held:
        out.append(f"| `{k}` | {l} | {a} | {w} |")
    out.append("\n## Already filed on Android (dedupe.txt only, not drafted)\n")
    out.append("None. `ecl_query.py dedupe` searched 198 Android tickets (「AI Video Enhance」 and 「Video Enhance」) and every one of the 49 open on 16.9.0 was read against the 9 entries: no ticket covers a language's translation or truncation. Candidates read and set aside (`dedupe.txt`): DRA262611P0073 (「0fps」 badge, disabled fps chips: not localized chips), DRA262611P0241 (panel title Bold, not Medium: a weight, not the translated title's length; related to entries 1, 3, 4, 5, 6), DRA262611P0093 (limit bubble over the Preview time: another bubble), DRA262611P0088 (closed: tick saved on ‹, not the label's text) and DRA252503-0298 (closed 15.1.0: back from Recent task to the Demo page).\n")
    out.append("## Not raised (for the record)\n")
    out.append("| Item | What was seen | Why not raised |\n|---|---|---|")
    for a, b, c in not_raised:
        out.append(f"| {a} | {b} | {c} |")
    # doubts
    rows = [l for l in open(os.path.join(RUN, "mui-doubts.md"), encoding="utf-8").read().splitlines() if l.startswith("| TD-")]
    out.append("\n## Translation doubts\n")
    out.append(f"{len(rows)} doubts from the run (`mui-doubts.md`): TD-A from the Asia / Middle East APK review, TD-E from the Europe / Americas review, TD-W seen on the phone during the walks (some are other features' strings or layout questions, marked in the row). None is drafted: pick File or Fine as is for each on the review page. Filed ones become translation entries grouped by language set (`[MUI]` only when every language has it); Fine as is goes into the feature's knowledge as a `decision` entry.\n")
    out.append("| ID | Language | Screen | English | App shows | Why it seems off | Better wording |")
    out.append("|---|---|---|---|---|---|---|")
    out.extend(rows)
    # reconciliation
    rec = [
        ("TC-321", "Fail", "7. ISS-VEA-53; 8. ISS-VEA-54; held (31 APK-only fails); doubts TD-A1 – TD-A26, TD-E1 – TD-E41"),
        ("TC-322", "Pass", "not raised (offline toast: DRA262611P0077)"),
        ("TC-323", "Pass", "doubt TD-W1"),
        ("TC-324", "Pass", "not raised (JPN wraps shown in full)"),
        ("TC-325", "Pass", "doubt TD-W2"),
        ("TC-326", "Pass", "—"),
        ("TC-327", "Fail", "1. ISS-VEA-47; 9. ISS-VEA-55; doubt TD-W3"),
        ("TC-328", "Pass", "9. ISS-VEA-55"),
        ("TC-329", "Pass", "doubt TD-W4"),
        ("TC-330", "Fail", "2. ISS-VEA-48; 9. ISS-VEA-55 (found while drafting); doubts TD-W5 – TD-W7"),
        ("TC-331", "Fail", "3. ISS-VEA-49; 9. ISS-VEA-55"),
        ("TC-332", "Fail", "4. ISS-VEA-50; 7. ISS-VEA-53; 8. ISS-VEA-54"),
        ("TC-333", "Pass", "9. ISS-VEA-55; doubt TD-W8"),
        ("TC-334", "Fail", "5. ISS-VEA-51"),
        ("TC-335", "Pass", "9. ISS-VEA-55"),
        ("TC-336", "Pass", "—"),
        ("TC-337", "Pass", "not raised (upload subtitle padding)"),
        ("TC-338", "Fail", "6. ISS-VEA-52; 7. ISS-VEA-53; doubts TD-W9, TD-W10"),
        ("TC-339", "Pass", "9. ISS-VEA-55 (found while drafting); doubt TD-W11; not raised (Part 3 upload failures)"),
        ("TC-340", "Pass", "9. ISS-VEA-55; doubt TD-W12"),
        ("TC-341", "Pass", "7. ISS-VEA-53; 9. ISS-VEA-55 (found while drafting)"),
        ("TC-342", "Pass", "doubt TD-W9"),
        ("TC-343", "Pass", "doubt TD-W9"),
        ("TC-344", "Pass", "not raised (mid-word wraps shown in full)"),
        ("TC-345", "Pass", "9. ISS-VEA-55"),
        ("TC-346", "Pass", "9. ISS-VEA-55"),
        ("TC-347", "Pass", "9. ISS-VEA-55"),
        ("OBS-MUI-1", "observation", "9. ISS-VEA-55"),
    ]
    out.append("\n## Reconciliation\n")
    out.append("Every row of the MUI phase, the run's observation and every translation doubt.\n")
    out.append("| Row | Result | Where it went |\n|---|---|---|")
    for r, s, w in rec:
        out.append(f"| {r} | {s} | {w} |")
    for l in rows:
        i = l.split("|")[1].strip()
        out.append(f"| {i} | doubt | Translation doubts (your call) |")
    out.append("\n### Owner split\n\n| Owner | Entries |\n|---|---|\n| RD | 1 – 9 |\n| PM | — |\n")
    out.append("### Filing order\n\nTruncation (**1** – **6**), then translation (**7**, **8**), then the layout bug (**9**). Nothing is filed until the review page's decisions come back, with the TR named (build 2611201 is not a TR build).")
    t = re.sub(r"<<TAIL>>\n?", "\n".join(out) + "\n", t) if "<<TAIL>>" in t else t
    open(MD, "w", encoding="utf-8").write(t)

main()
