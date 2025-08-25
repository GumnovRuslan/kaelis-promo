import styles from './styles.module.scss';

import Image from 'next/image';
import ButtonStore from '../../button-store';
import { useTranslations } from 'next-intl';

const AppIntroCard = () => {
  const t = useTranslations('HomePage.aboutApp.cards.appInto');

  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <Image className={styles.card__bg} src={'/images/bg/card_bg_1.svg'} fill alt={'bg'}/>
        <div className={styles.card__content}>
          <Image className={styles.card__logo} src={'/images/logo.svg'} fill alt={'logo image'}/>
          <div className={styles.card__content_inner}>
            <h3 className={styles.card__title}>{t('title')}</h3>
            <p className={styles.card__description}>{t('desc')}</p>
          </div>
          <div className={styles.card__buttons}>
            <ButtonStore type='app' className={styles.card__button}/>
            <ButtonStore type='google' className={styles.card__button}/>
          </div>
        </div>
        <div className={styles.card__image}>
          <Image src={'/images/mobile_image.webp'} fill alt='mobile app image' unoptimized/>
        </div>
      </div>
    </div>
  )
}

export default AppIntroCard;