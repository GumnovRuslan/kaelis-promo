import styles from './styles.module.scss';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ButtonStore } from '@/components/ui';
import { InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

const NAVIGATION = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Articles',
      href: '/articles',
    },
    {
      text: 'Contacts',
      href: '/contacts',
    },
    {
      text: 'FAQ',
      href: '/faq',
    },
    {
      text: 'Privacy Policy',
      href: '/privacy-policy',
    },
]

const NETWORK = [
  {
    href: '#',
    icon: InstagramIcon,
  },
  {
    href: '#',
    icon: TikTokIcon,
  },
  {
    href: '#',
    icon: TwitterIcon,
  },
]

const Footer = () => {
  const t = useTranslations('footer')

    // ключи навигации
  const navKeys = ['home', 'articles', 'contacts', 'faq', 'privacy-policy'] as const;

  // создаём массив из nav
  const navItems = navKeys.map((key) => ({
    key,
    label: t(`nav.${key}`), // t('footer.nav.home') и т.д.
    href: `/${key === 'home' ? '' : key}` // пример ссылки
  }));

  const NAVIGATION = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Articles',
      href: '/articles',
    },
    {
      text: 'Contacts',
      href: '/contacts',
    },
    {
      text: 'FAQ',
      href: '/faq',
    },
    {
      text: 'Privacy Policy',
      href: '/privacy-policy',
    },
]

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__column}>
          <Link href='/' className={styles.footer__logo}>
            <Image src='/images/logo.svg' fill alt='logo' />
          </Link>
          <p className={styles.footer__text}>{t('desc')}</p>
          <div className={styles.footer__buttons}>
            <ButtonStore type='app'/>
            <ButtonStore type='google'/>
          </div>
        </div>
        <div className={styles.footer__column}>
          <nav className={styles.footer__nav}>
            {navItems.map((item, i) => (
              <Link href={item.href} className={styles.footer__nav_link} key={i}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <div className={styles.footer__network}>
        {NETWORK.map((item, i) => (
          <Link className={styles.footer__network_link} href={item.href} key={i} >
            <item.icon/>
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer;