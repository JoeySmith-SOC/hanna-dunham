import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { meta } from '../data/content';
import styles from './Hero.module.css';

const ease = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax transforms for floating document frames
  const doc1Y = useTransform(scrollY, [0, 700], [0, 70]);
  const doc2Y = useTransform(scrollY, [0, 700], [0, -45]);
  const doc3Y = useTransform(scrollY, [0, 700], [0, 90]);
  const doc4Y = useTransform(scrollY, [0, 700], [0, -30]);
  const contentY = useTransform(scrollY, [0, 500], [0, -24]);

  // Mouse-tracking spotlight — updates CSS custom property directly on DOM (no React re-render)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const hero = heroRef.current;
    if (!hero) return;

    let raf;
    const onMouseMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mx', `${x}%`);
        hero.style.setProperty('--my', `${y}%`);
      });
    };

    hero.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
      aria-label="Introduction"
      style={{ '--mx': '50%', '--my': '0%' }}
    >
      {/* Background layers */}
      <div className={styles.gradientBase} aria-hidden="true" />
      <div className={styles.ambientLayer} aria-hidden="true" />
      <div className={styles.gradientMouseSpotlight} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.bottomVignette} aria-hidden="true" />

      {/* Floating document frames — decorative, parallax */}
      {!prefersReducedMotion && (
        <div aria-hidden="true">
          <motion.div
            className={`${styles.docFrame} ${styles.doc1}`}
            style={{ y: doc1Y }}
          >
            <div className={styles.docInnerLines} />
          </motion.div>
          <motion.div
            className={`${styles.docFrame} ${styles.doc2}`}
            style={{ y: doc2Y }}
          >
            <div className={styles.docInnerLines} />
          </motion.div>
          <motion.div
            className={`${styles.docFrame} ${styles.doc3}`}
            style={{ y: doc3Y }}
          />
          <motion.div
            className={`${styles.docFrame} ${styles.doc4}`}
            style={{ y: doc4Y }}
          >
            <div className={styles.docInnerLines} />
          </motion.div>
        </div>
      )}

      {/* Hero content */}
      <motion.div
        className={styles.content}
        style={prefersReducedMotion ? {} : { y: contentY }}
      >
        <motion.div
          className={styles.textStack}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section label */}
          <motion.span variants={labelVariants} className={styles.label}>
            Enterprise Contract Governance
          </motion.span>

          {/* Name + credential */}
          <motion.div variants={itemVariants}>
            <h1 className={styles.name}>{meta.name}</h1>
            <p className={styles.credential}>{meta.credentials}</p>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className={styles.tagline}>
            {meta.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className={styles.actions}>
            <a href="#profile" className={styles.primaryBtn}>
              View Profile
            </a>
            <a href={meta.resumeUrl} className={styles.ghostBtn} download>
              Download Resume
            </a>
            <a href="#contact" className={styles.ghostBtn}>
              Contact
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9, ease }}
        aria-hidden="true"
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </section>
  );
}
