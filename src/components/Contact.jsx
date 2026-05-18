import ScrollReveal from './ScrollReveal';
import { meta } from '../data/content';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Header */}
          <ScrollReveal>
            <span className={styles.label}>Contact</span>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className={styles.heading}>Get in Touch</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className={styles.body}>
              Available for enterprise contract governance, infrastructure portfolio analysis,
              and related advisory engagements.
            </p>
          </ScrollReveal>

          {/* Contact links */}
          <div className={styles.links}>
            <ScrollReveal delay={0.2} className={styles.linkItem}>
              <span className={styles.linkLabel}>Email</span>
              <a
                href={`mailto:${meta.email}`}
                className={styles.link}
                aria-label={`Send email to ${meta.email}`}
              >
                {meta.email}
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.28} className={styles.linkItem}>
              <span className={styles.linkLabel}>LinkedIn</span>
              <a
                href={meta.linkedin}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View LinkedIn profile (opens in new tab)"
              >
                linkedin.com/in/hannadunham
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerName}>
            {meta.name}, {meta.credentials}
          </span>
          <span className={styles.footerCopy}>
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
