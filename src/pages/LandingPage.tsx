import React from 'react';
import { useApp } from '../context/AppContext';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { Character3D } from '../components/avatar/Character3D';
import { DrinkCup } from '../components/chibi/DrinkCup';
import { ALL_DRINKS } from '../data/drinks';
import { CAFES } from '../data/cafes';
import { CafeConfig } from '../types';
import {
  Sparkles,
  ArrowRight,
  Headphones,
  Coffee,
  Clock,
  Users,
  Award,
  Heart,
  BookOpen,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { avatar, setScreen, isSoundPanelOpen, setIsSoundPanelOpen, activeTrackId } = useApp();

  const previewDrink = ALL_DRINKS['strawberry_latte'];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        {/* Hero Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3rem',
            padding: '2.5rem 1rem',
          }}
        >
          {/* Left Hero Text Content */}
          <div>
            {/* Cute Pastel Tagline Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#FFE3E8',
                border: '1.5px solid #FFB3C1',
                borderRadius: 'var(--radius-pill)',
                padding: '0.35rem 0.95rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--c-strawberry-dark)',
                marginBottom: '1.25rem',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Sparkles size={15} />
              <span>Your little corner of calm</span>
              <span style={{ fontFamily: 'var(--font-cute)', fontSize: '1rem', marginLeft: '0.2rem' }}>
                당신만의 아늑한 쉼터
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                fontWeight: 800,
                color: '#3A2820',
                lineHeight: 1.15,
                marginBottom: '1.2rem',
                letterSpacing: '-0.02em',
              }}
            >
              Study peacefully, <br />
              <span
                style={{
                  color: 'var(--c-strawberry-main)',
                  textDecoration: 'underline wavy #FFB3C1 3px',
                  textUnderlineOffset: '8px',
                }}
              >
                one sweet sip
              </span>{' '}
              at a time.
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#6B584C',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: 520,
              }}
            >
              Step inside a dreamy Korean-inspired illustrated café simulator.
              Customize your cute chibi student, order your virtual beverage, pick your favorite sunlit study spot,
              and focus alongside simulated friends with a gentle Pomodoro timer.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setScreen('avatar')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: 'linear-gradient(135deg, #FF758F 0%, #FF4D6D 100%)',
                  color: '#FFFFFF',
                  padding: '0.95rem 1.95rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(255, 77, 109, 0.35)',
                  border: '2px solid #FFF',
                  transition: 'all 0.25s ease',
                }}
                className="enter-cafe-btn"
              >
                <span>Enter the Café</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setIsSoundPanelOpen(!isSoundPanelOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#FFFFFF',
                  color: '#4A3525',
                  padding: '0.95rem 1.4rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  border: '1.5px solid var(--c-cream-border)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <Headphones size={17} color="var(--c-strawberry-main)" />
                <span>{activeTrackId ? 'Ambience Playing' : 'Calm Sounds'}</span>
              </button>
            </div>

            {/* Micro Feature Bullet Points */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
                fontSize: '0.85rem',
                color: '#8C7A6B',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--c-strawberry-main)' }}>✔</span> 4 Themed Cafés
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--c-strawberry-main)' }}>✔</span> Accurate Pomodoro Timing
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--c-strawberry-main)' }}>✔</span> Zero Account Required
              </div>
            </div>
          </div>

          {/* Right Hero Illustrated Scene Card */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #FFF0F3 0%, #FFCCD5 60%, #FFE3E8 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid #FFCCD5',
              boxShadow: 'var(--shadow-float)',
              padding: '2.5rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Background floating sparkles */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 25,
                fontSize: '1.4rem',
                animation: 'floatGentle 4s ease-in-out infinite',
              }}
            >
              ✨
            </div>
            <div
              style={{
                position: 'absolute',
                top: 35,
                right: 35,
                fontSize: '1.6rem',
                animation: 'floatGentle 3s ease-in-out infinite',
              }}
            >
              🌸
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                left: 30,
                fontSize: '1.2rem',
                animation: 'sparkleTwinkle 2.5s infinite',
              }}
            >
              🍓
            </div>

            {/* Cute Pair of Chibi Characters studying together */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '1.5rem', zIndex: 2 }}>
              {/* 3D Character (User / Manisha) */}
              <div style={{ textAlign: 'center' }}>
                <Character3D
                  width={150}
                  height={160}
                  pose="compact"
                  showShadow={true}
                  enableFloating={true}
                  modelUrl={avatar.modelUrl}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#4A3525',
                    marginTop: '0.4rem',
                  }}
                >
                  {avatar.name} ☕
                </div>
              </div>

              {/* Center Placed Drink */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <DrinkCup
                  drink={{
                    drinkId: previewDrink.id,
                    name: previewDrink.name,
                    temp: 'iced',
                    sweetness: '70%',
                    dairy: 'Oat Milk',
                    color: previewDrink.color,
                    accentColor: previewDrink.accentColor,
                  }}
                  size={70}
                />
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#A4133C',
                    marginTop: '0.4rem',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  Strawberry Latte
                </div>
              </div>

              {/* Boy Chibi reading */}
              <div style={{ textAlign: 'center' }}>
                <ChibiCharacter
                  avatar={{
                    gender: 'boy',
                    name: 'Haru',
                    hairStyle: 'messy',
                    hairColor: '#2B2D42',
                    outfit: 'hoodie',
                    outfitColor: '#CDB4DB',
                    accessory: 'headphones',
                  }}
                  size={145}
                  activity="reading"
                />
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#4A3525',
                    marginTop: '0.4rem',
                  }}
                >
                  Haru 🎧
                </div>
              </div>
            </div>

            {/* Bottom Cafe Preview Banner */}
            <div
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.92)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                border: '1.5px solid #FFB3C1',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 2,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#590D22' }}>
                  Strawberry Café is Open 🍓
                </div>
                <div style={{ fontSize: '0.75rem', color: '#A4133C' }}>
                  Lace curtains, sweet berries & afternoon sun
                </div>
              </div>
              <button
                onClick={() => setScreen('cafe')}
                style={{
                  background: 'var(--c-strawberry-soft)',
                  color: 'var(--c-strawberry-dark)',
                  border: '1px solid var(--c-strawberry-main)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Four Cafés Highlight Cards */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#3A2820',
                marginBottom: '0.4rem',
              }}
            >
              Four Distinctive Study Havens
            </h2>
            <p style={{ color: '#8C7A6B', fontSize: '1rem' }}>
              Choose an environment that matches your mood today
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {Object.values(CAFES).map((cafe: CafeConfig) => (
              <div
                key={cafe.id}
                onClick={() => setScreen('cafe')}
                style={{
                  background: cafe.theme.cardBg,
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${cafe.theme.border}`,
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-soft)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                className="cafe-card-hover"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-cute)',
                      fontSize: '1rem',
                      color: cafe.theme.textSecondary,
                      fontWeight: 700,
                    }}
                  >
                    {cafe.koreanName}
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: cafe.theme.primaryLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cafe.theme.accent,
                    }}
                  >
                    <Coffee size={16} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: cafe.theme.textPrimary,
                    marginBottom: '0.35rem',
                  }}
                >
                  {cafe.name}
                </h3>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: cafe.theme.accent,
                    marginBottom: '0.75rem',
                  }}
                >
                  {cafe.tagline}
                </div>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#6B584C',
                    lineHeight: 1.5,
                    marginBottom: '1.2rem',
                    flex: 1,
                  }}
                >
                  {cafe.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: `1px solid ${cafe.theme.border}`,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: cafe.theme.textPrimary,
                  }}
                >
                  <span>{cafe.studySpots.length} Study Spots</span>
                  <span style={{ color: cafe.theme.accent }}>Visit →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid: Simulation, Audio, Pomodoro & Community */}
        <div
          style={{
            marginTop: '4rem',
            background: '#FFFDF9',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--c-cream-border)',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: '#FFE3E8',
                  color: 'var(--c-strawberry-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Clock size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#3A2820', marginBottom: '0.4rem' }}>
                Accurate Pomodoro
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6B584C', lineHeight: 1.6 }}>
                Timestamp-based timing that calculates exact elapsed real time even if the page refreshes.
              </p>
            </div>

            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: '#EDE8F5',
                  color: 'var(--c-lavender-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Headphones size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#3A2820', marginBottom: '0.4rem' }}>
                Procedural Soundscapes
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6B584C', lineHeight: 1.6 }}>
                Synthesized rain, forest breezes, felt piano, and crackling fires with strict single-track playback.
              </p>
            </div>

            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: '#D8F3DC',
                  color: '#2D6A4F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Users size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#3A2820', marginBottom: '0.4rem' }}>
                Simulated Study Buddies
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6B584C', lineHeight: 1.6 }}>
                Study alongside Haru, Mina, Sora, and others typing, sipping drinks, and exchanging encouragement.
              </p>
            </div>

            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: '#FEF3C7',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Award size={22} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#3A2820', marginBottom: '0.4rem' }}>
                Focus Beans & Rewards
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6B584C', lineHeight: 1.6 }}>
                Earn 1 Bean per completed focus minute. Unlock plushies, cute cat ears, and custom artisan mugs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .enter-cafe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255, 77, 109, 0.45) !important;
        }
        .cafe-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium) !important;
        }
      `}</style>
    </div>
  );
};
