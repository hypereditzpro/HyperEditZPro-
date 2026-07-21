import React, { useEffect, useState } from 'react';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

export const App: React.FC = () => {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'app') {
      setIsAppMode(true);
    }
  }, []);

  if (isAppMode) {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#00F2FF', margin: 0 }}>👑 HyperEdits Pro (Direct App Mode)</h2>
          <span style={{ fontSize: '0.75rem', color: '#34C759', fontWeight: 'bold' }}>⚡ Synced Merchant Receiver: 9549753157@nyes</span>
        </div>
        <UserProfileHistory />
        <PowerPaymentEngine userNameOrPhone="9549753157" amount="1" onPaymentSuccess={() => {}} onClose={() => {}} />
      </div>
    );
  }

  return (
    <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center' }}>
      <div>
        <h1 style={{ color: '#00F2FF' }}>HYPEREDITS PRO</h1>
        <p style={{ color: '#AAA' }}>Official Web Studio & Editor</p>
      </div>
    </div>
  );
};

export default App;
