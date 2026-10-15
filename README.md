# Akshaya Reddy · Issue No. 01

A one-page portfolio styled as a print-magazine cover story. Plain HTML, CSS and a little vanilla JS, no frameworks or build step, ready for GitHub Pages.

- `index.html`: all content
- `styles.css`: design tokens (colours, fonts, radius) at the top, mobile-first
- `script.js`: scroll fade-ins and contact form validation and sending
- `Akshaya_Resume.pdf`: the resume behind the "Download resume" button

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Things to fill in
Search `index.html` for `[` to find every placeholder.

- **Contact form:** create a free form at formspree.io and replace `[your-form-id]` in the form's `action`.
- **Portrait:** replace the `.portrait` block with `<img src="portrait.jpg" alt="Akshaya Reddy">` and keep the class for the rounded frame.
- **Resume:** replace `Akshaya_Resume.pdf`, keeping the same file name.

## Deploy with GitHub Pages
Settings → Pages → *Deploy from a branch* → pick the branch and `/ (root)` → Save.
