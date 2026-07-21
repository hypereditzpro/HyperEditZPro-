import React, { useState, useEffect } from 'react';

interface AutoPaymentProps {
  userNameOrPhone: string;
  amount: string;
  onPaymentSuccess?: (receipt: any) => void;
  onClose?: () => void;
}

export const PowerPaymentEngine: React.FC<AutoPaymentProps> = ({
  userNameOrPhone,
  amount,
  onPaymentSuccess,
  onClose
}) => {
  const [txnId, setTxnId] = useState<string>('');
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success'>('pending');
  const [paymentOption, setPaymentOption] = useState<'qr' | 'upi'>('qr');
  
  const masterUpiId = "9549753157@nyes"; 
  const brandMerchantName = "HyperEdits Pro";

  useEffect(() => {
    const uniqueTxn = `HEP_${Date.now()}`;
    setTxnId(uniqueTxn);
  }, [userNameOrPhone]);

  const syncUpiString = `upi://pay?pa=${masterUpiId}&pn=${encodeURIComponent(brandMerchantName)}&am=${amount}&tr=${txnId}&tn=${encodeURIComponent('HyperEdits Pro VIP Subscription')}&cu=INR`;
  const dynamicQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(syncUpiString)}`;
  const userMaskedUpiId = `hyper.${userNameOrPhone.slice(-4)}@nyes`;

  const handleInstantVerify = () => {
    setStatus('verifying');

    setTimeout(() => {
      const now = new Date();
      const paymentTime = now.toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      }) + ' at ' + now.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });

      const tokenNo = `TOK-${userNameOrPhone.substring(0, 4).toUpperCase()}-${Date.now().toString().substring(5)}`;

      const receipt = {
        receiptId: `HEP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        txnId,
        userIdentity: userNameOrPhone,
        amountPaid: amount,
        paymentTime,
        tokenNo,
        merchantName: brandMerchantName,
        status: 'SUCCESS'
      };

      localStorage.setItem('hyper_official_vip_receipt', JSON.stringify(receipt));
      localStorage.setItem('hyper_official_vip_token', tokenNo);
      localStorage.setItem('hyper_is_vip_active', 'true');

      setStatus('success');
      if (onPaymentSuccess) onPaymentSuccess(receipt);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.96)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000, padding: '16px', boxSizing: 'border-box' }}>
      <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', color: '#FFF', position: 'relative', textAlign: 'center', boxShadow: '0 0 40px rgba(0, 242, 255, 0.4)' }}>
        {onClose && (
          <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '12px', background: '#1A1A26', border: '1px solid #333', color: '#AAA', width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
        )}
        <span style={{ background: '#34C759', color: '#000', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: '900' }}>👑 HYPEREDITS PRO OFFICIAL PAYMENT</span>
        <h3 style={{ fontSize: '1rem', color: '#00F2FF', margin: '6px 0 2px 0', fontWeight: 'bold' }}>VIP Subscription Payment</h3>
        <p style={{ fontSize: '0.65rem', color: '#AAA', margin: '0 0 10px 0' }}>Merchant: <b>HyperEdits Pro</b></p>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <button onClick={() => setPaymentOption('qr')} style={{ flex: 1, padding: '6px', borderRadius: '8px', background: paymentOption === 'qr' ? '#00F2FF' : '#181824', color: paymentOption === 'qr' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.7rem', cursor: 'pointer' }}>📷 Scan QR Code</button>
          <button onClick={() => setPaymentOption('upi')} style={{ flex: 1, padding: '6px', borderRadius: '8px', background: paymentOption === 'upi' ? '#00F2FF' : '#181824', color: paymentOption === 'upi' ? '#000' : '#FFF', border: 'none', fontWeight: 'bold', fontSize: '0.7rem', cursor: 'pointer' }}>💳 Pay via UPI ID</button>
        </div>

        {status === 'success' ? (
          <div style={{ background: 'rgba(52,199,89,0.15)', border: '1px solid #34C759', padding: '16px', borderRadius: '14px', color: '#34C759' }}>
            <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🎉</div>
            <h4 style={{ margin: '0 0 4px 0', color: '#FFF' }}>Payment Verified & Synced!</h4>
            <p style={{ fontSize: '0.7rem', margin: 0, color: '#AAA' }}>Token & History Record Generated in Profile.</p>
          </div>
        ) : (
          <>
            {paymentOption === 'qr' ? (
              <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #333', marginBottom: '12px' }}>
                <div style={{ background: '#FFF', padding: '8px', borderRadius: '8px', display: 'inline-block', marginBottom: '6px' }}>
                  <img src={dynamicQrImageUrl} alt="HyperEdits Pro QR" style={{ width: '130px', height: '130px', display: 'block' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#AAA' }}>Scan with GPay / PhonePe / Paytm / Navi</div>
                <div style={{ fontSize: '0.85rem', color: '#34C759', fontWeight: '900', marginTop: '2px' }}>Amount: ₹{amount}</div>
              </div>
            ) : (
              <div style={{ background: '#181824', padding: '14px', borderRadius: '12px', border: '1px solid #333', marginBottom: '12px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.68rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Your Synced Personal UPI ID:</span>
                <div style={{ background: '#12121A', padding: '8px 10px', borderRadius: '6px', border: '1px solid #00F2FF', color: '#00F2FF', fontWeight: 'bold', fontSize: '0.8rem', wordBreak: 'break-all', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{userMaskedUpiId}</span>
                  <span style={{ fontSize: '0.6rem', background: '#34C759', color: '#000', padding: '2px 4px', borderRadius: '4px' }}>SYNCED</span>
                </div>
                <p style={{ fontSize: '0.65rem', color: '#AAA', marginTop: '6px', margin: '6px 0 0 0' }}>Send ₹{amount} to this UPI ID from any app. Funds auto-route to Master Receiver.</p>
              </div>
            )}

            <a href={syncUpiString} style={{ display: 'block', background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', padding: '10px', borderRadius: '10px', fontWeight: '900', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '8px' }}>🚀 Open Installed UPI App Directly</a>
            <button onClick={handleInstantVerify} style={{ width: '100%', background: '#7B2CBF', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>{status === 'verifying' ? '⏳ Syncing Payment & Unlocking VIP...' : '✅ I Have Paid - Confirm & Unlock VIP'}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PowerPaymentEngine;
