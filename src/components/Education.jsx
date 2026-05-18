import ScrollReveal from './ScrollReveal';
import { education } from '../data/content';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={styles.section} aria-label="Education">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: header */}
          <div className={styles.left}>
            <ScrollReveal>
              <span className={styles.label}>Education</span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className={styles.heading}>Academic Background</h2>
            </ScrollReveal>
          </div>

          {/* Right: credentials */}
          <div className={styles.right}>
            {education.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1} className={styles.credential}>
                <div className={styles.credentialTop}>
                  <span className={styles.abbreviation}>{item.abbreviation}</span>
                  <span className={styles.year}>{item.year}</span>
                </div>
                <h3 className={styles.degree}>{item.degree}</h3>
                <p className={styles.institution}>{item.institution}</p>
                {item.honors && (
                  <p className={styles.honors}>{item.honors}</p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
