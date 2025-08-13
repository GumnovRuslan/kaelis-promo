import styles from './styles.module.scss'

import Link from 'next/link';
import Image from 'next/image';

const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contacts', href: '/contacts' },
]

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/' className={styles.header__logo}>
        <Image src="/images/logo.webp" alt="Logo" fill />
      </Link>
      <nav className={styles.header__menu}>
        {MENU_ITEMS.map((item) => (
          <li key={item.name} className={styles.header__item}>
            <Link href={item.href} className={styles.header__link}>{item.name}</Link>
          </li>
        ))}
      </nav>
    </header>
  )
}

export default Header;