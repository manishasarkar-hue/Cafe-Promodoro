import React from 'react';
import { useApp } from '../context/AppContext';
import { CAFES } from '../data/cafes';
import { CafeConfig, CafeId } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Coffee,
  Check,
  Headphones,
  MapPin,
} from 'lucide-react';

export const CafeSelectPage: React.FC = () => {
  const { selectedCafeId, setSelectedCafeId, setScreen } = useApp();

  const handleSelectCafe = (cafeId: CafeId) => {
    setSelectedCafeId(cafeId);
  };

  const handleConfirm = () => {
    setScreen('drinks');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        {/* Navigation Bar Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setScreen('avatar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#8C7A6B',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Avatar</span>
          </button>

          <div
            style={{
              fontFamily: 'var(--font-cute)',
              fontSize: '1.1rem',
              color: 'var(--c-strawberry-dark)',
              fontWeight: 700,
            }}
          >
            Step 2 of 5: Café Destination
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#FFE3E8',
              color: 'var(--c-strawberry-dark)',
              padding: '0.25rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            <Coffee size={14} />
            <span>Select your study sanctuary</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#3A2820',
            }}
          >
            Choose Your Café Theme
          </h1>
          <p style={{ color: '#8C7A6B', fontSize: '0.95rem' }}>
            Each café features unique handcrafted drinks, ambient lighting, decor motifs, and study spots.
          </p>
        </div>

        {/* 4 Café Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {Object.values(CAFES).map((cafe: CafeConfig) => {
            const isSelected = selectedCafeId === cafe.id;

            return (
              <div
                key={cafe.id}
                onClick={() => handleSelectCafe(cafe.id)}
                style={{
                  background: isSelected ? cafe.theme.cardBg : '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? `3px solid ${cafe.theme.accent}` : '2px solid var(--c-cream-border)',
                  boxShadow: isSelected ? cafe.theme.shadow : 'var(--shadow-soft)',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Selected Ribbon Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 15,
                      right: 15,
                      background: cafe.theme.accent,
                      color: '#FFFFFF',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Check size={16} />
                  </div>
                )}

                {/* Korean Name & Decorative Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-cute)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: cafe.theme.textSecondary,
                    }}
                  >
                    {cafe.koreanName}
                  </span>
                </div>

                {/* Scenic Background Preview */}
                {cafe.backgroundImage && (
                  <div
                    style={{
                      position: 'relative',
                      height: 120,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      marginBottom: '0.9rem',
                      border: `1.5px solid ${cafe.theme.border}`,
                      boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                    }}
                  >
                    <img
                      src={cafe.backgroundImage}
                      alt={cafe.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
                      }}
                    />
                  </div>
                )}

                {/* Cafe Name & Tagline */}
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: cafe.theme.textPrimary,
                    marginBottom: '0.35rem',
                  }}
                >
                  {cafe.name}
                </h2>
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: cafe.theme.accent,
                    marginBottom: '0.9rem',
                  }}
                >
                  {cafe.tagline}
                </div>

                {/* Atmosphere Description */}
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: '#6B584C',
                    lineHeight: 1.55,
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {cafe.description}
                </p>

                {/* Decor Motifs Pill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {cafe.decorMotifs.map((motif) => (
                    <span
                      key={motif}
                      style={{
                        fontSize: '0.72rem',
                        background: cafe.theme.primaryLight,
                        color: cafe.theme.textPrimary,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 600,
                      }}
                    >
                      {motif}
                    </span>
                  ))}
                </div>

                {/* Bottom Metadata (Spots & Recommended Audio) */}
                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: `1px solid ${cafe.theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#8C7A6B',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} color={cafe.theme.accent} />
                    <span>{cafe.studySpots.length} Study Nooks</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Headphones size={14} color={cafe.theme.accent} />
                    <span>Ambient audio</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirmation & Order Drink Action */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleConfirm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #FF758F 0%, #FF4D6D 100%)',
              color: '#FFFFFF',
              padding: '0.95rem 2.5rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '1.05rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(255, 77, 109, 0.35)',
            }}
          >
            <span>Confirm Café & Order Drink</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
