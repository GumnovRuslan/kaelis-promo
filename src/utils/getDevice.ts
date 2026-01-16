export type TDevice = 'desktop' | 'ios' | 'android'

export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';

  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';

  return 'desktop';
};