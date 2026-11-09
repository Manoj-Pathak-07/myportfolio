'use client';

import { useEffect, useRef } from 'react';

export function AnimatedCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!root || !ring || !dot) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const html = document.documentElement;

    const target = { x: -80, y: -80 };
    const ringPosition = { x: -80, y: -80 };
    const dotPosition = { x: -80, y: -80 };
    let frame = 0;
    let hasMoved = false;

    const render = () => {
      ringPosition.x += (target.x - ringPosition.x) * 0.16;
      ringPosition.y += (target.y - ringPosition.y) * 0.16;
      dotPosition.x += (target.x - dotPosition.x) * 0.52;
      dotPosition.y += (target.y - dotPosition.y) * 0.52;

      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;
      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0)`;

      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        html.classList.add('has-site-cursor');
        ringPosition.x = event.clientX;
        ringPosition.y = event.clientY;
        dotPosition.x = event.clientX;
        dotPosition.y = event.clientY;
        root.dataset.visible = 'true';
      }

      const element = event.target instanceof Element ? event.target : null;
      const field = element?.closest(
        'input, textarea, select, [contenteditable="true"]',
      );
      const card = element?.closest('[data-cursor="card"]');
      const active = element?.closest(
        'a, button, [role="button"], [role="tab"], [data-cursor="card"]',
      );

      root.dataset.field = field ? 'true' : 'false';
      root.dataset.card = card ? 'true' : 'false';
      root.dataset.active = active ? 'true' : 'false';
    };

    const hide = () => {
      root.dataset.visible = 'false';
      html.classList.remove('has-site-cursor');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      html.classList.remove('has-site-cursor');
    };
  }, []);

  return (
    <div ref={rootRef} className="site-cursor" aria-hidden="true">
      <div ref={ringRef} className="site-cursor__ring" />
      <div ref={dotRef} className="site-cursor__dot" />
    </div>
  );
}
