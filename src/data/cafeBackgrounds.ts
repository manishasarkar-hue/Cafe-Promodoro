import { CafeId } from '../types';

export interface CafeBackgroundConfig {
  id: CafeId;
  name: string;
  image: string;
  alt: string;
  accentOverlay: string;
  vignette: string;
  deskShadow: string;
  lightingPreset: 'cozy' | 'desk' | 'sunset' | 'night';
}

/**
 * Centralized Café Background Assets Configuration
 * Each asset is a dedicated, separate image inspired by the reference design:
 * 1. Strawberry Café: /images/cafe-backgrounds/strawberry-cafe.jpg
 * 2. Mocha House: /images/cafe-backgrounds/mocha-house.jpg
 * 3. Matcha Garden: /images/cafe-backgrounds/matcha-garden.jpg
 * 4. Blue Moon Café: /images/cafe-backgrounds/blue-moon-cafe.jpg
 */
export const CAFE_BACKGROUNDS: Record<CafeId, CafeBackgroundConfig> = {
  strawberry: {
    id: 'strawberry',
    name: 'Strawberry Café',
    image: '/images/cafe-backgrounds/strawberry-cafe.jpg',
    alt: 'Dreamy pink Strawberry Café with sunlit cherry blossom bay window and flowers',
    accentOverlay: 'rgba(255, 182, 193, 0.08)',
    vignette: 'radial-gradient(circle at 50% 40%, rgba(255, 240, 243, 0) 35%, rgba(216, 87, 112, 0.2) 100%)',
    deskShadow: '0 20px 40px rgba(180, 80, 100, 0.3)',
    lightingPreset: 'desk',
  },
  mocha: {
    id: 'mocha',
    name: 'Mocha House',
    image: '/images/cafe-backgrounds/mocha-house.jpg',
    alt: 'Warm brown Mocha House with towering oak bookshelves and soft amber lighting',
    accentOverlay: 'rgba(180, 110, 60, 0.1)',
    vignette: 'radial-gradient(circle at 50% 40%, rgba(245, 235, 224, 0) 35%, rgba(62, 39, 35, 0.28) 100%)',
    deskShadow: '0 20px 45px rgba(50, 30, 20, 0.4)',
    lightingPreset: 'cozy',
  },
  matcha: {
    id: 'matcha',
    name: 'Matcha Garden',
    image: '/images/cafe-backgrounds/matcha-garden.jpg',
    alt: 'Serene sage-green Matcha Garden with pagoda pond view, bonsai and morning sunlight',
    accentOverlay: 'rgba(82, 121, 111, 0.08)',
    vignette: 'radial-gradient(circle at 50% 40%, rgba(232, 245, 233, 0) 35%, rgba(27, 67, 50, 0.22) 100%)',
    deskShadow: '0 20px 40px rgba(30, 60, 45, 0.3)',
    lightingPreset: 'desk',
  },
  'blue-moon': {
    id: 'blue-moon',
    name: 'Blue Moon Café',
    image: '/images/cafe-backgrounds/blue-moon-cafe.jpg',
    alt: 'Dreamy nocturnal Blue Moon Café with glowing full moon, starry sky and fairy lights',
    accentOverlay: 'rgba(67, 97, 238, 0.14)',
    vignette: 'radial-gradient(circle at 50% 35%, rgba(30, 27, 75, 0) 25%, rgba(15, 23, 42, 0.45) 100%)',
    deskShadow: '0 20px 50px rgba(10, 15, 40, 0.55)',
    lightingPreset: 'night',
  },
};

export function getCafeBackground(cafeId: CafeId = 'strawberry'): CafeBackgroundConfig {
  return CAFE_BACKGROUNDS[cafeId] || CAFE_BACKGROUNDS.strawberry;
}
