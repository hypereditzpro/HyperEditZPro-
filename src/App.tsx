import React, { useState, useEffect } from 'react';
import EditorFeatures from './EditorFeatures';
import Auth from './Auth';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'editor'>('projects');
  
  // Dynamic VIP Status (Default FALSE - Only True after Payment)
  const [isVipUser, setIsVipUser] = useState<boolean>(false);

  // Dynamic Projects State
  const [savedProjects, setSavedProjects] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app' || window.location.search.includes('mode=app')) {
      setIsAppMode(true);
    }
    
    // Check if VIP Token exists in LocalStorage
    const vipToken = localStorage.getItem('hep_vip_active');
    if (vipToken === 'true') {
      setIsVipUser(true);
    }
  }, []);

  if (!isAppMode) {
    return <Auth onGuestAccess={() => setIsAppMode(true)} />;
  }

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. TOP CAPCUT STYLE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#14151C', borderBottom: '1px solid #222431' }}>
        
        {/* Left: Profile Icon & Dynamic VIP Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            onClick={() => setIsDrawerOpen(true)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px', color: '#FFF', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,242,255,0.4)', border: '2px solid #00F2FF' }}
          >
            H
          </div>

          {/* Conditional VIP Badge Logic: Show Upgrade button if Free, Show PRO VIP Badge only if Subscribed */}
          {isVipUser ? (
            <span style={{ background: 'linear-gradient(90deg, #FF9500, #FF5E00)', color: '#FFF', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '10px', boxShadow: '0 0 8px rgba(255,149,0,0.5)' }}>
              ⚡ PRO VIP
            </span>
          ) : (
            <button 
              onClick={() => setShowPaymentModal(true)}
              style={{ background: '#222431', border: '1px solid #FF9500', color: '#FF9500', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '10px', cursor: 'pointer' }}
            >
              👑 Get VIP
            </button>
          )}
        </div>

        {/* Center: Brand Name */}
        <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px', color: '#FFF' }}>
          HYPEREDITS <span style={{ color: '#00F2FF' }}>PRO</span>
        </div>

        {/* Right: History & Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setShowHistoryModal(true)}
            style={{ background: '#222431', border: '1px solid #333648', color: '#00F2FF', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            📜 History
          </button>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '22px', cursor: 'pointer', padding: '0 4px' }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 2. PROFILE & MENU SLIDE-IN DRAWER */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, display: 'flex' }}>
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)' }}
          />
          
          {/* Drawer Box */}
          <div style={{ position: 'relative', width: '280px', background: '#14151C', height: '100%', borderRight: '1px solid #222431', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10001, boxShadow: '5px 0 25px rgba(0,0,0,0.9)' }}>
            <div>
              {/* Profile Card Header */}
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #222431', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', color: '#FFF' }}>H</div>
                  <button onClick={() => alert("Profile Edit: Name & Avatar update feature")} style={{ background: '#222431', border: '1px solid #333648', color: '#00F2FF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>✏️ Edit</button>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>Hitesh Sharma</div>
                <div style={{ fontSize: '11px', color: isVipUser ? '#FF9500' : '#AAA', marginTop: '2px' }}>
                  {isVipUser ? '⚡ PRO VIP Plan Active' : 'FREE USER (No Subscription)'}
                </div>
              </div>

              {/* Menu List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isVipUser && (
                  <div onClick={() => { setIsDrawerOpen(false); setShowPaymentModal(true); }} style={{ padding: '12px', background: 'linear-gradient(135deg, #2A1F0D, #1A1205)', border: '1px solid #FF950055', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF9500', fontWeight: 'bold' }}>
                    ⚡ Get VIP Subscription
                  </div>
                )}
                <div onClick={() => { setIsDrawerOpen(false); setShowHistoryModal(true); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD' }}>
                  📜 Payment & Token History
                </div>
                <div onClick={() => { setIsDrawerOpen(false); setActiveTab('editor'); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD' }}>
                  🎛️ AI Tools Workspace
                </div>
                <div onClick={() => { setIsAppMode(false); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF4D4D' }}>
                  🔑 Account & Auth Page
                </div>
              </div>
            </div>

            {/* Bottom Close Button */}
            <div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ width: '100%', padding: '12px', background: '#222431', border: 'none', color: '#FFF', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                Close Menu ✕
              </button>
              <div style={{ textAlign: 'center', fontSize: '10px', color: '#555', marginTop: '12px' }}>HyperEdits Pro v2.4.0</div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTAINER */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>

        {/* HERO ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: 'linear-gradient(135deg, #1A2639, #111827)', border: '1px solid #00F2FF55', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,242,255,0.12)' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#00F2FF', color: '#000', fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>+</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>New Project</div>
          </div>

          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🖼️</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#DDD' }}>Edit Photo</div>
          </div>
        </div>

        {/* CAPCUT 7-TOOLS GRID */}
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

        {/* PROJECTS SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>Projects</h3>
          <span style={{ fontSize: '12px', color: '#666' }}>Recent</span>
        </div>

        {/* Dynamic Empty Projects Area */}
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

        {/* FOOTER LEGAL LINKS */}
        <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #1A1C24', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px' }}>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("गोपनीयता नीति (Privacy Policy): HyperEdits Pro आपकी निजता का पूरा ध्यान रखता है।"); }} style={{ color: '#00F2FF', textDecoration: 'none' }}>गोपनीयता नीति (Privacy Policy)</a>
            <span style={{ color: '#444' }}>|</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("नियम व शर्तें (Terms & Conditions): HyperEdits Pro का उपयोग केवल व्यक्तिगत और व्यावसायिक वीडियो संपादन के लिए किया जा सकता है।"); }} style={{ color: '#00F2FF', textDecoration: 'none' }}>नियम व शर्तें (Terms)</a>
          </div>
          <div style={{ fontSize: '10px', color: '#444', marginTop: '8px' }}>© 2026 HyperEdits Pro. All rights reserved.</div>
        </div>

      </div>

      {/* MODALS */}
      {showPaymentModal && <PowerPaymentEngine onClose={() => setShowPaymentModal(false)} />}
      {showHistoryModal && <UserProfileHistory onClose={() => setShowHistoryModal(false)} />}
      
      {/* EDITOR OVERLAY */}
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
