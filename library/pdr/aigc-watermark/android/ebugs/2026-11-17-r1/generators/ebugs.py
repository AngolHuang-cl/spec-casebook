#!/usr/bin/env python3
"""Build the AIGC Watermark Android eBug draft batch for round R1 (table v1, draft 20261117-102353) on 16.9.0 (2611161).

Writes library/pdr/aigc-watermark/android/ebugs/2026-11-17-r1/20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0.md, the sibling
_images/ folder (one NN_ISS-ID folder per entry: JPEGs named 16.9.0_<slug>.jpg, plus c2patool summaries, a file check
and a logcat excerpt where the finding rests on them) and dedupe.txt. First AIGC Watermark batch: ISS-AWA-01 on.
Nothing is filed. Every Fail row of results.csv and every observation O-n is mapped (entry / not raised); the script
stops when one is missing.

Usage: python3 library/pdr/aigc-watermark/android/ebugs/2026-11-17-r1/generators/ebugs.py
"""
import csv, hashlib, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
REPO = os.path.abspath(os.path.join(OUT, *[".."] * 6))
ROOT = f"{REPO}/library/pdr/aigc-watermark/android"
RUN = f"{ROOT}/runs/2026-11-17-r1-full"
NAME = "20261117_eBug_drafts_AIGC-Watermark-R1_16.9.0"
V, B, TR = "16.9.0", "2611161", "TR261116-0056"
TAG = "AIAgent"
DEVICE = "Device: Sony XQ-BT52 (Xperia 10 III) / Android 12"

DS_URL = "https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3815-9037"
PM = "https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id="
JIRA = "https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722"


def ds(what):
    return ("Spec Link: AIGC Watermark Design spec (Settings), 2608_AIGC Watermark board " + what + " -", DS_URL)


def pm(board, what, node="0-1"):
    return (f"Spec Link: Remove AIGC Watermark PM spec, {board} board {what} -", PM + node)


def sheet(rows):
    return (f"Spec Link: [C2PA] GAI effects.xlsx (sheet a, {rows}), the C2PA list for Jira PDRIOS-722 -", JIRA)


L1 = "Launch the APP"
MENU_SW = ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button"]
ART = ["Tap 「AI Magic」", "Tap 「My Artwork」"]

