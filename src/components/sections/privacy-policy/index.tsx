import styles from './styles.module.scss';

import { useTranslations } from 'next-intl';

const PrivacyPolicy = () => {
  const t = useTranslations('PrivacyPolicyPage');

  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Kaelis</span>
          <span>{t('title')}</span>
        </h1>
        <h2 className={styles.privacy__published}>{t('published')}</h2>
        <div className={styles.privacy__content}>
          <div>
            <h3>{t('subtitle')}</h3>
            <p>{t('intro')}</p>
          </div>
          <div>
            <h3>{t('sections.lunarPhases.title')}</h3>
            <ul>
              <li>{t('sections.lunarPhases.items.newMoon')}</li>
              <li>{t('sections.lunarPhases.items.waxingMoon')}</li>
              <li>{t('sections.lunarPhases.items.fullMoon')}</li>
              <li>{t('sections.lunarPhases.items.waningMoon')}</li>
            </ul>
            <p>{t('sections.emotions.title')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy;