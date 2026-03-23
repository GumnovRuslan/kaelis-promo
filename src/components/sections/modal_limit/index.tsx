'use client'

import styles from './styles.module.scss';
import { ModalWrapper} from '@/components/ui';
import { getDeviceType} from '@/utils/getDevice';
import Image from 'next/image';
import Link from 'next/link';
import { STORES, TStores } from '@/lib/config/stores';
import { useModalLimitContext } from '@/context/modalLimit';
import {ButtonStore} from '@/components/ui';
import { useTranslations } from 'next-intl';

export default function ModalLimit() {
  const device = getDeviceType()
  const {isOpenModal, closeModal} = useModalLimitContext()
  const t = useTranslations('CategoriesPage.modal')

  return (
    <ModalWrapper isShow={isOpenModal} handlerClose={closeModal} className={styles.modal}>
      <div className={styles.modal_limit}>
        <h2 className={styles.modal_limit__title}>{t('title')}</h2>
        <div className={styles.modal_limit__descriptions}>
          <p className={styles.modal_limit__description}>{t('description_1')}</p>
          <p className={styles.modal_limit__description}>{t('description_2')}</p>
          <p className={styles.modal_limit__description}>{t('description_3')}</p>
        </div>
        
        <div className={styles.modal_limit__stores}>
          {((device === 'ios' || device === 'desktop') && STORES.ios) && (
            <AppStoreQR {...STORES?.ios}/>
          )}

          {((device === 'android' || device === 'desktop') && STORES.android) && (
            <AppStoreQR {...STORES?.android}/>
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}

function AppStoreQR({name, platform, qr_code_src, link}: TStores) {
  const buttonType = 
  (platform === 'ios') ? 'app' : 
  (platform === 'android') ? 'google' : null
  return (
    <div className={styles.store}>
      <span className={styles.store__title}>{name}</span>
      <span className={styles.store__qr_image}></span>
      {/* <Image src={qr_code_src}/> */}
      <div className={styles.store__link_container}>
        {/* <Link className={styles.store__link} target='_blank' href={link.href}>{link.href}</Link> */}
        {buttonType && <ButtonStore type={buttonType}/>}
      </div>
    </div>
  )
}