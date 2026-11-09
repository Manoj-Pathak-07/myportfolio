import { getAllPosts, localizePost } from '@/content/blog';
import { profile } from '@/content/profile';
import { localizedPath } from '@/lib/i18n';
import { absoluteUrl, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const localized = localizePost(post, 'en');
      const url = absoluteUrl(localizedPath('en', `/blog/${post.slug}`));
      return `    <item>
      <title>${escapeXml(localized.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(localized.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.name} — Build logs & notes`)}</title>
    <link>${absoluteUrl('/en/blog/')}</link>
    <description>${escapeXml('Engineering notes on multi-tenancy, order processing, performance, and building for the web.')}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
