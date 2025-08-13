import styles from './styles.module.scss';

import Image from 'next/image';

const Card = () => {
  return (
    <div className={styles.card}>
      <Image src='/images/cards/card_astrology_1.webp' fill alt="card background"/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>Natal chart</h3>
        <p className={styles.card__description}>Understand what is built into your personality</p>
      </div>
    </div>
  )
}

export default Card;