'use client'

import styles from './styles.module.scss';

import Button from '../button';
import { AppleStoreIcon, GooglePlayIcon } from '@/components/icons';
import React from 'react';
import { useModalContext } from '@/context/modal';

type StoreType = 'app' | 'google';

type TButton = {
  icon: React.ReactNode;
  text: string;
  title: string;
};

const BUTTONS_DATA: Record<StoreType, TButton> = {
  app: {
    icon: <AppleStoreIcon />,
    text: 'Download on',
    title: 'App Store',
  },
  google: {
    icon: <GooglePlayIcon />,
    text: 'Get on',
    title: 'Google Play',
  },
};

type TProps = {
  type: StoreType;
  className?: string;
};

const ButtonStore = ({ type, className }: TProps) => {
  const {openModal} = useModalContext()
  const button = BUTTONS_DATA[type];

  return (
    <Button as='button' className={`${styles.button} ${className}`} onClick={openModal}>
      <div className={styles.button__inner}>
        <span className={styles.button__icon}>{button.icon}</span>
        <div className={styles.button__content}>
          <span className={styles.button__text}>{button.text}</span>
          <span className={styles.button__title}>{button.title}</span>
        </div>
      </div>
    </Button>
  );
};

export default ButtonStore;