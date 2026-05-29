import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { education } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Education.module.css';

// ═══════════════════════════════════════════════════════
//  ANIMATION TIMING — tune these constants to adjust
//  the entire entrance sequence
// ═══════════════════════════════════════════════════════
const ANIM = {
  // Atmospheric glow blooms first, before anything else
  GLOW_DELAY:      0.0,
  GLOW_DURATION:   1.0,

  // Architectural column lines rise from top
  COLUMN_DELAY:    0.28,
  COLUMN_DURATION: 1.3,

  // Perspective floor grid draws outward
  GRID_DELAY:      0.12,
  GRID_STAGGER:    0.055,
  GRID_DURATION:   1.5,
  CROSS_DELAY:     0.6,
  CROSS_STAGGER:   0.09,
  CROSS_DURATION:  0.9,

  // Horizontal architectural beams
  UPPER_BEAM_DELAY:   0.42,
  BEAM_DURATION:      1.6,
  LOWER_BEAM_DELAY:   1.1,

  // Degree pillars rise (Philosophy is left, appears first)
  PILLAR_PHIL_DELAY:  0.65,
  PILLAR_JD_DELAY:    0.82,
  PILLAR_DURATION:    1.1,

  // Staggered reveals INSIDE each pillar (offset from pillar delay)
  ABBREV_OFFSET:       0.0,
  TITLE_OFFSET:        0.14,
  TOP_LINE_OFFSET:     0.28,
  INSTITUTION_OFFSET:  0.38,
  HONOR_PRIMARY_OFFSET: 0.44,
  HONOR_SECONDARY_OFFSET: 0.54,
  NOTE_OFFSET:         0.48,

  // Philosophy → Law → Governance pathway
  // Line draws left-to-right over PATHWAY_DURATION seconds
  PATHWAY_DELAY:       1.25,
  PATHWAY_DURATION:    1.4,
  // Node delays aligned to when the line reaches each x position (8%, 50%, 92%)
  PATHWAY_NODE_DELAYS: [1.25, 1.95, 2.65],
  PATHWAY_LABEL_OFFSET: 0.22,

  // Final inscription
  INSCRIPTION_DELAY:   2.9,
};

// ═══════════════════════════════════════════════════════
//  PERSPECTIVE GRID GEOMETRY
//  SVG viewBox: 0 0 1200 600
//  Vanishing point VP = (600, 180)
//  Outer diagonals: (0, 600)→VP and (1200, 600)→VP
// ═══════════════════════════════════════════════════════
const VP  = { x: 600, y: 180 };
const GSW = 1200;
const GSH = 600;

// 9 lines radiating from VP to bottom edge
const GRID_RAD = [0, 133, 266, 400, 600, 800, 933, 1066, 1200].map(x => ({
  d: `M ${VP.x} ${VP.y} L ${x} ${GSH}`,
}));

// Cross-lines at increasing depth (y = 280…550)
const GRID_CROSS = [280, 340, 400, 460, 520].map(y => {
  const t  = (GSH - y) / (GSH - VP.y);      // parametric t along outer diagonals
  const xl = parseFloat((t * VP.x).toFixed(1));
  const xr = parseFloat((GSW - xl).toFixed(1));
  // Opacity ramps from faint (near VP) to more visible (near viewer)
  const opacity = parseFloat((0.04 + ((y - 280) / 270) * 0.11).toFixed(4));
  return { d: `M ${xl} ${y} L ${xr} ${y}`, opacity };
});
// Bottom full-width base line
GRID_CROSS.push({ d: `M 0 ${GSH} L ${GSW} ${GSH}`, opacity: 0.18 });

const EASE   = [0.25, 0.46, 0.45, 0.94];
const EASE_C = [0.16, 1, 0.3, 1];

