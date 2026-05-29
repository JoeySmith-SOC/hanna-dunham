# Animation System — Hanna S. Dunham

## Implementation Stack

- **Framer Motion 12** — entrance animations, scroll-linked transforms, SVG path draws
- **CSS transitions** — hover states, color changes, micro-interactions
- **CSS keyframes** — slow atmospheric loops (grain, orbs, ambient drift)
- **`requestAnimationFrame`** — mouse-tracking spotlight (bypasses React render cycle)

---

## Layers

### Layer 1: Atmosphere (CSS, always running)

Background effects that create environmental depth. Never call attention to themselves.

| Animation | Element | Duration | Trigger |
|-----------|---------|----------|---------|
| `ambientDrift` | Hero gradient layer | 22s alternate | Always (RM-gated) |
| `orbBreath1` | Hero orb 1 | 18s alternate | Always (RM-gated) |
| `orbBreath2` | Hero orb 2 | 24s alternate | Always (RM-gated) |
| `scrollPulse` | Scroll indicator | 2.6s infinite | Always (RM-gated) |
| Hub orbit ring | SVG `motion.circle` | 66s linear infinite | After network inView (RM-gated) |

All wrapped in `@media (prefers-reduced-motion: no-preference)` or guarded by `useReducedMotion()`.

### Layer 2: Entrances (Framer Motion, once per session)

Content reveals. Fire once when element enters viewport. Never re-trigger.

| Pattern | Used in | Trigger |
|---------|---------|---------|
| `y: 24 → 0` + opacity | `ScrollReveal.jsx` | `whileInView`, `once: true` |
| `y: '115%' → 0` word mask | Hero name | On mount, staggered |
| `pathLength: 0 → 1` | SVG connections | `useInView`, `once: true` |
| `scale: 0 → 1` from center | SVG nodes | `useInView`, `once: true` |
| `scaleX: 0 → 1` | Hero separator | On mount |
| `scaleY: scroll-linked` | Timeline line | `useScroll` + `useTransform` |
| `opacity: 0 → 1` | SVG labels | `useInView`, `once: true` |

### Layer 3: Interactions (CSS transitions, on hover/click)

State changes. Fast, immediate, CSS-managed.

| Element | Property | Duration |
|---------|----------|----------|
| Nav links | underline `scaleX` | 280ms |
| Buttons | `translateY(-2px)`, box-shadow | 150ms |
| Tags | color, border-color | 150ms |
| Timeline entry | `translateX(3px)` | 550ms |
| Timeline dot | border-color, box-shadow | 550ms |
| SVG circles | `fill`, `stroke` | 340ms |
| SVG labels | `fill` | 340ms |
| Profile highlights | background tint | 280ms |

### Layer 4: Content Transitions (Framer Motion AnimatePresence)

Between-state content swaps.

| Element | Pattern | Duration |
|---------|---------|----------|
| Skills panel (ExperienceExpertise) | `y: 6 → 0`, exit `y: -6`, `mode="wait"` | 220ms |

---

## Reduced Motion Protocol

When `useReducedMotion()` returns `true`:

1. **Hero name words:** `initial="visible"` on container — starts already visible, no y movement
2. **SVG connections:** `initial={{ pathLength: 1, opacity: 1 }}` — already drawn
3. **SVG nodes:** `initial={{ scale: 1, opacity: 1 }}` — already at full size
4. **Orbit ring:** `rotate` animation not applied
5. **All scroll reveals:** `y: 0` (opacity still fades — non-vestibular)
6. **Parallax:** Not applied (`style={}` instead of `style={{ y: transformValue }}`)
7. **Floating elements:** Not rendered (`!prefersReducedMotion` gate)
8. **CSS keyframes:** Suppressed via `@media` wrappers in component CSS files

---

## Critical Implementation Rules

1. **Never animate layout properties.** Only `transform` and `opacity`.
2. **SVG active states use CSS transitions, not Framer Motion** — prevents entrance animation from re-firing when user hovers a node.
3. **`will-change: background`** only on the mouse spotlight element.
4. **`useTransform` for parallax** — Framer Motion runs this on a separate thread.
5. **`AnimatePresence mode="wait"`** for content panels — prevents flash of overlapping content.
6. **No spring easing** (`--ease-spring`) on page load sequences — spring implies playfulness. Cinema easing only for hero.
7. **Maximum simultaneous motion budget:** 4–5 animated elements at any given time.
8. **`whileInView` with `once: true`** — never re-animate on scroll-up.
