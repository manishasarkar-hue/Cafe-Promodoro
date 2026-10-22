import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAFES } from '../data/cafes';
import { StudySpot } from '../types';
import { CafeSceneIllustration } from '../components/scenes/CafeSceneIllustration';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { DrinkCup } from '../components/chibi/DrinkCup';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Compass,
  MapPin,
  Coffee,
  Headphones,
  Check,
} from 'lucide-react';

export const CafeOverviewPage: React.FC = () => {
  const {
    selectedCafeId,
    selectedSpot,
    setSelectedSpot,
    setStudyMode,
    setScreen,
    avatar,
    orderedDrink,
    isSoundPanelOpen,
    setIsSoundPanelOpen,
    activeTrackId,
    playTrack,
  } = useApp();

  const currentCafe = CAFES[selectedCafeId];

  // Default to first spot if none selected
  const activeSpot = selectedSpot || currentCafe.studySpots[0];

  const [isZooming, setIsZooming] = useState<boolean>(false);

  const handleSpotSelect = (spot: StudySpot) => {
    setSelectedSpot(spot);
  };

  const handleEnterPersonalStudy = () => {
    setIsZooming(true);
    setTimeout(() => {
      setStudyMode('personal');
      setScreen('personal_study');
    }, 450);
  };

  const handleEnterSocialStudy = () => {
    setIsZooming(true);
    setTimeout(() => {
      setStudyMode('social');
      setScreen('social_study');
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        padding: '1.5rem 1.25rem 4rem',
        opacity: isZooming ? 0.3 : 1,
        transform: isZooming ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Top Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setScreen('drinks')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#8C7A6B',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={16} />
              <span>Drinks Menu</span>
            </button>

            <button
              onClick={() => setScreen('cafe')}
              style={{
                fontSize: '0.82rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: currentCafe.theme.primaryLight,
                color: currentCafe.theme.textPrimary,
                fontWeight: 700,
                border: `1px solid ${currentCafe.theme.border}`,
              }}
            >
              Change Café
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => {
                if (!activeTrackId) {
                  playTrack(currentCafe.recommendedSoundId);
                } else {
                  setIsSoundPanelOpen(!isSoundPanelOpen);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
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
              <span>{activeTrackId ? 'Ambience Playing' : 'Café Ambience'}</span>
            </button>

            <button
              onClick={handleEnterSocialStudy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                background: 'linear-gradient(135deg, #CDB4DB 0%, #B8C0FF 100%)',
                color: '#2B2D42',
                border: '1px solid #FFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Users size={16} />
              <span>Join Social Study Room</span>
            </button>
          </div>
        </div>

        {/* Café Title & Subtitle */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: currentCafe.theme.textPrimary,
              }}
            >
              {currentCafe.name}
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-cute)',
                fontSize: '1.25rem',
                color: currentCafe.theme.textSecondary,
                fontWeight: 700,
              }}
            >
              {currentCafe.koreanName}
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#6B584C' }}>
            Click on any glowing pin to choose your study spot, or join fellow students in the shared room.
          </p>
        </div>

        {/* Main Full-Screen Architectural Scene Illustration */}
        <div style={{ marginBottom: '1.75rem', position: 'relative' }}>
          <CafeSceneIllustration
            cafe={currentCafe}
            selectedSpot={activeSpot}
            onSelectSpot={handleSpotSelect}
          />
        </div>

        {/* Selected Spot Details & Ready to Study Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          {/* Active Spot Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${currentCafe.theme.border}`,
              padding: '1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: currentCafe.theme.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentCafe.theme.accent,
                boxShadow: 'var(--shadow-soft)',
                flexShrink: 0,
              }}
            >
              <MapPin size={26} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#3A2820',
                  }}
                >
                  {activeSpot.name}
                </span>
                {activeSpot.koreanName && (
                  <span
                    style={{
                      fontFamily: 'var(--font-cute)',
                      fontSize: '0.95rem',
                      color: currentCafe.theme.accent,
                      fontWeight: 700,
                    }}
                  >
                    {activeSpot.koreanName}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#6B584C', lineHeight: 1.45, marginBottom: '0.35rem' }}>
                {activeSpot.description}
              </p>
              <div style={{ fontSize: '0.75rem', color: '#8C7A6B', fontWeight: 600 }}>
                💡 Ambiance: {activeSpot.viewNote}
              </div>
            </div>
          </div>

          {/* User's Session Prepared Summary Card & Start Button */}
          <div
            style={{
              background: '#FFFDF9',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--c-cream-border)',
              padding: '1.25rem 1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Avatar & Drink mini preview */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <ChibiCharacter avatar={avatar} size={50} activity="idle" showShadow={false} />
              {orderedDrink && (
                <DrinkCup drink={orderedDrink} size={36} showSteam={false} />
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#4A3525' }}>
                  {avatar.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#8C7A6B' }}>
                  {orderedDrink ? orderedDrink.name : 'Waiting for drink'}
                </div>
              </div>
            </div>

            {/* Launch Study Desk Button */}
            <button
              onClick={handleEnterPersonalStudy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: 'linear-gradient(135deg, #FF758F 0%, #FF4D6D 100%)',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(255, 77, 109, 0.35)',
              }}
            >
              <span>Sit at Desk & Focus</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
