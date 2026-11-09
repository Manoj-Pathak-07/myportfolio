import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Full Stack & Flutter Developer`,
    short_name: 'Manoj Pathak',
    description: profile.shortBio.en,
    start_url: '/en/',
    display: 'standalone',
    background_color: '#080B12',
    theme_color: '#080B12',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
