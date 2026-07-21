// Online Personalized Token & Offline Asset Download Manager
import crypto from 'crypto-js';

export interface PersonalizedReceipt {
  receiptId: string;         // e.g. HEP-2026-9841
  userIdentity: string;      // User Name / Phone / Device ID
  amountPaid: string;        // Amount (e.g. ₹1.00 / ₹29.00)
  paymentTime: string;       // Exact Time (e.g. 21 Jul 2026, 09:51:10 AM)
  paymentRef: string;        // UTR / UPI Ref
  tokenNo: string;           // Personalized Unique Token
  isOnlineVerified: boolean;
}

// 1. ONLINE PERSONALIZED RECEIPT GENERATOR (Fresh Date/Time & User Details)
export const generatePersonalizedOnlineToken = (
  userNameOrPhone: string,
  amount: string,
  paymentRef: string
): PersonalizedReceipt => {
  const now = new Date();
  
  // Exact Date & Time String
  const paymentTime = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' at ' + now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const timeStamp = now.getTime();
  const randomSalt = Math.floor(1000 + Math.random() * 9000);
  const receiptId = `HEP-2026-${randomSalt}`;

  // Unique Token binding User Identity + Time + Amount
  const rawPayload = `${userNameOrPhone}_${amount}_${paymentTime}_${paymentRef}_${timeStamp}`;
  const tokenNo = `TOK-${userNameOrPhone.substring(0, 4).toUpperCase()}-${crypto.SHA256(rawPayload).toString().substring(0, 10).toUpperCase()}`;

  const receipt: PersonalizedReceipt = {
    receiptId,
    userIdentity: userNameOrPhone,
    amountPaid: amount,
    paymentTime,
    paymentRef,
    tokenNo,
    isOnlineVerified: true
  };

  // Save Personalized Receipt & Active Token
  localStorage.setItem('hyper_personalized_vip_receipt', JSON.stringify(receipt));
  localStorage.setItem('hyper_active_token', tokenNo);

  return receipt;
};

// 2. OFFLINE ASSET & FILTER STORAGE MANAGER
export const saveAssetForOffline = (assetId: string, assetData: any) => {
  try {
    const offlineAssets = JSON.parse(localStorage.getItem('hyper_offline_assets') || '{}');
    offlineAssets[assetId] = {
      ...assetData,
      downloadedAt: new Date().toISOString()
    };
    localStorage.setItem('hyper_offline_assets', JSON.stringify(offlineAssets));
    console.log(`✅ Asset ${assetId} saved to storage for Offline use!`);
  } catch (e) {
    console.error("Offline Save Error:", e);
  }
};

export const getOfflineAsset = (assetId: string) => {
  const offlineAssets = JSON.parse(localStorage.getItem('hyper_offline_assets') || '{}');
  return offlineAssets[assetId] || null;
};
