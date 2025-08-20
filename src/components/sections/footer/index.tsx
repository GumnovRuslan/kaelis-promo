import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonStore } from '@/components/ui';
import { InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/icons';

const NAVIGATION = {
  title: 'Navigation',
  links: [
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
}

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
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__column}>
          <Link href='/' className={styles.footer__logo}>
            <Image src='/images/logo.webp' fill alt='logo' />
          </Link>
          <p className={styles.footer__text}>
            Mobile app for receiving personalized predictions from AI, studying Tarot and astrology. Unlock the secrets of the Universe right on your phone
          </p>
          <div className={styles.footer__buttons}>
            <ButtonStore type='app'/>
            <ButtonStore type='google'/>
          </div>
        </div>
        <div className={styles.footer__column}>
          <nav className={styles.footer__nav}>
            <span className={styles.footer__nav_title}>{NAVIGATION.title}</span>
            {NAVIGATION.links.map((item, i) => (
              <Link href={item.href} className={styles.footer__nav_link} key={i}>{item.text}</Link>
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