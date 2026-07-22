export const convertSelectedClipToOverlay = (mainClips: any[], overlayClips: any[], selectedId: string | null) => {
  if (!selectedId) return { mainClips, overlayClips };
  const target = mainClips.find(c => c.id === selectedId);
  if (!target) return { mainClips, overlayClips };
  return {
    mainClips: mainClips.filter(c => c.id !== selectedId),
    overlayClips: [...overlayClips, { ...target, isOverlay: true }]
  };
};
