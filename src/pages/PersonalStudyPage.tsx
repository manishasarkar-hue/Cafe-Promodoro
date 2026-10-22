import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAFES } from '../data/cafes';
import { COLLECTIBLES } from '../data/collectibles';
import { CollectibleItem, PomodoroMode } from '../types';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Spot Name Tag */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: currentCafe.theme.textPrimary,
                border: `1.5px solid ${currentCafe.theme.border}`,
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              📍 {currentCafe.name} • {spot.name}
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
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#4A3525',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Headphones size={15} color={currentCafe.theme.accent} />
              <span>{activeTrackId ? 'Ambience Playing' : 'Ambient Audio'}</span>
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
          {/* Left: Illustrated Study Desk Scene */}
          <div
            style={{
              position: 'relative',
              background: currentCafe.theme.roomBg,
              borderRadius: 'var(--radius-lg)',
              border: `3px solid ${currentCafe.theme.border}`,
              boxShadow: currentCafe.theme.shadow,
              padding: '3rem 2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              minHeight: 460,
              justifyContent: 'flex-end',
            }}
          >
            {/* Background Spot Lighting Glow */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 280,
                height: 180,
                borderRadius: '50%',
                background: currentCafe.theme.primaryLight,
                filter: 'blur(45px)',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            />

            {/* Floating Motifs / Flowers / Sparkles */}
            <div
              style={{
                position: 'absolute',
                top: 25,
                left: 30,
                fontSize: '1.4rem',
                animation: 'floatGentle 4s ease-in-out infinite',
              }}
            >
              🌿
            </div>
            <div
              style={{
                position: 'absolute',
                top: 35,
                right: 35,
                fontSize: '1.5rem',
                animation: 'sparkleTwinkle 3s ease-in-out infinite',
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
              }}
            >
              {/* Chibi Character sitting at desk */}
              <div
                style={{
                  marginBottom: -25,
                  zIndex: 1,
                  animation: timer.isRunning ? 'typingBob 2s ease-in-out infinite' : 'floatGentle 4s ease-in-out infinite',
                }}
              >
                <ChibiCharacter
                  avatar={avatar}
                  size={190}
                  activity={timer.isRunning ? (timer.phase === 'focus' ? 'typing' : 'sipping') : 'idle'}
                />
              </div>

              {/* Wooden Study Desk Surface */}
              <div
                style={{
                  width: 340,
                  maxWidth: '92vw',
                  height: 90,
                  background: 'linear-gradient(180deg, #DDB892 0%, #B08968 100%)',
                  borderRadius: '16px 16px 8px 8px',
                  border: '3px solid #7F4F24',
                  boxShadow: '0 12px 30px rgba(80, 50, 40, 0.25)',
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
