import type { Metadata } from 'next';
import { ArrowUpRight, Github } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { Reveal } from '@/components/ui/Reveal';
import { OrbitLoader } from '@/components/lab/OrbitLoader';
import { SignalField } from '@/components/lab/SignalField';
import { TypeDecode } from '@/components/lab/TypeDecode';
import { labExperiments } from '@/content/lab';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import { getDictionary, isLocale } from '@/lib/i18n';
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
    title: dict.meta.lab.title,
    description: dict.meta.lab.description,
    pathname: '/lab',
    image: '/og/lab.png',
  });
}

const previews = {
  'signal-field': SignalField,
  'type-decode': TypeDecode,
  'orbit-loader': OrbitLoader,
} as const;

export default async function LabPage({
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
            items={[{ label: dict.nav.lab }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.labPage.eyebrow}
          title={dict.labPage.title}
          lead={dict.labPage.lead}
        />

        <p className="max-w-xl border-t border-chalk/10 pt-5 text-[12px] leading-relaxed text-muted/80">
          {dict.labPage.note}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {labExperiments.map((experiment) => {
            const Preview = previews[experiment.id as keyof typeof previews];
            if (!Preview) return null;
            return (
              <Reveal key={experiment.id} delay={experiment.order * 0.05}>
                <article className="motion-card frame-corners border border-chalk/10">
                <div className="aspect-[4/3] border-b border-chalk/10">
                  <Preview />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-electric">
                      {experiment.kind[locale]}
                    </p>
                    <span className="font-mono text-[9px] text-muted/80">
                      0{experiment.order}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl tracking-[-0.02em] text-chalk">
                    {experiment.title[locale]}
                  </h2>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-muted">
                    {experiment.description[locale]}
                  </p>
                </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <section className="mt-16 border-t border-chalk/10 pt-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">{dict.labPage.openSourceTitle}</p>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
                {dict.labPage.openSourceBody}
              </p>
            </div>
            <div className="md:col-span-7 md:text-right">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="button-secondary"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.labPage.githubCta}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">({dict.common.opensNewTab})</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <JsonLd
        data={webPageSchema({
          locale,
          pathname: '/lab',
          name: dict.meta.lab.title,
          description: dict.meta.lab.description,
          image: '/og/lab.png',
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.lab, pathname: '/lab' },
          ],
          locale,
        )}
      />
    </div>
  );
}
