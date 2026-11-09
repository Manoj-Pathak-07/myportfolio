import { TextReveal } from '@/components/ui/TextReveal';

export function PageIntro({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  meta?: React.ReactNode;
}) {
  return (
    <header className="pb-14 pt-8 md:pb-20 md:pt-12">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow-accent">{eyebrow}</p>
        </div>
        <div className="md:col-span-7">
          <h1 className="font-display text-display-lg text-chalk">
            <TextReveal text={title} stagger={0.035} />
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
            {lead}
          </p>
        </div>
        {meta ? <div className="md:col-span-2">{meta}</div> : null}
      </div>
    </header>
  );
}
