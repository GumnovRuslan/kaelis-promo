import styles from './styles.module.scss';

import { ButtonStore } from '@/components/ui';
import { RingsIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('HomePage.hero')

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <span className={styles.hero__icon_bg}>
            <RingsIcon />
          </span>
          <h1 className={styles.hero__title}>{t('title')}</h1>
          <p className={styles.hero__subtitle}>{t('subtitle')}</p>
          <p className={styles.hero__description}>{t('text')}</p>
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