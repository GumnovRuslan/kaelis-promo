import type { TDevice } from '@/utils/getDevice';
import { AppleStoreIcon, GooglePlayIcon } from '@/components/icons';

export type TStores = {
  platform: TDevice;
  icon: React.ReactNode
  name: string,
  qr_code: {
    src: string;
    alt: string
  } | null;
  link: {
    name?: string;
    href: string;
  } | null;
}
  
export const STORES: Partial<Record<TDevice, TStores>> = {
  android: {
    name: 'Android',
    platform: 'android',
    icon: GooglePlayIcon(),
    qr_code: {
      src: '/images/qrcodes/kaelis-qr-android.png',
      alt: 'qr code GooglePlay'
    },
    link: {
      href: 'https://play.google.com/store/apps/details?id=io.kaelsi.app',
    }
  },
  ios: {
    name: "Ios",
    platform: 'ios',
    icon: AppleStoreIcon(),
    qr_code: null,
    link: null
  }
}