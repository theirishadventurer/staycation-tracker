export const consoleColor = (c) => {
  const map = {
    'NES':       { bg: '#dc2626', text: '#fef2f2' },
    'SNES':      { bg: '#7c3aed', text: '#f5f3ff' },
    'Genesis':   { bg: '#2563eb', text: '#eff6ff' },
    'Game Boy':  { bg: '#65a30d', text: '#f7fee7' },
    'N64':       { bg: '#ea580c', text: '#fff7ed' },
  };
  return map[c] || { bg: '#525252', text: '#fafafa' };
};

export const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
