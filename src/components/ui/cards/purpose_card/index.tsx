import styles from './styles.module.scss';

import Image from 'next/image';
import { StarIcon } from '@/components/icons';

const PurposeCard = () => {
  return (
    <div className={styles.card}>
      <Image src={'/images/bg/card_bg_2.svg'} fill alt='card background'/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>
          What is the purpose of using the app?
        </h3>
        <div className={styles.card__items}>
          <StarIcon/>
        </div>
      </div>
    </div>
  )
}

export default PurposeCard;