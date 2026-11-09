'use client';

import { useMemo, useRef, useState } from 'react';
import { Html, Line } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import type { Locale } from '@/content/types';
import { clamp } from '@/lib/utils';
import { localizedPath } from '@/lib/i18n';
import { sceneState } from './scene-state';

function easeProximity(index: number): number {
  const chapter = clamp(sceneState.progress) * 5;
  const proximity = clamp(1 - Math.abs(chapter - index) / 0.9, 0, 1);
  return proximity * proximity * (3 - 2 * proximity);
}

/** Fades/scales a chapter group in and out based on scroll proximity. */
export function Chapter({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = 0.001 + easeProximity(index);
    const current = ref.current.scale.x;
    const next = current + (target - current) * Math.min(1, delta * 5);
    ref.current.scale.setScalar(next);
    ref.current.visible = next > 0.02;
    ref.current.rotation.y += delta * 0.07 * (next > 1 ? 1 : 0.2);
  });

  return (
    <group ref={ref} scale={0.001}>
      {children}
    </group>
  );
}

const lightAccents: Record<string, string> = {
  '#597bff': '#405ce8',
  '#a88cff': '#7654d8',
  '#c7d6ff': '#64748b',
  '#d7e2ff': '#94a3b8',
  '#9d8cff': '#6d5bd0',
  '#b7c6ff': '#94a3b8',
  '#e9f1ff': '#334155',
  '#dfe8ff': '#334155',
};

function NodeMaterial({ color, active = false }: { color: string; active?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const resolvedColor = isLight ? (lightAccents[color] ?? color) : color;
  return (
    <meshStandardMaterial
      color={resolvedColor}
      emissive={resolvedColor}
      emissiveIntensity={active ? (isLight ? 0.75 : 1.8) : isLight ? 0.22 : 0.55}
      metalness={isLight ? 0.32 : 0.5}
      roughness={isLight ? 0.42 : 0.3}
    />
  );
}

const pillarPositions: [number, number, number][] = [
  [2.25, 0.75, 0.1],
  [-1.75, 1.7, 0.5],
  [0.5, -2.05, -0.3],
];

export function PillarChapter() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<Array<THREE.Group | null>>([]);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = time * 0.06;
    nodes.current.forEach((node, index) => {
      if (!node) return;
      node.position.y = (pillarPositions[index]?.[1] ?? 0) + Math.sin(time * 0.9 + index) * 0.08;
      node.rotation.z = Math.sin(time * 0.65 + index) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {pillarPositions.map((position, index) => (
        <group
          key={index}
          position={position}
          ref={(node) => {
            nodes.current[index] = node;
          }}
        >
          <mesh>
            <icosahedronGeometry args={[0.16, 0]} />
            <NodeMaterial color={index === 0 ? '#597bff' : index === 1 ? '#a88cff' : '#c7d6ff'} />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
            <torusGeometry args={[0.36, 0.004, 6, 64]} />
            <meshBasicMaterial color="#597bff" transparent opacity={0.4} />
          </mesh>
          <Line
            points={[
              [0, 0, 0],
              [-position[0], -position[1], -position[2]],
            ]}
            color={isLight ? '#405ce8' : '#597bff'}
            transparent
            opacity={isLight ? 0.3 : 0.18}
            lineWidth={1}
            dashed
            dashSize={0.25}
            gapSize={0.18}
          />
        </group>
      ))}
    </group>
  );
}

const clusterPositions: [number, number, number][] = [
  [2.6, 0.35, 0.2],
  [0.1, 2.25, -0.7],
  [-2.45, -0.85, 0.4],
  [0.35, -2.2, 0.8],
  [-1.9, 1.95, 0.55],
  [2.1, -1.85, -0.5],
];

const clusterIds = [
  'frontend',
  'backend',
  'mobile',
  'database',
  'architecture',
  'tools',
] as const;

const clusterColors = ['#597bff', '#a88cff', '#7f9cff', '#d7e2ff', '#9d8cff', '#b7c6ff'];

export function ClusterChapter() {
  const refs = useRef<Array<THREE.Group | null>>([]);
  const group = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = time * 0.05;
    }
    clusterIds.forEach((id, index) => {
      const node = refs.current[index];
      if (!node) return;
      const active = sceneState.activeCluster === id;
      const target = active ? 1.5 : 0.85;
      const next = node.scale.x + (target - node.scale.x) * Math.min(1, delta * 6);
      node.scale.setScalar(next);
      node.position.y = (clusterPositions[index]?.[1] ?? 0) + Math.sin(time * 1.15 + index) * 0.09;
      node.rotation.z = Math.sin(time * 0.35 + index) * 0.16;
    });
  });

  return (
    <group ref={group}>
      {clusterPositions.map((position, index) => {
        const id = clusterIds[index] ?? 'frontend';
        return (
          <group
            key={id}
            position={position}
            ref={(node) => {
              refs.current[index] = node;
            }}
          >
            <mesh>
              <octahedronGeometry args={[0.19, 0]} />
              <NodeMaterial color={clusterColors[index] ?? '#597bff'} />
            </mesh>
            <mesh rotation={[0.6, 0.2, 0.4]}>
              <torusGeometry args={[0.42, 0.003, 5, 48]} />
              <meshBasicMaterial
                color={isLight ? '#7654d8' : '#a88cff'}
                transparent
                opacity={isLight ? 0.48 : 0.35}
              />
            </mesh>
          </group>
        );
      })}
      <Line
        points={[
          ...clusterPositions,
          clusterPositions[0] as [number, number, number],
        ]}
        color={isLight ? '#405ce8' : '#597bff'}
        transparent
        opacity={isLight ? 0.28 : 0.18}
        lineWidth={1}
      />
    </group>
  );
}

