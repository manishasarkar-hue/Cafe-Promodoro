import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { Expression, Gender } from '../types';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Check,
  Heart,
  Smile,
  Eye,
  Shirt,
  User,
  Coffee,
  MapPin,
  Users,
  Headphones,
  Award,
} from 'lucide-react';

interface HairOption {
  id: string;
  name: string;
  gender: Gender;
}

interface OutfitOption {
  id: string;
  name: string;
  color: string;
  desc: string;
  icon: string;
}

interface AccessoryOption {
  id: string;
  name: string;
  icon: string;
}

const HAIR_OPTIONS: HairOption[] = [
  { id: 'wavy', name: 'Soft Wavy', gender: 'girl' },
  { id: 'bun', name: 'Messy Bun', gender: 'girl' },
  { id: 'bob', name: 'Stylish Bob', gender: 'girl' },
  { id: 'ponytail', name: 'Cute Ponytail', gender: 'girl' },
  { id: 'halfup', name: 'Half-Up Bow', gender: 'girl' },
  { id: 'messy', name: 'K-Pop Fringe', gender: 'boy' },
  { id: 'short', name: 'Tidy Two-Block', gender: 'boy' },
  { id: 'fluffy', name: 'Soft Curls', gender: 'boy' },
];

const OUTFIT_OPTIONS: OutfitOption[] = [
  { id: 'cardigan', name: 'Pastel Cardigan', color: '#D5C4EB', desc: 'Lavender knit + plaid pleated skirt', icon: '🧥' },
  { id: 'blouse', name: 'Ribbon Blouse', color: '#FFFDF9', desc: 'Cream silk with black ribbon bow', icon: '👔' },
  { id: 'pink_hoodie', name: 'Blush Hoodie', color: '#FFCAD4', desc: 'Oversized fleece + pleated skirt', icon: '🎽' },
  { id: 'blazer', name: 'Academia Blazer', color: '#5A473E', desc: 'Tailored jacket + structured collar', icon: '🥼' },
  { id: 'blue_knit', name: 'Baby Blue Knit', color: '#B8C0FF', desc: 'Cable-knit sweater + tennis skirt', icon: '🧶' },
];

const ACCESSORY_OPTIONS: AccessoryOption[] = [
  { id: 'none', name: 'None', icon: '✨' },
  { id: 'headphones', name: 'Headphones', icon: '🎧' },
  { id: 'bow', name: 'Silk Ribbon', icon: '🎀' },
  { id: 'hair_clip', name: 'Daisy Clips', icon: '🌼' },
  { id: 'glasses', name: 'Wire Glasses', icon: '👓' },
  { id: 'beret', name: 'French Beret', icon: '👒' },
];

const EXPRESSIONS: { id: Expression; label: string; emoji: string }[] = [
  { id: 'normal', label: 'Normal', emoji: '🌸' },
  { id: 'happy', label: 'Happy', emoji: '✨' },
  { id: 'wink', label: 'Wink', emoji: '😉' },
  { id: 'thinking', label: 'Thinking', emoji: '💭' },
];

