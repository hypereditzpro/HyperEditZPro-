// Export Guard Logic to protect VIP Features
export interface ExportCheckParams {
  isVIP: boolean;
  usedAIFeatures: string[];
}

export const canExportVideo = (params: ExportCheckParams): { allowed: boolean; reason?: string } => {
  if (params.isVIP) {
    return { allowed: true };
  }

  // Check if any VIP AI feature was used via AI Agent or Tools
  const vipUsed = params.usedAIFeatures.filter(feat => feat !== 'camera_tracking' && feat !== 'ai_agent_chat');

  if (vipUsed.length > 0) {
    return {
      allowed: false,
      reason: `🔒 VIP AI Feature used (${vipUsed.join(', ')}). Please unlock VIP to Export in 4K!`
    };
  }

  return { allowed: true };
};
