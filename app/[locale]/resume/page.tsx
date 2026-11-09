import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { PrintButton } from '@/components/resume/PrintButton';
import { JsonLd } from '@/components/ui/JsonLd';
import { education, publicExperience } from '@/content/experience';
import { profile } from '@/content/profile';
import { featuredProjects } from '@/content/projects';
import { skillClusters } from '@/content/skills';
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
    title: dict.meta.resume.title,
    description: dict.meta.resume.description,
    pathname: '/resume',
    image: '/og/resume.png',
  });
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-20">
        <div className="no-print flex flex-wrap items-center justify-between gap-4 pt-28 md:pt-32">
          <Link
            href={localizedPath(locale, '/about')}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            {dict.resumePage.back}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {profile.resume.pdf ? (
              <a
                href={profile.resume.pdf}
                download
                className="button-secondary"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.common.downloadResume}
              </a>
            ) : null}
            <PrintButton label={dict.resumePage.print} />
          </div>
        </div>

        <p className="no-print mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
          {dict.resumePage.hint}
        </p>

        <article className="resume-document mx-auto mt-8 max-w-4xl p-8 md:p-14">
          <header className="border-b border-slate-200 pb-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl tracking-[-0.035em] text-slate-900 md:text-5xl">
                  {profile.name}
                </h1>
                <p className="mt-2 text-[15px] text-slate-600">
                  {profile.role[locale]} · {profile.company}
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
                {profile.coordinates.lat} · {profile.coordinates.lng}
              </p>
            </div>

            <ul className="mt-6 grid gap-x-8 gap-y-2 text-[12px] text-slate-600 sm:grid-cols-2">
              <li>{profile.email}</li>
              <li>{profile.phone}</li>
              <li>{profile.location[locale]}</li>
              <li className="break-all">{profile.github.replace('https://', '')}</li>
              <li className="break-all">{profile.linkedin.replace('https://', '')}</li>
              <li>{profile.siteUrl.replace('https://', '')}</li>
            </ul>
          </header>

          <section className="print-breakless mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.summary}
            </h2>
            <p className="mt-3 text-[13px] leading-[1.8] text-slate-700">
              {profile.intro[locale][0]}
            </p>
          </section>

          <section className="print-breakless mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.experience}
            </h2>
            {publicExperience.map((role) => (
              <div key={role.id} className="mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-medium text-slate-900">
                    {role.role[locale]} — {role.company}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">
                    {role.period[locale]}
                  </p>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {role.location[locale]}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {role.responsibilities.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-2 text-[12px] leading-relaxed text-slate-700"
                    >
                      <span aria-hidden="true">—</span>
                      {item[locale]}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-slate-500">
                  <strong className="font-medium text-slate-700">
                    {dict.resumePage.skills}:
                  </strong>{' '}
                  {role.stack.join(', ')}
                </p>
              </div>
            ))}
          </section>

          <section className="print-breakless mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.education}
            </h2>
            {education.map((item) => (
              <div key={item.id} className="mt-4">
                <h3 className="text-[15px] font-medium text-slate-900">
                  {item.qualification[locale]}
                </h3>
                {item.institution ? (
                  <p className="mt-1 text-[12px] text-slate-600">
                    {item.institution}
                    {item.affiliation ? ` · ${item.affiliation}` : ''}
                  </p>
                ) : null}
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">
                  {item.period[locale]} · {item.status[locale]}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.skills}
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {skillClusters.map((cluster) => (
                <div key={cluster.id}>
                  <dt className="text-[12px] font-medium text-slate-900">
                    {cluster.label[locale]}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-relaxed text-slate-600">
                    {cluster.skills.join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="print-breakless mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.selectedProjects}
            </h2>
            <ul className="mt-4 space-y-2">
              {featuredProjects.map((project) => (
                <li key={project.slug} className="text-[12px] leading-relaxed">
                  <span className="font-medium text-slate-900">{project.title}</span>
                  <span className="text-slate-600"> — {project.summary[locale]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="print-breakless mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              {dict.resumePage.languages}
            </h2>
            <p className="mt-3 text-[12px] text-slate-700">
              {profile.languages
                .map((language) => `${language.name[locale]} (${language.level[locale]})`)
                .join(' · ')}
            </p>
          </section>

          <footer className="mt-10 border-t border-slate-200 pt-4 text-[10px] leading-relaxed text-slate-600">
            {dict.resumePage.note}
          </footer>
        </article>
      </div>
      <JsonLd
        data={webPageSchema({
          locale,
          pathname: '/resume',
          name: dict.meta.resume.title,
          description: dict.meta.resume.description,
          image: '/og/resume.png',
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.resumePage.eyebrow, pathname: '/resume' },
          ],
          locale,
        )}
      />
    </div>
  );
}
