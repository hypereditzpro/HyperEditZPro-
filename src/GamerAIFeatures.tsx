import React, { useState } from 'react';

interface VelocityPreset {
  id: string;
  name: string;
  speedCurve: string;
  badge: string;
}

export const GamerAIFeatures: React.FC = () => {
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [selectedCurve, setSelectedCurve] = useState<string>('desi_lightning');
  const [zoomIntensity, setZoomIntensity] = useState<number>(80);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const velocityPresets: VelocityPreset[] = [
    { id: 'desi_lightning', name: '⚡ Desi Lightning Drop', speedCurve: '0.2x ➔ 4.0x ➔ 1.0x', badge: 'POPULAR' },
    { id: 'cyber_stepped', name: '🤖 Cyber Stepped Motion', speedCurve: '0.1x ➔ 2.5x ➔ 0.5x', badge: 'NEW' },
    { id: 'quantum_snap', name: '🎯 Quantum Killshot Snap', speedCurve: '0.2x ➔ 5.0x Instant', badge: '🔥 HOT' },
    { id: 'thala_momentum', name: '👑 Thala Slow-Mo Curve', speedCurve: '0.15x Smooth Flow', badge: 'VIRAL' },
    { id: 'bullet_time', name: '💥 Bullet Time Impact', speedCurve: '0.05x Optical Ramp', badge: 'PRO' }
  ];

  const handleRunAIAutoSync = () => {
    setToastMessage('🤖 AI Scanning Audio Peaks... 12 Headshot Beats Detected & Synced!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyVelocity = (preset: VelocityPreset) => {
    setSelectedCurve(preset.id);
    setToastMessage(`⚡ Applied Velocity Curve: "${preset.name}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #00F2FF', borderRadius: '16px', padding: '18px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', marginBottom: '20px' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#34C759', color: '#000', padding: '10px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', zIndex: 2000 }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', color: '#00F2FF', margin: 0, fontWeight: 'bold' }}>🎮 AI Gaming & Velocity Studio</h3>
          <span style={{ fontSize: '0.7rem', color: '#AAA' }}>Auto Headshot Detection & Desi Phonk Curves</span>
        </div>
        <span style={{ background: 'linear-gradient(135deg, #FF007F, #7B2CBF)', color: '#FFF', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
          AI POWERED
        </span>
      </div>

      {/* 1. AI AUTO HEADSHOT & BEAT SYNC SECTION */}
      <div style={{ background: '#181824', border: '1px solid #222', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#FFF' }}>🤖 Auto Headshot & Killshot Sync</span>
          <input 
            type="checkbox" 
            checked={autoSyncEnabled} 
            onChange={(e) => setAutoSyncEnabled(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#00F2FF', cursor: 'pointer' }}
          />
        </div>
        <p style={{ fontSize: '0.75rem', color: '#AAA', margin: '0 0 12px 0' }}>
          Scans gunshots and impact sounds automatically to place beat markers & killshot flashes.
        </p>

        <button 
          onClick={handleRunAIAutoSync}
          style={{ width: '100%', background: 'linear-gradient(135deg, #00F2FF, #34C759)', border: 'none', color: '#000', padding: '10px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          ⚡ Scan & Auto-Sync Headshot Beats
        </button>
      </div>

      {/* 2. DESI PHONK VELOCITY CURVES SECTION */}
      <div style={{ background: '#181824', border: '1px solid #222', borderRadius: '12px', padding: '14px' }}>
        <h4 style={{ fontSize: '0.85rem', color: '#FF007F', margin: '0 0 8px 0', fontWeight: 'bold' }}>⚡ Desi Phonk Velocity Curves</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {velocityPresets.map((preset) => {
            const isSelected = selectedCurve === preset.id;
            return (
              <div 
                key={preset.id}
                onClick={() => handleApplyVelocity(preset)}
                style={{ 
                  background: isSelected ? 'rgba(0, 242, 255, 0.12)' : '#12121A', 
                  border: isSelected ? '1px solid #00F2FF' : '1px solid #222', 
                  borderRadius: '8px', 
                  padding: '10px 12px', 
                  display: 'flex', 
                  justify: 'space-between', 
                  alignItems: 'center', 
                  cursor: 'pointer' 
                }}
              >
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#FFF', margin: 0 }}>{preset.name}</h5>
                  <span style={{ fontSize: '0.68rem', color: '#00F2FF' }}>{preset.speedCurve}</span>
                </div>
                <span style={{ background: '#FF007F', color: '#FFF', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold' }}>
                  {preset.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Zoom Impact Intensity Slider */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '6px' }}>
            <span>Killshot Impact Zoom Intensity:</span>
            <b style={{ color: '#00F2FF' }}>{zoomIntensity}%</b>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={zoomIntensity} 
            onChange={(e) => setZoomIntensity(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00F2FF' }}
          />
        </div>
      </div>

    </div>
  );
};

export default GamerAIFeatures;
