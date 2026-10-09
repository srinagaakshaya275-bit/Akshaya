# Akshaya — Portfolio

A responsive personal portfolio website built with plain HTML, CSS and JavaScript (no build step).

## Features
- Sections: Hero, About, Skills, Projects, Experience & Education, Contact
- Light / dark mode (follows system preference, remembers your choice)
- Mobile-friendly navigation and layout
- Scroll-reveal animations (respects reduced-motion settings)
- Contact form that opens the visitor's email client

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customise
All content is in `index.html`:
- **Name, role and intro** — the `hero` section
- **Profile photo** — add `assets/profile.jpg` and replace the `<span>A</span>` inside `.avatar` with `<img src="assets/profile.jpg" alt="Akshaya">`
- **Skills, projects, experience** — edit or duplicate the cards / list items
- **Social links** — update the LinkedIn URL in the `socials` list
- **Colours** — change `--accent` and `--accent-2` at the top of `styles.css`

## Deploy with GitHub Pages
1. Go to the repository's **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**, select the branch and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.
