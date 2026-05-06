import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Check, ChevronLeft, Clock, Lightbulb, Gamepad2, BookOpen, Save } from 'lucide-react';
import { consoleColor, formatTime } from '../lib/utils.js';

export default function GameDetail({
  game, entry, onToggleComplete, onUpdateNotes, onSetRating, onUpdateTime, onBack,
}) {
  const cc = consoleColor(game.console);
  const [localNotes, setLocalNotes] = useState(entry.notes || '');
  const [savedFlash, setSavedFlash] = useState(false);

  // Timer state — local so it's smooth, persisted to entry on pause/complete
  const [seconds, setSeconds] = useState(entry.time_played_sec || 0);
  const [running, setRunning] = useState(false);
  const targetSec = game.minutes * 60;

  useEffect(() => {
    setLocalNotes(entry.notes || '');
    setSeconds(entry.time_played_sec || 0);
    setRunning(false);
  }, [game.id]); // eslint-disable-line

  // Timer engine
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Persist time when stopping
  useEffect(() => {
    if (!running && seconds !== (entry.time_played_sec || 0)) {
      onUpdateTime(seconds);
    }
  }, [running]); // eslint-disable-line

  // Debounced notes save
  useEffect(() => {
    if (localNotes === (entry.notes || '')) return;
    const t = setTimeout(() => {
      onUpdateNotes(localNotes);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1200);
    }, 600);
    return () => clearTimeout(t);
  }, [localNotes]); // eslint-disable-line

  const timerOver = seconds >= targetSec;
  const timerProgress = Math.min(100, (seconds / targetSec) * 100);
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - timerProgress / 100);

  return (
    <div>
      <button
        onClick={onBack}
        className="neon-btn flex items-center gap-1 text-xs text-green-300 hover:text-green-100 mb-4 bg-transparent"
      >
        <ChevronLeft size={14} /> Back to schedule
      </button>

      {/* HERO */}
      <div className="scan-card rounded-lg p-5 mb-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="text-[10px] px-2 py-1 rounded font-bold tracking-wider"
            style={{ backgroundColor: cc.bg, color: cc.text }}
          >
            {game.console}
          </span>
          <span className="text-xs text-green-300/60">{game.time}</span>
          <span className="text-xs text-green-400/60">• {game.minutes}min</span>
        </div>
        <h2 className="pixel-font text-3xl text-green-50 mb-2 leading-tight">{game.title}</h2>
        <p className="text-sm text-green-200/70 italic">{game.vibe}</p>
      </div>

      {/* TIMER */}
      <div className="scan-card rounded-lg p-5 mb-5">
        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Clock size={12} /> Session Timer
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <svg width="160" height="160">
              <circle cx="80" cy="80" r={radius}
                stroke="rgba(34, 197, 94, 0.15)" strokeWidth="6" fill="none" />
              <circle
                className="timer-ring"
                cx="80" cy="80" r={radius}
                stroke={timerOver ? '#fbbf24' : '#4ade80'}
                strokeWidth="6" fill="none"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${timerOver ? '#fbbf24' : '#4ade80'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`pixel-font text-3xl ${timerOver ? 'text-amber-400 glow-text blink' : 'text-green-100'}`}>
                {formatTime(seconds)}
              </div>
              <div className="text-[10px] text-green-400/70 uppercase tracking-wider">
                {timerOver ? 'time up' : `target ${formatTime(targetSec)}`}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => setRunning((r) => !r)}
              className={`neon-btn flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded
                ${running ? 'bg-yellow-500 text-black' : 'bg-green-500 text-black'} pulse-glow`}
            >
              {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}
            </button>
            <button
              onClick={() => { setSeconds(0); setRunning(false); onUpdateTime(0); }}
              className="neon-btn flex items-center justify-center gap-2 px-5 py-3 rounded
                bg-transparent border border-green-700 text-green-300 hover:border-green-400"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* DID YOU KNOW */}
      <div className="scan-card rounded-lg p-5 mb-3 border-l-4" style={{ borderLeftColor: '#fbbf24' }}>
        <div className="text-xs text-yellow-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Lightbulb size={12} /> Did You Know
        </div>
        <p className="text-sm text-green-100/90 leading-relaxed">{game.fact}</p>
      </div>

      {/* PRO TIP */}
      <div className="scan-card rounded-lg p-5 mb-5 border-l-4" style={{ borderLeftColor: '#22c55e' }}>
        <div className="text-xs text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Gamepad2 size={12} /> Pro Tip
        </div>
        <p className="text-sm text-green-100/90 leading-relaxed">{game.tip}</p>
      </div>

      {/* NOTES + RATING */}
      <div className="scan-card rounded-lg p-5 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={12} /> Field Notes
          </div>
          {savedFlash && (
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <Save size={10} /> saved
            </span>
          )}
        </div>
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          placeholder="How did it feel? Anything you want to remember..."
          className="w-full h-28 text-sm resize-none"
        />

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-green-300/70 uppercase tracking-wider mr-1">Rating:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onSetRating(n === entry.rating ? 0 : n)}
              className="neon-btn text-2xl bg-transparent"
              style={{
                color: n <= (entry.rating || 0) ? '#fbbf24' : '#1f2937',
                filter: n <= (entry.rating || 0) ? 'drop-shadow(0 0 4px #fbbf24)' : 'none',
                padding: 0,
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onToggleComplete}
        className={`neon-btn w-full py-4 rounded text-base font-bold flex items-center justify-center gap-2
          ${entry.completed
            ? 'bg-green-500/20 border border-green-500 text-green-300'
            : 'bg-green-600 hover:bg-green-500 text-white'}`}
      >
        {entry.completed ? <><Check size={18} /> Completed — tap to undo</> : <>Mark Completed</>}
      </button>
    </div>
  );
}
