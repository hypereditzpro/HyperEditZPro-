import React, { useState, useEffect, useRef } from 'react';
import EditorFeatures from './EditorFeatures';
import Auth from './Auth';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [addDefaultEnding, setAddDefaultEnding] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'editor' | 'templates'>('projects');
  
  // Custom Media Input Ref for Gallery Selection
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Profile & App States
  const [userName, setUserName] = useState<string>('Hitesh Sharma');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyBrowser] = useState<boolean>(false);
  const [activeProjectMenu, setActiveProjectMenu] = useState<number | null>(null);
  const [isVipUser, setIsVipUser] = useState<boolean>(false);

  // Dynamic Saved Projects
  const [savedProjects, setSavedProjects] = useState<any[]>(() => {
    const localData = localStorage.getItem('hyper_edits_projects');
    return localData ? JSON.parse(localData) : [
      { id: 101, title: 'FF_Headshot_Montage_01', date: '22/07/2026 14:15', size: '48 MB', duration: '00:15' }
    ];
  });
  
  const [recycleBin, setRecycleBin] = useState<any[]>(() => {
    const localBin = localStorage.getItem('hyper_edits_recycle_bin');
    return localBin ? JSON.parse(localBin) : [];
  });
  const [showRecycleBinModal, setShowRecycleBinModal] = useState<boolean>(false);

  const [userTemplates, setUserTemplates] = useState<any[]>(() => {
    const localTeps = localStorage.getItem('hyper_edits_user_templates');
    return localTeps ? JSON.parse(localTeps) : [];
  });

  const languagesList = [
    'English', 'हिन्दी (Hindi)', 'राजस्थानी (Rajasthani)', 
    'मराठी (Marathi)', 'ગુજરાતી (Gujarati)', 'पंजाबी (Punjabi)', 'বাংলা (Bengali)'
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

  // Trigger Phone Gallery File Picker
  const handleNewProjectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      setActiveTab('editor');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const mediaUrl = URL.createObjectURL(file);
      setSelectedMedia(mediaUrl);
      setActiveTab('editor');
    }
  };

  const moveToRecycleBin = (id: number) => {
    const projToDelete = savedProjects.find(p => p.id === id);
    if (projToDelete) {
      const updatedProjects = savedProjects.filter(p => p.id !== id);
      const updatedBin = [projToDelete, ...recycleBin];
      setSavedProjects(updatedProjects);
      setRecycleBin(updatedBin);
      localStorage.setItem('hyper_edits_projects', JSON.stringify(updatedProjects));
      localStorage.setItem('hyper_edits_recycle_bin', JSON.stringify(updatedBin));
      setActiveProjectMenu(null);
      alert('🗑️ Project moved to Recycle Bin! (Saved for 30 Days)');
    }
  };

  const convertToTemplate = (proj: any) => {
    const newTemplate = { ...proj, templateId: Date.now(), hasCropSupport: true };
    const updatedTemplates = [newTemplate, ...userTemplates];
    setUserTemplates(updatedTemplates);
    localStorage.setItem('hyper_edits_user_templates', JSON.stringify(updatedTemplates));
    setActiveProjectMenu(null);
    alert(`🎬 "${proj.title}" converted into Template with Photo/Video Swap & Crop support!`);
  };

  const restoreProject = (id: number) => {
    const itemToRestore = recycleBin.find(item => item.id === id);
    if (itemToRestore) {
      const updatedBin = recycleBin.filter(item => item.id !== id);
      const updatedProjects = [itemToRestore, ...savedProjects];
      setRecycleBin(updatedBin);
      setSavedProjects(updatedProjects);
      localStorage.setItem('hyper_edits_recycle_bin', JSON.stringify(updatedBin));
      localStorage.setItem('hyper_edits_projects', JSON.stringify(updatedProjects));
      alert('✓ Project recovered successfully!');
    }
  };

  if (!isAppMode) {
    return <Auth onGuestAccess={() => setIsAppMode(true)} />;
  }

  return (
    <div style={{ background: '#0D0E12', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Hidden File Input for Direct Gallery Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/*,image/*" 
        style={{ display: 'none' }} 
      />

      {/* TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#14151C', borderBottom: '1px solid #222431' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsDrawerOpen(true)}
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', color: '#FFF', cursor: 'pointer', border: '2px solid #00F2FF' }}
            >
              H
            </div>
            {isVipUser && (
              <span style={{ position: 'absolute', top: '-4px', right: '-8px', background: 'linear-gradient(90deg, #FF9500, #FF5E00)', color: '#FFF', fontSize: '8px', fontWeight: '900', padding: '2px 5px', borderRadius: '8px', border: '1px solid #FFF' }}>
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

        <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px', color: '#FFF' }}>
          HYPEREDITS <span style={{ color: '#00F2FF' }}>PRO</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setShowHistoryModal(true)}
            style={{ background: '#222431', border: '1px solid #333648', color: '#00F2FF', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            📜 History
          </button>
          <button onClick={() => setIsDrawerOpen(true)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '22px', cursor: 'pointer' }}>
            ☰
          </button>
        </div>
      </div>

      {/* SIDE SLIDE-IN DRAWER */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, display: 'flex' }}>
          <div onClick={() => setIsDrawerOpen(false)} style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)' }} />
          <div style={{ position: 'relative', width: '290px', background: '#14151C', height: '100%', borderRight: '1px solid #222431', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10001 }}>
            <div>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #222431', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7000FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#FFF' }}>H</div>
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
                      {isVipUser ? '⚡ PRO VIP Active' : 'FREE USER'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isVipUser && (
                  <div onClick={() => { setIsDrawerOpen(false); setShowPaymentModal(true); }} style={{ padding: '12px', background: 'linear-gradient(135deg, #2A1F0D, #1A1205)', border: '1px solid #FF950055', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF9500', fontWeight: 'bold' }}>
                    👑 Upgrade to VIP
                  </div>
                )}
                <div onClick={() => { setIsDrawerOpen(false); setShowSettingsModal(true); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FFF', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>⚙️ Settings</span>
                  <span style={{ color: '#666' }}>›</span>
                </div>
                <div onClick={() => { setIsDrawerOpen(false); setShowRecycleBinModal(true); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🗑️ Recycle Bin (30-Day)</span>
                  <span style={{ fontSize: '10px', color: '#FF9500' }}>{recycleBin.length}</span>
                </div>
                <div onClick={() => { setIsDrawerOpen(false); setShowHistoryModal(true); }} style={{ padding: '12px', background: '#1A1C24', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#DDD' }}>
                  📜 Payment & Token History
                </div>
                <div onClick={() => { if(confirm("Log out account?")) { setIsAppMode(false); setIsDrawerOpen(false); } }} style={{ padding: '12px', background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#FF4D4D', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
                  🚪 Sign Out
                </div>
              </div>
            </div>

            <div>
              <div style={{ borderTop: '1px solid #222431', paddingTop: '14px', textAlign: 'center', marginBottom: '12px' }}>
                <span onClick={() => { setIsDrawerOpen(false); setShowPolicyBrowser(true); }} style={{ color: '#007AFF', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}>Privacy Policy & Terms</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} style={{ width: '100%', padding: '10px', background: '#222431', border: 'none', color: '#FFF', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Close Menu ✕</button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD MAIN */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          
          {/* New Video Button - Directly Triggers Gallery File Picker */}
          <div onClick={handleNewProjectClick} style={{ background: 'linear-gradient(135deg, #1A2639, #111827)', border: '1px solid #00F2FF55', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#00F2FF', color: '#000', fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>+</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFF' }}>New video</div>
          </div>

          <div onClick={handleNewProjectClick} style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '16px', padding: '22px 16px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#00F2FF', color: '#000', fontSize: '8px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '6px' }}>Nano Banana 2</span>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🖼️</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#DDD' }}>Edit photo</div>
          </div>
        </div>

        {/* 7 AI TOOLS */}
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
            <div key={idx} onClick={handleNewProjectClick} style={{ background: '#14151C', border: '1px solid #222431', borderRadius: '12px', padding: '12px 6px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{tool.icon}</div>
              <div style={{ fontSize: '11px', color: '#AAA', fontWeight: '500' }}>{tool.name}</div>
            </div>
          ))}
        </div>

        {/* PROJECTS SECTION WITH AUTO-SAVE & 3-DOTS OPTIONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>Projects ({savedProjects.length})</h3>
          <span style={{ fontSize: '11px', color: '#00F2FF', background: '#14151C', padding: '4px 8px', borderRadius: '6px', border: '1px solid #222431' }}>⚡ Auto-Saved</span>
        </div>

        {savedProjects.length === 0 ? (
          <div style={{ background: '#14151C', border: '1px dashed #222431', borderRadius: '12px', padding: '36px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.5 }}>📁</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#888' }}>No project files found</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Tap 'New video' to pick gallery photo/video</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedProjects.map((item) => (
              <div key={item.id} style={{ position: 'relative', background: '#14151C', borderRadius: '12px', border: '1px solid #222431', padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={() => setActiveTab('editor')}>
                  <div style={{ width: '56px', height: '56px', background: '#222431', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎥</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>📅 {item.date}</div>
                    <div style={{ fontSize: '10px', color: '#00F2FF', marginTop: '2px' }}>✂️ {item.size} | ⏱️ {item.duration}</div>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProjectMenu(activeProjectMenu === item.id ? null : item.id);
                  }}
                  style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#AAA', fontSize: '18px', cursor: 'pointer', padding: '4px' }}
                >
                  ⋮
                </button>

                {activeProjectMenu === item.id && (
                  <div style={{ position: 'absolute', top: '38px', right: '12px', background: '#1A1C24', border: '1px solid #333648', borderRadius: '10px', padding: '6px', zIndex: 99, boxShadow: '0 4px 15px rgba(0,0,0,0.8)', minWidth: '160px' }}>
                    <div onClick={() => convertToTemplate(item)} style={{ padding: '8px 10px', fontSize: '12px', color: '#00F2FF', cursor: 'pointer', borderRadius: '6px' }}>🎬 Convert to Template</div>
                    <div onClick={() => moveToRecycleBin(item.id)} style={{ padding: '8px 10px', fontSize: '12px', color: '#FF4D4D', cursor: 'pointer', borderRadius: '6px' }}>🗑️ Move to Recycle Bin</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10005, overflowY: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '20px' }}>
            <button onClick={() => setShowSettingsModal(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '20px', cursor: 'pointer' }}>‹</button>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>Settings</span>
            <div style={{ width: '20px' }}></div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#888', marginBottom: '12px' }}>Account</div>
            <div style={{ background: '#14151C', borderRadius: '12px', border: '1px solid #222431' }}>
              <div onClick={() => setIsEditingName(true)} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', cursor: 'pointer' }}>
                <span style={{ fontSize: '14px', color: '#FFF' }}>Edit profile</span>
                <span style={{ color: '#666' }}>›</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#888', marginBottom: '12px' }}>Preferences</div>
            <div style={{ background: '#14151C', borderRadius: '12px', border: '1px solid #222431' }}>
              <div onClick={() => setShowLanguageModal(true)} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', cursor: 'pointer' }}>
                <span style={{ fontSize: '14px', color: '#FFF' }}>App language</span>
                <span style={{ fontSize: '13px', color: '#00F2FF' }}>{selectedLanguage} ›</span>
              </div>
            </div>
          </div>

          <button onClick={() => { setIsAppMode(false); setShowSettingsModal(false); }} style={{ width: '100%', padding: '14px', background: '#1A1C24', border: '1px solid #222431', color: '#FF4D4D', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Sign out</button>
        </div>
      )}

      {/* LANGUAGE MODAL */}
      {showLanguageModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10006, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#00F2FF', fontSize: '16px' }}>Select App Language</h3>
            <button onClick={() => setShowLanguageModal(false)} style={{ background: '#222431', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close ✕</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {languagesList.map((lang) => (
              <div key={lang} onClick={() => { setSelectedLanguage(lang); setShowLanguageModal(false); }} style={{ padding: '14px', background: selectedLanguage === lang ? '#1A2639' : '#14151C', border: selectedLanguage === lang ? '1px solid #00F2FF' : '1px solid #222431', borderRadius: '10px', color: '#FFF', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px' }}>{lang}</span>
                {selectedLanguage === lang && <span style={{ color: '#00F2FF' }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECYCLE BIN MODAL */}
      {showRecycleBinModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10002, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#FF9500', fontSize: '16px' }}>🗑️ Recycle Bin (30-Day Trash)</h3>
            <button onClick={() => setShowRecycleBinModal(false)} style={{ background: '#222431', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close ✕</button>
          </div>
          {recycleBin.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#555', fontSize: '13px' }}>Your Trash is empty.</div>
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

      {/* POLICY MODAL */}
      {showPolicyModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 10003, padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#00F2FF', fontSize: '16px' }}>गोपनीयता नीति एवं नियम व शर्तें</h3>
            <button onClick={() => setShowPolicyBrowser(false)} style={{ background: '#222431', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close ✕</button>
          </div>
          <div style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.6' }}>
            <p>1. उपयोगकर्ता का डेटा उनके स्वयं के डिवाइस के लोकल स्टोरेज में ही सुरक्षित रहता है।</p>
            <p>2. सहायता एवं संपर्क: <strong>hs8822365@gmail.com</strong></p>
          </div>
        </div>
      )}

      {showPaymentModal && <PowerPaymentEngine onClose={() => setShowPaymentModal(false)} />}
      {showHistoryModal && <UserProfileHistory onClose={() => setShowHistoryModal(false)} />}
      
      {/* EDITOR OVERLAY WITH AUTOMATIC PROJECT CREATION & AUTO-SAVE */}
      {activeTab === 'editor' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0D0E12', zIndex: 9999, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', background: '#14151C', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222431' }}>
            <button 
              onClick={() => {
                const now = new Date();
                const liveStamp = now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
                
                const autoSavedProj = {
                  id: Date.now(),
                  title: 'Project_' + (savedProjects.length + 1),
                  date: liveStamp,
                  size: '34 MB',
                  duration: '00:18'
                };
                const updated = [autoSavedProj, ...savedProjects];
                setSavedProjects(updated);
                localStorage.setItem('hyper_edits_projects', JSON.stringify(updated));
                
                setActiveTab('projects');
              }} 
              style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ← Back to Projects (Auto-Save)
            </button>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>CapCut Workspace</span>
            <div></div>
          </div>
          <EditorFeatures />
        </div>
      )}

    </div>
  );
}
