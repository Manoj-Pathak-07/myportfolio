'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

export function ShareLink({
  label,
  copiedLabel,
}: {
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 border border-chalk/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-chalk/25 hover:text-chalk"
    >
      {copied ? (
        <Check className="h-3 w-3" aria-hidden="true" />
      ) : (
        <Link2 className="h-3 w-3" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