E = [
 dict(iss="ISS-AWA-01", title="The 「AIGC Watermark」 info sheet has an X close button the Design does not draw",
      cls="UI", sev=3, owner="RD", cases=["TC-003"], rep=(2, 2), feat="Settings (AIGC Watermark)",
      short="Info sheet shows an X close button the Design does not draw",
      note="R-004 / R-007 (Design 2608_AIGC Watermark, arrow 3816:10913): the sheet has title, body and 「Got it」 only. The PM Essential mockup draws an X, but the Design is the newer source and wins (pass 7; AGENTS.md Design first). Title and body match the Design word for word; 「Got it」 and system Back work (TC-004 reference on Free, TC-005). The X is button_aigc_watermark_info_close. Seen at TC-003 and again at TC-004's Free reference.",
      steps=[L1, "Tap ☰ on the Launcher", "Tap ⓘ next to 「Remove AIGC Watermark」"],
      res="The 「AIGC Watermark」 sheet shows an X close button at its top left.",
      res_zh="「AIGC Watermark」說明面板左上角多了一個 X 關閉鈕。",
      exp="The sheet shows the title, the body and 「Got it」 only, with no X, as the Design draws it.",
      exp_zh="面板應只有標題、說明文字與「Got it」，不應有 X（依 Design）。",
      imgs=[("screenshots/TC-003-sheet-settled.png", "awa01_info_sheet_x")],
      links=[ds("(ⓘ sheet, arrow 3816:10913; no X)")]),

 dict(iss="ISS-AWA-02", title="AI Art results have no 「Full Editor」, so the image rule's Full Editor step cannot be done",
      cls="Functional", sev=3, owner="PM", cases=["TC-046"], rep=(1, 1), feat="AI Art",
      short="AI Art result page has no 「Full Editor」, which the AIGC image rule names",
      note="Question for PM, filed for a decision (AGENTS.md 2026-11-11). R-024 (PM My Artwork Page › Image 類: thumbnail, View and 「Full Editor: timeline 不會有 watermark」). The AI Art result page on Android offers feedback, share, download and 「Turn the image into a video」; Select mode only delete / share / download. Thumbnail and View show no label (as R-024 wants). Either image results get a Full Editor path on Android, or the rule drops it for AI Art. Text to Image has 「Add to Timeline」 instead (ISS-AWA-03).",
      steps=[L1] + ART + ["Tap 「AI Art」", "Tap a result", "Look for 「Full Editor」"],
      res="The AI Art result page has no 「Full Editor」 (only feedback, share, download, Turn the image into a video).",
      res_zh="AI Art 結果頁沒有「Full Editor」，只有回饋、分享、下載與轉成影片。",
      exp="PM to decide: does an AI Art result open in the editor (「Full Editor」) on Android, or does the rule drop it?",
      exp_zh="請 PM 決定：Android 的 AI Art 結果是否應有「Full Editor」，或規則移除此項。",
      imgs=[("screenshots/TC-046-result.png", "awa02_aiart_result"), ("screenshots/TC-046-select.png", "awa02_aiart_select")],
      links=[pm("pm-rules (My Artwork Page)", "(Image 類: Full Editor, timeline 不會有 watermark)")]),

 dict(iss="ISS-AWA-03", title="Text to Image 「Add to Timeline」 puts the saved, labelled file on the timeline",
      cls="Functional", sev=3, owner="RD", cases=["TC-049"], rep=(1, 1), feat="Text to Image",
      short="「Add to Timeline」 puts the labelled saved image on the timeline",
      note="R-024 (PM My Artwork Page › Image 類: 「Full Editor: timeline 不會有 watermark」). The Text to Image result page's editor button is 「Add to Timeline」 (its Full Editor). Switch Off. The clip on the timeline is TimeLinePhoto_1_1794896846878.jpg, the same name as the file 「Save」 wrote before (Pictures/cyberlink/PowerDirector/Text to Image/1_1794896846878.jpg, labelled), and the AI label shows in the editor preview at 00:00 and still at 00:05 (baked into the photo, not a 2 s overlay). Thumbnail and View are clean. Video results opened with 「Full Editor」 are clean (TC-020 step 6).",
      steps=[L1] + ART + ["Tap 「Text to Image」", "Tap a result that was saved with the switch Off", "Tap 「Add to Timeline」", "Look at the top-left of the preview"],
      res="The timeline photo carries the AI label at its top left (00:00 and 00:05): it is the labelled gallery copy.",
      res_zh="加入時間軸的圖片左上角有 AI 標籤（0 秒與 5 秒皆有），是已存的含標籤檔。",
      exp="The image placed on the timeline has no AI label (PM: Full Editor timeline has no watermark).",
      exp_zh="加入時間軸的圖片不應有 AI 標籤。",
      imgs=[("screenshots/TC-049-result.png", "awa03_t2i_result"), ("screenshots/TC-049-editor.png", "awa03_timeline_label"), ("screenshots/TC-049-editor-3s.png", "awa03_timeline_label_later")],
      links=[pm("pm-rules (My Artwork Page)", "(Image 類: Full Editor, timeline 不會有 watermark)")]),

 dict(iss="ISS-AWA-04", title="Saving a Text to Image result a second time writes no new file, so the switch is ignored",
      cls="Functional", sev=2, owner="RD", cases=["TC-051", "TC-089", "O-6"], rep=(2, 2), feat="Text to Image",
      short="A second save of a result writes no new file; the switch change is lost",
      note="R-025 (image Save follows the switch; Global Rule, Jira 「consistently across export/share/save」) and R-049 (PM Note + Save rule: saving again after changing the switch applies the new value to the new file). TC-051: saved Off at TC-009 (1_1794896846878.jpg, labelled), switch turned On, download again: toast 「Saved to Gallery」, no new file; the gallery copy is byte-identical (MD5 in the attached check), so the user who turned the label off still has only a labelled image. TC-089: the reverse (saved On, then Off: no labelled file). AI Art (TC-048) and Image to Video (O-10) write a new file on each save, so only Text to Image reuses the old one (O-6). The file check is computed from the pulled copies.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button"] + ART + ["Tap 「Text to Image」", "Tap a result", "Tap the download icon", "Tap the back button", "Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 On", "Tap the back button"] + ART + ["Tap 「Text to Image」", "Tap the same result", "Tap the download icon", "Open the saved image in the gallery"],
      res="The second save shows 「Saved to Gallery」 but writes no file: the gallery keeps only the first, labelled copy.",
      res_zh="第二次儲存顯示「Saved to Gallery」卻沒寫入新檔，相簿只有第一次含標籤的檔案。",
      exp="Each save writes a new file that follows the switch at that moment (On: no label, Off: label).",
      exp_zh="每次儲存都應寫出新檔，並依當下開關決定是否有浮水印。",
      imgs=[("screenshots/r1b-switch-on.png", "awa04_switch_on"), ("screenshots/TC-051-save.png", "awa04_saved_toast_on"), ("files/TC-051-gallery-after-on-save.jpg", "awa04_gallery_copy_labelled"), ("screenshots/TC-089-save.png", "awa04_saved_toast_off")],
      files=("awa04_file_check", ["files/TC-009-t2i-portrait-off.jpg", "files/TC-051-gallery-after-on-save.jpg"]),
      links=[pm("pm-rules (Global Rule, Note)", "(Image watermark; downloaded content is not updated, a new save follows the setting)")]),

 dict(iss="ISS-AWA-05", title="Sharing an image result with the switch Off gives Instagram an image without the AI label",
      cls="Functional", sev=3, owner="PM", cases=["TC-052"], rep=(1, 1), feat="Text to Image",
      short="Image shared with the switch Off has no AI label; saved copy has one",
      note="Question for PM, filed for a decision (Q-4): the PM lists Save / Share only under Video; for images it lists thumbnail, View and Full Editor. The Jira's acceptance criterion says the watermark 「appears consistently across export/share/save flows」, and the same 1:1 result saved seconds earlier (TC-011) carries the label, so Save and Share disagree today. RD may take it directly if PM confirms the Jira line. Nothing was posted (composer left with Back › 「Not now」).",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button"] + ART + ["Tap 「Text to Image」", "Tap a 1:1 result", "Tap the share icon", "Tap 「Instagram」", "Tap 「Feed」", "Look at the top-left of the image in the composer"],
      res="The image in Instagram's composer has no AI label; the same result saved with 「Save」 has one.",
      res_zh="分享到 Instagram 的圖片沒有 AI 標籤，但同一結果用「Save」存下的有。",
      exp="PM to decide: does image Share follow the switch like Save (Jira: consistent across export/share/save)?",
      exp_zh="請 PM 決定：圖片分享是否應如儲存一樣依開關加上浮水印。",
      imgs=[("screenshots/TC-052-composer.png", "awa05_ig_composer_no_label"), ("files/TC-011-t2i-square-off.jpg", "awa05_saved_copy_labelled")],
      links=[pm("pm-rules (Global Rule, My Artwork Page)", "(Image: 左上角壓上 AIGC Watermark; Save / Share listed under Video only)"), ("Spec Link: Jira PDRIOS-722 acceptance criteria (consistently across export/share/save) -", JIRA)]),

 dict(iss="ISS-AWA-06", title="An image saved with the switch On carries Google's C2PA manifest, not CyberLink's",
      cls="Functional", sev=3, owner="RD", cases=["TC-121", "O-3"], rep=(2, 2), feat="Text to Image",
      short="Image saved with the switch On is signed by Google, not CyberLink (C2PA)",
      note="R-050 / R-052: the sheet lists Text to Image (Apt3 TextToImage) as 有簽章 (CyberLink), and the switch only controls the visible watermark (Jira 「UI setting 是控 visible watermark是否開or關」). With the switch Off the same model's file carries a CyberLink manifest (TC-118, Pass). With the switch On the app saves the provider's raw file: c2patool shows signer 「Google Media Processing Services」 / 「Google LLC」, 「Created by Google Generative AI.」, SynthID. AI Art On does the same (O-3; no row of its own, included as a second file in the attachment). Link needed: the sheet has no URL; the Spec Link points at the Jira the sheet belongs to.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 On", "Tap the back button", "Tap 「AI Magic」", "Tap 「Text to Image」", "Enter a prompt", "Tap Generate", "Wait for the result", "Tap the download icon", "Read the saved file's Content Credentials (c2patool)"],
      res="The On save carries a Google-signed manifest (Created by Google Generative AI) and no CyberLink manifest.",
      res_zh="開關開啟時存下的圖片帶的是 Google 簽章的 C2PA，而非 CyberLink。",
      exp="The saved image carries the CyberLink-signed manifest whatever the switch says, as the Off save does.",
      exp_zh="不論開關，存下的圖片都應帶 CyberLink 簽章的 C2PA（同關閉時）。",
      imgs=[("screenshots/TC-121-result.png", "awa06_t2i_result_on")],
      c2pa=("awa06_c2pa", ["files/TC-121-t2i-portrait-on.jpg", "files/TC-009-t2i-portrait-off.jpg", "files/TC-048-aiart-on.jpg", "files/TC-047-aiart-off.jpg"]),
      links=[sheet("row Apt3 TextToImage 有簽章 (CyberLink)"), pm("pm-rules (Global Rule)", "(the switch controls the visible watermark only, per Jira)")]),

 dict(iss="ISS-AWA-07", title="The full-screen player of a video result shows the 「AI」 badge over its first seconds",
      cls="UI", sev=3, owner="RD", cases=["TC-020", "TC-017", "TC-023", "TC-026", "TC-035", "TC-038", "TC-041", "O-15"], rep=(7, 7), feat="My Artwork",
      short="Full-screen player of a video result shows the 「AI」 badge over the first ~1 s",
      note="R-018 (PM My Artwork Page › Video 類: thumbnail no, View no watermark, Full Editor timeline no). Switch Off. Seen in all seven video tools that ran: Image to Video (Veo 3.1, TC-020), Video Edit by Chat (TC-017), Cinematic Reel Creator (TC-023), Character Motion Swap (TC-026), Text to Video (TC-035), AI Anime Video (TC-038), Talking Avatar (TC-041). The badge is the app's own view aigc_badge_overlay, over 00:00–00:01, gone from 00:02 (rapid screencaps; Appium's recorder stops after ~1.5 s in this player, O-11). The result page's still preview also draws it when the switch is Off and none when On (O-15; Character Motion Swap's draws none). Tiles and the Full Editor timeline are clean in every tool. TC-023's tile mark is the input photo's own label (test data), not part of this entry.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button"] + ART + ["Tap 「Image to Video」", "Tap 「View」 on a finished task", "Tap the preview", "Watch the top-left corner during the first 2 seconds"],
      res="The full-screen player shows an 「AI」 badge at the top left over 00:00–00:01 (all 7 video tools).",
      res_zh="全螢幕播放器開頭約 1 秒左上角出現「AI」標章（7 個影片功能皆同）。",
      exp="The View player shows no watermark (PM: My Artwork video View has no watermark).",
      exp_zh="View 播放器不應顯示任何浮水印。",
      imgs=[("screenshots/TC-020-player-badge-0s.png", "awa07_i2v_player_badge"), ("screenshots/TC-020-player-corner-strip.png", "awa07_i2v_player_strip"), ("screenshots/TC-017-player-corner-strip.png", "awa07_vebc_player_strip"), ("screenshots/TC-035-player-badge.png", "awa07_t2v_player_badge"), ("screenshots/TC-038-preview-corner.png", "awa07_anime_result_preview")],
      links=[pm("pm-rules (My Artwork Page)", "(Video 類: View 不會有 watermark)")]),

 dict(iss="ISS-AWA-08", title="Videos from models the sheet lists as unsigned (Kling, Vidu, Pixverse, Wan) are saved with a CyberLink C2PA manifest",
      cls="Functional", sev=3, owner="RD", cases=["TC-093", "TC-094", "TC-096", "TC-097", "TC-102", "TC-106", "TC-107", "TC-114", "O-14"], rep=(8, 8), feat="Image to Video",
      short="Kling, Vidu, Pixverse, Wan 2.7 saves carry a C2PA manifest; the sheet says none",
      note="R-051 and REQ-002 (user ruling: the sheet is correct on which effects are signed): Ext ItvKling, ItvVidu, ItvPixverse, ItvAlibaba, TtvKling, TtvAlibaba, MotionSwapKlingVid and VtvKling are 無簽章, so their output carries no manifest. Every Off save from them carries one CyberLink-signed manifest (claim generator 「PowerDirector Mobile for Android」 16.9.0, c2pa.created trainedAlgorithmicMedia, no ingredient): Image to Video Kling O3 / Vidu Q2 / Pixverse V6 / Wan 2.7 (TC-093/094/096/097), Text to Video Kling O3 / Wan 2.7 (TC-102/106), Character Motion Swap Kling Motion Control (TC-107), Video Edit by Chat Kling O3 (TC-114). The providers' raw files in the app cache show Kling does sign (「Kling AI C2PA Claim Signing」, O-14), so the sheet may be out of date for Kling; RD may forward to PM. The *AutoMusic rows (有簽章 CyberLink) do not apply: sound was Off except Pixverse V6 / Wan 2.7 (sound On), whose models have no AutoMusic row. Link needed: the sheet has no URL.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「AI Magic」", "Tap 「Image to Video」", "Pick a photo", "Pick the model 「Kling O3」", "Tap Generate", "Wait for the task to finish", "Tap 「View」", "Tap 「Save」", "Read the saved file's Content Credentials (c2patool)"],
      res="Each saved file carries a CyberLink-signed C2PA manifest (8 of 8 unsigned-model saves).",
      res_zh="無簽章模型產出的影片存檔都帶有 CyberLink 簽章的 C2PA（8 個皆是）。",
      exp="Output of an effect the sheet marks 無簽章 carries no C2PA manifest.",
      exp_zh="表上標示「無簽章」的效果，產出檔案不應帶 C2PA。",
      imgs=[("screenshots/TC-093-saved.png", "awa08_kling_o3_saved"), ("screenshots/TC-106-before-generate.png", "awa08_t2v_wan27_model"), ("screenshots/TC-107-saved.png", "awa08_kling_mc_saved")],
      c2pa=("awa08_c2pa", ["files/TC-093-itv-klingO3-off.mp4", "files/TC-094-itv-vidu-off.mp4", "files/TC-096-itv-pixverse-off.mp4", "files/TC-097-itv-wan27-off.mp4", "files/TC-012-t2v-klingO3-portrait-off.mp4", "files/TC-106-t2v-wan27-off.mp4", "files/TC-107-cms-klingmc-off.mp4", "files/TC-018-vebc-kling-off.mp4", "files/auto/cms-klingmc-raw.mp4"]),
      links=[sheet("rows Ext ItvKling, ItvVidu, ItvPixverse, ItvAlibaba, TtvKling, TtvAlibaba, MotionSwapKlingVid, VtvKling 無簽章")]),

 dict(iss="ISS-AWA-09", title="Videos from provider-signed paths (Google, BytePlus, Microsoft) are saved with only a CyberLink manifest",
      cls="Functional", sev=3, owner="RD", cases=["TC-090", "TC-122", "TC-099", "TC-113", "TC-111", "TC-110", "O-14"], rep=(6, 6), feat="Image to Video",
      short="Veo, Gemini, BytePlus saves carry CyberLink's C2PA manifest, not the provider's",
      note="R-050 and REQ-002: the sheet lists Ext ItvGoogle, TtvGoogle, VtvGoogle 有簽章 (Google), CineStoryByteplusVendorMusic 有簽章 (BytePlus) and StorytellingAssetsV3 有簽章 (Microsoft). The saved files carry one CyberLink manifest and no provider manifest or ingredient: Image to Video Veo 3.1 Off (TC-090) and On (TC-122), Text to Video Veo 3.1 (TC-099), Video Edit by Chat Gemini Omni Flash 1.1 (TC-113), Cinematic Reel Creator 「Horror Movie」 (TC-111). The raw provider files in the app cache keep the Google / BytePlus manifests (O-14), so the app replaces them on save. TC-110 (AI Storytelling) caveat: the story used the user's own media; no generated asset was visible, so the Microsoft asset may not have been called (Q-12) — RD to confirm. Link needed: the sheet has no URL.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「AI Magic」", "Tap 「Image to Video」", "Pick a photo", "Pick the model 「Veo 3.1」", "Tap Generate", "Wait for the task to finish", "Tap 「View」", "Tap 「Save」", "Read the saved file's Content Credentials (c2patool)"],
      res="The saved file carries only a CyberLink-signed manifest; the provider's (Google) manifest is gone.",
      res_zh="存檔只帶 CyberLink 簽章，原供應商（Google 等）的 C2PA 不見了。",
      exp="The saved file carries the manifest signed by the party the sheet names (Google, BytePlus, Microsoft).",
      exp_zh="存檔應帶表上所列簽章方（Google、BytePlus、Microsoft）的 C2PA。",
      imgs=[("screenshots/TC-021-saved.png", "awa09_veo_saved"), ("screenshots/TC-113-saved.png", "awa09_gemini_saved")],
      c2pa=("awa09_c2pa", ["files/TC-021-itv-veo-off.mp4", "files/TC-022-itv-veo-on.mp4", "files/TC-036-t2v-veo-off.mp4", "files/TC-113-vebc-gemini-off.mp4", "files/auto/EditByChat - Nov 17 - 2 - 1794899471753.mp4", "files/TC-024-crc-off.mp4", "files/auto/crc-raw.mp4", "files/TC-033-story-off.mp4"]),
      links=[sheet("rows Ext ItvGoogle, TtvGoogle, VtvGoogle 有簽章 (Google), CineStoryByteplusVendorMusic (BytePlus), StorytellingAssetsV3 (Microsoft)")]),

 dict(iss="ISS-AWA-10", title="AI Music Generator starts generating with no 「AIGC Watermark」 dialog when the switch is Off",
      cls="Functional", sev=2, owner="RD", cases=["TC-054", "TC-057"], rep=(1, 1), feat="AI Music Generator",
      short="Generate starts with no 「AIGC Watermark」 dialog when the switch is Off",
      note="Rechecked 2026-11-19 on 16.9.0 build 2611171 (TR261117-0042, R3; runs/2026-11-19-recheck-2611171, O-1), acda.test7 (Free), Stage, English: switch set Off, AI Music Generator (intro's 「Don't show again」 unticked, 「Try It Now」), Acoustic / Dreamy / Cinematic, 2 songs, 「Generate for ◆ 10」 at 08:58:22 went straight to 「Generating...」; 10 credits taken (2529 → 2519). Same as R1 on 2611161 (1/1). R-027 (PM Music Generator Case, arrow 97:1818, 「If Remove AIGC Watermark toggle off」): 「Generate」 opens the dialog 「AIGC Watermark」 (「Your generated music will include an AIGC watermark…」, 「Don’t show again」, 「Cancel」, 「Generate」). Caveat: the 2611171 install was used by another tester before the run; a music 「Don't show again」 ticked by them cannot be read without a debuggable build. User decision 2026-11-18/19: recheck on 2611171, then file on TR261117-0042. TC-055 / TC-056 / TC-128 stay Blocked upstream. The build's generator is the V2 form (Genre / Mood / Theme, Lyria, 5 credits a song), not the PM board's 「Describe your idea」 form (O-19).",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「AI Magic」", "Tap 「AI Music Generator」", "Tap 「Try It Now」 on the intro", "Tap 「Acoustic」 under Genre", "Tap 「Dreamy」 under Mood", "Tap 「Cinematic」 under Theme", "Tap 「Generate for ◆ 10」"],
      res="No 「AIGC Watermark」 dialog opens: the popup 「Generating...」 appears at once and 10 credits are taken.",
      res_zh="未出現「AIGC Watermark」對話框，直接顯示「Generating...」並扣 10 點。",
      exp="With the switch Off, Generate first opens the 「AIGC Watermark」 dialog with Cancel and Generate.",
      exp_zh="開關關閉時，按生成應先跳出「AIGC Watermark」對話框（Cancel / Generate）。",
      # Filed 2026-11-19 on TR261117-0042 (2611171) from the recheck run; the draft entry and its images were updated by
      # hand (images from runs/2026-11-19-recheck-2611171, verified on 16.9.0.2611171, Related line in the Note).
      # Re-running this generator would put back the R1 (2611161) evidence below.
      imgs=[("screenshots/TC-054-form-filled.png", "awa10_music_form"), ("screenshots/TC-054-dialog.png", "awa10_generating_no_dialog")],
      log=("awa10_log", "2026-11-17", "16:25:30", "16:32:20"),
      links=[pm("pm-music (Music Generator Case)", "(If Remove AIGC Watermark toggle off: AIGC Watermark dialog, arrow 97:1818)", "97-1818")]),

 dict(iss="ISS-AWA-11", title="Songs made with the switch Off have no spoken 「This audio was generated by AI.」 clip",
      cls="Functional", sev=2, owner="RD", cases=["TC-014", "TC-015", "TC-016", "TC-058", "TC-059", "O-19"], rep=(3, 3), feat="AI Music Generator",
      short="Songs made with the switch Off lack 「This audio was generated by AI.」",
      note="R-017 / R-032 / R-033 (PM Global Rule: Audio 「在開頭加上罐頭音效 “This audio was generated by AI.”，需要多國」; 純 Audio 類: Preview and Download hear it; Scope 「Music Generator → Server」). Six songs in English, Traditional Chinese and Japanese (switch Off, app language switched) start with music at 0.00 s at full level; the 0–5 s spectrograms show only the song and no speech, and two songs' first 2 s do not match (no shared canned clip). Judged from the pulled files (phone audio cannot be recorded over adb); the My AI Music preview plays the same file (TC-058). There is no Download button on 2611161: each song is written by itself to Music/cyberlink/PowerDirector/AI Music Generator/, same MD5 as the app's copy (TC-059). Which languages exist is Q-5; the clip is missing in every language, so this is filed as a defect.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「AI Magic」", "Tap 「AI Music Generator」", "Tap a Genre, a Mood and a Theme", "Tap 「Generate for ◆ 10」", "Tap 「Go to My AI Music」", "Wait for the songs to finish", "Tap play on the first song", "Listen to the first 5 seconds"],
      res="The song starts straight with music; no 「This audio was generated by AI.」 clip in English, Chinese or Japanese.",
      res_zh="歌曲一開始就是音樂，沒有「This audio was generated by AI.」語音（英、中、日皆無）。",
      exp="A song made with the switch Off starts with the spoken clip in the app's language, in preview and file.",
      exp_zh="開關關閉時生成的歌曲，開頭應有對應語言的 AI 生成語音提示。",
      imgs=[("screenshots/TC-058-playing.png", "awa11_my_ai_music_playing"), ("files/music/en-song1-spec5s.png", "awa11_en_first5s"), ("files/music/zh-song1-spec5s.png", "awa11_zh_first5s"), ("files/music/ja-song1-spec5s.png", "awa11_ja_first5s")],
      links=[pm("pm-rules (Global Rule, 純 Audio 類)", "(Audio: 開頭加上罐頭音效 This audio was generated by AI., 需要多國)")]),

 dict(iss="ISS-AWA-12", title="A project holding an AI Music Generator song exports with no AIGC dialog and no AI label",
      cls="Functional", sev=3, owner="RD", cases=["TC-061", "O-23"], rep=(1, 1), feat="Export",
      short="Project with an AI Music Generator song exports with no AIGC dialog or AI label",
      note="R-035 (PM 純 Audio 類, red = newest: 「Export, Share: 會根據 Preference 設定來決定 Project 0~2 秒有沒有 icon 的 watermark」) and R-043. Switch Off. Project: a camera photo plus song 1 (00:00–00:10). 「Export」 › 「Produce」 gave no 「AIGC Watermark」 dialog, and the file (1080 × 1920, 10.07 s) has no AI label at 0.0 / 1.9 s (only the Free 「PowerDirector」 watermark); c2patool: no claim. The same export path shows the dialog and the label for Text to Speech, AI Anime, AI Cartoon and AI Sketch projects with 「Don't show again」 unticked (TC-065/071/074/077, O-23), so the music is simply not treated as AI content.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「New Project」", "Add a photo", "Tap 「Audio」", "Tap 「AI Music Generator」", "Tap + on a generated song", "Tap 「Export」", "Tap 「Produce」", "Open the produced video"],
      res="No 「AIGC Watermark」 dialog opens and the produced video has no AI label in its first 2 seconds.",
      res_zh="匯出時沒有「AIGC Watermark」對話框，成品前 2 秒也沒有 AI 標籤。",
      exp="With the switch Off the export shows the dialog and the video carries the label over 0–2 s.",
      exp_zh="開關關閉時匯出應跳出對話框，成品前 2 秒左上角有 AI 標籤。",
      imgs=[("screenshots/TC-061-export-dialog.png", "awa12_produce_no_dialog"), ("files/frames/TC-061-0.0.png", "awa12_export_0s_no_label"), ("files/frames/TC-065-tts-off-tl.png", "awa12_tts_export_label_control")],
      links=[pm("pm-rules (純 Audio 類)", "(Export, Share: Project 0~2 秒 icon watermark by the setting, red = newest)"), pm("pm-export (Export Flow)", "(AIGC Watermark dialog, arrow 86:955)", "86-955")]),

 dict(iss="ISS-AWA-13", title="With the switch Off the editor preview shows no AI label for AI content on the timeline",
      cls="Functional", sev=3, owner="PM", cases=["TC-064", "TC-070", "TC-073", "TC-076"], rep=(4, 4), feat="Timeline",
      short="Preview shows no AI label for TTS, AI Anime, AI Cartoon or AI Sketch content",
      note="Question for PM, filed for a decision (Q-10). PM: 「當 Timeline 有 Text-2-Speech, Voice Changer、AI Anime、AI Cartoon、AI Sketch 的 AI Content 時 / Timeline: 會根據 Preference 設定來決定會不會有 watermark」, while the My Artwork rules say results show no watermark on the timeline. The table assumed the preview shows the label over the project's first 2 s with the switch Off. Switch Off: Text to Speech (TC-064), AI Anime (TC-070), AI Cartoon (TC-073), AI Sketch (TC-076) projects play from 0:00 with no label (only the Free 「PowerDirector」 watermark); their exports do carry it (TC-065/071/074/077 Pass). Voice Changer (TC-067) is left out: the Free account can only apply Effect voices, which may not be AI content (see Not raised).",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Tap 「New Project」", "Add a video", "Tap 「Audio」", "Tap 「Text to Speech」", "Type a sentence", "Tap Generate", "Tap play from 00:00", "Look at the top-left of the preview"],
      res="The editor preview shows no AI label over 00:00–00:02 (Text to Speech, AI Anime, AI Cartoon, AI Sketch).",
      res_zh="編輯器預覽前 2 秒沒有 AI 標籤（TTS、AI Anime、AI Cartoon、AI Sketch 皆同）。",
      exp="PM to decide: does the editor preview show the label for timeline AI content with the switch Off?",
      exp_zh="請 PM 決定：開關關閉時，時間軸上有 AI 內容，編輯器預覽是否要顯示標籤。",
      imgs=[("screenshots/TC-064-play.png", "awa13_tts_preview"), ("screenshots/TC-070-play.png", "awa13_anime_preview"), ("screenshots/TC-076-play.png", "awa13_sketch_preview")],
      links=[pm("pm-rules (Timeline AI content)", "(Timeline: 會根據 Preference 設定來決定會不會有 watermark)")]),

 dict(iss="ISS-AWA-14", title="The export 「AIGC Watermark」 dialog opens after 「Produce」, and its 「Cancel」 returns to the Produce sheet",
      cls="UX", sev=3, owner="PM", cases=["TC-084", "TC-085"], rep=(3, 3), feat="Export",
      short="AIGC dialog opens after 「Produce」, not on 「Export」; Cancel returns to Produce",
      note="Question for PM, filed for a decision (user-experience order of the flow, [AIAgent][UX] with BugBelong PM). R-043 / R-044 / R-045 (PM Export Flow, arrows 86:955 / 86:956; PM-only, no Design frame): Editor 「Export」 › dialog › 「Export」 › Produce sheet; 「Cancel」 stays in the editor (Q-7). The app opens the Produce sheet on 「Export」 and shows the dialog only after 「Produce」 (on Free after the Pro paywall when it shows), over the dimmed sheet; 「Cancel」 leaves the user on the Produce sheet. The dialog's content matches the PM word for word. Same order in TC-033 and TC-065.",
      steps=[L1] + ["Tap ☰ on the Launcher", "Turn 「Remove AIGC Watermark」 Off", "Tap the back button", "Open a project that holds AI Anime content", "Tap 「Export」", "Tap 「Produce」", "Tap 「Cancel」 on the dialog"],
      res="The dialog shows only after 「Produce」, and 「Cancel」 returns to the Produce sheet, not the editor.",
      res_zh="對話框在按「Produce」之後才出現，按「Cancel」回到 Produce 面板而非編輯器。",
      exp="PM to decide: should 「Export」 open the dialog first (PM flow), with 「Cancel」 back to the editor?",
      exp_zh="請 PM 決定：是否應按「Export」即先出對話框，「Cancel」回編輯器。",
      imgs=[("screenshots/TC-084-sheet.png", "awa14_produce_sheet_first"), ("screenshots/TC-084-dialog.png", "awa14_dialog_after_produce"), ("screenshots/TC-085-after-cancel.png", "awa14_cancel_back_to_sheet")],
      links=[pm("pm-export (Export Flow)", "(Export, then the AIGC Watermark dialog, then the Produce sheet; arrow 86:955)", "86-955")]),

 dict(iss="ISS-AWA-15", title="AI Cartoon and AI Sketch return a portrait photo turned 90°",
      cls="Functional", sev=3, owner="RD", cases=["O-22"], rep=(2, 2), feat="Editor (AI Style Transfer)",
      short="AI Cartoon and AI Sketch results of a portrait photo are turned 90°",
      note="Off-case observation O-22 (R1-g, closest TC-073 / TC-076): AI Style Transfer › 「AI Cartoon」 (Elf) and 「AI Sketch」 (Oil Painting) on the portrait camera photo DSC_0047.JPG return the styled image lying sideways, in the preview and in both exports (files/TC-074-cartoon-off.mp4 at 11 s, TC-077-sketch-off.mp4); the original photo shows upright on the same timeline. Likely the EXIF orientation is dropped in the style-transfer path. Not an AIGC watermark rule: no spec states it, so the basis is the editor's own display of the source photo. No Android ticket matches (dedupe.txt).",
      steps=[L1, "Tap 「New Project」", "Add a portrait photo taken with the phone camera", "Tap the photo clip", "Tap 「Effects」", "Tap 「AI Style Transfer」", "Tap 「AI Cartoon」", "Tap 「Elf」", "Wait for the result", "Look at the preview"],
      res="The styled photo is drawn turned 90° (face lying sideways); the original photo shows upright.",
      res_zh="套用 AI Cartoon / AI Sketch 後，直式照片被轉 90 度（人臉橫躺）。",
      exp="The styled photo keeps the original photo's orientation.",
      exp_zh="套用風格後的照片應維持原照片方向。",
      imgs=[("screenshots/O-22-cartoon-rotated.png", "awa15_cartoon_rotated"), ("screenshots/TC-078-sketch-applied.png", "awa15_sketch_rotated")],
      basis="Basis: In-product — Editor: the same portrait photo shows upright on the timeline before the style is applied",
      links=[pm("pm-rules (Scope)", "(AI Cartoon, AI Sketch are timeline AI content tools)")]),

 dict(iss="ISS-AWA-16", title="「Remove AIGC Watermark」 is On on a fresh install, so results carry no watermark by default",
      cls="UX", sev=3, owner="PM", cases=["TC-008"], rep=(1, 1), feat="Settings (AIGC Watermark)",
      short="「Remove AIGC Watermark」 is On by default on a fresh install",
      note="Question for PM, filed for a decision (Q-1, a default that decides what every new user's results look like: [AIAgent][UX], BugBelong PM). R-009 assumed Off: the music and export dialogs say results 「will include an AIGC watermark」 and the Jira's acceptance criterion is that the watermark is visible; but both mockups (Design 2608 and PM Essential) draw the switch On, and the build follows the drawings. After adb shell pm clear (fresh data, same build) and 「Get Started」, Menu › Settings reads On, signed out; it read On at the run's start too.",
      steps=["Launch the APP for the first time after clearing its data", "Tap 「Get Started」", "Close the 「PowerDirector Pro」 page", "Tap ☰ on the Launcher", "Read 「Remove AIGC Watermark」"],
      res="On a fresh install the switch 「Remove AIGC Watermark」 is On, so results get no watermark.",
      res_zh="全新安裝後「Remove AIGC Watermark」預設為開啟，產出不帶浮水印。",
      exp="PM to decide the default: Off (results watermarked, as the dialogs say) or On (as both mockups draw)?",
      exp_zh="請 PM 決定預設值：關閉（依對話框文案加浮水印）或開啟（依設計稿）。",
      imgs=[("screenshots/TC-008-switch-default.png", "awa16_switch_on_fresh")],
      links=[ds("(Settings row; switch drawn On)"), pm("pm-settings (Entry)", "(Essential User: switch drawn On)")]),
]

