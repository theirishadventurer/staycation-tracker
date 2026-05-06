import { useEffect, useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function SettingsView({ onClearAll }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(t);
  }, [confirming]);

  const handleClick = () => {
    if (confirming) {
      onClearAll();
      setConfirming(false);
    } else {
      setConfirming(true);
    }
  };

  return (
    <div className="space-y-5">
      <div className="scan-card rounded-lg p-5">
        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <AlertTriangle size={12} /> Danger Zone
        </div>
        <p className="text-sm text-green-100/90 leading-relaxed mb-4">
          Wipe all progress — completion, notes, ratings, and timers — for every game.
          This can't be undone.
        </p>
        <button
          onClick={handleClick}
          className={`neon-btn w-full py-3 rounded text-sm font-bold flex items-center justify-center gap-2
            ${confirming
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-transparent border border-red-500/60 text-red-300 hover:border-red-400 hover:text-red-200'}`}
        >
          <Trash2 size={14} />
          {confirming ? 'Click again to confirm' : 'Clear all progress'}
        </button>
      </div>
    </div>
  );
}
