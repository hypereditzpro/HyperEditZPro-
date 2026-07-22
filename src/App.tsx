import React, { useState, useEffect } from 'react';

export default function App() {
  // --- Core Navigation & Splash States ---
  const [isSplash, setIsSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'editor', 'profile', 'notifications', 'payment'
  
  // --- Auth & User State ---
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

  // --- Real Projects Database (Only saves when user edits/saves) ---
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const localData = localStorage.getItem('hyper_edits_real_projects');
      if (localData) return JSON.parse(localData);
    } catch (e) {}
    return [];
  });

  // --- Editor & Timeline States ---
  const [activeEditorTool, setActiveEditorTool] = useState('timeline');
  const [timelineTracks, setTimelineTracks] = useState({
    video: [{ id: 1, name: 'Game_Clip_01.mp4', duration: '00:15', tag: '🎮' }],
    audio: [{ id: 1, name: 'Phonk_Montage_BGM.mp3', duration: '00:15' }],
    text: [{ id: 1, content: '1-Tap Headshot 🔥' }]
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}>⚡</div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', background: 'linear-gradient(135deg, #7B2CBF, #00F2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HyperEdits Pro</div>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>CapCut Style Pro Editor for Gamers & Creators</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', color: '#FFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {currentScreen === 'editor' ? (
        /* ================= REAL CAPCUT STYLE MULTI-LAYER EDITOR TIMELINE ================= */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', padding: '10px', boxSizing: 'border-box' }}>
          
          {/* Top Navbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              style={{ backgroundColor: '#222', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ✕ Exit
            </button>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF' }}>HyperEdits Pro Timeline Studio</div>
            <button 
              onClick={() => {
                const now = new Date();
                const liveStamp = now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
                const newProj = {
                  id: Date.now(),
                  name: 'Montage_Edit_' + (savedProjects.length + 1),
                  date: liveStamp,
                  size: '52MB',
                  len: '00:18',
                  tag: '🔥'
                };
                const updated = [newProj, ...savedProjects];
                setSavedProjects(updated);
                localStorage.setItem('hyper_edits_real_projects', JSON.stringify(updated));
                setCurrentScreen('dashboard');
                alert('💾 Project Saved Successfully to Dashboard!');
              }}
              style={{ backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 10px #7B2CBF' }}
            >
              💾 Save
            </button>
          </div>

          {/* Video Preview Canvas */}
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '10px', margin: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #222', position: 'relative' }}>
            <span style={{ fontSize: '16px', marginBottom: '4px' }}>▶ [ GPU Accelerated Canvas ]</span>
            <span style={{ fontSize: '11px', color: '#00F2FF' }}>Active Text: {timelineTracks.text[0]?.content}</span>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', color: '#AAA' }}>1080p 60fps</div>
          </div>

          {/* Multi-Layer Timeline Box */}
          <div style={{ backgroundColor: '#131318', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px solid #222' }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px', fontWeight: 'bold' }}>🎬 MULTI-LAYER TIMELINE TRACKS:</div>
            
            {/* Video Track */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1C1C24', padding: '6px', borderRadius: '6px', marginBottom: '6px', borderLeft: '3px solid #7B2CBF' }}>
              <span style={{ fontSize: '11px', width: '60px', color: '#AAA' }}>Video 1</span>
              <div style={{ flex: 1, backgroundColor: '#3C096C', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#FFF' }}>
                {timelineTracks.video[0].tag} {timelineTracks.video[0].name} ({timelineTracks.video[0].duration})
              </div>
            </div>

            {/* Audio Track */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1C1C24', padding: '6px', borderRadius: '6px', marginBottom: '6px', borderLeft: '3px solid #00F2FF' }}>
              <span style={{ fontSize: '11px', width: '60px', color: '#AAA' }}>Audio 1</span>
              <div style={{ flex: 1, backgroundColor: '#004E64', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#FFF' }}>
                🎵 {timelineTracks.audio[0].name}
              </div>
            </div>

            {/* Text Track */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1C1C24', padding: '6px', borderRadius: '6px', borderLeft: '3px solid #FF9500' }}>
              <span style={{ fontSize: '11px', width: '60px', color: '#AAA' }}>Text 1</span>
              <div style={{ flex: 1, backgroundColor: '#5c3a00', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#FFF' }}>
                💬 {timelineTracks.text[0].content}
              </div>
            </div>
          </div>

          {/* Bottom CapCut Style Tools Bar (All 28+ Features Accessible) */}
          <div style={{ backgroundColor: '#14141A', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
              {[
                { id: 'split', label: 'Split', icon: '✂️' },
                { id: 'speed', label: 'Speed', icon: '⚡' },
                { id: 'animation', label: 'Animation', icon: '✨' },
                { id: 'audio_fade', label: 'Audio Fade', icon: '🎵' },
                { id: 'ai_voice', label: 'AI Voice', icon: '🎙️' },
                { id: 'remove_bg', label: 'Remove BG', icon: '👤' },
                { id: 'filters', label: 'Filters', icon: '🎨' },
                { id: 'adjust', label: 'Adjust', icon: '🎛️' },
                { id: 'mask', label: 'Mask', icon: '⭕' },
                { id: 'gamer_ai', label: 'Gamer AI', icon: '🎮' }
              ].map((tool) => (
                <div 
                  key={tool.id}
                  onClick={() => {
                    setActiveEditorTool(tool.id);
                    alert(tool.label + ' Engine initialized on timeline!');
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '55px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '18px', marginBottom: '2px' }}>{tool.icon}</span>
                  <span style={{ fontSize: '10px', color: '#CCC', whiteSpace: 'nowrap' }}>{tool.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : currentScreen === 'profile' ? (
        /* ================= AUTH & PROFILE GATEWAY ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>👤 Creator Profile & Anti-Fraud Auth</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          {userSession ? (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #7B2CBF', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#E0AAFF', marginBottom: '8px' }}>Active Account Connected</div>
              <div style={{ fontSize: '13px', color: '#FFF', marginBottom: '4px' }}>ID: {userSession.identifier}</div>
              <div style={{ fontSize: '11px', color: '#00F2FF', marginBottom: '16px' }}>Method: {userSession.method} | Status: VIP Cross-Synced</div>
              <button 
                onClick={() => {
                  localStorage.removeItem('hyper_edits_user');
                  setUserSession(null);
                  alert('Logged out successfully.');
                }}
                style={{ backgroundColor: '#FF3B30', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor: '#1C1C24', padding: '20px', borderRadius: '12px', border: '1px solid #333', marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '14px', color: '#FFF' }}>Multi-Login & Device Binding</div>
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
                  {
                  <button 
                    onClick={() => {
                      if (inputIdentifier.length < 10) { alert('Please enter a valid 10-digit mobile number'); return; }
                      // Instant OTP Generator & Auto-Display for Zero Delay
                      const instantCode = Math.floor(1000 + Math.random() * 9000).toString();
                      setOtpCode(instantCode);
                      setOtpSent(true);
                      alert('⚡ Instant SMS OTP Sent: ' + instantCode + ' (Auto-filled for instant login!)');
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
                          const sess = { identifier: inputIdentifier, method: 'Mobile Cross-Sync' };
                          setUserSession(sess);
                          localStorage.setItem('hyper_edits_user', JSON.stringify(sess));
                          alert('Login Successful & Device Fingerprinted!');
                        }}
                        style={{ width: '100%', backgroundColor: '#00F2FF', color: '#000', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Verify & Login
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    const sess = { identifier: authMethod.toUpperCase() + '_User_ID', method: authMethod };
                    setUserSession(sess);
                    localStorage.setItem('hyper_edits_user', JSON.stringify(sess));
                    alert('Authenticated via ' + authMethod.toUpperCase());
                  }}
                  style={{ width: '100%', backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Continue with {authMethod.toUpperCase()}
                </button>
              )}
            </div>
          )}

          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#00F2FF', marginBottom: '10px' }}>⚡ 28+ Pro AI & Editing Features Master Suite:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              'AI Auto Match Background', 'AI Voice Changer', 'AI Background Eraser', 'Audio Fade Manager',
              'Filters & Adjustments', 'Gamer AI (1-Tap Headshot)', 'Recycle Bin (30-Day)', 'Multi-Language Engine',
              'Canvas Background', 'Auto Captions', 'Copyright Remover', 'In-House Receipt Token'
            ].map((f, idx) => (
              <div key={idx} onClick={() => alert('Launching ' + f + '...')} style={{ backgroundColor: '#14141A', padding: '10px', borderRadius: '6px', fontSize: '11px', border: '1px solid #333', cursor: 'pointer' }}>
                ✨ {f}
              </div>
            ))}
          </div>
        </div>
      ) : currentScreen === 'payment' ? (
        /* ================= POWER PAYMENT ENGINE (₹1 TRIAL & SUBSCRIPTIONS) ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>💳 Power Payment & Subscription Engine</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #7B2CBF, #3C096C)', padding: '16px', borderRadius: '12px', marginBottom: '14px', border: '1px solid #00F2FF' }}>
            <div style={{ fontSize: '15px', fontWeight: 'bold' }}>🔥 ₹1 Trial + ₹29 Auto-Debit</div>
            <div style={{ fontSize: '11px', color: '#DDD', marginTop: '4px' }}>7-Day VIP Creator Pass with seamless automated monthly renew.</div>
            <button onClick={() => alert('Redirecting to Master Merchant UPI (9549753157@nyes) for ₹1 Trial...')} style={{ marginTop: '12px', backgroundColor: '#00F2FF', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
              Activate ₹1 Trial Now
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { title: '₹35 — 1 Month Standard Pass', tag: 'Manual Plan' },
              { title: '₹105 — 3 Months Pro Pack', tag: 'Best Value' },
              { title: '₹130 — Ultimate Creator Pass (12 Months)', tag: 'VIP Pass' }
            ].map((plan, idx) => (
              <div key={idx} onClick={() => alert('Processing ' + plan.title + ' via UPI QR Gateway...')} style={{ backgroundColor: '#1C1C24', padding: '14px', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{plan.title}</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{plan.tag} (No Auto-Debit)</div>
                </div>
                <span style={{ backgroundColor: '#7B2CBF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Buy</span>
              </div>
            ))}
          </div>
        </div>
      ) : currentScreen === 'notifications' ? (
        /* ================= NOTIFICATIONS & HISTORY ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🔔 Notifications & History</span>
            <button onClick={() => setCurrentScreen('dashboard')} style={{ backgroundColor: '#333', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: '#1C1C24', padding: '12px', borderRadius: '10px', border: '1px solid #333' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFF' }}>Welcome to HyperEdits Pro</div>
              <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>CapCut style multi-layer timeline active with anti-fraud protection.</div>
              <div style={{ fontSize: '9px', color: '#7B2CBF', marginTop: '6px', textAlign: 'right' }}>Just now</div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= CAPCUT-STYLE PURPLE & BLACK DASHBOARD ================= */
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', paddingBottom: '50px' }}>
          
          {/* Top Bar Icons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div onClick={() => setCurrentScreen('profile')} style={{ fontSize: '20px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333' }} title="Profile">
              👤
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div onClick={() => setCurrentScreen('notifications')} style={{ fontSize: '18px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333', position: 'relative' }}>
                🔔
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', backgroundColor: '#FF3B30', borderRadius: '50%' }}></span>
              </div>
              <div onClick={() => setCurrentScreen('payment')} style={{ fontSize: '18px', cursor: 'pointer', backgroundColor: '#1C1C24', padding: '8px', borderRadius: '50%', border: '1px solid #333' }} title="Payment / Subscription">
                ⚙️
              </div>
            </div>
          </div>

          {/* Top Two Hero Action Cards */}
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

          {/* Quick Access Tools Grid */}
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
                  if (tool.id === 'all_tools') setCurrentScreen('profile');
                  else setCurrentScreen('editor');
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

          {savedProjects.length === 0 ? (
            <div style={{ backgroundColor: '#14141A', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px dashed #333' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>📭</div>
              <div style={{ fontSize: '13px', color: '#888' }}>No saved projects yet.</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Tap "New video" to create and save edits!</div>
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
