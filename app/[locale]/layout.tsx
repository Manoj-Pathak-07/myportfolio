import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AnimatedCursor } from '@/components/ui/AnimatedCursor';
import { JsonLd } from '@/components/ui/JsonLd';
import { profile } from '@/content/profile';
import { locales } from '@/content/types';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import {
  buildMetadata,
  personSchema,
  websiteSchema,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  variable: '--font-devanagari',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const dict = getDictionary(locale);

  return {
    ...buildMetadata({
      locale,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    }),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    manifest: '/manifest.webmanifest',
    other: {
      'format-detection': 'telephone=no',
    },
    ...(locale === 'ne' ? { description: dict.meta.defaultDescription } : {}),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const themeScript = `(function(){try{var s=localStorage.getItem('manoj-pathak-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:d;}catch(e){}})();`;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${devanagari.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-ink font-sans text-chalk antialiased transition-colors duration-300">
        <ThemeProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 bg-chalk px-4 py-3 text-sm font-medium text-ink transition-transform focus:translate-y-0"
          >
            {dict.nav.skip}
          </a>
          <AnimatedCursor />
          <Header locale={locale} dict={dict} />
          <main id="main">{children}</main>
          <Footer locale={locale} dict={dict} />
          <JsonLd data={personSchema(locale)} />
          <JsonLd data={websiteSchema(locale)} />
          <span className="sr-only">
            {profile.name} — {profile.role[locale]}, {profile.location[locale]}
          </span>
        </ThemeProvider>
      </body>
    </html>
  );
}
