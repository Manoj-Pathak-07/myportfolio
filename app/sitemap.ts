import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/content/blog';
import { publicProjects } from '@/content/projects';
import { defaultLocale, locales, type Locale } from '@/content/types';
import { localizedPath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function alternates(pathname: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale: Locale) => [
          locale === 'en' ? 'en' : 'ne',
          absoluteUrl(localizedPath(locale, pathname)),
        ]),
      ),
      'x-default': absoluteUrl(localizedPath(defaultLocale, pathname)),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();
  const pages: {
    pathname: string;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    priority: number;
    lastModified?: Date;
  }[] = [
    { pathname: '/', changeFrequency: 'monthly', priority: 1 },
    { pathname: '/projects', changeFrequency: 'monthly', priority: 0.9 },
    { pathname: '/experience', changeFrequency: 'monthly', priority: 0.8 },
    { pathname: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { pathname: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { pathname: '/lab', changeFrequency: 'monthly', priority: 0.6 },
    { pathname: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { pathname: '/resume', changeFrequency: 'monthly', priority: 0.5 },
    ...publicProjects.map((project) => ({
      pathname: `/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      pathname: `/blog/${post.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      lastModified: new Date(`${post.date}T00:00:00Z`),
    })),
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: absoluteUrl(localizedPath(locale, page.pathname)),
      lastModified: page.lastModified ?? now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: alternates(page.pathname),
    })),
  );
}
