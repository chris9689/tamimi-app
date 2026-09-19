import { useDemo } from '@/app/DemoContext';
import { personas } from '@/mock-data/users';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

interface PersonaSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function PersonaSwitcher({ compact, className }: PersonaSwitcherProps) {
  const { personaId, setPersona } = useDemo();
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {personas.map((p) => {
        const active = p.id === personaId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => setPersona(p.id)}
            className={cn(
              'flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition-all',
              active ? 'border-primary bg-white shadow-card' : 'border-transparent bg-white/60 hover:bg-white',
            )}
            title={p.tagline}
          >
            <Avatar initials={p.avatarInitials} accent={p.accent} size={30} ring={active} />
            <span className="text-left leading-tight">
              <span className="block text-[12px] font-bold text-ink">{p.name}</span>
              {!compact && <span className="block text-[10px] text-muted">{p.tagline.split(' · ')[0]}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
