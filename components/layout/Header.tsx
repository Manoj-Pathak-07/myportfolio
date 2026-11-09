'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localeNames, localizedPath, locales, switchLocalePath } from '@/lib/i18n';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'experience', path: '/experience' },
  { key: 'projects', path: '/projects' },
  { key: 'skills', path: '/#skills' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contact' },
] as const;

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const home = localizedPath(locale);
  const cvHref = profile.resume.pdf ?? localizedPath(locale, profile.resume.printPath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const hrefFor = (path: string) =>
    path.includes('#') ? `${home}${path.slice(1)}` : localizedPath(locale, path);

  const isActive = (path: string) => {
    if (path.includes('#')) return false;
    const href = localizedPath(locale, path);
    return path === '/' ? pathname === href : pathname === href || pathname.startsWith(href);
  };

  return (
    <header
      data-scrolled={scrolled || open}
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-chalk/10 bg-ink/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-5">
        <Link href={home} className="group flex items-center gap-3" aria-label={profile.name}>
          <span className="flex h-8 w-8 items-center justify-center border border-chalk/15 font-mono text-[10px] tracking-[0.08em] text-chalk transition-colors duration-300 group-hover:border-electric/60">
            MP
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[13px] font-medium tracking-[0.01em] text-chalk">
              {profile.name}
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              {dict.hero.chapter}
            </span>
          </span>
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={hrefFor(item.path)}
              className="nav-link"
              data-active={isActive(item.path)}
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle
            label={dict.common.theme}
            toLight={dict.common.toLight}
            toDark={dict.common.toDark}
          />

          <div
            role="group"
            aria-label={dict.common.language}
            className="flex items-center border border-chalk/20 bg-ink/40 p-0.5"
          >
            {locales.map((option) => {
              const label = option === 'en' ? 'EN' : 'नेपाली';
              const active = option === locale;
              const styles = `inline-flex h-8 min-w-8 items-center justify-center px-2.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                active
                  ? 'bg-chalk text-ink'
                  : 'text-chalk/75 hover:bg-chalk/5 hover:text-chalk'
              }`;

              return active ? (
                <span key={option} aria-current="true" className={styles} lang={option}>
                  {label}
                </span>
              ) : (
                <Link
                  key={option}
                  href={switchLocalePath(pathname, option)}
                  hrefLang={option}
                  lang={option}
                  aria-label={localeNames[option]}
                  className={styles}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <a
            href={cvHref}
            {...(profile.resume.pdf ? { download: true } : {})}
            className="hidden min-h-9 items-center gap-1.5 border border-chalk/15 px-3.5 text-[11px] tracking-[0.02em] text-chalk transition-colors hover:border-electric/60 hover:bg-electric/5 lg:inline-flex"
          >
            <Download className="h-3 w-3" aria-hidden="true" />
            {dict.common.downloadCv}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-chalk xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        className={`fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-chalk/10 bg-ink transition-[opacity,transform] duration-300 xl:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="shell flex min-h-full flex-col justify-between pb-10 pt-8">
          <nav aria-label={dict.nav.primary}>
            <ul>
              {navItems.map((item, index) => (
                <li key={item.key} className="border-b border-chalk/10">
                  <Link
                    href={hrefFor(item.path)}
                    className="flex items-center justify-between py-4"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-2xl tracking-[-0.02em]">
                        {dict.nav[item.key]}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-5">
            <a
              href={cvHref}
              {...(profile.resume.pdf ? { download: true } : {})}
              className="button-secondary w-full"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.common.downloadCv}
            </a>
            <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <p>{profile.location[locale]}</p>
              <a href={`mailto:${profile.email}`} className="block text-chalk">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
