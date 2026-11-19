# Formatting check for every HTML page (user, 2026-11-19)

Every HTML page or artifact the agent makes or changes (comparisons, reports, review pages, eBug review pages, the
pages server's templates) gets this check before it is handed over. Look at it rendered, not only at the source.
Shown by the 2026-11-19 Casebook vs Spec Agent report: a ✓ sat alone on its own line above its value, the columns
had uneven widths, and the better-side key sat next to one side's name so it read as that side's label.

## How to look
- Open the page in the browser pane (a page served by `scripts/pages.ts` there; a one-off file with `navigate`
  to its `file://` path) and take screenshots at about 1100 px wide and at 375 px (`resize_window`), then reset the
  size with `preset: "desktop"`.
- Both languages when the page has the 中文 / English switch, and both themes (a local file renders light in the
  pane: set `document.documentElement.dataset.theme = "dark"` with `javascript_tool` to see dark).
- Check by script too: no horizontal page scroll (`document.documentElement.scrollWidth > innerWidth` is false) and
  no element that scrolls sideways unexpectedly.

## What must hold
- **Nothing orphaned:** a mark (✓, ✕, a badge, a unit) never wraps onto its own line apart from its value. Draw
  marks with CSS (`::before` with a no-break space) or keep them inside the same no-wrap span.
- **Even, purposeful columns:** comparison tables use `table-layout: fixed` with set widths (label column narrower,
  the compared columns equal); text wraps inside its cell, never past it.
- **Aligned and consistent:** the same kind of value looks the same everywhere (same units, decimals, order of
  sides); paired items line up; spacing between sections is even.
- **Keys and legends read unambiguously:** a legend for a marking stands on its own line, never next to one side's
  name, and says what it marks.
- **Every comparison is complete:** when a page compares sides, each row marks its better side (a row with no
  possible winner moves to a note), and the order of sides is the same everywhere.
- **Readable at both widths and themes:** no clipped or overlapping text, contrast holds in dark and light, tables
  scroll inside their box on a phone rather than squeezing to one word per line.

Fix what fails and look again; mention in the hand-over which widths, languages and themes were checked.
