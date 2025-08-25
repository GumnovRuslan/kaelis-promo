import styles from './styles.module.scss';

import Image from 'next/image';
import { StarIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

const PurposeCard = () => {
  const t = useTranslations('HomePage.aboutApp.cards.purpose');

  const items = ['item1', 'item2', 'item3', 'item4'].map((key) => t(`items.${key}`));
  
  return (
    <div className={styles.card}>
      <Image src={'/images/bg/card_bg_2.svg'} fill alt='card background'/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>{t('title')}</h3>
        <div className={styles.card__items}>
          {items.map((text, i) => (
            <div className={styles.card__item} key={i}>
              <span className={styles.card__item_icon}><StarIcon/></span>
              <span className={styles.card__item_text}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PurposeCard;