# Fail rows / observations not drafted: (item, what, why)
NOT_RAISED = [
 ("TC-067", "Voice Changer 「Radio 1」 project: no label in the editor preview (switch Off)", "Free can only apply Effect voices; the sheet lists the plain Audio VoiceChanger as a non-AI effect (無簽章, 非 AI effect), so these may correctly not count as AI content. Rerun with a Pro AI voice (Professional / Mellow / Bright) before judging."),
 ("TC-068", "Voice Changer 「Radio 1」 project exports with no dialog and no label", "Same as TC-067: table question (the row needs an AI voice, Pro). Not a bug yet."),
 ("O-1", "Credit-key errors in logcat right after a relaunch", "Start-up race; balance still read; not seen again in R1-b."),
 ("O-2", "Pro paywall at first launch (Free account)", "Normal for Free."),
 ("O-4", "Text to Image 「GPT-Image-2.6 Sunburst」 raw file is Google-made", "Information for RD (Q-12)."),
 ("O-5", "R1-b by-case log windows are zero-length", "Tooling note."),
 ("O-7", "Image to Video charges match; a mistaken Kling 4.0 task failed and was refunded", "Refund correct (net 0)."),
 ("O-8", "CyberLink manifest's digitalSourceType looks swapped between Off and On saves", "No row checks the value; spec-addition candidate / RD question (report)."),
 ("O-9", "Seedance Pro-only; no Flux / Hailuo", "Environment (rows Blocked)."),
 ("O-10", "Image to Video writes a new file per save", "Correct; context for ISS-AWA-04."),
 ("O-11", "Appium recorder stops in the player", "Tooling; folded into ISS-AWA-07's note."),
 ("O-12", "log-slice windows vs generations", "Tooling note."),
 ("O-13", "Several tools auto-save their result to the gallery when the task finishes", "Spec silent; PM question candidate (report), not drafted."),
 ("O-16", "Test photos carried the run's own labels", "Test data note (fixtures)."),
 ("O-17", "AI Storytelling not in My Artwork; Video Object Removal absent; driving notes", "Environment / driving."),
 ("O-18", "Text to Video model list; rotated portrait storage", "Environment; label drawn correctly."),
 ("O-20", "「No Internet Connection」 after a locale relaunch; fixed by relaunch", "Start-up race like O-1."),
 ("O-21", "Pro paywall after every Produce (Free)", "Normal for Free."),
 ("O-24", "Voice Changer Effect voices free, AI voices Pro", "Context for TC-067 / TC-068."),
 ("O-25", "AI Cartoon / AI Sketch charged nothing; editor AI Anime 22 min", "Credits note."),
 ("O-26", "Editor full-screen hint; Launcher ☰ only on Home", "Driving note."),
 ("O-27", "After pm clear the app could not be signed in", "Environment; ISS-AWA-10 recheck pending."),
 ("O-28", "Google sign-in opens Chrome with no account chooser", "Environment; sign-in left to the user."),
 ("O-29", "「Account Not Found」 after sign-in; bindMember 403 invalid device identity", "Same build already has DRA262611P0200 (Sign in CL account fail, S1, Assigned, TR261116-0056): dedupe.txt only."),
]
FOLDED = {}  # every folded observation is listed on its entry's Report step line
OBS_ALL = [f"O-{i}" for i in range(1, 30)]

