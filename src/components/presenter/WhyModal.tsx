import { useDemo } from '@/app/DemoContext';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';

export function WhyModal() {
  const { whyState, closeWhy } = useDemo();
  return (
    <Modal open={whyState.open} onClose={closeWhy} title="Why you're seeing this">
      <p className="mb-2.5 text-[13px] font-semibold text-ink">{whyState.title}</p>
      <ul className="space-y-2">
        {whyState.reasons.map((r, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-xl bg-secondary/10 px-3 py-2 text-[13px] text-ink"
          >
            <Icon name="auto_awesome" filled className="mt-0.5 text-[16px] text-secondary" />
            {r}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
