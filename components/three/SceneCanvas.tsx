'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Locale } from '@/content/types';
import { clamp } from '@/lib/utils';
import { CoreSculpture } from './CoreSculpture';
import {
  Chapter,
  ClusterChapter,
  ConstellationChapter,
  ConvergenceChapter,
  PillarChapter,
  TimelineChapter,
} from './ChapterGroups';
import { sceneState } from './scene-state';

const cameraKeyframes: [number, number, number][] = [
  [0, 0.15, 6.1],
  [-2.15, 0.95, 5.5],
  [2.3, -0.45, 5.7],
  [0.25, 1.45, 7.4],
  [-3.0, -0.75, 5.25],
  [0, 0.15, 4.55],
];

function AmbientParticles({ isLight }: { isLight: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { size } = useThree();
  const positions = useMemo(() => {
    const count = size.width < 768 ? 72 : 150;
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const t = index / count;
      const angle = t * Math.PI * 13;
      const radius = 4.1 + Math.sin(t * Math.PI * 5) * 1.7;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = (t - 0.5) * 8.2;
      values[index * 3 + 2] = Math.sin(angle) * radius * 0.62;
    }
    return values;
  }, [size.width]);

  useFrame((state) => {
    const material = points.current?.material as THREE.PointsMaterial | undefined;
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.012;
      points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.035;
    }
    if (material) {
      material.opacity = (isLight ? 0.38 : 0.5) + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={isLight ? '#405ce8' : '#8ea6ff'}
        size={isLight ? 0.018 : 0.025}
        sizeAttenuation
        transparent
        opacity={isLight ? 0.38 : 0.5}
        depthWrite={false}
      />
    </points>
  );
}

function SceneRoot({
  locale,
  projects,
}: {
  locale: Locale;
  projects: { slug: string; title: string; category: string }[];
}) {
  const { camera, size, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const smoothPointer = useRef({ x: 0, y: 0 });
  const offsetX = size.width >= 1024 ? 1.05 : size.width >= 640 ? 0.45 : 0;

  useFrame((_, delta) => {
    const chapter = clamp(sceneState.progress) * (cameraKeyframes.length - 1);
    const index = Math.min(Math.floor(chapter), cameraKeyframes.length - 2);
    const t = chapter - index;
    const from = cameraKeyframes[index] ?? [0, 0, 6];
    const to = cameraKeyframes[index + 1] ?? [0, 0, 6];

    target.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
      from[2] + (to[2] - from[2]) * t,
    );

    const damp = Math.min(1, delta * 2.6);
    smoothPointer.current.x += (pointer.x - smoothPointer.current.x) * damp;
    smoothPointer.current.y += (pointer.y - smoothPointer.current.y) * damp;

    target.x += smoothPointer.current.x * 0.32;
    target.y += smoothPointer.current.y * 0.2;

    camera.position.lerp(target, 1 - Math.exp(-3.2 * delta));
    lookAt.set(offsetX * 0.4, 0, 0);
    camera.lookAt(lookAt);
  });

  return (
    <group position={[offsetX, 0, 0]}>
      <CoreSculpture />
      <Chapter index={1}>
        <PillarChapter />
      </Chapter>
      <Chapter index={2}>
        <ClusterChapter />
      </Chapter>
      <Chapter index={3}>
        <ConstellationChapter locale={locale} projects={projects} />
      </Chapter>
      <Chapter index={4}>
        <TimelineChapter />
      </Chapter>
      <Chapter index={5}>
        <ConvergenceChapter />
      </Chapter>
    </group>
  );
}

export default function SceneCanvas({
  locale,
  projects,
  theme,
}: {
  locale: Locale;
  projects: { slug: string; title: string; category: string }[];
  theme: 'dark' | 'light';
}) {
  const [paused, setPaused] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.15, 6.1], fov: 38, near: 0.1, far: 40 }}
      dpr={[1, 1.75]}
      frameloop={paused ? 'never' : 'always'}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={[isLight ? '#f8fafc' : '#080b12', 7.5, 15]} />
      <ambientLight intensity={isLight ? 0.82 : 0.45} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={isLight ? 1.7 : 1.5}
        color={isLight ? '#405ce8' : '#c4d2ff'}
      />
      <pointLight
        position={[-5, -2.5, 2.5]}
        intensity={isLight ? 9 : 16}
        distance={12}
        color={isLight ? '#405ce8' : '#597bff'}
      />
      <pointLight
        position={[4, -3, 3]}
        intensity={isLight ? 7 : 12}
        distance={12}
        color={isLight ? '#7654d8' : '#a88cff'}
      />
      <AmbientParticles isLight={isLight} />
      <Suspense fallback={null}>
        <SceneRoot locale={locale} projects={projects} />
      </Suspense>
    </Canvas>
  );
}
