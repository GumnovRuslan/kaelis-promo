import styles from './styles.module.scss';

import { ButtonStore } from '@/components/ui';
import { RingsIcon } from '@/components/icons';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <span className={styles.hero__icon_bg}>
            <RingsIcon />
          </span>
          <h1 className={styles.hero__title}>
            Understand yourself Change your life
          </h1>
          <p className={styles.hero__subtitle}>
            Tools for conscious change
          </p>
          <p className={styles.hero__description}>
            Personalized recommendations based on astrology, Tarot, and proven methods — for mindful decisions and harmony in everyday life
          </p>
          <div className={styles.hero__buttons}>
            <ButtonStore type='google' />
            <ButtonStore type='app' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;