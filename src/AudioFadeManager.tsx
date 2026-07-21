import React, { useState } from 'react';

interface AudioFadeProps {
  onUpdateAudioSettings?: (settings: { volume: number; fadeIn: number; fadeOut: number }) => void;
}

export const AudioFadeManager: React.FC<AudioFadeProps> = ({ onUpdateAudioSettings }) => {
  const [volume, setVolume] = useState<number>(100);
  const [fadeIn, setFadeIn] = useState<number>(0);   // 0 to 10 seconds
  const [fadeOut, setFadeOut] = useState<number>(0); // 0 to 10 seconds

  const handleChange = (newVol: number, newFadeIn: number, newFadeOut: number) => {
    setVolume(newVol);
    setFadeIn(newFadeIn);
    setFadeOut(newFadeOut);
    if (onUpdateAudioSettings) {
      onUpdateAudioSettings({ volume: newVol, fadeIn: newFadeIn, fadeOut: newFadeOut });
    }
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #222', borderRadius: '16px', padding: '16px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1rem', color: '#00F2FF', margin: 0, fontWeight: 'bold' }}>Audio & Fade Studio</h3>
          <span style={{ fontSize: '0.7rem', color: '#AAA' }}>Boost volume & Smooth 0s-10s Fades</span>
        </div>
        <span style={{ background: '#1A1A26', color: '#34C759', border: '1px solid #34C759', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          PRO AUDIO
        </span>
      </div>

      {/* Volume Boost Slider (1000% Max) */}
      <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #222', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '6px' }}>
          <span>🔊 Volume Boost (1000% Max):</span>
          <b style={{ color: '#00F2FF' }}>{volume}%</b>
        </div>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          value={volume} 
          onChange={(e) => handleChange(Number(e.target.value), fadeIn, fadeOut)}
          style={{ width: '100%', accentColor: '#00F2FF' }}
        />
      </div>

      {/* Fade In Slider (0s to 10s) */}
      <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #222', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '6px' }}>
          <span>📈 Fade In (Gradual Start):</span>
          <b style={{ color: '#34C759' }}>{fadeIn.toFixed(1)}s</b>
        </div>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.5"
          value={fadeIn} 
          onChange={(e) => handleChange(volume, Number(e.target.value), fadeOut)}
          style={{ width: '100%', accentColor: '#34C759' }}
        />
      </div>

      {/* Fade Out Slider (0s to 10s) */}
      <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '6px' }}>
          <span>📉 Fade Out (Smooth Ending):</span>
          <b style={{ color: '#FF007F' }}>{fadeOut.toFixed(1)}s</b>
        </div>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.5"
          value={fadeOut} 
          onChange={(e) => handleChange(volume, fadeIn, Number(e.target.value))}
          style={{ width: '100%', accentColor: '#FF007F' }}
        />
      </div>

    </div>
  );
};

export default AudioFadeManager;
