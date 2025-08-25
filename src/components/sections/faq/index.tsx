'use client'

import styles from './styles.module.scss'

import { Question } from '@/components/ui';
import { FAQ_DATA } from './data';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const t = useTranslations('FaqPage')
  const [idOpen, setIdOpen] = useState<number | null>(null)
  const keys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const;

  const items = keys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`)
  }));

  return (
    <section className={styles.faq}>
      <Image className={styles.faq__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
      <div className={styles.faq__inner}>
        <h1 className={styles.faq__title}>{t('title')}</h1>
        <div className={styles.faq__content}>
          {items.map((item, i) => 
          <Question 
            data={item}
            isOpen={i === idOpen} 
            setIsOpen={() => {i === idOpen ? setIdOpen(null) : setIdOpen(i)}} 
            key={i}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default FAQ;