DUPS_TXT = [("O-29 (sign-in after pm clear: 「Account Not Found」, bindMember 403)", "DRA262611P0200",
             "Assigned, RD, S1, 16.9.0.2611161, TR261116-0056: 「SIgn In: Sign in CL account fail」 — likely the same Play Integrity / device-binding failure; not drafted")]


def jpg(src, dst):
    subprocess.run(["sips", "-Z", "1400", "-s", "format", "jpeg", "-s", "formatOptions", "80", src, "--out", dst],
                   check=True, capture_output=True)


def c2pa_summary(path, title, files):
    L = [f"# {title}", f"# c2patool 0.29 on the files pulled from the phone (Sony XQ-BT52, PowerDirector {V} ({B}), Stage, 2026-11-17).",
         "# Per file: active manifest signer, claim generator, actions, ingredients, validation failures. Hashes and certificate serials omitted.", ""]
    for f in files:
        p = os.path.join(RUN, f)
        if not os.path.exists(p):
            sys.exit(f"missing file {p}")
        r = subprocess.run(["c2patool", p], capture_output=True, text=True)
        name = f.replace("files/auto/", "app cache raw: ").replace("files/", "")
        if r.returncode != 0 or not r.stdout.strip().startswith("{"):
            L.append(f"## {name}\n  no C2PA manifest ({(r.stderr or r.stdout).strip()[:80]})\n")
            continue
        d = json.loads(r.stdout)
        act = d.get("active_manifest")
        m = d["manifests"][act]
        si = m.get("signature_info", {})
        gen = ", ".join(f"{g.get('name')} {g.get('version', '')}".strip() for g in m.get("claim_generator_info", []))
        acts = []
        for a in m.get("assertions", []):
            if a.get("label", "").startswith("c2pa.actions"):
                for x in a["data"].get("actions", []):
                    acts.append(f"{x.get('action')} [{x.get('digitalSourceType', '').rsplit('/', 1)[-1]}]" + (f" \"{x['description']}\"" if x.get("description") else ""))
        ing = len(m.get("ingredients", []))
        fails = [x["code"] for x in d.get("validation_results", {}).get("activeManifest", {}).get("failure", [])]
        L.append(f"## {name}")
        L.append(f"  manifests: {len(d['manifests'])}  signer: CN={si.get('common_name')} / issuer={si.get('issuer')}")
        L.append(f"  claim generator: {gen}")
        L.append(f"  actions: {'; '.join(acts) or '-'}")
        L.append(f"  ingredients: {ing}   validation failures: {', '.join(fails) or 'none'}")
        L.append("")
    txt = "\n".join(L)
    open(path, "w", encoding="utf-8").write(txt)


