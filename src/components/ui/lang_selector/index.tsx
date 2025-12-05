'use client'

import styles from './styles.module.scss'

import { useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl';

type TLanguages = {
  [key: string]: string;
}

const LANGS: TLanguages = {
  en: 'English',
  ru: 'Русский',
  ua: 'Українська',
}

const LocalSelector = () => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || '/';

    router.push(newPath);
  };

  return (
    <div className={styles.selector}>
      <button type='button' className={styles.selector__header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.selector__lang}>{LANGS[locale]}</span>
        <span className={`${styles.selector__icon} ${isOpen ? styles['selector__icon--open'] : styles['selector__icon--close']}`}/>
      </button>
      <div 
      className={`${styles.selector__menu} ${isOpen ? styles['selector__menu--open'] : styles['selector__menu--close']}`}
      style={
        isOpen && itemRef.current 
          ? { height: itemRef.current.scrollHeight } 
          : { height: '0px' }
      }
      >
        <div className={styles.selector__items} ref={itemRef}>
          {Object.entries(LANGS).map(([code], i) => (
            <button 
              type='button' 
              className={styles.selector__item} 
              key={i}
              onClick={() => switchLanguage(code)}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocalSelector;