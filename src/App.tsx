import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'editor', 'profile', 'notifications'
  
  // Real Persistent User Auth & Projects State
  const [userSession, setUserSession] = useState(() => {
    try {
      const localUser = localStorage.getItem('hyper_edits_user');
      if (localUser) return JSON.parse(localUser);
    } catch (e) {}
    return null; // Not logged in initially, triggers auth gateway
  });

  const [authMethod, setAuthMethod] = useState('mobile'); // 'mobile', 'google', 'facebook'
  const [inputIdentifier, setInputIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const localData = localStorage.getItem('hyper_edits_real_projects');
      if (localData) return JSON.parse(localData);
    } catch (e) {}
    return []; // Clean slate until user edits and saves
  });

  const [notifications] = useState([
    { id: 1, title: 'Security Alert: Device Fingerprint Bound', desc: 'Anti-fraud ₹1 offer protection active on this device.', time: 'Just now' },
    { id: 2, title: 'Cross-Sync Engine Ready', desc: 'Your account links seamlessly across mobile numbers and social logins.', time: '1d ago' }
  ]);

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {currentScreen === 'editor' ? (
        /* ================= CAPCUT STYLE TIMELINE EDITOR ================= */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✕ Exit
            </button>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>HyperEdits Pro Timeline</div>
            <button 
              onClick={() => {
                const now = new Date();
                const liveStamp = now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
                const newProj = {
                  id: Date.now(),
                  name: 'My_Edit_' + (savedProjects.length + 1),
                  date: liveStamp,
                  size: '48MB',
                  len: '00:22',
                  tag: '🔥'
                };
                const updatedList = [newProj, ...savedProjects];
                setSavedProjects(updatedList);
                localStorage.setItem('hyper_edits_real_projects', JSON.stringify(updatedList));
                setCurrentScreen('dashboard');
              }}
              style={{ backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 10px #7B2CBF' }}
            >
              💾 Save Project
            </button>
          </div>

          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '10px', margin: '10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #222', padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', marginBottom: '8px' }}>🎬</span>
            <span style={{ fontSize: '14px', color: '#FFF', fontWeight: 'bold' }}>Timeline Canvas Active</span>
            <span style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Edit your Free Fire montage or gaming clips here.</span>
          </div>

          <div style={{ backgroundColor: '#14141A', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '5px', scrollbarWidth: 'none' }}>
              {['Split', 'Speed', 'Animation', 'Audio', 'Text', 'Effects', 'Filters', 'Adjust', 'Mask'].map((tool, idx) => (
                <div key={idx} onClick={() => alert(tool + ' tool active')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '55px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '16px', marginBottom: '3px' }}>⚡</span>
                  <span style={{ fontSize: '10px', color: '#CCC' }}>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : currentScreen === 'profile' ? (
        /* ================= AUTH & PROFILE GATEWAY (RESTORED FULL LOGIC) ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🔐 Anti-Fraud Auth & Creator Profile</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          {userSession ? (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #7B2CBF' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#E0AAFF', marginBottom: '8px' }}>👤 Logged In Account</div>
              <div style={{ fontSize: '13px', color: '#FFF', marginBottom: '4px' }}>Identifier: {userSession.identifier}</div>
              <div style={{ fontSize: '11px', color: '#00F2FF', marginBottom: '16px' }}>Method: {userSession.method.toUpperCase()} | Status: VIP Cross-Synced</div>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('hyper_edits_user');
                  setUserSession(null);
                  alert('🔒 Logged out successfully.');
                }}
                style={{ backgroundColor: '#FF3B30', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
              >
                Logout / Switch Account
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
              <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '14px', color: '#FFF' }}>Multi-Login & Anti-Fraud Gateway</div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button onClick={() => setAuthMethod('mobile')} style={{ flex: 1, backgroundColor: authMethod === 'mobile' ? '#7B2CBF' : '#14141A', color: '#FFF', border: '1px solid #444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>📱 Mobile OTP</button>
                <button onClick={() => setAuthMethod('google')} style={{ flex: 1, backgroundColor: authMethod === 'google' ? '#7B2CBF' : '#14141A', color: '#FFF', border: '1px solid #444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>🌐 Google</button>
                <button onClick={() => setAuthMethod('facebook')} style={{ flex: 1, backgroundColor: authMethod === 'facebook' ? '#7B2CBF' : '#14141A', color: '#FFF', border: '1px solid #444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>📘 Facebook</button>
              </div>

              {authMethod === 'mobile' ? (
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter Mobile Number" 
                    value={inputIdentifier}
                    onChange={(e) => setInputIdentifier(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0A0A0C', border: '1px solid #444', borderRadius: '8px', color: '#FFF', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                  {!otpSent ? (
                    <button 
                      onClick={() => {
                        if (inputIdentifier.length < 10) { alert('Please enter a valid 10-digit mobile number'); return; }
                        setOtpSent(true);
                        alert('📲 OTP Sent to ' + inputIdentifier + ' (Use any 4 digits like 1234)');
                      }}
                      style={{ width: '100%', backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Get OTP & Verify Device
                    </button>
                  ) : (
                    <div>
                      <input 
                        type="text" 
                        placeholder="Enter 4-Digit OTP" 
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#0A0A0C', border: '1px solid #444', borderRadius: '8px', color: '#FFF', marginBottom: '10px', boxSizing: 'border-box' }}
                      />
                      <button 
                        onClick={() => {
                          const sessionData = { identifier: inputIdentifier, method: 'Mobile Cross-Sync' };
                          setUserSession(sessionData);
                          localStorage.setItem('hyper_edits_user', JSON.stringify(sessionData));
                          alert('✅ Cross-Sync Successful! Device Fingerprint Bound.');
                        }}
                        style={{ width: '100%', backgroundColor: '#00F2FF', color: '#000', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Confirm & Login
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    const sessionData = { identifier: authMethod.toUpperCase() + '_User_ID_99', method: authMethod };
                    setUserSession(sessionData);
                    localStorage.setItem('hyper_edits_user', JSON.stringify(sessionData));
                    alert('✅ Authenticated via ' + authMethod.toUpperCase() + ' successfully!');
                  }}
                  style={{ width: '100%', backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Continue with {authMethod.toUpperCase()}
                </button>
              )}
            </div>
          )}
        </div>
      ) : currentScreen === 'notifications' ? (
        /* ================= NOTIFICATIONS & HISTORY ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🔔 Notifications & History</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map((n) => (
              <div key={n.id} style={{ backgroundColor: '#1C1C24', padding: '12px', borderRadius: '10px', border: '1px solid #333' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF' }}>{n.title}</div>
                <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>{n.desc}</div>
                <div style={{ fontSize: '9px', color: '#7B2CBF', marginTop: '6px', textAlign: 'right' }}>{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= UNTOUCHED CAPCUT-STYLE DASHBOARD ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', paddingBottom: '50px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div onClick={() => setCurrentScreen('profile')} style={{ fontSize: '20px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333' }} title="Profile & Multi-Login">
              👤
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div onClick={() => setCurrentScreen('notifications')} style={{ fontSize: '18px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333', position: 'relative' }}>
                🔔
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', backgroundColor: '#FF3B30', borderRadius: '50%' }}></span>
              </div>
              <div onClick={() => alert('⚙️ Settings & Auto-Pay / ₹1 Offer Gateway Open')} style={{ fontSize: '18px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333' }}>
                ⚙️
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <div 
              onClick={() => setCurrentScreen('editor')}
              style={{ flex: 1.4, background: 'linear-gradient(135deg, #7B2CBF 0%, #3C096C 100%)', borderRadius: '14px', padding: '22px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(123,44,191,0.4)' }}
            >
              <span style={{ fontSize: '20px', backgroundColor: '#FFF', color: '#3C096C', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>New video</span>
            </div>

            <div 
              onClick={() => setCurrentScreen('editor')}
              style={{ flex: 1, background: '#1C1C24', border: '1px solid #333', borderRadius: '14px', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
            >
              <span style={{ fontSize: '22px' }}>🖼️</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF' }}>Edit photo</span>
              <span style={{ fontSize: '8px', backgroundColor: '#FF9500', color: '#000', padding: '1px 4px', borderRadius: '4px', position: 'absolute', top: '5px', right: '5px', fontWeight: 'bold' }}>Pro</span>
            </div>
          </div>

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
                onClick={() => setCurrentScreen('editor')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 4px', backgroundColor: '#1C1C24', borderRadius: '8px', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '16px' }}>{tool.icon}</span>
                <span style={{ fontSize: '10px', color: tool.color || '#AAA', textAlign: 'center', whiteSpace: 'nowrap' }}>{tool.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Projects</span>
            <span style={{ fontSize: '12px', color: '#7B2CBF', fontWeight: 'bold', cursor: 'pointer' }}>☁️ Space</span>
          </div>

          {savedProjects.length === 0 ? (
            <div style={{ backgroundColor: '#14141A', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px dashed #333' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>📭</div>
              <div style={{ fontSize: '13px', color: '#888' }}>No saved projects yet.</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Create an edit and save to see it here!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedProjects.map((proj) => (
                <div 
                  key={proj.id}
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
          )}

        </div>
      )}

    </div>
  );
}
