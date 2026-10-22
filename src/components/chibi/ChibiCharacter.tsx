import React from 'react';
import { AvatarConfig, Expression } from '../../types';

interface ChibiCharacterProps {
  avatar: AvatarConfig;
  size?: number; // width in pixels
  activity?: 'idle' | 'typing' | 'reading' | 'writing' | 'sipping' | 'stretching' | 'thinking';
  showShadow?: boolean;
  className?: string;
  expressionOverride?: Expression;
}

export const ChibiCharacter: React.FC<ChibiCharacterProps> = ({
  avatar,
  size = 200,
  activity = 'idle',
  showShadow = true,
  className = '',
  expressionOverride,
}) => {
  const {
    gender = 'girl',
    hairStyle = 'wavy',
    hairColor = '#4A3525',
    outfit = 'cardigan',
    outfitColor,
    accessory = 'none',
    expression: configExpression = 'normal',
  } = avatar;

  const expression = expressionOverride || configExpression || 'normal';

  // Proportions: 4.5 heads tall (240w x 380h viewBox)
  const width = size;
  const height = size * 1.58;

  // Derive darker and highlight tones for hair
  const darkHair = '#2C1D14';
  const lightHair = '#7A543E';

  // Unique SVG IDs to prevent gradient collision
  const uid = React.useId().replace(/:/g, '_');

  return (
    <div
      className={`chibi-character-art ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        display: 'inline-block',
        userSelect: 'none',
      }}
    >
      <svg
        viewBox="0 0 240 380"
        width="100%"
        height="100%"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          {/* Skin tones */}
          <linearGradient id={`skinGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="60%" stopColor="#FFEFE7" />
            <stop offset="100%" stopColor="#FFE5D9" />
          </linearGradient>

          <linearGradient id={`skinShadow_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D0C2" />
            <stop offset="100%" stopColor="#ECC4B2" />
          </linearGradient>

          {/* Cheeks blush */}
          <radialGradient id={`blushGrad_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7A8F" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FF8FA3" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF8FA3" stopOpacity="0" />
          </radialGradient>

          {/* Anime glossy eye gradients */}
          <linearGradient id={`irisGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A1B14" />
            <stop offset="35%" stopColor="#4A2F22" />
            <stop offset="70%" stopColor="#7C4B33" />
            <stop offset="100%" stopColor="#B3704C" />
          </linearGradient>

          <linearGradient id={`irisGlow_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E09F67" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFCCA3" stopOpacity="0.8" />
          </linearGradient>

          {/* Hair gradients */}
          <linearGradient id={`hairGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hairColor} />
            <stop offset="70%" stopColor={hairColor} />
            <stop offset="100%" stopColor={darkHair} />
          </linearGradient>

          <linearGradient id={`hairShine_${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFF0E6" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Outfit cardigans & textures */}
          <linearGradient id={`cardiganGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={outfitColor || '#D5C4EB'} />
            <stop offset="100%" stopColor="#BCA7D8" />
          </linearGradient>

          <linearGradient id={`skirtPlaid_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9EDF8" />
            <stop offset="100%" stopColor="#D2DBEE" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes idleBreathe {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes hairSway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1deg); }
          }
          @keyframes blinkEyes {
            0%, 96%, 100% { transform: scaleY(1); }
            98% { transform: scaleY(0.08); }
          }
          .anim-idle {
            animation: idleBreathe 3.6s ease-in-out infinite;
            transform-origin: 120px 360px;
          }
          .anim-hair {
            animation: hairSway 4.2s ease-in-out infinite;
            transform-origin: 120px 60px;
          }
          .anim-blink {
            animation: blinkEyes 4.5s ease-in-out infinite;
            transform-origin: 120px 105px;
          }
        `}</style>

        {/* Soft Ground Shadow */}
        {showShadow && (
          <ellipse
            cx="120"
            cy="364"
            rx="56"
            ry="11"
            fill="rgba(90, 60, 50, 0.16)"
          />
        )}

        {/* Character Group with Idle Breathing */}
        <g className="anim-idle">
          {/* ==================== 1. BACK HAIR LAYER ==================== */}
          <g className="anim-hair">
            {gender === 'girl' && hairStyle === 'wavy' && (
              <path
                d="M 52 90 C 26 130, 20 200, 38 250 C 48 275, 72 265, 76 240 C 82 200, 78 140, 88 110 Z
                   M 188 90 C 214 130, 220 200, 202 250 C 192 275, 168 265, 164 240 C 158 200, 162 140, 152 110 Z
                   M 48 110 C 25 160, 30 240, 52 280 C 60 292, 74 285, 76 270 C 80 230, 68 180, 78 130 Z
                   M 192 110 C 215 160, 210 240, 188 280 C 180 292, 166 285, 164 270 C 160 230, 172 180, 162 130 Z"
                fill={`url(#hairGrad_${uid})`}
                stroke="#322016"
                strokeWidth="1.2"
              />
            )}

            {gender === 'girl' && hairStyle === 'ponytail' && (
              <path
                d="M 155 75 C 195 70, 220 110, 215 170 C 210 205, 190 220, 182 195 C 175 165, 180 120, 150 95 Z"
                fill={`url(#hairGrad_${uid})`}
                stroke="#322016"
                strokeWidth="1.2"
              />
            )}

            {gender === 'girl' && hairStyle === 'bun' && (
              <g>
                <circle
                  cx="120"
                  cy="42"
                  r="26"
                  fill={`url(#hairGrad_${uid})`}
                  stroke="#322016"
                  strokeWidth="1.4"
                />
                {/* Bun ring highlight */}
                <ellipse cx="120" cy="38" rx="16" ry="12" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
              </g>
            )}

            {gender === 'girl' && (hairStyle === 'bob' || hairStyle === 'halfup') && (
              <path
                d="M 60 90 C 44 125, 48 180, 74 195 C 84 200, 88 185, 86 170 C 80 140, 82 115, 88 100 Z
                   M 180 90 C 196 125, 192 180, 166 195 C 156 200, 152 185, 154 170 C 160 140, 158 115, 152 100 Z"
                fill={`url(#hairGrad_${uid})`}
                stroke="#322016"
                strokeWidth="1.2"
              />
            )}

            {gender === 'boy' && (
              <path
                d="M 64 90 C 52 120, 56 150, 74 165 C 80 170, 85 155, 82 140 C 78 120, 80 105, 85 95 Z
                   M 176 90 C 188 120, 184 150, 166 165 C 160 170, 155 155, 158 140 C 162 120, 160 105, 155 95 Z"
                fill={`url(#hairGrad_${uid})`}
                stroke="#322016"
                strokeWidth="1.2"
              />
            )}
          </g>

          {/* ==================== 2. LEGS & SHOES ==================== */}
          <g id="legs-and-feet">
            {/* Left Leg */}
            <path
              d="M 104 235 L 102 300 Q 102 315 101 325 L 109 325 Q 112 315 113 300 L 115 235 Z"
              fill={`url(#skinGrad_${uid})`}
              stroke="#D8AFA0"
              strokeWidth="0.8"
            />
            {/* Left Knee soft pink blush */}
            <ellipse cx="107" cy="272" rx="4.5" ry="3.5" fill="#FFAAA6" opacity="0.4" />

            {/* Right Leg */}
            <path
              d="M 125 235 L 127 300 Q 128 315 129 325 L 137 325 Q 137 315 137 300 L 136 235 Z"
              fill={`url(#skinGrad_${uid})`}
              stroke="#D8AFA0"
              strokeWidth="0.8"
            />
            {/* Right Knee soft pink blush */}
            <ellipse cx="132" cy="272" rx="4.5" ry="3.5" fill="#FFAAA6" opacity="0.4" />

            {/* Scrunched White Cotton Socks (Korean aesthetic) */}
            {/* Left Sock */}
            <path
              d="M 98 322 C 98 314, 114 314, 114 322 L 115 344 C 115 347, 98 347, 98 344 Z"
              fill="#FFFFFF"
              stroke="#D3C9C2"
              strokeWidth="1"
            />
            <path d="M 98 328 Q 106 331 114 328" stroke="#E6DFDB" strokeWidth="1.2" fill="none" />
            <path d="M 98 335 Q 106 338 115 335" stroke="#E6DFDB" strokeWidth="1.2" fill="none" />

            {/* Right Sock */}
            <path
              d="M 126 322 C 126 314, 142 314, 142 322 L 142 344 C 142 347, 126 347, 126 344 Z"
              fill="#FFFFFF"
              stroke="#D3C9C2"
              strokeWidth="1"
            />
            <path d="M 126 328 Q 134 331 142 328" stroke="#E6DFDB" strokeWidth="1.2" fill="none" />
            <path d="M 126 335 Q 134 338 142 335" stroke="#E6DFDB" strokeWidth="1.2" fill="none" />

            {/* Chunky Dad Sneakers (Pastel Pink/Beige/White) */}
            {/* Left Sneaker */}
            <g id="left-sneaker">
              <path
                d="M 92 344 C 95 338, 115 338, 118 344 L 120 357 C 120 363, 85 363, 86 355 Z"
                fill="#FFFFFF"
                stroke="#6E584D"
                strokeWidth="1.2"
              />
              {/* Chunky sole */}
              <path
                d="M 85 355 C 85 365, 122 365, 121 356 L 122 362 C 122 366, 84 366, 84 362 Z"
                fill="#E8DFD8"
                stroke="#6E584D"
                strokeWidth="1"
              />
              {/* Pastel pink accent */}
              <path d="M 94 345 Q 102 349 114 345" stroke="#FFAFCC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Shoelaces */}
              <line x1="100" y1="344" x2="108" y2="344" stroke="#6E584D" strokeWidth="1" />
              <line x1="100" y1="347" x2="108" y2="347" stroke="#6E584D" strokeWidth="1" />
            </g>

            {/* Right Sneaker */}
            <g id="right-sneaker">
              <path
                d="M 122 344 C 125 338, 145 338, 148 344 L 152 355 C 153 363, 118 363, 119 357 Z"
                fill="#FFFFFF"
                stroke="#6E584D"
                strokeWidth="1.2"
              />
              {/* Chunky sole */}
              <path
                d="M 118 356 C 118 365, 154 365, 154 355 L 155 362 C 155 366, 117 366, 117 362 Z"
                fill="#E8DFD8"
                stroke="#6E584D"
                strokeWidth="1"
              />
              {/* Pastel pink accent */}
              <path d="M 126 345 Q 134 349 146 345" stroke="#FFAFCC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Shoelaces */}
              <line x1="131" y1="344" x2="139" y2="344" stroke="#6E584D" strokeWidth="1" />
              <line x1="131" y1="347" x2="139" y2="347" stroke="#6E584D" strokeWidth="1" />
            </g>
          </g>

          {/* ==================== 3. OUTFIT / TORSO & SKIRT ==================== */}
          <g id="outfit-torso">
            {/* Blouse Underlayer (Neckline) */}
            <path
              d="M 104 140 L 120 152 L 136 140 L 130 170 L 110 170 Z"
              fill="#FFFFFF"
              stroke="#D2C4B8"
              strokeWidth="1"
            />
            {/* Blouse neat collar */}
            <polygon points="107,142 120,154 114,157 104,147" fill="#FFFFFF" stroke="#6E584D" strokeWidth="1.1" />
            <polygon points="133,142 120,154 126,157 136,147" fill="#FFFFFF" stroke="#6E584D" strokeWidth="1.1" />

            {/* Skirt / Bottom layer */}
            {outfit === 'blazer' && gender === 'boy' ? (
              /* Tailored Trousers for Boy */
              <path
                d="M 98 190 L 142 190 L 142 260 L 123 260 L 120 215 L 117 260 L 98 260 Z"
                fill="#4A4440"
                stroke="#2B2623"
                strokeWidth="1.2"
              />
            ) : (
              /* Pastel Plaid Pleated Skirt (Korean School/Cafe Style) */
              <g id="pleated-skirt">
                <path
                  d="M 102 188 L 138 188 L 148 234 C 148 238, 92 238, 92 234 Z"
                  fill={outfit === 'blouse' ? '#3B3838' : 'url(#skirtPlaid_' + uid + ')'}
                  stroke="#5A473E"
                  strokeWidth="1.2"
                />
                {/* Pleat Fold Shadows */}
                {[98, 106, 114, 122, 130, 138, 144].map((px, idx) => (
                  <line
                    key={idx}
                    x1={102 + idx * 5.8}
                    y1="190"
                    x2={93 + idx * 9}
                    y2="234"
                    stroke={outfit === 'blouse' ? '#252222' : 'rgba(100, 120, 160, 0.35)'}
                    strokeWidth="1.2"
                  />
                ))}
              </g>
            )}

            {/* Main Outer Layer: Cardigan / Blouse / Hoodie / Blazer */}
            {outfit === 'cardigan' && (
              /* Slouchy Oversized Pastel Knit Cardigan */
              <g id="cardigan-layer">
                {/* Body Cardigan */}
                <path
                  d="M 90 144 C 84 165, 84 200, 94 220 C 100 223, 140 223, 146 220 C 156 200, 156 165, 150 144 L 135 142 L 129 198 L 111 198 L 105 142 Z"
                  fill={`url(#cardiganGrad_${uid})`}
                  stroke="#5C456E"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                {/* Ribbed Cardigan Hem */}
                <path
                  d="M 94 218 Q 120 225 146 218 L 146 225 Q 120 232 94 225 Z"
                  fill="#B6A0D4"
                  stroke="#5C456E"
                  strokeWidth="1"
                />
                {/* Tortoiseshell buttons */}
                <circle cx="120" cy="178" r="2.2" fill="#5C456E" />
                <circle cx="120" cy="192" r="2.2" fill="#5C456E" />
                <circle cx="120" cy="206" r="2.2" fill="#5C456E" />
              </g>
            )}

            {outfit === 'blouse' && (
              /* Elegant Blouse with Black Ribbon Tie */
              <g id="blouse-layer">
                <path
                  d="M 94 144 C 92 165, 92 185, 98 192 L 142 192 C 148 185, 148 165, 146 144 Z"
                  fill="#FFFDF9"
                  stroke="#6E584D"
                  strokeWidth="1.2"
                />
                {/* Black Silk Ribbon Bow at collar */}
                <polygon points="120,154 113,150 114,160" fill="#252222" />
                <polygon points="120,154 127,150 126,160" fill="#252222" />
                <circle cx="120" cy="154" r="2.5" fill="#151212" />
                <path d="M 118 156 L 114 170 M 122 156 L 126 170" stroke="#252222" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            )}

            {outfit === 'pink_hoodie' && (
              /* Cozy Oversized Blush Pink Hoodie */
              <g id="hoodie-layer">
                <path
                  d="M 90 144 C 84 170, 84 200, 94 218 C 102 221, 138 221, 146 218 C 156 200, 156 170, 150 144 Z"
                  fill="#FFCAD4"
                  stroke="#7A4B56"
                  strokeWidth="1.3"
                />
                {/* Kangaroo Pocket */}
                <path
                  d="M 104 192 L 136 192 L 132 212 L 108 212 Z"
                  fill="#F4ACB7"
                  stroke="#7A4B56"
                  strokeWidth="1"
                />
                {/* Drawstrings */}
                <line x1="114" y1="148" x2="113" y2="175" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="126" y1="148" x2="127" y2="175" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {outfit === 'blazer' && (
              /* Academia Blazer */
              <g id="blazer-layer">
                <path
                  d="M 90 144 L 88 212 L 112 214 L 120 180 L 128 214 L 152 212 L 150 144 Z"
                  fill="#5A473E"
                  stroke="#382922"
                  strokeWidth="1.3"
                />
                {/* Lapels */}
                <polygon points="98,144 116,178 106,178 94,152" fill="#7F6357" stroke="#382922" strokeWidth="1" />
                <polygon points="142,144 124,178 134,178 146,152" fill="#7F6357" stroke="#382922" strokeWidth="1" />
              </g>
            )}

            {outfit === 'blue_knit' && (
              /* Soft Baby Blue Knitwear */
              <g id="blue-knit-layer">
                <path
                  d="M 90 144 C 86 170, 86 195, 96 215 C 102 218, 138 218, 144 215 C 154 195, 154 170, 150 144 Z"
                  fill="#B8C0FF"
                  stroke="#474F85"
                  strokeWidth="1.3"
                />
                {/* Cable knit pattern center ribs */}
                <line x1="116" y1="152" x2="116" y2="212" stroke="#A0AAFF" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="124" y1="152" x2="124" y2="212" stroke="#A0AAFF" strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}
          </g>

          {/* ==================== 4. ARMS & HANDS ==================== */}
          <g id="arms-and-accessories">
            {activity === 'idle' && (
              <>
                {/* Left Arm: Relaxed at side with purse strap */}
                <path
                  d="M 94 146 Q 78 175 80 205 Q 82 220 88 230"
                  stroke="#5C456E"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="89" cy="232" r="5" fill="#FFE5D9" stroke="#6E584D" strokeWidth="0.8" />

                {/* Right Arm: Holding Cute Iced Cup (like the reference image!) */}
                <path
                  d="M 146 146 Q 162 175 152 205 Q 146 220 138 226"
                  stroke="#5C456E"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="138" cy="226" r="5.5" fill="#FFE5D9" stroke="#6E584D" strokeWidth="0.8" />

                {/* Right Hand Mini Boba Drink Cup (Reference signature detail!) */}
                <g transform="translate(136, 205)">
                  {/* Cup Glass */}
                  <path d="M 0 0 L 3 22 C 3 24, 15 24, 15 22 L 18 0 Z" fill="#F8EFEA" stroke="#4A3525" strokeWidth="1" />
                  {/* Milk tea liquid */}
                  <path d="M 1 4 L 3 20 C 3 22, 15 22, 15 20 L 17 4 Z" fill="#E8C39E" />
                  {/* Boba pearls */}
                  <circle cx="6" cy="18" r="1.8" fill="#3D2619" />
                  <circle cx="10" cy="19" r="1.8" fill="#3D2619" />
                  <circle cx="13" cy="17" r="1.8" fill="#3D2619" />
                  {/* Dome lid & straw */}
                  <ellipse cx="9" cy="0" rx="9" ry="2" fill="#FFFFFF" stroke="#4A3525" strokeWidth="0.9" />
                  <line x1="9" y1="-6" x2="9" y2="4" stroke="#FF7A8F" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </>
            )}

            {activity === 'typing' && (
              <>
                {/* Arms posed reaching forward to laptop */}
                <path d="M 94 146 Q 88 180 105 195" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M 146 146 Q 152 180 135 195" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="105" cy="195" r="5" fill="#FFE5D9" />
                <circle cx="135" cy="195" r="5" fill="#FFE5D9" />
              </>
            )}

            {activity === 'reading' && (
              <>
                <path d="M 94 146 Q 96 182 110 188" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M 146 146 Q 144 182 130 188" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="110" cy="188" r="5" fill="#FFE5D9" />
                <circle cx="130" cy="188" r="5" fill="#FFE5D9" />
              </>
            )}

            {activity === 'sipping' && (
              <>
                <path d="M 94 146 Q 102 165 114 150" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M 146 146 Q 138 165 126 150" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="114" cy="150" r="5" fill="#FFE5D9" />
                <circle cx="126" cy="150" r="5" fill="#FFE5D9" />
              </>
            )}

            {activity === 'stretching' && (
              <>
                <path d="M 92 144 Q 72 105 76 80" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="76" cy="78" r="5.5" fill="#FFE5D9" />
                <path d="M 148 144 Q 168 105 164 80" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="164" cy="78" r="5.5" fill="#FFE5D9" />
              </>
            )}

            {activity === 'thinking' && (
              <>
                <path d="M 94 146 Q 80 180 86 215" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="86" cy="217" r="5" fill="#FFE5D9" />
                <path d="M 146 146 Q 155 160 142 132" stroke="#5C456E" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="140" cy="130" r="5" fill="#FFE5D9" />
              </>
            )}

            {/* Crossbody Leather Messenger Bag (from Reference Image!) */}
            <g id="crossbody-bag">
              {/* Strap across chest */}
              <path
                d="M 98 144 Q 115 178 135 212"
                stroke="#6B5347"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* White Leather Bag with Gold Clasp and Pom-pom Charm */}
              <g transform="translate(68, 204)">
                <rect x="0" y="0" width="28" height="24" rx="6" fill="#FFFDF8" stroke="#6B5347" strokeWidth="1.2" />
                <path d="M 0 6 C 6 14, 22 14, 28 6" fill="none" stroke="#6B5347" strokeWidth="1" />
                <circle cx="14" cy="11" r="2" fill="#D4AF37" />
                {/* Fluffy pink pom-pom charm */}
                <circle cx="28" cy="22" r="4.5" fill="#FFAFCC" />
                <circle cx="29" cy="20" r="1.5" fill="#FFF" />
              </g>
            </g>
          </g>

          {/* ==================== 5. HEAD & FACIAL FEATURES ==================== */}
          <g id="head-and-face">
            {/* Slender neck with chin shadow */}
            <rect x="113" y="128" width="14" height="18" rx="4" fill="#FFE2D4" />
            <path d="M 113 134 Q 120 138 127 134" stroke="#E6BEAE" strokeWidth="1.5" fill="none" />

            {/* Anime Head Base (Delicate tapered jawline, cute cheeks) */}
            <path
              d="M 72 82 C 68 115, 86 138, 120 138 C 154 138, 172 115, 168 82 C 168 50, 72 50, 72 82 Z"
              fill={`url(#skinGrad_${uid})`}
              stroke="#DDB0A0"
              strokeWidth="0.8"
            />

            {/* Soft Rosy Blushed Cheeks */}
            <ellipse cx="88" cy="112" rx="14" ry="8" fill={`url(#blushGrad_${uid})`} />
            <ellipse cx="152" cy="112" rx="14" ry="8" fill={`url(#blushGrad_${uid})`} />
            {/* Tiny blush sparkle highlights */}
            <circle cx="85" cy="111" r="1.2" fill="#FFFFFF" opacity="0.8" />
            <circle cx="155" cy="111" r="1.2" fill="#FFFFFF" opacity="0.8" />

            {/* Sweet Tiny Button Nose */}
            <circle cx="120" cy="107" r="1" fill="#DE9782" />

            {/* Charming Anime Mouth */}
            {expression === 'happy' ? (
              /* Open cheerful happy smile */
              <path
                d="M 115 116 Q 120 124 125 116 Z"
                fill="#FF758F"
                stroke="#6B3B32"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            ) : expression === 'thinking' ? (
              /* Small cute circle 'o' */
              <ellipse cx="120" cy="118" rx="2.2" ry="2.6" fill="#FF85A1" stroke="#6B3B32" strokeWidth="1" />
            ) : (
              /* Sweet natural curve smile with lip gloss sheen */
              <g>
                <path
                  d="M 115 117 Q 120 121 125 117"
                  stroke="#7A3D34"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="120" cy="118" r="0.8" fill="#FFCCD5" />
              </g>
            )}

            {/* Soft Eyebrows */}
            <path
              d={expression === 'thinking' ? 'M 90 84 Q 99 80 108 86' : 'M 92 86 Q 100 83 108 87'}
              stroke={darkHair}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 132 87 Q 140 83 148 86"
              stroke={darkHair}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* ==================== EYES (ANIME GLOSS AESTHETIC) ==================== */}
            <g className="anim-blink">
              {/* LEFT EYE */}
              {expression === 'happy' ? (
                /* Sweet curved eye-smile */
                <path
                  d="M 90 105 Q 100 95 110 105"
                  stroke="#2E1C13"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <g id="left-eye-gloss">
                  {/* Eye socket white */}
                  <ellipse cx="100" cy="103" rx="12" ry="14" fill="#FFFFFF" />

                  {/* Iris */}
                  <ellipse cx="100" cy="103" rx="10.5" ry="13.5" fill={`url(#irisGrad_${uid})`} />

                  {/* Lower Iris Crescent Glow */}
                  <path
                    d="M 92 106 C 94 116, 106 116, 108 106 C 104 112, 96 112, 92 106 Z"
                    fill={`url(#irisGlow_${uid})`}
                  />

                  {/* Pupil */}
                  <ellipse cx="100" cy="102" rx="4.5" ry="6" fill="#150C07" />

                  {/* Big glossy main highlight */}
                  <circle cx="96" cy="98" r="4.2" fill="#FFFFFF" />
                  {/* Secondary soft reflection */}
                  <circle cx="105" cy="107" r="2.2" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="96" cy="109" r="1.2" fill="#FFFFFF" opacity="0.7" />

                  {/* Upper Lash Line with winged flutter */}
                  <path
                    d="M 87 101 C 91 93, 108 92, 113 99"
                    stroke="#2E1C13"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Eyelash flick */}
                  <path d="M 111 98 L 115 95" stroke="#2E1C13" strokeWidth="2" strokeLinecap="round" />
                  {/* Delicate double eyelid line */}
                  <path d="M 91 92 Q 100 89 109 92" stroke="#B88A78" strokeWidth="1" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* RIGHT EYE */}
              {expression === 'happy' || expression === 'wink' ? (
                /* Winking curved lash line */
                <g id="right-eye-wink">
                  <path
                    d="M 130 105 Q 140 95 150 105"
                    stroke="#2E1C13"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M 148 103 L 153 100" stroke="#2E1C13" strokeWidth="2" strokeLinecap="round" />
                </g>
              ) : (
                <g id="right-eye-gloss">
                  {/* Eye socket white */}
                  <ellipse cx="140" cy="103" rx="12" ry="14" fill="#FFFFFF" />

                  {/* Iris */}
                  <ellipse cx="140" cy="103" rx="10.5" ry="13.5" fill={`url(#irisGrad_${uid})`} />

                  {/* Lower Iris Crescent Glow */}
                  <path
                    d="M 132 106 C 134 116, 146 116, 148 106 C 144 112, 136 112, 132 106 Z"
                    fill={`url(#irisGlow_${uid})`}
                  />

                  {/* Pupil */}
                  <ellipse cx="140" cy="102" rx="4.5" ry="6" fill="#150C07" />

                  {/* Big glossy main highlight */}
                  <circle cx="136" cy="98" r="4.2" fill="#FFFFFF" />
                  {/* Secondary soft reflection */}
                  <circle cx="145" cy="107" r="2.2" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="136" cy="109" r="1.2" fill="#FFFFFF" opacity="0.7" />

                  {/* Upper Lash Line with winged flutter */}
                  <path
                    d="M 127 99 C 132 92, 149 93, 153 101"
                    stroke="#2E1C13"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Eyelash flick */}
                  <path d="M 151 98 L 155 95" stroke="#2E1C13" strokeWidth="2" strokeLinecap="round" />
                  {/* Delicate double eyelid line */}
                  <path d="M 131 92 Q 140 89 149 92" stroke="#B88A78" strokeWidth="1" strokeLinecap="round" fill="none" />
                </g>
              )}
            </g>
          </g>

          {/* ==================== 6. FRONT HAIR & BANGS ==================== */}
          <g id="front-hair-layer" className="anim-hair">
            {/* Front Bangs (Airy Korean Curtain / See-Through Bangs) */}
            <path
              d="M 68 84 C 64 50, 90 34, 120 34 C 150 34, 176 50, 172 84
                 C 166 72, 156 68, 146 80
                 C 142 86, 134 76, 128 84
                 C 122 74, 116 75, 112 84
                 C 106 74, 98 76, 94 82
                 C 86 68, 74 72, 68 84 Z"
              fill={`url(#hairGrad_${uid})`}
              stroke="#322016"
              strokeWidth="1.2"
            />

            {/* Individual wispy bang strands */}
            <path d="M 112 84 Q 115 95 113 100" stroke="#322016" strokeWidth="1" fill="none" />
            <path d="M 127 84 Q 125 95 127 100" stroke="#322016" strokeWidth="1" fill="none" />

            {/* Face-Framing Curving Side Strands */}
            <path
              d="M 72 82 C 68 105, 74 135, 82 155 C 84 158, 86 150, 85 140 C 82 120, 80 98, 85 86 Z"
              fill={`url(#hairGrad_${uid})`}
              stroke="#322016"
              strokeWidth="1"
            />
            <path
              d="M 168 82 C 172 105, 166 135, 158 155 C 156 158, 154 150, 155 140 C 158 120, 160 98, 155 86 Z"
              fill={`url(#hairGrad_${uid})`}
              stroke="#322016"
              strokeWidth="1"
            />

            {/* Angel Ring Hair Sheen (Glossy highlights across crown) */}
            <path
              d="M 85 58 Q 120 50 155 58"
              stroke="url(#hairShine_${uid})"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>

          {/* ==================== 7. ACCESSORIES ==================== */}
          <g id="accessories-layer">
            {/* OVER-EAR HEADPHONES (Optional, resting stylishly around neck like reference image!) */}
            {accessory === 'headphones' && (
              <g id="headphones-neck">
                {/* Metallic padded headband around neck */}
                <path
                  d="M 84 136 C 80 156, 160 156, 156 136"
                  stroke="#E2E2EA"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 84 136 C 80 156, 160 156, 156 136"
                  stroke="#C0C0D0"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left Ear Cushion (Lavender/Pink/White) */}
                <ellipse cx="88" cy="136" rx="10" ry="15" fill="#FFFFFF" stroke="#8E7C9E" strokeWidth="1.5" />
                <ellipse cx="88" cy="136" rx="6" ry="10" fill="#E8DDF2" />
                {/* Right Ear Cushion */}
                <ellipse cx="152" cy="136" rx="10" ry="15" fill="#FFFFFF" stroke="#8E7C9E" strokeWidth="1.5" />
                <ellipse cx="152" cy="136" rx="6" ry="10" fill="#E8DDF2" />
              </g>
            )}

            {/* HAIR BOW RIBBON (Pink satin ribbon in hair) */}
            {accessory === 'bow' && (
              <g id="hair-bow" transform="translate(148, 62)">
                <polygon points="0,4 12,-4 10,12" fill="#FF85A1" stroke="#5E2A36" strokeWidth="1" />
                <polygon points="0,4 -12,-4 -10,12" fill="#FF85A1" stroke="#5E2A36" strokeWidth="1" />
                <circle cx="0" cy="4" r="3.5" fill="#FFE5EC" stroke="#5E2A36" strokeWidth="1" />
                <path d="M -3 7 L -7 18 M 3 7 L 7 18" stroke="#FF85A1" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* DAISY HAIR CLIP (Like reference card!) */}
            {accessory === 'hair_clip' && (
              <g id="daisy-clip" transform="translate(82, 70)">
                <line x1="-12" y1="4" x2="10" y2="4" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
                {/* White petals */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="0"
                    cy="0"
                    rx="2"
                    ry="5"
                    fill="#FFFFFF"
                    stroke="#D4AF37"
                    strokeWidth="0.6"
                    transform={`rotate(${deg}) translate(0, -4)`}
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#FFD166" />
              </g>
            )}

            {/* ROUND ROSE GOLD WIRE GLASSES */}
            {accessory === 'glasses' && (
              <g id="wire-glasses">
                {/* Left Lens Frame */}
                <circle cx="100" cy="103" r="14" fill="rgba(255,255,255,0.25)" stroke="#C47A70" strokeWidth="1.4" />
                {/* Right Lens Frame */}
                <circle cx="140" cy="103" r="14" fill="rgba(255,255,255,0.25)" stroke="#C47A70" strokeWidth="1.4" />
                {/* Bridge */}
                <path d="M 114 102 Q 120 99 126 102" stroke="#C47A70" strokeWidth="1.4" fill="none" />
                {/* Temples */}
                <line x1="86" y1="102" x2="78" y2="98" stroke="#C47A70" strokeWidth="1.2" />
                <line x1="154" y1="102" x2="162" y2="98" stroke="#C47A70" strokeWidth="1.2" />
              </g>
            )}

            {/* CHIC WOOL BERET */}
            {accessory === 'beret' && (
              <g id="beret-hat">
                <path
                  d="M 62 65 C 58 35, 120 20, 168 35 C 182 45, 178 70, 160 70 C 130 65, 90 65, 62 65 Z"
                  fill="#EAD9CE"
                  stroke="#5A473E"
                  strokeWidth="1.4"
                />
                <circle cx="118" cy="24" r="2.5" fill="#5A473E" />
              </g>
            )}

            {/* CAT EARS HEADBAND */}
            {accessory === 'cat_ears' && (
              <g id="cat-ears">
                <path d="M 78 52 Q 120 40 162 52" stroke="#3A2820" strokeWidth="1.5" fill="none" />
                {/* Left Ear */}
                <polygon points="76,50 82,24 96,44" fill="#FFCCD5" stroke="#3A2820" strokeWidth="1.2" strokeLinejoin="round" />
                <polygon points="80,47 84,28 92,43" fill="#FFF0F3" />
                {/* Right Ear */}
                <polygon points="164,50 158,24 144,44" fill="#FFCCD5" stroke="#3A2820" strokeWidth="1.2" strokeLinejoin="round" />
                <polygon points="160,47 156,28 148,43" fill="#FFF0F3" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
