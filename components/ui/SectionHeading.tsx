import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';

export function SectionHeading({
  eyebrow,
  title,
  lead,
  link,
  linkLabel,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  link?: string;
  linkLabel?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid gap-8 border-t border-chalk/10 pt-7 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div className="md:col-span-6">
        <h2 className="font-display text-display-sm text-chalk">
          <TextReveal text={title} stagger={0.026} />
        </h2>
        {lead ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{lead}</p>
        ) : null}
      </div>
      <div className="flex items-start justify-start md:col-span-3 md:justify-end">
        {action}
        {link && linkLabel ? (
          <Link
            href={link}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-chalk"
          >
            {linkLabel}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
