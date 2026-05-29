import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { competencies } from '../data/content';
import ScrollReveal from './ScrollReveal';
import styles from './Competencies.module.css';

// SVG canvas coordinate space
const W = 800;
const H = 460;

// Five nodes: hub at center, four satellites at corners
const NODES = [
  { idx: 0, cx: 400, cy: 230, isHub: true  },  // Enterprise Governance
  { idx: 1, cx: 638, cy: 100, isHub: false },  // Financial Operations (top-right)
  { idx: 2, cx: 162, cy: 100, isHub: false },  // Contract Analysis    (top-left)
  { idx: 3, cx: 638, cy: 360, isHub: false },  // Portfolio Integrity  (bottom-right)
  { idx: 4, cx: 162, cy: 360, isHub: false },  // Leadership           (bottom-left)
];

// Two-line labels per node
const NODE_LABELS = [
  ['Enterprise', 'Governance'],
  ['Financial',  'Operations'],
  ['Contract',   'Analysis'  ],
  ['Portfolio',  'Integrity' ],
  ['Leadership', null        ],
];

// SVG y-baseline for each label line (above/below respective node)
const LABEL_Y = [
  { y1: 172, y2: 186 },  // Hub: above
  { y1: 58,  y2: 72  },  // Top-right: above
  { y1: 58,  y2: 72  },  // Top-left: above
  { y1: 392, y2: 406 },  // Bottom-right: below
  { y1: 392, y2: 406 },  // Bottom-left: below
];

const HUB = NODES[0];
const SATELLITES = NODES.slice(1);
const EASE = [0.25, 0.46, 0.45, 0.94];
const EASE_CINEMA = [0.16, 1, 0.3, 1];

