'use client';

import { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { ChartCanvas } from '@/components/shuffle/chart-canvas';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

export default function Chart() {
  const t = useTranslations('CategoriesPage');
  const { response } = useAppSelector((state) => state.shuffle);
  const cards = response?.cards;
  const matrix = response?.tarot?.matrix;
  const dispatch = useAppDispatch();

  console.log('Chart response:', response);

  const memoizedMatrix = useMemo(() => {
    if (!matrix) return null;
    return Object.keys(response.tarot.matrix).map((key) => {
      const [x, y] = response.tarot.matrix[key];
      return { x, y };
    });
  }, [matrix]);

  const memoizedCards = useMemo(() => {
    return response?.cards || {};
  }, [cards]);

  const handleNewReading = () => {
    dispatch(shuffleActions.clearChart());
  };

  return (
    <>
      {response && memoizedMatrix && Object.keys(memoizedCards).length > 0 && (
        <div className={styles.chartContainer}>
          <ChartCanvas matrix={memoizedMatrix} cards={memoizedCards} />
        </div>
      )}

      {response && (
        <div className={styles.learnMore}>
          <span className={styles.learnMore__text}>{t('tarot.more')}</span>
        </div>
      )}

      {/* {response?.reading?.interpretation &&
        response?.reading?.interpretation.map((item, index) => (
          <div key={index} className={styles.readingSection}>
            <h3 className={styles.readingSection__header}>{item.title}</h3>
          </div>
        ))} */}

      <Button
        as='link'
        href='/tarot'
        onClick={handleNewReading}
        className={styles.newReadingButton}
        text={t('buttons.new_reading')}
      />
    </>
  );
}
