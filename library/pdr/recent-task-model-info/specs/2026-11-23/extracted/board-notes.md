# Board notes — Recent Task Model Info (spec set 2026-11-23, Figma only)

## d-model-info — 1006 · Add model information (I2V/T2V) (Design 1794:3210)
- Dated 1006 (10/06). Dark and Light versions of the same board; identical text.
- 有 model: Card/RecentTask done with showModel on: date 「2026/08/16 · 0:12」, name 「Template name 0816」, a grey filled S tag (height 20) under the name with the model name 「GPT-Image-2.5 Sunburst」 (sample), 「View」 pill at the bottom right.
- 無 model: same card, showModel off: no tag line; the card stays 120 high.
- Rules (規則):
  - Only I2V and T2V Recent task cards show the model.
  - Other features (e.g. Cinematic Reel Creator) have no model: the whole line is not shown, the card height stays 120.
  - Shows the model name the user chose when generating; a long name is cut with 「…」.
  - done / downloading / unselect / select / error / nsfw follow the same rule (state table 「+ model」 column).
  - Component: Card/RecentTask with showModel on, the tag's label set to the model.
- Guideline box: card states and sizes are in Design Guideline · Cards (link, read: links.json); Card/RecentTask showModel only on for I2V / T2V, off for other features; Card/Artwork processing / error bg with no image (text to video) / with image (image to video); also uses Card/RecentMedia and thumbnail.
- Title says I2V / T2V; the Jira title says I2V/T2V/TTI (Q-1).

## Linked: Design Guideline · Cards (qSdtJ1wbHddNm6ebWvF4ia 142:4496)
- Card/RecentTask row note: 「AI 生成紀錄 · 使用者自己選 model 時才顯示 model」; component description: showModel only when the user chose the model (e.g. I2V Custom), never for a template generation.
- States: done, tag (done + model), unselect, select, processing / downloading (「processing...」, 「9 minutes left ...」, progress, no button), error (「Error」, 「Retry」), nsfw (「View Details」). Height fixed 120; width = screen − 16 margin (mobile).

## d-recent-video — Video (Design 1794:3214), context
- My Artwork (AI Magic | My Artwork) shows a 「Recent」 strip and one row of Card/Artwork per feature: Cinematic Reel Creator, Text to Video, Image to Video, Text to Image. 「點擊卡片進入該功能的 history」: a feature card opens that feature's Recent page (arrow 1036-3983).
- Recent page (title = the feature, e.g. 「Cinematic Reel Creator」): notice 「Tasks are stored on the cloud for 1 Year. Please download any you want to keep in local storage.」, 「Manage」, a list of Card/RecentTask (all drawn with showModel off, the board predates 1006). 「點擊 view 進入該 Feature Result Page」 (arrow 1036-3984 to the CineStory result page).
- Path: My Artwork → Recent（該功能 history）→ Result Page.

## d-recent-edit — Video · 編輯模式 (Design 1794:3217), context
- 「點擊 Select 進入編輯狀態」: Recent page in edit mode: Unselect (all empty checkboxes, 「Select All」 / 「Cancel」, 「Delete」 bar), Select (one ticked), Select all (all ticked, 「Deselect All」).
- Cards drawn with showModel off (predates 1006); the 1006 rule says unselect / select follow the same model rule.

## Not part of this spec
- Photo · Text to Image (1794:3221): Text to Image Recent is a list of prompt tiles grouped by date (not Card/RecentTask), 「Text to Image：My Artwork → Recent task（可收合）→ Preview page」. Read for Q-1 only.
- Draft page 1765:6653 「Add model information in recent task (I2V/T2V/TTI)」: undated sketch, superseded by the 1006 frame.
