import React from 'react';
import { useApp } from '../context/AppContext';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { Gender } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const HAIR_STYLES_GIRL = [
  { id: 'bob', label: 'Classic Bob' },
  { id: 'curly', label: 'Soft Wavy' },
  { id: 'ponytail', label: 'High Ponytail' },
  { id: 'fluffy', label: 'Fluffy Bangs' },
];

const HAIR_STYLES_BOY = [
  { id: 'messy', label: 'Messy Fringe' },
  { id: 'short', label: 'Tidy Part' },
  { id: 'fluffy', label: 'Soft Fluffy' },
  { id: 'bob', label: 'Under-cut' },
];

const HAIR_COLORS = [
  { hex: '#4A3525', label: 'Warm Chestnut' },
  { hex: '#2B2D42', label: 'Midnight Jet' },
  { hex: '#8D5B4C', label: 'Milk Chocolate' },
  { hex: '#DDA15E', label: 'Honey Blonde' },
  { hex: '#A4133C', label: 'Berry Auburn' },
  { hex: '#6D597A', label: 'Pastel Lilac' },
];

const OUTFITS = [
  { id: 'cardigan', label: 'Cozy Knit Cardigan' },
  { id: 'sweater', label: 'Chunky Wool Sweater' },
  { id: 'blazer', label: 'Academy Blazer' },
  { id: 'hoodie', label: 'Oversized Hoodie' },
  { id: 'apron', label: 'Barista Linen Apron' },
];

const OUTFIT_COLORS = [
  { hex: '#FFCCD5', label: 'Blush Pink' },
  { hex: '#CDB4DB', label: 'Soft Lavender' },
  { hex: '#B7E4C7', label: 'Sage Mint' },
  { hex: '#DDB892', label: 'Oatmeal Beige' },
  { hex: '#B8C0FF', label: 'Baby Blue' },
  { hex: '#FFE5D9', label: 'Warm Peach' },
];

const ACCESSORIES = [
  { id: 'none', label: 'None' },
  { id: 'glasses', label: 'Rose Gold Glasses 👓' },
  { id: 'cat_ears', label: 'Pastel Cat Ears 🐱' },
  { id: 'bow', label: 'Silk Hair Ribbon 🎀' },
  { id: 'headphones', label: 'Lofi Headset 🎧' },
];

