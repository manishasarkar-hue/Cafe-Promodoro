import React from 'react';
import { AvatarConfig } from '../../types';

interface ChibiCharacterProps {
  avatar: AvatarConfig;
  size?: number; // width in pixels
  activity?: 'idle' | 'typing' | 'reading' | 'writing' | 'sipping' | 'stretching' | 'thinking';
  showShadow?: boolean;
  className?: string;
}

export const ChibiCharacter: React.FC<ChibiCharacterProps> = ({
  avatar,
  size = 120,
  activity = 'idle',
  showShadow = true,
  className = '',
}) => {
  const { gender, hairStyle, hairColor, outfitColor, accessory } = avatar;

  // Height proportional to width (1:1.2 roughly for cute chibi head-to-body ratio)
  const width = size;
  const height = size * 1.25;

  return (
    <div
      className={`chibi-character-container ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        display: 'inline-block',
        userSelect: 'none',
      }}
    >
      <svg
        viewBox="0 0 100 125"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Soft blush radial gradient */}
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF758F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF758F" stopOpacity="0" />
          </radialGradient>

          {/* Eye highlight */}
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2B2D42" />
            <stop offset="100%" stopColor="#4A4E69" />
          </linearGradient>
        </defs>

        {/* Ground Shadow */}
        {showShadow && (
          <ellipse
            cx="50"
            cy="118"
            rx="28"
            ry="6"
            fill="rgba(80, 50, 40, 0.14)"
          />
        )}

        {/* Back Hair (for long hair, ponytail, or bob) */}
        {gender === 'girl' && (
          <>
            {hairStyle === 'ponytail' && (
              <path
                d="M 68 35 C 85 30, 92 50, 84 68 C 80 76, 70 70, 68 55 Z"
                fill={hairColor}
              />
            )}
            {(hairStyle === 'bob' || hairStyle === 'curly') && (
              <path
                d="M 24 35 C 16 55, 18 76, 28 82 C 34 85, 36 78, 32 68 C 30 55, 34 40, 36 35 Z"
                fill={hairColor}
              />
            )}
            {(hairStyle === 'bob' || hairStyle === 'curly') && (
              <path
                d="M 76 35 C 84 55, 82 76, 72 82 C 66 85, 64 78, 68 68 C 70 55, 66 40, 64 35 Z"
                fill={hairColor}
              />
            )}
          </>
        )}

        {/* Body / Torso */}
        <g id="chibi-body">
          {/* Outfit Main */}
          <path
            d="M 36 74 C 36 68, 64 68, 64 74 L 68 104 C 68 107, 32 107, 32 104 Z"
            fill={outfitColor || '#FFCCD5'}
            stroke="#4A3525"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Outfit Collar / Detailing */}
          <path
            d="M 44 70 L 50 78 L 56 70"
            fill="none"
            stroke="#FFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Small button */}
          <circle cx="50" cy="84" r="1.5" fill="#4A3525" />
          <circle cx="50" cy="92" r="1.5" fill="#4A3525" />

          {/* Legs / Shoes */}
          <ellipse cx="42" cy="112" rx="4.5" ry="3.5" fill="#4A3525" />
          <ellipse cx="58" cy="112" rx="4.5" ry="3.5" fill="#4A3525" />
        </g>

        {/* Arms and Hands according to Activity */}
        <g id="chibi-arms">
          {activity === 'typing' && (
            <>
              {/* Arms reaching to laptop */}
              <path
                d="M 34 76 Q 40 88 44 92"
                stroke="#4A3525"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 34 76 Q 40 88 44 92"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 76 Q 60 88 56 92"
                stroke="#4A3525"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 76 Q 60 88 56 92"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute Chibi Laptop */}
              <rect x="40" y="86" width="20" height="13" rx="2" fill="#E2EAFC" stroke="#4A3525" strokeWidth="1.5" />
              <line x1="43" y1="95" x2="57" y2="95" stroke="#B8C0FF" strokeWidth="1.5" strokeLinecap="round" />
              <polygon points="49,90 51,90 50,88" fill="#FF758F" />
            </>
          )}

          {activity === 'reading' && (
            <>
              {/* Holding book open */}
              <path
                d="M 34 78 Q 42 90 46 88"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 78 Q 58 90 54 88"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Open Book */}
              <path
                d="M 36 94 Q 50 88 50 96 Q 50 88 64 94 L 62 104 Q 50 98 50 106 Q 50 98 38 104 Z"
                fill="#FFF9F0"
                stroke="#4A3525"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <line x1="42" y1="95" x2="48" y2="95" stroke="#9E8E7E" strokeWidth="1" />
              <line x1="42" y1="99" x2="48" y2="99" stroke="#9E8E7E" strokeWidth="1" />
              <line x1="52" y1="95" x2="58" y2="95" stroke="#9E8E7E" strokeWidth="1" />
              <line x1="52" y1="99" x2="58" y2="99" stroke="#9E8E7E" strokeWidth="1" />
            </>
          )}

          {activity === 'writing' && (
            <>
              {/* Writing with pencil on notepad */}
              <path
                d="M 34 78 Q 40 88 44 92"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 78 Q 62 86 54 90"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Notepad */}
              <rect x="42" y="90" width="16" height="15" rx="1.5" fill="#FFFBF5" stroke="#4A3525" strokeWidth="1.2" transform="rotate(-6 50 97)" />
              {/* Pencil */}
              <line x1="56" y1="84" x2="50" y2="94" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {activity === 'sipping' && (
            <>
              {/* Both hands holding cup to mouth */}
              <path
                d="M 34 78 Q 42 74 46 68"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 78 Q 58 74 54 68"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Small Cup */}
              <rect x="45" y="64" width="10" height="9" rx="2" fill="#FFF" stroke="#4A3525" strokeWidth="1.5" />
              <path d="M 50 62 Q 52 59 50 56" stroke="#FFB3C1" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </>
          )}

          {activity === 'stretching' && (
            <>
              {/* Arms stretched happily upwards */}
              <path
                d="M 34 76 Q 26 62 28 50"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="28" cy="49" r="3" fill="#FFE0D0" />
              <path
                d="M 66 76 Q 74 62 72 50"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="72" cy="49" r="3" fill="#FFE0D0" />
            </>
          )}

          {(activity === 'idle' || activity === 'thinking') && (
            <>
              {/* Gentle folded or resting hands */}
              <path
                d="M 34 78 Q 42 88 47 84"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 66 78 Q 58 88 53 84"
                stroke={outfitColor || '#FFCCD5'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="47" cy="85" r="3" fill="#FFE0D0" />
              <circle cx="53" cy="85" r="3" fill="#FFE0D0" />
            </>
          )}
        </g>

        {/* Big Chibi Head (Korean Stationery Style) */}
        <g id="chibi-head">
          {/* Head Base */}
          <ellipse
            cx="50"
            cy="46"
            rx="26"
            ry="24"
            fill="#FFF1E6"
            stroke="#4A3525"
            strokeWidth="2.2"
          />

          {/* Sweet Rosy Cheeks */}
          <ellipse cx="33" cy="53" rx="5.5" ry="3.5" fill="url(#blushGrad)" />
          <ellipse cx="67" cy="53" rx="5.5" ry="3.5" fill="url(#blushGrad)" />

          {/* Cute Chibi Eyes */}
          {activity === 'stretching' ? (
            /* Happy curved squinting eyes */
            <>
              <path d="M 36 46 Q 40 40 44 46" stroke="#4A3525" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M 56 46 Q 60 40 64 46" stroke="#4A3525" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            /* Big sparkling puppy anime eyes */
            <>
              {/* Left Eye */}
              <ellipse cx="40" cy="46" rx="4.2" ry="5.5" fill="url(#eyeGrad)" />
              <circle cx="38.5" cy="43.5" r="1.8" fill="#FFFFFF" />
              <circle cx="42" cy="48" r="0.8" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="60" cy="46" rx="4.2" ry="5.5" fill="url(#eyeGrad)" />
              <circle cx="58.5" cy="43.5" r="1.8" fill="#FFFFFF" />
              <circle cx="62" cy="48" r="0.8" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Tiny Nose */}
          <circle cx="50" cy="49" r="0.8" fill="#E0A496" />

          {/* Sweet Smile */}
          <path
            d="M 47 53 Q 50 56 53 53"
            stroke="#7C4336"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Front Hair Bangs and Style */}
        <g id="chibi-hair">
          {hairStyle === 'bob' && (
            <path
              d="M 24 44 C 23 24, 77 24, 76 44 C 74 36, 68 32, 60 34 C 54 35, 48 33, 44 35 C 36 32, 28 36, 24 44 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'curly' && (
            <path
              d="M 23 42 C 22 22, 78 22, 77 42 C 73 35, 68 30, 62 34 C 56 31, 46 31, 40 34 C 32 30, 26 35, 23 42 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'ponytail' && (
            <path
              d="M 25 43 C 24 23, 76 23, 75 43 C 71 34, 65 31, 56 34 C 48 31, 38 32, 33 36 C 28 34, 26 39, 25 43 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'messy' && (
            <path
              d="M 24 42 C 20 20, 80 20, 76 42 C 73 34, 69 29, 64 36 C 58 28, 48 30, 44 35 C 38 27, 28 32, 24 42 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'short' && (
            <path
              d="M 25 42 C 24 24, 76 24, 75 42 C 72 35, 66 31, 58 35 C 50 32, 42 33, 34 36 C 28 35, 26 39, 25 42 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'fluffy' && (
            <path
              d="M 22 40 C 20 18, 80 18, 78 40 C 74 32, 66 28, 59 34 C 52 28, 44 28, 38 34 C 30 28, 24 33, 22 40 Z"
              fill={hairColor}
              stroke="#4A3525"
              strokeWidth="2"
            />
          )}
        </g>

        {/* Accessories */}
        <g id="chibi-accessories">
          {accessory === 'glasses' && (
            <>
              {/* Left Lens */}
              <rect x="33" y="40" width="13" height="11" rx="4" fill="rgba(255,255,255,0.4)" stroke="#B76E79" strokeWidth="1.8" />
              {/* Right Lens */}
              <rect x="54" y="40" width="13" height="11" rx="4" fill="rgba(255,255,255,0.4)" stroke="#B76E79" strokeWidth="1.8" />
              {/* Bridge */}
              <line x1="46" y1="45" x2="54" y2="45" stroke="#B76E79" strokeWidth="1.8" />
            </>
          )}

          {accessory === 'cat_ears' && (
            <>
              {/* Left Cat Ear */}
              <polygon points="26,26 34,10 42,22" fill="#FF758F" stroke="#4A3525" strokeWidth="1.8" strokeLinejoin="round" />
              <polygon points="29,24 34,14 39,22" fill="#FFE3E8" />
              {/* Right Cat Ear */}
              <polygon points="74,26 66,10 58,22" fill="#FF758F" stroke="#4A3525" strokeWidth="1.8" strokeLinejoin="round" />
              <polygon points="71,24 66,14 61,22" fill="#FFE3E8" />
              {/* Headband wire */}
              <path d="M 33 22 Q 50 16 67 22" stroke="#4A3525" strokeWidth="1.5" fill="none" />
            </>
          )}

          {accessory === 'bow' && (
            <g transform="translate(62, 18)">
              {/* Cute Silk Hair Ribbon */}
              <polygon points="0,6 10,0 8,12" fill="#FF4D6D" stroke="#4A3525" strokeWidth="1.2" />
              <polygon points="0,6 -10,0 -8,12" fill="#FF4D6D" stroke="#4A3525" strokeWidth="1.2" />
              <circle cx="0" cy="6" r="3" fill="#FFE3E8" stroke="#4A3525" strokeWidth="1.2" />
            </g>
          )}

          {accessory === 'headphones' && (
            <>
              {/* Headband arc */}
              <path d="M 22 44 C 20 18, 80 18, 78 44" stroke="#7209B7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Left Ear Cushion */}
              <rect x="18" y="38" width="8" height="16" rx="4" fill="#B8C0FF" stroke="#4A3525" strokeWidth="1.6" />
              {/* Right Ear Cushion */}
              <rect x="74" y="38" width="8" height="16" rx="4" fill="#B8C0FF" stroke="#4A3525" strokeWidth="1.6" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
