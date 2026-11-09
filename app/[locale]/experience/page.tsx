import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { education, publicExperience } from '@/content/experience';
import type { Locale } from '@/content/types';
import { getDictionary, isLocale, localizedPath } from '@/lib/i18n';
import { breadcrumbSchema, buildMetadata, webPageSchema } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.experience.title,
    description: dict.meta.experience.description,
    pathname: '/experience',
    image: '/og/experience.png',
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[{ label: dict.nav.experience }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.experiencePage.eyebrow}
          title={dict.experiencePage.title}
          lead={dict.experiencePage.lead}
        />

        <div className="border-t border-chalk/10">
          {publicExperience.map((role, index) => (
            <article
              key={role.id}
              className="grid gap-8 border-b border-chalk/10 py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-electric">
                  {role.current ? dict.experiencePage.current : dict.experiencePage.previousRole}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                  {role.period[locale]}
                </p>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-display text-3xl tracking-[-0.03em] text-chalk">
                  {role.role[locale]}
                </h2>
                <p className="mt-2 text-[14px] text-muted">
                  {role.company} · {role.location[locale]}
                </p>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-chalk/80">
                  {role.summary[locale]}
                </p>

                <div className="mt-8">
                  <p className="eyebrow">{dict.experiencePage.responsibilities}</p>
                  <ul className="mt-4 space-y-3">
                    {role.responsibilities.map((item) => (
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
                </div>
              </div>
              <div className="md:col-span-3">
                <p className="eyebrow">{dict.experiencePage.technologies}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizedPath(locale, '/projects')}
                  className="group mt-8 inline-flex items-center gap-2 text-[12px] text-chalk/80 transition-colors hover:text-chalk"
                >
                  {dict.experiencePage.selectedWork}
                  <ArrowUpRight
                    className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16">
          <div className="grid gap-8 border-t border-chalk/10 pt-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow">{dict.experiencePage.education}</p>
            </div>
            <div className="md:col-span-9">
              <p className="max-w-xl text-[13px] leading-relaxed text-muted">
                {dict.experiencePage.educationLead}
              </p>
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className="mt-8 grid gap-4 border-l border-chalk/10 pl-6 sm:grid-cols-12"
                >
                  <div className="sm:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-electric">
                      {String(index + 1).padStart(2, '0')} · {item.period[locale]}
                    </p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                      {item.status[locale]}
                    </p>
                  </div>
                  <div className="sm:col-span-9">
                    <h2 className="font-display text-xl tracking-[-0.02em] text-chalk">
                      {item.qualification[locale]}
                    </h2>
                    {item.institution ? (
                      <p className="mt-2 text-[13px] text-muted">
                        {item.institution}
                        {item.affiliation ? ` · ${item.affiliation}` : ''}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-3 max-w-2xl text-[13px] leading-[1.8] text-muted">
                        {item.description[locale]}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 max-w-2xl border border-chalk/10 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-electric">
            {dict.experiencePage.verificationTitle}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            {dict.experiencePage.verificationBody}
          </p>
        </div>
      </div>

      <JsonLd
        data={webPageSchema({
          locale,
          pathname: '/experience',
          name: dict.meta.experience.title,
          description: dict.meta.experience.description,
          image: '/og/experience.png',
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.experience, pathname: '/experience' },
          ],
          locale,
        )}
      />
    </div>
  );
}
