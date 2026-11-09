'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';

export interface BlogListItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export function BlogIndex({
  locale,
  dict,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  posts: BlogListItem[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))),
    [posts],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category;
      const matchesTerm =
        !term ||
        [post.title, post.description, post.category, ...post.tags]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [category, posts, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-t border-chalk/10 pt-5 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-sm">
          <span className="sr-only">{dict.common.search}</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/80"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.blogPage.searchPlaceholder}
            className="field pl-10"
          />
        </label>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={dict.common.filterBy}
        >
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
            className={`min-h-9 border px-3 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
              category === 'all'
                ? 'border-electric/50 bg-electric/10 text-chalk'
                : 'border-chalk/10 text-muted hover:border-chalk/25 hover:text-chalk'
            }`}
          >
            {dict.common.all}
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`min-h-9 border px-3 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors ${
                category === item
                  ? 'border-electric/50 bg-electric/10 text-chalk'
                  : 'border-chalk/10 text-muted hover:border-chalk/25 hover:text-chalk'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
        {String(filtered.length).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
      </p>

      {filtered.length === 0 ? (
        <div className="border-t border-chalk/10 py-16">
          <p className="text-sm text-muted">{dict.blogPage.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-electric"
          >
            {dict.common.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-6 border-t border-chalk/10">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={localizedPath(locale, `/blog/${post.slug}`)}
              className="group grid grid-cols-12 gap-x-5 gap-y-3 border-b border-chalk/10 py-7"
            >
              <div className="col-span-12 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80 md:col-span-3">
                <time dateTime={post.dateISO}>{post.date}</time>
                <span className="h-px w-4 bg-chalk/15" aria-hidden="true" />
                <span>{post.category}</span>
              </div>
              <div className="col-span-12 md:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl tracking-[-0.02em] text-chalk/90 transition-colors group-hover:text-chalk md:text-2xl">
                    {post.title}
                  </h2>
                  {post.featured ? (
                    <span className="tag border-electric/30 text-electric/90">
                      {dict.common.featured}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
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
      )}
    </div>
  );
}