def file_check(path, title, files):
    L = [f"# {title}", "# The first file was saved with the switch Off (TC-009); the second is the only gallery copy pulled after the",
         "# second save with the switch On (TC-051). Same bytes = no new file was written.", ""]
    for f in files:
        p = os.path.join(RUN, f)
        h = hashlib.md5(open(p, "rb").read()).hexdigest()
        L.append(f"{f.replace('files/', '')}\t{os.path.getsize(p):,} bytes\tMD5 {h}")
    L.append("")
    L.append("On the phone (adb ls, 14:35–14:39): Pictures/cyberlink/PowerDirector/Text to Image/ held 1_1794896846878.jpg")
    L.append("(mtime 14:27:40) before and after the On save; after TC-121 / TC-089 it held 1_1794897465270.jpg (14:37) before and")
    L.append("after the Off save. The app showed 「Saved to Gallery」 both times.")
    open(path, "w", encoding="utf-8").write("\n".join(L) + "\n")


def log_excerpt(path, title, day, t0, t1):
    keep = re.compile(r"AIMusicGenerator|getMemberCreditRemain|creditSystemFeatureList|checkFeatureCredit|Toast|Generat", re.I)
    drop = re.compile(r"MediaCodec|token|bearer|authorization|signature=|clmemberId|recommenderId|BGM pagination|MixTape", re.I)
    out, last = [], None
    for f in sorted(os.listdir(f"{RUN}/logs")):
        lf = f"{RUN}/logs/{f}/logcat-live.txt"
        if not f.startswith("R1-f") or not os.path.exists(lf):
            continue
        for line in open(lf, encoding="utf-8", errors="replace"):
            p = line.split(" ", 2)
            if len(p) < 3 or p[0] != day or not (t0 <= p[1][:8] <= t1) or not keep.search(line) or drop.search(line):
                continue
            line = re.sub(r"^(\S+ \S+) +\d+ +\d+ ([VDIWE]) ", r"\1 \2 ", line.rstrip())
            m = re.search(r"totalRemain=(\d+)", line)
            if m:
                if m.group(1) == last:
                    continue
                last = m.group(1)
                line = f"{p[0]} {p[1]} D CreditSystemManager: getMemberCreditRemain totalRemain={last}"
            if "creditSystemFeatureList" in line:
                mm = re.findall(r"FeatureCreditInfo\(featureID=AIMusicGenerator[^)]*\)", line)
                line = f"{p[0]} {p[1]} D CreditSystemManager: creditSystemFeatureList (fetched at Generate): " + ", ".join(mm or ["…"])
            out.append(line[:300])
    if not out:
        sys.exit("empty music log window")
    hdr = [f"# {title}", f"# PowerDirector {V} ({B}), Stage, Sony XQ-BT52 / Android 12, {day} phone time (UTC+8); logs/R1-f-20261117-172022/logcat-live.txt",
           "# Credit balance when it changes and the music tool's credit lookup; tokens and account ids dropped.",
           "# 16:26:07 Generate tapped (feature list fetched); no AIGC dialog line or toast; 16:32:15 balance 5811 -> 5801 (2 songs x 5).", ""]
    txt = "\n".join(hdr + out) + "\n"
    if re.search(r"eyJ[A-Za-z0-9_-]{10,}|Bearer |ya29\.", txt):
        sys.exit("token-like text in log excerpt")
    open(path, "w", encoding="utf-8").write(txt)


