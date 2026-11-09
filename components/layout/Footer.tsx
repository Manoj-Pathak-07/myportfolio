import Link from 'next/link';
import { ArrowUp, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import type { Dictionary } from '@/lib/i18n';
import { localizedPath } from '@/lib/i18n';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { label: dict.nav.home, path: '/' },
    { label: dict.nav.about, path: '/about' },
    { label: dict.nav.experience, path: '/experience' },
    { label: dict.nav.projects, path: '/projects' },
    { label: dict.nav.skills, path: '/#skills' },
    { label: dict.nav.blog, path: '/blog' },
    { label: dict.nav.contact, path: '/contact' },
  ];
  const cvHref = profile.resume.pdf ?? localizedPath(locale, profile.resume.printPath);

  return (
    <footer className="relative z-10 border-t border-chalk/10 bg-ink">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href={localizedPath(locale)}
              className="font-display text-2xl font-medium tracking-[-0.03em]"
            >
              {profile.name}
            </Link>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-electric">
              {dict.footer.role}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block border-b border-chalk/20 pb-1 text-sm text-chalk transition-colors hover:border-electric"
            >
              {profile.email}
            </a>
            <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              {profile.coordinates.lat} · {profile.coordinates.lng}
              <br />
              {dict.footer.local}
            </p>
          </div>

          <nav aria-label={dict.nav.footer} className="md:col-span-4">
            <p className="eyebrow">{dict.footer.navigation}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path.includes('#') ? `${localizedPath(locale)}#skills` : localizedPath(locale, link.path)}
                    className="text-[13px] text-muted transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={cvHref}
              {...(profile.resume.pdf ? { download: true } : {})}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-chalk transition-colors hover:text-electric"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.common.downloadCv}
            </a>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow">{dict.footer.elsewhere}</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-chalk"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-chalk"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-chalk"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={profile.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-chalk"
                >
                  <span className="font-mono text-[10px]" aria-hidden="true">↗</span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-chalk"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {dict.common.email}
                </a>
              </li>
            </ul>

            <Link
              href={`${localizedPath(locale)}#top`}
              className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-chalk"
            >
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
              {dict.footer.top}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-chalk/10 pt-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {dict.footer.built}</p>
          <p className="font-mono uppercase tracking-[0.14em]">{dict.footer.closing}</p>
        </div>
      </div>
    </footer>
  );
}
