import React, { useState } from 'react';

export const AspectRatioSwitcher: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<string>('9:16');
  const [toast, setToast] = useState<string | null>(null);

  const ratios = [
    { id: '9:16', name: '📱 9:16 (Shorts & Reels)' },
    { id: '16:9', name: '📺 16:9 (YouTube Video)' },
    { id: '1:1', name: '🔲 1:1 (Instagram Post)' }
  ];

  const handleRatioChange = (ratioName: string) => {
    setToast(`📐 Canvas Ratio Switched to ${ratioName}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #34C759', borderRadius: '16px', padding: '16px', color: '#FFF' }}>
      {toast && <div style={{ background: '#34C759', color: '#000', padding: '8px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px', textAlign: 'center' }}>{toast}</div>}

      <h3 style={{ fontSize: '1rem', color: '#34C759', margin: '0 0 6px 0' }}>📐 One-Tap Aspect Ratio Switcher</h3>
      <p style={{ fontSize: '0.75rem', color: '#AAA', marginBottom: '12px' }}>Auto-reframe video for Shorts, Reels, or YouTube.</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        {ratios.map((r) => (
          <button 
            key={r.id} 
            onClick={() => { setSelectedRatio(r.id); handleRatioChange(r.id); }}
            style={{ flex: 1, padding: '10px 4px', borderRadius: '8px', background: selectedRatio === r.id ? '#34C759' : '#181824', color: selectedRatio === r.id ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.7rem', cursor: 'pointer' }}
          >
            {r.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSwitcher;
