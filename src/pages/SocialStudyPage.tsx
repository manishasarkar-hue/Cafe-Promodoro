import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VIRTUAL_STUDENTS, ENCOURAGEMENT_MESSAGES } from '../data/students';
import { CAFES } from '../data/cafes';
import { VirtualStudent } from '../types';
import { ChibiCharacter } from '../components/chibi/ChibiCharacter';
import { Character3D } from '../components/avatar/Character3D';
import { DrinkCup } from '../components/chibi/DrinkCup';
import {
  Users,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  Coffee,
  Volume2,
  Headphones,
  Send,
  Heart,
} from 'lucide-react';

export const SocialStudyPage: React.FC = () => {
  const {
    selectedCafeId,
    avatar,
    orderedDrink,
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setScreen,
    navigateWithCheck,
    isSoundPanelOpen,
    setIsSoundPanelOpen,
    activeTrackId,
    triggerEncouragement,
  } = useApp();

  const currentCafe = CAFES[selectedCafeId];

  // Room state
  const [roomCrowdMode, setRoomCrowdMode] = useState<'quiet' | 'busy'>('busy');
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);
  const [studentReaction, setStudentReaction] = useState<{ studentId: string; text: string } | null>(null);

  // Filter students based on crowd mode
  const visibleStudents = roomCrowdMode === 'quiet'
    ? VIRTUAL_STUDENTS.slice(0, 4)
    : VIRTUAL_STUDENTS;

  // Format time mm:ss
  const minutes = Math.floor(timer.remainingSeconds / 60);
  const seconds = timer.remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSendEncouragement = (msg: string) => {
    triggerEncouragement(msg);

    // Pick a random virtual student to respond sweetly
    const randomStudent = visibleStudents[Math.floor(Math.random() * visibleStudents.length)];
    const responses = [
      'Thanks! Studying hard with you! 🌸',
      'You too! Let’s crush this cycle! ✨',
      'Cheers! *sips coffee* ☕',
      'Taking a deep breath together! 🌿',
    ];
    const reply = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
      setStudentReaction({ studentId: randomStudent.id, text: reply });
      setTimeout(() => setStudentReaction(null), 3500);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        padding: '1.5rem 1.25rem 4rem',
        background: 'linear-gradient(135deg, #FCF9F2 0%, #F5EFEB 100%)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => navigateWithCheck('personal_study')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#4A3525',
                fontSize: '0.88rem',
                fontWeight: 700,
                background: '#FFFFFF',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--c-cream-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <ArrowLeft size={16} />
              <span>Personal Study Spot</span>
            </button>

            <button
              onClick={() => navigateWithCheck('overview')}
              style={{
                fontSize: '0.82rem',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                background: '#FFFFFF',
                color: '#6F5E53',
                fontWeight: 600,
                border: '1.5px solid var(--c-cream-border)',
              }}
            >
              Café Map
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Crowd Population Toggle */}
            <div
              style={{
                display: 'flex',
                background: '#FAF7F2',
                borderRadius: 'var(--radius-pill)',
                padding: '0.2rem',
                border: '1px solid var(--c-cream-border)',
              }}
            >
              <button
                onClick={() => setRoomCrowdMode('quiet')}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: roomCrowdMode === 'quiet' ? 700 : 500,
                  background: roomCrowdMode === 'quiet' ? '#FFFFFF' : 'transparent',
                  color: roomCrowdMode === 'quiet' ? 'var(--c-strawberry-dark)' : '#6F5E53',
                  boxShadow: roomCrowdMode === 'quiet' ? 'var(--shadow-soft)' : 'none',
                }}
              >
                Quiet Room (4)
              </button>
              <button
                onClick={() => setRoomCrowdMode('busy')}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: roomCrowdMode === 'busy' ? 700 : 500,
                  background: roomCrowdMode === 'busy' ? '#FFFFFF' : 'transparent',
                  color: roomCrowdMode === 'busy' ? 'var(--c-strawberry-dark)' : '#6F5E53',
                  boxShadow: roomCrowdMode === 'busy' ? 'var(--shadow-soft)' : 'none',
                }}
              >
                Lively Room (8)
              </button>
            </div>

            {/* Sound Studio Trigger */}
            <button
              onClick={() => setIsSoundPanelOpen(!isSoundPanelOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                background: '#FFFFFF',
                border: '1.5px solid var(--c-cream-border)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#4A3525',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <Headphones size={15} color="var(--c-lavender-main)" />
              <span>{activeTrackId ? 'Ambience Playing' : 'Ambient Audio'}</span>
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#EDE8F5',
                  color: 'var(--c-lavender-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={16} />
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#3A2820',
                }}
              >
                Social Study Community
              </h1>
              <span
                style={{
                  fontFamily: 'var(--font-cute)',
                  fontSize: '1.15rem',
                  color: 'var(--c-lavender-main)',
                  fontWeight: 700,
                }}
              >
                온라인 스터디룸
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#6B584C' }}>
              Study peacefully in the presence of simulated virtual peers without performance anxiety.
            </p>
          </div>

          {/* Compact Synchronized Timer Controller */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--c-cream-border)',
              padding: '0.45rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700, color: '#8C7A6B' }}>
                {timer.phase === 'focus' ? 'Focus Session' : 'Break Time'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: timer.phase === 'focus' ? 'var(--c-strawberry-dark)' : '#2D6A4F',
                  lineHeight: 1,
                }}
              >
                {timeFormatted}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {timer.isRunning ? (
                <button
                  onClick={pauseTimer}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-pill)',
                    background: '#6F5E53',
                    color: '#FFF',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Pause size={14} fill="#FFF" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={timer.remainingSeconds < timer.totalSecondsForPhase ? resumeTimer : startTimer}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--c-strawberry-main)',
                    color: '#FFF',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Play size={14} fill="#FFF" />
                  <span>{timer.remainingSeconds < timer.totalSecondsForPhase ? 'Resume' : 'Start'}</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  background: '#F5EFEB',
                  color: '#6F5E53',
                }}
                title="Reset timer"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Table Selection Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {[0, 1, 2, 3].map((tIdx) => (
            <button
              key={tIdx}
              onClick={() => setSelectedTableIndex(tIdx)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: selectedTableIndex === tIdx ? '#4A3525' : '#FFFFFF',
                color: selectedTableIndex === tIdx ? '#FFFFFF' : '#6F5E53',
                border: '1.5px solid var(--c-cream-border)',
                boxShadow: selectedTableIndex === tIdx ? 'var(--shadow-soft)' : 'none',
              }}
            >
              Table #{tIdx + 1} {selectedTableIndex === tIdx ? '(Your Table)' : ''}
            </button>
          ))}
        </div>

        {/* Study Room Tables Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {[0, 1, 2, 3].map((tableIdx) => {
            const isUserTable = selectedTableIndex === tableIdx;
            const tableStudents = visibleStudents.filter((s: VirtualStudent) => s.tableIndex === tableIdx);

            return (
              <div
                key={tableIdx}
                onClick={() => setSelectedTableIndex(tableIdx)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: isUserTable ? '2.5px solid var(--c-strawberry-main)' : '2px solid var(--c-cream-border)',
                  boxShadow: isUserTable ? '0 8px 24px rgba(255, 117, 143, 0.2)' : 'var(--shadow-soft)',
                  padding: '1.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Table Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4A3525' }}>
                    Table #{tableIdx + 1}
                  </div>
                  {isUserTable && (
                    <span
                      style={{
                        background: 'var(--c-strawberry-soft)',
                        color: 'var(--c-strawberry-dark)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      You are seated here ✨
                    </span>
                  )}
                </div>

                {/* Table Students & User representation */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    minHeight: 180,
                    marginBottom: '1rem',
                  }}
                >
                  {/* Left Student or User if seated left */}
                  {isUserTable ? (
                    /* User sits on left side */
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                      <Character3D
                        width={130}
                        height={140}
                        pose="compact"
                        lighting="cozy"
                        showShadow={true}
                        enableFloating={true}
                        floatingSpeed={timer.isRunning ? 2.3 : 1.6}
                        floatingIntensity={0.03}
                        modelUrl={avatar.modelUrl}
                      />
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--c-strawberry-dark)', marginTop: '0.25rem' }}>
                        {avatar.name} (You)
                      </div>
                      {orderedDrink && (
                        <div style={{ position: 'absolute', right: -15, bottom: 10 }}>
                          <DrinkCup drink={orderedDrink} size={28} showSteam={false} />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Virtual Student Left */
                    tableStudents[0] ? (
                      <div style={{ textAlign: 'center', position: 'relative' }}>
                        {studentReaction && studentReaction.studentId === tableStudents[0].id && (
                          <div
                            style={{
                              position: 'absolute',
                              top: -24,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              background: '#FFF',
                              border: '1.5px solid var(--c-strawberry-main)',
                              borderRadius: 'var(--radius-pill)',
                              padding: '0.2rem 0.6rem',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              boxShadow: 'var(--shadow-soft)',
                              zIndex: 10,
                            }}
                          >
                            {studentReaction.text}
                          </div>
                        )}
                        <ChibiCharacter
                          avatar={tableStudents[0].avatarConfig}
                          size={105}
                          activity={tableStudents[0].activity}
                        />
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4A3525', marginTop: '0.25rem' }}>
                          {tableStudents[0].name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#8C7A6B' }}>
                          {tableStudents[0].activity}
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: '#C4B5A5', fontSize: '0.78rem' }}>Empty Chair</div>
                    )
                  )}

                  {/* Center Coffee Coaster & Table Centerpiece */}
                  <div
                    style={{
                      width: 50,
                      height: 25,
                      borderRadius: 12,
                      background: '#F0E6D8',
                      border: '1.5px solid #DDB892',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      marginBottom: 10,
                    }}
                  >
                    🪴
                  </div>

                  {/* Right Student */}
                  {tableStudents[1] ? (
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                      {studentReaction && studentReaction.studentId === tableStudents[1].id && (
                        <div
                          style={{
                            position: 'absolute',
                            top: -24,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#FFF',
                            border: '1.5px solid var(--c-strawberry-main)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            boxShadow: 'var(--shadow-soft)',
                            zIndex: 10,
                          }}
                        >
                          {studentReaction.text}
                        </div>
                      )}
                      <ChibiCharacter
                        avatar={tableStudents[1].avatarConfig}
                        size={105}
                        activity={tableStudents[1].activity}
                      />
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4A3525', marginTop: '0.25rem' }}>
                        {tableStudents[1].name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#8C7A6B' }}>
                        {tableStudents[1].activity}
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#C4B5A5', fontSize: '0.78rem' }}>Empty Chair</div>
                  )}
                </div>

                {/* Topics Studied at this table */}
                <div
                  style={{
                    background: '#FAF7F2',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.72rem',
                    color: '#6F5E53',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Studying at this desk:</div>
                  <div>
                    {isUserTable ? '• Your Focus Goal' : ''}
                    {tableStudents.map((s: VirtualStudent) => ` • ${s.studyTopic}`).join('')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement Presets Panel */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--c-cream-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Heart size={16} color="var(--c-strawberry-main)" fill="var(--c-strawberry-main)" />
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#4A3525' }}>
              Send Encouragement to the Room
            </span>
            <span style={{ fontSize: '0.78rem', color: '#8C7A6B' }}>
              (Spreads calm cheer to your fellow virtual students)
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {ENCOURAGEMENT_MESSAGES.map((msg: string) => (
              <button
                key={msg}
                onClick={() => handleSendEncouragement(msg)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.95rem',
                  borderRadius: 'var(--radius-pill)',
                  background: '#FAF7F2',
                  border: '1.5px solid var(--c-cream-border)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#4A3525',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.15s ease',
                }}
                className="cheer-btn"
              >
                <span>{msg}</span>
                <Send size={12} color="var(--c-strawberry-main)" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cheer-btn:hover {
          transform: translateY(-2px);
          background: #FFE3E8 !important;
          border-color: #FFB3C1 !important;
          color: var(--c-strawberry-dark) !important;
        }
      `}</style>
    </div>
  );
};
