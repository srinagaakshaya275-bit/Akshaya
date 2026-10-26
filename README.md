# The Glasshouse · Akshaya Reddy

A portfolio you walk through: a midnight building made of glass, one room per chapter.
Plain HTML, CSS and vanilla JS with no build step, so GitHub Pages serves it as is.

| File | What it holds |
| --- | --- |
| `index.html` | Entrance, Welcome Room, Structure (skills), Foundation (education), Exit (contact) |
| `data.js` | **Experience roles, projects and case studies, and the contact-form endpoint.** Most edits happen here. |
| `styles.css` | The architecture: colours and type tokens at the top |
| `script.js` | Corridor doors, display cases, case-study rooms, pointer light, form |
| `Akshaya_Resume.pdf` | Linked from the Exit |

## Editing
- Anything in `[square brackets]` is a placeholder and shows on the site in italics until replaced.
- **Screenshots and photos:** put files in an `assets/` folder and list them in a project's `visuals`, e.g. `visuals: ["assets/aeo-before.jpg", "assets/aeo-after.jpg"]`.
- **Video:** set a project's `video` to a YouTube embed URL (`https://www.youtube.com/embed/...`).
- **Direct links:** every project opens from `#case-<id>`, e.g. `…/Akshaya/#case-ai-sentiment`.

## Contact form
Create a free form at formspree.io and paste its endpoint into `formEndpoint` in `data.js`.
Until then the form validates but says it is not connected, and it never pretends to send.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
GitHub Pages: Settings → Pages → Deploy from a branch → this branch, `/ (root)`.
