import React from 'react';

interface PROPaywallProps {
  onUnlockTrial?: () => void;
  onClose?: () => void;
}

export const VIPSubscriptionModal: React.FC<PROPaywallProps> = ({ onUnlockTrial, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.94)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, padding: '16px', boxSizing: 'border-box' }}>
      
      <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '350px', color: '#FFF', position: 'relative', boxShadow: '0 0 30px rgba(0, 242, 255, 0.4)', textAlign: 'center' }}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '14px', background: '#1A1A26', border: '1px solid #333', color: '#AAA', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>

        {/* PRO Badge Header */}
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #FF007F, #7B2CBF)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '10px' }}>
          👑 HYPEREDITS PRO VIP
        </div>

        <h2 style={{ fontSize: '1.2rem', color: '#00F2FF', margin: '0 0 6px 0', fontWeight: '900' }}>Unlock Premium AI Tools</h2>
        <p style={{ fontSize: '0.75rem', color: '#AAA', margin: '0 0 16px 0' }}>Get unlimited access to All Editing AI Features!</p>

        {/* VIP Features Included */}
        <div style={{ background: '#181824', borderRadius: '12px', padding: '12px', textAlign: 'left', marginBottom: '16px', border: '1px solid #222' }}>
          <div style={{ fontSize: '0.75rem', color: '#34C759', marginBottom: '6px', fontWeight: 'bold' }}>✓ AI Auto Headshot & Beat Sync</div>
          <div style={{ fontSize: '0.75rem', color: '#34C759', marginBottom: '6px', fontWeight: 'bold' }}>✓ AI Green Screen Background Eraser</div>
          <div style={{ fontSize: '0.75rem', color: '#34C759', marginBottom: '6px', fontWeight: 'bold' }}>✓ AI Gamer Voice Changer Studio</div>
          <div style={{ fontSize: '0.75rem', color: '#34C759', fontWeight: 'bold' }}>✓ AI Phonk Velocity & Color Grading</div>
        </div>

        {/* Original Offer Box (₹1 for 7 Days Auto-Pay) */}
        <div style={{ background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.15), rgba(255, 0, 127, 0.15))', border: '1px solid #00F2FF', borderRadius: '14px', padding: '14px', marginBottom: '16px' }}>
          <span style={{ background: '#FF9933', color: '#000', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '6px' }}>
            SPECIAL OFFER
          </span>
          <h3 style={{ fontSize: '1.3rem', color: '#FFF', margin: '4px 0', fontWeight: '900' }}>
            ₹1 <span style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: 'normal' }}>for 7 Days</span>
          </h3>
          <p style={{ fontSize: '0.7rem', color: '#00F2FF', margin: 0, fontWeight: 'bold' }}>
            Auto-Pay Active: Then ₹29 for 1st Month (thereafter ₹35/mo)
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onUnlockTrial}
          style={{ width: '100%', background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)' }}
        >
          ⚡ Start 7-Day Trial for ₹1 (Auto-Pay)
        </button>

      </div>

    </div>
  );
};

export default VIPSubscriptionModal;
