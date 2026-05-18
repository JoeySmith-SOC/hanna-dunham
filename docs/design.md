# Design System — Hanna S. Dunham

## Positioning

This site is a premium executive digital identity. The visual register is **editorial + enterprise**: authoritative without austerity, refined without coldness. Think Harvard Law Review cover meets Palantir investor deck.

---

## Color System

All colors are defined in `src/styles/variables.css`.

### Base Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--c-bg` | `#09090B` | Page background |
| `--c-surface` | `#18181B` | Cards, navigation |
| `--c-surface-raised` | `#27272A` | Elevated UI elements |
| `--c-border` | `rgba(255,255,255,0.08)` | Default borders |
| `--c-border-subtle` | `rgba(255,255,255,0.04)` | Section dividers |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--c-text` | `#FAFAFA` | Primary text, headings |
| `--c-text-secondary` | `#A1A1AA` | Body copy, descriptions |
| `--c-text-muted` | `#71717A` | Labels, metadata, timestamps |

### Accent (Warm Gold)

| Token | Value | Usage |
|-------|-------|-------|
| `--c-accent` | `#D4A843` | Primary accent — CTAs, labels, highlights |
| `--c-accent-hover` | `#E0B96A` | Hover state for accent elements |
| `--c-accent-dim` | `rgba(212,168,67,0.15)` | Subtle accent backgrounds |
| `--c-accent-glow` | `rgba(212,168,67,0.08)` | Hero glow layers |
| `--c-accent-subtle` | `rgba(212,168,67,0.04)` | Barely-there tints |

**Accent rationale**: Warm gold reads as authoritative and premium in dark contexts without becoming flashy. It carries connotations of legal authority, institutional quality, and executive presence.

---

## Typography

### Font Families

| Family | Role | Source |
|--------|------|--------|
| Playfair Display | Display, headings | Google Fonts |
| Inter | Body, UI | Google Fonts |

**Pairing rationale**: Playfair's editorial weight establishes authority and personality in headings. Inter's neutral clarity handles information density without visual noise.

### Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--fs-hero` | `clamp(52px, 9vw, 100px)` | Hero name only |
| `--fs-h2` | `clamp(28px, 4vw, 44px)` | Section headings |
| `--fs-h3` | `clamp(18px, 2.5vw, 24px)` | Entry titles, sub-headings |
| `--fs-body` | `16px` | Primary body copy |
| `--fs-small` | `14px` | Secondary text, descriptions |
| `--fs-label` | `11px` | Section labels, metadata |

### Typography Rules

- **Hero name**: Playfair Display, weight 400, tracking `-0.01em`
- **Section labels**: Inter, weight 500, `letter-spacing: 0.14em`, all-caps
- **Body copy**: Inter, weight 300, `line-height: 1.75–1.8`
- **Credentials/J.D.**: Italic serif, accent color, superscript position
- Never use font-weight above 600 in the body. Let scale and spacing create hierarchy.

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-section` | `clamp(80px, 12vw, 140px)` | Section padding (top/bottom) |
| `--sp-component` | `clamp(40px, 6vw, 64px)` | Within-section spacing |
| `--sp-content` | `24px` | Between content blocks |

**Spacing philosophy**: Generous whitespace is a feature. It signals confidence. Never crowd sections.

---

## Layout

- Max content width: `1120px`
- Horizontal padding: `clamp(20px, 5vw, 64px)`
- Grids use CSS Grid. No flexbox hacks for two-column layouts.
- Mobile-first: single column → 2-col at 900px → 4-col competencies at 1024px.

---

## Visual Rules

### What to use

- High-contrast text on dark backgrounds
- Single warm gold accent, used sparingly
- Subtle gradient mesh in hero (radial gradients, max 10% opacity)
- Clean geometric borders (`1px`, low opacity)
- Grid overlay in hero (very subtle, mask-faded at edges)

### What to avoid

- Gradient text (absolute ban)
- Glassmorphism effects
- Bright neon accent colors
- Side-stripe decorations (the left-border pattern)
- Nested card-in-card layouts
- Hero metrics/stat blocks
- Shadow stacks
- Rounded corners above `12px` (too casual)
- Multiple competing accent colors
