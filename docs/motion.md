# Motion System — Hanna S. Dunham

## Philosophy: Quiet Confidence

Animation on this site serves communication, not spectacle. Every motion should feel inevitable — like the content was always going to arrive exactly this way. If an animation calls attention to itself, it's wrong.

> "Animation is not decoration. It is the physics of attention."

---

## Timing Tokens

Defined in `src/styles/variables.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--dur-fast` | `150ms` | Hover states, micro-transitions |
| `--dur-base` | `280ms` | Standard UI transitions (nav, buttons) |
| `--dur-slow` | `550ms` | Scroll reveals, panel entries |
| `--dur-slower` | `900ms` | Hero sequence, timeline line draw |

---

## Easing Reference

### Named Easings

| Token | Value | Character |
|-------|-------|-----------|
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Smooth deceleration — primary reveal easing |
| `--ease-in-out` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Smooth transitions between states |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Gentle overshoot — sparingly only |

**Primary easing**: `--ease-out`. Use for everything unless there's a specific reason not to.

### Framer Motion Array Form

```js
const ease = [0.25, 0.46, 0.45, 0.94]; // same as --ease-out
```

---

## Animation Catalog

### Hero Sequence

The hero is the only place the site initiates animation without a scroll trigger.

```
0.4s delay  → Section label fades + translates in
0.54s delay → Name block (Playfair Display)
0.68s delay → Tagline
0.82s delay → Action buttons
1.8s delay  → Scroll indicator
```

All use `opacity: 0 → 1` + `y: 22 → 0`, duration `0.9s`, `--ease-out`.

### Scroll Reveals

Implemented via `ScrollReveal.jsx` (wrapper around Framer Motion `whileInView`):

- `initial`: `{ opacity: 0, y: 24 }`
- `whileInView`: `{ opacity: 1, y: 0 }`
- `viewport`: `{ once: true, margin: "-80px" }`
- `transition`: `{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }`

Stagger via `delay` prop (increments of `0.08–0.1s`).

### Timeline Line Draw

The Experience section vertical line uses `scaleY: 0 → 1` with `transform-origin: top`.

Triggered by `useScroll` + `useTransform` on the section element:

```js
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start 85%', 'end 40%'],
});
const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
```

### Hero Parallax

Three floating document frames have independent vertical parallax:

```js
const doc1Y = useTransform(scrollY, [0, 700], [0, 70]);   // drifts down
const doc2Y = useTransform(scrollY, [0, 700], [0, -45]);  // drifts up
const doc3Y = useTransform(scrollY, [0, 700], [0, 90]);   // drifts down (faster)
```

Content block has a subtle upward parallax: `[0, 500] → [0, -24]`.

### Mouse-Tracking Spotlight

Hero reads mouse position and updates `--mx` / `--my` CSS custom properties directly on the DOM element (bypasses React render cycle). Used by the `.gradientMouseSpotlight` pseudo-element.

```js
hero.style.setProperty('--mx', `${x}%`);
hero.style.setProperty('--my', `${y}%`);
```

### Scroll Pulse (Scroll Indicator)

The scroll indicator line uses a CSS `@keyframes` animation:

```css
@keyframes scrollPulse {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
  30%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
  70%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}
```

Duration: `2.2s`, infinite.

### Micro-Interactions

**Buttons**: `translateY(-2px)` on hover, `translateY(0)` on active. `var(--dur-fast)`.
**Navigation links**: Underline scale `0 → 1` on hover via `::after`. `var(--dur-base)`.
**Tags**: Color + border-color shift. `var(--dur-fast)`.
**Cards (Education, Downloads)**: Border-color shift only. No transforms.

---

## Reduced Motion

Framer Motion hook: `useReducedMotion()`.

**When `prefersReducedMotion` is true:**
- All `y` / `x` translate values are clamped to `0`
- Duration becomes `0.01s` (effectively instant)
- Parallax transforms are not applied
- Floating document frames are not rendered
- CSS animations (scroll indicator) are suppressed via global reset in `reset.css`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Rules

1. Always use `transform` and `opacity` — never animate `top`, `left`, `width`, `height`
2. Use `will-change` only on the mouse-spotlight element (it updates constantly)
3. Parallax uses Framer Motion's `useTransform` — runs on a separate thread
4. Mouse tracking uses `requestAnimationFrame` to debounce rapid events
5. `whileInView` with `once: true` — no re-triggering on scroll-up
6. Never animate more than 4–5 elements simultaneously on scroll
