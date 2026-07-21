// VIP Features Guard - Safe Non-Destructive Update
export const isVIPFeatureUnlocked = (featureId: string, isUserVIP: boolean): boolean => {
  // Free Features (Never locked)
  const freeFeatures = ['ai_agent', 'camera_tracking_custom', 'head_tracking', 'body_tracking'];
  
  if (freeFeatures.includes(featureId)) {
    return true;
  }

  // VIP Features Check
  return isUserVIP;
};
