import React, { useState } from 'react';

export const AIVoiceChanger: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>('monster');
  const [toast, setToast] = useState<string | null>(null);

  const voices = [
    { id: 'monster', name: '👹 Monster Bass (Aggressive)', badge: 'GAMER' },
    { id: 'cyberbot', name: '🤖 Cyberpunk Robot', badge: 'AI' },
    { id: 'caster', name: '🎙️ Esports Caster Pro', badge: 'VIP' },
    { id: 'deep_god', name: '⚡ Deep God Mode', badge: 'HOT' }
  ];

  const handleApplyVoice = (vName: string) => {
    setToast(`🎙️ AI Voice Changed to "${vName}"`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #7B2CBF', borderRadius: '16px', padding: '16px', color: '#FFF' }}>
      {toast && <div style={{ background: '#34C759', color: '#000', padding: '8px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px', textAlign: 'center' }}>{toast}</div>}

      <h3 style={{ fontSize: '1rem', color: '#7B2CBF', margin: '0 0 6px 0' }}>🎙️ AI Gamer Voice Changer</h3>
      <p style={{ fontSize: '0.75rem', color: '#AAA', marginBottom: '12px' }}>Modify commentary voice for gaming montages & shorts.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {voices.map((v) => (
          <div 
            key={v.id} 
            onClick={() => { setSelectedVoice(v.id); handleApplyVoice(v.name); }}
            style={{ background: selectedVoice === v.id ? 'rgba(123, 44, 191, 0.2)' : '#181824', border: selectedVoice === v.id ? '1px solid #7B2CBF' : '1px solid #222', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{v.name}</span>
            <span style={{ background: '#FF007F', color: '#FFF', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{v.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIVoiceChanger;
