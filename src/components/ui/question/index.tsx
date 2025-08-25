'use client'

import styles from './styles.module.scss';

import { useRef } from 'react';
import { TFAQ_DATA } from '@/components/sections/faq/data';

type TProps = {
  data: TFAQ_DATA;
  isOpen: boolean;
  setIsOpen: () => void
}

const Question = ({data, isOpen, setIsOpen}: TProps) => {
  const itemRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.question} onClick={setIsOpen}>
      <button type='button' className={styles.question__header}>
        <span className={styles.question__question}>{data.question}</span>
        <span className={`${styles.question__plus} ${isOpen ? styles['question__plus--open'] : ''}`}/>
      </button>
      <div 
      className={`${styles.question__content}`}
      style={
        isOpen && itemRef.current 
          ? { height: itemRef.current.scrollHeight } 
          : { height: '0px' }
      }>
        <p 
          className={styles.question__content_inner} 
          ref={itemRef} 
          dangerouslySetInnerHTML={{__html: data.answer}}
        />
      </div>
    </div>
  )
}

export default Question