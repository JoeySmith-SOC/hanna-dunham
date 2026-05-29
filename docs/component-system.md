# Component System — Hanna S. Dunham

## Stack

React 18 · Vite 6 · Framer Motion 12 · CSS Modules · JavaScript (no TypeScript)

---

## File Structure

```
src/
├── components/
│   ├── Navigation.jsx / .module.css
│   ├── Hero.jsx / .module.css
│   ├── Profile.jsx / .module.css
│   ├── ExperienceExpertise.jsx / .module.css   ← signature section
│   ├── Education.jsx / .module.css
│   ├── Downloads.jsx / .module.css
│   ├── Contact.jsx / .module.css
│   └── ScrollReveal.jsx
├── data/
│   └── content.js                              ← single source of truth for all copy
├── styles/
│   ├── reset.css
│   ├── variables.css                           ← all design tokens
│   └── global.css
├── App.jsx
└── main.jsx
```

**Deprecated (do not restore):** `Experience.jsx`, `Experience.module.css`, `Competencies.jsx`, `Competencies.module.css`

---

## Component Reference

### Navigation.jsx

Fixed top bar. Transparent at top, blurs to `rgba(9,9,11,0.88)` with `backdrop-filter` on scroll. Monogram `HD` links to `#hero`. Desktop: inline links. Mobile (≤ 768px): hamburger drawer slides in from right.

Nav links: `Profile → #profile`, `Experience → #experience`, `Education → #education`.

### Hero.jsx

Cinematic entrance. Fires on mount, no scroll trigger.

Key elements:
- Multi-layer gradient atmosphere + SVG grain texture
- Mouse-tracking spotlight via CSS custom properties `--mx` / `--my`
- Atmospheric orbs: large blurred divs, slow CSS keyframe drift + Framer parallax
- 4 floating document frames (enterprise contract aesthetic, parallax on scroll)
- Word-by-word name reveal: `overflow: hidden` wrapper + `motion.span y: 115% → 0`
- Self-drawing gold separator: `motion.div scaleX: 0 → 1`
- All supporting text: manual `delay` props on `motion.*` (not stagger containers)

### Profile.jsx

Two-column: prose summary left, glass highlight card right. Card uses `--c-glass` background with a gold `::before` top-edge line. Row hover uses subtle gold tint.

### ExperienceExpertise.jsx — Signature Section

Combined split section. Replaces separate Experience and Competencies sections.

**Left column (57%): Career Timeline**
- 10 entries from `content.js` experience array
- `DETAIL_THRESHOLD = 1` — only AWS (index 0) renders full description
- Others: period + company + role + 3 tags maximum
- Scroll-linked growing line: `useScroll` + `useTransform` on section ref
- Dot markers: absolutely positioned, aligned to 1px line track
- `translateX(3px)` hover on `entryBody`, dot glow + role color shift

**Right column (43%): SVG Capability Network**
- `position: sticky; top: 80px` — stays pinned while timeline scrolls
- `500×500` SVG viewBox in `padding-bottom: 100%` aspect-ratio container
- 5 nodes: hub at `(250, 250)`, 4 satellites at corners (408/92, 95/405)
- Hub: rotating orbit ring (66s), main circle with `eeHubGlow` filter
- Connections: `motion.path pathLength` animation, active connection highlights
- Outer architectural frame (very faint: 0.04–0.055 opacity)
- Active state: inline CSS `transition: fill 340ms ease` on circle elements
- Skills panel: `AnimatePresence mode="wait"` transitions between categories

### ScrollReveal.jsx

Utility wrapper. `motion.div` with `whileInView` + `once: true`. Props: `delay`, `fromY`, `className`, `style`. Handles `useReducedMotion` internally.

### Education.jsx

J.D. (Western Michigan Cooley, Cum Laude) + B.A. Philosophy (Baylor). Renders from `education` array in `content.js`.

### Downloads.jsx

PDF and DOCX resume download links. Files must be placed in `public/documents/` before launch.

### Contact.jsx

Email + LinkedIn links. Footer bar with name + copyright. Placeholder values in `content.js` must be updated before launch.

---

## CSS Modules Conventions

- One `.module.css` per component. No shared component stylesheets.
- Global utilities in `global.css`
- All design values via CSS custom properties — never hardcode hex/px in modules
- Component classes use camelCase: `.entryBody`, `.skillsCategory`
- State variants: `.dotCurrent`, `.roleCurrent`, `.mobileTabActive`
- No BEM. No utility class soup.

---

## Data Layer

`src/data/content.js` exports:

| Export | Shape | Usage |
|--------|-------|-------|
| `meta` | Object | Name, credentials, title, tagline, email, LinkedIn, resume URLs |
| `profile` | Object | Summary paragraph + highlights array |
| `experience` | Array | 10 entries: id, period, company, subcompany, role, location, description, tags[] |
| `competencies` | Array | 5 groups: category, skills[] |
| `education` | Array | 2 entries: degree, abbreviation, institution, year, honors |

**Rule:** Never duplicate or shadow content in JSX. Update `content.js` only.

---

## GitHub Pages Deployment

- Base path: `/hanna-dunham/` baked into `vite.config.js`
- Deploy: `.github/workflows/deploy.yml`
- `public/.nojekyll` disables Jekyll
- Never change `base` without updating all asset paths
