# Animation System — Hanna S. Dunham

## Implementation Stack

- **Library**: Framer Motion 12 (React integration)
- **Supplemental**: CSS `@keyframes` for looping effects (scroll indicator)
- **Reduced motion**: Native `prefers-reduced-motion` via CSS + `useReducedMotion()` hook

---

## Core Patterns

### Pattern 1: Scroll Reveal (Primary)

**Component**: `ScrollReveal.jsx`  
**Used in**: Every section heading, every content block, every card

```jsx
<ScrollReveal delay={0.1}>
  <h2>Heading</h2>
</ScrollReveal>
```

**Animation**: `opacity: 0, y: 24` → `opacity: 1, y: 0`  
**Duration**: `700ms`  
**Easing**: `[0.25, 0.46, 0.45, 0.94]` (ease-out quart)  
**Viewport margin**: `-80px` (triggers slightly before fully in view)  
**Once**: `true` (does not re-animate on scroll-up)

---

### Pattern 2: Staggered Hero Sequence

**Component**: `Hero.jsx`  
**Trigger**: Page load (not scroll)

```jsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
```

**Stagger order**: label → name → tagline → buttons → scroll indicator

---

### Pattern 3: Scroll-Driven Timeline Line

**Component**: `Experience.jsx`  
**Effect**: Vertical line draws from top to bottom as section enters viewport

```jsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start 85%', 'end 40%'],
});

const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

// Applied as:
<motion.div style={{ scaleY: lineScaleY }} />
```

**Transform-origin**: `top center`  
**Character**: Continuous, tied directly to scroll position (not eased).

---

### Pattern 4: Parallax Depth

**Component**: `Hero.jsx`  
**Effect**: Three document frames drift at different rates as user scrolls

```js
const doc1Y = useTransform(scrollY, [0, 700], [0, 70]);   // slow drift down
const doc2Y = useTransform(scrollY, [0, 700], [0, -45]);  // drift up (opposite)
const doc3Y = useTransform(scrollY, [0, 700], [0, 90]);   // faster drift down
```

Content block has a subtle counter-scroll: `[0, 500] → [0, -24]`.

**Note**: All disabled when `useReducedMotion()` returns `true`.

---

### Pattern 5: Mouse-Tracking Spotlight

**Component**: `Hero.jsx`  
**Effect**: Radial gradient follows cursor within hero bounds

**Implementation approach**: Direct DOM mutation via CSS custom properties — bypasses React's render cycle entirely:

```js
useEffect(() => {
  let raf;
  const onMouseMove = (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${(e.clientX - rect.left) / rect.width * 100}%`);
      hero.style.setProperty('--my', `${(e.clientY - rect.top) / rect.height * 100}%`);
    });
  };
  hero.addEventListener('mousemove', onMouseMove, { passive: true });
  return () => hero.removeEventListener('mousemove', onMouseMove);
}, []);
```

**CSS consumer**:
```css
.gradientMouseSpotlight {
  background: radial-gradient(
    ellipse 55% 45% at var(--mx) var(--my),
    rgba(212, 168, 67, 0.07),
    transparent 65%
  );
}
```

---

### Pattern 6: Navigation Appearance

**Component**: `Navigation.jsx`  
**Effect**: Nav fades in on mount; gains frosted glass on scroll

Mount animation: `motion.nav` with `initial={{ opacity: 0, y: -8 }}` → `animate={{ opacity: 1, y: 0 }}`, `delay: 0.2s`.

Scroll state: CSS class swap (`scrolled`) — adds `backdrop-filter: blur(16px)` and `background: rgba(9,9,11,0.88)`.

---

### Pattern 7: Mobile Drawer

**Component**: `Navigation.jsx`  
**Effect**: Slides in from right on open, slides out on close

```jsx
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
/>
```

Wrapped in `AnimatePresence` for exit animation support.

---

### Pattern 8: CSS Scroll Indicator

**Component**: `Hero.jsx`  
**Effect**: Looping line that grows and fades — suggests scrolling

```css
@keyframes scrollPulse {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
  30%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
  70%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}
```

Duration: `2.2s infinite`. Uses CSS, not Framer Motion (no React overhead for a looping effect).

---

## Hover Interactions

| Element | Effect | Duration |
|---------|--------|----------|
| Primary button | `translateY(-2px)` + lighter bg | `150ms` |
| Ghost button | `translateY(-2px)` + brighter border | `150ms` |
| Nav links | Underline `scaleX` 0→1 | `280ms` |
| Monogram | Border color + bg tint | `150ms` |
| Experience tags | Border + text color | `150ms` |
| Education cards | Border color shift | `280ms` |
| Contact rows | Background tint | `150ms` |

All hover effects use `var(--ease-out)`. No spring on hover — spring is for click confirmations only (not used here).

---

## Decision Rules

**When to animate:**
- When the user needs to understand that content has arrived
- When motion reinforces the content hierarchy
- When the interaction has a beginning and end state

**When NOT to animate:**
- On elements that are always visible (no scroll reveal for nav or hero content structure)
- When the motion would repeat annoyingly (looping effects only on scroll indicator)
- When the user has expressed motion preference

**The 3-second rule**: If removing an animation makes the site feel broken or incomplete, it belongs. If removing it makes no difference, it doesn't belong.
