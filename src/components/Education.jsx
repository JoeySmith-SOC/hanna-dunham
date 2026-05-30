import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { education } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Education.module.css';

// ═══════════════════════════════════════════════════════
//  ANIMATION TIMING
//  All delays in seconds. Tune here to adjust the sequence.
// ═══════════════════════════════════════════════════════
const ANIM = {
  // Atmosphere
  GLOW_DELAY:         0.0,
  GLOW_DURATION:      0.9,

  // Architectural column lines
  COLUMN_DELAY:       0.24,
  COLUMN_DURATION:    1.1,

  // Perspective floor grid
  GRID_DELAY:         0.1,
  GRID_STAGGER:       0.05,
  GRID_DURATION:      1.4,
  CROSS_DELAY:        0.52,
  CROSS_STAGGER:      0.09,

  // Beams
  UPPER_BEAM_DELAY:   0.36,
  BEAM_DURATION:      1.5,
  LOWER_BEAM_DELAY:   1.05,

  // Banners: rod appears 0.18s before banner drops
  // L = Philosophy (left), R = J.D. (right)
  BANNER_L_DELAY:     0.55,
  BANNER_R_DELAY:     0.70,
  BANNER_DURATION:    0.95,   // clipPath reveal duration

  // Content offsets from each banner's BANNER_*_DELAY
  C_SCHOOL:           0.38,
  C_ICON:             0.56,
  C_DIV1:             0.66,
  C_DEGREE:           0.75,
  C_DIV2:             0.85,
  C_DETAILS:          0.94,
  C_CAPTION:          1.12,

  // Pathway (after right banner content settles)
  PATHWAY_DELAY:      1.92,
  PATHWAY_DURATION:   1.3,
  PATHWAY_NODE_DELAYS:[1.92, 2.52, 3.12],
  PATHWAY_LABEL_OFFSET: 0.22,

  INSCRIPTION_DELAY:  3.35,
};

// ═══════════════════════════════════════════════════════
//  PERSPECTIVE GRID  (same geometry as before)
// ═══════════════════════════════════════════════════════
const VP  = { x: 600, y: 180 };
const GSW = 1200;
const GSH = 600;

const GRID_RAD = [0, 133, 266, 400, 600, 800, 933, 1066, 1200].map(x => ({
  d: `M ${VP.x} ${VP.y} L ${x} ${GSH}`,
}));

const GRID_CROSS = [280, 340, 400, 460, 520].map(y => {
  const t  = (GSH - y) / (GSH - VP.y);
  const xl = parseFloat((t * VP.x).toFixed(1));
  const xr = parseFloat((GSW - xl).toFixed(1));
  const opacity = parseFloat((0.04 + ((y - 280) / 240) * 0.12).toFixed(4));
  return { d: `M ${xl} ${y} L ${xr} ${y}`, opacity };
});
GRID_CROSS.push({ d: `M 0 ${GSH} L ${GSW} ${GSH}`, opacity: 0.2 });

const EASE   = [0.25, 0.46, 0.45, 0.94];
const EASE_C = [0.16, 1, 0.3, 1];

// ═══════════════════════════════════════════════════════
//  SYMBOLS  — pure CSS/SVG, no third-party assets
// ═══════════════════════════════════════════════════════

/** Minimal bear paw: 3 upper toes + main pad — Baylor-inspired */
function BearPawIcon() {
  return (
    <svg viewBox="0 0 72 68" className={styles.symbolSvg} aria-hidden="true">
      <circle cx="16" cy="18" r="8.5" />
      <circle cx="36" cy="10" r="10.5" />
      <circle cx="56" cy="18" r="8.5" />
      <ellipse cx="36" cy="50" rx="22" ry="16" />
    </svg>
  );
}

