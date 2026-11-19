# [C2PA] GAI effects — which server effects sign their output

Extracted 2026-11-17 from 「[C2PA] GAI effects.xlsx」 (sheet 「a」, 184 effects), attached by the user. **Authoritative for which effects are signed (user, 2026-11-17, REQ-002)**; it overrides the Jira line 「meta data server side會always打sign」. 有簽章 = the output carries a C2PA manifest signed by the named party; 無簽章 = no manifest (for the non-AI Audio / Photo effects: whether the output is signed depends on the source).

| ASG | Effect | Feature ID | Signed |
|---|---|---|---|
| — | PodcastStudio | undefined | 無簽章 |
| Anch | AIAnchor | AIAnchor | 有簽章 (CyberLink) |
| Anch | AIAnchorV2 | AIAnchor | 有簽章 (CyberLink) |
| AniLcm | AIAnime | AIAnime | 有簽章 (CyberLink) |
| AniLcm | AICartoon | AICartoon | 有簽章 (CyberLink) |
| AniLcm | AISketch | AISketch | 有簽章 (CyberLink) |
| Apt1 | StorytellingAssetsTtspCL | Storytelling | 有簽章 (CyberLink) |
| Apt1 | StorytellingAssetsVcCL | Storytelling | 有簽章 (CyberLink) |
| Apt1 | TextToSpeechCL | TextToSpeech | 有簽章 (CyberLink) |
| Apt1 | VoiceChangerV2 | VoiceChanger | 有簽章 (CyberLink) |
| Apt1 | VoiceCloneCL | TextToSpeech | 有簽章 (CyberLink) |
| Apt1 | VoiceCloneCLWithSource | TextToSpeech | 有簽章 (CyberLink) |
| Apt1 | VoiceProfilingCL | VoiceCloning | 有簽章 (CyberLink) |
| Apt1 | VoiceProfilingV2CL | VoiceCloning | 有簽章 (CyberLink) |
| Apt2 | AIHairstyle | AIHairstyle | 有簽章 (CyberLink) |
| Apt2 | AIHairVolume | AIHairVolume | 有簽章 (CyberLink) |
| Apt2 | AIRoom | AIRoom | 有簽章 (CyberLink) |
| Apt2 | AIScene | AIScene | 有簽章 (CyberLink) |
| Apt3 | AIReplacement | AIReplacement | 有簽章 (CyberLink) |
| Apt3 | TextToImage | TextToImage, TextToImageV2, AIDesignStudio | 有簽章 (CyberLink) |
| Apt4 | ItvGoogleAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | ItvGoogleFirstLastAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | ItvKlingAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | ItvViduAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | ItvViduFirstLastAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | ItvViduRefAutoMusic | ImageToVideo | 有簽章 (CyberLink) |
| Apt4 | Shadow | AIShadow | 有簽章 (CyberLink) |
| Apt4 | SpeechEnhancementV2 | SpeechEnhancement | 有簽章 (CyberLink) |
| Apt4 | TextToSoundEffectV2 | TextToSoundEffect | 有簽章 (CyberLink) |
| Apt4 | TtvGoogleAutoMusic | TextToVideo | 有簽章 (CyberLink) |
| Apt4 | TtvKlingAutoMusic | TextToVideo | 有簽章 (CyberLink) |
| Apt4 | TtvViduAutoMusic | TextToVideo | 有簽章 (CyberLink) |
| Apt4 | VideoToSound | SoundGenerator | 有簽章 (CyberLink) |
| Audio | AudioDenoise | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Audio | SpeechEnhancement | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Audio | VocalRemoval | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Audio | VoiceChanger | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Audio | WindRemoval | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Etd | AIExtender | AIExtender | 有簽章 (CyberLink) |
| Ext | AICollage | AICollage | 有簽章 (OpenAI) |
| Ext | AIDesignStudio | AIDesignStudioV2 | 無簽章 |
| Ext | AIExtenderV2 | AIExtenderV2 | 有簽章 (Perfect) |
| Ext | AIMagicDesignerV3GenBg | undefined | 有簽章 (Google) |
| Ext | AIReplacementV3 | AIReplacementV3, AIReplacementV3_1 | 有簽章 (OpenAI) |
| Ext | BatchPhotoEnhance | PhotoEnhanceV2 | 有簽章 (Google) |
| Ext | CineStoryAlibabaVendorMusic | AICinematicShorts | 無簽章 |
| Ext | CineStoryByteplusVendorMusic | AICinematicShorts | 有簽章 (BytePlus) |
| Ext | CineStoryKling | AICinematicShorts | 無簽章 |
| Ext | CineStoryKlingPostMix | AICinematicShorts | 無簽章 |
| Ext | CineStoryKlingVendorMusic | AICinematicShorts | 無簽章 |
| Ext | CodeToVideo | undefined | 無簽章 |
| Ext | DesignEnhancerGenMedia | AIAdvisor | 有簽章 (OpenAI) |
| Ext | DubAud11Labs | AIVoiceTranslator | 無簽章 |
| Ext | DubVid11Labs | AIVoiceTranslator | 無簽章 |
| Ext | DubVidHeyGen | AIVoiceTranslator | 無簽章 |
| Ext | ImageDecomposition | undefined | 有簽章 (Google) |
| Ext | ImageToImage | AIFilter, EditByChat, AIProductOnModel, AITryOn, EditByText, AICreativeStudio, TrendingAITemplates, AIAdvisor | 有簽章 (Google) |
| Ext | ImageToImageProcess | AIExposure, PeopleBackgroundV3, ProductBackgroundV3, ProductBeautifier, GhostMannequin, FlatLay, ProductFixer, Ironing, PhotoEnhanceV2 | 有簽章 (OpenAI) |
| Ext | ItvAlibaba | ImageToVideo, AIGroupShot | 無簽章 |
| Ext | ItvAlibabaFirstLast | ImageToVideo | 無簽章 |
| Ext | ItvAlibabaTrendy | ImageToVideo | 無簽章 |
| Ext | ItvByteplus | ImageToVideo, AIGroupShot | 有簽章 (BytePlus) |
| Ext | ItvByteplusFirstLast | ImageToVideo | 有簽章 (BytePlus) |
| Ext | ItvByteplusTrendy | ImageToVideo | 有簽章 (BytePlus) |
| Ext | ItvFlux | ImageToVideo, AIGroupShot | 有簽章 (Black Forest Labs) |
| Ext | ItvFluxFirstLast | ImageToVideo | 有簽章 (Black Forest Labs) |
| Ext | ItvGoogle | ImageToVideo, AIGroupShot | 有簽章 (Google) |
| Ext | ItvGoogleFirstLast | ImageToVideo | 有簽章 (Google) |
| Ext | ItvGoogleManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvGoogleManualTrendy | ImageToVideo | 無簽章 |
| Ext | ItvGoogleTrendy | ImageToVideo | 有簽章 (Google) |
| Ext | ItvGoogleVendorMusic | ImageToVideo | 有簽章 (Google) |
| Ext | ItvHailuo | ImageToVideo, AIGroupShot | 無簽章 |
| Ext | ItvHailuoTrendy | ImageToVideo | 無簽章 |
| Ext | ItvKling | ImageToVideo, AIGroupShot | 無簽章 |
| Ext | ItvKlingManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvKlingManualTrendy | ImageToVideo | 無簽章 |
| Ext | ItvKlingRef | ImageToVideo | 無簽章 |
| Ext | ItvKlingRefManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvKlingTrendy | ImageToVideo | 無簽章 |
| Ext | ItvKlingVendorMusic | ImageToVideo | 無簽章 |
| Ext | ItvPixverse | ImageToVideo, AIGroupShot | 無簽章 |
| Ext | ItvPixverseEffectScene | ImageToVideo | 無簽章 |
| Ext | ItvPixverseEffectSceneManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvPixverseTrendy | ImageToVideo | 無簽章 |
| Ext | ItvVidu | ImageToVideo, AIGroupShot | 無簽章 |
| Ext | ItvViduEffectScene | ImageToVideo | 無簽章 |
| Ext | ItvViduEffectSceneManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvViduFirstLast | ImageToVideo | 無簽章 |
| Ext | ItvViduFirstLastManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvViduManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvViduManualTrendy | ImageToVideo | 無簽章 |
| Ext | ItvViduRef | ImageToVideo | 無簽章 |
| Ext | ItvViduRefManualMusic | ImageToVideo | 無簽章 |
| Ext | ItvViduTrendy | ImageToVideo | 無簽章 |
| Ext | LyricsToSongGoogle | LyricsToSong, AIMusicGeneratorV2 | 無簽章 |
| Ext | MotionSwapKlingImg | MotionSwap | 無簽章 |
| Ext | MotionSwapKlingVid | MotionSwap | 無簽章 |
| Ext | MusicGenerator | MusicGenerator | 無簽章 |
| Ext | RtvAlibaba | ReferenceToVideo, AITransition | 無簽章 |
| Ext | RtvAlibabaImg | ReferenceToVideo | 無簽章 |
| Ext | RtvByteplus | ReferenceToVideo, AITransition | 有簽章 (BytePlus) |
| Ext | RtvGoogle | ReferenceToVideo, AITransition | 有簽章 (Google) |
| Ext | RtvHailuo | ReferenceToVideo, AITransition | 無簽章 |
| Ext | RtvKling | ReferenceToVideo, AITransition | 無簽章 |
| Ext | RtvPixverse | ReferenceToVideo, AITransition | 無簽章 |
| Ext | RtvVidu | ReferenceToVideo, AITransition | 無簽章 |
| Ext | StorytellingAssets | Storytelling | 有簽章 (Microsoft) |
| Ext | StorytellingAssetsV3 | Storytelling | 有簽章 (Microsoft) |
| Ext | StorytellingAssetsV3TmplAdjustScene | Storytelling | 有簽章 (Microsoft) |
| Ext | StorytellingAssetsV3TmplGenScript | Storytelling | 有簽章 (Microsoft) |
| Ext | StorytellingAssetsVc | Storytelling | 無簽章 |
| Ext | TextToSpeech | TextToSpeech | 隨機選取語音及供應商, 部分有簽章 (Azure/Microsoft x 2)， 部分無簽章 (Google x 1, AWS x 3) |
| Ext | TtvAlibaba | TextToVideo | 無簽章 |
| Ext | TtvByteplus | TextToVideo | 有簽章 (BytePlus) |
| Ext | TtvFlux | TextToVideo | 有簽章 (Black Forest Labs) |
| Ext | TtvGoogle | TextToVideo | 有簽章 (Google) |
| Ext | TtvGoogleVendorMusic | TextToVideo | 有簽章 (Google) |
| Ext | TtvHailuo | TextToVideo | 無簽章 |
| Ext | TtvKling | TextToVideo | 無簽章 |
| Ext | TtvKlingVendorMusic | TextToVideo | 無簽章 |
| Ext | TtvPixverse | TextToVideo | 無簽章 |
| Ext | TtvVidu | TextToVideo | 無簽章 |
| Ext | VideoEnhanceV2 | VideoEnhanceV2 | 無簽章 |
| Ext | VoiceClone | TextToSpeech | 無簽章 |
| Ext | VoiceCloneWithSource | TextToSpeech | 無簽章 |
| Ext | VoiceProfiling | VoiceCloning, VoiceDesigner | 無簽章 |
| Ext | VoiceProfiling11LabsPrompt | VoiceCloning | 無簽章 |
| Ext | VoiceProfilingGooglePrompt | VoiceCloning | 無簽章 |
| Ext | VoiceProfilingV2 | VoiceCloning | 無簽章 |
| Ext | VtvAlibaba | VideoToVideo, AIEffect, AIMultiAngle | 無簽章 |
| Ext | VtvByteplus | VideoToVideo, AIEffect, AIMultiAngle | 有簽章 (BytePlus) |
| Ext | VtvGoogle | VideoToVideo, AIEffect, AIMultiAngle | 有簽章 (Google) |
| Ext | VtvKling | VideoToVideo, AIEffect, AIMultiAngle | 無簽章 |
| Ext | VtvPixverse | VideoToVideo, AIEffect, AIMultiAngle | 無簽章 |
| Flux | AIReplacementV2 | AIReplacementV2 | 有簽章 (CyberLink) |
| Flux | ItiFlux | AIFilter, EditByChat, AIProductOnModel, AITryOn, EditByText, AICreativeStudio, TrendingAITemplates, AICollage, AIAdvisor, AIHairstyleV2, PhotoEnhanceV2, PhotoAgent, AIGroupShot, AIHeadshotV3, AIDesignStudioV2, PeopleBackgroundV3, AIHairColor | 有簽章 (CyberLink) |
| Flux | PeopleBackground | PeopleBackground | 有簽章 (CyberLink) |
| Flux | ProductBackground | ProductBackground | 有簽章 (CyberLink) |
| Flux | TextToImage | TextToImage, TextToImageV2, AIDesignStudio | 有簽章 (CyberLink) |
| FluxK | GlowUpV2 | AIGlowUpV2, AIGlowUp | 有簽章 (CyberLink) |
| FluxK | ImageHarmonization | ProductShowcase | 有簽章 (CyberLink) |
| FluxK | ObjectRemovalV2 | ObjectRemovalV2 | 有簽章 (CyberLink) |
| Fres | ImageUpscaler | ImageUpscaler | 有簽章 (CyberLink) |
| Fres | PhotoEnhance | PhotoEnhance | 有簽章 (CyberLink) |
| Fswp | AIArtisticAva | AIArtisticAva | 有簽章 (CyberLink) |
| Fswp | AIFaceSwap | AIFaceSwap | 有簽章 (CyberLink) |
| Fswp | AIFaceSwapV2 | AIFaceSwapV2 | 有簽章 (CyberLink) |
| Ieq | ItiQwen | AIFilter, EditByChat, AIProductOnModel, AITryOn, EditByText, AICreativeStudio, TrendingAITemplates, AICollage, AIAdvisor, AIHairstyleV2, PhotoEnhanceV2, PhotoAgent, AIGroupShot, AIHeadshotV3, AIDesignStudioV2, PeopleBackgroundV3, AIHairColor | 有簽章 (CyberLink) |
| Ieq | ReflectionRemoval | ReflectionRemoval | 有簽章 (CyberLink) |
| Ktx | GlowUp | AIGlowUp | 有簽章 (CyberLink) |
| Ktx | ProductShowcase | ProductShowcase | 有簽章 (CyberLink) |
| Lts | LyricsToSong | LyricsToSong | 有簽章 (CyberLink) |
| Photo | AILighting | AILighting | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | AnimeFace | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | BackgroundRemoval | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | CropPerson | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | Deblur | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | Denoise | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | DepthEstimation | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | Normalization | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | ObjectRemoval | ObjectRemoval | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | ObjSegYolo | ObjSegYolo | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Photo | WireSegmentation | undefined | 無簽章 (這本身是非 AI 的 effect, 所以是否簽章會受到原圖的影響) |
| Sca2 | MotionSwapScail2 | WanAnimate, MotionSwap | 有簽章 (CyberLink) |
| TtiMix | ImageFusion | ImageFusion | 有簽章 (CyberLink) |
| TtiMix | TtiFacePoseRef | TtiFacePoseRef | 有簽章 (CyberLink) |
| TtiMix | TtiFaceRef | TtiFaceRef | 有簽章 (CyberLink) |
| TtiMix | TtiOutlineRef | TtiOutlineRef | 有簽章 (CyberLink) |
| TtiMix | TtiPoseRef | TtiPoseRef | 有簽章 (CyberLink) |
| TtiMix | TtiStyleFacePoseRef | TtiStyleFacePoseRef | 有簽章 (CyberLink) |
| TtiMix | TtiStyleFaceRef | TtiStyleFaceRef | 有簽章 (CyberLink) |
| TtiMix | TtiStyleOutlineRef | TtiStyleOutlineRef | 有簽章 (CyberLink) |
| TtiMix | TtiStylePoseRef | TtiStylePoseRef | 有簽章 (CyberLink) |
| TtiMix | TtiStyleRef | TtiStyleRef | 有簽章 (CyberLink) |
| Vani | VideoAIAnime | VideoAIAnime | 有簽章 (CyberLink) |
| Vor | VideoObjectRemoval | VideoObjRemoval | 有簽章 (CyberLink) |
| Vpipe | SlowMotion | SlowMotion | 有簽章 (CyberLink) |
| Vpipe | VideoEnhance | VideoEnhance | 有簽章 (CyberLink) |
| Vpipe | VideoUpscaler | VideoUpscaler | 有簽章 (CyberLink) |
| Wana | MotionSwapCL | WanAnimate | 有簽章 (CyberLink) |
| Wana | MotionSwapCLCustom | WanAnimate | 有簽章 (CyberLink) |
| Wana | WanAnimate | WanAnimate, MotionSwap | 有簽章 (CyberLink) |
| Wana | WanAnimateCustom | WanAnimate | 有簽章 (CyberLink) |
