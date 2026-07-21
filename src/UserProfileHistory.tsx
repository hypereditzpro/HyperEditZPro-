import React, { useState, useEffect } from 'react';

export interface PaymentHistoryItem {
  receiptId: string;
  txnId: string;
  amountPaid: string;
  paymentTime: string;
  tokenNo: string;
  merchantName: string;
  status: string;
}

export const UserProfileHistory: React.FC = () => {
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [isVipActive, setIsVipActive] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  useEffect(() => {
    const active = localStorage.getItem('hyper_is_vip_active') === 'true';
    setIsVipActive(active);

    const savedReceipt = localStorage.getItem('hyper_official_vip_receipt');
    if (savedReceipt) {
      try {
        const item: PaymentHistoryItem = JSON.parse(savedReceipt);
        setHistory([item]);
      } catch (e) {
        console.error("Error loading payment history:", e);
      }
    }
  }, []);

  return (
    <div style={{ background: '#12121A', border: '1px solid #222', borderRadius: '16px', padding: '16px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', marginBottom: '16px' }}>
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

      <button onClick={() => setShowHistoryModal(true)} style={{ width: '100%', background: '#181824', border: '1px solid #00F2FF', color: '#00F2FF', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>📜 View VIP Payment & Token History</button>

      {showHistoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 6000, padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '360px', color: '#FFF', position: 'relative' }}>
            <button onClick={() => setShowHistoryModal(false)} style={{ position: 'absolute', top: '12px', right: '14px', background: '#1A1A26', border: '1px solid #333', color: '#AAA', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
            <h3 style={{ fontSize: '1.05rem', color: '#00F2FF', margin: '0 0 14px 0', fontWeight: 'bold' }}>📜 VIP Payment History</h3>

            {history.length === 0 ? (
              <div style={{ background: '#181824', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#AAA', fontSize: '0.8rem' }}>No VIP transaction history found. Subscribe to unlock!</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {history.map((item, idx) => (
                  <div key={idx} style={{ background: '#181824', border: '1px solid #34C759', padding: '12px', borderRadius: '12px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#34C759', fontWeight: '900' }}>₹{item.amountPaid}</span>
                      <span style={{ background: '#34C759', color: '#000', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{item.status}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>📅 <b>Time:</b> {item.paymentTime}</div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>🔖 <b>Receipt ID:</b> {item.receiptId}</div>
                    <div style={{ fontSize: '0.72rem', color: '#AAA', marginBottom: '4px' }}>🏦 <b>Merchant:</b> {item.merchantName || 'HyperEdits Pro'}</div>
                    <div style={{ fontSize: '0.72rem', color: '#00F2FF', fontWeight: 'bold', wordBreak: 'break-all' }}>🔑 <b>Token:</b> {item.tokenNo}</div>
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

export default UserProfileHistory;
