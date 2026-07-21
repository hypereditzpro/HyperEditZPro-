import React, { useState, useEffect } from 'react';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export default function App() {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'app' || window.location.search.includes('mode=app')) {
      setIsAppMode(true);
    }
  }, []);

  if (isAppMode) {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ background: '#12121A', border: '1px solid #00F2FF', borderRadius: '16px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
            <h2 style={{ color: '#00F2FF', margin: '0 0 6px 0', fontSize: '1.2rem' }}>👑 HyperEdits Pro Studio</h2>
            <p style={{ color: '#34C759', fontSize: '0.8rem', margin: '0 0 12px 0', fontWeight: 'bold' }}>⚡ UPI Receiver Synced: 9549753157@nyes</p>
            <button onClick={() => setShowPayment(true)} style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
              💳 Open VIP Payment & Token Engine (₹1)
            </button>
          </div>

          <UserProfileHistory />

          {showPayment && (
            <PowerPaymentEngine 
              userNameOrPhone="9549753157" 
              amount="1" 
              onPaymentSuccess={() => {}} 
              onClose={() => setShowPayment(false)} 
            />
          )}
        </div>
      </div>
    );
  }

  // Default Landing Page fallback
  return (
    <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00F2FF', fontSize: '2rem' }}>HYPEREDITS PRO</h1>
      <p style={{ color: '#FF007F', fontWeight: 'bold' }}>AI Gaming Studio & Creator Hub</p>
      <p style={{ color: '#AAA', fontSize: '0.8rem', marginTop: '10px' }}>To access your private studio, use your secret app mode link.</p>
    </div>
  );
}
