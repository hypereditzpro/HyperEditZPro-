import React, { useState } from 'react';
import { Scissors, Music, Type, Wand2, Layers, SlidersHorizontal, Gauge, Volume2, Trash2, X, ChevronLeft } from 'lucide-react';

interface FeaturesProps {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  onSplit: () => void;
  onDelete: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  bri: number; setBri: (v: number) => void;
  con: number; setCon: (v: number) => void;
  sat: number; setSat: (v: number) => void;
}

export default function EditorFeatures({
  activeTool, setActiveTool, onSplit, onDelete, videoRef, aspectRatio, setAspectRatio, bri, setBri, con, setCon, sat, setSat
}: FeaturesProps) {
  const [innerPanel, setInnerPanel] = useState<string | null>(null);
  const [hslHue, setHslHue] = useState<number>(0);
  const [hslSat, setHslSat] = useState<number>(100);

  const handleSpeedChange = (val: number) => {
    if (videoRef.current) videoRef.current.playbackRate = val;
  };

  const handleVolumeChange = (val: number) => {
    if (videoRef.current) videoRef.current.volume = val / 100;
  };

  return (
    <div style={{ width: '100%', background: '#000', borderTop: '1px solid #1C1C1E' }}>
      
      {/* LEVEL 2 & 3: ACTION SUB-PANELS */}
      {activeTool === 'Edit' && (
        <div style={panelOverlayStyle}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '5px' }}>
            <button onClick={onSplit} style={innerActionBtnStyle}>✂️ Split</button>
            <button onClick={() => setInnerPanel(innerPanel === 'speed' ? null : 'speed')} style={innerActionBtnStyle}>⏱️ Speed</button>
            <button onClick={() => setInnerPanel(innerPanel === 'ratio' ? null : 'ratio')} style={innerActionBtnStyle}>📐 Crop Ratio</button>
            <button onClick={onDelete} style={{ ...innerActionBtnStyle, color: '#EF4444' }}>🗑️ Delete</button>
          </div>
          
          {innerPanel === 'speed' && (
            <div style={sliderContainerStyle}>
              <label style={sliderLabelStyle}>Playback Speed Control</label>
              <input type="range" min="0.25" max="3.0" step="0.25" defaultValue="1.0" onChange={(e) => handleSpeedChange(parseFloat(e.target.value))} style={sliderStyle} />
            </div>
          )}

          {innerPanel === 'volume' && (
            <div style={sliderContainerStyle}>
              <label style={sliderLabelStyle}>Volume Gain Booster</label>
              <input type="range" min="0" max="100" defaultValue="100" onChange={(e) => handleVolumeChange(parseInt(e.target.value))} style={sliderStyle} />
            </div>
          )}

          {innerPanel === 'ratio' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => setAspectRatio('9/16')} style={aspectRatio === '9/16' ? activeRatioBtn : inactiveRatioBtn}>9:16 (Shorts)</button>
              <button onClick={() => setAspectRatio('16/9')} style={aspectRatio === '16/9' ? activeRatioBtn : inactiveRatioBtn}>16:9 (YouTube)</button>
              <button onClick={() => setAspectRatio('1/1')} style={aspectRatio === '1/1' ? activeRatioBtn : inactiveRatioBtn}>1:1 (Square)</button>
            </div>
          )}
        </div>
      )}

      {activeTool === 'Adjust' && (
        <div style={panelOverlayStyle}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '12px', borderBottom: '1px solid #333', paddingBottom: '6px' }}>
            <button style={innerPanel === null ? activeTabStyle : inactiveTabStyle} onClick={() => setInnerPanel(null)}>Basic</button>
            <button style={innerPanel === 'hsl' ? activeTabStyle : inactiveTabStyle} onClick={() => setInnerPanel('hsl')}>HSL Matrix</button>
          </div>

          {innerPanel === null && (
            <div>
              <label style={sliderLabelStyle}>Brightness ({bri}%)</label>
              <input type="range" min="50" max="150" value={bri} onChange={(e) => setBri(parseInt(e.target.value))} style={sliderStyle} />
              <label style={sliderLabelStyle}>Contrast ({con}%)</label>
              <input type="range" min="50" max="150" value={con} onChange={(e) => setCon(parseInt(e.target.value))} style={sliderStyle} />
              <label style={sliderLabelStyle}>Saturation ({sat}%)</label>
              <input type="range" min="50" max="150" value={sat} onChange={(e) => setSat(parseInt(e.target.value))} style={sliderStyle} />
            </div>
          )}

          {innerPanel === 'hsl' && (
            <div>
              <label style={sliderLabelStyle}>Hue Shift Tint ({hslHue}°)</label>
              <input type="range" min="-180" max="180" value={hslHue} onChange={(e) => setHslHue(parseInt(e.target.value))} style={sliderStyle} />
              <label style={sliderLabelStyle}>HSL Color Saturation ({hslSat}%)</label>
              <input type="range" min="0" max="200" value={hslSat} onChange={(e) => setHslSat(parseInt(e.target.value))} style={sliderStyle} />
            </div>
          )}
        </div>
      )}

      {/* LEVEL 1: CAPCUT BOTTOM NAVIGATION BAR */}
      <div style={toolbarStyle}>
        <button style={activeTool === 'Edit' ? activeToolbarBtnStyle : toolbarBtnStyle} onClick={() => { setActiveTool(activeTool === 'Edit' ? null : 'Edit'); setInnerPanel(null); }}><Scissors size={18}/>Edit</button>
        <button style={toolbarBtnStyle} onClick={() => alert("🎵 Audio Library Opened")}><Music size={18}/>Audio</button>
        <button style={toolbarBtnStyle} onClick={() => alert("📝 Text Track Layer Enabled")}><Type size={18}/>Text</button>
        <button style={toolbarBtnStyle} onClick={() => alert("✨ VFX Pro Effects System Loaded")}><Wand2 size={18}/>Effects</button>
        <button style={toolbarBtnStyle} onClick={() => alert("🖼️ Multi-Layer Overlay Track Opened")}><Layers size={18}/>Overlay</button>
        <button style={activeTool === 'Adjust' ? activeToolbarBtnStyle : toolbarBtnStyle} onClick={() => { setActiveTool(activeTool === 'Adjust' ? null : 'Adjust'); setInnerPanel(null); }}><SlidersHorizontal size={18}/>Adjust</button>
      </div>

    </div>
  );
}

