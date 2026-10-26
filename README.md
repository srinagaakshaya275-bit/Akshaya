# The Curiosity Index · Akshaya Reddy

A searchable personal archive. Plain HTML, CSS and vanilla JavaScript, no build step, so GitHub Pages serves it as is.

| File | What it holds |
| --- | --- |
| `data.js` | **Every record**: profile, roles, projects, skills, education, and the form endpoint. Almost all edits happen here. |
| `index.html` | Page shell, SEO tags and the enquiry form |
| `script.js` | Search, filters, record viewer, skill map, history routing, form |
| `styles.css` | Visual identity; colour and type tokens at the top |
| `Akshaya_Resume.pdf` | Linked from the enquiry section |

## How the data drives the site
- **Search** indexes every field of every project, role, skill, the profile and education. `/` focuses the search box.
- **Filters** (project type, skill, year; experience type and year) are built from what is in `data.js`. A filter option only appears if a record uses it.
- **Capability Map**: a skill links to a project only if its id is in that project's `skills` list, and to a responsibility only if it is in that responsibility's `skills` list. Nothing else is inferred, and no proficiency levels exist.
- **Placeholders**: anything in `[square brackets]` shows in italics, and any record still containing one is marked **DRAFT**. Fill it in and the label becomes **FILED**.
- **Routes**: `#/p/CF-001` opens a case file, `#/x/XP-007` an experience record, `#/s/creator` a skill. Back, forward and shared links all work.

## Adding things
- **New project**: copy a project block in `data.js`, give it the next id (`CF-010`), set `layout` to `feature`, `exhibit` or `text`, and tag its `skills`.
- **Screenshots**: save images in an `assets/` folder (WebP or JPEG, about 1600px wide) and list them in the project's `visuals`, e.g. `["assets/aeo-before.jpg"]`. Add a matching line to `visualHints` for the caption. For video, set `video` to a YouTube embed URL.
- **Update the date** in `meta.updated` when you change anything.

## Contact form
1. Create a free form at formspree.io.
2. Paste its endpoint into `meta.formEndpoint` in `data.js`.

Until then the form validates, but says it is not connected. It never reports a message as sent unless the service accepted it.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
GitHub Pages: Settings → Pages → Deploy from a branch → this branch, `/ (root)` → Save.
