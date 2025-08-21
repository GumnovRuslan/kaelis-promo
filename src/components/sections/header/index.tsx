'use client'

import styles from './styles.module.scss'

import Link from 'next/link';
import Image from 'next/image';
import { Burger, LocalSelector } from '@/components/ui';
import { useEffect, useState } from 'react';

const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contacts', href: '/contacts' },
]

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (menuIsActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuIsActive])

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.header__logo}>
        <Image src="/images/logo.svg" alt="Logo" fill />
      </Link>
      <div className={styles.header__menu_wrapper}>
        <nav className={`${styles.header__menu} ${menuIsActive ? styles['header__menu--active'] : ''}`}>
          {MENU_ITEMS.map((item, i) => (
            <Link 
              href={item.href} 
              className={styles.header__link} 
              key={i}
              onClick={() => setMenuIsActive(false)}
              >
              {item.name}
            </Link>
          ))}
        </nav>
        <LocalSelector/>
        <Burger 
          className={styles.header__burger} 
          isActive={menuIsActive} 
          setIsActive={setMenuIsActive}
        />
      </div>
    </header>
  )
}

export default Header;