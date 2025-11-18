'use client'

import styles from './styles.module.scss'
import { Button, Title, Text } from '@/components/ui'
import Image from 'next/image'
import { useTestModal } from '@/context/TestModalContext'

const Questionnaire = () => {
  const { openTest } = useTestModal();
  
  return (
    <section className={styles.section}>
      <span className={styles.section__bg}>
        <Image src={'/images/bg/Frame 1626.webp'} className={styles.section__bg} width={1920} height={751} alt='img'/>
      </span>
      <div className={styles.section__inner}>
        <div className={styles.section__header}>
          <Title className={styles.section__title} tag='h2' text='Open Your Soul Archetype'/>
          <Text className={styles.section__message} text='7 questions — 2 minutes. Results instantly, no email required'/>
        </div>
        <Button as='button' text='Take the test' onClick={openTest}/>
      </div>
    </section>
  )
}

export default Questionnaire