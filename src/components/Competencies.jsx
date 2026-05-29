import ScrollReveal from './ScrollReveal';
import { competencies } from '../data/content';
import styles from './Competencies.module.css';

export default function Competencies() {
  return (
    <section id="competencies" className={styles.section} aria-label="Core Competencies">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <ScrollReveal>
            <span className={styles.label}>Competencies</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className={styles.heading}>Core Expertise</h2>
          </ScrollReveal>
        </div>

        {/* Card grid */}
        <div className={styles.grid}>
          {competencies.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 0.08} fromY={20}>
              <article className={styles.card}>
                {/* Top: index + category */}
                <div className={styles.cardTop}>
                  <span className={styles.cardIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.category}>{group.category}</h3>
                </div>

                {/* Skill list */}
                <ul className={styles.skills} role="list">
                  {group.skills.map((skill) => (
                    <li key={skill} className={styles.skill}>
                      <span className={styles.skillLine} aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
