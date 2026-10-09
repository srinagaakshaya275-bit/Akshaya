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

## Editing (all content is in `index.html`)
- Numbers inside `class="countup"` animate automatically (e.g. `2.5M`, `3,600+`, `9.15`).
- **Follower chart:** edit `data-labels`, `data-points` and `data-suffix` on the `.chart` element.
- **Projects:** each card's `data-cat` decides its filter (`campaigns`, `growth`, `brand`, `social`, `content`, `creator`, `offline`).
- **Fonts:** headings use Gramatika and body uses TT Norms, falling back to Space Grotesk and Inter. Once you have web licenses, add the `.woff2` files to a `fonts/` folder and uncomment the `@font-face` block at the top of `styles.css`.
- **Sizes, corners, colours:** all set as tokens at the top of `styles.css`.

## Deploy with GitHub Pages
Settings → Pages → *Deploy from a branch* → pick the branch and `/ (root)`.
