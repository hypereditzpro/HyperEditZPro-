import React, { useState, useEffect } from 'react';
import EditorFeatures from './EditorFeatures';
import Auth from './Auth';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if secret app mode is active
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app' || window.location.search.includes('mode=app')) {
      setIsAppMode(true);
    }
  }, []);

  // DIRECT SECRET APP MODE (When ?mode=app is opened by you)
  if (isAppMode) {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px', fontFamily: 'Segoe UI, sans-serif', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          
          {/* TOP VIP APP BAR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#12121A', padding: '12px 16px', borderRadius: '14px', border: '1px solid #00F2FF', boxShadow: '0 0 15px rgba(0,242,255,0.2)' }}>
            <div>
              <h3 style={{ color: '#00F2FF', margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>⚡ HYPEREDITS PRO</h3>
              <span style={{ color: '#34C759', fontSize: '0.7rem', fontWeight: 'bold' }}>Merchant: 9549753157@nyes</span>
            </div>
            <button onClick={() => setShowPaymentModal(true)} style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}>
              💳 VIP Payment
            </button>
          </div>

          {/* USER PROFILE & TOKEN HISTORY */}
          <UserProfileHistory />

          {/* MAIN AI STUDIO WORKSPACE */}
          <Auth />

          {/* SYNCED PAYMENT ENGINE MODAL */}
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

  // DEFAULT OFFICIAL LANDING PAGE (For Public / Instagram Visitors)
  return <EditorFeatures />;
}
