import type { ProjectStatus } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';

const tone: Record<ProjectStatus, string> = {
  live: 'bg-emerald-400',
  'in-development': 'bg-electric',
  private: 'bg-violet',
};

export function StatusPill({
  status,
  dict,
  className,
}: {
  status: ProjectStatus;
  dict: Dictionary;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted ${className ?? ''}`}
    >
      <span className={`h-1 w-1 ${tone[status]}`} aria-hidden="true" />
      {dict.status[status]}
    </span>
  );
}
