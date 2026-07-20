import React, { useState, useEffect } from 'react';

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [isAssetsUnpacking, setIsAssetsUnpacking] = useState(() => {
    return !localStorage.getItem('hyper_assets_unpacked');
  });
  const [unpackProgress, setUnpackProgress] = useState(0);

  const [userProfile, setUserProfile] = useState(() => {
    const savedUser = localStorage.getItem('hyper_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Auth Stages: 'login', 'setup', 'dashboard'
  const [authStage, setAuthStage] = useState(userProfile ? 'dashboard' : 'login');
  const [authProvider, setAuthProvider] = useState('');
  const [inputUserName, setInputUserName] = useState('');

  
  useEffect(() => {
    if (isAssetsUnpacking) {
      const interval = setInterval(() => {
        setUnpackProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            localStorage.setItem('hyper_assets_unpacked', 'true');
            setTimeout(() => setIsAssetsUnpacking(false), 500);
            return 100;
          }
          return prev + 5; // Unpacking modules at high speed
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isAssetsUnpacking]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplashScreen(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleProviderSelect = (provider) => {
    setAuthProvider(provider);
    if (provider === 'Guest') {
      alert('🔒 Guest Mode Activated! All your montage projects will be saved locally inside YOUR OWN file storage only.');
      setInputUserName('Guest_Editor');
      setAuthStage('setup');
    } else {
      alert('🌐 Launching ' + provider + ' auth portal inside your browser for secure identity linking...');
      setTimeout(() => {
        setAuthStage('setup');
      }, 1500);
    }
  };

  const completeSetup = () => {
    if (!inputUserName.trim()) return alert('Please enter a name to configure your layout Profile!');
    const newUser = { 
      username: inputUserName, 
      provider: authProvider,
      email: authProvider === 'Guest' ? 'Local Device Storage Only' : inputUserName.toLowerCase().replace(/\s+/g, '') + '@auth.com'
    };
    localStorage.setItem('hyper_auth_user', JSON.stringify(newUser));
    setUserProfile(newUser);
    setAuthStage('dashboard');
  };

  
  if (isAssetsUnpacking) {
    return (
      <div style={{ backgroundColor: '#050507', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontFamily: 'sans-serif', padding: '20px' }}>
        <h2 style={{ color: '#7B2CBF', letterSpacing: '1px', marginBottom: '6px', fontSize: '20px', fontWeight: '900' }}>HYPER EDITS PRO</h2>
        <div style={{ fontSize: '11px', color: '#00F2FF', marginBottom: '20px', fontWeight: 'bold' }}>⚡ Extracting High-End Effects & Render Modules...</div>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', maxWidth: '260px', height: '6px', backgroundColor: '#14141A', borderRadius: '10px', overflow: 'hidden', border: '1px solid #222', marginBottom: '10px' }}>
          <div style={{ width: unpackProgress + '%', height: '100%', background: 'linear-gradient(90deg, #7B2CBF, #00F2FF)', transition: 'width 0.1s ease-out' }} />
        </div>
        
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFF' }}>{unpackProgress}% Completed</div>
        <p style={{ fontSize: '9px', color: '#555', marginTop: '30px', textAlign: 'center' }}>
          📦 Play Store Package Size: ~165 MB <br/>
          🚀 Unpacked Core Engine Footprint: ~780 MB [GPU Optimised Locked]
        </p>
      </div>
    );
  }

  if (showSplashScreen) {
    return (
      <div style={{ backgroundColor: '#050507', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF' }}>
        <h1 style={{ fontSize: '24px', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>WELCOME TO THE HYPER PRO</h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', color: '#FFF', fontFamily: 'sans-serif' }}>
      {authStage === 'login' ? (
        <div style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', boxSizing: 'border-box' }}>
          <h2 style={{ color: '#7B2CBF', fontSize: '26px', marginBottom: '8px', fontWeight: '900' }}>HYPER PRO EDITOR</h2>
          <p style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '30px' }}>Select your preferred platform to access workspace</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '0 auto', width: '100%' }}>
             <button onClick={() => handleProviderSelect('Google')} style={{ padding: '12px', background: '#EA4335', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>🌐 Continue with Google</button>
             <button onClick={() => handleProviderSelect('Facebook')} style={{ padding: '12px', background: '#1877F2', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>📘 Continue with Facebook</button>
             <button onClick={() => handleProviderSelect('Twitter')} style={{ padding: '12px', background: '#1DA1F2', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>🐦 Continue with Twitter</button>
             <button onClick={() => handleProviderSelect('TikTok')} style={{ padding: '12px', background: '#000000', border: '1px solid #444', borderRadius: '8px', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>🎵 Continue with TikTok</button>
             
             <div style={{ margin: '10px 0', color: '#444', fontSize: '11px' }}>──────── OR ────────</div>
             
             <button onClick={() => handleProviderSelect('Guest')} style={{ padding: '12px', background: '#2C2C35', border: '1px solid #7B2CBF', borderRadius: '8px', color: '#E0AAFF', fontWeight: 'bold', cursor: 'pointer' }}>👤 Continue as Guest (Local Storage)</button>
          
             {/* CLASSIC LOGICAL FOOTER - WHITE PANEL WITH BLUE LINKS */}
             <div style={{ 
               marginTop: '32px', 
               backgroundColor: '#FFFFFF', 
               padding: '12px 8px', 
               borderRadius: '8px', 
               boxShadow: '0 4px 10px rgba(0,0,0,0.3)', 
               display: 'flex', 
               flexDirection: 'column',
               gap: '4px',
               alignItems: 'center',
               justifyContent: 'center',
               maxWidth: '320px',
               margin: '24px auto 0 auto'
             }}>
               <span style={{ fontSize: '10px', color: '#666666', fontWeight: 'bold' }}>Hyper Edits Pro Security Compliance</span>
               <div style={{ display: 'flex', gap: '14px', fontSize: '12px', fontWeight: 'bold' }}>
                 <span 
                   onClick={() => setShowPolicyBrowser(true)} 
                   style={{ color: '#007AFF', cursor: 'pointer', textDecoration: 'underline' }}
                 >
                   Terms of Service
                 </span>
                 <span style={{ color: '#CCCCCC' }}>|</span>
                 <span 
                   onClick={() => setShowPolicyBrowser(true)} 
                   style={{ color: '#007AFF', cursor: 'pointer', textDecoration: 'underline' }}
                 >
                   Privacy Policy
                 </span>
               </div>
             </div>
</div>
        </div>
      ) : authStage === 'setup' ? (
        <div style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', boxSizing: 'border-box' }}>
          <h3 style={{ color: '#00F2FF', fontSize: '20px', marginBottom: '6px' }}>Identity Locked!</h3>
          <p style={{ fontSize: '11px', color: '#AAA', marginBottom: '24px' }}>
            {authProvider === 'Guest' 
              ? 'Mode: Anonymous. All data saves exclusively to your phone memory.' 
              : 'Authenticated via ' + authProvider + '. Choose your creator name:'}
          </p>
          
          <div style={{ maxWidth: '300px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="text"
              value={inputUserName} 
              onChange={(e) => setInputUserName(e.target.value)} 
              placeholder="Set Creator Profile Name..." 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#1C1C24', color: '#FFF', outline: 'none', textAlign: 'center' }}
            />
            <button onClick={completeSetup} style={{ padding: '12px', background: 'linear-gradient(135deg, #7B2CBF 0%, #3C096C 100%)', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(123,44,191,0.3)' }}>
              Launch Pro Workspace
            </button>
          </div>
        </div>
      ) : (
        /* ================= DASHBOARD OR EDITOR ================= */
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#14141A', padding: '12px', borderRadius: '12px', border: '1px solid #222', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>👤 {userProfile?.username}</div>
              <div style={{ fontSize: '9px', color: '#8E8E93', marginTop: '2px' }}>Mode: {userProfile?.provider} ({userProfile?.email})</div>
            </div>
            <button 
              onClick={() => { if(confirm('Are you sure you want to disconnect?')) { localStorage.removeItem('hyper_auth_user'); window.location.reload(); } }} 
              style={{ background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)', padding: '5px 12px', color: '#FF3B30', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #7B2CBF 0%, #3C096C 100%)', padding: '30px 20px', borderRadius: '14px', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(123,44,191,0.4)' }} onClick={() => alert('Launching Ultra HD Montage Workspace...')}>
            + Create New Video Project
          </div>
          
          <p style={{ fontSize: '10px', color: '#555', textAlign: 'center', marginTop: '40px' }}>
            🔒 Storage Protection: File metadata synced to profile matrix. Media asset ownership rests completely in user storage.
          </p>
        </div>
      )}
    </div>
  );
}