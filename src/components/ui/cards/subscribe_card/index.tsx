import styles from './styles.module.scss';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { getSocialData } from '@/lib/social_data';

const SubscribeCard = async () => {
  const t = useTranslations('HomePage.aboutApp.cards.subscribe');
  const locale = await getLocale();
  const social = getSocialData({lang: locale as 'en' | 'ru' | 'ua'});

  return (
    <div className={styles.card}>
      <Image className={styles.card__bg} src={'/images/bg/stars_2.svg'} fill alt='stars background'/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>{t('title')}</h3>
        <div className={styles.card__network}>
          {social.map((item, i) => (
            <Link key={i} href={item.href} target='_blank' className={styles.card__link} aria-label={item.name}>
              <item.icon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscribeCard;