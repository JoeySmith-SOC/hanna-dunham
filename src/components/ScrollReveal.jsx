import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94];

export default function ScrollReveal({
  children,
  delay = 0,
  fromY = 24,
  className,
  style,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : fromY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
