'use client'

import styles from './styles.module.scss';

import { Button, Card } from '@/components/ui';
import { useModalContext } from '@/context/modal';
import { useTranslations } from 'next-intl';

const Subscribe = () => {
  const t = useTranslations('HomePage.subscribe')
  const { openModal, setContent } = useModalContext()
  const cardKeys = ['natal', 'matrix', 'tarot', 'affirmations'] as const;

  const cards = cardKeys.map((key) => ({
    title: t(`cards.${key}.title`),
    desc: t(`cards.${key}.text`)
  }));

  const handlerOpenModal = () => {
    setContent('join')
    openModal()
  }

  return (
    <section className={styles.subscribe}>
      <div className={styles.subscribe__inner}>
        <div className={styles.subscribe__header}>
          <Button text={t('button')} as='button' onClick={handlerOpenModal}/>
          <p className={styles.subscribe__description}>{t("text")}</p>
        </div>
        <div className={styles.subscribe__content}>
          {cards.map((card, i) => 
            <Card {...card} img_num={i+1} key={i}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default Subscribe;