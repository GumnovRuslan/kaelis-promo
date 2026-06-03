'use client';

import { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { ChartCanvas } from '@/components/shuffle/chart-canvas';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { ShuffleCart } from '@/components/sections/shuffleChart';
import { Question } from '@/components/ui';

export default function Chart() {
  const t = useTranslations('CategoriesPage');
  const { response } = useAppSelector((state) => state.shuffle);
  const cards = response?.cards;
  const matrix = response?.tarot?.matrix;
  const [idOpen, setIdOpen] = useState<number | null>(null);
  const dispatch = useAppDispatch();

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
    <div className={styles.chart}>
      {/* {response && memoizedMatrix && Object.keys(memoizedCards).length > 0 && (
        <div className={styles.chartContainer}>
          <ChartCanvas matrix={memoizedMatrix} cards={memoizedCards} />
        </div>
      )} */}

      <div className={styles.chart__content}>
        <div className={styles.chart__tarot}>
          {response?.cards && memoizedMatrix && (
            <ShuffleCart
              matrix={memoizedMatrix}
              cards={response.cards}
              backCard={response.back_card}
            />
          )}

          {response && (
            <div className={styles.learnMore}>
              <span className={styles.learnMore__text}>{t('tarot.more')}</span>
            </div>
          )}
        </div>

        <div className={styles.chart__interpretation}>
          {response?.reading?.interpretation ? (
            response?.reading?.interpretation.map((item, i) => (
              <Question
                data={{ question: item.title, answer: item.text }}
                isOpen={i === idOpen}
                setIsOpen={() => {
                  i === idOpen ? setIdOpen(null) : setIdOpen(i);
                }}
                key={i}
              />
            ))
          ) : (
            <div className={styles.chart__loading}>
              <span className={styles.chart__loading_spin}></span>
              <span className={styles.chart__loading_text}>Loading</span>
            </div>
          )}
        </div>
      </div>

      <Button
        as='link'
        href='/tarot'
        onClick={handleNewReading}
        className={styles.newReadingButton}
        text={t('buttons.new_reading')}
      />
    </div>
  );
}
