'use client'

import styles from './styles.module.scss'

import { useState, useRef } from 'react'

type TLanguages = {
  [key: string]: string;
}

const LANGS: TLanguages = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
}

const LocalSelector = () => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectLang, setSelectLang] = useState<string>(LANGS.en)

  return (
    <div className={styles.selector}>
      <button type='button' className={styles.selector__header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.selector__lang}>{selectLang}</span>
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
              onClick={() => setSelectLang(LANGS[code])}
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