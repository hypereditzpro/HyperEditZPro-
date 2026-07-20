import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import EditorFeatures from './EditorFeatures';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    // Check if running on Localhost
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      setIsLocal(true);
    }

    // 2 Second Splash Animation Timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Splash Screen Animation (2 Seconds)
  if (showSplash) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#a855f7',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #a855f7',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <h1 style={{ fontSize: '2rem', marginTop: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>
          HyperEdits Pro
        </h1>
        <p style={{ color: '#71717a', fontSize: '0.9rem', marginTop: '8px' }}>Initializing Workspace...</p>
      </div>
    );
  }

  // 2. Localhost Mode -> Directly Open App (Auth / Login Screen)
  if (isLocal) {
    return <Auth />;
  }

  // 3. Live Website Mode (External Users) -> Show Landing Page
  return <EditorFeatures />;
}

export default App;
