import { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import { experience, competencies } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './ExperienceExpertise.module.css';

// ─── Capability network constants ────────────────────────────────────────────
// 500×500 SVG coordinate space (square, fits narrow column cleanly)

const NW = 500;
const NH = 500;

const CAP_NODES = [
  { idx: 0, cx: 250, cy: 250, isHub: true  }, // Enterprise Governance — center hub
  { idx: 1, cx: 408, cy: 95,  isHub: false }, // Financial Operations  — top-right
  { idx: 2, cx: 92,  cy: 95,  isHub: false }, // Contract Analysis     — top-left
  { idx: 3, cx: 408, cy: 405, isHub: false }, // Portfolio Integrity   — bottom-right
  { idx: 4, cx: 92,  cy: 405, isHub: false }, // Leadership            — bottom-left
];

const CAP_LABELS = [
  ['Enterprise', 'Governance'],
  ['Financial',  'Operations'],
  ['Contract',   'Analysis'  ],
  ['Portfolio',  'Integrity' ],
  ['Leadership', null        ],
];

// SVG y-baseline positions for labels (above top nodes, below bottom nodes)
const CAP_LABEL_Y = [
  { y1: 190, y2: 204 }, // Hub: above
  { y1: 52,  y2: 66  }, // top-right: above
  { y1: 52,  y2: 66  }, // top-left: above
  { y1: 433, y2: 447 }, // bottom-right: below
  { y1: 433, y2: 447 }, // bottom-left: below
];

const CAP_HUB  = CAP_NODES[0];
const CAP_SATS = CAP_NODES.slice(1);

// ─── Easing constants ─────────────────────────────────────────────────────────
const EASE      = [0.25, 0.46, 0.45, 0.94];
const EASE_C    = [0.16, 1, 0.3, 1];

// First N experience entries receive full description; the rest are condensed rows
const DETAIL_THRESHOLD = 1;

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExperienceExpertise() {
  const [activeCapability, setActiveCapability] = useState(0);
  const sectionRef  = useRef(null);
  const networkRef  = useRef(null);
  const rm          = useReducedMotion();

  // Scroll-linked timeline line draw
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 40%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Capability network enters viewport once
  const networkInView = useInView(networkRef, { once: true, margin: '-60px' });

  // pathLength helpers (respects reduced-motion)
  const connInit  = rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const connAnim  = networkInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };

  const activate = (idx) => setActiveCapability(idx);

  return (
    <section
      id="experience"
      className={styles.section}
      aria-label="Career Timeline and Core Capabilities"
      ref={sectionRef}
    >
      <div className={styles.container}>

        {/* ── Section header ── */}
        <div className={styles.sectionHeader}>
          <ScrollReveal>
            <span className={styles.sectionLabel}>Experience & Expertise</span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 className={styles.sectionHeading}>Career & Capability</h2>
          </ScrollReveal>
        </div>

        {/* ── Desktop split layout ── */}
        <div className={styles.split}>

          {/* ─── LEFT: Career Timeline ─── */}
          <div className={styles.leftColumn}>
            <span className={styles.columnLabel} aria-hidden="true">
              Career Timeline
            </span>

            <div className={styles.timeline}>
              {/* Scroll-driven growing line */}
              <div className={styles.lineTrack} aria-hidden="true">
                <motion.div
                  className={styles.line}
                  style={{
                    scaleY: rm ? 1 : lineScaleY,
                    transformOrigin: 'top center',
                  }}
                />
              </div>

              {/* Timeline entries */}
              <div className={styles.entries}>
                {experience.map((entry, i) => (
                  <TimelineEntry
                    key={entry.id}
                    entry={entry}
                    index={i}
                    isCurrent={i === 0}
                    showDetail={i < DETAIL_THRESHOLD}
                    rm={rm}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Capability Network (sticky) ─── */}
          <div className={styles.rightColumn} ref={networkRef}>
            <span className={styles.columnLabel} aria-hidden="true">
              Capability Framework
            </span>

            {/* SVG Network */}
            <div className={styles.networkWrap}>
              <svg
                viewBox={`0 0 ${NW} ${NH}`}
                className={styles.networkSvg}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <radialGradient id="eeHubAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="rgba(212,168,67,0.12)" />
                    <stop offset="100%" stopColor="rgba(212,168,67,0)"    />
                  </radialGradient>
                  <filter id="eeSatGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="eeHubGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="9" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Hub ambient haze */}
                <circle cx={CAP_HUB.cx} cy={CAP_HUB.cy} r={88} fill="url(#eeHubAura)" />

                {/* Outer frame — architectural skeleton (very faint) */}
                {[
                  `M ${CAP_SATS[1].cx} ${CAP_SATS[1].cy} L ${CAP_SATS[0].cx} ${CAP_SATS[0].cy}`, // top bar
                  `M ${CAP_SATS[3].cx} ${CAP_SATS[3].cy} L ${CAP_SATS[2].cx} ${CAP_SATS[2].cy}`, // bottom bar
                  `M ${CAP_SATS[0].cx} ${CAP_SATS[0].cy} L ${CAP_SATS[2].cx} ${CAP_SATS[2].cy}`, // right col
                  `M ${CAP_SATS[1].cx} ${CAP_SATS[1].cy} L ${CAP_SATS[3].cx} ${CAP_SATS[3].cy}`, // left col
                ].map((d, i) => (
                  <motion.path
                    key={`frame-${i}`}
                    d={d}
                    stroke={i < 2 ? 'rgba(212,168,67,0.055)' : 'rgba(212,168,67,0.038)'}
                    strokeWidth={0.55}
                    fill="none"
                    initial={rm ? { opacity: 1 } : { opacity: 0 }}
                    animate={networkInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: rm ? 0 : 1.3 + i * 0.06 }}
                  />
                ))}

                {/* Hub-to-satellite connection lines */}
                {CAP_SATS.map(({ idx, cx, cy }, i) => {
                  const isActive = activeCapability === idx;
                  return (
                    <motion.path
                      key={`conn-${idx}`}
                      d={`M ${CAP_HUB.cx} ${CAP_HUB.cy} L ${cx} ${cy}`}
                      stroke={isActive ? 'rgba(212,168,67,0.44)' : 'rgba(212,168,67,0.1)'}
                      strokeWidth={isActive ? 1.2 : 0.7}
                      fill="none"
                      initial={connInit}
                      animate={connAnim}
                      transition={{
                        pathLength: {
                          duration: rm ? 0 : 1.0,
                          delay: rm ? 0 : 0.18 + i * 0.14,
                          ease: EASE,
                        },
                        opacity: { duration: 0.25, delay: rm ? 0 : 0.18 + i * 0.14 },
                      }}
                      style={{ transition: 'stroke 340ms ease, stroke-width 340ms ease' }}
                    />
                  );
                })}

                {/* Hub node */}
                <g
                  onClick={() => activate(0)}
                  onMouseEnter={() => activate(0)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${competencies[0].category} — activate to view`}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && activate(0)}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {/* Rotating orbit ring */}
                  <motion.circle
                    cx={CAP_HUB.cx} cy={CAP_HUB.cy} r={36}
                    fill="none"
                    stroke={activeCapability === 0 ? 'rgba(212,168,67,0.28)' : 'rgba(212,168,67,0.09)'}
                    strokeWidth={0.75}
                    strokeDasharray="3 7"
                    initial={rm ? { opacity: 1 } : { opacity: 0 }}
                    animate={networkInView
                      ? { opacity: 1, rotate: rm ? 0 : 360 }
                      : { opacity: 0 }
                    }
                    transition={{
                      opacity: { duration: 0.5, delay: rm ? 0 : 0.48 },
                      rotate: rm ? {} : { duration: 66, repeat: Infinity, ease: 'linear' },
                    }}
                    style={{
                      transformOrigin: `${CAP_HUB.cx}px ${CAP_HUB.cy}px`,
                      transition: 'stroke 340ms ease',
                    }}
                  />
                  {/* Main circle */}
                  <motion.circle
                    cx={CAP_HUB.cx} cy={CAP_HUB.cy} r={21}
                    fill={activeCapability === 0 ? 'rgba(212,168,67,0.14)' : 'rgba(212,168,67,0.05)'}
                    stroke={activeCapability === 0 ? 'rgba(212,168,67,0.65)' : 'rgba(212,168,67,0.26)'}
                    strokeWidth={1.5}
                    filter={activeCapability === 0 ? 'url(#eeHubGlow)' : undefined}
                    initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={networkInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: rm ? 0 : 0.52, delay: rm ? 0 : 0.48, ease: EASE_C }}
                    style={{
                      transformOrigin: `${CAP_HUB.cx}px ${CAP_HUB.cy}px`,
                      transition: 'fill 340ms ease, stroke 340ms ease',
                    }}
                  />
                  <circle cx={CAP_HUB.cx} cy={CAP_HUB.cy} r={4} fill="rgba(212,168,67,0.82)" />
                </g>

                {/* Satellite nodes */}
                {CAP_SATS.map(({ idx, cx, cy }, i) => {
                  const isActive = activeCapability === idx;
                  return (
                    <g
                      key={`sat-${idx}`}
                      onClick={() => activate(idx)}
                      onMouseEnter={() => activate(idx)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${competencies[idx].category} — activate to view`}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && activate(idx)}
                      style={{ cursor: 'pointer', outline: 'none' }}
                    >
                      {/* Halo */}
                      <motion.circle
                        cx={cx} cy={cy} r={19}
                        fill="none"
                        stroke={isActive ? 'rgba(212,168,67,0.2)' : 'rgba(212,168,67,0.055)'}
                        strokeWidth={0.7}
                        initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        animate={networkInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: rm ? 0 : 0.48, delay: rm ? 0 : 0.5 + i * 0.1, ease: EASE_C }}
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transition: 'stroke 340ms ease',
                        }}
                      />
                      {/* Main circle */}
                      <motion.circle
                        cx={cx} cy={cy} r={12}
                        fill={isActive ? 'rgba(212,168,67,0.15)' : 'rgba(212,168,67,0.04)'}
                        stroke={isActive ? 'rgba(212,168,67,0.58)' : 'rgba(212,168,67,0.18)'}
                        strokeWidth={0.9}
                        filter={isActive ? 'url(#eeSatGlow)' : undefined}
                        initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        animate={networkInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: rm ? 0 : 0.42, delay: rm ? 0 : 0.56 + i * 0.1, ease: EASE_C }}
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transition: 'fill 340ms ease, stroke 340ms ease',
                        }}
                      />
                      <circle
                        cx={cx} cy={cy} r={2.5}
                        fill={isActive ? 'rgba(212,168,67,0.95)' : 'rgba(212,168,67,0.4)'}
                        style={{ transition: 'fill 340ms ease' }}
                      />
                    </g>
                  );
                })}

                {/* Labels */}
                {CAP_NODES.map(({ idx, cx }, i) => {
                  const isActive = activeCapability === idx;
                  const lc = CAP_LABEL_Y[idx];
                  const [l1, l2] = CAP_LABELS[idx];
                  const labelFill = isActive
                    ? 'rgba(212,168,67,0.95)'
                    : 'rgba(255,255,255,0.34)';
                  const labelStyle = {
                    fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,sans-serif',
                    fontSize: '8px',
                    fontWeight: '500',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fill: labelFill,
                    transition: 'fill 340ms ease',
                  };
                  return (
                    <motion.g
                      key={`lbl-${idx}`}
                      initial={rm ? { opacity: 1 } : { opacity: 0 }}
                      animate={networkInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: rm ? 0 : 0.38, delay: rm ? 0 : 0.8 + i * 0.06 }}
                      onClick={() => activate(idx)}
                      onMouseEnter={() => activate(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <text x={cx} y={lc.y1} textAnchor="middle" style={labelStyle}>
                        {l1}
                      </text>
                      {l2 && (
                        <text x={cx} y={lc.y2} textAnchor="middle" style={labelStyle}>
                          {l2}
                        </text>
                      )}
                    </motion.g>
                  );
                })}
              </svg>
            </div>

            {/* Skills panel */}
            <div className={styles.skillsPanel} aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability}
                  className={styles.skillsPanelInner}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <div className={styles.skillsRow}>
                    <span className={styles.skillsIndex} aria-hidden="true">
                      {String(activeCapability + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.skillsCategory}>
                      {competencies[activeCapability].category}
                    </h3>
                  </div>
                  <ul className={styles.skillsList} role="list">
                    {competencies[activeCapability].skills.map((skill, i) => (
                      <motion.li
                        key={skill}
                        className={styles.skillItem}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.048, ease: EASE }}
                      >
                        <span className={styles.skillDash} aria-hidden="true">—</span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Timeline entry ────────────────────────────────────────────────────────────
function TimelineEntry({ entry, index, isCurrent, showDetail }) {
  const maxTags = showDetail ? entry.tags.length : 3;

  return (
    <ScrollReveal delay={index * 0.055} className={styles.entry}>
      {/* Timeline dot */}
      <div
        className={`${styles.dot} ${isCurrent ? styles.dotCurrent : ''}`}
        aria-hidden="true"
      >
        <div className={styles.dotCore} />
      </div>

      <div className={styles.entryBody}>
        {/* Period + optional current badge */}
        <div className={styles.entryMeta}>
          <span className={styles.period}>{entry.period}</span>
          {isCurrent && (
            <span className={styles.currentBadge} aria-label="Current position">
              Current
            </span>
          )}
        </div>

        {/* Company */}
        <div className={styles.companyLine}>
          <span className={styles.company}>{entry.company}</span>
          {entry.subcompany && (
            <span className={styles.subcompany}>&nbsp;·&nbsp;{entry.subcompany}</span>
          )}
        </div>

        {/* Role */}
        <h3 className={`${styles.role} ${isCurrent ? styles.roleCurrent : ''}`}>
          {entry.role}
        </h3>

        {/* Description — only for showDetail entries */}
        {showDetail && (
          <p className={styles.description}>{entry.description}</p>
        )}

        {/* Tags — condensed for non-detail entries */}
        {entry.tags.length > 0 && (
          <div className={styles.tags} aria-label="Skills used">
            {entry.tags.slice(0, maxTags).map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            {!showDetail && entry.tags.length > maxTags && (
              <span className={styles.tagMore} aria-hidden="true">
                +{entry.tags.length - maxTags}
              </span>
            )}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
