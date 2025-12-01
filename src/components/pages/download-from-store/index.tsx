import styles from './styles.module.scss'
import { ButtonStore } from "@/components/ui"
import { useTranslations } from 'next-intl'

const DownloadFromStore = () => {
  const t = useTranslations('DownloadFromStore');
  
  return (
    <div className={styles.section}>
      <p className={styles.section__text}>{t('text')}</p>
      <div className={styles.section__buttons}>
        <ButtonStore type="app" />
        <ButtonStore type="google" />
      </div>
    </div>
  )
}

export default DownloadFromStore