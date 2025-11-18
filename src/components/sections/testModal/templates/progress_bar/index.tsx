'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss'

type TProps = {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: TProps) => {
  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!barRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      setBarWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(barRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const progressPercentage = Math.round((current / total) * 100);
  
  return (
    <div className={styles.progress}>
      <div className={styles.progress__header}>
        <span className={styles.progress__step}>Question {current} of {total}</span>
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