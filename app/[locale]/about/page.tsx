import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Download, FileText } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { ProfilePortrait } from '@/components/ui/ProfilePortrait';
import { education } from '@/content/experience';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import { getDictionary, isLocale, localizedPath } from '@/lib/i18n';
import { breadcrumbSchema, buildMetadata, profilePageSchema } from '@/lib/seo';

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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    pathname: '/about',
    image: '/og/about.png',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);
  const primaryEducation = education[0];

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[{ label: dict.nav.about }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.aboutPage.eyebrow}
          title={dict.aboutPage.title}
          lead={dict.aboutPage.lead}
        />

        <div className="grid gap-10 border-t border-chalk/10 pt-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] border border-chalk/10 bg-ink-raised p-1.5">
              <ProfilePortrait
                locale={locale}
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-muted/80">
              {dict.aboutPage.photoCaption}
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="eyebrow">{dict.aboutPage.storyTitle}</p>
            <div className="mt-6 max-w-2xl space-y-5 text-[15px] leading-[1.85] text-chalk/80">
              {profile.about[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l border-electric/60 pl-5 font-display text-xl leading-snug tracking-[-0.02em] text-chalk">
              {profile.aboutHighlight[locale]}
            </p>

            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-chalk/10 pt-7 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.aboutPage.factLocation}
                </dt>
                <dd className="mt-2 text-[13px] text-chalk/85">{profile.location[locale]}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.aboutPage.factRole}
                </dt>
                <dd className="mt-2 text-[13px] text-chalk/85">
                  {profile.role[locale]} · {profile.company}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.aboutPage.factEducation}
                </dt>
                <dd className="mt-2 text-[13px] text-chalk/85">
                  {primaryEducation?.qualification[locale]}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.aboutPage.factLanguages}
                </dt>
                <dd className="mt-2 text-[13px] text-chalk/85">
                  {profile.languages.map((language) => language.name[locale]).join(' · ')}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.aboutPage.factFocus}
                </dt>
                <dd className="mt-2 text-[13px] text-chalk/85">
                  {profile.interests.map((interest) => interest[locale]).join(' · ')}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="mt-20">
          <div className="grid gap-8 border-t border-chalk/10 pt-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow">{dict.aboutPage.philosophyTitle}</p>
            </div>
            <div className="grid gap-px border border-chalk/10 bg-chalk/10 sm:grid-cols-2 md:col-span-9">
              {profile.principles.map((principle, index) => (
                <div key={principle.title.en} className="bg-ink p-6 md:p-7">
                  <span className="font-mono text-[9px] text-electric/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-6 font-display text-lg tracking-[-0.02em] text-chalk">
                    {principle.title[locale]}
                  </h2>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    {principle.body[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 border-t border-chalk/10 pt-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow">{dict.aboutPage.educationTitle}</p>
          </div>
          <div className="md:col-span-5">
            {education.map((item) => (
              <div key={item.id} className="mb-7 border-l border-chalk/10 pl-5 last:mb-0">
                <h2 className="font-display text-xl tracking-[-0.02em] text-chalk">
                  {item.qualification[locale]}
                </h2>
                {item.institution ? (
                  <p className="mt-2 text-[13px] text-muted">
                    {item.institution}
                    {item.affiliation ? ` · ${item.affiliation}` : ''}
                  </p>
                ) : null}
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80">
                  {item.period[locale]} · {item.status[locale]}
                </p>
              </div>
            ))}
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow">{dict.aboutPage.interestsTitle}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li key={interest.en} className="tag">
                  {interest[locale]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 border border-chalk/10 p-6 md:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">{dict.aboutPage.resumeTitle}</p>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted">
                {dict.aboutPage.resumeLead}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={localizedPath(locale, profile.resume.printPath)}
                className="button-secondary shrink-0"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.aboutPage.resumeCta}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              {profile.resume.pdf ? (
                <a href={profile.resume.pdf} download className="button-primary shrink-0">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {dict.common.downloadCv}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <JsonLd data={profilePageSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.about, pathname: '/about' },
          ],
          locale,
        )}
      />
    </div>
  );
}
