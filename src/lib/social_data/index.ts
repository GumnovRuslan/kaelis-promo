import { InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/icons';

type TNetworkItem = {
  name: string;
  href: {
    en: string;
    ru: string;
    ua: string;
  };
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NETWORK: TNetworkItem[] = [
  {
    name: 'Instagram',
    href: {
      en: 'https://www.instagram.com/kaelis_ai_media?igsh=MXczMW5wajJ4ODgxdQ==',
      ru: 'https://www.instagram.com/kaelisai_media?igsh=MW9kcmV0YXFzdGdqcg==',
      ua: 'https://www.instagram.com/kaelis_ai?igsh=aGR3dXU1bHBqczAy',
    },
    icon: InstagramIcon
  },
  {
    name: 'TikTok',
    href: {
      en: 'https://www.tiktok.com/@kaelisai?_t=ZM-8zPlIGKEeAf',
      ru: 'https://www.tiktok.com/@kaelis_ai?_t=ZM-8zPlMOe2tGC',
      ua: 'https://www.tiktok.com/@kaelis_ai_media?_t=ZM-8zPlJTkjIqE',
    },
    icon: TikTokIcon
  },
  // {
  //   name: 'Twitter',
  //   href: {
  //     en: '/',
  //     ru: '/',
  //     ua: '/',
  //   },
  //   icon: TwitterIcon
  // }
]

type TSocialProps = {
  lang: 'en' | 'ru' | 'ua'
}

export const getSocialData = ({lang}: TSocialProps) => {
  return NETWORK.map(item => ({
    name: item.name,
    href: item.href[lang],
    icon: item.icon
  }))
}