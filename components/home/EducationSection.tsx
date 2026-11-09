import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { education } from '@/content/experience';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function EducationSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="education"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/70 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.education.eyebrow}
          title={dict.home.education.title}
          lead={dict.home.education.lead}
          link={localizedPath(locale, '/experience')}
          linkLabel={dict.home.education.link}
        />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted/80">
              {education[0]?.institution}
              <br />
              {education[0]?.affiliation}
            </p>
          </div>
          <div className="md:col-span-9">
            {education.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 0.06}
                className="grid gap-4 border-t border-chalk/10 py-7 sm:grid-cols-12"
              >
                <div className="sm:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-electric">
                    {item.period[locale]}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                    {item.status[locale]}
                  </p>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-display text-xl tracking-[-0.02em] text-chalk md:text-2xl">
                    {item.qualification[locale]}
                  </h3>
                  {item.institution ? (
                    <p className="mt-1.5 text-[13px] text-muted">
                      {item.institution}
                      {item.affiliation ? ` · ${item.affiliation}` : ''}
                    </p>
                  ) : null}
                  {item.description ? (
                    <p className="mt-4 max-w-2xl text-[13px] leading-[1.8] text-muted">
                      {item.description[locale]}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
            <Link
              href={localizedPath(locale, '/experience')}
              className="group mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
            >
              {dict.home.education.link}
              <ArrowUpRight
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
