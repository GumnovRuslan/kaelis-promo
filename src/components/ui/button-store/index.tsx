'use client'

import styles from './styles.module.scss';

import Button from '../button';
import React from 'react';
import { useModalContext } from '@/context/modal';
import { STORES } from '@/lib/config/stores';

type StoreType = 'app' | 'google';

type TButton = {
  icon: React.ReactNode;
  text: string;
  title: string;
  href?: string | null;
};

const BUTTONS_DATA: Record<StoreType, TButton> = {
  app: {
    icon: STORES.ios?.icon,
    text: 'Download on',
    title: 'App Store',
    href: STORES.ios?.link?.href,
  },

  google: {
    icon: STORES.android?.icon,
    text: 'Get on',
    title: 'Google Play',
    href: STORES.android?.link?.href,
  },
};

type TProps = {
  type: StoreType;
  className?: string;
};

const ButtonStore = ({ type, className }: TProps) => {
  const {openModal} = useModalContext()
  const button = BUTTONS_DATA[type];

  const handleClick = () => {
    if (!!button.href) {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', type === 'app' ? 'click_appstore' : 'click_googleplay', {
          page_path: window.location.pathname,
        });
      }
    } else {
      openModal();
    }
  };

  return button?.href ? (
    <Button as={'link'} href={button.href} target='_blank' className={`${styles.button} ${className}`} onClick={handleClick}>
      <InnerButton {...button}/>
    </Button>
  ) : (
    <Button as={'button'} className={`${styles.button} ${className}`} onClick={handleClick}>
      <InnerButton {...button}/>
    </Button>
  )
};

export default ButtonStore;

function InnerButton({icon, text, title}: TButton) {
    return (
      <div className={styles.button__inner}>
        <span className={styles.button__icon}>{icon}</span>
        <div className={styles.button__content}>
          <span className={styles.button__text}>{text}</span>
          <span className={styles.button__title}>{title}</span>
        </div>
      </div>
    )
  }