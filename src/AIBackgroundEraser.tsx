import React, { useState } from 'react';

export const AIBackgroundEraser: React.FC = () => {
  const [bgType, setBgType] = useState<string>('transparent');
  const [toast, setToast] = useState<string | null>(null);

  const handleErase = () => {
    setToast('✨ AI Background Erased Successfully! Applied to Timeline.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #00F2FF', borderRadius: '16px', padding: '16px', color: '#FFF' }}>
      {toast && <div style={{ background: '#34C759', color: '#000', padding: '8px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px', textAlign: 'center' }}>{toast}</div>}
      
      <h3 style={{ fontSize: '1rem', color: '#00F2FF', margin: '0 0 6px 0' }}>🖼️ AI Background Eraser (No Chroma Needed)</h3>
      <p style={{ fontSize: '0.75rem', color: '#AAA', marginBottom: '12px' }}>Instantly cut out gameplay or selfie overlays.</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={() => setBgType('transparent')} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: bgType === 'transparent' ? '#00F2FF' : '#1A1A26', color: bgType === 'transparent' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.75rem' }}>Transparent</button>
        <button onClick={() => setBgType('blur')} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: bgType === 'blur' ? '#00F2FF' : '#1A1A26', color: bgType === 'blur' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.75rem' }}>AI Blur</button>
        <button onClick={() => setBgType('custom')} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: bgType === 'custom' ? '#00F2FF' : '#1A1A26', color: bgType === 'custom' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.75rem' }}>Custom Meme</button>
      </div>

      <button onClick={handleErase} style={{ width: '100%', background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', padding: '10px', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}>
        ✂️ Erase Background Now
      </button>
    </div>
  );
};

export default AIBackgroundEraser;
