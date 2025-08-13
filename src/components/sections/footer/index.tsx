import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonStore } from '@/components/ui';

const NAVIGATION = {
  title: 'Navigation',
  links: [
    {
      text: 'Home',
      href: '#',
    },
    {
      text: 'Articles',
      href: '#',
    },
    {
      text: 'Contacts',
      href: '#',
    },
    {
      text: 'FAQ',
      href: '#',
    },
    {
      text: 'Privacy Policy',
      href: '#',
    },
  ]
}

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
    </footer>
  )
}

export default Footer;