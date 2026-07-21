import React, { useEffect, useState } from 'react';
import { checkAppRouteMode } from './AppRouterGuard';
import UserProfileHistory from './UserProfileHistory';
import PowerPaymentEngine from './PowerPaymentEngine';

// Assume EditorFeatures is landing page
import EditorFeatures from './EditorFeatures';

export const App: React.FC = () => {
  const [routeMode, setRouteMode] = useState<'LANDING' | 'APP'>('LANDING');

  useEffect(() => {
    // Check if URL has ?mode=app
    const mode = checkAppRouteMode();
    setRouteMode(mode);
  }, []);

  if (routeMode === 'APP') {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px' }}>
        <h2 style={{ color: '#00F2FF', textAlign: 'center', marginBottom: '20px' }}>
          🚀 HyperEdits Pro (Direct App Mode)
        </h2>
        {/* Profile Section with VIP History */}
        <UserProfileHistory />
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#AAA', fontSize: '0.8rem' }}>
            Testing Mode Active | Master Receiver: 9549753157@nyes
          </p>
        </div>
      </div>
    );
  }

  // Default Landing Page for Public Visitors
  return <EditorFeatures />;
};

export default App;
