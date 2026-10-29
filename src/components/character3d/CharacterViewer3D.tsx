import React from 'react';
import { Character3D } from '../avatar/Character3D';

interface CharacterViewer3DProps {
  height?: number | string;
  className?: string;
}

export const CharacterViewer3D: React.FC<CharacterViewer3DProps> = ({
  height = 540,
  className = '',
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
      }}
      className={className}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '32px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 238, 234, 0.65) 75%, rgba(255, 225, 218, 0.75) 100%)',
          border: '2px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 20px 45px rgba(220, 160, 150, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)',
          touchAction: 'none',
        }}
      >
        {/* Soft Dreamy Floating Emoji Accents */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 20,
            fontSize: '1.3rem',
            animation: 'floatGentle 4s ease-in-out infinite',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          🌸
        </div>
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 22,
            fontSize: '1.35rem',
            animation: 'sparkleTwinkle 3s ease-in-out infinite',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 55,
            left: 22,
            fontSize: '1.2rem',
            opacity: 0.8,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          🍃
        </div>

        {/* Orbit Hint Pill */}
        <div
          style={{
            position: 'absolute',
            top: 52,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.2rem 0.65rem',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#8A5E52',
            border: '1px solid #FFE4DC',
            boxShadow: '0 2px 6px rgba(180, 120, 110, 0.05)',
            pointerEvents: 'none',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span>🖱️ Drag to rotate • Scroll to zoom</span>
        </div>

        {/* Single Main Character3D Canvas with built-in controls (ZERO duplicate renders) */}
        <Character3D
          height={height}
          pose="standing"
          lighting="cozy"
          showPedestal={true}
          showShadow={true}
          showSparkles={true}
          interactive={true}
          autoRotate={true}
          autoRotateSpeed={1.0}
          enableFloating={true}
          showControls={true}
          badgeText="Custom 3D Avatar • model(1).glb"
        />
      </div>
    </div>
  );
};

export default CharacterViewer3D;
