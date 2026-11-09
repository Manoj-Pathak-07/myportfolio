import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface WritingItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
}

export function WritingSection({
  locale,
  dict,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  posts: WritingItem[];
}) {
  return (
    <section
      id="writing"
      className="relative z-10 border-t border-chalk/[0.07] bg-ink/55 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.writing.eyebrow}
          title={dict.home.writing.title}
          lead={dict.home.writing.lead}
          link={localizedPath(locale, '/blog')}
          linkLabel={dict.home.writing.link}
        />

        <div className="mt-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={localizedPath(locale, `/blog/${post.slug}`)}
              className="group grid grid-cols-12 gap-x-5 gap-y-2 border-t border-chalk/10 py-6 last:border-b"
            >
              <div className="col-span-12 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:col-span-3">
                <time dateTime={post.date}>{post.date}</time>
                <span className="h-px w-4 bg-chalk/15" aria-hidden="true" />
                <span>{post.category}</span>
              </div>
              <div className="col-span-12 md:col-span-7">
                <h3 className="font-display text-lg tracking-[-0.015em] text-chalk/90 transition-colors group-hover:text-chalk md:text-xl">
                  {post.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted">
                  {post.description}
                </p>
              </div>
              <div className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
                  {post.readingTime} {dict.common.minRead}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
