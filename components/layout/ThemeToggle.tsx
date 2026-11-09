'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle({
  label,
  toLight,
  toDark,
}: {
  label: string;
  toLight: string;
  toDark: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== 'light';
  const actionLabel = isDark ? toLight : toDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={actionLabel}
      title={actionLabel}
      className="inline-flex h-9 w-9 items-center justify-center border border-chalk/15 text-chalk/80 transition-colors hover:border-electric/60 hover:text-chalk"
    >
      <span className="sr-only">{label}</span>
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
