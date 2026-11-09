import { getAllPosts, localizePost } from '@/content/blog';
import { profile } from '@/content/profile';
import { publicProjects } from '@/content/projects';
import { getDictionary, localizedPath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const projects = publicProjects.map((project) => {
    const url = absoluteUrl(localizedPath('en', `/projects/${project.slug}`));
    return `- [${project.title}](${url}): ${project.seoDescription.en}`;
  });

  const posts = getAllPosts().map((post) => {
    const localized = localizePost(post, 'en');
    const url = absoluteUrl(localizedPath('en', `/blog/${post.slug}`));
    return `- [${localized.title}](${url}): ${localized.description}`;
  });

  const dict = getDictionary('en');
  const faqs = dict.contactPage.faq.map(
    (faq) => `### ${faq.question}\n\n${faq.answer}`,
  );

  const body = `# Manoj Pathak — Full Stack & Flutter Developer

> Manoj Pathak is a full-stack and Flutter developer based in Kathmandu, Nepal. He builds performance-focused websites, SaaS platforms, backend APIs, and mobile applications.

Manoj currently works at Webcreation Nepal. His primary stack is Next.js, React, TypeScript, Laravel, PHP, MySQL, and Flutter. This site publishes verified project case studies, professional experience, and technical writing. It does not claim client testimonials or unverified performance metrics.

- Website: ${profile.siteUrl}
- Location: Kathmandu, Nepal
- Languages: English, Nepali
- Email: ${profile.email}
- WhatsApp: ${profile.whatsapp}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}

## Main pages

- [Home](${absoluteUrl(localizedPath('en'))}): Introduction, selected work, services, experience, and contact details.
- [About](${absoluteUrl(localizedPath('en', '/about'))}): Background, working principles, education, and technical focus.
- [Experience](${absoluteUrl(localizedPath('en', '/experience'))}): Current and previous roles with responsibilities and technologies.
- [Projects](${absoluteUrl(localizedPath('en', '/projects'))}): Verified case studies across business websites, SaaS, web, and mobile.
- [Blog](${absoluteUrl(localizedPath('en', '/blog'))}): Practical notes on Laravel, multi-tenancy, performance, and web engineering.
- [Lab](${absoluteUrl(localizedPath('en', '/lab'))}): Small interaction and motion experiments.
- [Contact](${absoluteUrl(localizedPath('en', '/contact'))}): Email, WhatsApp, social profiles, location, and common questions.
- [Resume](${absoluteUrl(localizedPath('en', '/resume'))}): Print-ready professional profile.

## Case studies

${projects.join('\n')}

## Technical writing

${posts.join('\n')}

## Common questions

${faqs.join('\n\n')}

## Nepali

- [नेपाली गृहपृष्ठ](${absoluteUrl(localizedPath('ne'))}): नेपाली भाषाको पोर्टफोलियो।
- [नेपाली परियोजना](${absoluteUrl(localizedPath('ne', '/projects'))}): परियोजना केस स्टडीहरू।
- [नेपाली ब्लग](${absoluteUrl(localizedPath('ne', '/blog'))}): प्राविधिक लेखहरू।

## Contact

Email ${profile.email} or message ${profile.whatsapp} on WhatsApp. Email is the most reliable route for detailed enquiries.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
