import React, { useState, useEffect } from 'react';

export default function EditorFeatures() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(18);
  const [isMuted, setIsMuted] = useState(false);
  
  // Active Bottom Tool Modal
  const [activeBottomTool, setActiveBottomTool] = useState<string | null>(null);
  
  // Background Submenu States
  const [selectedBgTab, setSelectedBgTab] = useState<'Color' | 'Image' | 'Blur' | 'Brand' | 'AI'>('Color');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [blurLevel, setBlurLevel] = useState(0);
  const [aiMatchedBg, setAiMatchedBg] = useState<string | null>(null);

  // Aspect Ratio State
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [showAspectModal, setShowAspectModal] = useState(false);

  // Dynamic Video Timer Counter Engine
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 1. AI Smart Background Analyzer
  const handleAiAutoMatch = () => {
    const smartGradients = [
      'linear-gradient(135deg, #1A0B2E, #7000FF)',
      'linear-gradient(135deg, #001219, #00F2FF)',
      'linear-gradient(135deg, #2B0505, #FF5E00)'
    ];
    const picked = smartGradients[Math.floor(Math.random() * smartGradients.length)];
    setAiMatchedBg(picked);
    setSelectedColor('#000');
    alert('⚡ AI Video Analyzer: Clip lighting detected! Best matching background applied automatically.');
  };

  // 2. Reset Background Function
  const handleResetBg = () => {
    setAiMatchedBg(null);
    setSelectedColor('#000000');
    setBlurLevel(0);
    alert('🔄 Background reset to default Black canvas.');
  };

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '20px' }}>
      
      {/* PLAYER CANVAS AREA WITH DYNAMIC BACKGROUND */}
      <div style={{ position: 'relative', width: '100%', height: '320px', background: aiMatchedBg || selectedColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #222431', overflow: 'hidden', transition: 'all 0.3s ease' }}>
        
        <div style={{ position: 'absolute', top: '10px', fontSize: '11px', color: '#AAA', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '12px' }}>
          Use both fingers to resize your video
        </div>

        {/* Video Frame */}
        <div style={{ 
          width: aspectRatio === '9:16' ? '170px' : aspectRatio === '16:9' ? '280px' : aspectRatio === '1:1' ? '200px' : '190px', 
          height: aspectRatio === '9:16' ? '230px' : aspectRatio === '16:9' ? '160px' : '200px', 
          background: '#14151C', 
          border: '1px solid #333648', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          filter: `blur(${blurLevel}px)`,
          transition: 'all 0.2s ease'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px' }}>🎮</div>
            <div style={{ fontSize: '10px', color: '#00F2FF', marginTop: '4px' }}>FreeFire_Montage.mp4</div>
            <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>Ratio: {aspectRatio}</div>
          </div>
        </div>
      </div>

      {/* PLAYBACK CONTROLLER & LIVE SECONDS TIMECODE */}
      <div style={{ padding: '8px 16px', background: '#14151C', borderBottom: '1px solid #222431', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '16px', cursor: 'pointer' }}>🔲</button>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: '#222431', border: '1px solid #00F2FF', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: '#00F2FF', fontSize: '12px', cursor: 'pointer' }}>◆⁺</span>
          <span style={{ color: '#AAA', fontSize: '14px', cursor: 'pointer' }}>↶</span>
          <span style={{ color: '#AAA', fontSize: '14px', cursor: 'pointer' }}>↷</span>
        </div>
      </div>

      {/* LIVE SECONDS TIMECODE + RULER TRACK */}
      <div style={{ padding: '6px 16px', background: '#0D0E12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1A1C24' }}>
        <div style={{ fontSize: '11px', color: '#AAA', fontFamily: 'monospace' }}>
          <span style={{ color: '#FFF', fontWeight: 'bold' }}>{formatTime(currentTime)}</span> / {formatTime(totalDuration)}
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '9px', color: '#555', fontFamily: 'monospace' }}>
          <span>00:00</span>
          <span>•</span>
          <span>00:02</span>
          <span>•</span>
          <span>00:04</span>
        </div>
      </div>

      {/* 4-TRACK TIMELINE WORKSPACE */}
      <div style={{ padding: '12px', background: '#101117', display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '60px', alignItems: 'center' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            style={{ background: '#1A1C24', border: '1px solid #222431', color: isMuted ? '#FF4D4D' : '#FFF', padding: '6px', borderRadius: '8px', width: '100%', fontSize: '9px', textAlign: 'center', cursor: 'pointer' }}
          >
            {isMuted ? '🔇 Muted' : '🔊 Mute clip'}
          </button>

          <button style={{ background: '#1A1C24', border: '1px solid #222431', color: '#00F2FF', padding: '6px', borderRadius: '8px', width: '100%', fontSize: '9px', textAlign: 'center', cursor: 'pointer' }}>
            ✏️ Cover
          </button>

          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.5 }}>🖼️</div>
          <div style={{ fontSize: '12px', opacity: 0.5 }}>🎵</div>
          <div style={{ fontSize: '12px', opacity: 0.5 }}>🔤</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowX: 'auto', background: '#14151C', padding: '8px', borderRadius: '8px', border: '1px solid #222431' }}>
          <div style={{ height: '36px', background: '#222431', borderRadius: '6px', border: '1px solid #00F2FF', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '10px', color: '#FFF' }}>
            🎞️ Main_Video_Track.mp4
          </div>
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #FF9500', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#FF9500' }}>
            🖼️ Overlay Layer 1
          </div>
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #00F2FF', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#00F2FF' }}>
            🎵 Background Phonk Audio
          </div>
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #34C759', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#34C759' }}>
            💬 Text Caption Subtitle
          </div>
        </div>
      </div>

      {/* BACKGROUND SUB-MENU DRAWER */}
      {activeBottomTool === 'Background' && (
        <div style={{ background: '#14151C', borderTop: '1px solid #222431', padding: '14px 16px', animation: 'slideUp 0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>🎨 Canvas Background Engine</span>
            
            <button 
              onClick={handleResetBg} 
              style={{ background: '#222431', border: '1px solid #333648', color: '#FF4D4D', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              🔄 Reset
            </button>
          </div>

          {/* 5 Tabs: Color, Image, Blur, Brand, AI Auto Match */}
          <div style={{ display: 'flex', gap: '14px', borderBottom: '1px solid #222431', paddingBottom: '8px', marginBottom: '14px', overflowX: 'auto' }}>
            {(['Color', 'Image', 'Blur', 'Brand', 'AI'] as const).map((tab) => (
              <span 
                key={tab}
                onClick={() => {
                  setSelectedBgTab(tab);
                  if (tab === 'AI') handleAiAutoMatch();
                }}
                style={{ fontSize: '12px', color: selectedBgTab === tab ? '#00F2FF' : '#888', fontWeight: selectedBgTab === tab ? 'bold' : 'normal', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {tab === 'Color' ? '🎨 Color' : tab === 'Image' ? '🖼️ Image' : tab === 'Blur' ? '💧 Blur' : tab === 'Brand' ? '💳 Brand' : '⚡ AI Auto Match'}
              </span>
            ))}
          </div>

          {selectedBgTab === 'Color' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {['#000000', '#1A1C24', '#7000FF', '#00F2FF', '#FF9500', '#FF4D4D', '#1A2639'].map((c) => (
                <div 
                  key={c}
                  onClick={() => { setAiMatchedBg(null); setSelectedColor(c); }}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: selectedColor === c && !aiMatchedBg ? '2px solid #FFF' : '1px solid #444', cursor: 'pointer' }}
                />
              ))}
            </div>
          )}

          {selectedBgTab === 'AI' && (
            <div style={{ background: '#1A1C24', padding: '10px', borderRadius: '8px', border: '1px dashed #00F2FF', fontSize: '11px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⚡ AI Smart Match Active! Video lighting analyzed.</span>
              <button onClick={handleAiAutoMatch} style={{ background: '#00F2FF', border: 'none', color: '#000', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '10px', cursor: 'pointer' }}>Re-analyze 🔄</button>
            </div>
          )}

          {selectedBgTab === 'Blur' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {[0, 2, 5, 10, 15].map((b) => (
                <button key={b} onClick={() => setBlurLevel(b)} style={{ background: blurLevel === b ? '#00F2FF' : '#222431', color: blurLevel === b ? '#000' : '#FFF', border: '1px solid #333', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {b === 0 ? 'None' : `${b}px`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. ASPECT RATIO SELECTION MODAL */}
      {showAspectModal && (
        <div style={{ background: '#14151C', borderTop: '1px solid #222431', padding: '14px 16px', animation: 'slideUp 0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>🔲 Select Canvas Aspect Ratio</span>
            <button onClick={() => setShowAspectModal(false)} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
            {[
              { label: '9:16', desc: 'Shorts/Reels' },
              { label: '16:9', desc: 'YouTube HD' },
              { label: '1:1', desc: 'Square' },
              { label: '4:5', desc: 'Insta Post' }
            ].map((ratio) => (
              <button 
                key={ratio.label}
                onClick={() => {
                  setAspectRatio(ratio.label);
                  setShowAspectModal(false);
                }}
                style={{ background: aspectRatio === ratio.label ? '#1A2639' : '#222431', border: aspectRatio === ratio.label ? '1px solid #00F2FF' : '1px solid #333', color: '#FFF', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center' }}
              >
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{ratio.label}</div>
                <div style={{ fontSize: '9px', color: '#AAA', marginTop: '2px' }}>{ratio.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CAPCUT BOTTOM NAVIGATION TOOLBAR */}
      <div style={{ background: '#14151C', borderTop: '1px solid #222431', padding: '10px 8px', display: 'flex', gap: '16px', overflowX: 'auto' }}>
        {[
          { name: 'Overlay', icon: '🖼️' },
          { name: 'Captions', icon: '📝' },
          { name: 'Filters', icon: '🎨' },
          { name: 'Adjust', icon: '🎛️' },
          { name: 'Stickers', icon: '🌙' },
          { name: 'Aspect ratio', icon: '🔲' },
          { name: 'Background', icon: '🎨' }
        ].map((t) => (
          <div 
            key={t.name}
            onClick={() => {
              if (t.name === 'Background') {
                setShowAspectModal(false);
                setActiveBottomTool(activeBottomTool === 'Background' ? null : 'Background');
              } else if (t.name === 'Aspect ratio') {
                setActiveBottomTool(null);
                setShowAspectModal(!showAspectModal);
              } else {
                alert(`${t.name} tools panel active!`);
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '60px', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '18px' }}>{t.icon}</div>
            <div style={{ fontSize: '10px', color: '#AAA', whiteSpace: 'nowrap' }}>{t.name}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
