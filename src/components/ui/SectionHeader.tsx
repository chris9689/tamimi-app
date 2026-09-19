import type { ReactNode } from 'react';
import { useDemo } from '@/app/DemoContext';
import { cn } from '@/lib/utils';
import { ReasonLine } from './ReasonLine';
import { Icon } from './Icon';

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  reason?: string;
  whyTitle?: string;
  whyReasons?: string[];
  social?: string;
  onSeeAll?: () => void;
  action?: ReactNode;
  className?: string;
}

// The title itself is the (subtle) "why" trigger when whyReasons are supplied —
// no explicit CTA. Hovering hints with a dotted underline; clicking opens the
// left "why" panel.
export function SectionHeader({
  title,
  emoji,
  reason,
  whyTitle,
  whyReasons,
  social,
  onSeeAll,
  action,
  className,
}: SectionHeaderProps) {
  const { openWhy } = useDemo();
  const clickable = Boolean(whyReasons && whyReasons.length);

  const headingBlock = (
    <div className="min-w-0">
      <h2 className="flex items-center gap-1.5 font-heading text-[17px] font-extrabold leading-tight text-ink">
        {emoji && <span className="text-lg">{emoji}</span>}
        <span className={cn('truncate', clickable && 'decoration-dotted underline-offset-4 group-hover/why:underline')}>
          {title}
        </span>
      </h2>
      {reason && (
        <div className="mt-1">
          <ReasonLine reason={reason} />
        </div>
      )}
      {social && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
          <Icon name="group" className="text-[13px]" />
          {social}
        </p>
      )}
    </div>
  );

  return (
    <div className={cn('mb-2.5 flex items-start justify-between gap-3', className)}>
      {clickable ? (
        <button
          type="button"
          onClick={() => openWhy(whyTitle ?? title, whyReasons ?? [])}
          className="group/why min-w-0 text-left"
          aria-label={`Why you're seeing ${title}`}
        >
          {headingBlock}
        </button>
      ) : (
        headingBlock
      )}
      {action ??
        (onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="shrink-0 font-heading text-[13px] font-semibold text-primary"
          >
            See all
          </button>
        ))}
    </div>
  );
}