/** Scales of justice — Cooley Law-inspired */
function ScalesIcon() {
  return (
    <svg viewBox="0 0 80 70" className={styles.symbolSvg} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Apex dot */}
      <circle cx="40" cy="8" r="4.5" fill="currentColor" stroke="none" />
      {/* Central post */}
      <line x1="40" y1="12" x2="40" y2="58" strokeWidth="2" />
      {/* Balance beam */}
      <line x1="8" y1="24" x2="72" y2="24" strokeWidth="2" />
      {/* Left arm */}
      <line x1="10" y1="24" x2="10" y2="42" strokeWidth="1.5" />
      {/* Left pan */}
      <path d="M 2 42 Q 10 48 18 42" strokeWidth="1.5" />
      {/* Right arm */}
      <line x1="70" y1="24" x2="70" y2="42" strokeWidth="1.5" />
      {/* Right pan */}
      <path d="M 62 42 Q 70 48 78 42" strokeWidth="1.5" />
      {/* Pedestal */}
      <line x1="28" y1="58" x2="52" y2="58" strokeWidth="2" />
      <line x1="34" y1="58" x2="32" y2="64" strokeWidth="1.5" />
      <line x1="46" y1="58" x2="48" y2="64" strokeWidth="1.5" />
      <line x1="28" y1="64" x2="52" y2="64" strokeWidth="1.5" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  PATHWAY NODES
// ═══════════════════════════════════════════════════════
const PATHWAY_NODES = [
  { cx: 80,  label: 'Philosophy' },
  { cx: 500, label: 'Law'        },
  { cx: 920, label: 'Governance' },
];

// ═══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function Education() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const rm       = useReducedMotion();

  const lawDegree  = education[0]; // J.D. — Cooley Law
  const philDegree = education[1]; // B.A. — Baylor

  // Split J.D. honors into the details array
  const lawDetails = lawDegree.honors?.split(' · ') ?? [];

  const pathInit   = rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const pathTarget = isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const d          = (v) => rm ? 0 : v;
  const dur        = (v) => rm ? 0 : v;

  return (
    <section
      id="education"
      className={styles.section}
      aria-label="Education"
      ref={ref}
    >
      {/* ═══════════════════════════════════
           ATMOSPHERIC BACKDROP
          ═══════════════════════════════════ */}
      <div className={styles.atmosphere} aria-hidden="true">
        {/* Gold bloom — light expanding from above */}
        <motion.div
          className={styles.glowOuter}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: dur(ANIM.GLOW_DURATION), delay: d(ANIM.GLOW_DELAY), ease: EASE }}
        />
        <motion.div
          className={styles.glowCore}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(ANIM.GLOW_DURATION + 0.5), delay: d(0.2) }}
        />

        {/* Perspective floor grid */}
        <svg
          viewBox={`0 0 ${GSW} ${GSH}`}
          className={styles.perspectiveSvg}
          preserveAspectRatio="xMidYMax slice"
          focusable="false"
        >
          {GRID_RAD.map(({ d: path }, i) => (
            <motion.path
              key={`r${i}`}
              d={path}
              stroke="rgba(212,168,67,0.1)"
              strokeWidth={0.75}
              fill="none"
              initial={pathInit}
              animate={pathTarget}
              transition={{
                pathLength: { duration: dur(ANIM.GRID_DURATION), delay: d(ANIM.GRID_DELAY + i * ANIM.GRID_STAGGER), ease: EASE },
                opacity:    { duration: 0.3, delay: d(ANIM.GRID_DELAY + i * ANIM.GRID_STAGGER) },
              }}
            />
          ))}
          {GRID_CROSS.map(({ d: path, opacity: op }, i) => (
            <motion.path
              key={`c${i}`}
              d={path}
              stroke={`rgba(212,168,67,${op})`}
              strokeWidth={0.8}
              fill="none"
              initial={rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: dur(0.9), delay: d(ANIM.CROSS_DELAY + i * ANIM.CROSS_STAGGER), ease: EASE },
                opacity:    { duration: 0.3, delay: d(ANIM.CROSS_DELAY + i * ANIM.CROSS_STAGGER) },
              }}
            />
          ))}
        </svg>

        {/* Architectural column lines — rise from top */}
        <motion.div
          className={styles.archColumn}
          style={{ left: 'clamp(18px, 3.5vw, 52px)', transformOrigin: 'top' }}
          initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: dur(ANIM.COLUMN_DURATION), delay: d(ANIM.COLUMN_DELAY), ease: EASE_C }}
        />
        <motion.div
          className={styles.archColumn}
          style={{ right: 'clamp(18px, 3.5vw, 52px)', transformOrigin: 'top' }}
          initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: dur(ANIM.COLUMN_DURATION), delay: d(ANIM.COLUMN_DELAY + 0.07), ease: EASE_C }}
        />
      </div>

      {/* ═══════════════════════════════════
           CONTENT
          ═══════════════════════════════════ */}
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Education</span>
          </ScrollReveal>
          <ScrollReveal delay={0.07}>
            <h2 className={styles.sectionHeading}>Intellectual Foundation</h2>
          </ScrollReveal>
        </div>

        {/* Upper beam */}
        <motion.div
          className={styles.beam}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(ANIM.BEAM_DURATION), delay: d(ANIM.UPPER_BEAM_DELAY), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* ── Banner hall ── */}
        {/* DOM order: Philosophy left, J.D. right (no CSS order swap needed) */}
        <div className={styles.bannerHall}>

          <AcademicBanner
            isInView={isInView}
            rm={rm}
            baseDelay={ANIM.BANNER_L_DELAY}
            schoolName="Baylor University"
            schoolSub={null}
            icon={<BearPawIcon />}
            degreeName={philDegree.degree}
            details={['Philosophy', 'Critical Thinking', 'Logic', 'Analytical Reasoning']}
            caption="The Analytical Foundation"
          />

          <AcademicBanner
            isInView={isInView}
            rm={rm}
            baseDelay={ANIM.BANNER_R_DELAY}
            schoolName="Cooley Law School"
            schoolSub="Western Michigan University"
            icon={<ScalesIcon />}
            degreeName={lawDegree.degree}
            details={lawDetails}
            caption="The Legal Foundation"
          />

        </div>

        {/* Lower beam */}
        <motion.div
          className={styles.beam}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(ANIM.BEAM_DURATION), delay: d(ANIM.LOWER_BEAM_DELAY), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Pathway: Philosophy → Law → Governance */}
        <div className={styles.pathway} aria-label="Intellectual journey: Philosophy, Law, Governance">
          <svg
            viewBox="0 0 1000 90"
            className={styles.pathwaySvg}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Connecting line */}
            <motion.path
              d="M 80 34 L 920 34"
              stroke="rgba(212,168,67,0.32)"
              strokeWidth={1.2}
              fill="none"
              initial={rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: dur(ANIM.PATHWAY_DURATION), delay: d(ANIM.PATHWAY_DELAY), ease: EASE },
                opacity:    { duration: 0.3, delay: d(ANIM.PATHWAY_DELAY) },
              }}
            />
            {/* Nodes */}
            {PATHWAY_NODES.map(({ cx }, i) => (
              <g key={i}>
                <motion.circle
                  cx={cx} cy={34} r={9}
                  fill="none"
                  stroke="rgba(212,168,67,0.6)"
                  strokeWidth={1.5}
                  initial={{ scale: rm ? 1 : 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: dur(0.5), delay: d(ANIM.PATHWAY_NODE_DELAYS[i]), ease: EASE_C }}
                  style={{ transformOrigin: `${cx}px 34px` }}
                />
                <motion.circle
                  cx={cx} cy={34} r={3.5}
                  fill="rgba(212,168,67,0.88)"
                  initial={{ scale: rm ? 1 : 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: dur(0.35), delay: d(ANIM.PATHWAY_NODE_DELAYS[i] + 0.1), ease: EASE_C }}
                  style={{ transformOrigin: `${cx}px 34px` }}
                />
              </g>
            ))}
            {/* Labels */}
            {PATHWAY_NODES.map(({ cx, label }, i) => (
              <motion.text
                key={label}
                x={cx} y={76}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: dur(0.6), delay: d(ANIM.PATHWAY_NODE_DELAYS[i] + ANIM.PATHWAY_LABEL_OFFSET) }}
                style={{
                  fontFamily: 'Inter,-apple-system,sans-serif',
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fill: 'rgba(212,168,67,0.78)',
                }}
              >
                {label}
              </motion.text>
            ))}
          </svg>
        </div>

        {/* Narrative inscription */}
        <motion.p
          className={styles.inscription}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(1.2), delay: d(ANIM.INSCRIPTION_DELAY) }}
        >
          Where philosophical inquiry became legal precision,<br />
          and legal precision became enterprise governance.
        </motion.p>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
