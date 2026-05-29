# Taste System — Hanna S. Dunham

## What Taste Means Here

Taste is the set of decisions that separate a premium site from a competent one. It is not about complexity — it is about restraint, precision, and knowing what to leave out.

This document records those decisions so they persist across sessions and contributors.

---

## The Register

**Who is Hanna?** An enterprise professional who governs complex infrastructure contracts at AWS scale. She is not a designer, a developer, or a brand. She is an expert.

**Who is looking at this site?** Senior hiring managers, legal VPs, infrastructure directors, procurement leaders. People who scan in 30 seconds and either feel something or move on.

**What should they feel?**
- This person operates at a high level.
- This person is precise, trustworthy, and serious.
- This is not a startup portfolio — this is an executive identity.

---

## Reference Points

### Inspired by

- **Linear** — information density, typographic clarity, dark mode done right
- **Bloomberg** — enterprise data authority, confident grid layouts
- **Apple** — restraint, product reveal language, how they use white space
- **Stripe** — premium developer-facing trust signals, editorial section rhythm
- **Financial Times** — editorial typography, serif authority in digital form
- **McKinsey / BCG digital** — capability framework visual language

### What we are not

- A startup portfolio (`react-spring` bounces, confetti, gradient buttons)
- A creative agency site (full-bleed photography, cursor effects, WebGL)
- A resume dump (white background, bullet lists, black borders)
- Cyberpunk / neon / glassmorphism excess
- LinkedIn profile exported to HTML

---

## Specific Taste Decisions

### Typography

- Playfair Display for headings because it has legal-editorial authority, not corporate coldness
- Inter for body because it handles information density without personality friction
- The name "HANNA S. DUNHAM" should feel like a title card reveal — not a bouncing animation, not a typewriter, not gradient text
- Letter-spacing on labels is generous (`0.14–0.2em`) — creates premium breathing room at small sizes

### Color

- One accent color. Warm gold. Used sparingly.
- Gold at 10–15% opacity for atmosphere. Gold at 50–90% only for interactive highlights.
- The page should feel almost monochrome until something important illuminates.

### Motion

- If you notice the animation, it's too much
- The timeline line grows as you scroll — you perceive it without thinking about it
- The SVG network illuminates as you explore — it rewards curiosity without demanding it
- The hero name reveal feels like a film title card — cinematic, unhurried, intentional

### Sections

- The page should feel shorter than it is — achieved through side-by-side layouts and sticky elements, not by hiding content
- The Experience & Expertise section is the signature of the site: a career narrative on the left, a living capability map on the right
- The capability network should communicate that her skills are *interconnected systems*, not a checklist

### What gets rejected

- Any animation that "bounces" or "springs" except very subtle use in hover states
- Cards with heavy shadows — one subtle shadow maximum
- Left-border accent decorations (the "sidebar stripe" card pattern)
- Gradient text
- Stat blocks in the hero (total contracts, years experience, etc.) — feels like a LinkedIn banner
- Testimonial sections — not appropriate for this positioning
- Timeline entries that try to show everything — condensed is more powerful than comprehensive

---

## Calibration Questions

Before any design decision, ask:

1. **Would a Bloomberg editor approve this layout?** — Is the information hierarchy clear without decoration?
2. **Would an Apple designer approve this animation?** — Is it purposeful, or is it flair?
3. **Would a senior McKinsey partner feel confident on this page?** — Does it communicate expertise, not effort?
4. **Does this feel expensive?** — Not flashy. Expensive. There is a difference.

If the answer to any of these is "no" or "I'm not sure" — simplify. Remove. Reduce opacity.

---

## The Anti-Patterns

These specific patterns have been rejected for this site. Do not reintroduce them.

| Pattern | Why rejected |
|---------|-------------|
| Gradient text | Startup/gaming energy, degrades on some displays |
| Heavy glassmorphism | Overused, visually noisy, suggests lack of confidence |
| Neon/vibrant accent colors | Wrong register for legal/enterprise professional |
| WebGL / 3D canvas | Performance risk, wrong aesthetic register |
| Typewriter text | Cliché, annoying, slows reading |
| Counter animations (stats) | Gamified, inappropriate for executive positioning |
| Multiple animation styles per section | Visual incoherence |
| Bouncing/elastic easing | Playful, not executive |
| Side-stripe cards | Decorative without meaning |
| Skills progress bars | Meaningless pseudo-data, looks like a beginner template |
| Carousel/slider | Hides content, bad on mobile, unnecessary here |
