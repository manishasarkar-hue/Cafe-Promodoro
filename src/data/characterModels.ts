import { Gender } from '../types';

export interface CharacterModelConfig {
  standing: string;
  sitting: string;
}

/**
 * Centralized Model Mapping Configuration for Cafe Pomodoro
 * GIRL:
 *   - Standing / Avatar selection: model(1).glb
 *   - Sitting / Café study scenes: model(2).glb
 * BOY:
 *   - Standing / Avatar selection: model(3).glb
 *   - Sitting / Café study scenes: model (4).glb
 */
export const CHARACTER_MODELS: Record<Gender, CharacterModelConfig> = {
  girl: {
    standing: '/models/model(1).glb',
    sitting: '/models/model(2).glb',
  },
  boy: {
    standing: '/models/model(3).glb',
    sitting: '/models/model (4).glb',
  },
};

/**
 * Returns the exact centralized model URL for the selected gender and pose
 */
export function getCharacterModel(
  gender: Gender = 'girl',
  pose: 'standing' | 'sitting' | 'preview' | 'desk' | 'full' | 'compact' = 'standing'
): string {
  const isSitting = pose === 'sitting' || pose === 'desk';
  const config = CHARACTER_MODELS[gender] || CHARACTER_MODELS.girl;
  return isSitting ? config.sitting : config.standing;
}
