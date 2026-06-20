# Search Notes and Caveats

This survey was built as a first pass on 2026-06-19. The JSON source of truth is `multimodal_swedish_resources.json`; `index.html` is generated from it by `generate_html.js`.

Additional node-level assessment is in `node_reassessment.md`. Machine-readable node coverage for the generated HTML is in `node_coverage.json`.

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

- Språkbanken / Språkbanken CLARIN infrastructure:
  `https://sprakbanken.se/`
  `https://sprakbanken-clarin.lingfil.uu.se/`
  `https://sprakbanken-clarin.lingfil.uu.se/resurser.html`
  `https://sprakbanken-clarin.lingfil.uu.se/medlemmar/lu.html`
  `https://sprakbanken-clarin.lingfil.uu.se/medlemmar/kth.html`
  `https://sprakbanken-clarin.lingfil.uu.se/medlemmar/su.html`
- CLARIN Resource Families entry for Video-linked Thai/Swedish child data corpus:
  `https://github.com/clarin-eric/clarin-resource-families/blob/main/corpora/multimodal-corpora/video-linked-thai-swe.json`
- LU Humanities Lab Archive:
  `https://archive.humlab.lu.se/`
  `https://archive.humlab.lu.se/flat/islandora`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_00_0000_0000_0000_0001_D`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_00_0000_0000_0000_0001_D?page=1&display=list`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_00_0000_0000_0000_00E6_7`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_00_0000_0000_0000_019A_C`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_00_0000_0000_0000_0462_E`
  `https://archive.humlab.lu.se/flat/islandora/object/lat%3A10050_84e2a81b_501a_41a9_a59d_9c62becbc6a1`
- Isof Swedish archive/audio resources:
  `https://www.isof.se/folkminnen/folke`
  `https://sok.folke.isof.se/`
  `https://www.isof.se/dialekter/vara-dialektsamlingar/intervjuer-och-inspelningar`
  `https://www.isof.se/dialekter/vara-dialektsamlingar/dialektkartan`
  `https://dialektkartan.isof.se/`
- ELRA SpeechDat records:
  `https://catalogue.elra.info/en-us/repository/search/?q=Swedish%20SpeechDat`
  `https://catalogue.elra.info/en-us/repository/browse/ELRA-S0069/`
  `https://catalogue.elra.info/en-us/repository/browse/ELRA-S0070/`
  `https://catalogue.elra.info/en-us/repository/browse/ELRA-S0071/`
  `https://catalogue.elra.info/en-us/repository/browse/ELRA-S0080/`
- KTH Hugging Face speech datasets:
  `https://huggingface.co/datasets/KTH/speechdat`
  `https://huggingface.co/datasets/KTH/waxholm`
  `https://huggingface.co/api/datasets/KTH/speechdat`
  `https://huggingface.co/api/datasets/KTH/waxholm`
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

## Search Queries Tried

- Språkbanken CLARIN member pages and certified centres:
  - Språkbanken Text, GU
  - Språkbanken Tal, KTH
  - Språkbanken Sam, Isof
  - Datorlingvistikgruppen, UU
  - GRIDH, GU
  - Humanistlaboratoriet, LU
  - Humlab, UmU
  - Institutionen för lingvistik, SU
  - Kungliga biblioteket
  - Institutionen för datavetenskap, LiU
  - Riksarkivet
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

- Several Lund Corpora language-documentation collections that were only hosted in Sweden but not Swedish-language or Swedish-related were removed after review: Baniwa, Dâw, Eline Visser corpora, Kammu, LACOLA, LANG-KEY, REaCHeS, SpaceH, and The Forager's Index. They remain relevant to Lund Humanities Lab as infrastructure, but not to the Swedish-content survey.
- MuMiN: removed from the main JSON after review because Swedish-language inclusion was not verified from the inspected primary sources.
- VoxPopuli: current Hugging Face dataset record lists multiple European languages but no Swedish subset in the inspected dataset viewer, so it was excluded.
- Spontal/KTH: legacy `https://www.speech.kth.se/spontal/` currently returns a relocation/discontinued notice. No current primary dataset page was verified in this pass.
- Nord-Parl-TTS: paper abstract describes a Finnish/Swedish speech dataset, but no first-hand dataset landing page was verified in this pass.
- KBLab VoxRex/acoustic model work: treated as model/tool work unless a primary downloadable underlying corpus record is found.
- Swedish writing-log/eye-tracking leads: no public first-hand dataset record was verified in the first-pass searches.
- Swedish EMA/articulatory speech leads: no public Swedish dataset record was verified in the first-pass searches.
- Swedish image-caption leads: no first-hand Swedish image-language dataset card or repository was verified in the first-pass searches.

## Unresolved Ambiguities

- HUMINFRA: no public HUMINFRA-specific multimodal language dataset record was verified. Some Sweden-hosted resources may be relevant to HUMINFRA-adjacent infrastructure but were not labelled as such without source evidence.
- Lund Corpora: only entries with Swedish-content evidence or a plausible Swedish reading/writing context are retained. Non-Swedish Sweden-hosted language-documentation collections were removed to keep the survey aligned with Swedish content.
- SpeechDat: KTH now has a Hugging Face `KTH/speechdat` record, so the survey uses that as the primary entry. ELRA records remain useful historical/distribution evidence but were replaced in the main JSON.
- Waxholm: Added from the KTH Hugging Face `KTH/waxholm` record.
- SweDia 2000: included as a Swedish-hosted speech resource because the landing page exposes audio listening for more than 100 dialects. Download, licence, and transcript details need deeper verification.
- Mozilla Common Voice: the old Hugging Face record indicates that datasets moved to Mozilla Data Collective in October 2025. Current Swedish size/licence/access details should be checked through the current platform.
