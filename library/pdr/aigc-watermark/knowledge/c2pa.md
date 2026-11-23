# C2PA manifests

## KF-001 Providers sign their raw files; every save re-signs as CyberLink
- kind: fact · platform: android · use: analysis, run, ebug · tags: c2pa, provider, save
- source: AIGC Watermark Android run 2026-11-17-r1-full O-3, O-14 · verified: 16.9.0 build 2611161 (2026-11-17)

The providers' raw files (app cache, /sdcard/Android/data/<pkg>/files/…) carry their own valid C2PA manifests: Google
(「Google Media Processing Services」, SynthID) for Text to Image, AI Art and Gemini Omni Flash; Kling AI (「Kling AI
C2PA Claim Signing」) for Kling O3 and Kling Motion Control, although the sheet lists Kling as 無簽章; BytePlus
(BytePlus_ModelArk) for Cinematic Reel; CyberLink for Wan 2.2 Animate, AI Anime Video and Talking Avatar. Video saves
(Off and On) replace the provider manifest with a CyberLink one; Text to Image and AI Art saved On keep Google's file
unchanged, saved Off get a CyberLink manifest with no Google ingredient. Input for Q-12.

## KF-002 Text to Image's model name and its file's signer differ
- kind: question · platform: android · use: analysis, ebug · tags: c2pa, provider, text-to-image, ai-art
- source: AIGC Watermark Android run 2026-11-17-r1-full O-4 · verified: 16.9.0 build 2611161 (2026-11-17)

Text to Image's default model reads 「GPT-Image-2.6 Sunburst」, yet its raw file's manifest says 「Created by Google
Generative AI.」; AI Art's raw file is Google's too, where the sheet assumes Flux. Which effect each path calls is for
RD (Q-12); do not assert a vendor from the model name.

## KF-003 digitalSourceType looks swapped between Off and On saves
- kind: question · platform: android · use: analysis, ebug · tags: c2pa, digitalsourcetype
- source: AIGC Watermark Android run 2026-11-17-r1-full O-8 · verified: 16.9.0 build 2611161 (2026-11-17)

In the CyberLink manifest the Off save (label burned in) says `trainedAlgorithmicMedia` while the On save (no label,
unedited) says `compositeWithTrainedAlgorithmicMedia` (Image to Video). No row checks the value; a question for RD
and a spec-addition candidate.

## KF-007 CLC2PA signs CyberLink only and replaces the provider's manifest
- kind: rule · authority: team · platform: both · use: analysis, run, ebug · tags: c2pa, clc2pa, provider, switch
- source: RD Sean Kao on DRA262611P0220 / P0221 (NAB, 2026-11-19/20); Pike via Remus Chiang on Jira PDRA-649 · verified: 16.9.0 build 2611161 (2026-11-17)

Since CLC2PA 1.0.1012 the app signs every saved AI result with CyberLink's manifest alone: one `c2pa.created` action
with `digitalSourceType`, no ingredient and no provenance chain; a manifest the provider's file already carries
(Google, Kling, BytePlus…) is replaced. This holds for effects the sheet marks 無簽章 too, and 「Remove AIGC
Watermark」 does not change it (the switch is UI only). A save that keeps a provider's manifest (Text to Image On,
KF-001) is the exception to flag. Supersedes the reading in KF-001 that the sheet decides whether a save is signed.
