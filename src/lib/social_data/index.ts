import { InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/icons';

type TNetworkItem = {
  name: string;
  href: {
    en: string;
    ru: string;
    uk: string;
  };
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NETWORK: TNetworkItem[] = [
  // {
  //   name: 'Instagram',
  //   href: {
  //     en: '/',
  //     ru: '/',
  //     uk: '/',
  //   },
  //   icon: InstagramIcon
  // },
  {
    name: 'TikTok',
    href: {
      en: 'https://www.tiktok.com/@kaelisai?_t=ZM-8zPlIGKEeAf',
      ru: 'https://www.tiktok.com/@kaelis_ai?_t=ZM-8zPlMOe2tGC',
      uk: 'https://www.tiktok.com/@kaelis_ai_media?_t=ZM-8zPlJTkjIqE',
    },
    icon: TikTokIcon
  },
  // {
  //   name: 'Twitter',
  //   href: {
  //     en: '/',
  //     ru: '/',
  //     uk: '/',
  //   },
  //   icon: TwitterIcon
  // }
]

type TSocialProps = {
  lang: 'en' | 'ru' | 'uk'
}

export const getSocialData = ({lang}: TSocialProps) => {
  return NETWORK.map(item => ({
    name: item.name,
    href: item.href[lang],
    icon: item.icon
  }))
}