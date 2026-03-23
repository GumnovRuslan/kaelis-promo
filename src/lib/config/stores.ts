import type { TDevice } from '@/utils/getDevice';

export type TStores = {
  platform: TDevice;
  name: string,
  qr_code_src: string;
  link: {
    name?: string;
    href: string;
  };
}
  
export const STORES: Partial<Record<TDevice, TStores>> = {
  android: {
    name: 'Android',
    platform: 'android',
    qr_code_src: '',
    link: {
      href: '/store-android',
    }
  },
  ios: {
    name: "Ios",
    platform: 'ios',
    qr_code_src: '',
    link: {
      href: '/store-ios'
    }
  }
}