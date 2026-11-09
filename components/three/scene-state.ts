import type { SkillCluster } from '@/content/types';

/**
 * A mutable, module-level scene state. The canvas reads it inside useFrame,
 * so scroll and interaction updates never trigger React re-renders.
 */
export const sceneState = {
  /** Normalized home page scroll progress, 0–1. */
  progress: 0,
  /** Active skills cluster, written by the DOM tabs. */
  activeCluster: 'interface' as SkillCluster['id'],
};

export function setSceneProgress(progress: number) {
  sceneState.progress = Math.min(1, Math.max(0, progress));
}

export function setSceneCluster(cluster: SkillCluster['id']) {
  sceneState.activeCluster = cluster;
}
