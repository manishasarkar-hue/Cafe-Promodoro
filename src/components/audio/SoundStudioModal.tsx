import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AMBIENT_TRACKS } from '../../data/sounds';
import { SoundCategory } from '../../types';
import {
  Headphones,
  Volume2,
  VolumeX,
  X,
  Play,
  Square,
  Sparkles,
  CloudRain,
  Trees,
  Coffee,
  Flame,
  Music,
  Moon,
  Waves,
} from 'lucide-react';

const CATEGORY_ICONS: Record<SoundCategory, React.ReactNode> = {
  rain: <CloudRain size={16} />,
  nature: <Trees size={16} />,
  cafe: <Coffee size={16} />,
  cozy: <Flame size={16} />,
  piano: <Music size={16} />,
  night: <Moon size={16} />,
  water: <Waves size={16} />,
};

const PRESETS = [
  { name: 'Rainy Window', trackId: 'rain_window', icon: '🌧️', cafeId: 'blue-moon' },
  { name: 'Forest Morning', trackId: 'forest_birds', icon: '🍃', cafeId: 'matcha' },
  { name: 'Cozy Café', trackId: 'cafe_chatter', icon: '☕', cafeId: 'strawberry' },
  { name: 'Peaceful Focus', trackId: 'soft_piano', icon: '🎹', cafeId: 'mocha' },
  { name: 'Midnight Study', trackId: 'night_crickets', icon: '🌙', cafeId: 'blue-moon' },
];

export const SoundStudioModal: React.FC = () => {
  const {
    isSoundPanelOpen,
    setIsSoundPanelOpen,
    activeTrackId,
    playTrack,
    stopSound,
    soundVolume,
    setVolume,
    isMuted,
    toggleMute,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | 'all'>('all');

  if (!isSoundPanelOpen) return null;

  const filteredTracks = selectedCategory === 'all'
    ? AMBIENT_TRACKS
    : AMBIENT_TRACKS.filter((t) => t.category === selectedCategory);

  const activeTrack = AMBIENT_TRACKS.find((t) => t.id === activeTrackId);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        background: 'rgba(50, 35, 25, 0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={() => setIsSoundPanelOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: '#FFFDF9',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-float)',
          border: '2px solid var(--c-cream-border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.2rem 1.5rem',
            background: 'linear-gradient(135deg, #F3E8EE 0%, #FFF0F3 100%)',
            borderBottom: '1px solid var(--c-cream-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-strawberry-dark)',
              }}
            >
              <Headphones size={22} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#4A3525',
                }}
              >
                Ambient Sound Studio
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#8C7A6B' }}>
                Single-track soothing binaural soundscapes (Plays in quiet harmony)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSoundPanelOpen(false)}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--c-cream-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8C7A6B',
            }}
            aria-label="Close sound panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.2rem 1.5rem', overflowY: 'auto' }}>
          {/* Quick Curated Presets */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#8C7A6B',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Sparkles size={13} color="var(--c-strawberry-main)" />
              Calm Sound Presets
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {PRESETS.map((preset) => {
                const isSelected = activeTrackId === preset.trackId;
                return (
                  <button
                    key={preset.name}
                    onClick={() => {
                      if (isSelected) {
                        stopSound();
                      } else {
                        playTrack(preset.trackId);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      background: isSelected ? 'var(--c-strawberry-soft)' : '#F5EFEB',
                      color: isSelected ? 'var(--c-strawberry-dark)' : '#4A3525',
                      border: isSelected ? '1px solid var(--c-strawberry-main)' : '1px solid var(--c-cream-border)',
                      boxShadow: isSelected ? '0 2px 8px rgba(255, 117, 143, 0.25)' : 'none',
                    }}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.name}</span>
                    {isSelected && <span style={{ fontSize: '0.7rem' }}>● Playing</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div
            style={{
              display: 'flex',
              gap: '0.35rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            {(['all', 'rain', 'cafe', 'nature', 'cozy', 'piano', 'night', 'water'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat ? '#4A3525' : '#FAF7F2',
                  color: selectedCategory === cat ? '#FFFFFF' : '#6F5E53',
                  border: '1px solid var(--c-cream-border)',
                }}
              >
                {cat !== 'all' && CATEGORY_ICONS[cat as SoundCategory]}
                <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* Track List */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
            {filteredTracks.map((track) => {
              const isPlaying = activeTrackId === track.id;
              return (
                <div
                  key={track.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isPlaying ? '#FFF5F6' : '#FAF7F2',
                    border: isPlaying ? '1.5px solid var(--c-strawberry-main)' : '1px solid var(--c-cream-border)',
                    boxShadow: isPlaying ? '0 4px 12px rgba(255, 117, 143, 0.15)' : 'none',
                    transition: 'all var(--trans-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-sm)',
                        background: isPlaying ? 'var(--c-strawberry-soft)' : '#EEE7E0',
                        color: isPlaying ? 'var(--c-strawberry-dark)' : '#6F5E53',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {CATEGORY_ICONS[track.category]}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: isPlaying ? 'var(--c-strawberry-dark)' : '#3E2723',
                        }}
                      >
                        {track.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#8C7A6B' }}>
                        {track.description}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isPlaying) {
                        stopSound();
                      } else {
                        playTrack(track.id);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      background: isPlaying ? 'var(--c-strawberry-main)' : '#FFFFFF',
                      color: isPlaying ? '#FFFFFF' : '#4A3525',
                      border: isPlaying ? 'none' : '1px solid var(--c-cream-border)',
                      boxShadow: 'var(--shadow-soft)',
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <Square size={13} fill="#FFF" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play size={13} fill="#4A3525" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer: Volume & Active Track Master Bar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            background: '#F9F5EE',
            borderTop: '1px solid var(--c-cream-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Active Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: activeTrackId ? '#10B981' : '#9E8E7E',
                boxShadow: activeTrackId ? '0 0 8px #10B981' : 'none',
              }}
            />
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4A3525' }}>
              {activeTrack ? `Now Playing: ${activeTrack.title}` : 'No Ambient Sound Active'}
            </div>
          </div>

          {/* Volume Slider and Mute */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={toggleMute}
              style={{
                padding: '0.4rem',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid var(--c-cream-border)',
                color: '#4A3525',
              }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : soundVolume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: 120,
                accentColor: 'var(--c-strawberry-main)',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6F5E53', minWidth: 32 }}>
              {isMuted ? '0%' : `${Math.round(soundVolume * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
