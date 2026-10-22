import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import {
  AvatarConfig,
  CafeId,
  OrderedDrink,
  StudySpot,
  StudyMode,
  NavigationScreen,
  PomodoroMode,
  PomodoroPhase,
  PomodoroState,
  PomodoroDurations,
  UserProgress,
  SessionRecord,
} from '../types';
import { CAFES } from '../data/cafes';
import { ALL_DRINKS } from '../data/drinks';
import { audioEngine } from '../utils/audioEngine';

const STORAGE_KEY = 'cafe_pomodoro_state_v1';

const DEFAULT_AVATAR: AvatarConfig = {
  gender: 'girl',
  name: 'Manisha',
  hairStyle: 'wavy',
  hairColor: '#4A3525',
  outfit: 'cardigan',
  outfitColor: '#CDB4DB',
  accessory: 'none',
  expression: 'normal',
};

const DEFAULT_DURATIONS: Record<PomodoroMode, PomodoroDurations> = {
  classic: { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
  deep: { focus: 50 * 60, shortBreak: 10 * 60, longBreak: 20 * 60 },
  custom: { focus: 30 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
};

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function generateSessionId(): string {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

interface AppContextType {
  // Navigation
  screen: NavigationScreen;
  setScreen: (screen: NavigationScreen) => void;
  navigateWithCheck: (target: NavigationScreen) => boolean;

  // Avatar
  avatar: AvatarConfig;
  updateAvatar: (updates: Partial<AvatarConfig>) => void;

  // Cafe & Environment
  selectedCafeId: CafeId;
  setSelectedCafeId: (cafeId: CafeId) => void;
  selectedSpot: StudySpot | null;
  setSelectedSpot: (spot: StudySpot | null) => void;

  // Drink
  orderedDrink: OrderedDrink | null;
  setOrderedDrink: (drink: OrderedDrink) => void;

  // Study Mode
  studyMode: StudyMode;
  setStudyMode: (mode: StudyMode) => void;

  // Pomodoro Timer Engine
  timer: PomodoroState;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  setTimerMode: (mode: PomodoroMode) => void;
  setTimerPhase: (phase: PomodoroPhase) => void;
  updateCustomDurations: (durations: Partial<PomodoroDurations>) => void;
  skipPhase: () => void;

  // Progress & Rewards
  progress: UserProgress;
  unlockItem: (itemId: string, costBeans: number) => boolean;
  equipItem: (category: 'outfit' | 'accessory' | 'desk_item' | 'special_cup', itemId: string) => void;

  // Sound Studio
  activeTrackId: string | null;
  soundVolume: number;
  isMuted: boolean;
  isSoundPanelOpen: boolean;
  setIsSoundPanelOpen: (open: boolean) => void;
  playTrack: (trackId: string) => void;
  stopSound: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;

  // Encouragement Notification
  activeCheerMessage: string | null;
  triggerEncouragement: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Core State Initialization with LocalStorage recovery
  const [screen, setScreenState] = useState<NavigationScreen>('landing');
  const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [selectedCafeId, setSelectedCafeId] = useState<CafeId>('strawberry');
  const [selectedSpot, setSelectedSpot] = useState<StudySpot | null>(null);
  const [orderedDrink, setOrderedDrink] = useState<OrderedDrink | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>('personal');

  // Sound State
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [soundVolume, setSoundVolume] = useState<number>(0.6);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSoundPanelOpen, setIsSoundPanelOpen] = useState<boolean>(false);

  // Social Encouragement
  const [activeCheerMessage, setActiveCheerMessage] = useState<string | null>(null);

  // Progress & Rewards
  const [progress, setProgress] = useState<UserProgress>({
    focusBeans: 20, // Starting bonus
    totalFocusMinutes: 0,
    completedSessionsCount: 0,
    dailyStreak: 1,
    lastActiveDate: getTodayString(),
    unlockedItemIds: ['accessory_glasses'],
    equippedItems: { accessory: 'accessory_glasses' },
    sessionHistory: [],
  });

  // Processed reward IDs to guarantee idempotency across rerenders/refreshes
  const processedRewardIdsRef = useRef<Set<string>>(new Set());

  // Pomodoro State
  const [timer, setTimer] = useState<PomodoroState>({
    isRunning: false,
    phase: 'focus',
    mode: 'classic',
    remainingSeconds: DEFAULT_DURATIONS.classic.focus,
    totalSecondsForPhase: DEFAULT_DURATIONS.classic.focus,
    targetEndTimestamp: null,
    currentSessionId: generateSessionId(),
    completedCycles: 0,
    customDurations: { ...DEFAULT_DURATIONS.custom },
  });

  // Track if hydration has run
  const isHydratedRef = useRef(false);

  // Load from LocalStorage once on mount
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (saved.avatar) setAvatar(saved.avatar);
        if (saved.selectedCafeId && CAFES[saved.selectedCafeId as CafeId]) {
          setSelectedCafeId(saved.selectedCafeId);
        }
        if (saved.selectedSpot) setSelectedSpot(saved.selectedSpot);
        if (saved.orderedDrink) setOrderedDrink(saved.orderedDrink);
        if (saved.studyMode) setStudyMode(saved.studyMode);
        if (saved.screen && saved.screen !== 'brewing') {
          setScreenState(saved.screen);
        }

        // Sound preferences
        if (typeof saved.soundVolume === 'number') {
          setSoundVolume(saved.soundVolume);
          audioEngine.setVolume(saved.soundVolume);
        }
        if (typeof saved.isMuted === 'boolean') {
          setIsMuted(saved.isMuted);
          audioEngine.setMuted(saved.isMuted);
        }

        // Progress
        if (saved.progress) {
          const loadedProgress = saved.progress as UserProgress;
          // Check streak against today
          const today = getTodayString();
          let newStreak = loadedProgress.dailyStreak || 1;
          if (loadedProgress.lastActiveDate && loadedProgress.lastActiveDate !== today) {
            const last = new Date(loadedProgress.lastActiveDate);
            const now = new Date(today);
            const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
              newStreak += 1;
            } else if (diffDays > 1) {
              newStreak = 1;
            }
          }
          setProgress({
            ...loadedProgress,
            dailyStreak: newStreak,
            lastActiveDate: today,
          });

          // Seed processed reward IDs
          if (loadedProgress.sessionHistory) {
            loadedProgress.sessionHistory.forEach((s) => processedRewardIdsRef.current.add(s.id));
          }
        }

        // Timer recovery
        if (saved.timer) {
          const t = saved.timer as PomodoroState;
          if (t.isRunning && t.targetEndTimestamp) {
            const now = Date.now();
            const remaining = Math.max(0, Math.round((t.targetEndTimestamp - now) / 1000));
            if (remaining > 0) {
              setTimer({
                ...t,
                remainingSeconds: remaining,
              });
            } else {
              // Timer finished while user was away!
              setTimer({
                ...t,
                isRunning: false,
                remainingSeconds: 0,
                targetEndTimestamp: null,
              });
            }
          } else {
            setTimer(t);
          }
        }
      } else {
        // Fallback: Default drink for initial cafe
        const initialDrink = ALL_DRINKS['strawberry_latte'];
        setOrderedDrink({
          drinkId: initialDrink.id,
          name: initialDrink.name,
          temp: 'iced',
          sweetness: '70% (Standard)',
          dairy: 'Oat Milk',
          color: initialDrink.color,
          accentColor: initialDrink.accentColor,
        });
      }
    } catch (e) {
      console.warn('Failed to hydrate state from local storage:', e);
    } finally {
      isHydratedRef.current = true;
    }
  }, []);

  // Save state to LocalStorage
  useEffect(() => {
    if (!isHydratedRef.current) return;
    try {
      const stateToSave = {
        screen,
        avatar,
        selectedCafeId,
        selectedSpot,
        orderedDrink,
        studyMode,
        soundVolume,
        isMuted,
        progress,
        timer,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save state to local storage:', e);
    }
  }, [screen, avatar, selectedCafeId, selectedSpot, orderedDrink, studyMode, soundVolume, isMuted, progress, timer]);

  // Handle Focus completion and reward awarding (Idempotent)
  const handleSessionCompletion = useCallback((finishedTimer: PomodoroState) => {
    audioEngine.playCelebrationChime();

    // Browser Notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = finishedTimer.phase === 'focus' ? '✨ Focus Session Finished!' : '☕ Break Finished!';
      const body = finishedTimer.phase === 'focus' 
        ? 'Great job! You earned Focus Beans for your quiet study.'
        : 'Ready to dive back into calm focus?';
      new Notification(title, { body, icon: '/favicon.svg' });
    }

    if (finishedTimer.phase === 'focus') {
      const sessionId = finishedTimer.currentSessionId;
      if (!processedRewardIdsRef.current.has(sessionId)) {
        processedRewardIdsRef.current.add(sessionId);

        // 1 Focus Bean per completed focus minute
        const minutesFocused = Math.max(1, Math.round(finishedTimer.totalSecondsForPhase / 60));
        const beansEarned = minutesFocused;

        const newRecord: SessionRecord = {
          id: sessionId,
          timestamp: Date.now(),
          dateStr: getTodayString(),
          durationMinutes: minutesFocused,
          cafeId: selectedCafeId,
          mode: studyMode,
          beansAwarded: beansEarned,
        };

        setProgress((prev) => ({
          ...prev,
          focusBeans: prev.focusBeans + beansEarned,
          totalFocusMinutes: prev.totalFocusMinutes + minutesFocused,
          completedSessionsCount: prev.completedSessionsCount + 1,
          sessionHistory: [newRecord, ...prev.sessionHistory],
        }));
      }

      // Next phase logic: Every 4 cycles, a long break, otherwise short break
      const newCycles = finishedTimer.completedCycles + 1;
      const nextPhase: PomodoroPhase = newCycles % 4 === 0 ? 'longBreak' : 'shortBreak';
      const durations = finishedTimer.mode === 'custom' 
        ? finishedTimer.customDurations 
        : DEFAULT_DURATIONS[finishedTimer.mode];
      const nextTotal = nextPhase === 'longBreak' ? durations.longBreak : durations.shortBreak;

      setTimer((prev) => ({
        ...prev,
        isRunning: false,
        phase: nextPhase,
        remainingSeconds: nextTotal,
        totalSecondsForPhase: nextTotal,
        targetEndTimestamp: null,
        currentSessionId: generateSessionId(),
        completedCycles: newCycles,
      }));
    } else {
      // Break completed -> Back to Focus
      const durations = finishedTimer.mode === 'custom' 
        ? finishedTimer.customDurations 
        : DEFAULT_DURATIONS[finishedTimer.mode];
      const nextTotal = durations.focus;

      setTimer((prev) => ({
        ...prev,
        isRunning: false,
        phase: 'focus',
        remainingSeconds: nextTotal,
        totalSecondsForPhase: nextTotal,
        targetEndTimestamp: null,
        currentSessionId: generateSessionId(),
      }));
    }
  }, [selectedCafeId, studyMode]);

  // Timestamp-based Timer Heartbeat Interval
  useEffect(() => {
    if (!timer.isRunning || !timer.targetEndTimestamp) return;

    const interval = window.setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((timer.targetEndTimestamp! - now) / 1000));

      if (remaining <= 0) {
        window.clearInterval(interval);
        handleSessionCompletion(timer);
      } else {
        setTimer((prev) => ({
          ...prev,
          remainingSeconds: remaining,
        }));
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [timer.isRunning, timer.targetEndTimestamp, timer, handleSessionCompletion]);

  // Request browser notification permission once
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Timer Actions
  const startTimer = useCallback(() => {
    const end = Date.now() + timer.remainingSeconds * 1000;
    setTimer((prev) => ({
      ...prev,
      isRunning: true,
      targetEndTimestamp: end,
    }));
  }, [timer.remainingSeconds]);

  const pauseTimer = useCallback(() => {
    if (!timer.targetEndTimestamp) return;
    const remaining = Math.max(0, Math.round((timer.targetEndTimestamp - Date.now()) / 1000));
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      remainingSeconds: remaining,
      targetEndTimestamp: null,
    }));
  }, [timer.targetEndTimestamp]);

  const resumeTimer = useCallback(() => {
    const end = Date.now() + timer.remainingSeconds * 1000;
    setTimer((prev) => ({
      ...prev,
      isRunning: true,
      targetEndTimestamp: end,
    }));
  }, [timer.remainingSeconds]);

  const resetTimer = useCallback(() => {
    const durations = timer.mode === 'custom' 
      ? timer.customDurations 
      : DEFAULT_DURATIONS[timer.mode];
    const total = timer.phase === 'focus' 
      ? durations.focus 
      : timer.phase === 'shortBreak' 
      ? durations.shortBreak 
      : durations.longBreak;

    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      remainingSeconds: total,
      totalSecondsForPhase: total,
      targetEndTimestamp: null,
      currentSessionId: generateSessionId(),
    }));
  }, [timer.mode, timer.customDurations, timer.phase]);

  const setTimerMode = useCallback((mode: PomodoroMode) => {
    const durations = mode === 'custom' ? timer.customDurations : DEFAULT_DURATIONS[mode];
    const total = durations.focus;

    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      mode,
      phase: 'focus',
      remainingSeconds: total,
      totalSecondsForPhase: total,
      targetEndTimestamp: null,
      currentSessionId: generateSessionId(),
    }));
  }, [timer.customDurations]);

  const setTimerPhase = useCallback((phase: PomodoroPhase) => {
    const durations = timer.mode === 'custom' ? timer.customDurations : DEFAULT_DURATIONS[timer.mode];
    const total = phase === 'focus' 
      ? durations.focus 
      : phase === 'shortBreak' 
      ? durations.shortBreak 
      : durations.longBreak;

    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      phase,
      remainingSeconds: total,
      totalSecondsForPhase: total,
      targetEndTimestamp: null,
      currentSessionId: generateSessionId(),
    }));
  }, [timer.mode, timer.customDurations]);

  const updateCustomDurations = useCallback((durations: Partial<PomodoroDurations>) => {
    setTimer((prev) => {
      const updated = { ...prev.customDurations, ...durations };
      const currentPhaseTotal = prev.phase === 'focus' 
        ? updated.focus 
        : prev.phase === 'shortBreak' 
        ? updated.shortBreak 
        : updated.longBreak;

      return {
        ...prev,
        customDurations: updated,
        remainingSeconds: prev.isRunning ? prev.remainingSeconds : currentPhaseTotal,
        totalSecondsForPhase: currentPhaseTotal,
      };
    });
  }, []);

  const skipPhase = useCallback(() => {
    handleSessionCompletion(timer);
  }, [handleSessionCompletion, timer]);

  // Navigation Guard: Prevents leaving study while focus timer is running
  const navigateWithCheck = useCallback((target: NavigationScreen): boolean => {
    if (timer.isRunning && timer.phase === 'focus' && (screen === 'personal_study' || screen === 'social_study')) {
      alert('Your focus timer is currently running! Please pause or finish your session before leaving the desk.');
      return false;
    }
    setScreenState(target);
    return true;
  }, [timer.isRunning, timer.phase, screen]);

  const setScreen = useCallback((target: NavigationScreen) => {
    navigateWithCheck(target);
  }, [navigateWithCheck]);

  // Avatar updates
  const updateAvatar = useCallback((updates: Partial<AvatarConfig>) => {
    setAvatar((prev) => ({ ...prev, ...updates }));
  }, []);

  // Sound Studio controls
  const playTrack = useCallback((trackId: string) => {
    setActiveTrackId(trackId);
    audioEngine.playTrack(trackId);
  }, []);

  const stopSound = useCallback(() => {
    setActiveTrackId(null);
    audioEngine.stop();
  }, []);

  const setVolume = useCallback((vol: number) => {
    setSoundVolume(vol);
    audioEngine.setVolume(vol);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      audioEngine.setMuted(next);
      return next;
    });
  }, []);

  // Rewards Actions
  const unlockItem = useCallback((itemId: string, costBeans: number): boolean => {
    if (progress.focusBeans < costBeans) return false;
    if (progress.unlockedItemIds.includes(itemId)) return true;

    setProgress((prev) => ({
      ...prev,
      focusBeans: prev.focusBeans - costBeans,
      unlockedItemIds: [...prev.unlockedItemIds, itemId],
    }));
    return true;
  }, [progress.focusBeans, progress.unlockedItemIds]);

  const equipItem = useCallback((category: 'outfit' | 'accessory' | 'desk_item' | 'special_cup', itemId: string) => {
    setProgress((prev) => ({
      ...prev,
      equippedItems: {
        ...prev.equippedItems,
        [category]: prev.equippedItems[category] === itemId ? undefined : itemId,
      },
    }));
  }, []);

  // Encouragement Notification
  const triggerEncouragement = useCallback((msg: string) => {
    setActiveCheerMessage(msg);
    setTimeout(() => {
      setActiveCheerMessage(null);
    }, 4000);
  }, []);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        navigateWithCheck,
        avatar,
        updateAvatar,
        selectedCafeId,
        setSelectedCafeId,
        selectedSpot,
        setSelectedSpot,
        orderedDrink,
        setOrderedDrink,
        studyMode,
        setStudyMode,
        timer,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        setTimerMode,
        setTimerPhase,
        updateCustomDurations,
        skipPhase,
        progress,
        unlockItem,
        equipItem,
        activeTrackId,
        soundVolume,
        isMuted,
        isSoundPanelOpen,
        setIsSoundPanelOpen,
        playTrack,
        stopSound,
        setVolume,
        toggleMute,
        activeCheerMessage,
        triggerEncouragement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
