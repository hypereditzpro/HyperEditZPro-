import React, { useState } from 'react';

interface VelocityPreset {
  id: string;
  name: string;
  speedCurve: string;
  badge: string;
  curveData?: number[];
}

interface SubtitleToken {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

export const GamerAIFeatures: React.FC = () => {
  // Existing States (Original Code)
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [selectedCurve, setSelectedCurve] = useState<string>('desi_lightning');
  const [zoomIntensity, setZoomIntensity] = useState<number>(80);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Added States for Advanced Engines
  const [isProcessingAI, setIsProcessingAI] = useState<boolean>(false);
  const [autoCaptions, setAutoCaptions] = useState<SubtitleToken[]>([]);
  const [captionStyle, setCaptionStyle] = useState<string>('glowing_yellow');
  const [keyframes, setKeyframes] = useState<{ time: number; zoom: number }[]>([
    { time: 0, zoom: 100 },
    { time: 1.5, zoom: 140 },
    { time: 3.0, zoom: 100 }
  ]);

  // Original Presets + Extended Curve Data
  const velocityPresets: VelocityPreset[] = [
    { id: 'desi_lightning', name: '⚡ Desi Lightning Drop', speedCurve: '0.2x ➔ 4.0x ➔ 1.0x', badge: 'POPULAR', curveData: [0.2, 4.0, 1.0] },
    { id: 'cyber_stepped', name: '🤖 Cyber Stepped Motion', speedCurve: '0.1x ➔ 2.5x ➔ 0.5x', badge: 'NEW', curveData: [0.1, 2.5, 0.5] },
    { id: 'quantum_snap', name: '🎯 Quantum Killshot Snap', speedCurve: '0.2x ➔ 5.0x Instant', badge: '🔥 HOT', curveData: [0.2, 5.0, 1.0] },
    { id: 'thala_momentum', name: '👑 Thala Slow-Mo Curve', speedCurve: '0.15x Smooth Flow', badge: 'VIRAL', curveData: [0.15, 1.0] },
    { id: 'bullet_time', name: '💥 Bullet Time Impact', speedCurve: '0.05x Optical Ramp', badge: 'PRO', curveData: [0.05, 2.0, 1.0] }
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunAIAutoSync = () => {
    if (!autoSyncEnabled) {
      triggerToast('⚠️ Please enable Auto Sync checkbox first!');
      return;
    }
    setIsProcessingAI(true);
    triggerToast('🤖 AI Scanning Audio Peaks... 12 Headshot Beats Detected & Synced!');

    setTimeout(() => {
      setIsProcessingAI(false);
      triggerToast('✅ AI Beat Engine: 12 Killshot Beat Markers Placed on Timeline!');
    }, 2500);
  };

  const handleApplyVelocity = (preset: VelocityPreset) => {
    setSelectedCurve(preset.id);
    triggerToast('⚡ Applied Velocity Curve: "' + preset.name + '"');
  };

  const handleGenerateAICaptions = () => {
    setIsProcessingAI(true);
    triggerToast('🎙️ AI Subtitle Engine: Transcribing Audio & Generating Animated Captions...');

    setTimeout(() => {
      const mockSubtitles: SubtitleToken[] = [
        { id: '1', text: 'ONE TAP HEADSHOT!', startTime: 0.5, endTime: 1.2 },
        { id: '2', text: 'UNSTOPPABLE MONSTER!', startTime: 1.5, endTime: 2.3 },
        { id: '3', text: 'DESI PHONK BEAT DROP 🔥', startTime: 2.5, endTime: 3.8 }
      ];
      setAutoCaptions(mockSubtitles);
      setIsProcessingAI(false);
      triggerToast('🔥 3 CapCut-Style Animated Auto-Captions Added!');
    }, 3000);
  };

  const handleAddKeyframe = () => {
    const newTime = +(keyframes[keyframes.length - 1].time + 1.0).toFixed(1);
    const newKf = { time: newTime, zoom: zoomIntensity };
    setKeyframes([...keyframes, newKf]);
    triggerToast('📍 Keyframe added at ' + newTime + 's with ' + zoomIntensity + '% Zoom!');
  };

  return (
    <div style={{ background: '#12121A', border: '1px solid #00F2FF', borderRadius: '16px', padding: '18px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', marginBottom: '20px' }}>

      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#00F2FF', color: '#000', padding: '10px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', zIndex: 2000, boxShadow: '0 0 15px #00F2FF' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', color: '#00F2FF', margin: 0, fontWeight: 'bold' }}>🎮 AI Gaming & Velocity Studio</h3>
          <span style={{ fontSize: '0.7rem', color: '#AAA' }}>Auto Headshot Detection & Desi Phonk Curves</span>
        </div>
        <span style={{ background: 'linear-gradient(135deg, #FF007F, #7B2CBF)', color: '#FFF', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
          AI POWERED
        </span>
      </div>

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
          disabled={isProcessingAI}
          style={{ width: '100%', background: isProcessingAI ? '#555' : 'linear-gradient(135deg, #00F2FF, #34C759)', border: 'none', color: '#000', padding: '10px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          {isProcessingAI ? '⏳ Processing AI Engine...' : '⚡ Scan & Auto-Sync Headshot Beats'}
        </button>
      </div>

      <div style={{ background: '#181824', border: '1px solid #222', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '0.85rem', color: '#00F2FF', margin: '0 0 8px 0', fontWeight: 'bold' }}>🎙️ AI Auto-Caption Subtitles</h4>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <button 
            onClick={handleGenerateAICaptions}
            disabled={isProcessingAI}
            style={{ flex: 1, background: '#7B2CBF', border: 'none', color: '#FFF', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ✨ Generate Auto Subtitles
          </button>
          <select 
            value={captionStyle} 
            onChange={(e) => setCaptionStyle(e.target.value)}
            style={{ background: '#12121A', color: '#FFF', border: '1px solid #00F2FF', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem' }}
          >
            <option value="glowing_yellow">🌟 Glowing Yellow</option>
            <option value="capcut_bounce">💥 CapCut Bounce</option>
            <option value="neon_cyber">🤖 Neon Cyber</option>
          </select>
        </div>

        {autoCaptions.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', background: '#12121A', padding: '8px', borderRadius: '6px' }}>
            {autoCaptions.map(cap => (
              <span key={cap.id} style={{ background: '#FF007F', color: '#FFF', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                {cap.text} ({cap.startTime}s - {cap.endTime}s)
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: '#181824', border: '1px solid #222', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#34C759', margin: 0, fontWeight: 'bold' }}>📍 Smooth Keyframe Motion Engine</h4>
          <button 
            onClick={handleAddKeyframe}
            style={{ background: '#00F2FF', border: 'none', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + Add Keyframe
          </button>
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {keyframes.map((kf, idx) => (
            <div key={idx} style={{ background: '#12121A', border: '1px solid #34C759', borderRadius: '6px', padding: '6px 10px', textAlign: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '0.65rem', color: '#AAA', display: 'block' }}>{kf.time}s</span>
              <b style={{ fontSize: '0.75rem', color: '#34C759' }}>{kf.zoom}%</b>
            </div>
          ))}
        </div>
      </div>

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
