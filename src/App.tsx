import React, { useState, useEffect } from 'react';
import EditorFeatures from './EditorFeatures';
import Auth from './Auth';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check URL parameters for Secret App Mode (?mode=app)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app') {
      setIsAppMode(true);
    }

    // 2. Splash Screen Timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Neon Splash Screen
  if (showSplash) {
    return (
      <div style={{ background: '#0A0A10', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#00F2FF', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', textShadow: '0 0 20px #00F2FF', margin: 0 }}>HYPEREDITS PRO</h1>
        <p style={{ color: '#FF007F', fontSize: '0.8rem', marginTop: '8px' }}>⚡ Made In India | AI Studio</p>
      </div>
    );
  }

  // DIRECT APP MODE (When ?mode=app is opened by you)
  if (isAppMode) {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#12121A', padding: '10px 14px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ color: '#00F2FF', margin: 0, fontSize: '0.95rem' }}>👑 VIP App Mode Active</h3>
            <button onClick={() => setShowPaymentModal(true)} style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}>💳 Open Payment Engine</button>
          </div>

          {/* User Profile & VIP History */}
          <UserProfileHistory />
          
          {/* Main Dashboard / Auth Workspace */}
          <Auth />

          {showPaymentModal && (
            <PowerPaymentEngine 
              userNameOrPhone="9549753157" 
              amount="1" 
              onPaymentSuccess={() => {}} 
              onClose={() => setShowPaymentModal(false)} 
            />
          )}
        </div>
      </div>
    );
  }

  // DEFAULT LANDING PAGE (For Public Visitors)
  return <EditorFeatures />;
}
