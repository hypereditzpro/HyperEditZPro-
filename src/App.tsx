import React, { useState, useEffect } from 'react';
import EditorFeatures from './EditorFeatures';
import Auth from './Auth';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'editor'>('projects');
  
  // Local storage based dynamic saved projects array (Empty by default)
  const [savedProjects, setSavedProjects] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app' || window.location.search.includes('mode=app')) {
      setIsAppMode(true);
    }
  }, []);

  if (!isAppMode) {
    return <Auth onGuestAccess={() => setIsAppMode(true)} />;
  }

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '30px' }}>
      
      {/* 1. TOP CAPCUT STYLE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#14151C', borderBottom: '1px solid #222431' }}>
        
        {/* Left: Profile Icon & Small PRO VIP Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: '#FFF' }}>
            H
          </div>
          <button 
            onClick={() => setShowPaymentModal(true)}
            style={{ background: 'linear-gradient(90deg, #FF9500, #FF5E00)', border: 'none', color: '#FFF', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 10px rgba(255,149,0,0.4)' }}
          >
            ⚡ PRO VIP
          </button>
        </div>

        {/* Center: Clean Brand Name */}
        <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px', color: '#FFF' }}>
          HYPEREDITS <span style={{ color: '#00F2FF' }}>PRO</span>
        </div>

        {/* Right: History Icon/Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setShowHistoryModal(true)}
            style={{ background: '#222431', border: '1px solid #333648', color: '#00F2FF', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            📜 History
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>

        {/* 2. HERO ACTION BUTTONS (New Project & Edit Photo) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          
          {/* New Video Project Button */}
          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: 'linear-gradient(135deg, #1A2639, #111827)', border: '1px solid #00F2FF55', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,242,255,0.12)' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#00F2FF', color: '#000', fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>+</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>New Project</div>
          </div>

          {/* Edit Photo / Tools */}
          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🖼️</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#DDD' }}>Edit Photo</div>
          </div>
        </div>

        {/* 3. CAPCUT 7-TOOLS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {[
            { name: 'AutoCut', icon: '🎬' },
            { name: 'Retouch', icon: '✨' },
            { name: 'Captions', icon: '📝' },
            { name: 'Remove BG', icon: '👤' },
            { name: 'Enhance', icon: '🪄' },
            { name: 'Camera', icon: '📷' },
            { name: 'All Tools', icon: '🎛️' }
          ].map((tool, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveTab('editor')}
              style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '12px', padding: '12px 6px', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{tool.icon}</div>
              <div style={{ fontSize: '11px', color: '#AAA', fontWeight: '500' }}>{tool.name}</div>
            </div>
          ))}
        </div>

        {/* 4. PROJECTS SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>Projects</h3>
          <span style={{ fontSize: '12px', color: '#666' }}>Recent</span>
        </div>

        {/* Dynamic Project Files Area */}
        {savedProjects.length === 0 ? (
          <div style={{ background: '#14151C', border: '1px dashed #222431', borderRadius: '12px', padding: '36px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.5 }}>📁</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#888' }}>No project files found</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Tap 'New Project' to create your first video</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedProjects.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#14151C', padding: '10px', borderRadius: '12px', border: '1px solid #222431' }}>
                <div style={{ width: '56px', height: '56px', background: '#222431', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎥</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{item.date} | {item.size}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODALS */}
      {showPaymentModal && <PowerPaymentEngine onClose={() => setShowPaymentModal(false)} />}
      {showHistoryModal && <UserProfileHistory onClose={() => setShowHistoryModal(false)} />}
      
      {/* EDITOR OVERLAY (Workspace inside where Audio/Timeline lives) */}
      {activeTab === 'editor' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 9999, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', background: '#14151C', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431' }}>
            <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>← Projects</button>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Editor Workspace</span>
            <div></div>
          </div>
          <EditorFeatures />
        </div>
      )}

    </div>
  );
}
