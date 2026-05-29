# Design System — Hanna S. Dunham

## Positioning

**Register:** Modern Enterprise Editorial — authoritative without austerity, refined without coldness.

**Analogues:** Linear documentation · Bloomberg Terminal density · Apple product restraint · McKinsey/BCG digital identity

This is not a startup portfolio. It is not a traditional resume. It is an executive capability system.

---

## Color System

All tokens defined in `src/styles/variables.css`.

### Base Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--c-bg` | `#09090B` | Page background — near-black graphite |
| `--c-surface` | `#18181B` | Sections with elevated background (Competencies/old) |
| `--c-surface-raised` | `#27272A` | Elevated UI elements |
| `--c-border` | `rgba(255,255,255,0.08)` | Default borders |
| `--c-border-subtle` | `rgba(255,255,255,0.04)` | Section dividers |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--c-text` | `#FAFAFA` | Primary text, headings |
| `--c-text-secondary` | `#A1A1AA` | Body copy, descriptions |
| `--c-text-muted` | `#71717A` | Labels, metadata, period text |

### Accent — Warm Gold

| Token | Value | Usage |
|-------|-------|-------|
| `--c-accent` | `#D4A843` | Primary accent — CTAs, section labels, timeline dots |
| `--c-accent-hover` | `#E0B96A` | Hover state |
| `--c-accent-dim` | `rgba(212,168,67,0.15)` | Subtle accent backgrounds |
| `--c-accent-glow` | `rgba(212,168,67,0.08)` | Hero glow layers |
| `--c-accent-subtle` | `rgba(212,168,67,0.04)` | Barely-there tints |
| `--c-gold-glow` | `rgba(212,168,67,0.12)` | Section atmosphere gradients |
| `--c-gold-glow-strong` | `rgba(212,168,67,0.22)` | Active node/border glow |

**Gold rationale:** Warm gold in a dark context reads as authority, institutional quality, and legal precision — not luxury branding. Used at low opacities so it illuminates rather than decorates.

### Glass Surfaces

| Token | Value | Usage |
|-------|-------|-------|
| `--c-glass` | `rgba(255,255,255,0.025)` | Card/panel backgrounds |
| `--c-glass-raised` | `rgba(255,255,255,0.04)` | Elevated glass |
| `--c-glass-border` | `rgba(255,255,255,0.065)` | Glass card borders |
| `--c-glass-border-hover` | `rgba(212,168,67,0.22)` | Active/hover glass borders |

---

## Typography

### Font Families

| Family | Role | Source |
|--------|------|--------|
| Playfair Display | Display, section headings, role titles | Google Fonts |
| Inter | Body copy, labels, metadata, UI | Google Fonts |

**Pairing rationale:** Playfair establishes editorial authority and executive weight. Inter handles information density without visual noise. Never swap.

### Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--fs-hero` | `clamp(52px, 9vw, 100px)` | Hero name — word mask reveal |
| `--fs-h2` | `clamp(28px, 4vw, 44px)` | Section headings |
| `--fs-h3` | `clamp(18px, 2.5vw, 24px)` | Entry/card titles |
| `--fs-body` | `16px` | Primary body copy |
| `--fs-small` | `14px` | Descriptions, secondary text |
| `--fs-label` | `11px` | Section labels, metadata |

### Typography Rules

- Hero name: Playfair Display, weight 400, `letter-spacing: -0.01em`, word-mask reveal
- Section labels: Inter, weight 500, `letter-spacing: 0.14–0.18em`, all-caps
- Role titles (timeline): Playfair Display, `clamp(14px, 1.5vw, 17px)`, current role slightly larger
- Body copy: Inter, weight 300, `line-height: 1.75–1.88`
- No font-weight above 600. Hierarchy comes from scale and spacing.
- **Never use gradient text.** Absolute rule.

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-section` | `clamp(96px, 13vw, 160px)` | Section vertical padding |
| `--sp-component` | `clamp(44px, 6vw, 72px)` | Within-section spacing |
| `--sp-content` | `24px` | Between content blocks |

**Philosophy:** Generous whitespace is authority. Crowded sections signal low confidence. The site should feel luxurious and unhurried.

---

## Layout

- Max container: `1120px`
- Horizontal padding: `clamp(20px, 5vw, 64px)`
- All multi-column layouts use CSS Grid (no flexbox hacks)
- Split sections: `57fr 43fr` (Experience & Expertise) or `1fr 300px` (Profile)
- Mobile-first: single column → side-by-side at ≥ 768–900px

---

## Visual Rules

### Use

- Radial gradients for atmospheric depth (max 10–13% opacity)
- Grain texture overlay (`body::before`, SVG `feTurbulence`, opacity 0.038, `mix-blend-mode: overlay`)
- Subtle grid overlays with radial mask fade (hero)
- Gold accent used sparingly — 1–2 elements per section maximum
- Glass surfaces for highlight cards (`c-glass` + `c-glass-border`)
- SVG node networks for capability visualization

### Never

- Gradient text
- Side-stripe / left-border card decorations
- Multiple competing accent colors
- Rounded corners above `12px` (too casual)
- Bright neon or high-saturation secondary colors
- Heavy glassmorphism (keep blur subtle or absent)
- Nested card-in-card layouts
- Hero stat/metric blocks
- Shadow stacks (one shadow per element maximum)

---

## Section-Specific Design Notes

### Hero

Cinematic centerpiece. Word-by-word name reveal (`overflow: hidden` mask with `y: 115% → 0`). Atmospheric orbs (large blurred radial gradients, 18–24s CSS keyframe drift). Mouse-tracking spotlight. Floating document frames (enterprise contract aesthetic) that fade in after name reveal. Self-drawing separator line.

### ExperienceExpertise (split section)

Desktop: `57/43` grid. Left: condensed timeline — only AWS entry gets full description. Right: sticky `500×500` SVG capability network with `pathLength` animations, rotating hub orbit ring, satellite nodes with active illumination. Skills panel below SVG with `AnimatePresence` transitions.

### Profile

Left: executive summary prose. Right: glass highlight card with gold top-edge line and row hover states.
