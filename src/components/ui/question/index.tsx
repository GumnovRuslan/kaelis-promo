'use client';

import styles from './styles.module.scss';

import { useRef } from 'react';
import { TFAQ_DATA } from '@/components/sections/faq/data';
import cn from 'classnames';

type TProps = {
  data: TFAQ_DATA;
  isOpen: boolean;
  setIsOpen: () => void;
  className?: string;
  classNameTitle?: string;
};

const Question = ({ data, isOpen, setIsOpen, className, classNameTitle }: TProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(styles.question, className)} onClick={setIsOpen}>
      <button type='button' className={styles.question__header}>
        <span className={cn(styles.question__question, classNameTitle)}>{data.question}</span>
        <span className={cn(styles.question__plus, isOpen ? styles['question__plus--open'] : '')} />
      </button>
      <div
        className={`${styles.question__content}`}
        style={
          isOpen && itemRef.current ? { height: itemRef.current.scrollHeight } : { height: '0px' }
        }
      >
        <p
          className={styles.question__content_inner}
          ref={itemRef}
          dangerouslySetInnerHTML={{ __html: data.answer }}
        />
      </div>
    </div>
  );
};

export default Question;
