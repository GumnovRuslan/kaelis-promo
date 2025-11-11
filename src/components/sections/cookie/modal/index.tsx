import styles from './styles.module.scss'

import Link from 'next/link'
import { Button } from '@/components/ui'

type TProps = {
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
}

const CookieModal = ({acceptAll, rejectAll, openSettings}: TProps) => {
  return (
    <div className={styles.cookie}>
      <div className={styles.cookie__inner}>
        <div className={styles.cookie__content}>
          <p className={styles.cookie__text}>We use cookies to personalize content, analytics, and advertising.</p>
          <Link href='#' className={styles.cookie__link}>Privacy Policy and Cookies</Link>
        </div>
        <div className={styles.cookie__buttons}>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text='Accept' onClick={acceptAll}/>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text='Reject' onClick={rejectAll}/>
          <Button as='button' className={styles.cookie__button} styleType='secondary' text='Configure' onClick={openSettings}/>
        </div>
      </div>
    </div>
  )
}

export default CookieModal