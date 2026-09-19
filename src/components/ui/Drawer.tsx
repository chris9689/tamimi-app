import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fade, EASE } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  side?: 'left' | 'right';
  className?: string;
}

// Slide-in panel used as the narrow-screen fallback for presenter / why panels.
export function Drawer({ open, onClose, children, width = 340, side = 'right', className }: DrawerProps) {
  const off = side === 'right' ? '100%' : '-100%';
  const variants: Variants = {
    initial: { x: off },
    animate: { x: 0, transition: { duration: 0.34, ease: EASE } },
    exit: { x: off, transition: { duration: 0.24, ease: EASE } },
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/30"
            variants={fade}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              'fixed inset-y-0 z-[61] flex flex-col p-2',
              side === 'right' ? 'right-0' : 'left-0',
              className,
            )}
            style={{ width, maxWidth: '94vw' }}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
