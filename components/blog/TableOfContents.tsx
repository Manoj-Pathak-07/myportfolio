'use client';

import { useEffect, useState } from 'react';

export function TableOfContents({
  items,
  label,
}: {
  items: { id: string; title: string }[];
  label: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0]?.target.id;
        if (first) setActive(first);
      },
      { rootMargin: '-15% 0% -70% 0%', threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label={label}>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
        {label}
      </p>
      <ol className="mt-4 space-y-2.5 border-l border-chalk/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={`-ml-px block border-l py-0.5 pl-4 text-[12px] leading-relaxed transition-colors ${
                active === item.id
                  ? 'border-electric text-chalk'
                  : 'border-transparent text-muted hover:text-chalk/80'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
