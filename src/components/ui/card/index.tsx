'use client'

import styles from './styles.module.scss';

import { useState } from 'react';
import Image from 'next/image';

type TProps = {
  title: string;
  desc: string;
  img_num: number;
}

const Card = ({ title, desc, img_num = 1}: TProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.cardWrapper} onClick={() => setFlipped(!flipped)}>
      <div className={`${styles.card} ${flipped ? styles.card__flipped : ""}`}>
        <div className={styles.card__back}>
          <Image className={styles.card__background} src='/images/cards/card_back.svg' fill alt="card background back"/>
        </div>
        <div className={styles.card__front}>
          <Image className={styles.card__background} src={`/images/cards/card_astrology_${img_num}.svg`} fill alt="card background front"/>
          <div className={styles.card__content}>
            <h2 className={styles.card__title}>{title}</h2>
            <p className={styles.card__description}>{desc}</p>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Card;