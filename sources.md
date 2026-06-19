# Search Notes and Caveats

This survey was built as a first pass on 2026-06-19. The JSON source of truth is `multimodal_swedish_resources.json`; `index.html` is generated from it by `generate_html.js`.

## Formatting Reference

- CLARIN Resource Families multimodal corpus examples:
  - `video-linked-thai-swe.json`
  - `eye-tracking.json`
  - `bas-smartkom.json`
  - `tv-news.json`
  - `natural-media-mc.json`
  - `hun-multimodal.json`

Observed convention: one resource object per JSON file, with fields `Name`, `URL`, `Family`, `Description`, `Language`, `Licence`, `Size`, `Annotation`, `Infrastructure`, `Group`, `Access`, and `Publication`. Values are conservative; missing values are empty strings or arrays.

## Included Primary Sources

- CLARIN Resource Families entry for Video-linked Thai/Swedish child data corpus:
  `https://github.com/clarin-eric/clarin-resource-families/blob/main/corpora/multimodal-corpora/video-linked-thai-swe.json`
- STS-korpus:
  `https://teckensprakskorpus.su.se/`
  `https://teckensprakskorpus.su.se/information`
- KBLab RixVox:
  `https://huggingface.co/datasets/KBLab/rixvox-v2`
  `https://huggingface.co/datasets/KBLab/rixvox`
  `https://kb-labb.github.io/posts/2023-03-09-rixvox-a-swedish-speech-corpus/`
- SweDia 2000:
  `http://swedia.ling.gu.se/`
- FLEURS:
  `https://huggingface.co/datasets/google/fleurs`
- Mozilla Common Voice:
  `https://commonvoice.mozilla.org/en/datasets`
  `https://huggingface.co/datasets/mozilla-foundation/common_voice_17_0`
  `https://mozilladatacollective.com/`
- MuMiN:
  `https://mumin-dataset.github.io/`
  `https://github.com/mumin-dataset/MuMiN-build`

## Search Queries Tried

- `Swedish multimodal corpus speech video gesture dataset`
- `site:spraakbanken.gu.se multimodal corpus Swedish audio video dataset`
- `site:clarin.eu Swedish multimodal corpora video audio corpus`
- `Swedish writing logs eye tracking corpus dataset`
- `Spontal Swedish spontaneous dialogue corpus audio video motion capture`
- `Swedish Sign Language Corpus dataset video annotation Stockholm University`
- `Svensk teckenspråkskorpus corpus`
- `SweDia 2000 audio transcription`
- `site:huggingface.co/datasets Swedish speech corpus dataset audio transcription`
- `KBLab Swedish image caption dataset Hugging Face`
- `Swedish speech EMA corpus electromagnetic articulography dataset`
- `HUMINfra Swedish multimodal language data corpus`
- `NOMCO Swedish multimodal corpus`
- `Nordic Multimodal Corpus Swedish`
- `Swedish Map Task Corpus`

## Rejected or Deferred Candidates

- VoxPopuli: current Hugging Face dataset record lists multiple European languages but no Swedish subset in the inspected dataset viewer, so it was excluded.
- Spontal/KTH: legacy `https://www.speech.kth.se/spontal/` currently returns a relocation/discontinued notice. No current primary dataset page was verified in this pass.
- Nord-Parl-TTS: paper abstract describes a Finnish/Swedish speech dataset, but no first-hand dataset landing page was verified in this pass.
- KBLab VoxRex/acoustic model work: treated as model/tool work unless a primary downloadable underlying corpus record is found.
- Swedish writing-log/eye-tracking leads: no public first-hand dataset record was verified in the first-pass searches.
- Swedish EMA/articulatory speech leads: no public Swedish dataset record was verified in the first-pass searches.
- Swedish image-caption leads: no first-hand Swedish image-language dataset card or repository was verified in the first-pass searches.

## Unresolved Ambiguities

- HUMINFRA: no public HUMINFRA-specific multimodal language dataset record was verified. Some Sweden-hosted resources may be relevant to HUMINFRA-adjacent infrastructure but were not labelled as such without source evidence.
- SweDia 2000: included as a Swedish-hosted speech resource because the landing page exposes audio listening for more than 100 dialects. Download, licence, and transcript details need deeper verification.
- Mozilla Common Voice: the old Hugging Face record indicates that datasets moved to Mozilla Data Collective in October 2025. Current Swedish size/licence/access details should be checked through the current platform.
- MuMiN: retained as a low-confidence lead. It is genuinely multimodal and multilingual, but Swedish-language inclusion was not verified from the inspected public project page.
