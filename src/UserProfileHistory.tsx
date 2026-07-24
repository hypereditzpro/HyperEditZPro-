import React, { useState } from 'react';

export const UserProfileHistory: React.FC = () => {
  const [username, setUsername] = useState<string>("HyperGamer_HS");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(username);
  const [showProfileSlide, setShowProfileSlide] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  const handleSaveUsername = () => {
    if (tempName.trim()) {
      setUsername(tempName);
      setIsEditingName(false);
    }
  };

  const handleLogout = () => {
    alert("🚪 Logged out successfully! Session cleared.");
    window.location.reload();
  };

  return (
    <div style={{ background: '#12121C', border: '1px solid #7209B7', borderRadius: '16px', padding: '18px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', position: 'relative' }}>
      
      {/* PROFILE HEADER & USERNAME EDIT WITH PENCIL ICON */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => setShowProfileSlide(true)}
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7209B7)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #FFF', boxShadow: '0 0 10px #00F2FF' }}
          >
            👑
          </div>
          <div>
            {!isEditingName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFF' }}>{username}</span>
                <button 
                  onClick={() => { setTempName(username); setIsEditingName(true); }}
                  style={{ background: 'none', border: 'none', color: '#00F2FF', cursor: 'pointer', fontSize: '0.9rem' }}
                  title="Edit Username"
                >
                  ✏️
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  style={{ background: '#0A0A10', border: '1px solid #00F2FF', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}
                />
                <button onClick={handleSaveUsername} style={{ background: '#34C759', border: 'none', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                <button onClick={() => setIsEditingName(false)} style={{ background: '#333', border: 'none', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>Cancel</button>
              </div>
            )}
            <span style={{ fontSize: '0.65rem', color: '#34C759', fontWeight: 'bold', display: 'block' }}>👑 VIP Member | Gmail Auto-Synced</span>
          </div>
        </div>

        {/* BUTTON TO OPEN SLIDE PANEL */}
        <button 
          onClick={() => setShowProfileSlide(true)}
          style={{ background: '#1A1A28', border: '1px solid #00F2FF', color: '#00F2FF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ⚙️ Account Details ➔
        </button>
      </div>

      {/* RECENT PROJECTS HISTORY */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '0.8rem', color: '#AAA', margin: '0 0 8px 0' }}>📂 Recent Render History (Cloud Synced):</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#181824', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
            <span>FreeFire_Montage_4K.mp4</span>
            <span style={{ color: '#34C759' }}>1080p 60FPS</span>
          </div>
          <div style={{ background: '#181824', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
            <span>Shorts_Velocity_Edit.mp4</span>
            <span style={{ color: '#34C759' }}>4K 120FPS</span>
          </div>
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <button 
        onClick={handleLogout}
        style={{ width: '100%', background: 'rgba(255, 0, 127, 0.15)', border: '1px solid #FF007F', color: '#FF007F', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '10px' }}
      >
        🚪 Log Out Account
      </button>

      {/* BLUE TERMS & PRIVACY POLICY LINK BELOW LOGOUT */}
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={() => setShowTermsModal(true)}
          style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '0.65rem', textDecoration: 'underline', cursor: 'pointer' }}
        >
          📜 Privacy Policy & Terms Conditions (HYPER PRO Billing Rules)
        </button>
      </div>

      {/* PROFILE SLIDE PANEL (SLIDES FROM RIGHT/BOTTOM) */}
      {showProfileSlide && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: '#0F0F18', border: '1px solid #00F2FF', borderRadius: '16px', zIndex: 100, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '14px' }}>
              <h4 style={{ margin: 0, color: '#00F2FF', fontSize: '0.9rem' }}>👤 Account & Device Details</h4>
              <button onClick={() => setShowProfileSlide(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#AAA', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><b>User ID:</b> HP-99201 (Masked)</div>
              <div><b>Storage Sync:</b> Google Drive / Gmail Connected</div>
              <div><b>Current Pass:</b> ₹1 Trial Pass (Active 7 Days)</div>
              <div><b>AutoPay Status:</b> Linked Mandate (₹29/mo)</div>
              <div><b>Billing Merchant:</b> HYPER PRO</div>
            </div>
          </div>
          <button onClick={() => setShowProfileSlide(false)} style={{ background: '#00F2FF', border: 'none', color: '#000', padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}>Close Details Panel</button>
        </div>
      )}

      {/* TERMS & PRIVACY POPUP MODAL */}
      {showTermsModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', border: '1px solid #7209B7', borderRadius: '16px', zIndex: 200, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: '#00F2FF', fontSize: '0.85rem' }}>📜 Terms of Service & Privacy Policy</h4>
            <div style={{ fontSize: '0.65rem', color: '#CCC', lineHeight: '1.4', maxHeight: '200px', overflowY: 'auto' }}>
              <p><b>1. Billing & Masking:</b> All UPI transactions display <b>HYPER PRO</b>. Your personal identity remains encrypted.</p>
              <p><b>2. AutoPay Mandate:</b> Activating ₹1 Trial links a ₹29 AutoPay Mandate for the 1st month. Next months require manual renewals (₹35/₹105/₹199/₹349).</p>
              <p><b>3. Storage Sync:</b> Project data is stored securely in your linked Gmail/Google Drive storage.</p>
            </div>
          </div>
          <button onClick={() => setShowTermsModal(false)} style={{ background: '#34C759', border: 'none', color: '#000', padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}>I Accept & Understand</button>
        </div>
      )}

    </div>
  );
};

export default UserProfileHistory;
