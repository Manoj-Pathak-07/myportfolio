import Image from 'next/image';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';

export function ProfilePortrait({
  locale,
  priority = false,
  sizes,
}: {
  locale: Locale;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-raised">
      <Image
        src={profile.avatar}
        alt={`${profile.name} — ${profile.role[locale]}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center grayscale contrast-[1.06] brightness-[0.94]"
      />
      <span
        className="portrait-overlay pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
