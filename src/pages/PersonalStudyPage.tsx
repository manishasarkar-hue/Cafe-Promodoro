import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAFES } from '../data/cafes';
import { COLLECTIBLES } from '../data/collectibles';
import { CollectibleItem, PomodoroMode } from '../types';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { Character3D } from '../components/avatar/Character3D';
import { getCharacterModel } from '../data/characterModels';
import { getCafeBackground } from '../data/cafeBackgrounds';
import { DrinkCup } from '../components/chibi/DrinkCup';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Headphones,
  Settings,
  ArrowLeft,
  Coffee,
  Sparkles,
  Users,
  Award,
  Bell,
  Sliders,
} from 'lucide-react';

export const PersonalStudyPage: React.FC = () => {
  const {
    selectedCafeId,
    setSelectedCafeId,
    selectedSpot,
    orderedDrink,
    avatar,
    progress,
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setTimerMode,
    setTimerPhase,
    updateCustomDurations,
    skipPhase,
    setScreen,
    navigateWithCheck,
    isSoundPanelOpen,
    setIsSoundPanelOpen,
    activeTrackId,
  } = useApp();

  const currentCafe = CAFES[selectedCafeId];
  const cafeBg = getCafeBackground(currentCafe.id);
  const spot = selectedSpot || currentCafe.studySpots[0];

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [customFocusMinutes, setCustomFocusMinutes] = useState<number>(
    Math.round(timer.customDurations.focus / 60)
  );
  const [customBreakMinutes, setCustomBreakMinutes] = useState<number>(
    Math.round(timer.customDurations.shortBreak / 60)
  );

  // Format time mm:ss
  const minutes = Math.floor(timer.remainingSeconds / 60);
  const seconds = timer.remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage (0 to 100)
  const progressPercent = timer.totalSecondsForPhase > 0
    ? ((timer.totalSecondsForPhase - timer.remainingSeconds) / timer.totalSecondsForPhase) * 100
    : 0;

  // Circle radius for progress ring
  const circleRadius = 110;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Active desk accessory
  const equippedDeskItem = progress.equippedItems.desk_item
    ? COLLECTIBLES.find((c: CollectibleItem) => c.id === progress.equippedItems.desk_item)
    : null;

  const handleApplyCustomSettings = () => {
    updateCustomDurations({
      focus: customFocusMinutes * 60,
      shortBreak: customBreakMinutes * 60,
    });
    setTimerMode('custom');
    setShowSettingsModal(false);
  };

  const fireCheerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF758F', '#FFCCD5', '#FFE3E8', '#CDB4DB', '#B8C0FF'],
    });
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        padding: '1.5rem 1.25rem 4rem',
        background: currentCafe.theme.bgGradient,
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* Top Study Bar: Back button, Spot indicator, Sound Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => {
                navigateWithCheck('overview');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#4A3525',
                fontSize: '0.88rem',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--c-cream-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <ArrowLeft size={16} />
              <span>Leave Desk (Map)</span>
            </button>

            <button
              onClick={() => {
                navigateWithCheck('social_study');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#2B2D42',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--c-cream-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Users size={16} />
              <span>Switch to Social Room</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Quick Café Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'rgba(255, 255, 255, 0.92)',
                padding: '0.22rem 0.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--c-cream-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              {(['strawberry', 'mocha', 'matcha', 'blue-moon'] as const).map((cId) => {
                const isCurrent = currentCafe.id === cId;
                const cConfig = CAFES[cId];
                const icons: Record<string, string> = {
                  strawberry: '🍓',
                  mocha: '☕',
                  matcha: '🍵',
                  'blue-moon': '🌙',
                };
                return (
                  <button
                    key={cId}
                    type="button"
                    onClick={() => setSelectedCafeId(cId)}
                    title={`Switch to ${cConfig.name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.78rem',
                      fontWeight: isCurrent ? 800 : 600,
                      background: isCurrent ? cConfig.theme.primaryLight : 'transparent',
                      border: isCurrent ? `1.5px solid ${cConfig.theme.primary}` : 'none',
                      color: isCurrent ? cConfig.theme.textPrimary : '#6B584C',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <span>{icons[cId]}</span>
                    <span>{cConfig.name.replace(' Café', '').replace(' House', '')}</span>
                  </button>
                );
              })}
            </div>

            {/* Spot Name Tag */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.4rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: currentCafe.theme.textPrimary,
                border: `1.5px solid ${currentCafe.theme.border}`,
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              📍 {spot.name}
            </div>

            {/* Ambient Sound Trigger */}
            <button
              onClick={() => setIsSoundPanelOpen(!isSoundPanelOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                background: '#FFFFFF',
                border: '1.5px solid var(--c-cream-border)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#4A3525',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Headphones size={15} color={currentCafe.theme.accent} />
              <span>{activeTrackId ? 'Ambience' : 'Audio'}</span>
            </button>
          </div>
        </div>

        {/* Study Studio Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Scenic Illustrated Study Desk Scene */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              border: `3px solid ${currentCafe.theme.border}`,
              boxShadow: currentCafe.theme.shadow,
              padding: '2.5rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              minHeight: 520,
              justifyContent: 'flex-end',
              background: currentCafe.theme.roomBg,
            }}
          >
            {/* 1. High-Resolution Scenic Café Environment Background */}
            <div
              key={currentCafe.id}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${cafeBg.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                zIndex: 0,
                transition: 'background-image 0.4s ease-in-out',
              }}
            />

            {/* 2. Soft Ambient Depth Vignette for natural focus */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: cafeBg.vignette,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* 3. Subtle Atmospheric Color Grade Scrim */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: cafeBg.accentOverlay,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* 4. Studio Silhouette Backlight behind Character for crystal-clear contrast */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                borderRadius: '50%',
                background: currentCafe.id === 'blue-moon'
                  ? 'radial-gradient(circle, rgba(190, 210, 255, 0.28) 0%, rgba(120, 150, 255, 0.08) 50%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.15) 50%, transparent 75%)',
                filter: 'blur(28px)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* 5. Natural Floor Shadow beneath Desk for grounding */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 140,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.12) 60%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* Top-Left Ambient Pill Badge */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 18,
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                border: `1.5px solid ${currentCafe.theme.border}`,
                borderRadius: 'var(--radius-pill)',
                padding: '0.35rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: currentCafe.theme.textPrimary,
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            >
              <span>{currentCafe.id === 'strawberry' ? '🍓' : currentCafe.id === 'mocha' ? '☕' : currentCafe.id === 'matcha' ? '🍵' : '🌙'}</span>
              <span>{currentCafe.name}</span>
            </div>

            {/* Top-Right Sparkle Accent */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
                fontSize: '1.3rem',
                animation: 'sparkleTwinkle 3s ease-in-out infinite',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            >
              ✨
            </div>

            {/* Character & Desk Accessories Layer */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                width: '100%',
              }}
            >
              {/* Full 3D Character sitting naturally at study desk */}
              <div
                style={{
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: -18,
                }}
              >
                <Character3D
                  key={`${avatar.gender}-${currentCafe.id}`}
                  gender={avatar.gender}
                  width={290}
                  height={380}
                  pose="sitting"
                  lighting={cafeBg.lightingPreset}
                  showShadow={true}
                  enableFloating={true}
                  floatingSpeed={timer.isRunning ? 2.3 : 1.5}
                  floatingIntensity={timer.isRunning ? 0.035 : 0.02}
                  modelUrl={getCharacterModel(avatar.gender, 'sitting')}
                />
              </div>

              {/* Wooden Study Desk Surface */}
              <div
                style={{
                  width: 350,
                  maxWidth: '92vw',
                  height: 94,
                  background: 'linear-gradient(180deg, #DDB892 0%, #B08968 100%)',
                  borderRadius: '16px 16px 10px 10px',
                  border: '3px solid #7F4F24',
                  boxShadow: cafeBg.deskShadow,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0.5rem 1.25rem',
                  zIndex: 3,
                }}
              >
                {/* Ordered Virtual Drink */}
                {orderedDrink ? (
                  <div
                    style={{
                      transform: 'translateY(-22px)',
                      cursor: 'pointer',
                    }}
                    title={`${orderedDrink.name} (${orderedDrink.temp}, ${orderedDrink.sweetness})`}
                  >
                    <DrinkCup drink={orderedDrink} size={58} showSteam={timer.isRunning} />
                  </div>
                ) : (
                  <div style={{ transform: 'translateY(-18px)' }}>
                    <span style={{ fontSize: '1.8rem' }}>☕</span>
                  </div>
                )}

                {/* Open Notebook & Pastel Study Pen */}
                <div
                  style={{
                    transform: 'translateY(-14px)',
                    background: '#FFFDF9',
                    border: '1.5px solid #8D5B4C',
                    borderRadius: 4,
                    padding: '0.4rem 0.6rem',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#A4133C', borderBottom: '1px solid #FFE3E8', paddingBottom: 2 }}>
                    {timer.phase === 'focus' ? 'Deep Study' : 'Rest & Sip'}
                  </div>
                  <div style={{ fontSize: '0.58rem', color: '#6B584C', marginTop: 2 }}>
                    Cycle #{timer.completedCycles + 1}
                  </div>
                </div>

                {/* Equipped Desk Plushie / Plant / Lamp */}
                {equippedDeskItem ? (
                  <div
                    style={{
                      transform: 'translateY(-20px)',
                      textAlign: 'center',
                      fontSize: '1.8rem',
                    }}
                    title={equippedDeskItem.name}
                  >
                    <span>{equippedDeskItem.icon}</span>
                  </div>
                ) : (
                  <div
                    style={{
                      transform: 'translateY(-16px)',
                      fontSize: '1.5rem',
                      opacity: 0.8,
                    }}
                    title="Mini Succulent"
                  >
                    🪴
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Bubble */}
            <div
              style={{
                marginTop: '1.25rem',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-pill)',
                padding: '0.35rem 1rem',
                border: '1px solid var(--c-cream-border)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#6B584C',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-soft)',
                zIndex: 4,
              }}
            >
              <span>{timer.isRunning ? '📖 Focusing peacefully...' : '☕ Ready when you are'}</span>
            </div>
          </div>

          {/* Right: Functional Timestamp-based Pomodoro Timer Engine */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--c-cream-border)',
              boxShadow: 'var(--shadow-medium)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Mode Selector Tabs (Classic / Deep Work / Custom) */}
            <div
              style={{
                display: 'flex',
                background: '#FAF7F2',
                borderRadius: 'var(--radius-pill)',
                padding: '0.3rem',
                border: '1.5px solid var(--c-cream-border)',
                marginBottom: '1.75rem',
                gap: '0.25rem',
                width: '100%',
                maxWidth: 360,
              }}
            >
              {(['classic', 'deep', 'custom'] as PomodoroMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimerMode(mode)}
                  style={{
                    flex: 1,
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.82rem',
                    fontWeight: timer.mode === mode ? 700 : 600,
                    background: timer.mode === mode ? '#FFFFFF' : 'transparent',
                    color: timer.mode === mode ? 'var(--c-strawberry-dark)' : '#6B584C',
                    boxShadow: timer.mode === mode ? 'var(--shadow-soft)' : 'none',
                    border: timer.mode === mode ? '1px solid var(--c-cream-border)' : 'none',
                  }}
                >
                  {mode === 'classic' && 'Classic (25m)'}
                  {mode === 'deep' && 'Deep (50m)'}
                  {mode === 'custom' && 'Custom'}
                </button>
              ))}
            </div>

            {/* Phase Pills (Focus / Short Break / Long Break) */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => setTimerPhase('focus')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: timer.phase === 'focus' ? 'var(--c-strawberry-soft)' : '#F5EFEB',
                  color: timer.phase === 'focus' ? 'var(--c-strawberry-dark)' : '#6B584C',
                  border: timer.phase === 'focus' ? '1.5px solid var(--c-strawberry-main)' : '1px solid transparent',
                }}
              >
                🧠 Focus Time
              </button>

              <button
                onClick={() => setTimerPhase('shortBreak')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: timer.phase === 'shortBreak' ? '#D8F3DC' : '#F5EFEB',
                  color: timer.phase === 'shortBreak' ? '#2D6A4F' : '#6B584C',
                  border: timer.phase === 'shortBreak' ? '1.5px solid #52B788' : '1px solid transparent',
                }}
              >
                ☕ Short Break
              </button>

              <button
                onClick={() => setTimerPhase('longBreak')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: timer.phase === 'longBreak' ? '#EDE8F5' : '#F5EFEB',
                  color: timer.phase === 'longBreak' ? 'var(--c-lavender-main)' : '#6B584C',
                  border: timer.phase === 'longBreak' ? '1.5px solid #CDB4DB' : '1px solid transparent',
                }}
              >
                🍰 Long Break
              </button>
            </div>

            {/* Circular Progress Ring with Digital Time */}
            <div style={{ position: 'relative', width: 250, height: 250, marginBottom: '2rem' }}>
              <svg width="250" height="250" viewBox="0 0 250 250" style={{ transform: 'rotate(-90deg)' }}>
                {/* Track circle */}
                <circle
                  cx="125"
                  cy="125"
                  r={circleRadius}
                  stroke="#F5EFEB"
                  strokeWidth="14"
                  fill="transparent"
                />
                {/* Animated Progress circle */}
                <circle
                  cx="125"
                  cy="125"
                  r={circleRadius}
                  stroke={
                    timer.phase === 'focus'
                      ? 'var(--c-strawberry-main)'
                      : timer.phase === 'shortBreak'
                      ? '#52B788'
                      : 'var(--c-lavender-main)'
                  }
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    transition: 'stroke-dashoffset 0.5s ease',
                  }}
                />
              </svg>

              {/* Center Time Display */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3.6rem',
                    fontWeight: 800,
                    color: '#3A2820',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {timeFormatted}
                </div>

                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color:
                      timer.phase === 'focus'
                        ? 'var(--c-strawberry-dark)'
                        : timer.phase === 'shortBreak'
                        ? '#2D6A4F'
                        : 'var(--c-lavender-main)',
                    marginTop: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {timer.phase === 'focus' ? 'Focus Session' : 'Relaxing Break'}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#8C7A6B', marginTop: '0.2rem' }}>
                  Cycles: {timer.completedCycles} / 4
                </div>
              </div>
            </div>

            {/* Timer Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Reset */}
              <button
                onClick={resetTimer}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#F5EFEB',
                  color: '#6F5E53',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--c-cream-border)',
                }}
                title="Reset Session"
              >
                <RotateCcw size={18} />
              </button>

              {/* Start / Pause / Resume Primary Button */}
              {timer.isRunning ? (
                <button
                  onClick={pauseTimer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#6F5E53',
                    color: '#FFFFFF',
                    padding: '0.95rem 2.2rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
                  }}
                >
                  <Pause size={20} fill="#FFF" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={timer.remainingSeconds < timer.totalSecondsForPhase ? resumeTimer : startTimer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #FF758F 0%, #FF4D6D 100%)',
                    color: '#FFFFFF',
                    padding: '0.95rem 2.4rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(255, 77, 109, 0.4)',
                  }}
                >
                  <Play size={22} fill="#FFF" />
                  <span>{timer.remainingSeconds < timer.totalSecondsForPhase ? 'Resume' : 'Start Focus'}</span>
                </button>
              )}

              {/* Skip Phase */}
              <button
                onClick={skipPhase}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#F5EFEB',
                  color: '#6F5E53',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--c-cream-border)',
                }}
                title="Skip to next phase"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Custom Settings & Reward Info Bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--c-cream-border)',
                fontSize: '0.82rem',
                color: '#8C7A6B',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>🫘</span>
                <span style={{ fontWeight: 600 }}>Earns 1 Bean per focus min</span>
              </div>

              <button
                onClick={() => setShowSettingsModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#4A3525',
                  fontWeight: 600,
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FAF7F2',
                  border: '1px solid var(--c-cream-border)',
                }}
              >
                <Sliders size={14} />
                <span>Custom Duration</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Duration Modal */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(50, 35, 25, 0.45)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 160,
            padding: '1rem',
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: 420,
              width: '100%',
              boxShadow: 'var(--shadow-float)',
              border: '2px solid var(--c-cream-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#3A2820',
                marginBottom: '1rem',
              }}
            >
              Custom Timer Durations
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.35rem' }}>
                Focus Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={customFocusMinutes}
                onChange={(e) => setCustomFocusMinutes(Math.max(1, parseInt(e.target.value) || 25))}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--c-cream-border)',
                  background: '#FAF7F2',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.35rem' }}>
                Short Break Duration (Minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={customBreakMinutes}
                onChange={(e) => setCustomBreakMinutes(Math.max(1, parseInt(e.target.value) || 5))}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--c-cream-border)',
                  background: '#FAF7F2',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  background: '#FAF7F2',
                  border: '1px solid var(--c-cream-border)',
                  fontWeight: 600,
                  color: '#6F5E53',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomSettings}
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--c-strawberry-main)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  border: 'none',
                }}
              >
                Apply Custom Timer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
