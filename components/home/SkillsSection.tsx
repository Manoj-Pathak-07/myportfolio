'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { skillClusters } from '@/content/skills';
import type { Locale, SkillCluster } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { forSceneCluster } from '@/components/three/cluster-bridge';

export function SkillsSection({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: { slug: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<SkillCluster['id']>('frontend');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = skillClusters.find((cluster) => cluster.id === activeId) ?? skillClusters[0];

  function select(id: SkillCluster['id']) {
    setActiveId(id);
    forSceneCluster(id);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = skillClusters.findIndex((cluster) => cluster.id === activeId);
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % skillClusters.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + skillClusters.length) % skillClusters.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = skillClusters.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const next = skillClusters[nextIndex];
    if (!next) return;
    select(next.id);
    tabRefs.current[nextIndex]?.focus();
  }

  if (!active) return null;

  return (
    <section
      id="skills"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/70 py-20 md:py-28"
    >
      <div className="shell">
        <div className="grid gap-8 border-t border-chalk/10 pt-7 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow">{dict.home.skills.eyebrow}</p>
          </div>
          <div className="md:col-span-6">
            <h2 className="font-display text-display-sm">{dict.home.skills.title}</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {dict.home.skills.lead}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div
              role="tablist"
              aria-label={dict.home.skills.title}
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="border-t border-chalk/10"
            >
              {skillClusters.map((cluster, index) => {
                const selected = cluster.id === activeId;
                return (
                  <button
                    key={cluster.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`cluster-tab-${cluster.id}`}
                    aria-selected={selected}
                    aria-controls={`cluster-panel-${cluster.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(cluster.id)}
                    className={`group flex w-full items-center justify-between border-b border-chalk/10 py-5 text-left transition-colors ${
                      selected ? 'text-chalk' : 'text-muted hover:text-chalk/80'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[9px] text-muted/80">
                        0{index + 1}
                      </span>
                      <span className="font-display text-xl tracking-[-0.02em]">
                        {cluster.label[locale]}
                      </span>
                    </span>
                    <span
                      className={`h-px transition-all duration-300 ${
                        selected ? 'w-8 bg-electric' : 'w-3 bg-chalk/20'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
            <p className="mt-6 max-w-sm text-[12px] leading-relaxed text-muted/80">
              {dict.home.skills.note}
            </p>
          </div>

          <div className="md:col-span-8">
            <div
              role="tabpanel"
              id={`cluster-panel-${active.id}`}
              aria-labelledby={`cluster-tab-${active.id}`}
              className="panel frame-corners min-h-[20rem] p-6 md:p-9"
            >
              <div key={active.id} className="animate-fade-rise motion-reduce:animate-none">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow-accent">{active.label[locale]}</p>
                    <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-chalk/85">
                      {active.summary[locale]}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80">
                    {String(active.skills.length).padStart(2, '0')} tools
                  </span>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <li key={skill} className="tag">
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 border-t border-chalk/10 pt-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                    {dict.common.relatedProjects}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {active.relatedProjects.map((slug) => {
                      const project = projects.find((item) => item.slug === slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={localizedPath(locale, `/projects/${slug}`)}
                            className="group inline-flex items-center gap-1.5 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
                          >
                            {project.title}
                            <ArrowUpRight
                              className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
