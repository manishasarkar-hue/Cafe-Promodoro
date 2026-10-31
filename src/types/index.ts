export type Gender = 'boy' | 'girl';
export type Expression = 'normal' | 'happy' | 'wink' | 'thinking';

export interface AvatarConfig {
  gender: Gender;
  name: string;
  hairStyle: string; // 'wavy' | 'bun' | 'bob' | 'ponytail' | 'halfup' | 'messy' | 'short' | 'fluffy'
  hairColor: string; // hex
  outfit: string; // 'cardigan' | 'blouse' | 'pink_hoodie' | 'blazer' | 'blue_knit' | 'sweater' | 'apron'
  outfitColor?: string;
  accessory?: string; // 'none' | 'headphones' | 'bow' | 'hair_clip' | 'glasses' | 'beret' | 'cat_ears' | 'bag'
  expression?: Expression;
  modelUrl?: string;
  is3D?: boolean;
}

export type CafeId = 'strawberry' | 'mocha' | 'matcha' | 'blue-moon';

export interface CafeTheme {
  primary: string;
  primaryLight: string;
  accent: string;
  bgGradient: string;
  roomBg: string;
  cardBg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  shadow: string;
}

export interface DrinkItem {
  id: string;
  name: string;
  koreanName?: string;
  description: string;
  type: 'hot' | 'iced' | 'both';
  color: string;
  accentColor: string;
  flavorNotes: string[];
  sweetnessOptions: string[];
  dairyOptions: string[];
}

export interface OrderedDrink {
  drinkId: string;
  name: string;
  temp: 'hot' | 'iced';
  sweetness: string;
  dairy: string;
  color: string;
  accentColor: string;
}

export interface StudySpot {
  id: string;
  name: string;
  koreanName?: string;
  description: string;
  x: number; // percentage in scene (0-100)
  y: number; // percentage in scene (0-100)
  iconName: string;
  viewNote: string;
  lighting: string;
}

export interface CafeConfig {
  id: CafeId;
  name: string;
  koreanName: string;
  tagline: string;
  description: string;
  theme: CafeTheme;
  recommendedSoundId: string;
  drinks: DrinkItem[];
  studySpots: StudySpot[];
  decorMotifs: string[];
  ambientVisualNotes: string;
  backgroundImage?: string;
}

export type StudyMode = 'personal' | 'social';

export type PomodoroMode = 'classic' | 'deep' | 'custom';
export type PomodoroPhase = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroDurations {
  focus: number; // in seconds
  shortBreak: number;
  longBreak: number;
}

export interface PomodoroState {
  isRunning: boolean;
  phase: PomodoroPhase;
  mode: PomodoroMode;
  remainingSeconds: number;
  totalSecondsForPhase: number;
  targetEndTimestamp: number | null;
  currentSessionId: string;
  completedCycles: number;
  customDurations: PomodoroDurations;
}

export type SoundCategory = 'rain' | 'nature' | 'cafe' | 'piano' | 'night' | 'cozy' | 'water';

export interface AmbientSoundTrack {
  id: string;
  title: string;
  category: SoundCategory;
  description: string;
  iconName: string;
  presetName?: string;
}

export interface CollectibleItem {
  id: string;
  name: string;
  category: 'outfit' | 'accessory' | 'desk_item' | 'special_cup';
  costBeans: number;
  description: string;
  icon: string;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  durationMinutes: number;
  cafeId: CafeId;
  mode: StudyMode;
  beansAwarded: number;
}

export interface UserProgress {
  focusBeans: number;
  totalFocusMinutes: number;
  completedSessionsCount: number;
  dailyStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  unlockedItemIds: string[];
  equippedItems: {
    outfit?: string;
    accessory?: string;
    desk_item?: string;
    special_cup?: string;
  };
  sessionHistory: SessionRecord[];
}

export interface VirtualStudent {
  id: string;
  name: string;
  gender: Gender;
  avatarConfig: AvatarConfig;
  activity: 'typing' | 'reading' | 'writing' | 'sipping' | 'stretching' | 'thinking';
  currentDrink: string;
  studyTopic: string;
  statusMessage?: string;
  tableIndex: number;
  seatPosition: 'left' | 'right';
  animationDelay: number;
}

export type NavigationScreen = 
  | 'landing'
  | 'avatar'
  | 'cafe'
  | 'drinks'
  | 'brewing'
  | 'overview'
  | 'mode_select'
  | 'personal_study'
  | 'social_study'
  | 'rewards';
