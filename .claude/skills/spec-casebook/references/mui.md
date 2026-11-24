# MUI test (multi-language UI)

Part of the spec-casebook skill (user, 2026-11-24). Every table can carry an **MUI** section that checks the feature
in each language the app implements for it. It tests at least:

1. **Translation**: every string the feature shows reads as the translation sheet gives it in that language (not
   left in English, not another language's text, not a key name or placeholder such as `%@` / `{0}` / `IDS_…`).
2. **Text truncation**: no string is cut off (`…`, clipped glyphs, a second line hidden), overlaps another element
   or pushes a control out of its box in that language.

More checks may be added per feature (date and number formats, right-to-left layout); each gets its own row.

## 1. Setup: languages, sheet and tags (asked, never guessed)

The answers live in `library/<product>/<feature>/mui.json`, one file for both platforms. At step 0, when a feature has
no `mui.json`, ask the user once, together with the other step 0 questions:

1. **Which languages are implemented for this feature?** The user defines the list (offer the columns of the sheet,
   when there is one, as the starting choice). "English only" or "no MUI test" writes `"languages": []` and the table
   gets no MUI section; it is not asked again.
2. **Is there a translation sheet?** Ask for it every time a new spec set arrives without one. A sheet is a spec
   file: copy it in with the spec set (`add-spec.ts` / `new-draft.ts`, never anywhere else) and extract it to
   `specs/<date>/extracted/mui-strings.json` (below). A sheet URL (SharePoint, Google Sheets) goes in `sheet_url`.
   With no sheet, the Translation rows check only that each string is in the target language and is not English,
   a key or a placeholder, and say so in their Expected Result ("No translation sheet: …").
3. **Language tags for eBugs.** Each language's short tag (e.g. `JPN`, `CHT`, `DEU`) is read from the sheet (its
   column header or legend). When the sheet has none, or there is no sheet, **ask the user before the run** for the
   tag of every language; a run with MUI rows does not start while a tag is missing. Never invent one.

```json
{
  "base": "en",
  "languages": [
    { "code": "ja", "name": "Japanese", "tag": "JPN", "launch": "ja", "tag_source": "sheet" },
    { "code": "de", "name": "German",   "tag": "DEU", "launch": "de", "tag_source": "user, 2026-11-24" }
  ],
  "sheet": "specs/2026-11-24/PDR_Video_Enhance_MUI.xlsx",
  "sheet_url": null,
  "asked": "2026-11-24"
}
```

`launch` is the code `device.ts` / `device-android.ts launch --lang <code>` takes. `base` (English unless the user
says otherwise) is the language the rest of the table runs in; it is not an MUI language. Record the answers (and
later changes to the list) in `requests.md` with the next REQ ID.

**`mui-strings.json`** (from the sheet, kept with the spec set): one entry per string the feature uses, the sheet's
key and its text per language code, with the sheet tab and row so an eBug can cite it:

```json
[{ "key": "IDS_VE_ENHANCE", "tab": "Video Enhance", "row": 12,
   "text": { "en": "Enhance", "ja": "補正", "de": "Verbessern" } }]
```

A cell the sheet leaves empty is kept as `null`: that string has no translation in the sheet yet (an owner question,
§4). Re-extract when a new sheet version arrives, and treat changed strings as a changed spec (update plan, step 3).

## 2. Rows

Write the MUI section last in the table (Section `MUI`), after every other section. Requirements first, in
`requirements.md`:

- `R-n` Every user-facing string of the feature shows the sheet's text in each implemented language (sheet tab).
- `R-n+1` No string of the feature is truncated, clipped or overlapping in any implemented language.

Then, per **screen × language** (Variants pass 10: each language its own row, listed in `### Variants`):

| Row | Precondition | Action | Expected Result |
|---|---|---|---|
| Translation | App in `<Language>` (`launch --lang <code>`) | Reach the screen by the path of the row that already does (cite its ID) | Each string on the screen matches the sheet's `<Language>` text (keys listed); no English, no key or placeholder |
| Truncation | Same | Same capture as the Translation row | Every string shows in full; none ends in `…` or is clipped; no overlap; every control keeps its size and place |

