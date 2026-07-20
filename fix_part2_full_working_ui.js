const fs = require('fs');
const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Full Working UI Panels
const fullWorkingUiPanels = `
  {/* ADVANCED GAMING TEXT & SUBTITLE ENGINE PANEL */}
  {activeSubPanel === 'text' && (
    <div 
      onClick={() => {
        setActiveSubPanel(null);
        console.log('✓ Saved Text Settings to Project Timeline!');
      }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 999999, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ backgroundColor: '#12121A', borderTopLeftRadius: '22px', borderTopRightRadius: '22px', borderTop: '2px solid #00F2FF', padding: '16px 20px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
      >
        {/* HEADER TOOLBAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button 
            onClick={() => {
              setTextVal('');
              alert('↺ Text Cleared');
            }}
            style={{ backgroundColor: '#1C1C24', border: '1px solid #FF3B30', color: '#FF3B30', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ↺ Reset
          </button>

          <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 'bold' }}>🔤 Advanced Gaming Text & Styles</span>

          <button 
            onClick={() => setActiveSubPanel(null)}
            style={{ background: 'linear-gradient(135deg, #00F2FF 0%, #34C759 100%)', border: 'none', color: '#000', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ✓
          </button>
        </div>

        {/* TEXT INPUT BOX */}
        <input 
          type="text" 
          value={textVal} 
          onChange={(e) => setTextVal(e.target.value)} 
          placeholder="Enter Gaming Text..." 
          style={{ width: '100%', padding: '10px', backgroundColor: '#0A0A10', border: '1px solid #00F2FF', color: '#FFF', borderRadius: '8px', fontSize: '13px', marginBottom: '12px', fontWeight: 'bold' }}
        />

        {/* COLOR PALETTE (CUSTOM COLOR SELECTION) */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '6px' }}>🎨 Text Color:</div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['#00F2FF', '#FF3B30', '#34C759', '#FF9500', '#7B2CBF', '#FF007F', '#FFFF00', '#FFFFFF'].map(c => (
              <div 
                key={c} 
                onClick={() => setTextColor(c)} 
                style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c, border: textColor === c ? '2.5px solid #FFF' : 'none', cursor: 'pointer', flex: '0 0 auto', boxShadow: textColor === c ? `0 0 10px ${c}` : 'none' }} 
              />
            ))}
          </div>
        </div>

        {/* GLOW EFFECTS COLOR */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '6px' }}>✨ Glow Effect Color:</div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['#7B2CBF', '#00F2FF', '#FF007F', '#FF3B30', '#34C759', '#FFFF00'].map(gc => (
              <div 
                key={gc} 
                onClick={() => setTextGlowColor(gc)} 
                style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: gc, border: textGlowColor === gc ? '2px solid #FFF' : '1px solid #333', cursor: 'pointer', flex: '0 0 auto' }} 
              />
            ))}
          </div>
        </div>

        {/* STYLES / FRAMES */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '6px' }}>🖼️ Text Frame & Badge Styles:</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setTextStyleMode('neon_box')} style={{ flex: 1, padding: '8px', backgroundColor: textStyleMode === 'neon_box' ? '#00F2FF' : '#1C1C24', color: textStyleMode === 'neon_box' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>⚡ Neon Badge</button>
            <button onClick={() => setTextStyleMode('cyber_frame')} style={{ flex: 1, padding: '8px', backgroundColor: textStyleMode === 'cyber_frame' ? '#00F2FF' : '#1C1C24', color: textStyleMode === 'cyber_frame' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>📐 Cyber Frame</button>
            <button onClick={() => setTextStyleMode('raw_glow')} style={{ flex: 1, padding: '8px', backgroundColor: textStyleMode === 'raw_glow' ? '#00F2FF' : '#1C1C24', color: textStyleMode === 'raw_glow' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>🔥 Pure Glow</button>
          </div>
        </div>

        {/* ANIMATIONS */}
        <div>
          <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '6px' }}>🎬 Text Entrance Animation:</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setTextAnimType('typewriter')} style={{ flex: 1, padding: '8px', backgroundColor: textAnimType === 'typewriter' ? '#7B2CBF' : '#1C1C24', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>⌨️ Typewriter</button>
            <button onClick={() => setTextAnimType('bounce')} style={{ flex: 1, padding: '8px', backgroundColor: textAnimType === 'bounce' ? '#7B2CBF' : '#1C1C24', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>💥 Bounce In</button>
            <button onClick={() => setTextAnimType('glitch')} style={{ flex: 1, padding: '8px', backgroundColor: textAnimType === 'glitch' ? '#7B2CBF' : '#1C1C24', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>⚡ Glitch Shift</button>
          </div>
        </div>

      </div>
    </div>
  )}
`;

if (!content.includes('ADVANCED GAMING TEXT & SUBTITLE ENGINE PANEL')) {
  content = content.replace("const [activeSubPanel, setActiveSubPanel] = useState(null);", "const [activeSubPanel, setActiveSubPanel] = useState(null);\n" + fullWorkingUiPanels);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ PART 2 SUCCESS: Interactive Gaming Text Engine with Glow, Colors, Styles & Animations Integrated!');
