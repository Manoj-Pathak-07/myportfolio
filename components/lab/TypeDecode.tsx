'use client';

import { useEffect, useRef, useState } from 'react';

const phrases = ['BEYOND THE CODE', 'NEXT.JS × LARAVEL', 'MANOJ PATHAK'];
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#';

export function TypeDecode() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(phrases[0] ?? '');
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const target = phrases[index] ?? '';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(target);
      setRunning(false);
      return;
    }

    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2.2);
      const next = target
        .split('')
        .map((character, position) => {
          if (character === ' ') return ' ';
          if (position < revealed) return character;
          return glyphs[(position * 7 + frame * 3) % glyphs.length] ?? '·';
        })
        .join('');
      setDisplay(next);
      if (revealed >= target.length) {
        setDisplay(target);
        setRunning(false);
        if (timer.current) window.clearInterval(timer.current);
      }
    }, 34);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [index, running]);

  return (
    <button
      type="button"
      aria-label="Text scramble experiment. Activate to decode the next phrase."
      onClick={() => {
        setIndex((current) => (current + 1) % phrases.length);
        setRunning(true);
      }}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink-raised p-5 text-left"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,140,255,0.14),transparent_55%)]" />
      <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
        Decode / 0{index + 1}
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 whitespace-pre-wrap break-words font-mono text-lg tracking-[0.08em] text-chalk md:text-xl"
      >
        {display}
      </span>
      <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.16em] text-electric">
        Click to cycle
      </span>
    </button>
  );
}
