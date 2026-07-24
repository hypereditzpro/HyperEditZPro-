import React, { useState, useEffect } from 'react';

export const Auth: React.FC<{ onLoginSuccess: (username: string) => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('Hyper King');
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWelcome(true);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0A0A0F', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'Segoe UI, sans-serif', color: '#FFF', padding: '20px' }}>
      
      {/* 🎆 PURPLE-BLACK THEME FIREWORKS & SPARKLES ANIMATION */}
      <style>{`
        @keyframes fireworkBurst {
          0% { transform: scale(0.2); opacity: 1; box-shadow: 0 0 0 rgba(114,9,183,0); }
          50% { opacity: 0.8; box-shadow: 0 0 40px #00F2FF, 0 0 80px #7209B7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes bounceLogo {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
      `}</style>

      {/* BACKGROUND FIREWORKS PARTICLES */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '15px', height: '15px', borderRadius: '50%', background: '#00F2FF', animation: 'fireworkBurst 2s infinite ease-out' }} />
        <div style={{ position: 'absolute', top: '60%', right: '25%', width: '20px', height: '20px', borderRadius: '50%', background: '#FF007F', animation: 'fireworkBurst 2.5s infinite ease-out 0.5s' }} />
        <div style={{ position: 'absolute', top: '35%', right: '35%', width: '12px', height: '12px', borderRadius: '50%', background: '#FFCC00', animation: 'fireworkBurst 1.8s infinite ease-out 1s' }} />
      </div>

      {/* MAIN CARD WITH PURPLE-BLACK GLOW THEME */}
      <div style={{ background: 'linear-gradient(135deg, #12121C, #1E0B2E)', border: '2px solid #7209B7', borderRadius: '20px', padding: '30px', width: '90%', maxWidth: '380px', textAlign: 'center', position: 'relative', zIndex: 2, boxShadow: '0 0 40px rgba(114, 9, 183, 0.4)' }}>
        
        {/* 3D BOUNCING LOGO */}
        <div style={{ margin: '0 auto 15px auto', width: '70px', height: '70px', borderRadius: '16px', border: '2px solid #00F2FF', background: '#0A0A10', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'bounceLogo 2s infinite ease-in-out', boxShadow: '0 0 20px rgba(0, 242, 255, 0.5)' }}>
          <img src="/logo.png" alt="Hyper Edits Pro Logo" style={{ width: '65px', height: '65px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 0 12px #00F2FF)' }} />
        </div>

        <h2 style={{ color: '#00F2FF', margin: '0 0 8px 0', fontSize: '1.3rem', textShadow: '0 0 10px rgba(0,242,255,0.4)' }}>
          🎉 Welcome, {username}!
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#AAA', margin: '0 0 20px 0' }}>
          Account Created & Auto-Synced with Studio.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter Username"
            style={{ background: '#0A0A10', border: '1px solid #7209B7', color: '#FFF', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', textAlign: 'center' }}
          />
          <button 
            type="button"
            onClick={() => onLoginSuccess(username)}
            style={{ background: 'linear-gradient(135deg, #00F2FF, #7209B7)', border: 'none', color: '#FFF', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 242, 255, 0.4)' }}
          >
            🚀 Confirm & Access Studio
          </button>
        </form>

        <span style={{ display: 'block', fontSize: '0.55rem', color: '#666', marginTop: '16px' }}>
          1 Account Limit Policy Enforced | Data Auto-Synced with Cloud
        </span>

      </div>

    </div>
  );
};

export default Auth;
