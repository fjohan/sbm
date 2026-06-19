const fs = require("fs");

const resources = JSON.parse(fs.readFileSync("multimodal_swedish_resources.json", "utf8"));

const groupOrder = [
  "Video-Audio Corpora",
  "Audio Corpora",
  "Social Media Corpora"
];

const typeLabels = {
  "Video-Audio Corpora": "Speech, Video, Sign, and Gesture",
  "Audio Corpora": "Text and Audio",
  "Social Media Corpora": "Interaction Logs, Social Media, and Language"
};

const esc = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const link = (url, label = url) => {
  if (!url) return "";
  return `<a href="${esc(url)}">${esc(label)}</a>`;
};

const list = (items) => {
  if (!items || items.length === 0) return '<span class="empty">not found in first pass</span>';
  return items.map((item) => `<span class="chip">${esc(item)}</span>`).join(" ");
};

const access = (accessObject) => {
  const entries = Object.entries(accessObject || {});
  if (entries.length === 0) return '<span class="empty">not found in first pass</span>';
  return entries
    .map(([label, url]) => `<span>${esc(label)}: ${link(url)}</span>`)
    .join("<br>");
};

const evidence = (urls) => {
  if (!urls || urls.length === 0) return "";
  return urls.map((url, index) => link(url, `source ${index + 1}`)).join(" ");
};

const infrastructureClass = (resource) => {
  const infra = `${resource.Infrastructure || ""} ${resource.CountryOrInstitution || ""}`.toLowerCase();
  const classes = [];
  if (infra.includes("språkbanken") || infra.includes("sprakbanken") || infra.includes("swe-clarin") || infra.includes("clarin")) {
    classes.push("tag-highlight");
  }
  if (infra.includes("huminfra")) {
    classes.push("tag-huminfra");
  }
  return classes.join(" ");
};

const grouped = resources.reduce((acc, resource) => {
  const group = resource.Group || "Other";
  if (!acc[group]) acc[group] = [];
  acc[group].push(resource);
  return acc;
}, {});

const orderedGroups = [
  ...groupOrder.filter((group) => grouped[group]),
  ...Object.keys(grouped).filter((group) => !groupOrder.includes(group)).sort()
];

const cards = (items) =>
  items
    .map((resource) => {
      const highlightClass = infrastructureClass(resource);
      const confidence = String(resource.Confidence || "").toLowerCase();
      return `
        <article class="resource">
          <div class="resource-head">
            <h3>${link(resource.URL, resource.Name)}</h3>
            <span class="confidence ${esc(confidence)}">${esc(resource.Confidence || "unknown")} confidence</span>
          </div>
          <p>${esc(resource.Description)}</p>
          <dl>
            <dt>Modalities</dt><dd>${list(resource.Modalities)}</dd>
            <dt>Language</dt><dd>${list(resource.Language)}</dd>
            <dt>Licence</dt><dd>${esc(resource.Licence || "not found in first pass")}</dd>
            <dt>Size</dt><dd>${list(resource.Size)}</dd>
            <dt>Annotation</dt><dd>${list(resource.Annotation)}</dd>
            <dt>Infrastructure</dt><dd><span class="${highlightClass}">${esc(resource.Infrastructure || "not found in first pass")}</span></dd>
            <dt>Access</dt><dd>${access(resource.Access)}</dd>
            <dt>Institution</dt><dd>${esc(resource.CountryOrInstitution || "not found in first pass")}</dd>
            <dt>Evidence</dt><dd>${evidence(resource.EvidenceURLs)}</dd>
            <dt>Notes</dt><dd>${esc(resource.Notes || "")}</dd>
          </dl>
        </article>`;
    })
    .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>First-Pass Survey of Swedish Multimodal Language Resources</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fa;
      --text: #1d2329;
      --muted: #5d6875;
      --line: #d9e0e7;
      --panel: #ffffff;
      --accent: #1f5f8b;
      --accent-soft: #e8f2f8;
      --huminfra: #6f4a8e;
      --clarin: #116a57;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
      color: var(--text);
      background: var(--bg);
    }
    header, main {
      max-width: 1120px;
      margin: 0 auto;
      padding: 28px 20px;
    }
    header {
      padding-top: 44px;
      border-bottom: 1px solid var(--line);
    }
    h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.05;
      letter-spacing: 0;
    }
    h2 {
      margin: 34px 0 14px;
      font-size: 1.35rem;
    }
    h3 {
      margin: 0;
      font-size: 1.05rem;
    }
    p {
      margin: 0 0 12px;
      color: var(--muted);
    }
    a {
      color: var(--accent);
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }
    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }
    .summary span, .chip {
      display: inline-block;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 3px 9px;
      background: var(--panel);
      color: var(--text);
      font-size: 0.86rem;
    }
    .scope {
      margin: 22px 0 30px;
      padding: 16px 18px;
      border-left: 4px solid var(--accent);
      background: var(--accent-soft);
    }
    .resource {
      margin: 14px 0;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
    }
    .resource-head {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 8px;
    }
    .confidence {
      flex: 0 0 auto;
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border: 1px solid var(--line);
    }
    .confidence.high { background: #e7f6ee; color: #145334; }
    .confidence.medium { background: #fff5d7; color: #614800; }
    .confidence.low { background: #fbe6e8; color: #7f1d2d; }
    dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 8px 14px;
      margin: 14px 0 0;
    }
    dt {
      color: var(--muted);
      font-weight: 650;
    }
    dd {
      margin: 0;
      min-width: 0;
    }
    .empty {
      color: var(--muted);
      font-style: italic;
    }
    .tag-highlight {
      color: var(--clarin);
      font-weight: 700;
    }
    .tag-huminfra {
      color: var(--huminfra);
      font-weight: 700;
    }
    footer {
      max-width: 1120px;
      margin: 0 auto;
      padding: 20px;
      color: var(--muted);
      border-top: 1px solid var(--line);
    }
    @media (max-width: 720px) {
      .resource-head { display: block; }
      .confidence { display: inline-block; margin-top: 8px; }
      dl { grid-template-columns: 1fr; }
      dt { margin-top: 8px; }
    }
  </style>
</head>
<body>
  <header>
    <h1>First-Pass Survey of Swedish Multimodal Language Resources</h1>
    <p>Resources that are in Swedish, include Swedish, or are developed/hosted in Sweden, with emphasis on primary datasets and corpus records.</p>
    <div class="summary">
      <span>${resources.length} resources</span>
      <span>${resources.filter((r) => r.Confidence === "high").length} high confidence</span>
      <span>Generated from multimodal_swedish_resources.json</span>
    </div>
  </header>
  <main>
    <section class="scope">
      <h2>Scope and Caveats</h2>
      <p>This is a first-pass survey, not an exhaustive inventory. It prioritizes primary corpus pages, repository records, data cards, and CLARIN-style records. Some Swedish or Sweden-hosted resources may be missing when public metadata was not indexed, had moved, or required interactive login.</p>
      <p>Unknown licence, size, annotation, and access details are left blank or marked as not found rather than inferred. Low-confidence entries should be treated as leads for follow-up verification.</p>
    </section>
    ${orderedGroups
      .map((group) => `
        <section>
          <h2>${esc(typeLabels[group] || group)}</h2>
          ${cards(grouped[group])}
        </section>`)
      .join("\n")}
  </main>
  <footer>
    Highlighting uses available infrastructure metadata: CLARIN/SWE-CLARIN/Sprakbanken connections appear in green; no public HUMINFRA-specific dataset record was verified in this pass.
  </footer>
</body>
</html>
`;

fs.writeFileSync("index.html", html);
