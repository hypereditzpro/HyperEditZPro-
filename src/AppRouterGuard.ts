// Secret Mode Bypass for Owner Testing Only
export const checkAppRouteMode = (): 'LANDING' | 'APP' => {
  const params = new URLSearchParams(window.location.search);
  
  // Secret testing route for owner/developer
  if (params.get('mode') === 'app') {
    return 'APP';
  }
  
  // Default for all public website visitors
  return 'LANDING';
};