const toolbarStyle = { height: '70px', background: '#09090B', display: 'flex', overflowX: 'auto' as const, alignItems: 'center', gap: '22px', padding: '0 15px' };
const toolbarBtnStyle = { background: 'none', border: 'none', color: '#8E8E93', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', minWidth: '55px', fontSize: '11px', cursor: 'pointer' };
const activeToolbarBtnStyle = { ...toolbarBtnStyle, color: '#00F2FF' };
const panelOverlayStyle = { background: '#121214', padding: '12px 15px', borderTop: '1px solid #1C1C1E' };
const innerActionBtnStyle = { background: '#1C1C1E', border: '1px solid #2C2C2E', color: '#FFF', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' as const };
const sliderContainerStyle = { background: '#1C1C1E', padding: '8px', borderRadius: '8px', marginTop: '8px' };
const sliderLabelStyle = { fontSize: '11px', color: '#8E8E93', display: 'block', marginBottom: '4px' };
const sliderStyle = { width: '100%', accentColor: '#00F2FF' };
const inactiveRatioBtn = { background: '#1C1C1E', color: '#FFF', border: '1px solid #2C2C2E', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' };
const activeRatioBtn = { ...inactiveRatioBtn, background: '#00F2FF', color: '#000', borderColor: '#00F2FF', fontWeight: 'bold' as const };
const activeTabStyle = { background: 'none', border: 'none', color: '#00F2FF', fontWeight: 'bold' as const, fontSize: '12px', cursor: 'pointer' };
const inactiveTabStyle = { background: 'none', border: 'none', color: '#71717A', fontSize: '12px', cursor: 'pointer' };
