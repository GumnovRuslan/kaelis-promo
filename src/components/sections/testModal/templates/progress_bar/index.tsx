'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss'
import { useTranslations } from 'next-intl';

type TProps = {
  current: number;
  total: number;
  answers: Record<number, string>
}

const ProgressBar = ({ current, total, answers }: TProps) => {
  const t = useTranslations('TestSection')

  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (!barRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      setBarWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(barRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const progressPercentage = Math.round((Math.min(current, answeredCount) / total) * 100);
  
  return (
    <div className={styles.progress}>
      <div className={styles.progress__header}>
        <span className={styles.progress__step}>{t('steps.question')} {current} {t('steps.of')} {total}</span>
        <span className={styles.progress__percentage}>{progressPercentage}%</span>
      </div>
      
      <div ref={barRef} className={styles.bar}>
        <div 
          className={styles.bar__progress_wrapper} 
          style={{width: current ? `calc(${progressPercentage}%)` : 0}}
        >
          <div className={styles.bar__progress} style={{width: `${barWidth}px`}}></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar