# c2patool re-read of R2-a files (2026-11-23, c2patool 0.29.0, orchestrator)

Xcode license accepted by the user; c2patool installed with Homebrew. Each file's full report: `<file>.c2patool.json`.
Every file: validation_state Valid; the only status code is `signingCredential.untrusted` (c2patool's default trust list
has neither CyberLink nor Google; signature and hashes check out). Confirms every R2-a C2PA verdict from c2pa_inspect.py.

| File | Manifests | Signer | Actions | Ingredients |
|---|---|---|---|---|
| TC-090-itv-veo-off.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-093-itv-klingO3-off.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-094-itv-vidu-off.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-096-itv-pixverse-off.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-097-itv-wan27-off.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-122-itv-veo-on.mp4 | 1 | CyberLink | c2pa.created | 0 |
| TC-117-aiart-off.jpg | 1 | CyberLink | c2pa.created | 0 |
| TC-118-t2i-off.jpg | 1 | CyberLink | c2pa.created | 0 |
| TC-121-t2i-on.jpg | 1 | Google LLC / Google Media Processing Services | c2pa.created, c2pa.edited | 0 (Fail stands) |
