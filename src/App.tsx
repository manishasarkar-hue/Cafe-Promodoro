import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SoundStudioModal } from './components/audio/SoundStudioModal';
import { LandingPage } from './pages/LandingPage';
import { AvatarPage } from './pages/AvatarPage';
import { CafeSelectPage } from './pages/CafeSelectPage';
import { DrinksPage } from './pages/DrinksPage';
import { CafeOverviewPage } from './pages/CafeOverviewPage';
import { PersonalStudyPage } from './pages/PersonalStudyPage';
import { SocialStudyPage } from './pages/SocialStudyPage';
import { RewardsPage } from './pages/RewardsPage';

const MainContent: React.FC = () => {
  const { screen } = useApp();

  return (
    <main style={{ minHeight: 'calc(100vh - 120px)' }}>
      {screen === 'landing' && <LandingPage />}
      {screen === 'avatar' && <AvatarPage />}
      {screen === 'cafe' && <CafeSelectPage />}
      {screen === 'drinks' && <DrinksPage />}
      {screen === 'overview' && <CafeOverviewPage />}
      {screen === 'personal_study' && <PersonalStudyPage />}
      {screen === 'social_study' && <SocialStudyPage />}
      {screen === 'rewards' && <RewardsPage />}
      <SoundStudioModal />
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <MainContent />
        <footer
          style={{
            marginTop: 'auto',
            background: 'rgba(252, 249, 242, 0.95)',
            borderTop: '1px solid var(--c-cream-border)',
            padding: '1.25rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#8C7A6B',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>☕</span>
              <span style={{ fontWeight: 700, color: 'var(--c-strawberry-dark)' }}>Cafe Pomodoro</span>
              <span>• Your little corner of calm</span>
            </div>
            <div style={{ fontFamily: 'var(--font-cute)', fontSize: '0.95rem', color: '#6F5E53' }}>
              달콤하고 따뜻한 집중의 시간 ✨
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
