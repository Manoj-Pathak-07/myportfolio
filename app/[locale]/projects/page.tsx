import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectIndex } from '@/components/projects/ProjectIndex';
import { publicProjects, workstreams } from '@/content/projects';
import type { Locale } from '@/content/types';
import { getDictionary, isLocale } from '@/lib/i18n';
import {
  breadcrumbSchema,
  buildMetadata,
  collectionPageSchema,
} from '@/lib/seo';

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
    title: dict.meta.projects.title,
    description: dict.meta.projects.description,
    pathname: '/projects',
    image: '/og/projects.png',
  });
}

export default async function ProjectsPage({
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
            items={[{ label: dict.nav.projects }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          lead={dict.projects.lead}
          meta={
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted/80">
              {String(publicProjects.length).padStart(2, '0')} {dict.projects.result}
              <br />
              {dict.projects.eyebrow}
            </p>
          }
        />

        <section className="border-t border-chalk/10 pt-7">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              <p className="eyebrow">{dict.projects.workstreamsTitle}</p>
              <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-muted/80">
                {dict.projects.workstreamsLead}
              </p>
            </div>
            <div className="md:col-span-9">
              <div className="grid gap-x-8 sm:grid-cols-2">
                {workstreams.map((stream, index) => (
                  <Reveal key={stream.id} delay={(index % 2) * 0.06}>
                    <article className="motion-card workstream-card border-t border-chalk/10 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-electric">
                        {String(index + 1).padStart(2, '0')} · {dict.categories[stream.category]}
                      </p>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted/70">
                        {stream.employer}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-xl tracking-[-0.02em] text-chalk">
                      {stream.title[locale]}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">
                      {stream.summary[locale]}
                    </p>
                    <p className="mt-3 border-l border-chalk/15 pl-3 text-[11px] leading-relaxed text-muted/80">
                      {stream.focus[locale]}
                    </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <ProjectIndex locale={locale} dict={dict} projects={publicProjects} />
        </div>
        <p className="mt-16 max-w-xl border-t border-chalk/10 pt-5 text-[12px] leading-relaxed text-muted/80">
          {dict.projects.statusNote}
        </p>
      </div>
      <JsonLd
        data={collectionPageSchema({
          locale,
          pathname: '/projects',
          name: dict.meta.projects.title,
          description: dict.meta.projects.description,
          image: '/og/projects.png',
          items: publicProjects.map((project) => ({
            name: project.title,
            pathname: `/projects/${project.slug}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.projects, pathname: '/projects' },
          ],
          locale,
        )}
      />
    </div>
  );
}
