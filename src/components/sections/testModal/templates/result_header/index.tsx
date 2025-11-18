import { useTranslations } from 'next-intl';
import styles from './styles.module.scss'
import Image from 'next/image';

const ResultHeader = ({title, subtitle}: {title: string, subtitle: string}) => {
  const t = useTranslations('Archetypes');

  return (
    <div className={styles.header}>
      <div className={styles.header__gif}>
        {/* <Image/> */}
      </div>
      <div className={styles.header__info}>
        <Image className={styles.header__info_image} src={'/images/bg/stars.png'} fill alt={'image'}/>
        <span className={styles.header__title}>{t(title)}</span>
        <span className={styles.header__subtitle}>{t(subtitle)}</span>
      </div>
    </div>
  )
}

export default ResultHeader