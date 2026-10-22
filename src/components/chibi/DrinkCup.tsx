import React from 'react';
import { OrderedDrink } from '../../types';

interface DrinkCupProps {
  drink: OrderedDrink;
  size?: number;
  showSteam?: boolean;
  className?: string;
}

export const DrinkCup: React.FC<DrinkCupProps> = ({
  drink,
  size = 64,
  showSteam = true,
  className = '',
}) => {
  const isHot = drink.temp === 'hot';
  const width = size;
  const height = size * 1.35;

  return (
    <div
      className={`drink-cup-wrapper ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        display: 'inline-block',
      }}
      title={`${drink.name} (${drink.temp}, ${drink.sweetness})`}
    >
      <svg
        viewBox="0 0 70 95"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`drinkGrad_${drink.drinkId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="25%" stopColor={drink.color} />
            <stop offset="100%" stopColor={drink.accentColor} />
          </linearGradient>

          {/* Glass reflection gradient */}
          <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#FFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Hot Drink Steam */}
        {isHot && showSteam && (
          <g className="anim-steam" opacity="0.75">
            <path
              d="M 28 22 Q 24 14 30 6 Q 34 0 30 -6"
              stroke="#FFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 40 20 Q 44 12 38 4 Q 34 -2 38 -8"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </g>
        )}

        {/* Shadow */}
        <ellipse cx="35" cy="90" rx="20" ry="4.5" fill="rgba(80, 50, 40, 0.16)" />

        {isHot ? (
          /* HOT CERAMIC MUG */
          <g id="hot-mug">
            {/* Mug Handle */}
            <path
              d="M 48 42 C 64 42, 64 68, 48 68"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 48 42 C 64 42, 64 68, 48 68"
              fill="none"
              stroke="#4A3525"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Mug Body */}
            <rect
              x="16"
              y="32"
              width="38"
              height="48"
              rx="9"
              fill="#FAF7F2"
              stroke="#4A3525"
              strokeWidth="2"
            />

            {/* Liquid Surface */}
            <ellipse
              cx="35"
              cy="36"
              rx="15"
              ry="5"
              fill={drink.color}
              stroke="#4A3525"
              strokeWidth="1.2"
            />

            {/* Cute Latte Art Heart */}
            <path
              d="M 35 37 C 32 34, 30 36, 33 39 L 35 41 L 37 39 C 40 36, 38 34, 35 37 Z"
              fill="#FFFFFF"
            />

            {/* Cute mug decorative icon */}
            <circle cx="35" cy="58" r="7" fill={drink.color} opacity="0.3" />
            <text
              x="35"
              y="61"
              fontSize="8"
              textAnchor="middle"
              fill="#4A3525"
              fontWeight="bold"
            >
              ☕
            </text>
          </g>
        ) : (
          /* ICED CAFE GLASS CUP WITH STRAW & CREAM */
          <g id="iced-cup">
            {/* Cute Striped Straw */}
            <line
              x1="38"
              y1="5"
              x2="48"
              y2="55"
              stroke="#FF758F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="38"
              y1="5"
              x2="48"
              y2="55"
              stroke="#FFF"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            {/* Glass Container */}
            <path
              d="M 18 28 L 22 84 C 22 88, 48 88, 48 84 L 52 28 Z"
              fill={`url(#drinkGrad_${drink.drinkId})`}
              stroke="#4A3525"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Whipped Cream Cloud on top */}
            <path
              d="M 16 30 C 16 22, 24 22, 28 24 C 32 18, 40 18, 44 24 C 48 22, 54 22, 54 30 Z"
              fill="#FFFFFF"
              stroke="#4A3525"
              strokeWidth="1.6"
            />

            {/* Floating Ice Cubes */}
            <rect
              x="26"
              y="42"
              width="9"
              height="9"
              rx="2.5"
              fill="rgba(255, 255, 255, 0.65)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1"
              transform="rotate(12 30 46)"
            />
            <rect
              x="37"
              y="52"
              width="8"
              height="8"
              rx="2.5"
              fill="rgba(255, 255, 255, 0.65)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1"
              transform="rotate(-15 41 56)"
            />

            {/* Glass Reflection Highlight */}
            <path
              d="M 21 34 L 24 82 L 29 82 L 26 34 Z"
              fill="url(#glassReflection)"
            />

            {/* Cup Sleeve */}
            <rect
              x="19"
              y="54"
              width="32"
              height="15"
              rx="3"
              fill="#F5EBE0"
              stroke="#4A3525"
              strokeWidth="1.4"
            />
            <text
              x="35"
              y="64"
              fontSize="6"
              textAnchor="middle"
              fill="#6F4E37"
              fontWeight="bold"
            >
              CAFE
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
