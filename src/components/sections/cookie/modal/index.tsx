import styles from './styles.module.scss'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TProps = {
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
}

const CookieModal = ({acceptAll, rejectAll, openSettings}: TProps) => {
  const t = useTranslations('Cookie.modal')

  return (
    <div className={styles.cookie}>
      <div className={styles.cookie__inner}>

        <div className={styles.cookie__content}>
          <p className={styles.cookie__text}>{t('description')}</p>
          <Link href='/privacy-policy' className={styles.cookie__link}>{t('link-policy')}</Link>
        </div>

        <div className={styles.cookie__buttons}>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text={t('buttons.accept.label')} onClick={acceptAll}/>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text={t('buttons.reject.label')} onClick={rejectAll}/>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text={t('buttons.settings.label')} onClick={openSettings}/>
        </div>
        
      </div>
    </div>
  )
}

export default CookieModal