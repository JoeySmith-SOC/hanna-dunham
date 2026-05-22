import ScrollReveal from './ScrollReveal';
import { meta } from '../data/content';
import styles from './Downloads.module.css';

export default function Downloads() {
  return (
    <section id="downloads" className={styles.section} aria-label="Downloads">
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.card}>
            {/* Decorative gradient */}
            <div className={styles.cardGlow} aria-hidden="true" />

            <div className={styles.cardContent}>
              <span className={styles.label}>Downloads</span>
              <h2 className={styles.heading}>Full Credentials</h2>
              <p className={styles.body}>
                Download the complete resume for a detailed record of experience,
                qualifications, and accomplishments.
              </p>

              <div className={styles.actions}>
                <a
                  href={meta.resumeUrl}
                  className={styles.downloadBtn}
                  download
                  aria-label="Download resume as PDF"
                >
                  <DownloadIcon />
                  PDF Resume
                </a>
                <a
                  href={meta.resumeDocxUrl}
                  className={styles.docxBtn}
                  download
                  aria-label="Download resume as Word document"
                >
                  <DownloadIcon />
                  Word Resume
                </a>
                <a
                  href={meta.linkedin}
                  className={styles.linkedinBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View LinkedIn profile (opens in new tab)"
                >
                  View LinkedIn
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 1v9M4 7l4 4 4-4M2 13h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