// ═══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function Education() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const rm       = useReducedMotion();

  const lawDegree  = education[0]; // J.D.  — primary credential
  const philDegree = education[1]; // B.A. Philosophy — foundation

  const pathInit   = rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const pathTarget = isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };

  // Convert ANIM delays to 0 for reduced-motion
  const d = (val) => rm ? 0 : val;
  const dur = (val) => rm ? 0 : val;

  return (
    <section
      id="education"
      className={styles.section}
      aria-label="Education"
      ref={ref}
    >
      {/* ═══════════════════════════════════════════════
           LAYER 1 — Atmospheric backdrop
          Perspective grid + architectural columns + glow
          ═══════════════════════════════════════════════ */}
      <div className={styles.atmosphere} aria-hidden="true">

        {/* Diffuse gold bloom — wide ambient light */}
        <motion.div
          className={styles.glowOuter}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: dur(ANIM.GLOW_DURATION), delay: d(ANIM.GLOW_DELAY), ease: EASE }}
        />

        {/* Concentrated light source — the "high window" */}
        <motion.div
          className={styles.glowCore}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(ANIM.GLOW_DURATION + 0.4), delay: d(ANIM.GLOW_DELAY + 0.2) }}
        />

        {/* Perspective floor grid */}
        <svg
          viewBox={`0 0 ${GSW} ${GSH}`}
          className={styles.perspectiveSvg}
          preserveAspectRatio="xMidYMax slice"
          focusable="false"
        >
          {/* Radiating lines — draw outward from vanishing point */}
          {GRID_RAD.map(({ d: path }, i) => (
            <motion.path
              key={`r${i}`}
              d={path}
              stroke="rgba(212,168,67,0.09)"
              strokeWidth={0.7}
              fill="none"
              initial={pathInit}
              animate={pathTarget}
              transition={{
                pathLength: { duration: dur(ANIM.GRID_DURATION), delay: d(ANIM.GRID_DELAY + i * ANIM.GRID_STAGGER), ease: EASE },
                opacity:    { duration: 0.3, delay: d(ANIM.GRID_DELAY + i * ANIM.GRID_STAGGER) },
              }}
            />
          ))}
          {/* Cross-depth lines — appear as lines approach viewer */}
          {GRID_CROSS.map(({ d: path, opacity: op }, i) => (
            <motion.path
              key={`c${i}`}
              d={path}
              stroke={`rgba(212,168,67,${op})`}
              strokeWidth={0.7}
              fill="none"
              initial={rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: dur(ANIM.CROSS_DURATION), delay: d(ANIM.CROSS_DELAY + i * ANIM.CROSS_STAGGER), ease: EASE },
                opacity:    { duration: 0.3, delay: d(ANIM.CROSS_DELAY + i * ANIM.CROSS_STAGGER) },
              }}
            />
          ))}
        </svg>

        {/* Left architectural column line — rises from top */}
        <motion.div
          className={styles.archColumn}
          style={{ left: 'clamp(20px, 4vw, 56px)', transformOrigin: 'top' }}
          initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: dur(ANIM.COLUMN_DURATION), delay: d(ANIM.COLUMN_DELAY), ease: EASE_C }}
        />

        {/* Right architectural column line */}
        <motion.div
          className={styles.archColumn}
          style={{ right: 'clamp(20px, 4vw, 56px)', transformOrigin: 'top' }}
          initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: dur(ANIM.COLUMN_DURATION), delay: d(ANIM.COLUMN_DELAY + 0.06), ease: EASE_C }}
        />
      </div>

      {/* ═══════════════════════════════════════════════
           LAYER 2 — Content
          ═══════════════════════════════════════════════ */}
      <div className={styles.container}>

        {/* Section header */}
        <div className={styles.header}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Education</span>
          </ScrollReveal>
          <ScrollReveal delay={0.07}>
            <h2 className={styles.sectionHeading}>Intellectual Foundation</h2>
          </ScrollReveal>
        </div>

        {/* Upper architectural beam */}
        <motion.div
          className={styles.beam}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(ANIM.BEAM_DURATION), delay: d(ANIM.UPPER_BEAM_DELAY), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* ── Degree Pillars ── */}
        {/* J.D. is DOM-first (mobile priority). CSS order: -1 puts Philosophy left on desktop */}
        <div className={styles.degreePair}>

          {/* J.D. Pillar — right on desktop, top on mobile */}
          <EducationPillar
            entry={lawDegree}
            isPrimary
            isInView={isInView}
            baseDelay={ANIM.PILLAR_JD_DELAY}
            rm={rm}
          />

          {/* Central architectural separator */}
          <motion.div
            className={styles.centralSep}
            initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: dur(1.2), delay: d(0.72), ease: EASE_C }}
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />

          {/* Philosophy Pillar — left on desktop via CSS order: -1 */}
          <EducationPillar
            entry={philDegree}
            isPrimary={false}
            isInView={isInView}
            baseDelay={ANIM.PILLAR_PHIL_DELAY}
            rm={rm}
          />
        </div>

        {/* Lower architectural beam */}
        <motion.div
          className={styles.beam}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: dur(ANIM.BEAM_DURATION), delay: d(ANIM.LOWER_BEAM_DELAY), ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* ── Pathway: Philosophy → Law → Governance ── */}
        <IntellectualPathway isInView={isInView} rm={rm} />

        {/* Narrative inscription */}
        <motion.p
          className={styles.inscription}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(1.2), delay: d(ANIM.INSCRIPTION_DELAY) }}
        >
          Where philosophical inquiry became legal precision,
          and legal precision became enterprise governance.
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
//  EDUCATION PILLAR — individual degree card
//  Handles its own staggered internal reveal + hover sweep
// ═══════════════════════════════════════════════════════
function EducationPillar({ entry, isPrimary, isInView, baseDelay, rm }) {
  const [hovered, setHovered] = useState(false);

  // Parse honors into primary (Cum Laude) and secondary (rest)
  const honorsParts   = entry.honors?.split(' · ') ?? [];
  const honorPrimary  = honorsParts[0] ?? '';
  const honorSecondary = honorsParts.slice(1).join(' · ');

  const d   = (offset) => rm ? 0 : baseDelay + offset;
  const dur = (val)    => rm ? 0 : val;

  return (
    <motion.article
      className={`${styles.pillar} ${isPrimary ? styles.pillarPrimary : styles.pillarFoundation}`}
      initial={{ opacity: 0, y: rm ? 0 : 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: dur(ANIM.PILLAR_DURATION), delay: d(0), ease: EASE_C }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={rm ? {} : { y: -7, transition: { duration: 0.38, ease: EASE } }}
    >
      {/* Light sweep across card on hover */}
      <AnimatePresence>
        {hovered && !rm && (
          <motion.div
            key="sweep"
            className={styles.lightSweep}
            initial={{ x: '-110%', opacity: 1 }}
            animate={{ x: '220%', opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Abbreviated credential label */}
      <motion.span
        className={styles.pillarAbbrev}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: dur(0.6), delay: d(ANIM.ABBREV_OFFSET) }}
      >
        {entry.abbreviation}
      </motion.span>

      {/* Degree title — rises upward */}
      <motion.h3
        className={styles.pillarTitle}
        initial={{ opacity: 0, y: rm ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: dur(0.85), delay: d(ANIM.TITLE_OFFSET), ease: EASE }}
      >
        {entry.degree}
      </motion.h3>

      {/* Gold rule — draws from left */}
      <motion.div
        className={styles.pillarRule}
        initial={{ scaleX: rm ? 1 : 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: dur(0.8), delay: d(ANIM.TOP_LINE_OFFSET), ease: EASE_C }}
        style={{ transformOrigin: 'left' }}
        aria-hidden="true"
      />

      {/* Primary honor (e.g. Cum Laude) */}
      {honorPrimary && (
        <motion.p
          className={styles.pillarHonorPrimary}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.7), delay: d(ANIM.HONOR_PRIMARY_OFFSET) }}
        >
          {honorPrimary}
        </motion.p>
      )}

      {/* Secondary honors */}
      {honorSecondary && (
        <motion.p
          className={styles.pillarHonorSecondary}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.7), delay: d(ANIM.HONOR_SECONDARY_OFFSET) }}
        >
          {honorSecondary}
        </motion.p>
      )}

      {/* Institution name */}
      <motion.p
        className={styles.pillarInstitution}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: dur(0.7), delay: d(ANIM.INSTITUTION_OFFSET) }}
      >
        {entry.institution}
      </motion.p>

      {/* Foundation note (B.A. only — no honors to show) */}
      {!isPrimary && (
        <motion.p
          className={styles.pillarNote}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: dur(0.6), delay: d(ANIM.NOTE_OFFSET) }}
        >
          The analytical foundation
        </motion.p>
      )}
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════
//  INTELLECTUAL PATHWAY
//  Animated line drawing: Philosophy → Law → Governance
//  SVG viewBox: 0 0 1000 90
// ═══════════════════════════════════════════════════════
const PATHWAY_NODES = [
  { cx: 80,  label: 'Philosophy' },
  { cx: 500, label: 'Law'        },
  { cx: 920, label: 'Governance' },
];

