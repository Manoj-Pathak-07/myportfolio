import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { education } from '@/content/experience';
import type { ExperienceItem, Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ExperiencePreview({
  locale,
  dict,
  experience,
}: {
  locale: Locale;
  dict: Dictionary;
  experience: ExperienceItem[];
}) {
  const current = experience[0];
  const study = education[0];

  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/70 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.experience.eyebrow}
          title={dict.home.experience.title}
          lead={dict.home.experience.lead}
          link={localizedPath(locale, '/experience')}
          linkLabel={dict.home.experience.link}
        />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            {current ? (
              <div className="frame-corners border border-chalk/10 bg-ink/80 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-electric">
                    {dict.experiencePage.current}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {current.period[locale]}
                  </p>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-[-0.02em]">
                  {current.role[locale]}
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  {current.company} · {current.location[locale]}
                </p>
                <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-chalk/75">
                  {current.summary[locale]}
                </p>
                <ul className="mt-7 space-y-3 border-t border-chalk/10 pt-5">
                  {current.responsibilities.slice(0, 3).map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-3 text-[13px] leading-relaxed text-muted"
                    >
                      <span
                        className="mt-[0.55rem] h-1 w-1 shrink-0 bg-electric/70"
                        aria-hidden="true"
                      />
                      {item[locale]}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {current.stack.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="md:col-span-5">
            <div className="border-t border-chalk/10 pt-6">
              <p className="eyebrow">{dict.experiencePage.education}</p>
              {study ? (
                <>
                  <h3 className="mt-5 font-display text-xl tracking-[-0.02em]">
                    {study.qualification[locale]}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted">
                    {study.institution}
                  </p>
                  <p className="mt-1 text-[13px] text-muted/80">
                    {study.affiliation}
                  </p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {study.period[locale]}
                  </p>
                </>
              ) : null}
            </div>

            <Link
              href={localizedPath(locale, '/about')}
              className="group mt-10 inline-flex items-center gap-2 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
            >
              {dict.experiencePage.backToAbout}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
