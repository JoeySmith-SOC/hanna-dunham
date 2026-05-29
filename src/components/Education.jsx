import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { education } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Education.module.css';

const EASE    = [0.25, 0.46, 0.45, 0.94];
const EASE_C  = [0.16, 1, 0.3, 1];

// ─── Perspective grid geometry ────────────────────────────────────────────────
// SVG viewBox: 1200 × 600
// Vanishing point: (600, 180)
// Outer diagonals: (0,600)→VP and (1200,600)→VP

const VP   = { x: 600, y: 180 };
const SW   = 1200;
const SH   = 600;

// Radiating lines: VP → bottom edge (9 lines, spread evenly)
const RAD_LINES = [0, 150, 300, 450, 600, 750, 900, 1050, 1200].map(x => ({
  d: `M ${VP.x} ${VP.y} L ${x} ${SH}`,
}));

// Horizontal cross-lines at y = 300 … 500 plus bottom edge
const CROSS_LINES = [300, 360, 420, 480, 540].map(y => {
  const t  = (SH - y) / (SH - VP.y);
  const xl = parseFloat((t * VP.x).toFixed(1));
  const xr = parseFloat((SW - xl).toFixed(1));
  // Opacity increases as line approaches viewer (lower y = closer to VP = fainter)
  const opacity = parseFloat((0.018 + ((y - 300) / 240) * 0.055).toFixed(4));
  return { d: `M ${xl} ${y} L ${xr} ${y}`, opacity };
});
CROSS_LINES.push({ d: `M 0 ${SH} L ${SW} ${SH}`, opacity: 0.09 });

export default function Education() {
  const ref       = useRef(null);
  const isInView  = useInView(ref, { once: true, margin: '-80px' });
  const rm        = useReducedMotion();

  const lawDegree  = education[0]; // J.D. — primary credential
  const philDegree = education[1]; // B.A. Philosophy — analytical foundation

  // Split J.D. honors string into primary + secondary
  const honorsParts    = lawDegree.honors?.split(' · ') ?? [];
  const primaryHonor   = honorsParts[0] ?? '';                   // Cum Laude
  const secondaryHonors = honorsParts.slice(1).join(' · ');      // Litigation Concentration · ...

  const pathInit = rm
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: 0, opacity: 0 };

  const pathTarget = isInView
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: 0, opacity: 0 };

  return (
    <section
      id="education"
      className={styles.section}
      aria-label="Education"
      ref={ref}
    >
      {/* ── Atmospheric backdrop ── */}
      <div className={styles.atmosphere} aria-hidden="true">
        {/* Diffuse gold light from above — the "window" */}
        <div className={styles.atmosphereOuter} />
        <div className={styles.atmosphereCore} />

        {/* Perspective floor grid */}
        <svg
          viewBox={`0 0 ${SW} ${SH}`}
          className={styles.perspectiveSvg}
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
          focusable="false"
        >
          {/* Radiating lines from vanishing point */}
          {RAD_LINES.map(({ d }, i) => (
            <motion.path
              key={`r${i}`}
              d={d}
              stroke="rgba(212,168,67,0.042)"
              strokeWidth={0.5}
              fill="none"
              initial={pathInit}
              animate={pathTarget}
              transition={{
                pathLength: { duration: rm ? 0 : 1.6, delay: rm ? 0 : 0.05 + i * 0.06, ease: EASE },
                opacity:    { duration: 0.25, delay: rm ? 0 : 0.05 + i * 0.06 },
              }}
            />
          ))}
          {/* Depth cross-lines */}
          {CROSS_LINES.map(({ d, opacity }, i) => (
            <motion.path
              key={`c${i}`}
              d={d}
              stroke={`rgba(212,168,67,${opacity})`}
              strokeWidth={0.55}
              fill="none"
              initial={rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: rm ? 0 : 0.85, delay: rm ? 0 : 0.65 + i * 0.1, ease: EASE },
                opacity:    { duration: 0.3,  delay: rm ? 0 : 0.65 + i * 0.1 },
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── Content ── */}
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
          transition={{ duration: rm ? 0 : 1.6, delay: rm ? 0 : 0.38, ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Degree pair — J.D. is DOM-first (mobile priority); CSS order puts Philosophy left */}
        <div className={styles.degreePair}>

          {/* J.D. — primary credential, displayed RIGHT on desktop */}
          <motion.div
            className={`${styles.degree} ${styles.degreePrimary}`}
            initial={{ opacity: 0, y: rm ? 0 : 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.95, delay: rm ? 0 : 0.82, ease: EASE }}
          >
            <span className={styles.degreeAbbrev}>{lawDegree.abbreviation}</span>
            <h3 className={styles.degreeTitle}>{lawDegree.degree}</h3>
            <div className={styles.degreeDivider} aria-hidden="true" />
            {primaryHonor && (
              <p className={styles.honorPrimary}>{primaryHonor}</p>
            )}
            {secondaryHonors && (
              <p className={styles.honorSecondary}>{secondaryHonors}</p>
            )}
            <p className={styles.degreeInstitution}>{lawDegree.institution}</p>
          </motion.div>

          {/* Central architectural separator */}
          <motion.div
            className={styles.centralSep}
            initial={{ scaleY: rm ? 1 : 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: rm ? 0 : 1.1, delay: rm ? 0 : 0.62, ease: EASE_C }}
            style={{ transformOrigin: 'center' }}
            aria-hidden="true"
          />

          {/* B.A. Philosophy — analytical foundation, displayed LEFT on desktop */}
          <motion.div
            className={`${styles.degree} ${styles.degreeFoundation}`}
            initial={{ opacity: 0, y: rm ? 0 : 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.95, delay: rm ? 0 : 0.68, ease: EASE }}
          >
            <span className={styles.degreeAbbrev}>{philDegree.abbreviation}</span>
            <h3 className={styles.degreeTitle}>{philDegree.degree}</h3>
            <div className={styles.degreeDivider} aria-hidden="true" />
            <p className={styles.degreeInstitution}>{philDegree.institution}</p>
            <p className={styles.foundationNote}>The analytical foundation</p>
          </motion.div>

        </div>

        {/* Lower architectural beam */}
        <motion.div
          className={styles.beam}
          initial={{ scaleX: rm ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: rm ? 0 : 1.6, delay: rm ? 0 : 0.98, ease: EASE_C }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Narrative inscription */}
        <motion.p
          className={styles.inscription}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: rm ? 0 : 1.2, delay: rm ? 0 : 1.2 }}
        >
          Philosophy · Law · Governance
        </motion.p>

      </div>
    </section>
  );
}
