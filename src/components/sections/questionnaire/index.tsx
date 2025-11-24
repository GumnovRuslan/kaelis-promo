'use client'

import styles from './styles.module.scss'
import { Button, Title, Text } from '@/components/ui'
import Image from 'next/image'
import { useTestModal } from '@/context/TestModalContext'
import { useTranslations } from 'next-intl'

const Questionnaire = () => {
  const { openTest } = useTestModal();
  const t = useTranslations('TestSection')
  
  return (
    <section className={styles.section}>
      <span className={styles.section__bg}>
        <Image src={'/images/bg/Frame 1626.webp'} className={styles.section__bg} width={1920} height={751} alt='img'/>
      </span>
      <div className={styles.section__inner}>
        <div className={styles.section__header}>
          <Title className={styles.section__title} tag='h2' text={t('title')}/>
          <Text className={styles.section__message} text={t('subtitle')}/>
        </div>
        <Button as='button' text={t('buttons.open.label')} onClick={openTest}/>
      </div>
    </section>
  )
}

export default Questionnaire