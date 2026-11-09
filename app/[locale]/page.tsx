import type { Metadata } from 'next';
import { AboutSection } from '@/components/home/AboutSection';
import { ContactSection } from '@/components/home/ContactSection';
import { EducationSection } from '@/components/home/EducationSection';
import { ExperiencePreview } from '@/components/home/ExperiencePreview';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { HeroSection } from '@/components/home/HeroSection';
import { PerformanceSection } from '@/components/home/PerformanceSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { SkillsSection } from '@/components/home/SkillsSection';
import { WritingSection } from '@/components/home/WritingSection';
import { HomeScene } from '@/components/three/HomeScene';
import { JsonLd } from '@/components/ui/JsonLd';
import { getAllPosts, localizePost } from '@/content/blog';
import { publicExperience } from '@/content/experience';
import { featuredProjects, publicProjects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { formatDate, getDictionary, isLocale } from '@/lib/i18n';
import { buildMetadata, webPageSchema } from '@/lib/seo';

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
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    pathname: '/',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);

  const posts = getAllPosts()
    .slice(0, 3)
    .map((post) => {
      const localized = localizePost(post, locale);
      return {
        slug: localized.slug,
        title: localized.title,
        description: localized.description,
        date: formatDate(localized.date, locale),
        category: localized.category,
        readingTime: localized.readingTime,
      };
    });

  const sceneProjects = publicProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
  }));

  const skillProjects = publicProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
  }));

  return (
    <>
      <HomeScene locale={locale} projects={sceneProjects} />
      <HeroSection locale={locale} dict={dict} />
      <AboutSection locale={locale} dict={dict} />
      <SkillsSection locale={locale} dict={dict} projects={skillProjects} />
      <FeaturedWork locale={locale} dict={dict} projects={featuredProjects} />
      <ExperiencePreview
        locale={locale}
        dict={dict}
        experience={publicExperience}
      />
      <PerformanceSection locale={locale} dict={dict} />
      <ServicesSection locale={locale} dict={dict} />
      <EducationSection locale={locale} dict={dict} />
      <WritingSection locale={locale} dict={dict} posts={posts} />
      <ContactSection locale={locale} dict={dict} />
      <JsonLd
        data={webPageSchema({
          locale,
          pathname: '/',
          name: dict.meta.home.title,
          description: dict.meta.home.description,
          image: '/og/home.png',
        })}
      />
    </>
  );
}
