import styles from './styles.module.scss';

import Image from 'next/image';
import ButtonStore from '../../buttonStore';

const AppIntroCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <Image className={styles.card__bg} src={'/images/bg/card_bg_1.svg'} fill alt={'bg'}/>
        <div className={styles.card__content}>
          <Image className={styles.card__logo} src={'/images/logo.svg'} fill alt={'logo image'}/>
          <div className={styles.card__content_inner}>
            <h3 className={styles.card__title}>AI Daily Card</h3>
            <p className={styles.card__description}>
              Personal predictions from AI, ancient wisdom of Tarot cards, and astrological forecasts in one app
            </p>
          </div>
          <div className={styles.card__buttons}>
            <ButtonStore type='app' className={styles.card__button}/>
            <ButtonStore type='google' className={styles.card__button}/>
          </div>
        </div>
        <div className={styles.card__image}>
          <Image src={'/images/mobile_image.webp'} fill alt='mobile app image'/>
        </div>
      </div>
    </div>
  )
}

export default AppIntroCard;