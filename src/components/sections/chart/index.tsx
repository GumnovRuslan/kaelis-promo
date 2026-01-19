'use client'

import { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { ChartCanvas } from '@/components/shuffle/chart-canvas';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

export default function Chart() {
  const t = useTranslations('CategoriesPage')
    const {response} = useAppSelector(state => state.shuffle)
    const dispatch = useAppDispatch()
    const [expandedSections, setExpandedSections] = useState<{
      answer: boolean
      synthesis: boolean
      conclusion: boolean
    }>({
      answer: false,
      synthesis: false,
      conclusion: false,
    })

    const matrix = useMemo(() => {
        if (!response?.tarot?.matrix) return null
        return Object.keys(response.tarot.matrix).map(key => {
          const [x, y] = response.tarot.matrix[key]
          return { x, y }
        })
      }, [response])
    
      const cards = useMemo(() => {
        return response?.cards || {}
      }, [response])
    
    const toggleSection = (section: 'answer' | 'synthesis' | 'conclusion') => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section],
      }))
    }
  
    const handleNewReading = () => {
      dispatch(shuffleActions.clearChart())
      setExpandedSections({
        answer: false,
        synthesis: false,
        conclusion: false,
      })
    }
    
  return (
  <>
    {response && matrix && Object.keys(cards).length > 0 && (
          <div className={styles.chartContainer}>
            <ChartCanvas matrix={matrix} cards={cards} />
          </div>
        )}

        {response && <div className={styles.learnMore}>
          <span>{t('tarot.more')}</span>
        </div>}


        {response?.reading?.interpretation && (
          <div className={styles.readingContainer}>
            {response.reading.interpretation.intro && (
              <div className={styles.readingSection}>
                <button
                  type="button"
                  className={styles.readingSection__header}
                  onClick={() => toggleSection('answer')}
                >
                  <span>Answer</span>
                  <span className={`${styles.readingSection__icon} ${expandedSections.answer ? styles['readingSection__icon--open'] : ''}`} />
                </button>
                {expandedSections.answer && (
                  <div className={styles.readingSection__content}>
                    <div className={styles.readingSection__content_inner}>
                      <p>{response.reading.interpretation.intro}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {response.reading.interpretation.analysis && (
              <div className={styles.readingSection}>
                <button
                  type="button"
                  className={styles.readingSection__header}
                  onClick={() => toggleSection('synthesis')}
                >
                  <span>Synthesis</span>
                  <span className={`${styles.readingSection__icon} ${expandedSections.synthesis ? styles['readingSection__icon--open'] : ''}`} />
                </button>
                {expandedSections.synthesis && (
                  <div className={styles.readingSection__content}>
                    <div className={styles.readingSection__content_inner}>
                      <p>{response.reading.interpretation.analysis}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {response.reading.interpretation.final && (
              <div className={styles.readingSection}>
                <button
                  type="button"
                  className={styles.readingSection__header}
                  onClick={() => toggleSection('conclusion')}
                >
                  <span>Conclusion</span>
                  <span className={`${styles.readingSection__icon} ${expandedSections.conclusion ? styles['readingSection__icon--open'] : ''}`} />
                </button>
                {expandedSections.conclusion && (
                  <div className={styles.readingSection__content}>
                    <div className={styles.readingSection__content_inner}>
                      <p>{response.reading.interpretation.final}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <Button
          as='link'
          href='/categories'
          onClick={handleNewReading}
          className={styles.newReadingButton}
          text={t('buttons.new_reading')}
        />
    </>
  )
}