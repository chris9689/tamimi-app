import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { screens } from '@/app/screens';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { screenVariants } from '@/animations/variants';
import { cn } from '@/lib/utils';
import { MobileFrame, FRAME_HEIGHT_CLASS } from './MobileFrame';
import { HeaderBar } from './HeaderBar';
import { BottomNav } from './BottomNav';
import { DemoControls } from './DemoControls';
import { Drawer } from '@/components/ui/Drawer';
import { PresenterPanel } from '@/components/presenter/PresenterPanel';
import { WhyPanel } from '@/components/presenter/WhyPanel';

export function AppShell() {
  const { chapter, productId, madeForSource, presenterOpen, togglePresenter, whyState, closeWhy } = useDemo();
  const handlers = useMemo(() => ({ p: togglePresenter }), [togglePresenter]);
  useKeyboardShortcuts(handlers);
  const Screen = screens[chapter];
  const mainRef = useRef<HTMLElement>(null);

  // Navigation always starts at the top of the page.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [chapter, productId, madeForSource]);

  const whyOpen = whyState.open;
  const anySide = whyOpen || presenterOpen;

  return (
    <div
      className="min-h-screen w-full overflow-x-auto px-3 py-5 lg:py-6"
      style={{ background: 'radial-gradient(1100px 560px at 50% -8%, #fbeee6 0%, #ece7e0 55%, #e7e2db 100%)' }}
    >
      <DemoControls />
      <div className="flex items-start justify-center gap-4">
        {anySide && (
          <div className={cn('hidden w-[330px] shrink-0 lg:block', FRAME_HEIGHT_CLASS)}>
            {whyOpen ? <WhyPanel /> : null}
          </div>
        )}

        <MobileFrame>
          <HeaderBar />
          <main ref={mainRef} className="no-scrollbar relative flex-1 overflow-y-auto overflow-x-hidden">
            <motion.div key={chapter} variants={screenVariants} initial="initial" animate="animate">
              <Screen />
            </motion.div>
          </main>
          <BottomNav />
        </MobileFrame>

        {anySide && (
          <div className={cn('hidden w-[330px] shrink-0 lg:block', FRAME_HEIGHT_CLASS)}>
            {presenterOpen ? <PresenterPanel /> : null}
          </div>
        )}
      </div>

      {/* Narrow-screen fallback: the same panels as slide-in overlays. */}
      <div className="lg:hidden">
        <Drawer open={presenterOpen} onClose={togglePresenter} side="right">
          <PresenterPanel />
        </Drawer>
        <Drawer open={whyOpen} onClose={closeWhy} side="left">
          <WhyPanel />
        </Drawer>
      </div>
    </div>
  );
}
