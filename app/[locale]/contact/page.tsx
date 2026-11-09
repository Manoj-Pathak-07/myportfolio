import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageIntro } from '@/components/ui/PageIntro';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import { getDictionary, isLocale, localizedPath } from '@/lib/i18n';
import { breadcrumbSchema, buildMetadata, faqPageSchema } from '@/lib/seo';

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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    pathname: '/contact',
    image: '/og/contact.png',
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);
  const rawForm = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  const formUrl = rawForm && /^https:\/\//.test(rawForm) ? rawForm : null;
  const cvHref = profile.resume.pdf ?? localizedPath(locale, profile.resume.printPath);

  return (
    <div className="relative z-10 bg-ink">
      <div className="shell pb-24">
        <div className="pt-28 md:pt-32">
          <Breadcrumbs
            locale={locale}
            dict={dict}
            items={[{ label: dict.nav.contact }]}
          />
        </div>
        <PageIntro
          eyebrow={dict.contactPage.eyebrow}
          title={dict.contactPage.title}
          lead={dict.contactPage.lead}
        />

        <div className="grid gap-12 border-t border-chalk/10 pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">{dict.contactPage.emailTitle}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 block break-all font-display text-[clamp(1.4rem,4vw,2.6rem)] leading-tight tracking-[-0.03em] text-chalk transition-colors hover:text-electric"
            >
              {profile.email}
            </a>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              {dict.contactPage.emailBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="button-primary">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.common.email}
              </a>
              <a
                href={profile.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="button-secondary"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.contactPage.whatsappTitle}
              </a>
              <CopyEmail
                email={profile.email}
                label={dict.common.copyEmail}
                copiedLabel={dict.common.copied}
                className="button-secondary"
              />
            </div>

            <div className="mt-12 grid gap-8 border-t border-chalk/10 pt-7 sm:grid-cols-2">
              <div>
                <p className="eyebrow">{dict.contactPage.whatsappTitle}</p>
                <a
                  href={profile.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-2 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  {profile.whatsapp}
                </a>
                <p className="mt-2 text-[12px] text-muted/80">
                  {dict.contactPage.whatsappBody}
                </p>
              </div>
              <div>
                <p className="eyebrow">{dict.contactPage.locationTitle}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-[14px] text-chalk/85">
                  <MapPin className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  {profile.location[locale]}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-muted/80">
                  {profile.coordinates.lat} · {profile.coordinates.lng}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-chalk/10 pt-7">
              <p className="eyebrow">{dict.contactPage.responseTitle}</p>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-chalk/85">
                {dict.contactPage.responseBody}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={cvHref}
                  {...(profile.resume.pdf ? { download: true } : {})}
                  className="button-secondary"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {dict.common.downloadCv}
                </a>
                <Link
                  href={localizedPath(locale, profile.resume.printPath)}
                  className="inline-flex min-h-12 items-center gap-2 px-1 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
                >
                  {dict.contactPage.resumeCta}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="panel p-6 md:p-7">
              <p className="eyebrow">{dict.contactPage.socialTitle}</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between border-b border-chalk/10 pb-3 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Github className="h-4 w-4 text-muted" aria-hidden="true" />
                      GitHub
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between border-b border-chalk/10 pb-3 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Linkedin className="h-4 w-4 text-muted" aria-hidden="true" />
                      LinkedIn
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between border-b border-chalk/10 pb-3 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Instagram className="h-4 w-4 text-muted" aria-hidden="true" />
                      {profile.instagramHandle}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between border-b border-chalk/10 pb-3 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <MessageCircle className="h-4 w-4 text-muted" aria-hidden="true" />
                      WhatsApp
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between pb-1 text-[14px] text-chalk/85 transition-colors hover:text-chalk"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-muted" aria-hidden="true" />
                      {dict.common.email}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-6 border border-chalk/10 p-6">
              <p className="eyebrow">{dict.contactPage.formTitle}</p>
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                {dict.contactPage.formBody}
              </p>
              {formUrl ? (
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="button-secondary mt-5"
                >
                  {dict.contactPage.formCta}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <section className="mt-20 border-t border-chalk/10 pt-8">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              <p className="eyebrow">{dict.contactPage.faqTitle}</p>
              <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-muted/80">
                {dict.contactPage.faqLead}
              </p>
            </div>
            <div className="md:col-span-9">
              <div className="divide-y divide-chalk/10 border-y border-chalk/10">
                {dict.contactPage.faq.map((item, index) => (
                  <article
                    key={item.question}
                    className="grid gap-3 py-6 sm:grid-cols-[2rem_1fr]"
                  >
                    <span className="font-mono text-[9px] tracking-[0.16em] text-electric/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-display text-lg tracking-[-0.02em] text-chalk">
                        {item.question}
                      </h2>
                      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <JsonLd
        data={faqPageSchema({
          locale,
          pathname: '/contact',
          name: dict.meta.contact.title,
          description: dict.meta.contact.description,
          faqs: dict.contactPage.faq,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.nav.home, pathname: '/' },
            { name: dict.nav.contact, pathname: '/contact' },
          ],
          locale,
        )}
      />
    </div>
  );
}
