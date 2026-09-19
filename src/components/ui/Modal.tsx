import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fade, modalVariants } from '@/animations/variants';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          variants={fade}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            variants={modalVariants}
            className={cn('relative z-10 w-full max-w-sm rounded-xl3 bg-card p-5 shadow-frame', className)}
          >
            {title && (
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-ink">{title}</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/[0.05]"
                  aria-label="Close"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
