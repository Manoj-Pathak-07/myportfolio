'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { clamp } from '@/lib/utils';
import { sceneState } from './scene-state';

function smootherstep(value: number): number {
  return value * value * value * (value * (value * 6 - 15) + 10);
}

/** A faceted "kernel": the visual anchor for the whole narrative. */
export function CoreSculpture() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const arcs = useRef<THREE.Group>(null);
  const tokens = useRef<THREE.Points>(null);
  const satellites = useRef<Array<THREE.Mesh | null>>([]);
  const pulses = useRef<Array<THREE.Mesh | null>>([]);
  const { size, pointer } = useThree();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(geometry, 18), [geometry]);
  const innerGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.92, 0), []);

  const tokenPositions = useMemo(() => {
    const count = size.width < 768 ? 34 : 72;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const t = i / count;
      const angle = t * Math.PI * 9;
      const radius = 1.85 + Math.sin(t * Math.PI * 3) * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 4.1;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.72;
    }
    return positions;
  }, [size.width]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (group.current) {
      const chapter = clamp(sceneState.progress) * 5;
      const baseScale = chapter < 1 ? 1 : Math.max(0.38, 1 - (chapter - 1) * 0.15);
      const target = baseScale * (isLight ? 0.78 : 1);
      const current = group.current.scale.x;
      group.current.scale.setScalar(
        current + (target - current) * Math.min(1, delta * 2.4),
      );
      group.current.rotation.y += delta * 0.09;
      group.current.rotation.z += (pointer.x * 0.075 - group.current.rotation.z) * Math.min(1, delta * 1.8);
      group.current.rotation.x += (-pointer.y * 0.055 - group.current.rotation.x) * Math.min(1, delta * 1.8);
      group.current.position.y = Math.sin(time * 0.55) * 0.07;
    }

    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x = Math.sin(time * 0.28) * 0.12;
    }

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.24;
      inner.current.rotation.z += delta * 0.08;
    }

    if (arcs.current) {
      arcs.current.rotation.z += delta * 0.06;
      arcs.current.rotation.x = 0.3 + Math.sin(time * 0.2) * 0.12;
    }

    if (tokens.current) {
      tokens.current.rotation.y = time * 0.08;
      tokens.current.rotation.z = Math.sin(time * 0.15) * 0.06;
    }

    satellites.current.forEach((node, index) => {
      if (!node) return;
      const angle = time * (0.2 + index * 0.035) + index * 1.55;
      const radius = 1.82 + index * 0.13;
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.35 + index) * 0.58,
        Math.sin(angle) * radius * 0.66,
      );
      node.rotation.x += delta * (0.55 + index * 0.12);
      node.rotation.y += delta * (0.7 + index * 0.1);
    });

    pulses.current.forEach((ring, index) => {
      if (!ring) return;
      const phase = (time * 0.16 + index / 3) % 1;
      ring.scale.setScalar(1 + phase * 1.55);
      ring.rotation.z += delta * (0.06 + index * 0.015);
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = (1 - phase) * (isLight ? 0.18 : 0.24);
    });
  });

  return (
    <group ref={group}>
      <mesh ref={core} geometry={geometry}>
        <meshStandardMaterial
          color={isLight ? '#94a3b8' : '#0d1627'}
          metalness={isLight ? 0.58 : 0.92}
          roughness={isLight ? 0.3 : 0.24}
          emissive={isLight ? '#dbeafe' : '#0a1226'}
          emissiveIntensity={isLight ? 0.18 : 0.7}
          transparent={isLight}
          opacity={isLight ? 0.36 : 1}
          depthWrite={!isLight}
          flatShading
        />
        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial
            color={isLight ? '#405ce8' : '#597bff'}
            transparent
            opacity={isLight ? 0.9 : 0.62}
          />
        </lineSegments>
      </mesh>

      <mesh ref={inner}>
        <primitive object={innerGeometry} attach="geometry" />
        <meshBasicMaterial
          color={isLight ? '#7654d8' : '#a88cff'}
          wireframe
          transparent
          opacity={isLight ? 0.48 : 0.22}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={isLight ? 1.4 : 3.2}
        distance={5}
        color={isLight ? '#405ce8' : '#597bff'}
      />

      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={isLight ? '#405ce8' : '#dbe4ff'} />
      </mesh>

      <group ref={arcs}>
        <mesh rotation={[1.15, 0.25, 0.2]}>
          <torusGeometry args={[2.05, 0.005, 6, 160, Math.PI * 1.4]} />
          <meshBasicMaterial
          color={isLight ? '#405ce8' : '#597bff'}
          transparent
          opacity={isLight ? 0.72 : 0.55}
        />
        </mesh>
        <mesh rotation={[0.35, 1.2, 0.8]}>
          <torusGeometry args={[2.35, 0.004, 6, 160, Math.PI * 1.15]} />
          <meshBasicMaterial
            color={isLight ? '#7654d8' : '#a88cff'}
            transparent
            opacity={0.4}
          />
        </mesh>
        <mesh rotation={[1.75, 0.9, 0.1]}>
          <torusGeometry args={[1.8, 0.0035, 6, 160, Math.PI * 1.6]} />
          <meshBasicMaterial
            color={isLight ? '#64748b' : '#e9f1ff'}
            transparent
            opacity={isLight ? 0.34 : 0.2}
          />
        </mesh>
      </group>

      {[0, 1, 2, 3].map((index) => (
        <mesh
          key={`satellite-${index}`}
          ref={(node) => {
            satellites.current[index] = node;
          }}
        >
          <octahedronGeometry args={[0.038 + index * 0.006, 0]} />
          <meshBasicMaterial
            color={isLight ? (index % 2 ? '#7654d8' : '#405ce8') : index % 2 ? '#a88cff' : '#8ea6ff'}
            transparent
            opacity={isLight ? 0.8 : 0.9}
          />
        </mesh>
      ))}

      {[0, 1, 2].map((index) => (
        <mesh
          key={`pulse-${index}`}
          ref={(node) => {
            pulses.current[index] = node;
          }}
          rotation={[1.02 + index * 0.18, 0.22 + index * 0.3, 0.15]}
        >
          <torusGeometry args={[1.52, 0.0025, 4, 96]} />
          <meshBasicMaterial
            color={isLight ? '#405ce8' : '#597bff'}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}

      <points ref={tokens}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[tokenPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={isLight ? '#405ce8' : '#8ea6ff'}
          size={0.026}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.9 : 0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function useChapterEase(index: number): number {
  const chapter = clamp(sceneState.progress) * 5;
  return smootherstep(clamp(1 - Math.abs(chapter - index) / 0.9, 0, 1));
}
