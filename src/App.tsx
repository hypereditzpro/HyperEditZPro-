import React, { useState, useEffect } from 'react';

export const App: React.FC = () => {
  const [isAppMode, setIsAppMode] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isVipActive, setIsVipActive] = useState<boolean>(false);

  // Payment Engine States
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState<'qr' | 'upi'>('qr');
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success'>('pending');

  const masterUpiId = "9549753157@nyes";
  const brandMerchantName = "HyperEdits Pro";
  const syncUpiString = `upi://pay?pa=${masterUpiId}&pn=${encodeURIComponent(brandMerchantName)}&am=1&tr=HEP_${Date.now()}&tn=${encodeURIComponent('HyperEdits Pro VIP Subscription')}&cu=INR`;
  const dynamicQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(syncUpiString)}`;

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'app') {
        setIsAppMode(true);
      }
      const active = localStorage.getItem('hyper_is_vip_active') === 'true';
      setIsVipActive(active);

      const savedReceipt = localStorage.getItem('hyper_official_vip_receipt');
      if (savedReceipt) {
        setHistory([JSON.parse(savedReceipt)]);
      }
    } catch (e) {
      console.error("Initialization error", e);
    }
  }, []);

  const handleInstantVerify = () => {
    setStatus('verifying');
    setTimeout(() => {
      const now = new Date();
      const paymentTime = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      const tokenNo = `TOK-HEP-${Date.now().toString().substring(6)}`;

      const receipt = {
        receiptId: `HEP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        txnId: `HEP_TXN_${Date.now()}`,
        amountPaid: "1",
        paymentTime,
        tokenNo,
        merchantName: brandMerchantName,
        status: 'SUCCESS'
      };

      localStorage.setItem('hyper_official_vip_receipt', JSON.stringify(receipt));
      localStorage.setItem('hyper_official_vip_token', tokenNo);
      localStorage.setItem('hyper_is_vip_active', 'true');

      setHistory([receipt]);
      setIsVipActive(true);
      setStatus('success');
    }, 1200);
  };

  return (
    <div style={{ background: '#0A0A10', minHeight: '100vh', color: '#FFF', padding: '16px', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* HEADER BAR */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
        <h1 style={{ color: '#00F2FF', margin: 0, fontSize: '1.6rem', letterSpacing: '1px' }}>⚡ HYPEREDITS PRO</h1>
        <p style={{ color: '#FF007F', fontSize: '0.75rem', margin: '4px 0 0 0', fontWeight: 'bold' }}>Made In India | AI Gaming Studio</p>
      </div>

      {/* GAMER PROFILE & VIP PANEL */}
      <div style={{ background: '#12121A', border: '1px solid #222', borderRadius: '16px', padding: '16px', color: '#FFF', marginBottom: '16px', maxWidth: '420px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7B2CBF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem', color: '#000' }}>H</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFF' }}>Gamer Profile</h4>
              <span style={{ fontSize: '0.7rem', color: '#AAA' }}>User ID: HEP-98412</span>
            </div>
          </div>
          {isVipActive ? (
            <span style={{ background: 'linear-gradient(135deg, #FF007F, #7B2CBF)', color: '#FFF', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '900', boxShadow: '0 0 10px rgba(255,0,127,0.5)' }}>👑 VIP PRO ACTIVE</span>
          ) : (
            <span style={{ background: '#222', color: '#AAA', border: '1px solid #444', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>FREE USER</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button onClick={() => setShowPaymentModal(true)} style={{ flex: 1, background: 'linear-gradient(135deg, #00F2FF, #34C759)', border: 'none', color: '#000', padding: '10px', borderRadius: '10px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer' }}>💳 Unlock VIP (₹1)</button>
          <button onClick={() => setShowHistoryModal(true)} style={{ flex: 1, background: '#181824', border: '1px solid #00F2FF', color: '#00F2FF', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.78rem', cursor: 'pointer' }}>📜 Payment History</button>
        </div>
      </div>

      {/* QUICK STATUS INFO */}
      <div style={{ maxWidth: '420px', margin: '20px auto 0 auto', background: '#181824', padding: '14px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center' }}>
        <span style={{ color: '#34C759', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>✅ Synced Merchant: 9549753157@nyes</span>
        <span style={{ color: '#AAA', fontSize: '0.7rem', display: 'block', marginTop: '4px' }}>AI Agent, Tracking Engine & Payment Hub Operational</span>
      </div>

      {/* VIP PAYMENT MODAL */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.96)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', color: '#FFF', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setShowPaymentModal(false)} style={{ position: 'absolute', top: '10px', right: '12px', background: '#1A1A26', border: '1px solid #333', color: '#AAA', width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
            <span style={{ background: '#34C759', color: '#000', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: '900' }}>👑 HYPEREDITS PRO OFFICIAL</span>
            <h3 style={{ fontSize: '1rem', color: '#00F2FF', margin: '6px 0 2px 0' }}>VIP Subscription Payment</h3>
            <p style={{ fontSize: '0.65rem', color: '#AAA', margin: '0 0 10px 0' }}>Merchant: <b>HyperEdits Pro</b></p>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
              <button onClick={() => setPaymentOption('qr')} style={{ flex: 1, padding: '6px', borderRadius: '8px', background: paymentOption === 'qr' ? '#00F2FF' : '#181824', color: paymentOption === 'qr' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.7rem' }}>📷 Scan QR Code</button>
              <button onClick={() => setPaymentOption('upi')} style={{ flex: 1, padding: '6px', borderRadius: '8px', background: paymentOption === 'upi' ? '#00F2FF' : '#181824', color: paymentOption === 'upi' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.7rem' }}>💳 Pay via UPI ID</button>
            </div>

            {status === 'success' ? (
              <div style={{ background: 'rgba(52,199,89,0.15)', border: '1px solid #34C759', padding: '16px', borderRadius: '14px', color: '#34C759' }}>
                <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🎉</div>
                <h4 style={{ margin: '0 0 4px 0', color: '#FFF' }}>Payment Verified & Synced!</h4>
                <p style={{ fontSize: '0.7rem', margin: 0, color: '#AAA' }}>Token & VIP Access Activated.</p>
              </div>
            ) : (
              <>
                {paymentOption === 'qr' ? (
                  <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #333', marginBottom: '12px' }}>
                    <div style={{ background: '#FFF', padding: '8px', borderRadius: '8px', display: 'inline-block', marginBottom: '6px' }}>
                      <img src={dynamicQrImageUrl} alt="HyperEdits Pro QR" style={{ width: '130px', height: '130px', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#AAA' }}>Scan with GPay / PhonePe / Paytm / Navi</div>
                    <div style={{ fontSize: '0.85rem', color: '#34C759', fontWeight: '900', marginTop: '2px' }}>Amount: ₹1</div>
                  </div>
                ) : (
                  <div style={{ background: '#181824', padding: '14px', borderRadius: '12px', border: '1px solid #333', marginBottom: '12px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.68rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Master UPI Receiver ID:</span>
                    <div style={{ background: '#12121A', padding: '8px 10px', borderRadius: '6px', border: '1px solid #00F2FF', color: '#00F2FF', fontWeight: 'bold', fontSize: '0.8rem', wordBreak: 'break-all', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{masterUpiId}</span>
                      <span style={{ fontSize: '0.6rem', background: '#34C759', color: '#000', padding: '2px 4px', borderRadius: '4px' }}>ACTIVE</span>
                    </div>
                  </div>
                )}

                <a href={syncUpiString} style={{ display: 'block', background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', padding: '10px', borderRadius: '10px', fontWeight: '900', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '8px' }}>🚀 Open Installed UPI App Directly</a>
                <button onClick={handleInstantVerify} style={{ width: '100%', background: '#7B2CBF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>{status === 'verifying' ? '⏳ Syncing Payment...' : '✅ I Have Paid - Confirm & Unlock VIP'}</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* HISTORY MODAL */}
      {showHistoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 6000, padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '360px', color: '#FFF', position: 'relative' }}>
            <button onClick={() => setShowHistoryModal(false)} style={{ position: 'absolute', top: '12px', right: '14px', background: '#1A1A26', border: '1px solid #333', color: '#AAA', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
            <h3 style={{ fontSize: '1.05rem', color: '#00F2FF', margin: '0 0 14px 0', fontWeight: 'bold' }}>📜 VIP Payment History</h3>

            {history.length === 0 ? (
              <div style={{ background: '#181824', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#AAA', fontSize: '0.8rem' }}>No VIP transaction history found. Subscribe to unlock!</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map((item, idx) => (
                  <div key={idx} style={{ background: '#181824', border: '1px solid #34C759', padding: '12px', borderRadius: '12px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#34C759', fontWeight: '900' }}>₹{item.amountPaid}</span>
                      <span style={{ background: '#34C759', color: '#000', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{item.status}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>📅 <b>Time:</b> {item.paymentTime}</div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>🔖 <b>Receipt ID:</b> {item.receiptId}</div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>🏦 <b>Merchant:</b> {item.merchantName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#00F2FF', fontWeight: 'bold' }}>🔑 <b>Token:</b> {item.tokenNo}</div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowHistoryModal(false)} style={{ width: '100%', background: '#7B2CBF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginTop: '14px' }}>Close History</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
