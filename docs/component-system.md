# Component System — Hanna S. Dunham

## Architecture

The site uses React 18 + Vite. Components are self-contained: each has a `.jsx` file and a `.module.css` file in `src/components/`.

All design tokens are defined in `src/styles/variables.css` and consumed via CSS custom properties (`var(--token)`). Do not hardcode values that exist as tokens.

---

## Component Inventory

### Shared

| Component | File | Purpose |
|-----------|------|---------|
| `ScrollReveal` | `src/components/ScrollReveal.jsx` | Wraps any element in a scroll-triggered fade+translate reveal |

**ScrollReveal props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | — | Content to animate |
| `delay` | number | `0` | Seconds before reveal starts |
| `fromY` | number | `24` | Starting Y offset in px |
| `className` | string | — | Applied to the wrapper div |
| `style` | object | — | Inline styles on the wrapper div |

---

### Page Components

#### Navigation

**File**: `Navigation.jsx` / `Navigation.module.css`

- Fixed position, full-width
- Transparent initially → frosted glass after 60px scroll
- Left: `HD` monogram (links to `#hero`)
- Center: Navigation links (`#profile`, `#experience`, `#competencies`, `#education`)
- Right: Resume download CTA + hamburger (mobile)
- Mobile drawer: slides in from right, with `AnimatePresence` exit animation
- `aria-expanded` on toggle button, `role="dialog"` on drawer

**Key behaviors:**
- `body.overflow = 'hidden'` when drawer is open
- Nav scrolled state via `window.scrollY > 60`

---

#### Hero

**File**: `Hero.jsx` / `Hero.module.css`

- Full viewport height (`100dvh`)
- Background: three-layer radial gradient mesh
- Mouse-tracking spotlight via CSS custom properties (`--mx`, `--my`)
- Three floating document frames with scroll parallax
- Staggered content reveal with Framer Motion variants
- Scroll indicator: CSS animated line + label
- Reduced motion: hides floating frames, removes parallax and translate animations

**CSS classes in Hero.module.css:**

| Class | Purpose |
|-------|---------|
| `.gradientBase` | Static multi-layer radial gradient |
| `.gradientMouseSpotlight` | Mouse-tracking gradient (reads `--mx`, `--my`) |
| `.gridOverlay` | Subtle CSS grid pattern (mask-faded) |
| `.docFrame` | Base styles for floating document boxes |
| `.doc1` / `.doc2` / `.doc3` | Individual document frame positions |
| `.docInnerLines` | Ruled-line effect inside document frames |
| `.credential` | J.D. suffix — italic, accent, superscript |
| `.scrollIndicator` | Bottom-center scroll cue |

---

#### Profile

**File**: `Profile.jsx` / `Profile.module.css`

- 2-column grid: summary (left) + key highlights panel (right)
- Highlight panel: cards with label/value pairs
- Collapses to single column below 900px

---

#### Experience

**File**: `Experience.jsx` / `Experience.module.css`

- Vertical timeline layout using CSS Grid (1px line column + entries column)
- Timeline line animates via `useScroll` + `useTransform` (scaleY)
- Each entry: period label → company → role heading → description → tags
- Tags have hover color interaction
- Mobile: hides timeline line, uses bottom borders between entries

---

#### Competencies

**File**: `Competencies.jsx` / `Competencies.module.css`

- 4-column grid of skill categories (→ 2-col at 1024px → 1-col at 520px)
- Each category: uppercase label + list of skills with accent dot marker
- Surface background (`--c-surface`) differentiates this section

---

#### Education

**File**: `Education.jsx` / `Education.module.css`

- 2-column layout: sticky label (left) + credential cards (right)
- Each card: abbreviated degree (italic serif) + year + full degree name + institution
- Sticky header tracks scroll on desktop; collapses on mobile

---

#### Downloads

**File**: `Downloads.jsx` / `Downloads.module.css`

- Full-width card with subtle gradient glow overlay
- Two CTAs: Download Resume (primary) + View LinkedIn (ghost)
- Surface background

---

#### Contact

**File**: `Contact.jsx` / `Contact.module.css`

- Clean contact link list (email + LinkedIn)
- Each contact entry is a row: label left, value right
- Footer bar with name + copyright

---

## Adding a New Section

1. Create `src/components/NewSection.jsx` and `NewSection.module.css`
2. Import and use `ScrollReveal` for animated reveals
3. Use `var(--token)` for all colors, spacing, and typography
4. Follow the section label pattern: `<span className={styles.label}>Section Name</span>`
5. Add `id="section-slug"` to the `<section>` element for nav linking
6. Import and render in `src/App.jsx`
7. Optionally add a nav link in `Navigation.jsx`

---

## CSS Module Conventions

- One CSS module per component, named `ComponentName.module.css`
- Class names: lowercase, camelCase (`.entryHeader`, `.docFrame`)
- Never use `!important`
- Media queries inside each module (not global)
- Responsive breakpoints: `900px` (primary), `768px` (nav), `600px` (mobile), `520px` (small mobile)
