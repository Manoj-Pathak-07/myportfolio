import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { defaultLocale, locales, type Locale } from '@/content/types';
import { localizedPath } from './i18n';

export const siteUrl = profile.siteUrl.replace(/\/+$/, '');

export function absoluteUrl(pathname: string): string {
  return `${siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function languageAlternates(pathname: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        locale === 'en' ? 'en' : 'ne',
        absoluteUrl(localizedPath(locale, pathname)),
      ]),
    ),
    'x-default': absoluteUrl(localizedPath(defaultLocale, pathname)),
  } as Record<string, string>;
}

interface MetadataInput {
  locale: Locale;
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
}

export function buildMetadata({
  locale,
  title,
  description,
  pathname = '/',
  image = '/og/home.png',
  type = 'website',
  publishedTime,
  tags,
}: MetadataInput): Metadata {
  const url = absoluteUrl(localizedPath(locale, pathname));
  const imageUrl = absoluteUrl(image);
  const openGraph: NonNullable<Metadata['openGraph']> =
    type === 'article'
      ? {
          type: 'article',
          url,
          siteName: profile.name,
          title,
          description,
          locale: locale === 'en' ? 'en_US' : 'ne_NP',
          alternateLocale: locale === 'en' ? 'ne_NP' : 'en_US',
          publishedTime,
          authors: [profile.name],
          tags,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
        }
      : {
          type: 'website',
          url,
          siteName: profile.name,
          title,
          description,
          locale: locale === 'en' ? 'en_US' : 'ne_NP',
          alternateLocale: locale === 'en' ? 'ne_NP' : 'en_US',
          images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
        };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    alternates: {
      canonical: url,
      languages: languageAlternates(pathname),
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${profile.githubHandle}`,
      images: [{ url: imageUrl, alt: title }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function personSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.name,
    description: profile.shortBio[locale],
    jobTitle: profile.roleDetailed[locale],
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: absoluteUrl(localizedPath(locale)),
    image: absoluteUrl(profile.avatar),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    worksFor: {
      '@type': 'Organization',
      name: profile.company,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Tribhuvan University — Janamaitri Multiple Campus',
    },
    knowsLanguage: profile.languages.map((language) => language.name[locale]),
    sameAs: [profile.github, profile.linkedin, profile.instagram],
    knowsAbout: [
      'Full Stack Development',
      'Flutter',
      'Dart',
      'Mobile Application Development',
      'Next.js',
      'React',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'SaaS Architecture',
      'Multi-Tenant Applications',
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: `${profile.name} — ${profile.roleDetailed[locale]}`,
    description: profile.shortBio[locale],
    url: absoluteUrl(localizedPath(locale)),
    inLanguage: locale === 'en' ? 'en' : 'ne',
    author: { '@id': `${siteUrl}/#person` },
    publisher: { '@id': `${siteUrl}/#person` },
  };
}

export function profilePageSchema(locale: Locale) {
  const url = absoluteUrl(localizedPath(locale, '/about'));
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#webpage`,
    url,
    name: `${profile.name} — ${profile.roleDetailed[locale]}`,
    description: profile.shortBio[locale],
    inLanguage: locale === 'en' ? 'en' : 'ne',
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntity: { '@id': `${siteUrl}/#person` },
    about: { '@id': `${siteUrl}/#person` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(profile.avatar),
    },
  };
}

export function webPageSchema(input: {
  locale: Locale;
  pathname: string;
  name: string;
  description: string;
  image?: string;
  type?: 'WebPage' | 'CollectionPage' | 'FAQPage';
  mainEntity?: unknown;
}) {
  const url = absoluteUrl(localizedPath(input.locale, input.pathname));
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: input.locale === 'en' ? 'en' : 'ne',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#person` },
  };

  if (input.image) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteUrl(input.image),
    };
  }

  if (input.mainEntity) {
    schema.mainEntity = input.mainEntity;
  }

  return schema;
}

export function collectionPageSchema(input: {
  locale: Locale;
  pathname: string;
  name: string;
  description: string;
  image?: string;
  items: { name: string; pathname: string }[];
}) {
  return webPageSchema({
    ...input,
    type: 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(localizedPath(input.locale, item.pathname)),
      })),
    },
  });
}

export function faqPageSchema(input: {
  locale: Locale;
  pathname: string;
  name: string;
  description: string;
  faqs: { question: string; answer: string }[];
}) {
  return webPageSchema({
    locale: input.locale,
    pathname: input.pathname,
    name: input.name,
    description: input.description,
    type: 'FAQPage',
    mainEntity: input.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  });
}

export function breadcrumbSchema(
  items: { name: string; pathname: string }[],
  locale: Locale,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.pathname)),
    })),
  };
}

export function articleSchema(input: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
}) {
  const url = absoluteUrl(localizedPath(input.locale, `/blog/${input.slug}`));
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    inLanguage: input.locale === 'en' ? 'en' : 'ne',
    author: { '@id': `${siteUrl}/#person` },
    publisher: { '@id': `${siteUrl}/#person` },
    mainEntityOfPage: url,
    keywords: input.tags.join(', '),
    image: absoluteUrl(input.image ?? '/og/blog.png'),
  };
}

export function creativeWorkSchema(input: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  const pageUrl = absoluteUrl(localizedPath(input.locale, `/projects/${input.slug}`));
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#creativework`,
    name: input.title,
    description: input.description,
    inLanguage: input.locale === 'en' ? 'en' : 'ne',
    creator: { '@id': `${siteUrl}/#person` },
    url: pageUrl,
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.url ? { sameAs: input.url } : {}),
  };
}
