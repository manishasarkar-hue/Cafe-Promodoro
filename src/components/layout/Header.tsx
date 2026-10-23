import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationScreen } from '../../types';
import { Character3D } from '../avatar/Character3D';
import {
  Sparkles,
  Headphones,
  Flame,
  Award,
  Users,
  Coffee,
  Menu,
  X,
  Compass,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    screen,
    avatar,
    navigateWithCheck,
    progress,
    activeTrackId,
    isSoundPanelOpen,
    setIsSoundPanelOpen,
    isMuted,
    toggleMute,
    activeCheerMessage,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (target: NavigationScreen) => {
    if (navigateWithCheck(target)) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: 'rgba(252, 249, 242, 0.94)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--c-cream-border)',
          boxShadow: '0 2px 12px rgba(180, 160, 150, 0.08)',
          padding: '0.65rem 1.25rem',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo & Tagline */}
          <button
            onClick={() => handleNav('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textAlign: 'left',
              borderRadius: 'var(--radius-md)',
              padding: '0.2rem 0.5rem',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFCCD5 0%, #FF758F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 3px 8px rgba(255, 117, 143, 0.35)',
              }}
            >
              ☕
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--c-strawberry-dark)',
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Cafe Pomodoro
                <span
                  style={{
                    fontFamily: 'var(--font-cute)',
                    fontSize: '1rem',
                    color: 'var(--c-cream-muted)',
                    fontWeight: 400,
                  }}
                >
                  카페 포모도로
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--c-cream-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                Your little corner of calm
              </div>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => handleNav('avatar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'avatar' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'avatar' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <User size={15} />
              Avatar
            </button>

            <button
              onClick={() => handleNav('cafe')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'cafe' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'cafe' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <Coffee size={15} />
              Cafés
            </button>

            <button
              onClick={() => handleNav('drinks')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'drinks' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'drinks' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <Sparkles size={15} />
              Drinks
            </button>

            <button
              onClick={() => handleNav('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'overview' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'overview' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <Compass size={15} />
              Café Map
            </button>

            <button
              onClick={() => handleNav('personal_study')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'personal_study' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'personal_study' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <span>📖</span>
              Study Desk
            </button>

            <button
              onClick={() => handleNav('social_study')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'social_study' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'social_study' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <Users size={15} />
              Social Room
            </button>

            <button
              onClick={() => handleNav('rewards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: screen === 'rewards' ? 'var(--c-strawberry-dark)' : '#665C54',
                background: screen === 'rewards' ? 'var(--c-strawberry-soft)' : 'transparent',
              }}
            >
              <Award size={15} />
              Rewards
            </button>
          </nav>

          {/* Right Status Counters & Audio Studio Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* User 3D Avatar Profile Quick Button */}
            <button
              onClick={() => handleNav('avatar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#FFF5F0',
                border: '1.5px solid #FFD8CE',
                padding: '0.15rem 0.65rem 0.15rem 0.25rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#5C3830',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(180, 120, 110, 0.08)',
              }}
              title="Your 3D Avatar Character"
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#FFE5DD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid #FFB8A5',
                }}
              >
                <Character3D
                  width={26}
                  height={26}
                  pose="compact"
                  showShadow={false}
                  enableFloating={false}
                  modelUrl={avatar.modelUrl}
                />
              </div>
              <span style={{ maxWidth: 85, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {avatar.name}
              </span>
            </button>

            {/* Daily Streak */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: '#FFF3E0',
                border: '1px solid #FFE0B2',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#E65100',
              }}
              title="Daily Study Streak"
            >
              <Flame size={14} fill="#FF9800" color="#E65100" />
              <span>{progress.dailyStreak}d</span>
            </div>

            {/* Focus Beans Badge */}
            <button
              onClick={() => handleNav('rewards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                padding: '0.3rem 0.7rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#92400E',
                cursor: 'pointer',
              }}
              title="Focus Beans (Earned by studying)"
            >
              <span>🫘</span>
              <span>{progress.focusBeans}</span>
            </button>

            {/* Audio Studio Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <button
                onClick={() => setIsSoundPanelOpen(!isSoundPanelOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  background: activeTrackId ? '#EDE8F5' : '#F5EFEB',
                  color: activeTrackId ? 'var(--c-lavender-main)' : '#665C54',
                  border: activeTrackId ? '1px solid #D0D1FF' : '1px solid var(--c-cream-border)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
                title="Ambient Sound Studio"
              >
                <Headphones
                  size={15}
                  className={activeTrackId ? 'anim-sparkle' : ''}
                />
                <span className="sound-btn-text">
                  {activeTrackId ? 'Ambience On' : 'Sounds'}
                </span>
              </button>

              {activeTrackId && (
                <button
                  onClick={toggleMute}
                  style={{
                    padding: '0.35rem',
                    borderRadius: '50%',
                    background: '#F5EFEB',
                    color: '#665C54',
                  }}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                padding: '0.4rem',
                borderRadius: 'var(--radius-sm)',
                color: '#4A3525',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Encouragement Cheer Toast */}
      {activeCheerMessage && (
        <div
          style={{
            position: 'fixed',
            top: 75,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '2px solid var(--c-strawberry-main)',
            boxShadow: 'var(--shadow-float)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.6rem 1.4rem',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: 'var(--c-strawberry-dark)',
            animation: 'floatGentle 3s ease-in-out infinite',
          }}
        >
          <span>🌸</span>
          <span>{activeCheerMessage}</span>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '60px 0 0 0',
            background: 'rgba(252, 249, 242, 0.98)',
            zIndex: 89,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            gap: '0.75rem',
            overflowY: 'auto',
          }}
        >
          <button
            onClick={() => handleNav('landing')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNav('avatar')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            👤 Avatar Customization
          </button>
          <button
            onClick={() => handleNav('cafe')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            ☕ Choose Café
          </button>
          <button
            onClick={() => handleNav('drinks')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            🧋 Drink Menu
          </button>
          <button
            onClick={() => handleNav('overview')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            🗺️ Café Overview
          </button>
          <button
            onClick={() => handleNav('personal_study')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            📖 Personal Study Desk
          </button>
          <button
            onClick={() => handleNav('social_study')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            👥 Social Study Community
          </button>
          <button
            onClick={() => handleNav('rewards')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFF',
              border: '1px solid var(--c-cream-border)',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            🎁 Rewards & Collectibles
          </button>
        </div>
      )}

      {/* Responsive CSS for Header */}
      <style>{`
        @media (max-width: 880px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .sound-btn-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
