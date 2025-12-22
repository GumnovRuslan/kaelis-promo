'use client'

import styles from './styles.module.scss'

import { Link, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { Burger, Button, LocalSelector, ShuffleSelector } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import disableBodyScroll from '@/utils/disableBodyScroll';
import { shuffleActions, useAppDispatch } from '@/store';

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
  const t = useTranslations('Header');
  const dispatch = useAppDispatch()
  const router = useRouter();

  const MENU_ITEMS = [
    { name: t('menu.home'), href: '/' },
    { name: t('menu.articles'), href: '/articles' },
    { name: t('menu.contacts'), href: '/contacts' },
  ]

  useEffect(() => {
    disableBodyScroll({ isDisabled: menuIsActive })
    return () => disableBodyScroll({ remove: true })
  }, [menuIsActive])

  const resetPropertiesShuffle = () => {
    dispatch(shuffleActions.setSelectedCategory(null))
    dispatch(shuffleActions.setSelectedSpread(null))
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    resetPropertiesShuffle()
    router.push('/')
  }

  return (
    <header className={styles.header}>
      <Link href='/' onClick={handleLogoClick} className={styles.header__logo}>
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
        <ShuffleSelector />
        <LocalSelector />
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