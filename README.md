# Akshaya Reddy · Marketing Portfolio

A one-page portfolio styled like a music app: a navy sidebar and player bar around an ivory editorial page. Ivory, Deep Atlas Navy and Antique Gold, with Playfair Display headings and DM Sans body text. Plain HTML, CSS and JavaScript, no build step.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Editing (all content is in `index.html`)
- Numbers inside `class="countup"` animate automatically (e.g. `2.5M`, `3,600+`, `9.15`).
- **Follower chart:** edit `data-labels`, `data-points` and `data-suffix` on the `.chart` element.
- **Projects:** each card's `data-cat` decides its filter (`campaigns`, `growth`, `brand`, `social`, `content`, `creator`, `offline`).
- **Player bar:** every section with a `data-track` name becomes a "track". Prev/next jump between them and play scrolls through them on its own.
- **Resume:** replace `resume.pdf`; the resume buttons appear automatically when the file exists.
- **Sizes, corners, colours:** all set as tokens at the top of `styles.css`.

## Deploy with GitHub Pages
Settings → Pages → *Deploy from a branch* → pick the branch and `/ (root)`.