export default function Competencies() {
  const [activeIdx, setActiveIdx] = useState(0);
  const networkRef = useRef(null);
  const isInView = useInView(networkRef, { once: true, margin: '-80px' });
  const rm = useReducedMotion();

  const activate = (idx) => setActiveIdx(idx);

  // pathLength initial/animate helpers
  const lineInitial = rm ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const lineAnimate = isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };

  return (
    <section id="competencies" className={styles.section} aria-label="Core Competencies">
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <ScrollReveal>
            <span className={styles.label}>Competencies</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className={styles.heading}>Capability Framework</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className={styles.subheading}>
              An integrated governance practice spanning legal, financial, and operational domains.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Network ── */}
        <div className={styles.networkWrap} ref={networkRef}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className={styles.networkSvg}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              {/* Hub ambient glow */}
              <radialGradient id="compHubAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(212,168,67,0.11)" />
                <stop offset="100%" stopColor="rgba(212,168,67,0)"    />
              </radialGradient>
              {/* Active satellite glow */}
              <filter id="compSatGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Hub glow */}
              <filter id="compHubGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient glow behind hub */}
            <circle cx={HUB.cx} cy={HUB.cy} r={96} fill="url(#compHubAura)" />

            {/* Outer frame edges — very faint architectural lines */}
            <motion.path
              d={`M ${NODES[2].cx} ${NODES[2].cy} L ${NODES[1].cx} ${NODES[1].cy}`}
              stroke="rgba(212,168,67,0.055)" strokeWidth={0.6} fill="none"
              initial={rm ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: rm ? 0 : 1.4 }}
            />
            <motion.path
              d={`M ${NODES[4].cx} ${NODES[4].cy} L ${NODES[3].cx} ${NODES[3].cy}`}
              stroke="rgba(212,168,67,0.055)" strokeWidth={0.6} fill="none"
              initial={rm ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: rm ? 0 : 1.5 }}
            />
            <motion.path
              d={`M ${NODES[2].cx} ${NODES[2].cy} L ${NODES[4].cx} ${NODES[4].cy}`}
              stroke="rgba(212,168,67,0.04)" strokeWidth={0.5} fill="none"
              initial={rm ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: rm ? 0 : 1.55 }}
            />
            <motion.path
              d={`M ${NODES[1].cx} ${NODES[1].cy} L ${NODES[3].cx} ${NODES[3].cy}`}
              stroke="rgba(212,168,67,0.04)" strokeWidth={0.5} fill="none"
              initial={rm ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: rm ? 0 : 1.6 }}
            />

            {/* Hub-to-satellite connection lines */}
            {SATELLITES.map(({ idx, cx, cy }, i) => {
              const isConn = activeIdx === idx;
              return (
                <motion.path
                  key={`conn-${idx}`}
                  d={`M ${HUB.cx} ${HUB.cy} L ${cx} ${cy}`}
                  stroke={isConn ? 'rgba(212,168,67,0.42)' : 'rgba(212,168,67,0.11)'}
                  strokeWidth={isConn ? 1.2 : 0.75}
                  fill="none"
                  initial={lineInitial}
                  animate={lineAnimate}
                  transition={{
                    pathLength: { duration: rm ? 0 : 1.05, delay: rm ? 0 : 0.25 + i * 0.14, ease: EASE },
                    opacity:    { duration: 0.3, delay: rm ? 0 : 0.25 + i * 0.14 },
                  }}
                  style={{ transition: 'stroke 360ms ease, stroke-width 360ms ease' }}
                />
              );
            })}

            {/* Hub node */}
            <g
              onClick={() => activate(0)}
              onMouseEnter={() => activate(0)}
              tabIndex={0}
              role="button"
              aria-label={`${competencies[0].category} — activate to explore`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && activate(0)}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              {/* Slow rotating dashed orbit ring */}
              <motion.circle
                cx={HUB.cx} cy={HUB.cy} r={40}
                fill="none"
                stroke={activeIdx === 0 ? 'rgba(212,168,67,0.28)' : 'rgba(212,168,67,0.1)'}
                strokeWidth={0.8}
                strokeDasharray="3 7"
                initial={rm ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: 0 }}
                animate={isInView
                  ? { opacity: 1, rotate: rm ? 0 : 360 }
                  : { opacity: 0, rotate: 0 }
                }
                transition={{
                  opacity: { duration: 0.5, delay: rm ? 0 : 0.5 },
                  rotate:  rm ? {} : { duration: 64, repeat: Infinity, ease: 'linear' },
                }}
                style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px`, transition: 'stroke 360ms ease' }}
              />
              {/* Main hub circle */}
              <motion.circle
                cx={HUB.cx} cy={HUB.cy} r={24}
                fill={activeIdx === 0 ? 'rgba(212,168,67,0.14)' : 'rgba(212,168,67,0.05)'}
                stroke={activeIdx === 0 ? 'rgba(212,168,67,0.65)' : 'rgba(212,168,67,0.28)'}
                strokeWidth={1.5}
                filter={activeIdx === 0 ? 'url(#compHubGlow)' : undefined}
                initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: rm ? 0 : 0.55, delay: rm ? 0 : 0.5, ease: EASE_CINEMA }}
                style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px`, transition: 'fill 360ms ease, stroke 360ms ease' }}
              />
              {/* Center dot */}
              <circle cx={HUB.cx} cy={HUB.cy} r={4.5} fill="rgba(212,168,67,0.82)" />
            </g>

            {/* Satellite nodes */}
            {SATELLITES.map(({ idx, cx, cy }, i) => {
              const isActive = activeIdx === idx;
              return (
                <g
                  key={`sat-${idx}`}
                  onClick={() => activate(idx)}
                  onMouseEnter={() => activate(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${competencies[idx].category} — activate to explore`}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && activate(idx)}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {/* Outer halo */}
                  <motion.circle
                    cx={cx} cy={cy} r={22}
                    fill="none"
                    stroke={isActive ? 'rgba(212,168,67,0.22)' : 'rgba(212,168,67,0.06)'}
                    strokeWidth={0.75}
                    initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: rm ? 0 : 0.5, delay: rm ? 0 : 0.55 + i * 0.1, ease: EASE_CINEMA }}
                    style={{ transformOrigin: `${cx}px ${cy}px`, transition: 'stroke 360ms ease' }}
                  />
                  {/* Main circle */}
                  <motion.circle
                    cx={cx} cy={cy} r={14}
                    fill={isActive ? 'rgba(212,168,67,0.16)' : 'rgba(212,168,67,0.04)'}
                    stroke={isActive ? 'rgba(212,168,67,0.58)' : 'rgba(212,168,67,0.2)'}
                    strokeWidth={1}
                    filter={isActive ? 'url(#compSatGlow)' : undefined}
                    initial={rm ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: rm ? 0 : 0.45, delay: rm ? 0 : 0.62 + i * 0.1, ease: EASE_CINEMA }}
                    style={{ transformOrigin: `${cx}px ${cy}px`, transition: 'fill 360ms ease, stroke 360ms ease' }}
                  />
                  {/* Center dot */}
                  <circle
                    cx={cx} cy={cy} r={3}
                    fill={isActive ? 'rgba(212,168,67,0.95)' : 'rgba(212,168,67,0.42)'}
                    style={{ transition: 'fill 360ms ease' }}
                  />
                </g>
              );
            })}

            {/* Node labels */}
            {NODES.map(({ idx, cx }, i) => {
              const isActive = activeIdx === idx;
              const lc = LABEL_Y[idx];
              const [l1, l2] = NODE_LABELS[idx];
              const labelFill = isActive ? 'rgba(212,168,67,0.95)' : 'rgba(255,255,255,0.36)';
              const labelStyle = {
                fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,sans-serif',
                fontSize: '9px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fill: labelFill,
                transition: 'fill 360ms ease',
              };
              return (
                <motion.g
                  key={`lbl-${idx}`}
                  initial={rm ? { opacity: 1 } : { opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: rm ? 0 : 0.45, delay: rm ? 0 : 0.85 + i * 0.07 }}
                  onClick={() => activate(idx)}
                  onMouseEnter={() => activate(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <text x={cx} y={lc.y1} textAnchor="middle" style={labelStyle}>{l1}</text>
                  {l2 && <text x={cx} y={lc.y2} textAnchor="middle" style={labelStyle}>{l2}</text>}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* ── Skills panel ── */}
        <div className={styles.skillsPanel} aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              className={styles.skillsPanelInner}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.26, ease: EASE }}
            >
              <div className={styles.skillsRow}>
                <span className={styles.skillsIndex} aria-hidden="true">
                  {String(activeIdx + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.skillsCategory}>
                  {competencies[activeIdx].category}
                </h3>
              </div>
              <ul className={styles.skillsList} role="list">
                {competencies[activeIdx].skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: i * 0.055, ease: EASE }}
                  >
                    <span className={styles.skillDash} aria-hidden="true">—</span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile fallback: tabs + skills ── */}
        <div className={styles.mobileFallback}>
          <div className={styles.mobileTabs} role="tablist" aria-label="Competency categories">
            {competencies.map((group, i) => (
              <button
                key={group.category}
                className={`${styles.mobileTab} ${activeIdx === i ? styles.mobileTabActive : ''}`}
                onClick={() => activate(i)}
                role="tab"
                aria-selected={activeIdx === i}
                aria-controls="mobile-skills-panel"
              >
                {group.category.split(' ')[0]}
              </button>
            ))}
          </div>

          <div id="mobile-skills-panel" className={styles.mobilePanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                <h3 className={styles.mobileCategoryName}>
                  {competencies[activeIdx].category}
                </h3>
                <ul role="list" className={styles.mobileSkillList}>
                  {competencies[activeIdx].skills.map((skill) => (
                    <li key={skill} className={styles.mobileSkillItem}>
                      <span className={styles.mobileSkillDash} aria-hidden="true">—</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
