# Språkbanken Node Reassessment

Reassessed after the user noted missing node coverage. This file separates **resource inclusion** from **node coverage**. A node can be relevant to Språkbanken CLARIN while still not exposing a public Swedish multimodal dataset suitable for `multimodal_swedish_resources.json`.

## Summary

| Node | Public metadata found | Added to JSON? | Reason |
| --- | --- | --- | --- |
| Humlab, Umeå University | Humlab DigiTal speech-processing infrastructure, initially focused on Sami material and legally sensitive recordings; public versions of corpora are mentioned as a goal. | No | No concrete public dataset/corpus landing page found in this pass. Strong lead for internal or future resources. |
| Uppsala University computational linguistics | HistCorp, Swedish Treebank, Decode database, Swedish Diachronic Corpus; DiaRes and CLARIN-SMS participation. | No | Publicly described resources are primarily text-only or tools; no multimodal Swedish dataset found. |
| Linköping University IDA | Linköping Translation Corpus, LinES, easy-to-read corpora, word alignment, summarization and semantic parsing gold standards. | No | Publicly described resources are primarily text-only; no multimodal Swedish dataset found. |
| Riksarkivet | National Archival Database and Digitala forskarsalen; digitized documents, maps, drawings, portraits, photographs; DiaRes participation. | Not yet | Potential image+text/archive source, but not packaged as a language dataset in the inspected metadata. Needs deeper archive/API/OCR check. |
| GRIDH, University of Gothenburg | Digital text analysis, data visualization/publication, 3D rock-art analysis, image-recognition platform, mapping performing arts in Gothenburg. | No | Interesting multimodal DH work, but inspected metadata did not expose Swedish language-resource datasets. |

## Node Details

### Humlab, Umeå University

Språkbanken CLARIN member page:
`https://sprakbanken-clarin.lingfil.uu.se/medlemmar/umu.html`

Relevant metadata:

- Humlab DigiTal is described as infrastructure for linguistic processing of recorded speech.
- Supported workflows include marking up audio at different levels, searching data subsets, acoustic analysis, and blinded/randomized perceptual testing.
- The node initially focuses on Sami material and legally sensitive material under GDPR.
- Public versions of processed corpora are mentioned as a goal.

Assessment:

This is highly relevant infrastructure, but the inspected public page does not identify a concrete public dataset. It likely supports internal or restricted resources. It should be listed as a contact/lead, not as a dataset entry.

### Uppsala University

Språkbanken CLARIN member page:
`https://sprakbanken-clarin.lingfil.uu.se/medlemmar/uu.html`

Named resources:

- MaltParser
- HistCorp
- Swedish Treebank
- Decode database
- Swedish Diachronic Corpus
- Diachronic Language Resources / CLARIN-DiaRes
- Swedish in a Multilingual Setting / CLARIN-SMS

Assessment:

The named resources are valuable Swedish/diachronic/text resources, but they are not multimodal under the survey criteria unless paired facsimile/OCR/image layers are verified. No concrete Swedish multimodal dataset was found from the node page.

### Linköping University

Språkbanken CLARIN member page:
`https://sprakbanken-clarin.lingfil.uu.se/medlemmar/liu.html`

Named resources:

- Linköping Translation Corpus
- Linköping English-Swedish Parallel Treebank (LinES)
- easy-to-read text corpora
- word-alignment gold standards
- automatic summarization gold standards
- semantic parsing gold standards

Assessment:

Relevant to Swedish and multilingual text resources, but the public node page describes text-based resources and tools. No multimodal dataset was found.

### Riksarkivet

Språkbanken CLARIN member page:
`https://sprakbanken-clarin.lingfil.uu.se/medlemmar/ra.html`

Relevant metadata:

- Riksarkivet manages about 80 shelf-kilometres of analogue records.
- Material includes documents, maps, drawings, portraits and photographs.
- A smaller part is digitized and available through the National Archival Database and Digitala forskarsalen.
- Riksarkivet participates in CLARIN-DiaRes.

Assessment:

This is a plausible source for image+text historical Swedish resources, but the inspected metadata is archive-level, not dataset-level. Follow-up should check whether OCR/transcription datasets, APIs, or downloadable corpora exist for Digitala forskarsalen/NAD.

### GRIDH, University of Gothenburg

Språkbanken CLARIN member page:
`https://sprakbanken-clarin.lingfil.uu.se/medlemmar/gridh.html`

Relevant metadata:

- Focus areas include digital text analysis, data visualization/data publication, and digital epistemology.
- Projects include a 3D tool for analysing rock carvings, image recognition using machine learning, and digital mapping/analysis of extra-institutional performing arts in Gothenburg 1965-2000.
- GRIDH participates in CLARIN-DiaRes.

Assessment:

GRIDH is clearly relevant to digital humanities and potentially multimodal cultural-heritage data, but the inspected metadata does not expose a Swedish language-resource dataset. It should be a follow-up/contact lead, not a confirmed survey entry.

## Follow-Up Questions for Nodes

1. Do you maintain any public or restricted multimodal datasets involving Swedish language, Swedish Sign Language, Swedish dialects, Sami languages in Sweden, or Swedish historical documents?
2. Are there datasets that combine audio/video/image/scans with transcription, OCR, linguistic annotation, geographic metadata, gaze/sensor data, or interaction logs?
3. Are any resources available through CLARIN VLO, SWE-CLARIN, institutional repositories, APIs, GitHub, Zenodo, or internal catalogue pages not indexed by search engines?
4. If resources cannot be shared publicly, can metadata-only records be cited?