interface SceneProject {
  slug: string;
  title: string;
  category: string;
}

const constellationPositions: [number, number, number][] = [
  [2.7, 0.9, 0.2],
  [0.85, 1.9, -0.9],
  [-2.3, 0.5, 0.5],
  [-1.2, -1.75, -0.4],
  [1.7, -1.5, 0.7],
];

export function ConstellationChapter({
  locale,
  projects,
}: {
  locale: Locale;
  projects: SceneProject[];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const nodes = useRef<Array<THREE.Group | null>>([]);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    nodes.current.forEach((node, index) => {
      if (!node) return;
      node.position.y = (constellationPositions[index]?.[1] ?? 0) + Math.sin(time * 1.05 + index) * 0.1;
      node.rotation.z = Math.sin(time * 0.28 + index) * 0.2;
    });
  });

  return (
    <group>
      {projects.slice(0, 5).map((project, index) => {
        const position: [number, number, number] =
          constellationPositions[index] ?? [0, 0, 0];
        return (
          <group
            key={project.slug}
            position={position}
            ref={(node) => {
              nodes.current[index] = node;
            }}
          >
            <mesh
              scale={hovered === index ? 1.45 : 1}
              onClick={(event: ThreeEvent<MouseEvent>) => {
                event.stopPropagation();
                router.push(localizedPath(locale, `/projects/${project.slug}`));
              }}
              onPointerOver={(event: ThreeEvent<PointerEvent>) => {
                event.stopPropagation();
                setHovered(index);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHovered(null);
                document.body.style.cursor = '';
              }}
            >
              <icosahedronGeometry args={[0.13, 0]} />
              <NodeMaterial color={index === 0 ? '#597bff' : '#a88cff'} active={hovered === index} />
            </mesh>
            <mesh rotation={[Math.PI / 2.2, 0, 0]}>
              <torusGeometry args={[0.34, 0.003, 5, 48]} />
              <meshBasicMaterial
                color={isLight ? '#405ce8' : '#e9f1ff'}
                transparent
                opacity={hovered === index ? (isLight ? 0.62 : 0.5) : isLight ? 0.28 : 0.16}
              />
            </mesh>
            {hovered === index ? (
              <Html center distanceFactor={9} position={[0, 0.42, 0]} zIndexRange={[20, 0]}>
                <div className="whitespace-nowrap border border-chalk/15 bg-ink/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-chalk">
                  {project.title}
                </div>
              </Html>
            ) : null}
          </group>
        );
      })}
      <Line
        points={constellationPositions.filter((_, index) => index < Math.min(projects.length, 5))}
        color={isLight ? '#405ce8' : '#597bff'}
        transparent
        opacity={isLight ? 0.26 : 0.14}
        lineWidth={1}
      />
    </group>
  );
}

export function TimelineChapter() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<Array<THREE.Group | null>>([]);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const positions = useMemo<[number, number, number][]>(
    () => [
      [0, 1.45, 0],
      [0, 0.45, 0],
      [0, -0.55, 0],
      [0, -1.55, 0],
    ],
    [],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.2) * 0.18;
    }
    nodes.current.forEach((node, index) => {
      if (!node) return;
      node.scale.setScalar(1 + Math.sin(time * 1.35 + index) * 0.055);
      node.rotation.z = Math.sin(time * 0.4 + index) * 0.08;
    });
  });

  return (
    <group ref={group}>
      <Line
        points={positions}
        color={isLight ? '#405ce8' : '#597bff'}
        transparent
        opacity={isLight ? 0.45 : 0.32}
        lineWidth={1}
      />
      {positions.map((position, index) => (
        <group
          key={index}
          position={position}
          ref={(node) => {
            nodes.current[index] = node;
          }}
        >
          <mesh>
            <sphereGeometry args={[index === 0 ? 0.11 : 0.07, 20, 20]} />
            <NodeMaterial color={index === 0 ? '#e9f1ff' : '#597bff'} active={index === 0} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[index === 0 ? 0.26 : 0.17, 0.0025, 5, 48]} />
            <meshBasicMaterial
              color={isLight ? '#7654d8' : '#a88cff'}
              transparent
              opacity={isLight ? 0.5 : 0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ConvergenceChapter() {
  const group = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const orb = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    }
    if (outer.current) outer.current.rotation.z = time * 0.18;
    if (inner.current) inner.current.rotation.z = -time * 0.26;
    if (orb.current) {
      orb.current.scale.setScalar(1 + Math.sin(time * 1.6) * 0.08);
      orb.current.rotation.z = time * 0.4;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <mesh ref={outer}>
        <torusGeometry args={[1.65, 0.012, 8, 160]} />
        <meshBasicMaterial color="#597bff" transparent opacity={0.65} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[1.3, 0.008, 8, 160]} />
        <meshBasicMaterial color="#a88cff" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[1.95, 0.004, 6, 160]} />
        <meshBasicMaterial
          color={isLight ? '#64748b' : '#e9f1ff'}
          transparent
          opacity={isLight ? 0.3 : 0.18}
        />
      </mesh>
      <mesh ref={orb}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color={isLight ? '#405ce8' : '#dfe8ff'} />
      </mesh>
      <pointLight intensity={5} distance={5} color="#597bff" />
    </group>
  );
}
