import React, { useState, useEffect } from 'react';

export default function App() {
  const [isSplash, setIsSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  
  const [userSession, setUserSession] = useState(() => {
    try {
      const localUser = localStorage.getItem('hyper_edits_user');
      if (localUser) return JSON.parse(localUser);
    } catch (e) {}
    return null;
  });
  const [authMethod, setAuthMethod] = useState('mobile');
  const [inputIdentifier, setInputIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const localData = localStorage.getItem('hyper_edits_real_projects');
      if (localData) return JSON.parse(localData);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#7B2CBF' }}>HyperEdits Pro</div>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>CapCut Style Pro Editor</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', color: '#FFF', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      {currentScreen === 'editor' ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#222', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>✕ Exit</button>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>HyperEdits Timeline</div>
            <button onClick={() => {
              const now = new Date();
              const liveStamp = now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
              const newProj = { id: Date.now(), name: 'Edit_' + (savedProjects.length + 1), date: liveStamp, size: '45MB', len: '00:15', tag: '🔥' };
              const updated = [newProj, ...savedProjects];
              setSavedProjects(updated);
              localStorage.setItem('hyper_edits_real_projects', JSON.stringify(updated));
              setCurrentScreen('dashboard');
            }} style={{ backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>💾 Save</button>
          </div>

          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '10px', margin: '8px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #222' }}>
            <span style={{ fontSize: '14px', color: '#888' }}>▶ Preview Canvas</span>
          </div>

          <div style={{ backgroundColor: '#131318', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px solid #222' }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>🎬 Timeline Tracks Active</div>
            <div style={{ backgroundColor: '#1C1C24', padding: '6px', borderRadius: '6px', fontSize: '11px', color: '#FFF' }}>Video 1: Game_Clip.mp4</div>
          </div>

          <div style={{ backgroundColor: '#14141A', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {['Split', 'Speed', 'Animation', 'Audio', 'Text', 'Effects', 'Filters', 'Adjust', 'Mask'].map((t, idx) => (
                <div key={idx} onClick={() => alert(t + ' tool active')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '55px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '16px' }}>⚡</span>
                  <span style={{ fontSize: '10px', color: '#CCC' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : currentScreen === 'profile' ? (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>👤 Auth & Profile</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          {userSession ? (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #7B2CBF' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#E0AAFF' }}>Logged in as: {userSession.identifier}</div>
              <button onClick={() => { localStorage.removeItem('hyper_edits_user'); setUserSession(null); alert('Logged out'); }} style={{ marginTop: '10px', backgroundColor: '#FF3B30', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
            </div>
          ) : (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>Instant Mobile OTP Login</div>
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
                    if (inputIdentifier.length < 10) { alert('Enter valid 10-digit number'); return; }
                    const instantCode = Math.floor(1000 + Math.random() * 9000).toString();
                    setOtpCode(instantCode);
                    setOtpSent(true);
                    alert('⚡ Instant OTP Generated: ' + instantCode);
                  }}
                  style={{ width: '100%', backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Send Instant OTP
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
                      const sess = { identifier: inputIdentifier, method: 'Mobile OTP' };
                      setUserSession(sess);
                      localStorage.setItem('hyper_edits_user', JSON.stringify(sess));
                      alert('Login Successful!');
                    }}
                    style={{ width: '100%', backgroundColor: '#00F2FF', color: '#000', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Verify & Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div onClick={() => setCurrentScreen('profile')} style={{ fontSize: '20px', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>👤</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div onClick={() => alert('Notifications')} style={{ fontSize: '18px', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>🔔</div>
              <div onClick={() => alert('Settings')} style={{ fontSize: '18px', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>⚙️</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <div onClick={() => setCurrentScreen('editor')} style={{ flex: 1.4, background: 'linear-gradient(135deg, #7B2CBF, #3C096C)', borderRadius: '14px', padding: '22px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px', backgroundColor: '#FFF', color: '#3C096C', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>New video</span>
            </div>
            <div onClick={() => setCurrentScreen('editor')} style={{ flex: 1, backgroundColor: '#1C1C24', border: '1px solid #333', borderRadius: '14px', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '22px' }}>🖼️</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Edit photo</span>
            </div>
          </div>

          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Projects</div>
          {savedProjects.length === 0 ? (
            <div style={{ backgroundColor: '#14141A', padding: '25px', borderRadius: '12px', textAlign: 'center', color: '#888', border: '1px dashed #333' }}>
              No saved projects yet. Tap "New video" to start!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedProjects.map((p) => (
                <div key={p.id} onClick={() => setCurrentScreen('editor')} style={{ backgroundColor: '#1C1C24', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{p.name}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{p.date}</div>
                  </div>
                  <span>▶</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
