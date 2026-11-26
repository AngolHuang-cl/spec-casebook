
## OBS-MUI-1 · Selected Length time bubble covers the label's descenders (layout, every language)
The time bubble under 「Selected Length」 (00:00 at the left handle) sits on the label's baseline, so a letter with a
descender at the start of the label is cut: DEU 「Ausgewählte Länge」 (g, DEU-04-panel), FRA 「Longueur sélectionnée」 (g,
FRA-04-panel), PTB 「Comprimento…」 (p). English, CJK, ITA and ESP have no descender there. One layout finding (RD,
[UI]), not a per-language MUI truncation; per-language walks note it without failing for it (orchestrator, 2026-11-24).
