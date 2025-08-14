import styles from './styles.module.scss';

import Image from 'next/image';
import { StarIcon } from '@/components/icons';

const items = [
  'Improve relationships',
  'Find the right career path',
  'Understand your strengths and weaknesses',
  'Get an action plan',
]

const PurposeCard = () => {
  return (
    <div className={styles.card}>
      <Image src={'/images/bg/card_bg_2.svg'} fill alt='card background'/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>
          What is the purpose of using the app?
        </h3>
        <div className={styles.card__items}>
          {items.map((text, i) => (
            <div className={styles.card__item} key={i}>
              <span className={styles.card__item_icon}>
                <StarIcon/>
              </span>
              <span className={styles.card__item_text}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PurposeCard;