export const AvatarPage: React.FC = () => {
  const { avatar, updateAvatar, setScreen, navigateWithCheck } = useApp();

  const [isEditingName, setIsEditingName] = useState(false);

  const handleGenderToggle = (g: Gender) => {
    updateAvatar({
      gender: g,
      hairStyle: g === 'girl' ? 'wavy' : 'messy',
    });
  };

  const handleConfirmNext = () => {
    setScreen('cafe');
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #FFF6F3 0%, #FFEBE6 40%, #FFF0EB 100%)',
        padding: '1.5rem 1rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Sunlit Café Illustration Ambient Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.12,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #FFB5A7 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, #FCD5CE 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, #FFE5D9 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 440px) 1fr',
          gap: '2rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="avatar-creator-grid"
      >
        {/* ==================== LEFT: FULL-BODY CHARACTER SHOWCASE STAGE ==================== */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem 1.5rem',
            minHeight: 580,
          }}
        >
          {/* Subtle Sunlit Window Beam Background Effect */}
          <div
            style={{
              position: 'absolute',
              width: 320,
              height: 480,
              borderRadius: '200px 200px 80px 80px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 235, 230, 0.45) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 16px 40px rgba(220, 160, 150, 0.15)',
              filter: 'blur(0.5px)',
              zIndex: 0,
            }}
          />

          {/* Floating Aesthetic Details */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: 20,
              fontSize: '1.4rem',
              animation: 'floatGentle 4s ease-in-out infinite',
              zIndex: 1,
            }}
          >
            🌸
          </div>
          <div
            style={{
              position: 'absolute',
              top: 70,
              right: 30,
              fontSize: '1.5rem',
              animation: 'sparkleTwinkle 3s ease-in-out infinite',
              zIndex: 1,
            }}
          >
            ✨
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              left: 35,
              fontSize: '1.3rem',
              opacity: 0.8,
              zIndex: 1,
            }}
          >
            🍃
          </div>

          {/* Character Stage Pedestal */}
          <div
            style={{
              position: 'absolute',
              bottom: 55,
              width: 220,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.75)',
              border: '2px solid rgba(255, 200, 190, 0.6)',
              boxShadow: '0 8px 20px rgba(180, 130, 120, 0.12)',
              zIndex: 1,
            }}
          />

          {/* High-Definition 2D Anime Chibi Character */}
          <div style={{ position: 'relative', zIndex: 2, transform: 'scale(1.02)' }}>
            <ChibiCharacter
              avatar={avatar}
              size={210}
              activity="idle"
            />
          </div>

          {/* Stage Gender & Angle Toggle Arrows */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '1.5rem',
            }}
          >
            <button
              onClick={() => handleGenderToggle(avatar.gender === 'girl' ? 'boy' : 'girl')}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #FFD5CC',
                boxShadow: '0 4px 12px rgba(180, 120, 110, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8A584C',
                transition: 'all 0.2s ease',
              }}
              title="Toggle Girl / Boy Model"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-pill)',
                padding: '0.35rem 1.1rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#6A4A3E',
                border: '1.5px solid #FFE0D6',
                boxShadow: '0 4px 12px rgba(180, 120, 110, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{avatar.gender === 'girl' ? '🌸 Girl Chibi' : '🌿 Boy Chibi'}</span>
            </div>

            <button
              onClick={() => handleGenderToggle(avatar.gender === 'girl' ? 'boy' : 'girl')}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #FFD5CC',
                boxShadow: '0 4px 12px rgba(180, 120, 110, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8A584C',
                transition: 'all 0.2s ease',
              }}
              title="Toggle Girl / Boy Model"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ==================== RIGHT: AESTHETIC CUSTOMIZATION CARD ==================== */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(12px)',
            borderRadius: '28px',
            border: '2px solid #FFE4DC',
            boxShadow: '0 20px 50px rgba(190, 140, 130, 0.15)',
            padding: '2.25rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
          className="avatar-card-panel"
        >
          {/* Header Row: Title + Name Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #F6E6DF',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#4A342B',
                }}
              >
                <Heart size={20} fill="#FF85A1" color="#FF85A1" />
                <span>Create Your Avatar</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#9C7A6E', marginTop: '0.15rem' }}>
                Choose your style, make it yours!
              </p>
            </div>

            {/* "Your Name" Editable Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#A08074',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span>Your Name</span>
                <span style={{ color: '#FF85A1' }}>🌸</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#FFF9F6',
                  border: '1.5px solid #FFD9D0',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.4rem 0.85rem',
                  boxShadow: '0 2px 8px rgba(180, 120, 110, 0.08)',
                }}
              >
                <input
                  type="text"
                  value={avatar.name}
                  maxLength={16}
                  onChange={(e) => updateAvatar({ name: e.target.value })}
                  placeholder="Enter name..."
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#4A342B',
                    width: 110,
                  }}
                />
                <Pencil size={13} color="#C48E7E" />
              </div>
            </div>
          </div>

          {/* ==================== 1. HAIR STYLE ROW ==================== */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#4A342B',
                marginBottom: '0.75rem',
              }}
            >
              <span>👩</span>
              <span>Hair Style</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {HAIR_OPTIONS.filter((h) => h.gender === avatar.gender).map((style) => {
                const isSelected = avatar.hairStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => updateAvatar({ hairStyle: style.id })}
                    style={{
                      background: isSelected ? '#FFF2EE' : '#FFFDFB',
                      border: isSelected ? '2px solid #FF85A1' : '1.5px solid #F0DCD4',
                      borderRadius: '16px',
                      padding: '0.65rem 0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: isSelected ? '0 4px 14px rgba(255, 133, 161, 0.25)' : '0 2px 8px rgba(180, 130, 120, 0.06)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    {/* Mini Head preview */}
                    <div style={{ height: 60, width: 60, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChibiCharacter
                        avatar={{
                          ...avatar,
                          hairStyle: style.id,
                        }}
                        size={56}
                        activity="idle"
                        showShadow={false}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? '#C43D5D' : '#6A4A3E',
                        marginTop: '0.35rem',
                        textAlign: 'center',
                      }}
                    >
                      {style.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== 2. OUTFIT ROW ==================== */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#4A342B',
                marginBottom: '0.75rem',
              }}
            >
              <span>👚</span>
              <span>Outfit</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {OUTFIT_OPTIONS.map((out) => {
                const isSelected = avatar.outfit === out.id;
                return (
                  <button
                    key={out.id}
                    onClick={() => updateAvatar({ outfit: out.id, outfitColor: out.color })}
                    style={{
                      background: isSelected ? '#FFF2EE' : '#FFFDFB',
                      border: isSelected ? '2px solid #FF85A1' : '1.5px solid #F0DCD4',
                      borderRadius: '16px',
                      padding: '0.65rem 0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: isSelected ? '0 4px 14px rgba(255, 133, 161, 0.25)' : '0 2px 8px rgba(180, 130, 120, 0.06)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: out.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        border: '1.5px solid #FFF',
                      }}
                    >
                      {out.icon}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? '#C43D5D' : '#6A4A3E',
                        marginTop: '0.45rem',
                        textAlign: 'center',
                      }}
                    >
                      {out.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== 3. ACCESSORIES ROW ==================== */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#4A342B',
                marginBottom: '0.75rem',
              }}
            >
              <span>🎀</span>
              <span>Accessories</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))',
                gap: '0.6rem',
              }}
            >
              {ACCESSORY_OPTIONS.map((acc) => {
                const isSelected = (avatar.accessory || 'none') === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => updateAvatar({ accessory: acc.id })}
                    style={{
                      background: isSelected ? '#FFF2EE' : '#FFFDFB',
                      border: isSelected ? '2px solid #FF85A1' : '1.5px solid #F0DCD4',
                      borderRadius: '16px',
                      padding: '0.6rem 0.4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: isSelected ? '0 4px 14px rgba(255, 133, 161, 0.25)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{acc.icon}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? '#C43D5D' : '#6A4A3E',
                      }}
                    >
                      {acc.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== 4. EXPRESSION ROW & NEXT BUTTON ==================== */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #F6E6DF',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A342B',
                  marginBottom: '0.5rem',
                }}
              >
                <span>👁️</span>
                <span>Character Expression</span>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {EXPRESSIONS.map((expr) => {
                  const isSelected = (avatar.expression || 'normal') === expr.id;
                  return (
                    <button
                      key={expr.id}
                      onClick={() => updateAvatar({ expression: expr.id })}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.78rem',
                        fontWeight: isSelected ? 800 : 600,
                        background: isSelected ? '#FF85A1' : '#FFF9F6',
                        color: isSelected ? '#FFFFFF' : '#6A4A3E',
                        border: isSelected ? '1.5px solid #FF85A1' : '1.5px solid #F0DCD4',
                        boxShadow: isSelected ? '0 3px 8px rgba(255, 133, 161, 0.3)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{expr.emoji} </span>
                      <span>{expr.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button (Matching reference design!) */}
            <button
              onClick={handleConfirmNext}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #FF758F 0%, #D85770 100%)',
                color: '#FFFFFF',
                padding: '0.95rem 2.2rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '1.05rem',
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(216, 87, 112, 0.35)',
                border: '2px solid rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              className="enter-cafe-btn"
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