A screen means each one the feature's rows reach, its dialogs, toasts, tooltips, empty and error states included
(reuse the Design screen list or `inventory.json` when the spec set has one). Long strings worth stressing (the
longest translation of a button, a toast with a number in it) get named in the Truncation row's Expected Result.
Each row's Spec Ref is its requirement and the sheet tab; Notes names the sheet file and the sheet's date.

## 3. Running the MUI rows

- MUI rows run in their own segment, one language at a time, after every other row in the base language (a language
  switch is a phone setting the run makes itself and undoes, AGENTS.md *Phone settings for fixtures*).
- Preflight: `mui.json` has a tag for every language; otherwise stop and ask the user (§1.3).
- Per language: `launch --lang <code>` (Android: `locale status` to confirm), walk the screens by the cited rows'
  paths, and on each screen take one `texts <NAME>` read (screenshot and visible strings together) that serves both
  rows. Compare each string with `mui-strings.json` exactly (the full words, not a prefix; trim only spaces).
- Truncation is judged from the page source first: a label ending in `…` / `...`, text bounds wider than their
  container or past the screen edge, Android `ellipsize` or a line count over the view's max lines (view data from
  the re-signed debuggable build, `android-viewdump.ts`, when it is installed); then the screenshot for clipped
  glyphs and overlaps. Name each truncated string with its screen.
- End every language with a plain `launch` (Android `locale reset`) so the next segment runs in the base language.
- A string the app shows in English while the sheet has a translation is a Translation fail; a string the sheet has
  no translation for (`null`) is a Fail (question) for the owner rule below, never a pass.

## 4. MUI eBugs

MUI findings follow the eBug rules of `ebugs.md` and the casebook overlay (rule 8), with these differences:

- **Short Description tags.** The source tag stays `[AIAgent]`; the type tag is `[MUI]` or the language tags, and
  no `[UI]`:
  - **Translation missing in every implemented language** (every language of `mui.json` but the base):
    `PDR-A 16.9.0 - [AIAgent][MUI] Video Enhance: Enhance panel strings are not translated`
  - **Translation missing in some languages only**: one tag per language, in `mui.json` order, **one bug for all of
    them**: `PDR-A 16.9.0 - [AIAgent][JPN][DEU] Video Enhance: quality tooltip is not translated`
  - **Truncation**: **one bug per language**, even when several languages truncate the same string:
    `PDR-A 16.9.0 - [AIAgent][DEU] Video Enhance: 「Verbessern」 button label is truncated`
  - A wrong translation (differs from the sheet) is grouped like a missing one.
- **Grouping.** Translation strings that miss the same set of languages go in one bug (every screen named, a
  screenshot of each); a different set of languages is a different bug. A truncation bug lists every truncated
  string of its language.
- **Note.** Every MUI entry carries one `MUI:` line after `Device:`, naming the kind and the language tags exactly
  as in the Short Description: `MUI: translation — JPN, DEU`, `MUI: translation — all`, `MUI: truncation — DEU`.
  The Spec Link is the translation sheet (file name or URL, tab and row or key), plus the Design board when the
  truncation is about a control's size.
- **Owner** (the text rule, AGENTS.md *Text bugs go to RD or PM*): the sheet has the text and the app shows
  something else, or truncates it → RD; the sheet has no text for that language (`null`), or its own text cannot
  fit and must change → PM.
- **Dedupe** per OS and per language: an existing same-OS ticket on the same strings and language makes the finding
  a duplicate (`dedupe.txt`); one on other languages does not.
- **Checks.** `check_ebug_format.py --mui library/<product>/<feature>/mui.json` (`ebug-review.ts` passes it when the
  file exists) holds every MUI entry to these rules: tags from `mui.json` only, `[MUI]` only when the `MUI:` line
  says `all`, a list that covers every language written as `[MUI]` instead, one language per truncation bug, and
  tags matching the `MUI:` line. A language tag not in `mui.json` is an error: ask the user, add it, and check again.
