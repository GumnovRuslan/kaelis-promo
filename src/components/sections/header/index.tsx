'use client'

import styles from './styles.module.scss'

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Burger, LocalSelector, DropDownList } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import disableBodyScroll from '@/utils/disableBodyScroll';
import { getCategories } from '@/lib/api';
import type { TarotCategory } from '@/lib/types/shuffle';

type TMenuItems = {
  name: string;
  href: string;
  dropdown_list?: TarotCategory[] 
}

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
  const [categories, setCategories] = useState<TarotCategory[]>([]);
  const t = useTranslations('Header');

  const MENU_ITEMS: TMenuItems[] = [
    { name: t('menu.home'), href: '/' },
    { name: t('menu.tarot'), href: '/tarot', dropdown_list: categories},
    { name: t('menu.articles'), href: '/articles' },
    { name: t('menu.contacts'), href: '/contacts' },
  ]

  useEffect(() => {
    disableBodyScroll({ isDisabled: menuIsActive })
    return () => disableBodyScroll({ remove: true })
  }, [menuIsActive])

  useEffect(() => {
  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  fetchCategories();
}, []);

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.header__logo}>
        <Image src="/images/logo.svg" alt="Logo" fill />
      </Link>
      <div className={styles.header__menu_wrapper}>
        <nav className={`${styles.header__menu} ${menuIsActive ? styles['header__menu--active'] : ''}`}>
          {MENU_ITEMS.map((item, i) => (
            <div className={styles.header__item} key={i}>
              <Link
                href={item.href}
                className={styles.header__link}
                onClick={() => setMenuIsActive(false)}
              >
                {item.name}
              </Link>

              {item.dropdown_list?.length && item.dropdown_list && (
                <div className={styles.header__dropdown_list}>
                  <DropDownList items={item.dropdown_list}/>
                </div>
              )}
            </div>
          ))}
        </nav>
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