export const AvatarPage: React.FC = () => {
  const { avatar, updateAvatar, setScreen } = useApp();

  const handleGenderChange = (gender: Gender) => {
    updateAvatar({
      gender,
      hairStyle: gender === 'girl' ? 'bob' : 'messy',
      name: avatar.name || (gender === 'girl' ? 'Yuki' : 'Haru'),
    });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {/* Navigation Bar Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setScreen('landing')}
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
            <span>Back to Home</span>
          </button>

          <div
            style={{
              fontFamily: 'var(--font-cute)',
              fontSize: '1.1rem',
              color: 'var(--c-strawberry-dark)',
              fontWeight: 700,
            }}
          >
            Step 1 of 5: Character Creation
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
            <Sparkles size={14} />
            <span>Meet your study buddy</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#3A2820',
            }}
          >
            Customize Your Chibi Avatar
          </h1>
          <p style={{ color: '#8C7A6B', fontSize: '0.95rem' }}>
            Choose your look, outfits, and accessories to accompany you at the café.
          </p>
        </div>

        {/* Two-Column Editor Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Interactive Live Character Stage */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF0F3 0%, #FFE3E8 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid #FFCCD5',
              boxShadow: 'var(--shadow-medium)',
              padding: '3rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'sticky',
              top: 90,
            }}
          >
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  fontSize: '1.2rem',
                  animation: 'floatGentle 3s ease-in-out infinite',
                }}
              >
                ✨
              </div>
              <ChibiCharacter avatar={avatar} size={210} activity="idle" />
            </div>

            {/* Character Badge Name Tag */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--c-cream-border)',
                padding: '0.45rem 1.4rem',
                boxShadow: 'var(--shadow-soft)',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#4A3525',
                }}
              >
                {avatar.name || 'Unnamed Scholar'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8C7A6B' }}>
                {avatar.gender === 'girl' ? 'Sweet Scholar' : 'Gentle Thinker'}
              </div>
            </div>

            {/* Quick Preview Pose Chips */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  background: 'rgba(255,255,255,0.8)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  color: '#8C7A6B',
                }}
              >
                Hair: {avatar.hairStyle}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  background: 'rgba(255,255,255,0.8)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  color: '#8C7A6B',
                }}
              >
                Outfit: {avatar.outfit}
              </span>
            </div>
          </div>

          {/* Right: Customization Controls Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--c-cream-border)',
              boxShadow: 'var(--shadow-soft)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* 1. Character Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Character Name
              </label>
              <input
                type="text"
                value={avatar.name}
                maxLength={18}
                onChange={(e) => updateAvatar({ name: e.target.value })}
                placeholder="Enter character name..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--c-cream-border)',
                  background: '#FAF7F2',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#3A2820',
                }}
              />
            </div>

            {/* 2. Gender Selection */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Gender Style
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleGenderChange('girl')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: avatar.gender === 'girl' ? '2px solid var(--c-strawberry-main)' : '1.5px solid var(--c-cream-border)',
                    background: avatar.gender === 'girl' ? 'var(--c-strawberry-soft)' : '#FAF7F2',
                    color: avatar.gender === 'girl' ? 'var(--c-strawberry-dark)' : '#6B584C',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>🌸</span>
                  <span>Girl Avatar</span>
                  {avatar.gender === 'girl' && <Check size={16} />}
                </button>

                <button
                  type="button"
                  onClick={() => handleGenderChange('boy')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: avatar.gender === 'boy' ? '2px solid var(--c-lavender-main)' : '1.5px solid var(--c-cream-border)',
                    background: avatar.gender === 'boy' ? '#EDE8F5' : '#FAF7F2',
                    color: avatar.gender === 'boy' ? 'var(--c-lavender-main)' : '#6B584C',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>🌿</span>
                  <span>Boy Avatar</span>
                  {avatar.gender === 'boy' && <Check size={16} />}
                </button>
              </div>
            </div>

            {/* 3. Hairstyle */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Hairstyle
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {(avatar.gender === 'girl' ? HAIR_STYLES_GIRL : HAIR_STYLES_BOY).map((style) => (
                  <button
                    key={style.id}
                    onClick={() => updateAvatar({ hairStyle: style.id })}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: avatar.hairStyle === style.id ? '2px solid #4A3525' : '1px solid var(--c-cream-border)',
                      background: avatar.hairStyle === style.id ? '#F5EFEB' : '#FFFFFF',
                      fontWeight: avatar.hairStyle === style.id ? 700 : 500,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{style.label}</span>
                    {avatar.hairStyle === style.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Hair Color Palette */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Hair Color
              </label>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {HAIR_COLORS.map((color) => {
                  const isSelected = avatar.hairColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => updateAvatar({ hairColor: color.hex })}
                      title={color.label}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: color.hex,
                        border: isSelected ? '3px solid #FFFFFF' : '2px solid #E0D3C5',
                        boxShadow: isSelected ? '0 0 0 2px #4A3525' : 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 5. Outfit Style */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Outfit Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                {OUTFITS.map((outfit) => (
                  <button
                    key={outfit.id}
                    onClick={() => updateAvatar({ outfit: outfit.id })}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: avatar.outfit === outfit.id ? '2px solid var(--c-strawberry-main)' : '1px solid var(--c-cream-border)',
                      background: avatar.outfit === outfit.id ? 'var(--c-strawberry-soft)' : '#FAF7F2',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#4A3525',
                      textAlign: 'left',
                    }}
                  >
                    {outfit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Outfit Color */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Outfit Pastel Shade
              </label>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {OUTFIT_COLORS.map((color) => {
                  const isSelected = avatar.outfitColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => updateAvatar({ outfitColor: color.hex })}
                      title={color.label}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: color.hex,
                        border: isSelected ? '3px solid #FFFFFF' : '2px solid #E0D3C5',
                        boxShadow: isSelected ? '0 0 0 2px var(--c-strawberry-main)' : 'none',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 7. Accessories */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginBottom: '0.5rem',
                }}
              >
                Accessory
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                {ACCESSORIES.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => updateAvatar({ accessory: acc.id })}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: avatar.accessory === acc.id ? '2px solid var(--c-lavender-main)' : '1px solid var(--c-cream-border)',
                      background: avatar.accessory === acc.id ? '#EDE8F5' : '#FAF7F2',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#4A3525',
                      textAlign: 'left',
                    }}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirmation Next Button */}
            <button
              onClick={() => setScreen('cafe')}
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #FF758F 0%, #FF4D6D 100%)',
                color: '#FFFFFF',
                padding: '0.95rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '1.05rem',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(255, 77, 109, 0.35)',
              }}
            >
              <span>Confirm & Choose Café</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
