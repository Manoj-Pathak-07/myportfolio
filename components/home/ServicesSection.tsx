import {
  Cloud,
  Gauge,
  Layers,
  Server,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { services } from '@/content/services';
import type { Service } from '@/content/types';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons: Record<Service['icon'], LucideIcon> = {
  layers: Layers,
  cloud: Cloud,
  'shopping-bag': ShoppingBag,
  smartphone: Smartphone,
  server: Server,
  gauge: Gauge,
};

export function ServicesSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="services"
      className="relative z-10 scroll-mt-20 border-t border-chalk/[0.07] bg-ink/55 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.services.eyebrow}
          title={dict.home.services.title}
          lead={dict.home.services.lead}
        />

        <div className="mt-12 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal
                key={service.id}
                delay={index * 0.04}
                className="group border-t border-chalk/10 py-6 transition-colors hover:border-electric/40"
              >
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-5 w-5 text-electric" strokeWidth={1.25} aria-hidden="true" />
                  <span className="font-mono text-[9px] tracking-[0.16em] text-muted/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl tracking-[-0.02em] text-chalk">
                  {service.title[locale]}
                </h3>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
                  {service.body[locale]}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
