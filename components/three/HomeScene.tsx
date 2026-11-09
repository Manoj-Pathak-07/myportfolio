'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@/content/types';
import { SceneFallback } from './SceneFallback';
import { setSceneProgress } from './scene-state';

gsap.registerPlugin(ScrollTrigger);

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

export function HomeScene({
  locale,
  projects,
}: {
  locale: Locale;
  projects: { slug: string; title: string; category: string }[];
}) {
  const [mode, setMode] = useState<'pending' | 'scene' | 'static'>('pending');
  const { resolvedTheme } = useTheme();
  const sceneTheme = resolvedTheme === 'light' ? 'light' : 'dark';

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !supportsWebGL()) {
      setMode('static');
      return;
    }

    const timer = window.setTimeout(() => setMode('scene'), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode !== 'scene') return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setSceneProgress(self.progress),
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      trigger.kill();
      window.removeEventListener('load', onLoad);
      setSceneProgress(0);
    };
  }, [mode]);

  return (
    <div className="site-scene fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="scene-fade absolute inset-0" />
      <div className="site-scene-canvas absolute inset-0 transition-opacity duration-300">
        {mode === 'scene' ? (
          <SceneCanvas locale={locale} projects={projects} theme={sceneTheme} />
        ) : (
          <SceneFallback />
        )}
      </div>
      <div className="scene-vignette-mobile pointer-events-none absolute inset-0 md:hidden" />
      <div className="scene-vignette pointer-events-none absolute inset-0 hidden md:block" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
