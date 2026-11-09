import type { SkillCluster } from '@/content/types';
import { setSceneCluster } from './scene-state';

/** Kept separate so the DOM section never imports the 3D renderer. */
export function forSceneCluster(id: SkillCluster['id']) {
  setSceneCluster(id);
}
