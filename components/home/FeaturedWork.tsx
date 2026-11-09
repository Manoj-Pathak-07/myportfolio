import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Project } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusPill } from '@/components/ui/StatusPill';

export function FeaturedWork({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: Project[];
}) {
  return (
    <section
      id="work"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/55 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.work.eyebrow}
          title={dict.home.work.title}
          lead={dict.home.work.lead}
          link={localizedPath(locale, '/projects')}
          linkLabel={dict.home.work.link}
        />

        <div className="mt-12">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={localizedPath(locale, `/projects/${project.slug}`)}
              className="group grid grid-cols-12 items-center gap-x-5 gap-y-5 border-t border-chalk/10 py-7 transition-colors last:border-b hover:bg-chalk/[0.015] md:py-8"
            >
              <span className="col-span-2 font-mono text-[10px] tracking-[0.14em] text-muted/80 md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display text-2xl tracking-[-0.025em] text-chalk transition-colors group-hover:text-chalk md:text-[1.7rem]">
                  {project.title}
                </h3>
                <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-muted">
                  {project.summary[locale]}
                </p>
              </div>

              <div className="col-span-12 hidden md:col-span-3 md:block">
                <div className="project-cover relative aspect-[16/10] overflow-hidden border border-chalk/10 bg-ink-raised">
                  <Image
                    src={project.cover}
                    alt=""
                    width={640}
                    height={400}
                    unoptimized
                    className="h-full w-full object-cover opacity-65 transition-all duration-700 ease-signal group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                </div>
              </div>

              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {dict.categories[project.category]}
                </p>
                {project.stack.length ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-muted/80">
                    {project.stack.slice(0, 3).join(' · ')}
                  </p>
                ) : null}
              </div>

              <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                <StatusPill status={project.status} dict={dict} />
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/10 text-muted transition-all duration-300 group-hover:border-electric/60 group-hover:text-chalk">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
