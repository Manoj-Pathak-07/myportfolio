import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { MdxContent } from '@/components/blog/MdxContent';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ShareLink } from '@/components/blog/ShareLink';
import { TextReveal } from '@/components/ui/TextReveal';
import { TableOfContents } from '@/components/blog/TableOfContents';
import {
  getAllPostSlugs,
  getAllPosts,
  getPost,
  getTableOfContents,
  localizePost,
} from '@/content/blog';
import { getProject } from '@/content/projects';
import { locales, type Locale } from '@/content/types';
import {
  formatDate,
  getDictionary,
  isLocale,
  localizedPath,
} from '@/lib/i18n';
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPostSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const post = getPost(slug);
  if (!post) return {};
  const localized = localizePost(post, locale);

  return buildMetadata({
    locale,
    title: `${localized.title} — ${getDictionary(locale).meta.siteName}`,
    description: localized.description,
    pathname: `/blog/${post.slug}`,
    image: `/og/blog/${post.slug}.png`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const post = getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const localized = localizePost(post, locale);
  const toc = getTableOfContents(localized.content);

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 2)
    .map((item) => localizePost(item, locale));

  const relatedProjects = post.relatedProjects
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="relative z-10 bg-ink">
      <ReadingProgress label={dict.aria.scrollProgress} />
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[
              { label: dict.nav.blog, path: '/blog' },
              { label: localized.title },
            ]}
          />
        </div>

        <article>
          <header className="grid gap-8 border-t border-chalk/10 pt-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              <p className="eyebrow-accent">{localized.category}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                <time dateTime={localized.date}>
                  {formatDate(localized.date, locale)}
                </time>
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                {localized.readingTime} {dict.common.minRead}
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="max-w-4xl font-display text-display-md text-chalk">
                <TextReveal text={localized.title} stagger={0.026} />
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
                {localized.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {localized.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="min-w-0 md:col-span-8">
              {localized.isFallback ? (
                <p className="mb-8 border-l border-electric/50 pl-5 text-[13px] leading-relaxed text-muted">
                  {dict.blogPage.fallbackNote}
                </p>
              ) : null}

              <MdxContent source={localized.content} />

              <div className="mt-14 border-t border-chalk/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                      {dict.blogPage.author}
                    </p>
                    <p className="mt-2 text-[13px] text-chalk/80">Manoj Pathak</p>
                  </div>
                  <ShareLink
                    label={dict.common.share}
                    copiedLabel={dict.common.shareCopied}
                  />
                </div>

                {relatedProjects.length ? (
                  <div className="mt-8 border-t border-chalk/10 pt-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
                      {dict.common.relatedProjects}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {relatedProjects.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={localizedPath(locale, `/projects/${project.slug}`)}
                            className="group inline-flex items-center gap-2 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
                          >
                            {project.title}
                            <ArrowUpRight
                              className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="min-w-0 md:col-span-4">
              <div className="sticky top-28 space-y-10">
                <TableOfContents items={toc} label={dict.blogPage.toc} />
                <Link
                  href={localizedPath(locale, '/blog')}
                  className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
                >
                  ← {dict.blogPage.back}
                </Link>
              </div>
            </aside>
          </div>
        </article>

        <section className="mt-20 border-t border-chalk/10 pt-8">
          <p className="eyebrow">{dict.common.relatedArticles}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={localizedPath(locale, `/blog/${item.slug}`)}
                className="group border border-chalk/10 p-5 transition-colors hover:border-chalk/25"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                  {item.category} · {item.readingTime} {dict.common.minRead}
                </p>
                <h2 className="mt-4 font-display text-lg tracking-[-0.02em] text-chalk/90 group-hover:text-chalk">
                  {item.title}
                </h2>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <JsonLd
        data={articleSchema({
          locale,
          slug: post.slug,
          title: localized.title,
          description: localized.description,
          date: post.date,
          tags: post.tags,
          image: `/og/blog/${post.slug}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.blog, pathname: '/blog' },
            { name: localized.title, pathname: `/blog/${post.slug}` },
          ],
          locale,
        )}
      />
    </div>
  );
}
