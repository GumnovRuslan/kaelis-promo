'use client';

import { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
// import { ChartCanvas } from '@/components/shuffle/chart-canvas';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { ShuffleCart } from '@/components/sections/shuffleChart';
import { Question } from '@/components/ui';
import Loader from '../loader';

export default function Chart() {
  const t = useTranslations('CategoriesPage');
  const { response, isLoading } = useAppSelector((state) => state.shuffle);
  const matrix = response?.tarot?.matrix;
  const [idOpenInterpretation, setIdOpenInterpretation] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const handleIdOpenInterpretation = (key: number) => {
    setIdOpenInterpretation((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key],
    );
  };

  const memoizedMatrix = useMemo(() => {
    if (!matrix) return null;
    return Object.keys(response.tarot.matrix).map((key) => {
      const [x, y] = response.tarot.matrix[key];
      return { x, y };
    });
  }, [matrix]);

  const handleNewReading = () => {
    dispatch(shuffleActions.clearChart());
  };

  if (isLoading && !response) {
    return <Loader isSpin text={t('loader.load')} />;
  }

  if (!response) {
    return <Loader text={t('loader.chartNotFound')} />;
  }

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

        <div className={styles.chart__interpretations}>
          {response?.reading?.interpretation ? (
            response?.reading?.interpretation.map((item, i) => (
              <Question
                classNameTitle={styles.interpretation__title}
                data={{ question: item.title, answer: item.text }}
                isOpen={idOpenInterpretation.includes(i)}
                setIsOpen={() => handleIdOpenInterpretation(i)}
                key={i}
              />
            ))
          ) : (
            <Loader isSpin text={t('loader.load')} />
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
