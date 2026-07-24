import React, { useState, useRef, useEffect } from 'react';


// 🎨 LEFT & RIGHT SPLIT-SLIDE ANIMATION & AUTO-CLOSE OVERLAY STYLE
const splitDrawerOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end'
};

export const EditorFeatures: React.FC = () => {
  const [activeBottomTool, setActiveBottomTool] = useState<string | null>('Edit');
  const [selectedTrack, setSelectedTrack] = useState<'main' | 'text' | 'audio' | 'overlay' | null>('main');
  const [aspectRatio, setAspectRatio] = useState<string>('9:16');
  
  // Playback & Timecode State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(2.15);
  const [totalDuration] = useState<number>(30.00);
  const [canvasScale, setCanvasScale] = useState<number>(100);
  const [showGraphDrawer, setShowGraphDrawer] = useState<boolean>(false);

  // VIP & Subscription State
  const [isVipUser, setIsVipUser] = useState<boolean>(false);
  const [showVipPaywall, setShowVipPaywall] = useState<boolean>(false);
  const [usedVipFeatures, setUsedVipFeatures] = useState<Array<string>>([]);

  // HSL Tool State
  const [selectedHslColor, setSelectedHslColor] = useState<string>('red');
  const [hslValues, setHslValues] = useState<{ [key: string]: { hue: number; sat: number; light: number } }>({
    red: { hue: 50, sat: 50, light: 50 },
    orange: { hue: 50, sat: 50, light: 50 },
    yellow: { hue: 50, sat: 50, light: 50 },
    green: { hue: 50, sat: 50, light: 50 },
    cyan: { hue: 50, sat: 50, light: 50 },
    blue: { hue: 50, sat: 50, light: 50 },
    purple: { hue: 50, sat: 50, light: 50 },
    magenta: { hue: 50, sat: 50, light: 50 }
  });

  // Export & Liquid Fill State
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [showAdBubble, setShowAdBubble] = useState<boolean>(false);
  const [adTimer, setAdTimer] = useState<number>(3);
  const [exportComplete, setExportComplete] = useState<boolean>(false);

  // Asset Categories & Selection States
  const [effectTab, setEffectTab] = useState<'Video' | 'Body'>('Video');
  const [selectedEffect, setSelectedEffect] = useState<string>('None');
  const [selectedFilter, setSelectedFilter] = useState<string>('None');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activePickerType = useRef<'main' | 'audio' | 'overlay'>('main');

  // Dynamic Tracks
  const [mainTracks, setMainTracks] = useState<Array<{ id: string; name: string }>>([
    { id: 'main_1', name: 'Main_Gameplay_1080p.mp4' }
  ]);
  const [overlays, setOverlays] = useState<Array<{ id: string; name: string }>>([
    { id: 'ov_1', name: 'Meme_Overlay_01.mp4' }
  ]);
  const [audioTracks, setAudioTracks] = useState<Array<{ id: string; name: string }>>([
    { id: 'aud_1', name: 'FreeFire_BGM.mp3' }
  ]);
  const [textTracks, setTextTracks] = useState<Array<{ id: string; name: string }>>([
    { id: 'txt_1', name: 'HEADSHOT 🔥' }
  ]);

  // Smooth Playback Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => (prev >= totalDuration ? 0 : Number((prev + 0.05).toFixed(2))));
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  // Dynamic Rainbow Liquid Export
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExporting && exportProgress < 100) {
      timer = setInterval(() => {
        setExportProgress((prev) => {
          const next = prev + 2;
          if (next >= 50 && next < 54 && !showAdBubble) {
            setShowAdBubble(true);
            setAdTimer(3);
          }
          if (next >= 100) {
            setExportComplete(true);
            setShowAdBubble(false);
            return 100;
          }
          return next;
        });
      }, 70);
    }
    return () => clearInterval(timer);
  }, [isExporting, exportProgress, showAdBubble]);

  // Ad Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAdBubble && adTimer > 0) {
      timer = setInterval(() => {
        setAdTimer((prev) => {
          if (prev <= 1) {
            setShowAdBubble(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAdBubble, adTimer]);

  const handleExportClick = () => {
    if (!isVipUser && usedVipFeatures.length > 0) {
      setShowVipPaywall(true);
    } else {
      startExportProcess();
    }
  };

  const startExportProcess = () => {
    setIsExporting(true);
    setExportProgress(0);
    setShowAdBubble(false);
    setExportComplete(false);
  };

  const closeExportModal = () => {
    setIsExporting(false);
    setExportProgress(0);
    setShowAdBubble(false);
    setExportComplete(false);
  };

  const formatTimecode = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const triggerPickerForTrack = (type: 'main' | 'audio' | 'overlay') => {
    activePickerType.current = type;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (activePickerType.current === 'overlay') {
        setOverlays([...overlays, { id: 'ov_' + Date.now(), name: file.name }]);
        alert("🖼️ Added " + file.name + " to Overlay Track!");
      } else if (activePickerType.current === 'audio') {
        setAudioTracks([...audioTracks, { id: 'aud_' + Date.now(), name: file.name }]);
        alert("🎵 Added " + file.name + " to Audio Track!");
      } else {
        setMainTracks([...mainTracks, { id: 'main_' + Date.now(), name: file.name }]);
        alert("🎬 Appended " + file.name + " to Main Video Track!");
      }
    }
  };

  const updateHslVal = (type: 'hue' | 'sat' | 'light', val: number) => {
    setHslValues({
      ...hslValues,
      [selectedHslColor]: { ...hslValues[selectedHslColor], [type]: val }
    });
    if (!usedVipFeatures.includes('HSL Color Grading')) {
      setUsedVipFeatures([...usedVipFeatures, 'HSL Color Grading']);
    }
  };

  const hslColorsList = [
    { name: 'red', hex: '#FF0033' },
    { name: 'orange', hex: '#FF8800' },
    { name: 'yellow', hex: '#FFCC00' },
    { name: 'green', hex: '#34C759' },
    { name: 'cyan', hex: '#00F2FF' },
    { name: 'blue', hex: '#0066FF' },
    { name: 'purple', hex: '#7209B7' },
    { name: 'magenta', hex: '#FF007F' }
  ];

  // REAL VIDEO EFFECTS
  const videoEffectsList = [
    { name: 'Diamond Zoom', icon: '💎' },
    { name: 'Scene Cut', icon: '🎬' },
    { name: 'Slash Reveal', icon: '⚡' },
    { name: 'Vignette Flash', icon: '🌌' },
    { name: 'Cross Fusion', icon: '💥' },
    { name: 'Flash Distortion', icon: '🌀' },
    { name: 'Dreamy Light', icon: '✨' },
    { name: 'Soul Returning', icon: '👻' },
    { name: 'Flash Mutation', icon: '🔮' },
    { name: 'Black Flash 2', icon: '🖤' },
    { name: 'Inverted Cuts', icon: '🔄' },
    { name: 'Love Butterfly', icon: '🦋' }
  ];

  // REAL BODY EFFECTS
  const bodyEffectsList = [
    { name: 'Lightning Eyes', icon: '👁️' },
    { name: 'Figure Glare', icon: '🌟' },
    { name: 'Glowing Lines', icon: '⚡' },
    { name: 'Stroke Aura', icon: '💫' },
    { name: 'Hallucination', icon: '🌀' },
    { name: 'Superpowers', icon: '🔥' },
    { name: 'Clone Shadow', icon: '👥' },
    { name: 'Body Glow', icon: '✨' }
  ];

  // REAL FILTERS LIST
  const filtersList = [
    { name: 'Clear II', icon: '🏞️' },
    { name: 'Pink Fuzz', icon: '🌸' },
    { name: 'Golden Night', icon: '🌙' },
    { name: 'HD Pet', icon: '🐱' },
    { name: 'Retro Print', icon: '📸' },
    { name: 'Glam Seoul', icon: '🌆' },
    { name: 'Vintage LUT', icon: '🎞️' }
  ];

  // CAPCUT STYLE SPLIT-SLIDE DRAWER
  const renderSubMenuDrawer = () => {
    switch (activeBottomTool) {
      case 'Edit':
        return (
          <div style={{ display: 'flex', width: '100%', gap: '8px', animation: 'splitSlideIn 0.2s ease-out' }}>
            <div style={{ flex: 1, display: 'flex', gap: '8px', overflowX: 'auto' }}>
              <button onClick={() => alert("✂️ Split Clip at " + formatTimecode(currentTime))} style={subBtnStyle}>✂️ Split</button>
              <button onClick={() => alert("🔊 Volume Adjust")} style={subBtnStyle}>🔊 Volume</button>
              <button onClick={() => alert("⚡ Velocity Speed")} style={subBtnStyle}>⚡ Speed</button>
              <button onClick={() => alert("📐 Crop Tool")} style={subBtnStyle}>📐 Crop</button>
              <button onClick={() => alert("🌀 Motion Blur Active!")} style={subBtnStyleHighlight}>🌀 Motion Blur</button>
              <button onClick={() => alert("⚖️ AI Gimbal Stabilize Applied!")} style={subBtnStyleHighlight}>⚖️ AI Stabilize</button>
            </div>
          </div>
        );

      case 'Adjust':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#0A0A10', padding: '10px', borderRadius: '10px', border: '1px solid #7209B7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#00F2FF', fontWeight: 'bold' }}>🎚️ AI Color Adjustments & HSL</span>
              <button onClick={() => {
                if (!usedVipFeatures.includes('AI Smart Color')) setUsedVipFeatures([...usedVipFeatures, 'AI Smart Color']);
                alert("🤖 AI Smart Color Auto-Correction Applied!");
              }} style={{ background: 'linear-gradient(135deg, #00F2FF, #7209B7)', border: 'none', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 'bold', cursor: 'pointer' }}>
                🤖 AI Smart Color (👑 PRO)
              </button>
            </div>

            {/* HSL COLOR WHEEL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#12121C', padding: '8px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.6rem', color: '#AAA', fontWeight: 'bold' }}>HSL Colors:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {hslColorsList.map((c) => (
                  <div 
                    key={c.name}
                    onClick={() => setSelectedHslColor(c.name)}
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      borderRadius: '50%', 
                      background: c.hex, 
                      border: selectedHslColor === c.name ? '2px solid #FFF' : '1px solid #333',
                      boxShadow: selectedHslColor === c.name ? '0 0 8px ' + c.hex : 'none',
                      cursor: 'pointer' 
                    }} 
                  />
                ))}
              </div>
            </div>

            {/* HSL SLIDERS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#12121C', padding: '8px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.6rem', color: '#AAA', width: '60px' }}>Hue:</span>
                <input type="range" min="0" max="100" value={hslValues[selectedHslColor].hue} onChange={(e) => updateHslVal('hue', Number(e.target.value))} style={{ flex: 1, accentColor: '#00F2FF' }} />
                <span style={{ fontSize: '0.55rem', color: '#00F2FF' }}>{hslValues[selectedHslColor].hue}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.6rem', color: '#AAA', width: '60px' }}>Saturation:</span>
                <input type="range" min="0" max="100" value={hslValues[selectedHslColor].sat} onChange={(e) => updateHslVal('sat', Number(e.target.value))} style={{ flex: 1, accentColor: '#FF0055' }} />
                <span style={{ fontSize: '0.55rem', color: '#FF0055' }}>{hslValues[selectedHslColor].sat}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.6rem', color: '#AAA', width: '60px' }}>Lightness:</span>
                <input type="range" min="0" max="100" value={hslValues[selectedHslColor].light} onChange={(e) => updateHslVal('light', Number(e.target.value))} style={{ flex: 1, accentColor: '#FFCC00' }} />
                <span style={{ fontSize: '0.55rem', color: '#FFCC00' }}>{hslValues[selectedHslColor].light}</span>
              </div>
            </div>
          </div>
        );

      case 'Effects':
        return (
          <div style={{ background: '#0A0A10', padding: '10px', borderRadius: '10px', border: '1px solid #7209B7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setEffectTab('Video')} style={effectTab === 'Video' ? subBtnStyleActive : subBtnStyle}>🎥 Video Effects</button>
                <button onClick={() => setEffectTab('Body')} style={effectTab === 'Body' ? subBtnStyleActive : subBtnStyle}>💃 Body Effects</button>
              </div>
              <button onClick={() => { setSelectedEffect('None'); alert("🔄 Reset Effects!"); }} style={subBtnStyleDelete}>🚫 None / Reset</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxHeight: '130px', overflowY: 'auto' }}>
              {(effectTab === 'Video' ? videoEffectsList : bodyEffectsList).map((fx) => (
                <button 
                  key={fx.name} 
                  onClick={() => { 
                    setSelectedEffect(fx.name); 
                    if (!usedVipFeatures.includes('FX: ' + fx.name)) setUsedVipFeatures([...usedVipFeatures, 'FX: ' + fx.name]);
                    alert("✨ Effect Applied: " + fx.name); 
                  }} 
                  style={selectedEffect === fx.name ? subBtnStyleActive : subBtnStyle}
                >
                  {fx.icon} {fx.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 'Filters':
        return (
          <div style={{ background: '#0A0A10', padding: '10px', borderRadius: '10px', border: '1px solid #34C759' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#34C759', fontWeight: 'bold' }}>🎨 Cinematic Filters</span>
              <button onClick={() => { setSelectedFilter('None'); alert("🔄 Reset Filters!"); }} style={subBtnStyleDelete}>🚫 None / Reset</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
              {filtersList.map((flt) => (
                <button 
                  key={flt.name} 
                  onClick={() => { 
                    setSelectedFilter(flt.name); 
                    alert("🎨 Filter Applied: " + flt.name); 
                  }} 
                  style={selectedFilter === flt.name ? subBtnStyleActive : subBtnStyle}
                >
                  {flt.icon} {flt.name}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div style={{ fontSize: '0.65rem', color: '#AAA' }}>Select any tool from bottom bar.</div>
        );
    }
  };

  return (
    <div style={{ background: '#0A0A0F', border: '1px solid #281438', borderRadius: '16px', padding: '16px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', boxShadow: '0 0 20px rgba(114, 9, 183, 0.15)', position: 'relative' }}>
      
      <style>{`
        @keyframes splitSlideIn {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*,image/*,audio/*" style={{ display: 'none' }} />

      {/* TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#00F2FF', fontSize: '0.85rem', letterSpacing: '0.5px', textShadow: '0 0 8px rgba(0,242,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🇮🇳</span> HYPER EDITS PRO <span>🇮🇳</span>
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => alert("📜 History Logs")} style={iconBtnStyle}>📜</button>
          <button onClick={handleExportClick} style={{ background: 'linear-gradient(135deg, #00F2FF, #7209B7)', border: 'none', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 8px rgba(0,242,255,0.4)' }}>
            ↗️ Export
          </button>
        </div>
      </div>

      {/* NEW PROJECT BUTTON */}
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <button 
          onClick={() => triggerPickerForTrack('main')}
          style={{ width: '100%', background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.6), rgba(0, 242, 255, 0.4))', border: '1px solid #00F2FF', color: '#FFF', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 0 12px rgba(0,242,255,0.2)' }}
        >
          ➕ New Project
        </button>
      </div>

      {/* CANVAS PREVIEW */}
      <div style={{ width: '100%', height: '160px', background: '#000', borderRadius: '12px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(114, 9, 183, 0.5)', marginBottom: '10px', position: 'relative' }}>
        <div style={{ transform: `scale(${canvasScale / 100})`, transition: 'transform 0.1s ease-out' }}>
          <span style={{ fontSize: '2.8rem' }}>🎮</span>
        </div>
        <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '0.6rem', color: '#00F2FF', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px' }}>1080p ({aspectRatio})</span>
      </div>

      {/* CANVAS SCALE SLIDER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', background: '#12121C', padding: '6px 10px', borderRadius: '8px', border: '1px solid #1F1F30' }}>
        <span style={{ fontSize: '0.65rem', color: '#AAA', fontWeight: 'bold' }}>🔍 Canvas Zoom: <b style={{ color: '#00F2FF' }}>{canvasScale}%</b></span>
        <input type="range" min="50" max="300" value={canvasScale} onChange={(e) => setCanvasScale(Number(e.target.value))} style={{ flex: 1, accentColor: '#7209B7', cursor: 'pointer' }} />
        <button onClick={() => setCanvasScale(100)} style={{ background: '#1A1A28', border: '1px solid #7209B7', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontSize: '0.55rem' }}>Reset</button>
      </div>

      {/* TIMECODE & PLAYBACK BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#12121C', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(114, 9, 183, 0.4)', marginBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', color: '#00F2FF', fontWeight: '900', fontFamily: 'monospace' }}>{formatTimecode(currentTime)}</span>
          <span style={{ fontSize: '0.55rem', color: '#AAA' }}>/ {formatTimecode(totalDuration)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => alert("↩️ Undo")} style={iconControlStyle}>↩️</button>
          <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'linear-gradient(135deg, #00F2FF, #7209B7)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 0 10px rgba(0, 242, 255, 0.5)' }}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={() => alert("↪️ Redo")} style={iconControlStyle}>↪️</button>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => alert("◆ Keyframe Added")} style={iconControlHighlight}>◆ Keyframe</button>
          <button onClick={() => setShowGraphDrawer(!showGraphDrawer)} style={iconControlGraph}>📈 Graph</button>
        </div>
      </div>

      {/* SUB-MENU DRAWER PANEL */}
      <div style={{ background: '#12121C', padding: '10px', borderRadius: '10px', border: '1px solid rgba(114, 9, 183, 0.4)', marginBottom: '12px' }}>
        <div style={{ fontSize: '0.65rem', color: '#AAA', marginBottom: '6px', fontWeight: 'bold' }}>
          🛠️ {activeBottomTool ? activeBottomTool.toUpperCase() + ' OPTIONS:' : 'SELECT TOOL BELOW:'}
        </div>
        {renderSubMenuDrawer()}
      </div>

      {/* 4-TRACK TIMELINE STACK WITH TRACK '+' BUTTONS */}
      <div style={{ background: '#0A0A10', border: '1px solid #1F1F30', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#7209B7', fontWeight: 'bold', borderBottom: '1px solid #1F1F30', paddingBottom: '4px' }}>
          <span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span><span>00:25</span><span>00:30</span>
        </div>

        {/* TRACK 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div onClick={() => setSelectedTrack('main')} style={{ flex: 1, background: selectedTrack === 'main' ? '#1A1A30' : '#141420', border: selectedTrack === 'main' ? '1px solid #00F2FF' : '1px solid #222', borderRadius: '6px', padding: '6px 8px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#00F2FF', fontWeight: 'bold' }}>
              <span>🎥 TRACK 1: MAIN VIDEO ({mainTracks.length})</span>
              <span>{formatTimecode(totalDuration)}</span>
            </div>
          </div>
          <button onClick={() => triggerPickerForTrack('main')} style={trackPlusBtnStyle}>➕</button>
        </div>

        {/* TRACK 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div onClick={() => setSelectedTrack('text')} style={{ flex: 1, background: selectedTrack === 'text' ? '#1A1A30' : '#141420', border: selectedTrack === 'text' ? '1px solid #FFCC00' : '1px solid #222', borderRadius: '6px', padding: '6px 8px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#FFCC00', fontWeight: 'bold' }}>
              <span>📝 TRACK 2: TEXT LAYER ({textTracks.length})</span>
              <span>Tap to Edit</span>
            </div>
          </div>
          <button onClick={() => {
            const txt = prompt("Enter text:", "FREE FIRE HEADSHOT 🔥");
            if (txt) setTextTracks([...textTracks, { id: 'txt_' + Date.now(), name: txt }]);
          }} style={trackPlusBtnStyle}>➕</button>
        </div>

        {/* TRACK 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div onClick={() => setSelectedTrack('audio')} style={{ flex: 1, background: selectedTrack === 'audio' ? '#1A1A30' : '#141420', border: selectedTrack === 'audio' ? '1px solid #34C759' : '1px solid #222', borderRadius: '6px', padding: '6px 8px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#34C759', fontWeight: 'bold' }}>
              <span>🎵 TRACK 3: AUDIO LAYER ({audioTracks.length})</span>
              <span>Tap to Select</span>
            </div>
          </div>
          <button onClick={() => triggerPickerForTrack('audio')} style={trackPlusBtnStyle}>➕</button>
        </div>

        {/* TRACK 4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div onClick={() => setSelectedTrack('overlay')} style={{ flex: 1, background: selectedTrack === 'overlay' ? '#1A1A30' : '#141420', border: selectedTrack === 'overlay' ? '1px solid #FF007F' : '1px solid #222', borderRadius: '6px', padding: '6px 8px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#FF007F', fontWeight: 'bold' }}>
              <span>🖼️ TRACK 4: OVERLAY LAYER ({overlays.length})</span>
              <span>Tap to View</span>
            </div>
          </div>
          <button onClick={() => triggerPickerForTrack('overlay')} style={trackPlusBtnStyle}>➕</button>
        </div>
      </div>

      {/* 11 MAIN BOTTOM TOOLBAR GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '4px', background: '#0A0A10', padding: '8px 4px', borderRadius: '10px', border: '1px solid #1F1F30', overflowX: 'auto' }}>
        {[
          { name: 'Edit', icon: '✂️' },
          { name: 'Audio', icon: '🎵' },
          { name: 'Text', icon: '📝' },
          { name: 'Effects', icon: '✨' },
          { name: 'Overlay', icon: '🖼️' },
          { name: 'Captions', icon: '💬' },
          { name: 'Filters', icon: '🎨' },
          { name: 'Adjust', icon: '🎚️' },
          { name: 'Stickers', icon: '⭐' },
          { name: 'Aspect ratio', icon: '📐' },
          { name: 'Background', icon: '🖼️' }
        ].map((t) => (
          <div 
            key={t.name}
            onClick={() => setActiveBottomTool(t.name)}
            style={{ 
              textAlign: 'center', 
              padding: '6px 2px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              background: activeBottomTool === t.name ? '#7209B7' : 'transparent',
              border: activeBottomTool === t.name ? '1px solid #00F2FF' : 'none',
              boxShadow: activeBottomTool === t.name ? '0 0 10px rgba(114, 9, 183, 0.6)' : 'none',
              minWidth: '50px'
            }}
          >
            <div style={{ fontSize: '1rem' }}>{t.icon}</div>
            <span style={{ fontSize: '0.5rem', color: activeBottomTool === t.name ? '#00F2FF' : '#AAA', fontWeight: 'bold', display: 'block', whiteSpace: 'nowrap' }}>{t.name}</span>
          </div>
        ))}
      </div>

      {/* VIP PAYWALL MODAL WITH ACTIVE CLOSE & SHOOTING STAR EFFECT */}
      {showVipPaywall && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 5, 12, 0.98)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '20px', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ background: 'linear-gradient(135deg, #12121C, #281438)', border: '2px solid #FFCC00', borderRadius: '16px', padding: '20px', width: '90%', maxWidth: '360px', textAlign: 'center', boxShadow: '0 0 30px rgba(255, 204, 0, 0.3)', position: 'relative' }}>
            
            {/* ACTIVE CLOSE 'X' BUTTON */}
            <button 
              onClick={() => { console.log("Closing Paywall"); setShowVipPaywall(false); console.log("Paywall closed successfully");; }}
              style={{ position: 'absolute', top: '12px', right: '14px', background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', textShadow: '0 0 6px #FFCC00' }}
            >
              ✕
            </button>

            <h2 style={{ color: '#FFCC00', margin: '0 0 8px 0', fontSize: '1.2rem' }}>👑 HYPER PRO VIP UNLOCK</h2>
            <p style={{ fontSize: '0.7rem', color: '#AAA', margin: '0 0 14px 0' }}>
              Your video contains Pro Features: <br />
              <b style={{ color: '#00F2FF' }}>{usedVipFeatures.join(', ')}</b>
            </p>

            <div style={{ background: '#0A0A10', border: '1px solid #7209B7', padding: '10px', borderRadius: '10px', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: '#34C759', fontWeight: 'bold' }}>🎉 7-DAY FREE TRIAL</div>
              <span style={{ fontSize: '0.6rem', color: '#AAA' }}>Then ₹199/month (Cancel Anytime)</span>
            </div>

            <button onClick={() => {
              setIsVipUser(true);
              setShowVipPaywall(false); console.log("Paywall closed successfully");;
              startExportProcess();
            }} style={{ width: '100%', background: 'linear-gradient(135deg, #FFCC00, #FF0055)', border: 'none', color: '#000', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '8px' }}>
              ⚡ Start 7-Day Free Trial & Export
            </button>

            <button onClick={() => { console.log("Closing Paywall"); setShowVipPaywall(false); console.log("Paywall closed successfully");; }} style={{ background: 'transparent', border: 'none', color: '#AAA', fontSize: '0.65rem', cursor: 'pointer' }}>
              Close & Remove VIP Features
            </button>
          </div>
        </div>
      )}

      {/* DYNAMIC RAINBOW LIQUID EXPORT MODAL */}
      {isExporting && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 5, 12, 0.96)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#12121C', border: '1px solid #00F2FF', borderRadius: '16px', padding: '20px', width: '90%', maxWidth: '380px', textAlign: 'center', position: 'relative', boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)' }}>
            <h3 style={{ color: '#00F2FF', margin: '0 0 4px 0', fontSize: '1.05rem' }}>
              {exportComplete ? "🎉 Export Complete!" : "🎬 Rendering Video..."}
            </h3>

            <div style={{ width: '80px', height: '140px', borderRadius: '12px', border: '3px solid #7209B7', overflow: 'hidden', margin: '0 auto 15px auto', position: 'relative', background: '#0A0A10' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${exportProgress}%`, background: 'linear-gradient(0deg, #FF0055 0%, #7209B7 35%, #00F2FF 70%, #FFCC00 100%)', transition: 'height 0.1s linear' }} />
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontWeight: '900', fontSize: '1.1rem' }}>
                {exportProgress}%
              </div>
            </div>

            {exportComplete ? (
              <div>
                <p style={{ fontSize: '0.7rem', color: '#34C759', margin: '0 0 12px 0', fontWeight: 'bold' }}>✅ Saved to Internal Storage / Gallery!</p>
                <button onClick={closeExportModal} style={{ width: '100%', background: '#34C759', border: 'none', color: '#000', padding: '8px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ✓ Done & Close
                </button>
              </div>
            ) : (
              <button onClick={closeExportModal} style={{ background: '#1A1A28', border: '1px solid #FF007F', color: '#FF007F', padding: '6px 16px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
                ✖ Cancel Export
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

const iconBtnStyle: React.CSSProperties = {
  background: '#141420',
  border: '1px solid rgba(114, 9, 183, 0.5)',
  color: '#FFF',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '0.75rem',
  cursor: 'pointer'
};

const iconControlStyle: React.CSSProperties = {
  background: '#1A1A28',
  border: '1px solid #333',
  color: '#FFF',
  padding: '4px 6px',
  borderRadius: '6px',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const iconControlHighlight: React.CSSProperties = {
  background: '#1A1A28',
  border: '1px solid #00F2FF',
  color: '#00F2FF',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const iconControlGraph: React.CSSProperties = {
  background: 'linear-gradient(135deg, #7209B7, #FF007F)',
  border: 'none',
  color: '#FFF',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const subBtnStyle: React.CSSProperties = {
  background: '#1A1A28',
  border: '1px solid #333',
  color: '#FFF',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

const subBtnStyleHighlight: React.CSSProperties = {
  background: 'linear-gradient(135deg, #00F2FF, #7209B7)',
  border: 'none',
  color: '#FFF',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

const subBtnStyleActive: React.CSSProperties = {
  background: '#34C759',
  border: 'none',
  color: '#000',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

const subBtnStyleDelete: React.CSSProperties = {
  background: '#1A1A28',
  border: '1px solid #FF007F',
  color: '#FF007F',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

const trackPlusBtnStyle: React.CSSProperties = {
  background: '#1A1A28',
  border: '1px solid #7209B7',
  color: '#00F2FF',
  padding: '6px 10px',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default EditorFeatures;
