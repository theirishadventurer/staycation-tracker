import { useEffect, useMemo, useState } from 'react';
import { Gamepad2, Play, Trophy } from 'lucide-react';

import { ITINERARY, DAYS } from './data/itinerary.js';
import { useAuth } from './lib/useAuth.js';
import { createStorage, isCloudEnabled } from './lib/storage.js';

import ScheduleView from './components/ScheduleView.jsx';
import GameDetail from './components/GameDetail.jsx';
import StatsView from './components/StatsView.jsx';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState({});
  const [hydrated, setHydrated] = useState(false);

  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedId, setSelectedId] = useState(null);
  const [filterDay, setFilterDay] = useState(DAYS[0] || 'Thursday');

  const storage = useMemo(() => (user ? createStorage(user.id) : null), [user]);

  // ---- Initial load ----
  useEffect(() => {
    if (!storage) return;
    (async () => {
      const data = await storage.load();
      setProgress(data || {});
      setHydrated(true);
    })();
  }, [storage]);

  // ---- Mutations ----
  const updateGame = async (gameId, patch) => {
    if (!storage) return;
    setProgress((cur) => {
      const next = { ...cur, [gameId]: { ...(cur[gameId] || {}), ...patch } };
      // Fire and forget; storage handles its own errors
      storage.upsert(gameId, patch, cur);
      return next;
    });
  };

  const toggleComplete = (id) => {
    const cur = progress[id] || {};
    updateGame(id, { completed: !cur.completed });
  };
  const setNotes = (id, notes) => updateGame(id, { notes });
  const setRating = (id, rating) => updateGame(id, { rating });
  const setTime = (id, sec) => updateGame(id, { time_played_sec: sec });

  const openGame = (id) => {
    setSelectedId(id);
    setActiveTab('game');
  };

  const selectedGame = ITINERARY.find((g) => g.id === selectedId);

  // ---- Derived stats ----
  const totalGames = ITINERARY.length;
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const totalMinutes = ITINERARY.reduce((s, g) => s + g.minutes, 0);
  const completedMinutes = ITINERARY
    .filter((g) => progress[g.id]?.completed)
    .reduce((s, g) => s + g.minutes, 0);

  if (authLoading || !hydrated) {
    return (
      <div className="crt-root flex items-center justify-center min-h-screen">
        <div className="pixel-font text-purple-400 text-2xl glow-text blink">
          LOADING…
        </div>
      </div>
    );
  }

  return (
    <div className="crt-root">
      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-32 pt-6">

        {/* HEADER */}
        <header className="mb-6">
          <div className="flex items-baseline justify-between mb-1">
            <h1 className="pixel-font text-4xl text-purple-400 glow-text">
              STAYCATION<span className="text-red-500">.</span>EXE
            </h1>
            <span className="text-xs text-purple-300/70 hidden sm:inline">
              v1.0 {isCloudEnabled ? '☁' : '◌'}
            </span>
          </div>
          <p className="text-xs text-purple-300/60 tracking-widest uppercase">
            ▸ retro_gaming_tracker — {completedCount}/{totalGames} cleared
          </p>
          <div className="mt-3 h-1 bg-purple-900/40 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(completedCount / totalGames) * 100}%` }}
            />
          </div>
        </header>

        {/* TABS */}
        <nav className="flex gap-2 mb-6 border-b border-purple-900/40 pb-3">
          {[
            { id: 'schedule', label: 'Schedule', icon: Gamepad2 },
            { id: 'game',     label: 'Now Playing', icon: Play, disabled: !selectedId },
            { id: 'stats',    label: 'Stats', icon: Trophy },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => !t.disabled && setActiveTab(t.id)}
                disabled={t.disabled}
                className={`neon-btn flex items-center gap-2 px-3 py-2 text-xs rounded
                  ${active ? 'bg-purple-600 text-white' : 'text-purple-300/70 hover:text-purple-200 bg-transparent'}
                  ${t.disabled ? 'opacity-30' : ''}`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </nav>

        {activeTab === 'schedule' && (
          <ScheduleView
            itinerary={ITINERARY}
            progress={progress}
            filterDay={filterDay}
            setFilterDay={setFilterDay}
            days={DAYS}
            onOpenGame={openGame}
            onToggleComplete={toggleComplete}
          />
        )}

        {activeTab === 'game' && selectedGame && (
          <GameDetail
            game={selectedGame}
            entry={progress[selectedGame.id] || {}}
            onToggleComplete={() => toggleComplete(selectedGame.id)}
            onUpdateNotes={(n) => setNotes(selectedGame.id, n)}
            onSetRating={(r) => setRating(selectedGame.id, r)}
            onUpdateTime={(s) => setTime(selectedGame.id, s)}
            onBack={() => setActiveTab('schedule')}
          />
        )}

        {activeTab === 'stats' && (
          <StatsView
            itinerary={ITINERARY}
            progress={progress}
            completedCount={completedCount}
            totalGames={totalGames}
            completedMinutes={completedMinutes}
            totalMinutes={totalMinutes}
            onJumpTo={openGame}
          />
        )}
      </div>
    </div>
  );
}
