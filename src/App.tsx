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
  const [activeTab, setActiveTab] = useState<'projects' | 'editor' | 'templates'>('projects');
  
  // Custom States
  const [userName, setUserName] = useState<string>('Hitesh Sharma');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [showContactSupport, setShowContactSupport] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyBrowser] = useState<boolean>(false);
  const [templateFilter, setTemplateFilter] = useState<'trending' | 'newest' | 'oldest'>('trending');
  const [templateSearch, setTemplateSearch] = useState<string>('');
  
  // VIP Status
  const [isVipUser, setIsVipUser] = useState<boolean>(false);

  // Realtime Persistent Projects Database & 30-Day Recycle Bin
  const [savedProjects, setSavedProjects] = useState<any[]>(() => {
    const localData = localStorage.getItem('hyper_edits_projects');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [recycleBin, setRecycleBin] = useState<any[]>(() => {
    const localBin = localStorage.getItem('hyper_edits_recycle_bin');
    return localBin ? JSON.parse(localBin) : [];
  });
  const [showRecycleBinModal, setShowRecycleBinModal] = useState<boolean>(false);

  // 15-20 Trending CapCut Style Templates Data Matrix
  const trendingTemplates = [
    { id: 1, name: '🔥 Velocity SlowMo BeatSync', category: 'trending', duration: '00:12', uses: '1.2M' },
    { id: 2, name: '⚡ FreeFire Headshot Glow FX', category: 'trending', duration: '00:15', uses: '980K' },
    { id: 3, name: '✨ 3D Zoom Anime Shake', category: 'trending', duration: '00:09', uses: '2.5M' },
    { id: 4, name: '🎬 Cinematic 4K Color Grade', category: 'newest', duration: '00:30', uses: '450K' },
    { id: 5, name: '💥 Phonk Bass Boosted Montage', category: 'trending', duration: '00:18', uses: '3.1M' },
    { id: 6, name: '🎞️ Vintage Film Camera Roll', category: 'oldest', duration: '00:22', uses: '620K' },
    { id: 7, name: '🚀 Cyberpunk Neon Flash', category: 'newest', duration: '00:14', uses: '180K' },
    { id: 8, name: '🪄 Smooth Blur Transition', category: 'trending', duration: '00:10', uses: '1.8M' },
    { id: 9, name: '🎧 Beat Drop Glitch Effect', category: 'newest', duration: '00:16', uses: '340K' },
    { id: 10, name: '👤 AI Auto Cutout Portrait', category: 'trending', duration: '00:08', uses: '890K' },
    { id: 11, name: '🌌 Galaxy Star Glow Overlay', category: 'oldest', duration: '00:25', uses: '510K' },
    { id: 12, name: '🔥 Aggressive Drill Beat Sync', category: 'newest', duration: '00:11', uses: '720K' },
    { id: 13, name: '✨ Retro VHS Aesthetic', category: 'oldest', duration: '00:20', uses: '400K' },
    { id: 14, name: '⚡ Ultra HDR Contrast Boost', category: 'trending', duration: '00:15', uses: '1.5M' },
    { id: 15, name: '🎬 Vlog Minimal Title Intro', category: 'newest', duration: '00:07', uses: '290K' }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app' || window.location.search.includes('mode=app')) {
      setIsAppMode(true);
    }
    const vipToken = localStorage.getItem('hep_vip_active');
    if (vipToken === 'true') {
      setIsVipUser(true);
    }
  }, []);

  // Recycle Bin restore helper
  const restoreProject = (id: number) => {
    const itemToRestore = recycleBin.find(item => item.id === id);
    if (itemToRestore) {
      const updatedBin = recycleBin.filter(item => item.id !== id);
      const updatedProjects = [itemToRestore, ...savedProjects];
      setRecycleBin(updatedBin);
      setSavedProjects(updatedProjects);
      localStorage.setItem('hyper_edits_recycle_bin', JSON.stringify(updatedBin));
      localStorage.setItem('hyper_edits_projects', JSON.stringify(updatedProjects));
      alert('✓ Project recovered successfully back to your active list!');
    }
  };

  if (!isAppMode) {
    return <Auth onGuestAccess={() => setIsAppMode(true)} />;
  }

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. CAPCUT TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#14151C', borderBottom: '1px solid #222431' }}>
        
        {/* Left: Profile Avatar with Floating PRO VIP Badge Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsDrawerOpen(true)}
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', color: '#FFF', cursor: 'pointer', border: '2px solid #00F2FF', boxShadow: '0 0 10px rgba(0,242,255,0.4)' }}
            >
              H
            </div>
            
            {/* VIP Tag Badge attached strictly over the profile avatar corner */}
            {isVipUser && (
              <span style={{ position: 'absolute', top: '-4px', right: '-8px', background: 'linear-gradient(90deg, #FF9500, #FF5E00)', color: '#FFF', fontSize: '8px', fontWeight: '900', padding: '2px 5px', borderRadius: '8px', boxShadow: '0 0 6px rgba(255,149,0,0.8)', border: '1px solid #FFF' }}>
                PRO VIP
              </span>
            )}
          </div>

          {!isVipUser && (
            <button 
              onClick={() => setShowPaymentModal(true)}
              style={{ background: '#222431', border: '1px solid #FF9500', color: '#FF9500', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '10px', cursor: 'pointer' }}
            >
              👑 Get VIP
            </button>
          )}
        </div>

        {/* Center: Clean Brand Name */}
        <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px', color: '#FFF', textAlign: 'center' }}>
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

      {/* 2. SIDE SLIDE-IN DRAWER PANEL (PROFILE MENU) */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, display: 'flex' }}>
          {/* Dark Blur Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)' }}
          />
          
          {/* Drawer Box */}
          <div style={{ position: 'relative', width: '290px', background: '#14151C', height: '100%', borderRight: '1px solid #222431', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10001, boxShadow: '5px 0 25px rgba(0,0,0,0.9)' }}>
            <div>
              {/* Profile Card inside Slide Drawer */}
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #222431', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#FFF', border: '2px solid #00F2FF' }}>H</div>
                    <div>
                      {isEditingName ? (
                        <input 
                          type="text" 
                          value={userName} 
                          onChange={(e) => setUserName(e.target.value)}
                          onBlur={() => setIsEditingName(false)}
                          style={{ background: '#0D0E12', border: '1px solid #00F2FF', color: '#FFF', fontSize: '13px', padding: '2px 6px', borderRadius: '4px', width: '120px' }}
                          autoFocus
                        />
                      ) : (
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{userName}</span>
                          <span onClick={() => setIsEditingName(true)} style={{ fontSize: '11px', cursor: 'pointer', color: '#00F2FF' }}>✏️</span>
                        </div>
                      )}
                      <div style={{ fontSize: '10px', color: isVipUser ? '#FF9500' : '#AAA', marginTop: '2px' }}>
                        {isVipUser ? '⚡ PRO VIP Plan Active' : 'FREE USER (No VIP)'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Specific Features List inside Slide Menu */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* 1. VIP Subscription */}
                {!isVipUser && (
                  <div 
                    onClick={() => { setIsDrawerOpen(false); setShowPaymentModal(true); }} 
                    style={{ padding: '12px', background: 'linear-gradient(135deg, #2A1F0D, #1A1205)', border: '1px solid #FF950055', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF9500', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    👑 Upgrade to VIP Plan
                  </div>
                )}

                {/* 2. Recycle Bin / Trust Trash (30 Days Limit) */}
                <div 
                  onClick={() => { setIsDrawerOpen(false); setShowRecycleBinModal(true); }} 
                  style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>🗑️ Recycle Bin (30-Day Trash)</span>
                  <span style={{ fontSize: '10px', background: '#222431', padding: '2px 6px', borderRadius: '6px', color: '#FF9500' }}>{recycleBin.length}</span>
                </div>

                {/* 3. Payment & Token History */}
                <div 
                  onClick={() => { setIsDrawerOpen(false); setShowHistoryModal(true); }} 
                  style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD' }}
                >
                  📜 Payment & Token History
                </div>

                {/* 4. Contact / Support (Help Email) */}
                <div 
                  onClick={() => setShowContactSupport(!showContactSupport)} 
                  style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#00F2FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>📧 Contact Support</span>
                  <span>{showContactSupport ? '▲' : '▼'}</span>
                </div>
                {showContactSupport && (
                  <div style={{ padding: '10px', background: '#0D0E12', borderRadius: '8px', fontSize: '11px', color: '#FFF', border: '1px dashed #00F2FF' }}>
                    Send email for assistance:<br/>
                    <strong style={{ color: '#00F2FF' }}>hs8822365@gmail.com</strong>
                  </div>
                )}

                {/* 5. RED LOG OUT BUTTON */}
                <div 
                  onClick={() => { 
                    if(confirm("Do you want to log out from this account?")) { 
                      setIsAppMode(false); 
                      setIsDrawerOpen(false); 
                    } 
                  }} 
                  style={{ padding: '12px', background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF4D4D', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                >
                  🚪 Log Out Account
                </div>

              </div>
            </div>

            {/* Bottom Section inside Drawer: Blue Legal Links */}
            <div>
              <div style={{ borderTop: '1px solid #222431', paddingTop: '14px', textAlign: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '11px', fontWeight: '600' }}>
                  <span onClick={() => { setIsDrawerOpen(false); setShowPolicyBrowser(true); }} style={{ color: '#007AFF', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
                  <span style={{ color: '#444' }}>|</span>
                  <span onClick={() => { setIsDrawerOpen(false); setShowPolicyBrowser(true); }} style={{ color: '#007AFF', cursor: 'pointer', textDecoration: 'underline' }}>Terms & Conditions</span>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ width: '100%', padding: '10px', background: '#222431', border: 'none', color: '#FFF', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              >
                Close Menu ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTAINER */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>

        {/* HERO ACTION BUTTONS (New Video & Edit Photo) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          
          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: 'linear-gradient(135deg, #1A2639, #111827)', border: '1px solid #00F2FF55', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,242,255,0.12)' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#00F2FF', color: '#000', fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>+</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>New video</div>
          </div>

          <div 
            onClick={() => setActiveTab('editor')}
            style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
          >
            <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#00F2FF', color: '#000', fontSize: '8px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '6px' }}>Nano Banana 2</span>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🖼️</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#DDD' }}>Edit photo</div>
          </div>
        </div>

        {/* CAPCUT 7+1 AI TOOLS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { name: 'AutoCut', icon: '🎬' },
            { name: 'Retouch', icon: '✨' },
            { name: 'Auto captions', icon: '📝' },
            { name: 'Desktop editor', icon: '💻' },
            { name: 'Remove BG', icon: '👤' },
            { name: 'Auto enhance', icon: '🪄' },
            { name: 'Camera', icon: '📷' },
            { name: 'All tools', icon: '🎛️' }
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

        {/* TRENDING TEMPLATES CARD */}
        <div 
          onClick={() => setActiveTab('templates')}
          style={{ background: 'linear-gradient(135deg, #1C1A2E, #14151C)', border: '1px solid #7000FF55', borderRadius: '14px', padding: '14px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(112,0,255,0.15)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '26px' }}>🎬</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>Trending Video Templates</div>
              <div style={{ fontSize: '11px', color: '#7000FF', marginTop: '2px' }}>15+ Viral Edits Ready</div>
            </div>
          </div>
          <span style={{ fontSize: '12px', background: '#7000FF', color: '#FFF', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' }}>Browse →</span>
        </div>

        {/* PROJECTS SECTION HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>Projects</h3>
          <span style={{ fontSize: '12px', color: '#666' }}>Recent</span>
        </div>

        {/* Dynamic Saved Projects List */}
        {savedProjects.length === 0 ? (
          <div style={{ background: '#14151C', border: '1px dashed #222431', borderRadius: '12px', padding: '36px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.5 }}>📁</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#888' }}>No project files found</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Tap 'New video' to create your first edit</div>
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

      {/* FULLSCREEN TEMPLATES SHOWCASE MODAL */}
      {activeTab === 'templates' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 9999, overflowY: 'auto', padding: '16px' }}>
          
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Dashboard</button>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>Viral Templates Hub</span>
            <div></div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '14px' }}>
            <input 
              type="text" 
              placeholder="🔍 Search 15+ Trending Templates..." 
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              style={{ width: '100%', background: '#14151C', border: '1px solid #222431', color: '#FFF', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', outline: 'none' }}
            />
          </div>

          {/* Filter Pills (Trending, Newest, Oldest) */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {(['trending', 'newest', 'oldest'] as const).map((f) => (
              <button 
                key={f} 
                onClick={() => setTemplateFilter(f)}
                style={{ background: templateFilter === f ? '#00F2FF' : '#14151C', color: templateFilter === f ? '#000' : '#AAA', border: '1px solid #222431', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'capitalize' }}
              >
                {f === 'trending' ? '🔥 Trending' : f === 'newest' ? '🆕 Newest' : '📜 Oldest'}
              </button>
            ))}
          </div>

          {/* Grid of Templates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {trendingTemplates
              .filter(t => t.name.toLowerCase().includes(templateSearch.toLowerCase()))
              .filter(t => templateFilter === 'trending' ? true : t.category === templateFilter)
              .map((temp) => (
                <div key={temp.id} style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px' }}>
                  <div style={{ fontSize: '24px' }}>🎬</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFF' }}>{temp.name}</div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{temp.duration} • {temp.uses} used</div>
                  </div>
                  <button onClick={() => { setActiveTab('editor'); alert(`Using Template: ${temp.name}`); }} style={{ background: '#7000FF', border: 'none', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginTop: '6px' }}>Use Template</button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* RECYCLE BIN MODAL (30 Days Limit) */}
      {showRecycleBinModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10002, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#FF9500', fontSize: '16px' }}>🗑️ Recycle Bin (30-Day Trash)</h3>
            <button onClick={() => setShowRecycleBinModal(false)} style={{ background: '#222431', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close ✕</button>
          </div>
          
          <p style={{ fontSize: '11px', color: '#888' }}>Deleted projects are saved here for up to 30 days before being permanently removed.</p>

          {recycleBin.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#555', fontSize: '13px' }}>
              Your Trash is empty.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              {recycleBin.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#14151C', padding: '12px', borderRadius: '10px', border: '1px solid #222431' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: '#FF9500', marginTop: '2px' }}>Auto-deletes in 30 days</div>
                  </div>
                  <button onClick={() => restoreProject(item.id)} style={{ background: '#00F2FF', border: 'none', color: '#000', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Restore ↶</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* POLICY BROWSER MODAL */}
      {showPolicyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10003, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#00F2FF', fontSize: '16px' }}>गोपनीयता नीति एवं नियम व शर्तें</h3>
            <button onClick={() => setShowPolicyBrowser(false)} style={{ background: '#222431', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close ✕</button>
          </div>
          <div style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.6' }}>
            <p><strong>HyperEdits Pro Security Terms:</strong></p>
            <p>1. <strong>डेटा स्वामित्व:</strong> उपयोगकर्ता का सारा डेटा उनके स्वयं के लोकल स्टोरेज में ही सुरक्षित रहता है।</p>
            <p>2. <strong>सर्वर बैकअप:</strong> ऐप किसी भी प्रकार की मीडिया फ़ाइलों का बाहरी क्लाउड बैकअप नहीं लेता।</p>
            <p>3. <strong>सहायता ईमेल:</strong> hs8822365@gmail.com</p>
          </div>
        </div>
      )}

      {/* OTHER MODALS */}
      {showPaymentModal && <PowerPaymentEngine onClose={() => setShowPaymentModal(false)} />}
      {showHistoryModal && <UserProfileHistory onClose={() => setShowHistoryModal(false)} />}
      
      {/* EDITOR OVERLAY */}
      {activeTab === 'editor' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 9999, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', background: '#14151C', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431' }}>
            <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>← Back to Dashboard</button>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>CapCut Workspace</span>
            <div></div>
          </div>
          <EditorFeatures />
        </div>
      )}

    </div>
  );
}
