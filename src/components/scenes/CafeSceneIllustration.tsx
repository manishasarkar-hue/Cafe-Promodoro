import React from 'react';
import { CafeConfig, StudySpot, AvatarConfig } from '../../types';
import { Character3D } from '../avatar/Character3D';
import { getCharacterModel } from '../../data/characterModels';
import { Sparkles, Compass, MapPin } from 'lucide-react';

interface CafeSceneIllustrationProps {
  cafe: CafeConfig;
  selectedSpot: StudySpot | null;
  onSelectSpot: (spot: StudySpot) => void;
  avatar?: AvatarConfig;
  className?: string;
  isInteractive?: boolean;
}

export const CafeSceneIllustration: React.FC<CafeSceneIllustrationProps> = ({
  cafe,
  selectedSpot,
  onSelectSpot,
  avatar,
  className = '',
  isInteractive = true,
}) => {
  return (
    <div
      className={`cafe-scene-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        minHeight: 340,
        maxHeight: 620,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: cafe.theme.shadow,
        border: `3px solid ${cafe.theme.border}`,
        background: cafe.theme.roomBg,
        userSelect: 'none',
      }}
    >
      {/* 2D Vector Architectural Illustration */}
      <svg
        viewBox="0 0 1000 562"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Gradients tailored to each cafe */}
          <linearGradient id="strawberrySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE5EC" />
            <stop offset="100%" stopColor="#FFF0F3" />
          </linearGradient>

          <linearGradient id="mochaWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE0D4" />
            <stop offset="100%" stopColor="#E6CCB2" />
          </linearGradient>

          <linearGradient id="matchaGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8F5E9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D8F3DC" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="blueMoonSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>

          <linearGradient id="woodFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDB892" />
            <stop offset="100%" stopColor="#B08968" />
          </linearGradient>

          <linearGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB703" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FB8500" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D90429" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* -------------------- CAFE BACKGROUND RENDERING -------------------- */}
        {cafe.id === 'strawberry' && (
          <g id="strawberry-environment">
            {/* Wallpaper with gentle warm tone */}
            <rect x="0" y="0" width="1000" height="380" fill="url(#strawberrySky)" />
            {/* Cute Strawberry pattern wallpaper dots */}
            {[100, 250, 400, 550, 700, 850].map((x) => (
              <g key={x} opacity="0.35">
                <circle cx={x} cy="80" r="10" fill="#FF758F" />
                <polygon points={`${x - 4},74 ${x + 4},74 ${x},70`} fill="#52796F" />
                <circle cx={x + 60} cy="150" r="10" fill="#FF758F" />
                <polygon points={`${x + 56},144 ${x + 64},144 ${x + 60},140`} fill="#52796F" />
              </g>
            ))}

            {/* Parquet Wood Floor */}
            <rect x="0" y="360" width="1000" height="202" fill="url(#woodFloor)" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#7F4F24" strokeWidth="4" />
            {[0, 160, 320, 480, 640, 800, 960].map((lx) => (
              <line key={lx} x1={lx} y1="360" x2={lx + 120} y2="562" stroke="#936639" strokeWidth="1.5" strokeDasharray="12 12" />
            ))}

            {/* Left Arched Window with Cherry Blossom view outside */}
            <path
              d="M 120 70 A 90 90 0 0 1 300 70 L 300 320 L 120 320 Z"
              fill="#FFF0F5"
              stroke="#FFF"
              strokeWidth="12"
            />
            {/* Outside Cherry Blossom Branches */}
            <path d="M 160 140 Q 210 110 260 150" stroke="#8D5B4C" strokeWidth="4" fill="none" />
            <circle cx="180" cy="130" r="8" fill="#FFB3C1" />
            <circle cx="210" cy="115" r="7" fill="#FF85A1" />
            <circle cx="240" cy="140" r="8" fill="#FFB3C1" />
            {/* Lace Curtains */}
            <path d="M 115 65 Q 155 180 135 320" stroke="#FFFFFF" strokeWidth="20" fill="none" opacity="0.9" />
            <path d="M 305 65 Q 265 180 285 320" stroke="#FFFFFF" strokeWidth="20" fill="none" opacity="0.9" />
            <polygon points="120,60 300,60 210,95" fill="#FFE3E8" stroke="#FFCCD5" strokeWidth="2" />

            {/* Center Pastry Counter */}
            <rect x="420" y="240" width="220" height="120" rx="6" fill="#FFFBF5" stroke="#E6CCB2" strokeWidth="3" />
            <rect x="440" y="260" width="180" height="70" rx="4" fill="#FFE3E8" stroke="#FF758F" strokeWidth="2" />
            <text x="530" y="300" textAnchor="middle" fontSize="18" fill="#A4133C" fontFamily="Quicksand" fontWeight="700">
              Fresh Berry Tarts 🍰
            </text>

            {/* Right Bookshelf & Berry Ribbon shelf */}
            <rect x="750" y="100" width="180" height="260" rx="6" fill="#FAF0CA" stroke="#D4A373" strokeWidth="4" />
            <line x1="750" y1="180" x2="930" y2="180" stroke="#D4A373" strokeWidth="4" />
            <line x1="750" y1="260" x2="930" y2="260" stroke="#D4A373" strokeWidth="4" />
            {/* Cute Books */}
            <rect x="770" y="130" width="22" height="50" rx="3" fill="#FF758F" />
            <rect x="795" y="125" width="26" height="55" rx="3" fill="#CDB4DB" />
            <rect x="825" y="135" width="20" height="45" rx="3" fill="#B7E4C7" />
          </g>
        )}

        {cafe.id === 'mocha' && (
          <g id="mocha-environment">
            {/* Warm Oak Plaster Wall */}
            <rect x="0" y="0" width="1000" height="380" fill="url(#mochaWall)" />
            {/* Parquet Dark Walnut Floor */}
            <rect x="0" y="360" width="1000" height="202" fill="#582F0E" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#331800" strokeWidth="5" />

            {/* Towering Grand Bookshelves */}
            <rect x="70" y="60" width="260" height="300" fill="#7F4F24" stroke="#4A2810" strokeWidth="6" rx="4" />
            <line x1="70" y1="130" x2="330" y2="130" stroke="#4A2810" strokeWidth="5" />
            <line x1="70" y1="200" x2="330" y2="200" stroke="#4A2810" strokeWidth="5" />
            <line x1="70" y1="270" x2="330" y2="270" stroke="#4A2810" strokeWidth="5" />
            {/* Colorful leatherbound books */}
            {[85, 115, 145, 180, 215, 250, 285].map((bx, i) => (
              <rect key={bx} x={bx} y="75" width="24" height="55" rx="3" fill={i % 2 === 0 ? '#936639' : '#582F0E'} />
            ))}
            {[85, 120, 160, 195, 230, 270].map((bx, i) => (
              <rect key={bx} x={bx} y="145" width="28" height="55" rx="3" fill={i % 2 === 0 ? '#7F4F24' : '#6F1D1B'} />
            ))}

            {/* Glowing Stone Fireplace in center */}
            <path d="M 440 180 L 600 180 L 620 360 L 420 360 Z" fill="#9C6644" stroke="#4A2810" strokeWidth="4" />
            {/* Fireplace Hearth Arch */}
            <path d="M 465 240 A 50 50 0 0 1 575 240 L 575 360 L 465 360 Z" fill="#240046" />
            {/* Glowing Fire Embers */}
            <ellipse cx="520" cy="320" rx="60" ry="40" fill="url(#fireGlow)" />
            <polygon points="500,340 520,290 540,340" fill="#FF9E00" />
            <polygon points="510,340 520,305 530,340" fill="#FFE49E" />

            {/* Grandfather Clock */}
            <rect x="720" y="90" width="65" height="270" rx="8" fill="#4A2810" stroke="#331800" strokeWidth="3" />
            <circle cx="752" cy="140" r="22" fill="#FAF0CA" stroke="#936639" strokeWidth="3" />
            <circle cx="752" cy="140" r="2" fill="#000" />
            <line x1="752" y1="140" x2="752" y2="126" stroke="#000" strokeWidth="2" />
            <line x1="752" y1="140" x2="762" y2="140" stroke="#000" strokeWidth="2" />

            {/* Warm Bankers Lamp on table */}
            <rect x="830" y="270" width="130" height="90" rx="4" fill="#B08968" stroke="#4A2810" strokeWidth="3" />
            <ellipse cx="895" cy="245" rx="20" ry="10" fill="#2D6A4F" stroke="#1B4332" strokeWidth="2" />
          </g>
        )}

        {cafe.id === 'matcha' && (
          <g id="matcha-environment">
            {/* Glasshouse Conservatory Ceiling */}
            <rect x="0" y="0" width="1000" height="380" fill="url(#matchaGlass)" />
            {/* White Metal Greenhouse Beams */}
            <line x1="0" y1="0" x2="500" y2="180" stroke="#FFFFFF" strokeWidth="8" />
            <line x1="1000" y1="0" x2="500" y2="180" stroke="#FFFFFF" strokeWidth="8" />
            <line x1="500" y1="0" x2="500" y2="360" stroke="#FFFFFF" strokeWidth="8" />
            <line x1="200" y1="72" x2="200" y2="360" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="800" y1="72" x2="800" y2="360" stroke="#FFFFFF" strokeWidth="4" />

            {/* Zen Stone & Bamboo Floor */}
            <rect x="0" y="360" width="1000" height="202" fill="#E9D8A6" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#B7E4C7" strokeWidth="5" />

            {/* Lush Hanging Ivy Plants */}
            <ellipse cx="250" cy="90" rx="45" ry="30" fill="#52796F" />
            <ellipse cx="250" cy="115" rx="35" ry="25" fill="#74C69D" />
            <line x1="250" y1="0" x2="250" y2="70" stroke="#40916C" strokeWidth="3" />

            <ellipse cx="750" cy="90" rx="45" ry="30" fill="#52796F" />
            <ellipse cx="750" cy="115" rx="35" ry="25" fill="#74C69D" />
            <line x1="750" y1="0" x2="750" y2="70" stroke="#40916C" strokeWidth="3" />

            {/* Bamboo Fountain Basin in center */}
            <rect x="440" y="270" width="120" height="90" rx="10" fill="#8D99AE" stroke="#4A4E69" strokeWidth="4" />
            <rect x="420" y="240" width="80" height="15" rx="4" fill="#95D5B2" stroke="#2D6A4F" strokeWidth="2" transform="rotate(-15 440 240)" />
            <ellipse cx="500" cy="285" rx="45" ry="12" fill="#90E0EF" opacity="0.8" />

            {/* Potted Fiddle Leaf Fig on Right */}
            <rect x="850" y="290" width="60" height="70" rx="6" fill="#D4A373" stroke="#8D5B4C" strokeWidth="3" />
            <path d="M 880 290 Q 890 200 870 140" stroke="#52796F" strokeWidth="6" fill="none" />
            <circle cx="860" cy="170" r="28" fill="#52B788" />
            <circle cx="900" cy="190" r="26" fill="#40916C" />
            <circle cx="875" cy="130" r="32" fill="#74C69D" />
          </g>
        )}

        {cafe.id === 'blue-moon' && (
          <g id="blue-moon-environment">
            {/* Deep Night Sky with Starlight */}
            <rect x="0" y="0" width="1000" height="380" fill="url(#blueMoonSky)" />
            {/* Twinkling Stars */}
            {[
              [80, 50], [160, 110], [240, 45], [320, 95], [410, 35],
              [600, 60], [690, 115], [780, 40], [860, 90], [930, 45],
            ].map(([sx, sy], i) => (
              <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 3 : 2} fill="#FFF" className="anim-sparkle" />
            ))}

            {/* Glowing Big Crescent Moon in Center Window */}
            <path
              d="M 520 60 A 55 55 0 1 0 545 155 A 45 45 0 1 1 520 60 Z"
              fill="#FDE047"
              filter="drop-shadow(0 0 18px rgba(253, 224, 71, 0.7))"
            />

            {/* Rainy Panoramic Window Grid */}
            <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <line x1="333" y1="0" x2="333" y2="360" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            <line x1="666" y1="0" x2="666" y2="360" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />

            {/* Raindrops trickling down glass */}
            {[
              [120, 120, 25], [190, 210, 35], [260, 140, 20], [380, 230, 30],
              [450, 110, 22], [580, 240, 28], [720, 160, 35], [820, 220, 24],
            ].map(([rx, ry, len], idx) => (
              <line
                key={idx}
                x1={rx}
                y1={ry}
                x2={rx}
                y2={ry + len}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ))}

            {/* Midnight Navy Wooden Floor */}
            <rect x="0" y="360" width="1000" height="202" fill="#1E1B4B" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#312E81" strokeWidth="5" />

            {/* Fairy Light Garland draping across */}
            <path d="M 0 50 Q 250 110 500 50 Q 750 110 1000 50" stroke="#FFE3E8" strokeWidth="2" fill="none" />
            {[50, 120, 190, 260, 340, 420, 500, 580, 660, 740, 820, 900].map((lx) => (
              <circle key={lx} cx={lx} cy={68 + (Math.sin(lx * 0.01) * 12)} r="4" fill="#FDE047" opacity="0.9" />
            ))}
          </g>
        )}
      </svg>

      {/* -------------------- INTERACTIVE STUDY SPOTS OVERLAY -------------------- */}
      {isInteractive && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {cafe.studySpots.map((spot) => {
            const isSelected = selectedSpot?.id === spot.id;

            return (
              <button
                key={spot.id}
                onClick={() => onSelectSpot(spot)}
                style={{
                  position: 'absolute',
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="study-spot-pin"
              >
                {/* Glowing Location Pin Marker / 3D Avatar */}
                <div
                  style={{
                    width: isSelected ? 52 : 40,
                    height: isSelected ? 52 : 40,
                    borderRadius: '50%',
                    background: isSelected ? '#FFF2EE' : 'rgba(255, 255, 255, 0.95)',
                    color: isSelected ? '#FFFFFF' : cafe.theme.textPrimary,
                    boxShadow: isSelected
                      ? '0 0 22px rgba(255, 117, 143, 0.85), 0 6px 16px rgba(0,0,0,0.2)'
                      : '0 4px 14px rgba(0, 0, 0, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isSelected ? '3px solid #FF758F' : `2px solid ${cafe.theme.border}`,
                    animation: isSelected ? 'pulseGlow 2s infinite' : 'floatGentle 3s ease-in-out infinite',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                  }}
                >
                  {isSelected ? (
                    <Character3D
                      key={avatar?.gender}
                      gender={avatar?.gender}
                      width={50}
                      height={50}
                      pose="compact"
                      showShadow={false}
                      enableFloating={true}
                      modelUrl={avatar?.gender ? getCharacterModel(avatar.gender, 'compact') : undefined}
                    />
                  ) : (
                    <MapPin size={20} />
                  )}
                </div>

                {/* Spot Label Card */}
                <div
                  style={{
                    marginTop: '0.4rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: `1.5px solid ${isSelected ? cafe.theme.accent : cafe.theme.border}`,
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.3rem 0.75rem',
                    boxShadow: 'var(--shadow-soft)',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: cafe.theme.textPrimary,
                    }}
                  >
                    {spot.name}
                  </div>
                  {spot.koreanName && (
                    <div
                      style={{
                        fontFamily: 'var(--font-cute)',
                        fontSize: '0.74rem',
                        color: 'var(--c-cream-muted)',
                      }}
                    >
                      {spot.koreanName}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Subtle Environmental Ambient Steam/Particles */}
      <div
        style={{
          position: 'absolute',
          top: 15,
          right: 20,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(4px)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.35rem 0.85rem',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: cafe.theme.textPrimary,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: 'var(--shadow-soft)',
          border: `1px solid ${cafe.theme.border}`,
        }}
      >
        <Sparkles size={14} color={cafe.theme.accent} />
        <span>{cafe.name}</span>
      </div>
    </div>
  );
};
