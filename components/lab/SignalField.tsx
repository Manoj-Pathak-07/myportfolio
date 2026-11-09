'use client';

import { useRef } from 'react';

export function SignalField() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        ref.current?.style.setProperty('--mx', `${x}%`);
        ref.current?.style.setProperty('--my', `${y}%`);
      }}
      className="relative h-full w-full overflow-hidden bg-ink-raised"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgb(var(--chalk) / 0.16) 1px, transparent 1.4px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(var(--electric) / 0.34), rgb(var(--violet) / 0.1) 24%, transparent 46%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55" />
      <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-chalk/50">
        Move pointer
      </span>
    </div>
  );
}
