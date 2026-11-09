import { performanceHighlights, performanceStatement } from '@/content/services';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';

export function PerformanceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="performance"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/70 py-20 md:py-28"
    >
      <div className="shell">
        <div className="grid gap-8 border-t border-chalk/10 pt-7 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow">{dict.home.performance.eyebrow}</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="max-w-3xl font-display text-display-sm text-chalk">
              <TextReveal text={dict.home.performance.title} stagger={0.026} />{' '}
              <span className="text-muted">
                <TextReveal text={dict.home.performance.emphasis} stagger={0.026} delay={0.08} />
              </span>
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <p className="max-w-xl text-[15px] leading-[1.8] text-muted">
                {performanceStatement.body[locale]}
              </p>
              <p className="max-w-sm border-l border-electric/60 pl-5 font-display text-lg leading-snug tracking-[-0.02em] text-chalk/90">
                {dict.home.performance.lead}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px border border-chalk/10 bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
          {performanceHighlights.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05} className="bg-ink/95 p-6">
              <span className="font-mono text-[9px] tracking-[0.16em] text-electric">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-7 font-display text-lg tracking-[-0.02em] text-chalk">
                {item.title[locale]}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                {item.body[locale]}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
