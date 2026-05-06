import { Check, ChevronRight, BookOpen } from 'lucide-react';
import { consoleColor } from '../lib/utils.js';

export default function ScheduleView({
  itinerary, progress, filterDay, setFilterDay, days, onOpenGame, onToggleComplete,
}) {
  const games = itinerary.filter((g) => g.day === filterDay);
  const blocks = [...new Set(games.map((g) => g.block))];

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setFilterDay(d)}
            className={`neon-btn flex-1 py-3 px-4 rounded text-sm
              ${filterDay === d
                ? 'bg-green-600 text-white border border-green-400'
                : 'bg-transparent border border-green-900 text-green-300 hover:border-green-500'}`}
          >
            {d}
          </button>
        ))}
      </div>

      {blocks.map((block) => (
        <section key={block} className="mb-7">
          <h2 className="pixel-font text-2xl text-cyan-400 mb-3 flex items-center gap-2">
            <span className="text-cyan-500">▸</span> {block}
          </h2>
          <div className="space-y-2">
            {games.filter((g) => g.block === block).map((g) => (
              <GameRow
                key={g.id}
                game={g}
                entry={progress[g.id] || {}}
                onOpen={() => onOpenGame(g.id)}
                onToggle={() => onToggleComplete(g.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function GameRow({ game, entry, onOpen, onToggle }) {
  const cc = consoleColor(game.console);

  return (
    <div
      onClick={onOpen}
      className={`scan-card cursor-pointer rounded-md p-3 ${entry.completed ? 'completed' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`neon-btn mt-0.5 w-6 h-6 rounded flex-shrink-0 flex items-center justify-center
            ${entry.completed
              ? 'bg-green-500 text-black'
              : 'border-2 border-green-700 hover:border-green-400'}`}
        >
          {entry.completed && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-green-400/80 tabular-nums">{game.time}</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide"
              style={{ backgroundColor: cc.bg, color: cc.text }}
            >
              {game.console}
            </span>
            {entry.notes && entry.notes.length > 0 && (
              <BookOpen size={11} className="text-yellow-400/70" />
            )}
          </div>
          <h3 className={`text-base ${entry.completed ? 'line-through' : ''} text-green-50 truncate`}>
            {game.title}
          </h3>
          <p className="text-xs text-green-300/60 mt-0.5 truncate">{game.vibe}</p>
        </div>

        <ChevronRight size={18} className="text-green-500/50 mt-1 flex-shrink-0" />
      </div>
    </div>
  );
}
