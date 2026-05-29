import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { meta } from '../data/content';
import styles from './Hero.module.css';

const easeCinema = [0.16, 1, 0.3, 1];
const easeStd = [0.25, 0.46, 0.45, 0.94];

// Cinematic word mask reveal
const nameContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.5 } },
};

const wordVariants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 1.05, ease: easeCinema } },
};

export default function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const doc1Y = useTransform(scrollY, [0, 700], [0, 70]);
  const doc2Y = useTransform(scrollY, [0, 700], [0, -45]);
  const doc3Y = useTransform(scrollY, [0, 700], [0, 90]);
  const doc4Y = useTransform(scrollY, [0, 700], [0, -30]);
  const orb1Y = useTransform(scrollY, [0, 700], [0, 55]);
  const orb2Y = useTransform(scrollY, [0, 700], [0, -40]);
  const contentY = useTransform(scrollY, [0, 500], [0, -24]);

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

  const nameWords = meta.name.split(' ');

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
      aria-label="Introduction"
      style={{ '--mx': '50%', '--my': '0%' }}
    >
      {/* ── Background atmosphere ── */}
      <div className={styles.gradientBase} aria-hidden="true" />
      <div className={styles.ambientLayer} aria-hidden="true" />
      <div className={styles.gradientMouseSpotlight} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* ── Atmospheric depth orbs ── */}
      {!prefersReducedMotion && (
        <>
          <motion.div className={styles.orb1} style={{ y: orb1Y }} aria-hidden="true" />
          <motion.div className={styles.orb2} style={{ y: orb2Y }} aria-hidden="true" />
        </>
      )}

      <div className={styles.bottomVignette} aria-hidden="true" />

      {/* ── Floating document frames ── */}
      {!prefersReducedMotion && (
        <div aria-hidden="true">
          <motion.div
            className={`${styles.docFrame} ${styles.doc1}`}
            style={{ y: doc1Y }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.85, ease: easeStd }}
          >
            <div className={styles.docHeader} />
            <div className={styles.docInnerLines} />
            <div className={styles.docTag}>INF-2024</div>
          </motion.div>

          <motion.div
            className={`${styles.docFrame} ${styles.doc2}`}
            style={{ y: doc2Y }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 1.15, ease: easeStd }}
          >
            <div className={styles.docHeader} />
            <div className={styles.docInnerLines} />
          </motion.div>

          <motion.div
            className={`${styles.docFrame} ${styles.doc3}`}
            style={{ y: doc3Y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            transition={{ duration: 1.4, delay: 1.45, ease: easeStd }}
          />

          <motion.div
            className={`${styles.docFrame} ${styles.doc4}`}
            style={{ y: doc4Y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{ duration: 1.4, delay: 1.7, ease: easeStd }}
          >
            <div className={styles.docInnerLines} />
          </motion.div>
        </div>
      )}

      {/* ── Hero content ── */}
      <motion.div
        className={styles.content}
        style={prefersReducedMotion ? {} : { y: contentY }}
      >
        <div className={styles.textStack}>

          {/* Section label */}
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: easeStd }}
          >
            Enterprise Contract Governance
          </motion.span>

          {/* Name — cinematic title card reveal */}
          <div className={styles.nameBlock}>
            <h1 className={styles.name} aria-label={meta.name}>
              <motion.span
                className={styles.nameWordRow}
                variants={nameContainerVariants}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                aria-hidden="true"
              >
                {nameWords.map((word, i) => (
                  <span key={i} className={styles.wordMask}>
                    <motion.span className={styles.wordInner} variants={wordVariants}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>

            <motion.p
              className={styles.credential}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: easeStd }}
            >
              {meta.credentials}
            </motion.p>
          </div>

          {/* Self-drawing separator */}
          <motion.div
            className={styles.separator}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.15, delay: 1.5, ease: easeCinema }}
            style={{ transformOrigin: 'left center' }}
            aria-hidden="true"
          />

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.62, ease: easeStd }}
          >
            {meta.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.82, ease: easeStd }}
          >
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
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.9, ease: easeStd }}
        aria-hidden="true"
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </section>
  );
}
