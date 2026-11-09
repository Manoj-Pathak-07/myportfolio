import en from '@/content/translations/en.json';
import ne from '@/content/translations/ne.json';
import { defaultLocale, locales, type Locale } from '@/content/types';

export { defaultLocale, locales };
export type { Locale };
export type Dictionary = typeof en;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ne: 'नेपाली',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Deep merge with English as the fallback for any missing Nepali key. */
function withFallback<T>(base: T, override: unknown): T {
  if (!isJsonObject(base) || !isJsonObject(override)) {
    return (override === undefined ? base : override) as T;
  }
  const result: JsonObject = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in base ? withFallback((base as JsonObject)[key], value) : value;
  }
  return result as T;
}

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ne: withFallback(en, ne),
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Build a locale-prefixed path with the trailing slash used by the export. */
export function localizedPath(locale: Locale, pathname = '/'): string {
  const clean = pathname === '/' ? '' : `/${pathname.replace(/^\/|\/$/g, '')}`;
  return `/${locale}${clean}/`.replace(/\/{2,}/g, '/');
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return localizedPath(nextLocale);
  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return localizedPath(nextLocale, segments.slice(1).join('/'));
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ne' ? 'ne-NP' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ne' ? 'ne-NP' : 'en-GB').format(value);
}
