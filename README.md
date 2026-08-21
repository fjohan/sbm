# Språkbanken Multimodal Resource Survey

This repository contains a first-pass survey of multimodal language data resources associated with Språkbanken/SWE-CLARIN and adjacent Swedish language-resource infrastructure.

The broader area includes resources, tools and models, but this particular survey is data-focused. Its goal is not completeness; it is meant to illustrate how the JSON schema used by CLARIN ERIC resource-family descriptions can structure a practical discovery pass.

## Files

- `index.html` - searchable table view of data resource records.
- `multimodal_swedish_resources.json` - resource records used to generate the page.
- `node_coverage.json` - retained node-level working notes from the discovery process; not included in the public HTML view.
- `sources.md` - source and search notes.
- `node_reassessment.md` - notes on node-level reassessment.

Regenerate the HTML after data or template changes with:

```sh
node generate_html.js
```
