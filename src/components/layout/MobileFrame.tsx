import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Shared so the presenter/why side panels match the phone height.
export const FRAME_HEIGHT_CLASS = 'h-[calc(100vh-7.5rem)] max-h-[820px] min-h-[560px]';

// iPhone 17 Pro Max–style frame: titanium edge, uniform thin bezels,
// Dynamic Island, side buttons. Narrower than a tablet-ish mock.
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative shrink-0">
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[120px] z-0 h-9 w-[3px] rounded-l-sm bg-neutral-700" />
      <span className="absolute -left-[3px] top-[176px] z-0 h-14 w-[3px] rounded-l-sm bg-neutral-700" />
      <span className="absolute -left-[3px] top-[244px] z-0 h-14 w-[3px] rounded-l-sm bg-neutral-700" />
      <span className="absolute -right-[3px] top-[196px] z-0 h-20 w-[3px] rounded-r-sm bg-neutral-700" />

      {/* titanium edge */}
      <div
        className="relative rounded-[3.3rem] p-[6px] shadow-frame"
        style={{ background: 'linear-gradient(150deg,#6a6a6d,#2c2c2e 34%,#0f0f11 58%,#3d3d40)' }}
      >
        <div className="rounded-[3rem] bg-black p-[2px]">
          <div
            className={cn(
              'relative flex w-[358px] max-w-[92vw] flex-col overflow-hidden rounded-[2.85rem] bg-canvas',
              FRAME_HEIGHT_CLASS,
            )}
          >
            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[11px] z-40 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
