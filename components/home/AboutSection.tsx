import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/55 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.about.eyebrow}
          title={dict.home.about.title}
          lead={dict.home.about.lead}
          link={localizedPath(locale, '/about')}
          linkLabel={dict.home.about.link}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="max-w-sm font-display text-xl leading-snug tracking-[-0.02em] text-chalk/90">
              {profile.about[locale][2]}
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              {profile.company}
              <br />
              {profile.location[locale]}
            </p>
          </Reveal>

          <div className="md:col-span-8">
            <div className="grid border border-chalk/10 bg-chalk/10 sm:grid-cols-3 sm:gap-px">
              {dict.home.about.pillars.map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.06}
                  className="bg-ink/95 p-6 md:p-7"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-electric">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 font-display text-lg tracking-[-0.02em] text-chalk">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-6 border-l border-electric/60 pl-5">
              <p className="max-w-2xl font-display text-xl leading-snug tracking-[-0.02em] text-chalk">
                {profile.aboutHighlight[locale]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
