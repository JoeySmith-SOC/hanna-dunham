import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { experience } from '../data/content';
import styles from './Experience.module.css';

function TimelineEntry({ entry, index }) {
  return (
    <ScrollReveal delay={index * 0.1} className={styles.entry}>
      {/* Dot on timeline */}
      <div className={styles.dot} aria-hidden="true" />

      <div className={styles.entryInner}>
        {/* Header row */}
        <div className={styles.entryHeader}>
          <div className={styles.entryMeta}>
            <span className={styles.period}>{entry.period}</span>
            <span className={styles.company}>{entry.company}</span>
          </div>
          <h3 className={styles.role}>{entry.role}</h3>
        </div>

        {/* Description */}
        <p className={styles.description}>{entry.description}</p>

        {/* Tags */}
        <div className={styles.tags} aria-label="Skills used">
          {entry.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 40%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className={styles.section}
      aria-label="Work Experience"
      ref={sectionRef}
    >
      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.header}>
          <ScrollReveal>
            <span className={styles.label}>Experience</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className={styles.heading}>Career Timeline</h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Animated vertical line */}
          <div className={styles.lineTrack} aria-hidden="true">
            <motion.div
              className={styles.line}
              style={{
                scaleY: prefersReducedMotion ? 1 : lineScaleY,
                transformOrigin: 'top center',
              }}
            />
          </div>

          {/* Entries */}
          <div className={styles.entries}>
            {experience.map((entry, i) => (
              <TimelineEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