function IntellectualPathway({ isInView, rm }) {
  const d   = (val) => rm ? 0 : val;
  const dur = (val) => rm ? 0 : val;

  return (
    <div className={styles.pathway} aria-label="Intellectual journey: Philosophy, Law, Governance">
      <svg
        viewBox="0 0 1000 90"
        className={styles.pathwaySvg}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Main connecting line */}
        <motion.path
          d="M 80 34 L 920 34"
          stroke="rgba(212,168,67,0.3)"
          strokeWidth={1}
          fill="none"
          initial={rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: dur(ANIM.PATHWAY_DURATION), delay: d(ANIM.PATHWAY_DELAY), ease: EASE },
            opacity:    { duration: 0.3, delay: d(ANIM.PATHWAY_DELAY) },
          }}
        />

        {/* Nodes — outer ring + inner dot */}
        {PATHWAY_NODES.map(({ cx }, i) => (
          <g key={i}>
            <motion.circle
              cx={cx} cy={34} r={8}
              fill="none"
              stroke="rgba(212,168,67,0.55)"
              strokeWidth={1.4}
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

        {/* Labels below nodes */}
        {PATHWAY_NODES.map(({ cx, label }, i) => (
          <motion.text
            key={label}
            x={cx}
            y={74}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: dur(0.6), delay: d(ANIM.PATHWAY_NODE_DELAYS[i] + ANIM.PATHWAY_LABEL_OFFSET) }}
            style={{
              fontFamily: 'Inter,-apple-system,sans-serif',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fill: 'rgba(212,168,67,0.75)',
            }}
          >
            {label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}
