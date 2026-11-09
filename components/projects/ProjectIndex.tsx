'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  projectCategories,
  type Locale,
  type Project,
  type ProjectCategory,
} from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { StatusPill } from '@/components/ui/StatusPill';

type Filter = 'all' | ProjectCategory;

export function ProjectIndex({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: Project[];
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-t border-chalk/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={dict.common.filterBy}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            className={`filter-chip min-h-9 border px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              filter === 'all'
                ? 'border-electric/50 bg-electric/10 text-chalk'
                : 'border-chalk/10 text-muted hover:border-chalk/25 hover:text-chalk'
            }`}
          >
            {dict.projects.allProjects}
          </button>
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`filter-chip min-h-9 border px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                filter === category
                  ? 'border-electric/50 bg-electric/10 text-chalk'
                  : 'border-chalk/10 text-muted hover:border-chalk/25 hover:text-chalk'
              }`}
            >
              {dict.categories[category]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
          {String(filtered.length).padStart(2, '0')} {dict.projects.result}
        </p>
      </div>

      {filter === 'mobile' ? (
        <p className="mt-6 border-l border-electric/50 pl-5 text-[13px] leading-relaxed text-muted">
          {dict.projects.mobileNote}
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-muted">{dict.projects.empty}</p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {filtered.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.06}>
              <article className="motion-card" data-cursor="card">
                <Link
                href={localizedPath(locale, `/projects/${project.slug}`)}
                className="group block"
              >
                <div className="project-cover relative aspect-[16/10] overflow-hidden border border-chalk/10 bg-ink-raised">
                  <Image
                    src={project.cover}
                    alt=""
                    width={800}
                    height={500}
                    unoptimized
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-signal group-hover:scale-[1.025] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.16em] text-chalk/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-chalk/20 bg-ink/60 text-chalk opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl tracking-[-0.025em] text-chalk transition-colors group-hover:text-chalk">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                      {project.summary[locale]}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-chalk/10 pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                    {dict.categories[project.category]}
                  </span>
                  <StatusPill status={project.status} dict={dict} />
                  {project.employer ? (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                      {project.employer}
                    </span>
                  ) : null}
                  {project.stack.length ? (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                      {project.stack.slice(0, 3).join(' · ')}
                    </span>
                  ) : null}
                </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
