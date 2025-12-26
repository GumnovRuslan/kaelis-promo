'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import PreloadingContext from '@/contexts/animation'
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { ReaderStyleSelector } from '@/components/shuffle/reader-style-selector'
import { Chat } from '@/components/shuffle/chat'
import { ChartCanvas } from '@/components/shuffle/chart-canvas'
import { createSlug } from '@/utils/slug'
import { Link } from '@/i18n/navigation'
import styles from './styles.module.scss'
import { ArrowLeftIcon } from '@/components/icons'

function SpreadDetailPageContent() {
  const params = useParams()
  const categoryName = params.name as string
  const spreadName = params.spread as string

  const dispatch = useAppDispatch()
  const response = useAppSelector(state => state.shuffle.response)
  const question = useAppSelector(state => state.shuffle.question)
  const categories = useAppSelector(state => state.shuffle.categories)
  const spreads = useAppSelector(state => state.shuffle.spreads)
  const selectedCategory = useAppSelector(state => state.shuffle.selectedCategory)
  const selectedSpread = useAppSelector(state => state.shuffle.selectedSpread)
  const isLoading = useAppSelector(state => state.shuffle.isLoading)

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

  const [expandedSections, setExpandedSections] = useState<{
    answer: boolean
    synthesis: boolean
    conclusion: boolean
  }>({
    answer: false,
    synthesis: false,
    conclusion: false,
  })

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

  useEffect(() => {
    const initializeGuest = async () => {
      const guestToken = typeof window !== 'undefined' ? localStorage.getItem('guestToken') : null
      const guestId = typeof window !== 'undefined' ? localStorage.getItem('guestId') : null

      if (!guestToken || !guestId) {
        const result = await dispatch(shuffleActions.authenticateGuest())
        if (shuffleActions.authenticateGuest.fulfilled.match(result)) {
          if (result.payload) {
            dispatch(shuffleActions.setGuestAuth(result.payload))
          }
        }
      } else {
        dispatch(shuffleActions.setGuestAuth({ guestId, token: guestToken }))
      }
    }

    initializeGuest()
  }, [dispatch])

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20 }))
    }
  }, [dispatch, categories])

  useEffect(() => {
    if (categories && categoryName && !selectedCategory) {
      const category = categories.find(cat => {
        const categorySlug = createSlug(cat.name)
        return categorySlug === categoryName || cat.id === categoryName
      })
      if (category) {
        dispatch(shuffleActions.setSelectedCategory(category))
      }
    }
  }, [categories, categoryName, selectedCategory, dispatch])

  useEffect(() => {
    if (selectedCategory && (!spreads || spreads.length === 0)) {
      dispatch(shuffleActions.getTarotSpreads(selectedCategory))
    }
  }, [selectedCategory, spreads, dispatch])

  useEffect(() => {
    if (spreads && spreadName && !selectedSpread) {
      const spread = spreads.find(spr => {
        const spreadSlug = createSlug(spr.name)
        return spreadSlug === spreadName || spr.id === spreadName
      })
      if (spread) {
        dispatch(shuffleActions.setSelectedSpread(spread))
      }
    }
  }, [spreads, spreadName, selectedSpread, dispatch])

  useEffect(() => {
    return () => {
      dispatch(shuffleActions.resetShuffleResponse())
    }
  }, [dispatch])


  if (isLoading && !categories) {
    return (
      <div className={styles.loading}>
        <p>Загрузка...</p>
      </div>
    )
  }

  if (!selectedCategory || !selectedSpread) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Загрузка...</div>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href={`/categories/${categoryName}`} className={styles.backLink}>
          <ArrowLeftIcon /> <span>Назад</span>
        </Link>

        <div className={styles.breadcrumb}>
          {selectedCategory.name} {' > '} {selectedSpread.name}
        </div>

        {question && response && (
          <p className={styles.userQuestion}>{question}</p>
        )}

        {selectedSpread.description && (
          <p className={styles.description}>{selectedSpread.description}</p>
        )}

        {!response && (
          <>
            <ReaderStyleSelector isVisible={true} />
            <Chat isVisible={true} />
          </>
        )}

        {response && matrix && Object.keys(cards).length > 0 && (
          <div className={styles.chartContainer}>
            <ChartCanvas matrix={matrix} cards={cards} />
          </div>
        )}

        {response && <div className={styles.learnMore}>
          <span>Click the card to Learn More</span>
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

            <button
              type="button"
              onClick={handleNewReading}
              className={styles.newReadingButton}
            >
              Get a New Reading
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function SpreadDetailPage() {
  return (
    <PreloadingContext>
      <SpreadDetailPageContent />
    </PreloadingContext>
  )
}

