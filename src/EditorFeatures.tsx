import React, { useState, useEffect, useRef } from 'react';

export default function EditorFeatures() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [totalDuration, setTotalDuration] = useState(18); // 18 seconds default
  const [isMuted, setIsMuted] = useState(false);
  
  // Active Submenu Tool
  const [activeBottomTool, setActiveBottomTool] = useState<string | null>(null);
  
  // Background Submenu Tool
  const [selectedBgTab, setSelectedBgTab] = useState<'Color' | 'Image' | 'Blur' | 'Brand'>('Color');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [blurLevel, setBlurLevel] = useState(0);

  // Aspect Ratio State
  const [aspectRatio, setAspectRation] = useState('9:16');

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

  // Time Formatter 00:00
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '20px' }}>
      
      {/* 1. TOP PLAYER CANVAS AREA WITH TWO-FINGER RESIZE INSTRUCTION */}
      <div style={{ position: 'relative', width: '100%', height: '320px', background: selectedColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #222431', overflow: 'hidden' }}>
        
        {/* Instruction Overlay */}
        <div style={{ position: 'absolute', top: '10px', fontSize: '11px', color: '#AAA', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '12px' }}>
          Use both fingers to resize your video
        </div>

        {/* Video Canvas Box */}
        <div style={{ width: aspectRatio === '9:16' ? '180px' : '280px', height: '220px', background: '#14151C', border: '1px solid #333648', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `blur(${blurLevel}px)` }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px' }}>🎮</div>
            <div style={{ fontSize: '10px', color: '#00F2FF', marginTop: '4px' }}>FreeFire_Montage.mp4</div>
          </div>
        </div>
      </div>

      {/* 2. PLAYBACK CONTROLLER & LIVE TIMECODE COUNTER BAR */}
      <div style={{ padding: '8px 16px', background: '#14151C', borderBottom: '1px solid #222431', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Fullscreen Button */}
        <button style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '16px', cursor: 'pointer' }}>🔲</button>

        {/* Play/Pause Center Button */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: '#222431', border: '1px solid #00F2FF', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Keyframe, Undo, Redo */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: '#00F2FF', fontSize: '12px', cursor: 'pointer' }}>◆⁺</span>
          <span style={{ color: '#AAA', fontSize: '14px', cursor: 'pointer' }}>↶</span>
          <span style={{ color: '#AAA', fontSize: '14px', cursor: 'pointer' }}>↷</span>
        </div>
      </div>

      {/* 3. CAPCUT LIVE SECONDS TIMECODE + RULER TRACK */}
      <div style={{ padding: '6px 16px', background: '#0D0E12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1A1C24' }}>
        {/* Exact CapCut Live Timecode */}
        <div style={{ fontSize: '11px', color: '#AAA', fontFamily: 'monospace' }}>
          <span style={{ color: '#FFF', fontWeight: 'bold' }}>{formatTime(currentTime)}</span> / {formatTime(totalDuration)}
        </div>

        {/* Time Ruler (00:00 • 00:02 • 00:04) */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '9px', color: '#555', fontFamily: 'monospace' }}>
          <span>00:00</span>
          <span>•</span>
          <span>00:02</span>
          <span>•</span>
          <span>00:04</span>
        </div>
      </div>

      {/* 4. 4-TRACK TIMELINE WORKSPACE WITH MUTE CLIP & COVER BUTTONS */}
      <div style={{ padding: '12px', background: '#101117', display: 'flex', gap: '10px' }}>
        
        {/* Left Vertical Options (Mute clip, Cover & Track Indicators) */}
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

        {/* Right Scrollable Timeline Tracks (4 Tracks) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowX: 'auto', background: '#14151C', padding: '8px', borderRadius: '8px', border: '1px solid #222431' }}>
          {/* Main Video Track */}
          <div style={{ height: '36px', background: '#222431', borderRadius: '6px', border: '1px solid #00F2FF', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '10px', color: '#FFF' }}>
            🎞️ Main_Video_Track.mp4
          </div>
          {/* Overlay Track */}
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #FF9500', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#FF9500' }}>
            🖼️ Overlay Layer 1
          </div>
          {/* Audio Track */}
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #00F2FF', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#00F2FF' }}>
            🎵 Background Phonk Audio
          </div>
          {/* Text Track */}
          <div style={{ height: '24px', background: '#1A1C24', borderRadius: '4px', border: '1px dashed #34C759', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '9px', color: '#34C759' }}>
            💬 Text Caption Subtitle
          </div>
        </div>
      </div>

      {/* 5. SUB-MENU DRAWERS FOR BACKGROUND & STICKERS */}
      {activeBottomTool === 'Background' && (
        <div style={{ background: '#14151C', borderTop: '1px solid #222431', padding: '12px 16px', animation: 'slideUp 0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#00F2FF' }}>🎨 Canvas Background Options</span>
            <button onClick={() => setActiveBottomTool(null)} style={{ background: 'none', border: 'none', color: '#AAA', fontSize: '12px', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Background Tools Tab Bar (Color, Image, Blur, Brand) */}
          <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #222431', paddingBottom: '8px', marginBottom: '12px' }}>
            {(['Color', 'Image', 'Blur', 'Brand'] as const).map((tab) => (
              <span 
                key={tab}
                onClick={() => setSelectedBgTab(tab)}
                style={{ fontSize: '12px', color: selectedBgTab === tab ? '#00F2FF' : '#888', fontWeight: selectedBgTab === tab ? 'bold' : 'normal', cursor: 'pointer' }}
              >
                {tab === 'Color' ? '🎨 Color' : tab === 'Image' ? '🖼️ Image' : tab === 'Blur' ? '💧 Blur' : '💳 Brand'}
              </span>
            ))}
          </div>

          {/* Colors Palette */}
          {selectedBgTab === 'Color' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {['#000000', '#1A1C24', '#7000FF', '#00F2FF', '#FF9500', '#FF4D4D'].map((c) => (
                <div 
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: selectedColor === c ? '2px solid #FFF' : '1px solid #444', cursor: 'pointer' }}
                />
              ))}
            </div>
          )}

          {/* Blur Selector */}
          {selectedBgTab === 'Blur' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {[0, 2, 5, 10].map((b) => (
                <button key={b} onClick={() => setBlurLevel(b)} style={{ background: '#222431', border: '1px solid #333', color: '#FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
                  {b === 0 ? 'None' : `Blur ${b}px`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. CAPCUT BOTTOM MAIN NAVIGATION TOOLBAR (Matching Images 1000171003 & 1000171004) */}
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
              if (t.name === 'Background') setActiveBottomTool('Background');
              else if (t.name === 'Aspect ratio') setAspectRation(aspectRatio === '9:16' ? '16:9' : '9:16');
              else alert(`${t.name} tool options opened!`);
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
