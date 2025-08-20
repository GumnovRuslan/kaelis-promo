'use client'

import styles from './styles.module.scss'

import { Question } from '@/components/ui';
import { FAQ_DATA } from './data';
import { useState } from 'react';
import Image from 'next/image';

const FAQ = () => {
  const [idOpen, setIdOpen] = useState<number | null>(null)
  return (
    <section className={styles.faq}>
      <Image className={styles.faq__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
      <div className={styles.faq__inner}>
        <h1 className={styles.faq__title}>F.A.Q.</h1>
        <div className={styles.faq__content}>
          {FAQ_DATA.map((item, i) => 
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