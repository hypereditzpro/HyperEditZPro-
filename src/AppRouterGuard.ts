// Clean Master Guard - Refresh Build
export const checkAppRouteMode = (): 'LANDING' | 'APP' => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'app') {
    return 'APP';
  }
  return 'LANDING';
};
