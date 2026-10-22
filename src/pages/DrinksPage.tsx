import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAFES } from '../data/cafes';
import { DrinkItem, OrderedDrink } from '../types';
import { DrinkCup } from '../components/chibi/DrinkCup';
import { audioEngine } from '../utils/audioEngine';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Coffee,
  Check,
  Flame,
  Snowflake,
} from 'lucide-react';

export const DrinksPage: React.FC = () => {
  const { selectedCafeId, setOrderedDrink, setScreen } = useApp();

  const currentCafe = CAFES[selectedCafeId];
  const availableDrinks = currentCafe.drinks;

  const [selectedDrinkItem, setSelectedDrinkItem] = useState<DrinkItem>(availableDrinks[0]);
  const [selectedTemp, setSelectedTemp] = useState<'hot' | 'iced'>(
    selectedDrinkItem.type === 'iced' ? 'iced' : 'hot'
  );
  const [selectedSweetness, setSelectedSweetness] = useState<string>(
    selectedDrinkItem.sweetnessOptions[0] || '70% (Standard)'
  );
  const [selectedDairy, setSelectedDairy] = useState<string>(
    selectedDrinkItem.dairyOptions[0] || 'Oat Milk'
  );

  // Brewing animation state
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [brewingStep, setBrewingStep] = useState<string>('Grinding aromatic beans...');

  const handleSelectDrink = (drink: DrinkItem) => {
    setSelectedDrinkItem(drink);
    if (drink.type === 'iced') setSelectedTemp('iced');
    else if (drink.type === 'hot') setSelectedTemp('hot');
    setSelectedSweetness(drink.sweetnessOptions[0] || 'Standard');
    setSelectedDairy(drink.dairyOptions[0] || 'Oat Milk');
  };

  const handleConfirmOrder = () => {
    const ordered: OrderedDrink = {
      drinkId: selectedDrinkItem.id,
      name: selectedDrinkItem.name,
      temp: selectedTemp,
      sweetness: selectedSweetness,
      dairy: selectedDairy,
      color: selectedDrinkItem.color,
      accentColor: selectedDrinkItem.accentColor,
    };

    setOrderedDrink(ordered);
    setIsBrewing(true);

    // Brewing sequence steps
    setTimeout(() => {
      setBrewingStep(selectedTemp === 'hot' ? 'Steaming velvety milk...' : 'Pouring slow-chilled artisan brew over ice...');
    }, 1100);

    setTimeout(() => {
      setBrewingStep('Drizzling sweet cream cloud...');
    }, 2200);

    setTimeout(() => {
      audioEngine.playCelebrationChime();
      setIsBrewing(false);
      setScreen('overview');
    }, 3200);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {/* Navigation Bar Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setScreen('cafe')}
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
            <span>Back to Cafés</span>
          </button>

          <div
            style={{
              fontFamily: 'var(--font-cute)',
              fontSize: '1.1rem',
              color: 'var(--c-strawberry-dark)',
              fontWeight: 700,
            }}
          >
            Step 3 of 5: Handcrafted Drink
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: currentCafe.theme.primaryLight,
              color: currentCafe.theme.textPrimary,
              padding: '0.25rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            <Coffee size={14} color={currentCafe.theme.accent} />
            <span>{currentCafe.name} Seasonal Menu</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#3A2820',
            }}
          >
            Order Your Virtual Beverage
          </h1>
          <p style={{ color: '#8C7A6B', fontSize: '0.95rem' }}>
            Choose your signature drink, temperature, and sweetness level to enjoy at your desk.
          </p>
        </div>

        {/* Two-Column Drink Menu Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Illustrated Drinks Selection List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {availableDrinks.map((drink: DrinkItem) => {
              const isSelected = selectedDrinkItem.id === drink.id;

              return (
                <div
                  key={drink.id}
                  onClick={() => handleSelectDrink(drink)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.25rem',
                    background: isSelected ? '#FFFFFF' : '#FAF7F2',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected ? `2.5px solid ${currentCafe.theme.accent}` : '1.5px solid var(--c-cream-border)',
                    boxShadow: isSelected ? 'var(--shadow-medium)' : 'var(--shadow-soft)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <DrinkCup
                    drink={{
                      drinkId: drink.id,
                      name: drink.name,
                      temp: drink.type === 'iced' ? 'iced' : 'hot',
                      sweetness: 'Standard',
                      dairy: 'Oat Milk',
                      color: drink.color,
                      accentColor: drink.accentColor,
                    }}
                    size={62}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: '#3A2820',
                        }}
                      >
                        {drink.name}
                      </span>
                      {drink.koreanName && (
                        <span
                          style={{
                            fontFamily: 'var(--font-cute)',
                            fontSize: '0.95rem',
                            color: currentCafe.theme.accent,
                            fontWeight: 700,
                          }}
                        >
                          {drink.koreanName}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#6B584C', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                      {drink.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {drink.flavorNotes.map((note: string) => (
                        <span
                          key={note}
                          style={{
                            fontSize: '0.72rem',
                            background: '#F0EBE4',
                            color: '#6F5E53',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-pill)',
                            fontWeight: 600,
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: currentCafe.theme.accent,
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Customization & Live Cup Preview */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--c-cream-border)',
              boxShadow: 'var(--shadow-medium)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'sticky',
              top: 90,
            }}
          >
            {/* Live Cup Stage */}
            <div
              style={{
                background: currentCafe.theme.bgGradient,
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: `1.5px solid ${currentCafe.theme.border}`,
              }}
            >
              <DrinkCup
                drink={{
                  drinkId: selectedDrinkItem.id,
                  name: selectedDrinkItem.name,
                  temp: selectedTemp,
                  sweetness: selectedSweetness,
                  dairy: selectedDairy,
                  color: selectedDrinkItem.color,
                  accentColor: selectedDrinkItem.accentColor,
                }}
                size={85}
              />
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#4A3525',
                  marginTop: '0.85rem',
                  textAlign: 'center',
                }}
              >
                {selectedDrinkItem.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6F5E53', marginTop: '0.2rem' }}>
                {selectedTemp === 'hot' ? 'Warm Steamed Mug ☕' : 'Iced Cold Glass ❄️'} • {selectedSweetness}
              </div>
            </div>

            {/* Temperature Option */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.5rem' }}>
                Temperature
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  disabled={selectedDrinkItem.type === 'iced'}
                  onClick={() => setSelectedTemp('hot')}
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedTemp === 'hot' ? '2px solid #E07A5F' : '1px solid var(--c-cream-border)',
                    background: selectedTemp === 'hot' ? '#FDE8E1' : '#FAF7F2',
                    color: selectedTemp === 'hot' ? '#C84B31' : '#6F5E53',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    opacity: selectedDrinkItem.type === 'iced' ? 0.4 : 1,
                    cursor: selectedDrinkItem.type === 'iced' ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Flame size={15} />
                  <span>Hot Steamed</span>
                </button>

                <button
                  type="button"
                  disabled={selectedDrinkItem.type === 'hot'}
                  onClick={() => setSelectedTemp('iced')}
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedTemp === 'iced' ? '2px solid #3A86FF' : '1px solid var(--c-cream-border)',
                    background: selectedTemp === 'iced' ? '#EBF2FF' : '#FAF7F2',
                    color: selectedTemp === 'iced' ? '#00509D' : '#6F5E53',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    opacity: selectedDrinkItem.type === 'hot' ? 0.4 : 1,
                    cursor: selectedDrinkItem.type === 'hot' ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Snowflake size={15} />
                  <span>Iced Glass</span>
                </button>
              </div>
            </div>

            {/* Sweetness Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.5rem' }}>
                Sweetness Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
                {selectedDrinkItem.sweetnessOptions.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedSweetness(opt)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedSweetness === opt ? '2px solid var(--c-strawberry-main)' : '1px solid var(--c-cream-border)',
                      background: selectedSweetness === opt ? 'var(--c-strawberry-soft)' : '#FAF7F2',
                      fontSize: '0.8rem',
                      fontWeight: selectedSweetness === opt ? 700 : 500,
                      color: '#4A3525',
                      textAlign: 'left',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Milk / Dairy Choice */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4A3525', marginBottom: '0.5rem' }}>
                Milk & Base Option
              </label>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {selectedDrinkItem.dairyOptions.map((dairy: string) => (
                  <button
                    key={dairy}
                    onClick={() => setSelectedDairy(dairy)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      border: selectedDairy === dairy ? '2px solid #4A3525' : '1px solid var(--c-cream-border)',
                      background: selectedDairy === dairy ? '#F5EFEB' : '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: selectedDairy === dairy ? 700 : 500,
                      color: '#4A3525',
                    }}
                  >
                    {dairy}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Confirmation Button */}
            <button
              onClick={handleConfirmOrder}
              style={{
                marginTop: '0.5rem',
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
                boxShadow: '0 8px 24px rgba(255, 77, 109, 0.35)',
              }}
            >
              <span>Brew & Enter Café</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Brewing Modal Animation */}
      {isBrewing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(50, 35, 25, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-float)',
              border: '3px solid #FFCCD5',
              maxWidth: 380,
              width: '90%',
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFE3E8 0%, #FFCCD5 100%)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'brewSwirl 3s ease-in-out infinite',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>☕</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#4A3525',
                marginBottom: '0.5rem',
              }}
            >
              Handcrafting Drink...
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--c-strawberry-dark)', fontWeight: 600 }}>
              {brewingStep}
            </p>
            <div
              style={{
                marginTop: '1.5rem',
                height: 6,
                background: '#F0EBE4',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--c-strawberry-main)',
                  width: '100%',
                  animation: 'pulseGlow 1.5s infinite',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
