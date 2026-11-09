import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';

export interface Crumb {
  label: string;
  path?: string;
}

export function Breadcrumbs({
  locale,
  dict,
  items,
}: {
  locale: Locale;
  dict: Dictionary;
  items: Crumb[];
}) {
  return (
    <nav aria-label={dict.aria.breadcrumb} className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <li>
          <Link href={localizedPath(locale)} className="transition-colors hover:text-chalk">
            {dict.nav.home}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            <ChevronRight className="h-2.5 w-2.5" aria-hidden="true" />
            {item.path ? (
              <Link
                href={localizedPath(locale, item.path)}
                className="transition-colors hover:text-chalk"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-chalk/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
