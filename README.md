# Akshaya — Marketing Portfolio

A glossy, animated, dark-themed portfolio for a marketing professional. Plain HTML, CSS and JavaScript — no build step, no libraries.

## Sections
Hero · About · Experience (full-time + internship) · Impact (expandable campaigns with chart) · Featured case study · Selected work (filterable) · Skills & tools · Process · Education · Highlights · Contact

## Effects
- Drifting glow orbs, grid and grain background
- Glass cards with a glossy sheen and a cursor-following light rim
- Shimmering gradient headline, shine sweep on buttons
- Floating 3D campaign dashboard in the hero, 3D tilt on project cards
- Scroll-reveal with blur, scroll progress bar, scrolling skills marquee
- Numbers count up when they come into view
- Animated line chart with hover tooltips
- Respects "reduce motion" settings

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Fill in your details (all in `index.html`)
- Replace every `[bracketed]` placeholder with your own text.
- Replace `XX`, `XXK+`, `XX%` with real numbers (e.g. `250K+`, `12%`). Real numbers automatically get the count-up animation.
- **Chart:** edit `data-labels` and `data-points` on the `.chart` element (the current values are sample data).
- **Projects:** each card's `data-cat` decides which filter it appears under (`campaigns`, `social`, `creator`, `content`, `brand`, `growth`).
- **Links:** update the LinkedIn and Instagram URLs in the Contact section.
- **Colours:** change `--accent`, `--accent-2` and `--accent-3` at the top of `styles.css`.

## Deploy with GitHub Pages
Settings → Pages → *Deploy from a branch* → pick the branch and `/ (root)`.
