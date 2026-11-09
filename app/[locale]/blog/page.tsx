import type { Metadata } from 'next';
import { Rss } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BlogIndex, type BlogListItem } from '@/components/blog/BlogIndex';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { getAllPosts, localizePost } from '@/content/blog';
import type { Locale } from '@/content/types';
import { formatDate, getDictionary, isLocale } from '@/lib/i18n';
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
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    pathname: '/blog',
    image: '/og/blog.png',
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);

  const posts: BlogListItem[] = getAllPosts().map((post) => {
    const localized = localizePost(post, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      description: localized.description,
      date: formatDate(localized.date, locale),
      dateISO: localized.date,
      category: localized.category,
      tags: localized.tags,
      readingTime: localized.readingTime,
      featured: localized.featured,
    };
  });

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[{ label: dict.nav.blog }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.blogPage.eyebrow}
          title={dict.blogPage.title}
          lead={dict.blogPage.lead}
          meta={
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-chalk"
            >
              <Rss className="h-3 w-3" aria-hidden="true" />
              RSS
            </a>
          }
        />
        <BlogIndex locale={locale} dict={dict} posts={posts} />
      </div>
      <JsonLd
        data={collectionPageSchema({
          locale,
          pathname: '/blog',
          name: dict.meta.blog.title,
          description: dict.meta.blog.description,
          image: '/og/blog.png',
          items: posts.map((post) => ({
            name: post.title,
            pathname: `/blog/${post.slug}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.blog, pathname: '/blog' },
          ],
          locale,
        )}
      />
    </div>
  );
}