def main():
    rows = list(csv.DictReader(open(f"{RUN}/results.csv", encoding="utf-8-sig")))
    tally = {}
    for r in rows:
        tally[r["Result"]] = tally.get(r["Result"], 0) + 1
    fails = [r["ID"] for r in rows if r["Result"] == "Fail"]
    disp = {r["ID"]: r["Disposition"] for r in rows}
    obs_file = open(f"{RUN}/observations.md", encoding="utf-8").read()
    obs = [o for o in OBS_ALL if re.search(rf"^- {o} \(", obs_file, re.M)]
    if len(obs) != 29:
        sys.exit(f"observations found: {obs}")
    MAP = {}
    for n, e in enumerate(E, 1):
        for c in e["cases"]:
            MAP.setdefault(c, []).append(f"{n}. {e['iss']}" + (" (hold: recheck)" if e.get("hold") else ""))
    for k, _, why in NOT_RAISED:
        MAP.setdefault(k, []).append("not raised" + (" (existing ticket, dedupe.txt)" if "DRA" in why else ""))
    for k, v in FOLDED.items():
        MAP.setdefault(k, []).append(f"folded into {v}")
    MAP = {k: "; ".join(dict.fromkeys(v)) for k, v in MAP.items()}
    missing = [k for k in fails + obs if k not in MAP]
    extra = [k for k in MAP if k not in fails and k not in obs]
    if missing or extra:
        sys.exit(f"reconciliation incomplete: missing {missing}, extra {extra}")

    img_root = f"{OUT}/{NAME}_images"
    if os.path.isdir(img_root):
        shutil.rmtree(img_root)
    os.makedirs(img_root)
    L = []
    w = L.append
    w(f"# AIGC Watermark (Android) — eBug drafts, round R1 (table v1), PDR-A {V} build {B}")
    w("")
    w(f"**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-17-r1-full/` — round R1 of draft `drafts/20261117-102353` (table v1, {len(rows)} cases), 2026-11-17 14:19 → 20:08 plus the 2026-11-18 sign-in attempts, on {DEVICE[8:]} (adb HQ61563393) through Appium / UiAutomator2, {TR} (16.9.0.2611161 R2, SR DRA261109-01), Stage server, Free account ethan.hsu.cl@gmail.com. Tally: " + ", ".join(f"{v} {k}" for k, v in tally.items()) + ".")
    w("")
    w("**Status:** nothing filed, uploaded or commented. First AIGC Watermark batch (`ebug-defaults.ts pdr/aigc-watermark android`: no filed batch), so the review page prefills the filing account from the newest PowerDirector Android casebook batch (Video Enhance 2026-11-11-r1c: Creator ETHAN_HSU, [AIAgent], API) and this run's TR (TR261116-0056, whose header names 16.9.0.2611161), each marked 「confirm」. Dedupe: read-only, Android pool only (per OS, user 2026-10-28): no entry repeats an Android ticket (`dedupe.txt`).")
    w("")
    w("Rules: reviewer rules 2026-10-21 (one action per Repro step, a Spec Link on every entry with the URL on its own line, an image on every entry, the log or file evidence on failure-related ones, no video); `[AIAgent]` / `[AIAgent][UI]` owner RD for defects; open questions the run cannot settle filed to PM (BugBelong PM), `[AIAgent][UX]` for user-experience decisions (2026-11-11). Design outranks PM (2608 draws only Settings and the label size); the C2PA sheet decides which effects are signed (REQ-002). The sheet `[C2PA] GAI effects.xlsx` has no URL: its entries link the Jira it belongs to (Link needed). Severity is proposed; Video Enhance's R1 cards were all filed at 2 by the user's decision.")
    w("")
    w(f"**What is drafted:** {len(E)} entries (ISS-AWA-01…{len(E):02d}): " + ", ".join(f"{sum(1 for e in E if e['owner'] == o and e['cls'] == c)} {o} {c}" for o, c in (("RD", "Functional"), ("RD", "UI"), ("PM", "Functional"), ("PM", "UX")) if any(e['owner'] == o and e['cls'] == c for e in E)) + ". Entry 10 (music dialog) is on hold until the signed-in recheck.")
    w("")
    w("Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.")
    w("")
    for n, e in enumerate(E, 1):
        folder = f"{n:02d}_{e['iss']}"
        os.makedirs(f"{img_root}/{folder}")
        names = []
        for src, slug in e["imgs"]:
            p = os.path.join(RUN, src)
            if not os.path.exists(p):
                sys.exit(f"missing {p}")
            name = f"{V}_{slug}.jpg"
            jpg(p, f"{img_root}/{folder}/{name}")
            names.append(name)
        if e.get("c2pa"):
            slug, files = e["c2pa"]
            c2pa_summary(f"{img_root}/{folder}/{V}_{slug}.txt", f"{e['iss']} Content Credentials of the saved files", files)
            names.append(f"{V}_{slug}.txt")
        if e.get("files"):
            slug, files = e["files"]
            file_check(f"{img_root}/{folder}/{V}_{slug}.txt", f"{e['iss']} gallery file check", files)
            names.append(f"{V}_{slug}.txt")
        if e.get("log"):
            slug, day, t0, t1 = e["log"]
            log_excerpt(f"{img_root}/{folder}/{V}_{slug}.txt", f"{e['iss']} AI Music Generator, Generate with the switch Off", day, t0, t1)
            names.append(f"{V}_{slug}.txt")
        tagtype = "" if e["cls"] == "Functional" else f"[{e['cls']}]"
        short = f"PDR-A {V} - [{TAG}]{tagtype} {e['feat']}: {e['short']}"
        if len(short) > 125:
            sys.exit(f"{e['iss']} short description {len(short)} > 125")
        for s in e["steps"]:
            if ">" in s or "›" in s:
                sys.exit(f"{e['iss']} step has a chain: {s}")
        w("---"); w("")
        w(f"## {n}. {e['iss']} — {e['title']}  ·  Class: {e['cls']}  ·  Severity: S{e['sev']}  ·  Owner: {e['owner']}")
        w("")
        w(f"**Report step:** {', '.join(e['cases'])}  ·  **Reproduce:** {e['rep'][0]}/{e['rep'][1]}  ·  **Verified on:** {V}.{B}")
        w("")
        if e.get("hold"):
            w(f"> **⛔ QA note — do NOT paste into eBug; resolve before filing.** {e['note']}")
        else:
            w(f"> **QA note — not pasted into eBug.** {e['note']}")
        w("")
        w("**Short Description:**"); w(""); w("```"); w(short); w("```"); w("")
        w("**Description:**"); w(""); w("```"); w("Repro Steps:")
        for i, s in enumerate(e["steps"], 1):
            w(f"{i}. {s}")
        w(f"{len(e['steps']) + 1}. Check the result")
        w(""); w("Result:"); w(e["res"]); w(f"摘要：{e['res_zh']}"); w(" ".join("{" + x + "}" for x in names))
        w(""); w("Expect Result:"); w(e["exp"]); w(f"摘要：{e['exp_zh']}")
        w(""); w("Note:"); w(DEVICE)
        for label, url in e["links"]:
            w(label); w(url)
        if e.get("basis"):
            w(e["basis"])
        w("<Claude Reviewed>"); w("```"); w("")
        w(f"**Images:** `{NAME}_images/{folder}/`"); w("")

    w("---"); w("")
    w("# Not raised (for the record)")
    w("")
    w("| Item | What was seen | Why not raised |")
    w("|---|---|---|")
    for k, a, b in NOT_RAISED:
        w(f"| {k} | {a} | {b} |")
    blocked = [r for r in rows if r["Result"] == "Blocked"]
    bd = {}
    for r in blocked:
        bd[r["Disposition"]] = bd.get(r["Disposition"], 0) + 1
    w(f"| Blocked ({len(blocked)}) | " + ", ".join(f"{v} {k}" for k, v in sorted(bd.items())) + " | No verdict (reasons in report.md and blocked-reasons.json); TC-055 / TC-056 / TC-128 wait for the music recheck. |")
    w("")
    w("## Reconciliation against the run")
    w("")
    nq = sum(1 for f in fails if disp[f] == "question")
    w(f"{len(fails)} Fail ({len(fails) - nq} defect, {nq} question), {len(blocked)} Blocked, {tally.get('Not run', 0)} Not run, {len(obs)} observations (O-1 … O-29).")
    w("")
    ent = [k for k, v in MAP.items() if re.search(r"\d+\. ISS-AWA", v)]
    fold = [k for k, v in MAP.items() if v.startswith("folded")]
    nr = [k for k, v in MAP.items() if v.startswith("not raised")]
    tot = len(fails) + len(obs)
    w("| Step | Count | Running total |")
    w("|---|---|---|")
    w(f"| Fail rows + observations | {tot} | {tot} |")
    run = tot - len(nr); w(f"| → not raised (2 Voice Changer rows, {len(nr) - 2} observations incl. O-29, an open Android ticket) | −{len(nr)} | {run} |")
    if fold:
        run -= len(fold); w(f"| → observations folded into an entry's note | −{len(fold)} | {run} |")
    w(f"| → merged: {run} rows / observations share {len(E)} defects or questions | −{run - len(E)} | **{len(E)} entries** |")
    w("")
    w("### Row-by-row map")
    w("")
    w("| Item | Result | Disposition | Became |")
    w("|---|---|---|---|")
    for k in fails:
        w(f"| {k} | Fail | {disp[k]} | {MAP[k]} |")
    for k in obs:
        w(f"| {k} | observation | — | {MAP[k]} |")
    w("")
    w("### Owner split")
    w("")
    w("| Owner | Entries |")
    w("|---|---|")
    for o in ("RD", "PM"):
        w(f"| {o} | {', '.join(str(i) for i, e in enumerate(E, 1) if e['owner'] == o) or '—'} |")
    w("")
    w("### Filing order")
    w("")
    w("By severity: " + ", ".join(f"**{i}**" for s in (1, 2, 3, 4) for i, e in enumerate(E, 1) if e["sev"] == s and not e.get("hold")) + "; **10** only after the music recheck. Nothing is filed until the review page's decisions come back.")
    w("")
    open(f"{OUT}/{NAME}.md", "w", encoding="utf-8").write("\n".join(L))
    print(f"wrote {len(E)} entries → {OUT}/{NAME}.md")


if __name__ == "__main__":
    main()
