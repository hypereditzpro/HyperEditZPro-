import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import './App.css';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isLocal, setIsLocal] = useState<boolean>(false);

  useEffect(() => {
    // Localhost / Development IP detection for your testing
    const hostname = window.location.hostname;
    const isDev = 
      hostname === 'localhost' || 
      hostname === '127.0.0.1' || 
      hostname.startsWith('192.168.') ||
      window.location.port === '5173' ||
      window.location.port === '5174';

    if (isDev) {
      setIsLocal(true);
    }

    // 2-second Splash screen animation timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Splash Animation (For Localhost Testing)
  if (isLocal && showSplash) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#0A0A10',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00F2FF',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #00F2FF',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <h1 style={{ fontSize: '2rem', marginTop: '20px', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 0 10px rgba(0, 242, 255, 0.5)' }}>
          HYPEREDITS PRO
        </h1>
        <p style={{ color: '#AAAAAA', fontSize: '0.9rem', marginTop: '8px' }}>Initializing Editor Engine...</p>
      </div>
    );
  }

  // 2. Localhost Mode -> Directly Open Main App / Auth Interface
  if (isLocal) {
    return <Auth />;
  }

  // 3. External Users -> Render Landing Page (index.html is handled at root)
  return null;
};

export default App;
