import { AmbientSoundTrack } from '../types';

export const AMBIENT_TRACKS: AmbientSoundTrack[] = [
  // Rain
  {
    id: 'rain_window',
    title: 'Rain on Café Window',
    category: 'rain',
    description: 'Soft steady rainfall pattering against glass with distant peaceful rumbles.',
    iconName: 'CloudRain',
    presetName: 'Rainy Window',
  },
  {
    id: 'gentle_rainfall',
    title: 'Gentle Afternoon Drizzle',
    category: 'rain',
    description: 'A calming light rain shower falling over city pavements and awnings.',
    iconName: 'CloudDrizzle',
  },

  // Cafe
  {
    id: 'cafe_chatter',
    title: 'Pastel Café Ambience',
    category: 'cafe',
    description: 'Gentle distant chatter, ceramic coffee cups clinking, and espresso steam hiss.',
    iconName: 'Coffee',
    presetName: 'Cozy Café',
  },
  {
    id: 'coffee_grinder',
    title: 'Espresso Barista Brew',
    category: 'cafe',
    description: 'Warm steam wands and rich slow drip coffee preparation sounds.',
    iconName: 'CupSoda',
  },

  // Nature
  {
    id: 'forest_birds',
    title: 'Morning Forest Birds',
    category: 'nature',
    description: 'Dewy forest chirps and gentle canopy breezes in morning sunshine.',
    iconName: 'Trees',
    presetName: 'Forest Morning',
  },
  {
    id: 'gentle_wind',
    title: 'Soft Mountain Breeze',
    category: 'nature',
    description: 'A whisper of cool soothing wind blowing through bamboo leaves.',
    iconName: 'Wind',
  },

  // Cozy
  {
    id: 'fireplace',
    title: 'Crackling Hearth Fire',
    category: 'cozy',
    description: 'Warm logs crackling with comforting ember pops and golden heat.',
    iconName: 'Flame',
  },

  // Soft Piano
  {
    id: 'soft_piano',
    title: 'Dreamy Lofi Piano',
    category: 'piano',
    description: 'Intimate felt piano chords with gentle nostalgic vinyl warmth.',
    iconName: 'Music',
    presetName: 'Peaceful Focus',
  },

  // Night Sounds
  {
    id: 'night_crickets',
    title: 'Midnight Summer Crickets',
    category: 'night',
    description: 'Rhythmic nocturnal crickets and gentle night cicadas under starry skies.',
    iconName: 'Moon',
    presetName: 'Midnight Study',
  },

  // Water
  {
    id: 'flowing_stream',
    title: 'Tranquil Zen Stream',
    category: 'water',
    description: 'Clear cold alpine water murmuring over smooth river stones.',
    iconName: 'Waves',
  },
];
