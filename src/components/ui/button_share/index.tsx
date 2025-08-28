'use client'

import styles from './styles.module.scss'

import { ShareIcon } from '@/components/icons'
import { useState } from 'react';

const ButtonShare = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать ссылку: ', err);
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.message} ${isCopied ? styles['message--visible'] : styles['message--hidden']}`}>
        <span className={styles.message__text}>url copied</span>
      </div>
      <button type='button' className={styles.share} onClick={copyToClipboard}>
      <span className={styles.share__icon}>
        <ShareIcon/>
      </span>
      <span className={styles.share__text}>Share</span>
    </button>
    </div>
  )
}

export default ButtonShare