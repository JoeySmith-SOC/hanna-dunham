import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { meta } from '../data/content';
import styles from './Navigation.module.css';

const links = [
  { label: 'Profile', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Competencies', href: '#competencies' },
  { label: 'Education', href: '#education' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className={styles.inner}>
          {/* Monogram */}
          <a href="#hero" className={styles.monogram} aria-label="Back to top">
            <span>HD</span>
          </a>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume CTA */}
          <div className={styles.right}>
            <a
              href={meta.resumeUrl}
              className={styles.resumeBtn}
              download
              aria-label="Download resume PDF"
            >
              Resume
            </a>

            {/* Mobile menu toggle */}
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <ul className={styles.drawerLinks} role="list">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <a href={link.href} className={styles.drawerLink} onClick={closeMenu}>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.06 + 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <a
                    href={meta.resumeUrl}
                    className={styles.drawerResume}
                    download
                    onClick={closeMenu}
                  >
                    Download Resume
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
