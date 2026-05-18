import ScrollReveal from './ScrollReveal';
import { profile } from '../data/content';
import styles from './Profile.module.css';

export default function Profile() {
  return (
    <section id="profile" className={styles.section} aria-label="Executive Profile">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: label + summary */}
          <div className={styles.left}>
            <ScrollReveal>
              <span className={styles.label}>Profile</span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className={styles.heading}>Executive Summary</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className={styles.summary}>{profile.summary}</p>
            </ScrollReveal>
          </div>

          {/* Right: key highlights */}
          <div className={styles.right}>
            <ScrollReveal delay={0.12}>
              <div className={styles.highlights}>
                {profile.highlights.map((item) => (
                  <div key={item.label} className={styles.highlight}>
                    <span className={styles.highlightLabel}>{item.label}</span>
                    <span className={styles.highlightValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
