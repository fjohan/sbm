const fs = require("fs");

const resources = JSON.parse(fs.readFileSync("multimodal_swedish_resources.json", "utf8"));
const nodeCoverage = fs.existsSync("node_coverage.json")
  ? JSON.parse(fs.readFileSync("node_coverage.json", "utf8"))
  : [];

const esc = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const jsonForHtml = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

const unique = (items) =>
  [...new Set(items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

const countBy = (items, selector) =>
  items.reduce((acc, item) => {
    const keys = selector(item);
    const values = Array.isArray(keys) ? keys : [keys];
    values.filter(Boolean).forEach((key) => {
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

const groupCounts = countBy(resources, (resource) => resource.Group || "Other");
const confidenceCounts = countBy(resources, (resource) => resource.Confidence || "unknown");
const languageCounts = countBy(resources, (resource) => resource.Language || []);
const nodeStatusCounts = countBy(nodeCoverage, (node) => node.Status || "unknown");

const groups = unique(resources.map((resource) => resource.Group || "Other"));
const languages = unique(resources.flatMap((resource) => resource.Language || []));
const confidence = unique(resources.map((resource) => resource.Confidence || "unknown"));
const accessTypes = unique(resources.flatMap((resource) => Object.keys(resource.Access || {})));
const nodes = unique(nodeCoverage.map((node) => node.Node));
const nodeStatuses = unique(nodeCoverage.map((node) => node.Status || "unknown"));

const optionTags = (items) => items.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("");

const countList = (counts) =>
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => `<li><span>${esc(label)}</span><strong>${count}</strong></li>`)
    .join("");

const highConfidence = resources.filter((resource) => String(resource.Confidence).toLowerCase() === "high").length;
const swedishRecords = resources.filter((resource) => (resource.Language || []).includes("swe")).length;
const directDownloads = resources.filter((resource) => Object.keys(resource.Access || {}).includes("Download")).length;
const confirmedNodes = nodeCoverage.filter((node) => String(node.Status).toLowerCase().includes("confirmed")).length;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>First-Pass Survey of Swedish Multimodal Language Resources</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f8f8;
      --panel: #ffffff;
      --header: #eef4f4;
      --header-strong: #18353d;
      --text: #1f2a30;
      --muted: #5a6970;
      --line: #ccd8d9;
      --line-soft: #e5ecec;
      --accent: #1f6f82;
      --accent-soft: #e6f1f3;
      --warning: #fff4cf;
      --high: #dff3e8;
      --medium: #fff1c9;
      --low: #f7dfe1;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 1.45;
      color: var(--text);
      background: var(--bg);
    }

    a {
      color: var(--accent);
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }

    header {
      background: var(--header);
      border-bottom: 1px solid var(--line);
    }

    .masthead {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: start;
      gap: 24px;
    }

    .site-logo {
      width: min(260px, 28vw);
      max-height: 96px;
      object-fit: contain;
    }

    .wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 20px;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 8px;
      color: var(--header-strong);
      font-size: clamp(1.9rem, 4vw, 3rem);
      line-height: 1.08;
      letter-spacing: 0;
    }

    h2 {
      margin: 0 0 12px;
      color: var(--header-strong);
      font-size: 1.28rem;
      line-height: 1.2;
    }

    h3 {
      margin: 0 0 8px;
      color: var(--header-strong);
      font-size: 1rem;
    }

    p {
      margin: 0 0 12px;
      color: var(--muted);
    }

    .lead {
      max-width: 980px;
      font-size: 1.02rem;
    }

    .notice {
      margin-top: 18px;
      padding: 12px 14px;
      border: 1px solid #d7c37d;
      border-radius: 4px;
      background: var(--warning);
      color: #4d421b;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 6px 11px;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--panel);
      color: var(--header-strong);
      font-weight: 600;
      text-decoration: none;
    }

    main.wrap {
      display: grid;
      gap: 22px;
    }

    section {
      min-width: 0;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }

    .stat {
      padding: 14px;
      border: 1px solid var(--line-soft);
      border-radius: 5px;
      background: var(--panel);
    }

    .stat strong {
      display: block;
      margin-bottom: 2px;
      color: var(--header-strong);
      font-size: 1.75rem;
      line-height: 1;
    }

    .stat span {
      color: var(--muted);
      font-size: 0.88rem;
    }

    .breakdowns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 12px;
    }

    .panel {
      padding: 14px;
      border: 1px solid var(--line-soft);
      border-radius: 5px;
      background: var(--panel);
    }

    .count-list {
      display: grid;
      gap: 5px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .count-list li {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 14px;
      border-bottom: 1px solid var(--line-soft);
      padding-bottom: 5px;
      color: var(--muted);
    }

    .count-list li:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .count-list strong {
      color: var(--header-strong);
    }

    .filters {
      display: grid;
      grid-template-columns: minmax(240px, 2fr) repeat(5, minmax(145px, 1fr));
      gap: 10px;
      padding: 14px;
      border: 1px solid var(--line);
      border-radius: 5px;
      background: var(--accent-soft);
    }

    .filters.compact {
      grid-template-columns: minmax(240px, 2fr) repeat(2, minmax(160px, 1fr));
    }

    label {
      display: grid;
      gap: 4px;
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    input,
    select {
      width: 100%;
      min-height: 36px;
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 7px 9px;
      background: var(--panel);
      color: var(--text);
      font: inherit;
      letter-spacing: 0;
      text-transform: none;
    }

    .result-line {
      margin: 10px 0 8px;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: 5px;
      background: var(--panel);
    }

    table {
      width: 100%;
      min-width: 1180px;
      border-collapse: collapse;
      font-size: 0.88rem;
    }

    .nodes-table {
      min-width: 980px;
    }

    th,
    td {
      vertical-align: top;
      border-bottom: 1px solid var(--line-soft);
      padding: 9px 10px;
      text-align: left;
    }

    th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--header);
      color: var(--header-strong);
      font-size: 0.76rem;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    th button {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border: 0;
      padding: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 700;
      letter-spacing: inherit;
      text-transform: inherit;
      cursor: pointer;
    }

    th button::after {
      content: "↕";
      color: var(--muted);
      font-size: 0.72rem;
    }

    th button[data-sort-direction="ascending"]::after {
      content: "↑";
      color: var(--accent);
    }

    th button[data-sort-direction="descending"]::after {
      content: "↓";
      color: var(--accent);
    }

    tbody tr:hover {
      background: #f3f8f8;
    }

    td strong {
      color: var(--header-strong);
    }

    .name-cell {
      min-width: 230px;
    }

    .wide-cell {
      min-width: 250px;
    }

    .tiny-cell {
      width: 1%;
      white-space: nowrap;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      min-height: 22px;
      padding: 2px 7px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #f8fbfb;
      color: var(--text);
      font-size: 0.78rem;
      line-height: 1.2;
    }

    .chip.high,
    .chip.confirmed,
    .chip.confirmed-resources {
      background: var(--high);
      border-color: #b8dec9;
      color: #1e5937;
    }

    .chip.medium,
    .chip.reviewed,
    .chip.reviewed-lead {
      background: var(--medium);
      border-color: #e6d08b;
      color: #69510d;
    }

    .chip.low {
      background: var(--low);
      border-color: #e0b9bd;
      color: #743339;
    }

    .muted,
    .empty {
      color: var(--muted);
    }

    .source-links {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    details {
      border: 1px solid var(--line-soft);
      border-radius: 5px;
      background: var(--panel);
    }

    summary {
      cursor: pointer;
      padding: 12px 14px;
      color: var(--header-strong);
      font-weight: 700;
    }

    .details-body {
      padding: 0 14px 14px;
    }

    @media (max-width: 920px) {
      .filters,
      .filters.compact {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .wrap {
        padding: 18px 12px;
      }

      .masthead {
        grid-template-columns: 1fr;
      }

      .site-logo {
        grid-row: 1;
        width: min(220px, 70vw);
      }

      .filters,
      .filters.compact {
        grid-template-columns: 1fr;
      }

      table {
        font-size: 0.82rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="masthead">
        <div>
          <p class="eyebrow">Swedish multimodal language resources</p>
          <h1>First-pass survey with Språkbanken node coverage</h1>
          <p class="lead">A searchable, table-first inventory of public or publicly described Swedish and Sweden-hosted multimodal language resources. The node layer keeps reviewed Språkbanken/SWE-CLARIN institutions visible even when no packaged public dataset was confirmed.</p>
          <div class="notice">This page is generated with AI assistance. The data is a discovery pass, not a completeness claim. Several nodes expose infrastructure, archive interfaces, or internal collections that may not resolve to shareable public datasets.</div>
          <div class="actions">
            <a class="button" href="multimodal_swedish_resources.json">Download resource JSON</a>
            <a class="button" href="node_coverage.json">Download node coverage JSON</a>
            <a class="button" href="sources.md">Source notes</a>
            <a class="button" href="node_reassessment.md">Node reassessment</a>
          </div>
        </div>
        <img class="site-logo" src="sprakbanken_clarin_logo.png" alt="Språkbanken CLARIN">
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="stats" aria-label="Summary statistics">
      <div class="stat"><strong>${resources.length}</strong><span>resource records</span></div>
      <div class="stat"><strong>${nodeCoverage.length}</strong><span>Språkbanken nodes reviewed</span></div>
      <div class="stat"><strong>${confirmedNodes}</strong><span>nodes with confirmed resources</span></div>
      <div class="stat"><strong>${highConfidence}</strong><span>high-confidence records</span></div>
      <div class="stat"><strong>${swedishRecords}</strong><span>records tagged swe</span></div>
      <div class="stat"><strong>${directDownloads}</strong><span>records with download access</span></div>
    </section>

    <section class="breakdowns" aria-label="Breakdowns">
      <div class="panel">
        <h2>By Resource Group</h2>
        <ul class="count-list">${countList(groupCounts)}</ul>
      </div>
      <div class="panel">
        <h2>By Confidence</h2>
        <ul class="count-list">${countList(confidenceCounts)}</ul>
      </div>
      <div class="panel">
        <h2>By Language Code</h2>
        <ul class="count-list">${countList(languageCounts)}</ul>
      </div>
      <div class="panel">
        <h2>By Node Status</h2>
        <ul class="count-list">${countList(nodeStatusCounts)}</ul>
      </div>
    </section>

    <section aria-labelledby="resources-heading">
      <h2 id="resources-heading">Resource Table</h2>
      <div class="filters" aria-label="Resource filters">
        <label>Search
          <input id="resourceSearch" type="search" placeholder="Name, institution, modality, note, source">
        </label>
        <label>Group
          <select id="groupFilter">
            <option value="">All groups</option>
            ${optionTags(groups)}
          </select>
        </label>
        <label>Node
          <select id="nodeFilter">
            <option value="">All nodes</option>
            ${optionTags(nodes)}
          </select>
        </label>
        <label>Language
          <select id="languageFilter">
            <option value="">All languages</option>
            ${optionTags(languages)}
          </select>
        </label>
        <label>Confidence
          <select id="confidenceFilter">
            <option value="">All confidence</option>
            ${optionTags(confidence)}
          </select>
        </label>
        <label>Access
          <select id="accessFilter">
            <option value="">All access</option>
            ${optionTags(accessTypes)}
          </select>
        </label>
      </div>
      <p class="result-line" id="resourceCount"></p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th><button type="button" data-resource-sort="Name">Name</button></th>
              <th><button type="button" data-resource-sort="Group">Group</button></th>
              <th><button type="button" data-resource-sort="Modalities">Modalities</button></th>
              <th><button type="button" data-resource-sort="Language">Languages</button></th>
              <th><button type="button" data-resource-sort="Infrastructure">Infrastructure / Institution</button></th>
              <th><button type="button" data-resource-sort="Access">Access</button></th>
              <th><button type="button" data-resource-sort="Licence">Licence / Size</button></th>
              <th><button type="button" data-resource-sort="Annotation">Annotation</button></th>
              <th><button type="button" data-resource-sort="Confidence">Confidence</button></th>
              <th><button type="button" data-resource-sort="Notes">Sources / Notes</button></th>
            </tr>
          </thead>
          <tbody id="resourceRows"></tbody>
        </table>
      </div>
    </section>

    <section aria-labelledby="nodes-heading">
      <h2 id="nodes-heading">Språkbanken Node Layer</h2>
      <p>The node layer separates infrastructure leads from confirmed datasets. It includes Gothenburg, KTH, Isof, Uppsala, GRIDH, Lund, Umeå, Stockholm, KB/KBLab, Linköping and Riksarkivet.</p>
      <div class="filters compact" aria-label="Node filters">
        <label>Search Nodes
          <input id="nodeSearch" type="search" placeholder="Node, role, resource, note">
        </label>
        <label>Status
          <select id="nodeStatusFilter">
            <option value="">All statuses</option>
            ${optionTags(nodeStatuses)}
          </select>
        </label>
        <label>Treatment
          <select id="nodeTreatmentFilter">
            <option value="">All treatments</option>
            ${optionTags(unique(nodeCoverage.map((node) => node.SurveyTreatment)))}
          </select>
        </label>
      </div>
      <p class="result-line" id="nodeCount"></p>
      <div class="table-wrap">
        <table class="nodes-table">
          <thead>
            <tr>
              <th>Node</th>
              <th>Role</th>
              <th>Status</th>
              <th>Treatment</th>
              <th>Related Resources</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody id="nodeRows"></tbody>
        </table>
      </div>
    </section>

    <details>
      <summary>Scope and Caveats</summary>
      <div class="details-body">
        <p>The survey favors public evidence: dataset pages, CLARIN/SWE-CLARIN node pages, repository records, archive interfaces and source notes. Hosted-in-Sweden resources are retained when they are relevant infrastructure leads, but non-Swedish language-documentation collections are not expanded into the main resource list unless Swedish content is verified.</p>
        <p>Some institutions likely hold more internal or restricted multimodal data than can be represented here. Sensitive speech, archival and personal-data collections may be described by infrastructure pages without a downloadable corpus record.</p>
      </div>
    </details>
  </main>

  <script id="resource-data" type="application/json">${jsonForHtml(resources)}</script>
  <script id="node-data" type="application/json">${jsonForHtml(nodeCoverage)}</script>
  <script>
    const resources = JSON.parse(document.getElementById("resource-data").textContent);
    const nodes = JSON.parse(document.getElementById("node-data").textContent);
    const resourceSort = { field: "Name", direction: "ascending" };

    const byId = (id) => document.getElementById(id);
    const text = (value) => String(value || "").toLowerCase();
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

    const chipClass = (value) => text(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    function chips(items) {
      if (!items || items.length === 0) return '<span class="empty">not found</span>';
      return '<span class="chips">' + items.map((item) => '<span class="chip">' + escapeHtml(item) + '</span>').join("") + '</span>';
    }

    function accessLinks(access) {
      const entries = Object.entries(access || {});
      if (entries.length === 0) return '<span class="empty">not found</span>';
      return entries.map(([label, url]) => '<a href="' + escapeHtml(url) + '">' + escapeHtml(label) + '</a>').join("<br>");
    }

    function sourceLinks(urls) {
      if (!urls || urls.length === 0) return "";
      return '<span class="source-links">' + urls.map((url, index) => '<a href="' + escapeHtml(url) + '">source ' + (index + 1) + '</a>').join("") + '</span>';
    }

    function resourceSearchText(resource) {
      return text(JSON.stringify(resource));
    }

    function sortText(value) {
      if (Array.isArray(value)) return value.join(" ");
      if (value && typeof value === "object") return Object.keys(value).join(" ") + " " + Object.values(value).join(" ");
      return String(value || "");
    }

    function resourceSortValue(resource, field) {
      if (field === "Infrastructure") {
        return sortText([resource.Infrastructure, resource.CountryOrInstitution]);
      }
      if (field === "Access") {
        return sortText(resource.Access || {});
      }
      if (field === "Licence") {
        return sortText([resource.Licence, resource.Size]);
      }
      if (field === "Notes") {
        return sortText([resource.EvidenceURLs, resource.Notes]);
      }
      return sortText(resource[field]);
    }

    function updateResourceSortButtons() {
      document.querySelectorAll("[data-resource-sort]").forEach((button) => {
        button.dataset.sortDirection = button.dataset.resourceSort === resourceSort.field ? resourceSort.direction : "none";
        button.setAttribute("aria-label", button.textContent + ", sort " + button.dataset.sortDirection);
      });
    }

    function nodeMatchesResource(node, resource) {
      if ((node.RelatedResources || []).includes(resource.Name)) return true;
      const haystack = resourceSearchText(resource);
      const nodeName = text(node.Node);
      const simpleName = nodeName
        .replace("språkbanken", "")
        .replace("sprakbanken", "")
        .replace("university of", "")
        .replace("institutionen för", "")
        .trim();
      return haystack.includes(nodeName) || (simpleName.length > 3 && haystack.includes(simpleName));
    }

    function matchesResource(resource) {
      const query = text(byId("resourceSearch").value).trim();
      const group = byId("groupFilter").value;
      const node = byId("nodeFilter").value;
      const language = byId("languageFilter").value;
      const confidence = byId("confidenceFilter").value;
      const access = byId("accessFilter").value;

      if (query && !resourceSearchText(resource).includes(query)) return false;
      if (group && resource.Group !== group) return false;
      if (language && !(resource.Language || []).includes(language)) return false;
      if (confidence && resource.Confidence !== confidence) return false;
      if (access && !Object.keys(resource.Access || {}).includes(access)) return false;
      if (node) {
        const selectedNode = nodes.find((item) => item.Node === node);
        if (!selectedNode || !nodeMatchesResource(selectedNode, resource)) return false;
      }
      return true;
    }

    function renderResources() {
      const shown = resources.filter(matchesResource).sort((a, b) => {
        const direction = resourceSort.direction === "ascending" ? 1 : -1;
        const primary = resourceSortValue(a, resourceSort.field).localeCompare(
          resourceSortValue(b, resourceSort.field),
          undefined,
          { sensitivity: "base", numeric: true }
        );
        if (primary !== 0) return primary * direction;
        return resourceSortValue(a, "Name").localeCompare(resourceSortValue(b, "Name"), undefined, {
          sensitivity: "base",
          numeric: true
        });
      });
      updateResourceSortButtons();
      byId("resourceCount").textContent = shown.length + " of " + resources.length + " resource records shown";
      byId("resourceRows").innerHTML = shown.map((resource) => {
        const name = '<strong><a href="' + escapeHtml(resource.URL || "#") + '">' + escapeHtml(resource.Name) + '</a></strong><br><span class="muted">' + escapeHtml(resource.Description || "") + '</span>';
        const infra = escapeHtml(resource.Infrastructure || "not found") + '<br><span class="muted">' + escapeHtml(resource.CountryOrInstitution || "") + '</span>';
        const licenceSize = escapeHtml(resource.Licence || "not found") + '<br>' + chips(resource.Size || []);
        const confidence = '<span class="chip ' + chipClass(resource.Confidence) + '">' + escapeHtml(resource.Confidence || "unknown") + '</span>';
        const notes = sourceLinks(resource.EvidenceURLs || []) + '<br><span class="muted">' + escapeHtml(resource.Notes || "") + '</span>';
        return '<tr>' +
          '<td class="name-cell">' + name + '</td>' +
          '<td>' + escapeHtml(resource.Group || "Other") + '</td>' +
          '<td>' + chips(resource.Modalities || []) + '</td>' +
          '<td class="tiny-cell">' + chips(resource.Language || []) + '</td>' +
          '<td class="wide-cell">' + infra + '</td>' +
          '<td>' + accessLinks(resource.Access || {}) + '</td>' +
          '<td>' + licenceSize + '</td>' +
          '<td>' + chips(resource.Annotation || []) + '</td>' +
          '<td class="tiny-cell">' + confidence + '</td>' +
          '<td class="wide-cell">' + notes + '</td>' +
          '</tr>';
      }).join("");
    }

    function matchesNode(node) {
      const query = text(byId("nodeSearch").value).trim();
      const status = byId("nodeStatusFilter").value;
      const treatment = byId("nodeTreatmentFilter").value;
      if (query && !text(JSON.stringify(node)).includes(query)) return false;
      if (status && node.Status !== status) return false;
      if (treatment && node.SurveyTreatment !== treatment) return false;
      return true;
    }

    function renderNodes() {
      const shown = nodes.filter(matchesNode);
      byId("nodeCount").textContent = shown.length + " of " + nodes.length + " Språkbanken nodes shown";
      byId("nodeRows").innerHTML = shown.map((node) => {
        const status = '<span class="chip ' + chipClass(node.Status) + '">' + escapeHtml(node.Status || "unknown") + '</span>';
        return '<tr>' +
          '<td class="name-cell"><strong><a href="' + escapeHtml(node.URL || "#") + '">' + escapeHtml(node.Node) + '</a></strong></td>' +
          '<td>' + escapeHtml(node.Role || "") + '</td>' +
          '<td class="tiny-cell">' + status + '</td>' +
          '<td>' + escapeHtml(node.SurveyTreatment || "") + '</td>' +
          '<td>' + chips(node.RelatedResources || []) + '</td>' +
          '<td class="wide-cell">' + escapeHtml(node.Notes || "") + '</td>' +
          '</tr>';
      }).join("");
    }

    ["resourceSearch", "groupFilter", "nodeFilter", "languageFilter", "confidenceFilter", "accessFilter"].forEach((id) => {
      byId(id).addEventListener("input", renderResources);
      byId(id).addEventListener("change", renderResources);
    });

    document.querySelectorAll("[data-resource-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const field = button.dataset.resourceSort;
        if (resourceSort.field === field) {
          resourceSort.direction = resourceSort.direction === "ascending" ? "descending" : "ascending";
        } else {
          resourceSort.field = field;
          resourceSort.direction = "ascending";
        }
        renderResources();
      });
    });

    ["nodeSearch", "nodeStatusFilter", "nodeTreatmentFilter"].forEach((id) => {
      byId(id).addEventListener("input", renderNodes);
      byId(id).addEventListener("change", renderNodes);
    });

    renderResources();
    renderNodes();
  </script>
</body>
</html>`;

fs.writeFileSync("index.html", html + "\n");
