# Entry points

## KP-107 The toolbar sheet places every editor tool
- kind: fact · platform: both · use: analysis, run · tags: entry-point, toolbar, editor
- source: user 2026-11-26 (chat): the product team's 「PDRM Toolbar re-org」 sheet (`product.json` › `entry_points`; sources/2026-11-26-toolbar-sheet)

The sheet lists the editor's toolbars: Global (nothing selected), Video, PIP Video, Photo, PIP Photo, Audio and Text.
Each column is a first-layer button and the items under it are what that button opens. Many tools sit in several
places: Video Enhance is under Video and PIP Video › Enhance, Cinematic Reel Creator under Global › AI Magic and
Photo / PIP Photo › Effects. The newest dated tab is the reference. `node scripts/entry-points.ts pdr fetch` saves it
and `node scripts/entry-points.ts pdr "<tool>"` lists one tool's places. The primary place gets the full table and every
other place a UI pass (spec-casebook `analysis.md` pass 12). Launcher, AI Magic tab, Mine and banner entries are not in the sheet.
