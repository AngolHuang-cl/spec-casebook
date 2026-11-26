# C2PA manifests

## KF-001 Providers sign their raw files; every save re-signs as CyberLink
- kind: fact · platform: android · use: analysis, run, ebug · tags: c2pa, provider, save
- source: AIGC Watermark Android run 2026-11-17-r1-full O-3, O-14; AIGC Watermark Android run 2026-11-23-r2-changed O-1 · verified: 16.9.0 build 2611193 (2026-11-23)

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
- source: AIGC Watermark Android run 2026-11-17-r1-full O-8; AIGC Watermark Android run 2026-11-23-r2-changed O-13 · verified: 16.9.0 build 2611193 (2026-11-23)

In the CyberLink manifest the Off save (label burned in) says `trainedAlgorithmicMedia` while the On save (no label,
unedited) says `compositeWithTrainedAlgorithmicMedia` (Image to Video). On 2611193 every Off video save says `trainedAlgorithmicMedia` except the AI Storytelling
export, which says `compositeWithTrainedAlgorithmicMedia`. No row checks the value; a question for RD
and a spec-addition candidate.

## KF-007 CLC2PA signs CyberLink only and replaces the provider's manifest
- kind: rule · authority: team · platform: both · use: analysis, run, ebug · tags: c2pa, clc2pa, provider, switch
- source: RD Sean Kao on DRA262611P0220 / P0221 (NAB, 2026-11-19/20); Pike via Remus Chiang on Jira PDRA-649; AIGC Watermark Android run 2026-11-23-r2-changed (every R2 save) · verified: 16.9.0 build 2611193 (2026-11-23)

Since CLC2PA 1.0.1012 the app signs every saved AI result with CyberLink's manifest alone: one `c2pa.created` action
with `digitalSourceType`, no ingredient and no provenance chain; a manifest the provider's file already carries
(Google, Kling, BytePlus…) is replaced. This holds for effects the sheet marks 無簽章 too, and 「Remove AIGC
Watermark」 does not change it (the switch is UI only). A save that keeps a provider's manifest (Text to Image On,
KF-001) is the exception to flag. Supersedes the reading in KF-001 that the sheet decides whether a save is signed.

## KF-008 AI Music Generator songs carry no C2PA manifest
- kind: fact · platform: android · use: analysis, run, ebug · tags: c2pa, ai-music, audio
- source: AIGC Watermark Android run 2026-11-23-r2-changed TC-119 (Fail, drafted ISS-AWA-17), TC-063; R1 2026-11-17-r1-full · verified: 16.9.0 build 2611193 (2026-11-23)

Songs written by AI Music Generator (switch Off and On, app and Music-folder copies alike) give c2patool 「No claim
found」, and libclc2pa is not loaded when they are written. A photo + song project exported with the switch Off writes
no claim either, although libclc2pa loads at that export. Spec R-050 / PDRA-649 expect a CyberLink manifest (a defect).
