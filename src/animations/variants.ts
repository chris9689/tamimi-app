import type { Variants } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE, when: 'beforeChildren', staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export const cardEntrance: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE } },
};

export const listItem: Variants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE } },
};

export const drawerVariants: Variants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.34, ease: EASE } },
  exit: { x: '100%', transition: { duration: 0.24, ease: EASE } },
};

export const sheetVariants: Variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.34, ease: EASE } },
  exit: { y: '100%', transition: { duration: 0.24, ease: EASE } },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.16, ease: EASE } },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.24 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};
