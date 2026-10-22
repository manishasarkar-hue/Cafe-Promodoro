import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COLLECTIBLES } from '../data/collectibles';
import { CollectibleItem, SessionRecord } from '../types';
import confetti from 'canvas-confetti';
import {
  Award,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  Check,
  Lock,
  ArrowLeft,
  Calendar,
  History,
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { progress, unlockItem, equipItem, setScreen } = useApp();

  const [activeTab, setActiveTab] = useState<'shop' | 'history'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'accessory' | 'outfit' | 'desk_item' | 'special_cup'>('all');

  const filteredItems = selectedCategory === 'all'
    ? COLLECTIBLES
    : COLLECTIBLES.filter((item) => item.category === selectedCategory);

  const handleUnlock = (item: CollectibleItem) => {
    const success = unlockItem(item.id, item.costBeans);
    if (success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFB703', '#FB8500', '#FF758F'],
      });
      // Automatically equip newly unlocked item
      equipItem(item.category, item.id);
    } else {
      alert(`You need ${item.costBeans - progress.focusBeans} more Focus Beans to unlock this item! Keep studying to earn more.`);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Navigation Bar Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setScreen('overview')}
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
            <span>Back to Café</span>
          </button>

          <div
            style={{
              fontFamily: 'var(--font-cute)',
              fontSize: '1.1rem',
              color: 'var(--c-bean-dark)',
              fontWeight: 700,
            }}
          >
            Focus Sanctuary & Rewards
          </div>
        </div>

        {/* Dashboard Progress Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Focus Beans */}
          <div
            style={{
              background: '#FFFDF0',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #FDE68A',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
              }}
            >
              🫘
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 700, textTransform: 'uppercase' }}>
                Focus Beans
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#78350F' }}>
                {progress.focusBeans}
              </div>
            </div>
          </div>

          {/* Total Focus Minutes */}
          <div
            style={{
              background: '#FFF0F3',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #FFCCD5',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FFE3E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-strawberry-dark)',
              }}
            >
              <Clock size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-strawberry-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Focus
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#590D22' }}>
                {progress.totalFocusMinutes}m
              </div>
            </div>
          </div>

          {/* Sessions Completed */}
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #BBF7D0',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#166534',
              }}
            >
              <Award size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                Completed
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#14532D' }}>
                {progress.completedSessionsCount}
              </div>
            </div>
          </div>

          {/* Daily Streak */}
          <div
            style={{
              background: '#FFF7ED',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #FED7AA',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FFEDD5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C2410C',
              }}
            >
              <Flame size={26} fill="#EA580C" />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#9A3412', fontWeight: 700, textTransform: 'uppercase' }}>
                Streak
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#7C2D12' }}>
                {progress.dailyStreak} {progress.dailyStreak === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Buttons (Collectibles Shop vs Study History) */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.75rem',
            borderBottom: '2px solid var(--c-cream-border)',
            paddingBottom: '0.75rem',
          }}
        >
          <button
            onClick={() => setActiveTab('shop')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '0.95rem',
              background: activeTab === 'shop' ? 'var(--c-strawberry-main)' : 'transparent',
              color: activeTab === 'shop' ? '#FFFFFF' : '#6F5E53',
            }}
          >
            <ShoppingBag size={17} />
            <span>Collectibles Shop</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '0.95rem',
              background: activeTab === 'history' ? '#4A3525' : 'transparent',
              color: activeTab === 'history' ? '#FFFFFF' : '#6F5E53',
            }}
          >
            <History size={17} />
            <span>Session Logs ({progress.sessionHistory.length})</span>
          </button>
        </div>

        {/* TAB 1: Collectibles Shop */}
        {activeTab === 'shop' && (
          <div>
            {/* Category Filter Chips */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {(['all', 'accessory', 'outfit', 'desk_item', 'special_cup'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 0.95rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: selectedCategory === cat ? '#4A3525' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#6F5E53',
                    border: '1.5px solid var(--c-cream-border)',
                  }}
                >
                  {cat === 'all' && 'All Collectibles'}
                  {cat === 'accessory' && 'Hair & Glasses 👓'}
                  {cat === 'outfit' && 'Cozy Outfits 🧥'}
                  {cat === 'desk_item' && 'Desk Plushies 🧸'}
                  {cat === 'special_cup' && 'Artisan Cups 🍓'}
                </button>
              ))}
            </div>

            {/* Collectibles Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {filteredItems.map((item: CollectibleItem) => {
                const isUnlocked = progress.unlockedItemIds.includes(item.id);
                const isEquipped = progress.equippedItems[item.category] === item.id;
                const canAfford = progress.focusBeans >= item.costBeans;

                return (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      border: isEquipped
                        ? '2.5px solid var(--c-strawberry-main)'
                        : isUnlocked
                        ? '2px solid #52B788'
                        : '1.5px solid var(--c-cream-border)',
                      boxShadow: 'var(--shadow-soft)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    {/* Status Badge */}
                    <div style={{ position: 'absolute', top: 15, right: 15 }}>
                      {isEquipped ? (
                        <span
                          style={{
                            background: 'var(--c-strawberry-soft)',
                            color: 'var(--c-strawberry-dark)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-pill)',
                          }}
                        >
                          Equipped ✨
                        </span>
                      ) : isUnlocked ? (
                        <span
                          style={{
                            background: '#D8F3DC',
                            color: '#2D6A4F',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-pill)',
                          }}
                        >
                          Unlocked
                        </span>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            color: '#9E8E7E',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          <Lock size={13} />
                          <span>{item.costBeans} 🫘</span>
                        </div>
                      )}
                    </div>

                    {/* Icon Showcase */}
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 'var(--radius-md)',
                        background: '#FAF7F2',
                        border: '1.5px solid var(--c-cream-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Item Details */}
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#3A2820', marginBottom: '0.35rem' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#6B584C', lineHeight: 1.45, marginBottom: '1.25rem', flex: 1 }}>
                      {item.description}
                    </p>

                    {/* Action Button: Unlock or Equip/Unequip */}
                    {isUnlocked ? (
                      <button
                        onClick={() => equipItem(item.category, item.id)}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          background: isEquipped ? '#F5EFEB' : 'var(--c-strawberry-main)',
                          color: isEquipped ? '#4A3525' : '#FFFFFF',
                          border: isEquipped ? '1px solid var(--c-cream-border)' : 'none',
                        }}
                      >
                        {isEquipped ? 'Unequip' : 'Equip on Desk/Avatar'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnlock(item)}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          background: canAfford ? 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)' : '#EEE7E0',
                          color: canAfford ? '#FFFFFF' : '#9E8E7E',
                          border: 'none',
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <span>Unlock for {item.costBeans} Beans</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Study Session Logs */}
        {activeTab === 'history' && (
          <div>
            {progress.sessionHistory.length === 0 ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--c-cream-border)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>☕</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.4rem' }}>
                  No Completed Focus Sessions Yet
                </h3>
                <p style={{ color: '#8C7A6B', fontSize: '0.9rem', maxWidth: 420, margin: '0 auto 1.5rem' }}>
                  Complete a focus session with the Pomodoro timer to earn your first batch of Focus Beans!
                </p>
                <button
                  onClick={() => setScreen('personal_study')}
                  style={{
                    background: 'var(--c-strawberry-main)',
                    color: '#FFF',
                    padding: '0.75rem 1.75rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  Start Focusing Now
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {progress.sessionHistory.map((sess: SessionRecord) => (
                  <div
                    key={sess.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--c-cream-border)',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-soft)',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background: '#FFE3E8',
                          color: 'var(--c-strawberry-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                        }}
                      >
                        🌸
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#3A2820' }}>
                          {sess.durationMinutes} Minutes Focus Session
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#8C7A6B' }}>
                          {sess.dateStr} • {sess.cafeId.toUpperCase()} • {sess.mode === 'personal' ? 'Solo Spot' : 'Social Room'}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: '#FEF3C7',
                        border: '1px solid #FDE68A',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        color: '#92400E',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>+ {sess.beansAwarded} Focus Beans</span>
                      <span>🫘</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
