'use client';

import { Printer } from 'lucide-react';

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="button-primary">
      <Printer className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
