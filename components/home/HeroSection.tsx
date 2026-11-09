import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Download, MessageCircle } from 'lucide-react';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { ProfilePortrait } from '@/components/ui/ProfilePortrait';
import { TextReveal } from '@/components/ui/TextReveal';

export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const cvHref = profile.resume.pdf ?? localizedPath(locale, profile.resume.printPath);

  return (
    <section id="top" className="relative z-10">
      <div className="shell flex min-h-[100svh] flex-col justify-between pb-7 pt-28 md:pt-32">
        <div className="grid flex-1 content-center gap-10 py-10 md:grid-cols-12 md:py-16">
          <div className="md:col-span-7">
            <div
              className="flex items-center gap-3 animate-fade-rise motion-reduce:animate-none"
              style={{ animationDelay: '0.06s' }}
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {dict.hero.eyebrow}
              </p>
            </div>

            <p
              className="mt-5 animate-fade-rise font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-electric motion-reduce:animate-none"
              style={{ animationDelay: '0.14s' }}
            >
              {dict.hero.subtitle}
            </p>

            <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(2.6rem,5.4vw,4.9rem)] leading-[0.96] tracking-[-0.04em] text-chalk">
              <TextReveal text={dict.hero.headline} delay={0.08} stagger={0.038} />
            </h1>

            <div
              className="mt-7 max-w-xl animate-fade-rise motion-reduce:animate-none"
              style={{ animationDelay: '0.34s' }}
            >
              <p className="text-[14px] leading-relaxed text-chalk/75 md:text-[15px]">
                {dict.hero.lead}
              </p>
              <p className="mt-5 border-l border-electric/60 pl-4 text-[12px] leading-relaxed text-chalk/80">
                {dict.hero.statement}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticLink href={localizedPath(locale, '/projects')}>
                  {dict.hero.primaryCta}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </MagneticLink>
                <a
                  href={cvHref}
                  {...(profile.resume.pdf ? { download: true } : {})}
                  className="button-secondary"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {dict.hero.secondaryCta}
                </a>
                <Link
                  href={localizedPath(locale, '/contact')}
                  className="group inline-flex min-h-12 items-center gap-2 px-1 text-[13px] text-chalk/80 transition-colors hover:text-chalk"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
                  {dict.hero.tertiaryCta}
                  <ArrowUpRight
                    className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <figure
              className="flex animate-fade-rise items-start gap-5 motion-reduce:animate-none md:ml-auto md:block md:max-w-[16rem] lg:max-w-[19rem]"
              style={{ animationDelay: '0.24s' }}
            >
              <div className="relative aspect-square w-28 shrink-0 md:aspect-[4/5] md:w-full">
                <span
                  className="absolute -right-2 -top-2 hidden h-full w-full border border-electric/30 md:block"
                  aria-hidden="true"
                />
                <div className="portrait-frame relative h-full w-full border border-chalk/15 bg-ink-raised p-1.5">
                  <ProfilePortrait
                    locale={locale}
                    priority
                    sizes="(min-width: 1024px) 304px, (min-width: 768px) 256px, 112px"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/65 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.18em] text-chalk/90">
                    01 / 06
                  </span>
                </div>
              </div>

              <figcaption className="min-w-0 md:mt-5">
                <p className="font-display text-[15px] tracking-[-0.01em] text-chalk">
                  {profile.name}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-electric">
                  {profile.role[locale]}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                  {dict.hero.location}
                </p>

                <div className="mt-4 hidden items-center gap-3 border-t border-chalk/10 pt-3 font-mono text-[9px] tracking-[0.14em] text-muted/80 md:flex">
                  <span>{profile.coordinates.lat}</span>
                  <span className="h-px flex-1 bg-electric/40" aria-hidden="true" />
                  <span>{profile.coordinates.lng}</span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        <div
          className="flex animate-fade-rise flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-chalk/10 pt-5 motion-reduce:animate-none"
          style={{ animationDelay: '0.56s' }}
        >
          <dl className="hidden gap-8 sm:grid sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80">
                {dict.hero.metaRole}
              </dt>
              <dd className="mt-1.5 text-[12px] text-chalk/85">{dict.hero.subtitle}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80">
                {dict.hero.metaBase}
              </dt>
              <dd className="mt-1.5 text-[12px] text-chalk/85">{dict.hero.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80">
                {dict.hero.metaLanguages}
              </dt>
              <dd className="mt-1.5 text-[12px] text-chalk/85">
                {profile.languages.map((language) => language.name[locale]).join(' · ')}
              </dd>
            </div>
          </dl>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:inline">
              {dict.hero.techStack}
            </span>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-chalk"
            >
              {dict.hero.scroll}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-chalk/15 transition-colors group-hover:border-electric/60">
                <ArrowDown className="h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
