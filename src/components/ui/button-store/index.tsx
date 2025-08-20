import styles from './styles.module.scss';

import Button from '../button';
import { AppleStoreIcon, GooglePlayIcon } from '@/components/icons';
import React from 'react';

type StoreType = 'app' | 'google';

type TButton = {
  type: 'link';
  href: string;
  icon: React.ReactNode;
  text: string;
  title: string;
};

const BUTTONS_DATA: Record<StoreType, TButton> = {
  app: {
    type: 'link',
    href: '#',
    icon: <AppleStoreIcon />,
    text: 'Download on',
    title: 'App Store',
  },
  google: {
    type: 'link',
    href: '#',
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
  const button = BUTTONS_DATA[type];

  return (
    <Button as='link' type={button.type} href={button.href} className={`${styles.button} ${className}`}>
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