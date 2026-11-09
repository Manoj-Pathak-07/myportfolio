import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { StatusPill } from '@/components/ui/StatusPill';
import { TextReveal } from '@/components/ui/TextReveal';
import { getProject, publicProjects } from '@/content/projects';
import { locales, type Locale } from '@/content/types';
import { getDictionary, isLocale, localizedPath } from '@/lib/i18n';
import {
  breadcrumbSchema,
  buildMetadata,
  creativeWorkSchema,
} from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publicProjects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    locale,
    title: project.seoTitle[locale],
    description: project.seoDescription[locale],
    pathname: `/projects/${project.slug}`,
    image: `/og/projects/${project.slug}.png`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const externalLinks = [
    project.links.live
      ? { label: dict.common.visitSite, href: project.links.live, icon: true }
      : null,
    project.links.demo
      ? { label: dict.common.demo, href: project.links.demo, icon: true }
      : null,
    project.links.github
      ? { label: dict.common.sourceCode, href: project.links.github, icon: false }
      : null,
  ].filter((link): link is { label: string; href: string; icon: boolean } => Boolean(link));

  const otherProjects = publicProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[
              { label: dict.nav.projects, path: '/projects' },
              { label: project.title },
            ]}
          />
        </div>

        <header className="grid gap-8 border-t border-chalk/10 pt-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow-accent">{dict.projectDetail.eyebrow}</p>
            <div className="mt-4">
              <StatusPill status={project.status} dict={dict} />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80">
              {dict.categories[project.category]}
            </p>
            {project.employer ? (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                {project.employer}
              </p>
            ) : null}
          </div>
          <div className="md:col-span-9">
            <h1 className="font-display text-display-lg text-chalk">
              <TextReveal text={project.title} stagger={0.04} />
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
              {project.summary[locale]}
            </p>

            <dl className="mt-9 grid gap-6 border-t border-chalk/10 pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.projectDetail.role}
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-chalk/80">
                  {project.role[locale]}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.projectDetail.stack}
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-chalk/80">
                  {project.stack.length ? project.stack.join(' · ') : '—'}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.projectDetail.links}
                </dt>
                <dd className="mt-2 space-y-1.5">
                  {externalLinks.length ? (
                    externalLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
                      >
                        {link.icon ? (
                          <ArrowUpRight className="h-3 w-3 text-muted" aria-hidden="true" />
                        ) : (
                          <Github className="h-3 w-3 text-muted" aria-hidden="true" />
                        )}
                        {link.label}
                        <span className="sr-only">({dict.common.opensNewTab})</span>
                      </a>
                    ))
                  ) : (
                    <span className="text-[13px] text-muted">
                      {dict.projectDetail.pending}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <figure className="mt-12">
          <div className="project-cover relative aspect-[16/8] overflow-hidden border border-chalk/10 bg-ink-raised">
            <Image
              src={project.cover}
              alt={`${dict.aria.cover} ${project.title}`}
              width={1440}
              height={720}
              priority
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
            {dict.projectDetail.coverNote}
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-28 space-y-7 border-t border-chalk/10 pt-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                  {dict.projectDetail.info}
                </p>
                <dl className="mt-4 space-y-4 text-[12px]">
                  <div>
                    <dt className="text-muted/80">{dict.projectDetail.category}</dt>
                    <dd className="mt-1 text-chalk/80">
                      {dict.categories[project.category]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted/80">{dict.projectDetail.status}</dt>
                    <dd className="mt-1 text-chalk/80">{dict.status[project.status]}</dd>
                  </div>
                  {project.employer ? (
                    <div>
                      <dt className="text-muted/80">{dict.projectDetail.employer}</dt>
                      <dd className="mt-1 text-chalk/80">{project.employer}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
              <Link
                href={localizedPath(locale, '/projects')}
                className="inline-flex items-center gap-2 text-[12px] text-muted transition-colors hover:text-chalk"
              >
                <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                {dict.projectDetail.more}
              </Link>
            </div>
          </aside>

          <div className="space-y-14 md:col-span-8 md:col-start-5">
            <section>
              <p className="eyebrow">{dict.projectDetail.overview}</p>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-chalk/80">
                {project.description[locale]}
              </p>
            </section>

            {project.contributions?.length ? (
              <section className="border-t border-chalk/10 pt-8">
                <p className="eyebrow">{dict.projectDetail.contributions}</p>
                <ul className="mt-5 divide-y divide-chalk/10">
                  {project.contributions.map((item, index) => (
                    <li
                      key={item.en}
                      className="flex items-baseline gap-4 py-3.5 text-[14px] text-chalk/80"
                    >
                      <span className="font-mono text-[9px] text-electric">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="grid gap-8 border-t border-chalk/10 pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow">{dict.projectDetail.challenge}</p>
                <p className="mt-4 text-[14px] leading-[1.85] text-muted">
                  {project.challenge[locale]}
                </p>
              </div>
              <div>
                <p className="eyebrow">{dict.projectDetail.solution}</p>
                <p className="mt-4 text-[14px] leading-[1.85] text-muted">
                  {project.solution[locale]}
                </p>
              </div>
            </section>

            {project.features.length ? (
              <section className="border-t border-chalk/10 pt-8">
                <p className="eyebrow">{dict.projectDetail.features}</p>
                <ul className="mt-5 divide-y divide-chalk/10">
                  {project.features.map((feature, index) => (
                    <li
                      key={feature.en}
                      className="flex items-baseline gap-4 py-3.5 text-[14px] text-chalk/80"
                    >
                      <span className="font-mono text-[9px] text-electric">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {feature[locale]}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.architecture.length ? (
              <section className="border-t border-chalk/10 pt-8">
                <p className="eyebrow">{dict.projectDetail.architecture}</p>
                <div className="mt-6 space-y-2">
                  {project.architecture.map((layer, index) => (
                    <div key={layer.name.en}>
                      <div className="panel grid grid-cols-12 gap-4 p-5">
                        <div className="col-span-12 sm:col-span-4">
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-electric">
                            {String(index + 1).padStart(2, '0')} · {layer.name[locale]}
                          </p>
                        </div>
                        <p className="col-span-12 text-[13px] leading-relaxed text-muted sm:col-span-8">
                          {layer.detail[locale]}
                        </p>
                      </div>
                      {index < project.architecture.length - 1 ? (
                        <p
                          className="py-1 pl-6 font-mono text-[10px] text-muted/80"
                          aria-hidden="true"
                        >
                          ↓
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {project.stack.length ? (
              <section className="border-t border-chalk/10 pt-8">
                <p className="eyebrow">{dict.projectDetail.stack}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.verificationNote ? (
              <p className="border-l border-electric/50 pl-5 text-[13px] leading-relaxed text-muted">
                {project.verificationNote[locale]}
              </p>
            ) : null}

            {project.screenshots.length ? (
              <section className="border-t border-chalk/10 pt-8">
                <p className="eyebrow">{dict.projectDetail.gallery}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((screenshot) => (
                    <Image
                      key={screenshot}
                      src={screenshot}
                      alt={`${project.title} screenshot`}
                      width={800}
                      height={500}
                      unoptimized
                      className="border border-chalk/10"
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <section className="mt-20 border-t border-chalk/10 pt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">{dict.projectDetail.more}</p>
            <Link
              href={localizedPath(locale, '/projects')}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
            >
              {dict.common.backToProjects}
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {otherProjects.map((item) => (
              <Link
                key={item.slug}
                href={localizedPath(locale, `/projects/${item.slug}`)}
                className="group flex items-center gap-4 border border-chalk/10 p-4 transition-colors hover:border-chalk/20"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-chalk/10">
                  <Image
                    src={item.cover}
                    alt=""
                    width={200}
                    height={130}
                    unoptimized
                    className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div>
                  <p className="font-display text-lg tracking-[-0.02em]">{item.title}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                    {dict.categories[item.category]}
                  </p>
                </div>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <JsonLd
        data={creativeWorkSchema({
          locale,
          slug: project.slug,
          title: project.title,
          description: project.seoDescription[locale],
          image: project.cover,
          url: project.links.live,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.projects, pathname: '/projects' },
            { name: project.title, pathname: `/projects/${project.slug}` },
          ],
          locale,
        )}
      />
    </div>
  );
}
