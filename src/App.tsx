import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [photoEditActive, setPhotoEditActive] = useState(false);
  const [selectedPhotoTool, setSelectedPhotoTool] = useState('');
  
  // Persistent Auto-Save Projects Database
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const localData = localStorage.getItem('hyper_edits_projects');
      if (localData) return JSON.parse(localData);
    } catch (e) {
      console.error(e);
    }
    return [
      { name: 'FF_Montage_01', date: '22/07/2026 15:45', size: '42MB', len: '00:15', tag: '🎮' }
    ];
  });

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {currentScreen === 'editor' ? (
        /* ================= CAPCUT STYLE CLEAN EDITOR TIMELINE SCREEN ================= */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', padding: '12px' }}>
          
          {/* Top Navigation Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => {
                const now = new Date();
                const liveStamp = now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
                const newProj = {
                  name: 'Project_' + (savedProjects.length + 1),
                  date: liveStamp,
                  size: '35MB',
                  len: '00:15',
                  tag: '🔥'
                };
                const updatedList = [newProj, ...savedProjects];
                setSavedProjects(updatedList);
                localStorage.setItem('hyper_edits_projects', JSON.stringify(updatedList));
                setCurrentScreen('dashboard');
              }}
              style={{ backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✕ Back
            </button>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>HyperEdits Pro Timeline</div>
            <div style={{ fontSize: '12px', color: '#AAA' }}>1080p 60fps</div>
          </div>

          {/* Video Preview Canvas */}
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '10px', margin: '10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #222' }}>
            <span style={{ fontSize: '14px', color: '#888' }}>▶ Preview Screen</span>
            <span style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>[ GPU Accelerated Canvas ]</span>
          </div>

          {/* Bottom CapCut Style Tools Toolbar (Scrollable & Clean) */}
          <div style={{ backgroundColor: '#14141A', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '5px', scrollbarWidth: 'none' }}>
              {[
                { id: 'split', label: 'Split', icon: '✂️' },
                { id: 'speed', label: 'Speed', icon: '⚡' },
                { id: 'animation', label: 'Animation', icon: '✨' },
                { id: 'audio', label: 'Audio', icon: '🎵' },
                { id: 'text', label: 'Text', icon: '💬' },
                { id: 'effects', label: 'Effects', icon: '🌟' },
                { id: 'filters', label: 'Filters', icon: '🎨' },
                { id: 'adjust', label: 'Adjust', icon: '🎛️' },
                { id: 'mask', label: 'Mask', icon: '⭕' }
              ].map((tool) => (
                <div 
                  key={tool.id}
                  onClick={() => alert(tool.label + ' tool activated!')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '55px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '18px', marginBottom: '3px' }}>{tool.icon}</span>
                  <span style={{ fontSize: '10px', color: '#CCC' }}>{tool.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* ================= ORIGINAL UNTOUCHED PURPLE-BLACK DASHBOARD ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', paddingBottom: '50px' }}>
          
          {/* Header Icons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '20px', cursor: 'pointer' }}>👤</div>
            <div style={{ display: 'flex', gap: '18px', fontSize: '18px', cursor: 'pointer' }}>
              <span>🔔</span>
              <span>⚙️</span>
            </div>
          </div>

          {/* Top Two Big Hero Action Cards */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <div 
              onClick={() => setCurrentScreen('editor')}
              style={{ flex: 1.4, background: 'linear-gradient(135deg, #7B2CBF 0%, #3C096C 100%)', borderRadius: '14px', padding: '22px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(123,44,191,0.4)' }}
            >
              <span style={{ fontSize: '20px', backgroundColor: '#FFF', color: '#3C096C', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>New video</span>
            </div>

            <div 
              onClick={() => setPhotoEditActive(!photoEditActive)}
              style={{ flex: 1, background: photoEditActive ? 'linear-gradient(135deg, #E0AAFF 0%, #7B2CBF 100%)' : '#1C1C24', border: photoEditActive ? 'none' : '1px solid #333', borderRadius: '14px', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
            >
              <span style={{ fontSize: '22px' }}>🖼️</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: photoEditActive ? '#000' : '#FFF' }}>Edit photo</span>
              <span style={{ fontSize: '8px', backgroundColor: '#FF9500', color: '#000', padding: '1px 4px', borderRadius: '4px', position: 'absolute', top: '5px', right: '5px' }}>Pro</span>
            </div>
          </div>

          {/* Quick Access Tools 7+1 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '22px', backgroundColor: '#14141A', padding: '12px', borderRadius: '12px', border: '1px solid #222' }}>
            {[
              { id: 'autocut', label: 'AutoCut', icon: '🎬' },
              { id: 'retouch', label: 'Retouch', icon: '✨' },
              { id: 'captions', label: 'Auto captions', icon: '🔤' },
              { id: 'desktop', label: 'Desktop editor', icon: '💻' },
              { id: 'remove_bg', label: 'Remove BG', icon: '👤' },
              { id: 'enhance', label: 'Auto enhance', icon: '🪄' },
              { id: 'camera', label: 'Camera', icon: '📷' },
              { id: 'all_tools', label: '● All tools', icon: '🎛️', color: '#FF3B30' }
            ].map((tool) => (
              <div 
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'all_tools') {
                    alert('🎛️ Complete Pro Feature Suite Open');
                  } else {
                    setSelectedPhotoTool(tool.label);
                    setCurrentScreen('editor');
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 4px', backgroundColor: '#1C1C24', borderRadius: '8px', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '16px' }}>{tool.icon}</span>
                <span style={{ fontSize: '10px', color: tool.color || '#AAA', textAlign: 'center', whiteSpace: 'nowrap' }}>{tool.label}</span>
              </div>
            ))}
          </div>

          {/* Projects History Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Projects</span>
            <span style={{ fontSize: '12px', color: '#7B2CBF', fontWeight: 'bold', cursor: 'pointer' }}>☁️ Space</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedProjects.map((proj, pIdx) => (
              <div 
                key={pIdx}
                onClick={() => setCurrentScreen('editor')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1C1C24', padding: '10px', borderRadius: '10px', cursor: 'pointer', border: '1px solid #25252E' }}
              >
                <div style={{ width: '45px', height: '45px', backgroundColor: '#0A0A0C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '1px solid #333' }}>{proj.tag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF', marginBottom: '2px' }}>{proj.name}</div>
                  <div style={{ fontSize: '10px', color: '#8E8E93' }}>{proj.date}</div>
                  <div style={{ fontSize: '9px', color: '#7B2CBF', marginTop: '2px', fontWeight: 'bold' }}>✂️ {proj.size} | ⏱️ {proj.len}</div>
                </div>
                <div style={{ color: '#8E8E93', fontSize: '14px' }}>⋮</div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
