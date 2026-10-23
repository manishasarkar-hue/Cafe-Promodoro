import React from 'react';
import { Character3D } from '../avatar/Character3D';

interface CharacterViewer3DProps {
  height?: number | string;
  className?: string;
}

export const CharacterViewer3D: React.FC<CharacterViewer3DProps> = ({
  height = 520,
  className = '',
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
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
          background: 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 238, 234, 0.6) 80%, rgba(255, 225, 218, 0.7) 100%)',
          border: '2px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 20px 45px rgba(220, 160, 150, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)',
          touchAction: 'none',
        }}
      >
        {/* Soft Dreamy Floating Emoji Accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
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
            top: 40,
            right: 25,
            fontSize: '1.4rem',
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
            bottom: 60,
            left: 25,
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
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.22rem 0.75rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#8A5E52',
            border: '1px solid #FFE4DC',
            boxShadow: '0 2px 8px rgba(180, 120, 110, 0.06)',
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

        <Character3D
          height={height}
          pose="standing"
          lighting="cozy"
          showPedestal={true}
          showShadow={true}
          showSparkles={true}
          interactive={true}
          autoRotate={true}
          autoRotateSpeed={1.2}
          enableFloating={true}
          badgeText="Interactive 3D Avatar • model(1).glb"
        />
      </div>

      <div style={{ marginTop: '0.85rem' }}>
        <Character3D
          pose="standing"
          showControls={true}
          interactive={false}
          enableFloating={true}
          height={40}
          style={{ height: 'auto', background: 'transparent' }}
        />
      </div>
    </div>
  );
};

export default CharacterViewer3D;
