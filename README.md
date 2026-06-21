# Språkbanken Multimodal Resource Survey

This repository contains a first-pass resource survey of multimodal language resources associated with Språkbanken/SWE-CLARIN and adjacent Swedish language-resource infrastructure.

The survey is exploratory rather than exhaustive. It separates confirmed public resource records from reviewed infrastructure nodes where relevant material may exist but was not found as a packaged public dataset in this pass.

## Files

- `index.html` - searchable table view of resources and Språkbanken node coverage.
- `multimodal_swedish_resources.json` - resource records used to generate the page.
- `node_coverage.json` - reviewed Språkbanken/SWE-CLARIN nodes and their survey treatment.
- `sources.md` - source and search notes.
- `node_reassessment.md` - notes on node-level reassessment.

Regenerate the HTML after data or template changes with:

```sh
node generate_html.js
```
