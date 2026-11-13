# Akshaya Reddy · Marketing portfolio

A dark, glass-style single-page portfolio. Plain HTML, CSS and vanilla JavaScript with no build step, so GitHub Pages serves it as is.

| File | What it holds |
| --- | --- |
| `data.js` | **All the content**: hero, about, roles, projects, skills, education, form endpoint. Almost every edit happens here. |
| `index.html` | Page shell, SEO tags (title, description, Open Graph, Person JSON-LD) and the contact form |
| `script.js` | Builds each section from `data.js`; project pop-ups, filters, form, scroll effects |
| `styles.css` | The design. Colours and fonts are tokens at the top (`:root`) |
| `Akshaya_Resume.pdf` | Linked from the Resume and Contact sections |

## Sections
Hero · stat strip · skills marquee · About · Experience (Masai timeline + internships) · Impact · Case study · Work (filterable, each opens a full file) · Skills · Resume & education · Contact.

## Editing content
- **Placeholders**: anything in `[square brackets]` shows in yellow italics on the site. Replace it in `data.js` and it turns into normal text.
- **Numbers** in the hero card and stat strip: `highlights` and `hero` in `data.js`. The follower bars use the Instagram and LinkedIn figures in the `growth` list at the top of the hero code in `script.js`.
- **New project**: copy a block in `projects`, give it the next id (`CF-010`) and a `type`. It appears in Work automatically. To feature it in Impact, add its id to `impact`.
- **Screenshots**: save images in an `assets/` folder and tell me, or list them in the project's `visuals`.
- **Update the date** in `meta.updated` when you change anything.

## Contact form
1. Create a free form at formspree.io.
2. Paste its endpoint into `meta.formEndpoint` in `data.js`.

Until then the form validates but says it is not connected. It never says "sent" unless the service accepted the message.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Repo → Settings → Pages → Build and deployment → Source: **Deploy from a branch** → pick the branch (`main` once merged) and `/ (root)` → Save. The site appears at `https://<username>.github.io/<repo>/` after a minute. Every commit to that branch redeploys it.
