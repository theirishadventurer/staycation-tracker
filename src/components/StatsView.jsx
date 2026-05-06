import { ChevronRight } from 'lucide-react';
import { consoleColor } from '../lib/utils.js';

export default function StatsView({
  itinerary, progress, completedCount, totalGames,
  completedMinutes, totalMinutes, onJumpTo,
}) {
  const rated = itinerary
    .map((g) => ({ ...g, ...progress[g.id] }))
    .filter((g) => g.rating > 0);

  const topRated = [...rated].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const consoleStats = {};
  for (const g of itinerary) {
    consoleStats[g.console] = consoleStats[g.console] || { total: 0, done: 0 };
    consoleStats[g.console].total += 1;
    if (progress[g.id]?.completed) consoleStats[g.console].done += 1;
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Cleared" value={`${completedCount}/${totalGames}`} accent="#a855f7" />
        <StatCard label="Minutes" value={`${completedMinutes}`} sub={`/${totalMinutes}`} accent="#ec4899" />
        <StatCard label="Rated"   value={`${rated.length}`} accent="#fbbf24" />
      </div>

      <div className="scan-card rounded-lg p-5">
        <div className="text-xs text-pink-400 uppercase tracking-widest mb-3">Console Breakdown</div>
        <div className="space-y-2">
          {Object.entries(consoleStats).map(([c, s]) => {
            const pct = (s.done / s.total) * 100;
            const cc = consoleColor(c);
            return (
              <div key={c}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: cc.bg }} className="font-bold">{c}</span>
                  <span className="text-purple-300/70 tabular-nums">{s.done}/{s.total}</span>
                </div>
                <div className="h-2 bg-purple-900/40 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: cc.bg }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {topRated.length > 0 && (
        <div className="scan-card rounded-lg p-5">
          <div className="text-xs text-yellow-400 uppercase tracking-widest mb-3">Top Rated So Far</div>
          <div className="space-y-2">
            {topRated.map((g) => (
              <button
                key={g.id}
                onClick={() => onJumpTo(g.id)}
                className="neon-btn w-full text-left flex items-center gap-3 p-2 rounded
                  bg-transparent hover:bg-purple-900/30"
              >
                <div className="text-yellow-400 text-sm tabular-nums">{'★'.repeat(g.rating)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-purple-100 truncate">{g.title}</div>
                  <div className="text-[10px] text-purple-400/60">{g.console} · {g.day}</div>
                </div>
                <ChevronRight size={14} className="text-purple-500/50" />
              </button>
            ))}
          </div>
        </div>
      )}

      <NotesWall progress={progress} itinerary={itinerary} onJumpTo={onJumpTo} />
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="scan-card rounded-lg p-4 text-center">
      <div className="pixel-font text-3xl glow-text" style={{ color: accent }}>
        {value}{sub && <span className="text-base text-purple-400/60">{sub}</span>}
      </div>
      <div className="text-[10px] text-purple-300/70 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

function NotesWall({ progress, itinerary, onJumpTo }) {
  const withNotes = itinerary
    .map((g) => ({ ...g, ...progress[g.id] }))
    .filter((g) => g.notes && g.notes.trim().length > 0);

  if (withNotes.length === 0) return null;

  return (
    <div className="scan-card rounded-lg p-5">
      <div className="text-xs text-pink-400 uppercase tracking-widest mb-3">Field Notes</div>
      <div className="space-y-3">
        {withNotes.map((g) => (
          <button
            key={g.id}
            onClick={() => onJumpTo(g.id)}
            className="neon-btn w-full text-left p-3 rounded border border-purple-900/50
              hover:border-purple-500/70 bg-black/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-purple-100 font-bold">{g.title}</span>
              <span className="text-[10px] text-purple-400/60">— {g.console}</span>
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">{g.notes}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
