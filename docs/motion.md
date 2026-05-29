# Motion System — Hanna S. Dunham

## Philosophy: Quiet Confidence

Animation serves communication, not spectacle. Every motion should feel inevitable — like the content was always going to arrive exactly this way.

If an animation calls attention to itself, it is wrong.

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

| Token | Value | Character |
|-------|-------|-----------|
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Smooth deceleration — default reveal |
| `--ease-in-out` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Between-state transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Gentle overshoot — use sparingly |
| `--ease-cinema` | `cubic-bezier(0.16, 1, 0.3, 1)` | Cinematic hero reveals, SVG node entrances |
| `--ease-entrance` | `cubic-bezier(0.4, 0, 0, 1)` | Fast-in, slow-settle |

**Primary:** `--ease-out` / `[0.25, 0.46, 0.45, 0.94]` — use for everything unless there's a specific reason.

**Cinema easing:** `[0.16, 1, 0.3, 1]` — reserved for hero name reveal and SVG `pathLength`/`scale` entrance animations. Feels like a camera pull into focus.

---

## Animation Inventory

### Hero Sequence (fires on mount, no scroll trigger)

Timed sequence. No simultaneous motion.

```
0.30s  → Section label fades + translates up
0.50s  → Name words mask-reveal (stagger 0.13s per word, cinema ease)
1.30s  → Credential fades in
1.50s  → Separator line draws (scaleX: 0→1, cinema ease)
1.62s  → Tagline fades + translates up
1.82s  → Action buttons fade + translate up
2.30s  → Scroll indicator fades in
```

Name reveal technique: each word wrapped in `overflow: hidden` span; inner `motion.span` animates `y: '115%' → 0`. Creates theatrical title-card reveal.

### Scroll Reveals (`ScrollReveal.jsx`)

Wraps Framer Motion `whileInView`. Used for all section content except the Hero.

```js
initial:    { opacity: 0, y: 24 }
whileInView: { opacity: 1, y: 0 }
viewport:   { once: true, margin: '-80px' }
transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
```

Stagger via `delay` prop: increments of `0.06–0.1s`.

### Timeline Line Draw

`useScroll` + `useTransform` on the section element:

```js
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start 85%', 'end 40%'],
});
const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
// Applied: style={{ scaleY: lineScaleY, transformOrigin: 'top center' }}
```

### SVG Capability Network (`ExperienceExpertise.jsx`)

All animations use `useInView({ once: true, margin: '-60px' })` as trigger.

**Connection lines:**
```js
// motion.path pathLength: 0 → 1 (Framer Motion manages strokeDasharray internally)
transition: {
  pathLength: { duration: 1.0, delay: 0.18 + i * 0.14, ease: [0.25,0.46,0.45,0.94] },
  opacity:    { duration: 0.25, delay: 0.18 + i * 0.14 }
}
```

**Nodes (hub + satellites):**
```js
// scale: 0 → 1 from node center
// transformOrigin: '${cx}px ${cy}px' in SVG coordinate space
transition: { duration: 0.52, delay: 0.48, ease: [0.16, 1, 0.3, 1] }
```

**Orbit ring (hub):**
```js
// animate.rotate: 360, duration: 66s, repeat: Infinity, ease: 'linear'
// Very slow, barely perceptible — reinforces "active system" feeling
```

**Labels:**
```js
// opacity: 0 → 1, no y movement
transition: { duration: 0.38, delay: 0.8 + i * 0.06 }
```

**Active state changes (hover/click):**
- SVG `fill`/`stroke` on circle elements use inline `style.transition: 'fill 340ms ease'` — CSS handles the switch, not Framer Motion. This prevents the entrance animation from re-triggering on state change.

**Skills panel:**
```js
// AnimatePresence mode="wait", key={activeCapability}
initial: { opacity: 0, y: 6 }
animate: { opacity: 1, y: 0 }
exit:    { opacity: 0, y: -6 }
transition: { duration: 0.22 }
```

### Hero Parallax

Floating document frames and atmospheric orbs parallax on scroll:

```js
const doc1Y = useTransform(scrollY, [0, 700], [0, 70]);   // down
const doc2Y = useTransform(scrollY, [0, 700], [0, -45]);  // up
const orb1Y = useTransform(scrollY, [0, 700], [0, 55]);   // down
const orb2Y = useTransform(scrollY, [0, 700], [0, -40]);  // up
```

Content block subtle parallax: `[0, 500] → [0, -24]`.

### Mouse-Tracking Spotlight (Hero)

Reads mouse position, updates `--mx` / `--my` CSS custom properties directly on the DOM element (bypasses React render cycle for performance):

```js
hero.style.setProperty('--mx', `${x}%`);
hero.style.setProperty('--my', `${y}%`);
```

Used by `.gradientMouseSpotlight` pseudo-element via `radial-gradient(at var(--mx) var(--my), ...)`.

### CSS Keyframe Animations

Used sparingly for slow atmospheric effects that don't need scroll synchronization:

- `ambientDrift`: Hero background layer drifts 22s, alternates
- `orbBreath1/2`: Atmospheric orbs breathe 18s/24s, alternates
- `scrollPulse`: Scroll indicator line scaleY pulse 2.6s, infinite

All wrapped in `@media (prefers-reduced-motion: no-preference)`.

### Grain Texture

`body::before` with SVG `feTurbulence`, opacity 0.038, `mix-blend-mode: overlay`. Hidden under `@media (prefers-reduced-motion: reduce)`.

---

## Micro-Interactions

| Element | Interaction | Effect |
|---------|-------------|--------|
| Buttons (hero) | Hover | `translateY(-2px)` + box-shadow |
| Nav links | Hover | Underline `scaleX: 0→1` via `::after` |
| Tags | Hover | Color + border-color shift |
| Timeline entries | Hover | `translateX(3px)` on entryBody, dot glow, role brightens |
| Profile highlights | Hover | Subtle background tint |
| SVG nodes | Hover/click | Fill/stroke transition, active state persists |

---

## Reduced Motion

**Hook:** `useReducedMotion()` from Framer Motion — checks `prefers-reduced-motion` media query.

**When true:**
- All `y`/`x` translate values: `0`
- Durations: `0` (instant opacity change only)
- SVG path draws: start at `pathLength: 1, opacity: 1` (already drawn)
- SVG node scales: start at `scale: 1, opacity: 1`
- Orbit ring rotation: disabled
- Parallax transforms: not applied
- Floating doc frames / orbs: not rendered (gated behind `!prefersReducedMotion`)
- CSS animations (ambientDrift, orbBreath, scrollPulse): suppressed via `@media` wrappers
- Grain texture: hidden

---

## Performance Rules

1. Always animate `transform` and `opacity` — never `width`, `height`, `top`, `left`
2. `will-change: background` only on the mouse-spotlight div (updates every frame)
3. Framer Motion `useTransform` runs on compositor thread — safe for parallax
4. Mouse tracking uses `requestAnimationFrame` to batch rapid events
5. `whileInView` with `once: true` — no re-animation on scroll-back
6. CSS transitions on SVG `fill`/`stroke`: in-browser compositing, no JS overhead
7. Never trigger more than 4–5 simultaneous Framer Motion animations
8. `AnimatePresence mode="wait"` on skills panel: old content exits before new enters (prevents overlap)
