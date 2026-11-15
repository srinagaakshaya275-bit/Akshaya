# Akshaya Reddy · Marketing portfolio

A dark, glass-style single-page portfolio. Plain HTML, CSS and vanilla JavaScript with no build step, so GitHub Pages serves it as is.

| File | What it holds |
| --- | --- |
| `data.js` | **All the content**: hero, about, roles, projects, skills, education, form endpoint. Almost every edit happens here. |
| `index.html` | Page shell, SEO tags (title, description, Open Graph, Person JSON-LD) and the contact form |
| `script.js` | Builds each section from `data.js`; project pop-ups, filters, form, scroll effects |
| `icons.js` | Tool logos (simple-icons, CC0) used in the Skills > Tools card |
| `styles.css` | The design. Colours and fonts are tokens at the top (`:root`) |
| `404.html`, `favicon.*`, `apple-touch-icon.png`, `assets/og-image.png` | Not-found page, browser icon, and the 1200x630 link-preview image |
| `Akshaya_Resume.pdf` | Linked from the Resume and Contact sections |

## Sections
Hero · stat strip · skills marquee · About (with How I work) · Experience · Impact (featured results, follower charts, and all projects, each opening a full file) · AI case study · Skills (with tools, education and certifications) · Let's talk.

## Editing content
- **Portrait**: replace `assets/portrait.jpg` (square, about 560px) or set `portrait.src` to `""` to hide it.
- **Placeholders**: anything in `[square brackets]` shows in yellow italics on the site. Replace it in `data.js` and it turns into normal text.
- **Numbers** in the hero card and stat strip: `highlights` and `hero` in `data.js`. The follower bars and charts read the `growth` list in `data.js`.
- **New project**: copy a block in `projects`, give it the next id (`CF-010`) and a `type`. It appears in Work automatically. To feature it in Impact, add its id to `impact`.
- **Screenshots**: save images in an `assets/` folder and tell me, or list them in the project's `visuals`.
- **Tools**: in `tools`, use `brand` (a logo from `icons.js`) or `glyph` (a generic icon). **Certificates**: make a coursework item `{ name: "...", url: "https://..." }` and it becomes a link.
- **Update the date** in `meta.updated` when you change anything.

## Contact
Paste your Google Form link into `meta.googleForm` in `data.js` and a "Fill the form" button appears beside "Email me". Leave it empty to show email only.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Repo → Settings → Pages → Build and deployment → Source: **Deploy from a branch** → pick the branch (`main` once merged) and `/ (root)` → Save. The site appears at `https://<username>.github.io/<repo>/` after a minute. Every commit to that branch redeploys it.

## Security and analytics
`index.html` has a Content-Security-Policy that only allows this site's own files, Google Fonts, and Google Analytics/Tag Manager. If you add another service (a different analytics tool, an embed), its address must be added to that policy or the browser will block it. Search Console verification by HTML meta tag needs no change.
