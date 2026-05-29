# CLAUDE.md — Hanna S. Dunham Executive Microsite

## What this project is

A premium one-page executive digital identity microsite.

**This is not a resume website.**

It is a carefully crafted executive presence — designed to communicate trust, intelligence, precision, and authority in the 30 seconds a senior hiring manager, AWS director, legal executive, or finance leader spends scanning it.

---

## Client

**Hanna S. Dunham, J.D.**

**Primary positioning:** Enterprise Contract Governance & Infrastructure Portfolio Analyst

**Background:** Amazon Web Services · Commercial Lease & Contract Governance · Infrastructure Portfolio Management · Vendor Financial Compliance · Legal Research · Swedish Translation · Juris Doctor, Cum Laude

---

## Design Style

**Register:** Modern Enterprise Editorial

**Analogues:** Linear's documentation site + Bloomberg Terminal's information density + Apple's product restraint + high-end strategy consulting firm identity (McKinsey, BCG digital)

**Color system:** Dark graphite base (`#09090B`), warm gold accent (`#D4A843`), platinum text. All tokens in `src/styles/variables.css`.

**Typography:** Playfair Display (editorial authority, headings) + Inter (information clarity, body/labels). Never swap these. Never use gradient text.

---

## Motion Style

**Philosophy:** Quiet Confidence

Every animation should feel inevitable, not performative. The content was always going to arrive exactly this way.

- Use: subtle fade-ups, staggered reveals, scroll-linked line draws, pathLength SVG animations, atmospheric drift
- Avoid: bouncing, spinning, neon glow, startup-style pop, excessive simultaneous motion, anything that reads as "gamified"
- Always respect `prefers-reduced-motion` via `useReducedMotion()` from Framer Motion

---

## Architecture

**Stack:** React 18 · Vite 6 · Framer Motion 12 · CSS Modules · JavaScript (not TypeScript)

**Content source of truth:** `src/data/content.js` — all copy, experience data, competencies. Never hardcode content in JSX.

**Design tokens:** `src/styles/variables.css` — all colors, spacing, typography, easing, radius values

**Deployment:** GitHub Pages via GitHub Actions · base path `/hanna-dunham/` baked into Vite config

---

## Page Sections (in order)

| Section | Component | ID | Notes |
|---------|-----------|-----|-------|
| Navigation | `Navigation.jsx` | — | Fixed top, blurs on scroll |
| Hero | `Hero.jsx` | `#hero` | Cinematic centerpiece — word mask reveal, atmospheric orbs, floating doc frames |
| Profile | `Profile.jsx` | `#profile` | Executive summary + highlight card |
| Experience & Expertise | `ExperienceExpertise.jsx` | `#experience` | Combined split section — timeline left, capability network right (sticky) |
| Education | `Education.jsx` | `#education` | J.D. + B.A. credentials |
| Downloads | `Downloads.jsx` | — | Resume PDF/DOCX download |
| Contact | `Contact.jsx` | `#contact` | Email + LinkedIn |

**Note:** `Experience.jsx`, `Experience.module.css`, `Competencies.jsx`, `Competencies.module.css` are superseded by `ExperienceExpertise.jsx`. Do not restore them.

---

## ExperienceExpertise — Architecture Notes

The signature section of the site. Desktop layout:

- **Left (57%):** Condensed career timeline. 10 entries. Only the AWS entry (current role) receives full description. All others show role + company + period + 3 tags condensed. Animated vertical line via `useScroll` + `useTransform`. Dot markers. `translateX(3px)` hover shift.

- **Right (43%, sticky):** SVG capability network (`500×500` viewBox). Hub node = Enterprise Governance at center. Four satellite nodes connected via `motion.path pathLength` animation. Outer architectural frame (very faint). Rotating orbit ring on hub. `position: sticky; top: 80px` — stays pinned while timeline scrolls. Skills panel below SVG with `AnimatePresence` transitions.

Mobile (≤ 768px): single column, sticky disabled. Small mobile (≤ 580px): timeline dot/line hidden.

---

## Rules for AI Agents

### DO
- Use `src/data/content.js` as the only source for copy and structured data
- Use CSS custom properties from `variables.css` for all design values
- Keep animations subtle, performance-safe, and reduced-motion-compliant
- Use Framer Motion for entrance animations and `scrollY` transforms
- Use CSS transitions for hover states (not Framer Motion)
- Write semantic HTML with ARIA labels on interactive SVG elements
- Use CSS Modules for all component styles

### DO NOT
- Hardcode colors, spacing, or content in JSX or CSS
- Add bounce, spin, neon, gradient text, or startup-style animations
- Create new sections without updating `App.jsx` and navigation
- Add libraries without confirming build compatibility with Vite 6 + GitHub Pages
- Add placeholder/lorem ipsum content — use real data or leave blank
- Use Tailwind, Bootstrap, or any external CSS framework
- Restore `Experience.jsx` or `Competencies.jsx` — they are deprecated

---

## Quality Bar

Before declaring any change complete, ask:

> "If an AWS director, legal VP, or finance executive landed on this page for 30 seconds, would they immediately perceive Hanna as polished, capable, intelligent, and operating at the highest professional level?"

If not — keep refining.

Stop at **premium**, not at **working**.

---

## Launch Checklist (still pending)

- [ ] Real email address in `meta.email` (currently `hanna@example.com`)
- [ ] Real LinkedIn URL in `meta.linkedin`
- [ ] PDF resume at `public/documents/hanna-dunham-resume.pdf`
- [ ] DOCX resume at `public/documents/hanna-dunham-resume.docx`
- [ ] GitHub Pages source set to "GitHub Actions" in repo Settings → Pages
- [ ] `favicon.svg` in `public/`
- [ ] Optional headshot in `public/`
