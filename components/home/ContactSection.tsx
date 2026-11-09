import Link from 'next/link';
import { ArrowUpRight, Download, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { TextReveal } from '@/components/ui/TextReveal';

export function ContactSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const cvHref = profile.resume.pdf ?? localizedPath(locale, profile.resume.printPath);

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-20 border-t border-chalk/10 bg-gradient-to-b from-ink/55 to-ink py-20 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow-accent">{dict.home.contact.eyebrow}</p>
            <p className="mt-8 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted/80">
              {dict.home.contact.edition}
              <br />
              {profile.coordinates.lat}
              <br />
              {profile.coordinates.lng}
            </p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-3xl font-display text-display-lg text-chalk">
              <TextReveal text={dict.home.contact.title} stagger={0.032} />
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              {dict.home.contact.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={profile.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="button-primary"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {dict.home.contact.cta}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
              <a href={`mailto:${profile.email}`} className="button-secondary">
                {dict.common.email}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href={cvHref}
                {...(profile.resume.pdf ? { download: true } : {})}
                className="inline-flex min-h-12 items-center gap-2 px-1 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
              >
                <Download className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                {dict.common.downloadCv}
              </a>
            </div>

            <div className="mt-6">
              <CopyEmail
                email={profile.email}
                label={dict.common.copyEmail}
                copiedLabel={dict.common.copied}
                className="inline-flex min-h-10 items-center gap-2 border border-chalk/15 px-4 text-[12px] text-chalk transition-colors hover:border-electric/60"
              />
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-chalk/10 pt-6">
              <a
                href={`mailto:${profile.email}`}
                className="link-line break-all text-sm text-chalk/85"
              >
                {profile.email}
              </a>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  Instagram
                </a>
                <Link
                  href={localizedPath(locale, '/contact')}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-chalk"
                >
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