//  ACADEMIC BANNER
//  Drops from a hanging rod like a great-hall standard.
//  Uses clipPath for entrance (no transform conflict with sway).
//  CSS sway starts after entrance via onAnimationComplete.
// ═══════════════════════════════════════════════════════
function AcademicBanner({
  isInView, rm, baseDelay,
  schoolName, schoolSub, icon,
  degreeName, details, caption,
}) {
  const [swayReady, setSwayReady] = useState(false);

  const d   = (offset) => rm ? 0 : baseDelay + offset;
  const dur = (v)      => rm ? 0 : v;

  return (
    <div className={styles.bannerWrapper}>

      {/* ── Hanging rod — appears BEFORE banner drops ── */}
      <motion.div
        className={styles.rod}
        initial={{ scaleX: rm ? 1 : 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: dur(0.65), delay: rm ? 0 : baseDelay - 0.18, ease: EASE_C }}
        style={{ transformOrigin: 'center' }}
        aria-hidden="true"
      />

      {/* ── Banner body — drops via clipPath reveal ── */}
      <motion.div
        className={`${styles.banner} ${swayReady && !rm ? styles.bannerSway : ''}`}
        initial={rm ? {} : { clipPath: 'inset(0 0 100% 0)' }}
        animate={isInView
          ? { clipPath: 'inset(0 0 0% 0)' }
          : rm ? {} : { clipPath: 'inset(0 0 100% 0)' }
        }
        transition={{ duration: dur(ANIM.BANNER_DURATION), delay: d(0), ease: EASE_C }}
        onAnimationComplete={() => {
          if (isInView && !rm) setSwayReady(true);
        }}
      >
        {/* School name */}
        <motion.div
          className={styles.schoolBlock}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.65), delay: d(ANIM.C_SCHOOL) }}
        >
          <p className={styles.schoolName}>{schoolName}</p>
          {schoolSub && <p className={styles.schoolSub}>{schoolSub}</p>}
        </motion.div>

        {/* Institutional symbol */}
        <motion.div
          className={styles.symbolWrap}
          initial={{ opacity: 0, scale: rm ? 1 : 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: dur(0.75), delay: d(ANIM.C_ICON), ease: EASE_C }}
        >
          {icon}
        </motion.div>

        {/* Divider */}
        <motion.div
          className={styles.bannerDivider}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(0.65), delay: d(ANIM.C_DIV1), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Degree name */}
        <motion.h3
          className={styles.bannerDegree}
          initial={{ opacity: 0, y: rm ? 0 : 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: dur(0.75), delay: d(ANIM.C_DEGREE), ease: EASE }}
        >
          {degreeName}
        </motion.h3>

        {/* Divider */}
        <motion.div
          className={styles.bannerDivider}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(0.65), delay: d(ANIM.C_DIV2), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Details / honors */}
        <motion.ul
          className={styles.bannerDetails}
          role="list"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.75), delay: d(ANIM.C_DETAILS) }}
        >
          {details.map((item, i) => (
            <li key={i} className={styles.bannerDetail}>
              <span className={styles.detailDot} aria-hidden="true" />
              {item}
            </li>
          ))}
        </motion.ul>

        {/* Caption — pushed to bottom via margin-top: auto */}
        <motion.p
          className={styles.bannerCaption}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.65), delay: d(ANIM.C_CAPTION) }}
        >
          {caption}
        </motion.p>
      </motion.div>
    </div>
  );
}
