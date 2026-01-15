'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import PreloadingContext from '@/contexts/animation'
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { ReaderStyleSelector } from '@/components/shuffle/reader-style-selector'
import { Chat } from '@/components/shuffle/chat'
import { ChartCanvas } from '@/components/shuffle/chart-canvas'
import { createSlug } from '@/utils/slug'
import styles from './styles.module.scss'
import { useLocale } from 'next-intl'
import { Loader } from '@/components/sections'

function ShufflePageContent() {
  const params = useParams()
  const categoryId = params.category as string
  const spreadId = params.spread as string
  const locale = useLocale()

  const dispatch = useAppDispatch()
  const {response, categories, spreads, selectedCategory, selectedSpread, readerStyle, isLoading} = useAppSelector(state => state.shuffle)

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
    const fetchCategories = async () => {
      if (categories.data && categories.data.length > 0) return
      await dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
    fetchCategories()
  }, [dispatch, categories])

  useEffect(() => {
    if (categories && categoryId && !selectedCategory) {
      const category = categories.data?.find(cat => {
        const categorySlug = createSlug(cat.name)
        return categorySlug === categoryId || cat.id === categoryId
      })
      if (category) {
        dispatch(shuffleActions.setSelectedCategory({data: category, lang: locale}))
      }
    }
  }, [categories, categoryId, selectedCategory, dispatch])

  useEffect(() => {
    if (selectedCategory && spreadId && !selectedSpread) {
      const fetchSpreads = async () => {
        await dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
      }
      fetchSpreads()
    }
  }, [selectedCategory, spreadId, selectedSpread, dispatch])

  useEffect(() => {
    if (spreads && spreadId && !selectedSpread) {
      const spread = spreads.data?.find(spr => {
        const spreadSlug = createSlug(spr.name)
        return spreadSlug === spreadId || spr.id === spreadId
      })
      if (spread && spreads.lang) {
        dispatch(shuffleActions.setSelectedSpread({data: spread, lang: spreads.lang}))
      }
    }
  }, [spreads, spreadId, selectedSpread, dispatch])

  if (isLoading && !categories) {
    return (
      <Loader />
    )
  }

  const showReaderStyle = !readerStyle && !response
  const showChat = Boolean(readerStyle && !response)
  const showCanvas = Boolean(response && matrix && Object.keys(cards).length > 0)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Расклад Таро</h1>

      {selectedCategory && selectedSpread && (
        <>
          <ReaderStyleSelector isVisible={showReaderStyle} />
          <Chat isVisible={showChat} />
        </>
      )}

      {showCanvas && matrix && (
        <div className={styles.chartContainer}>
          <ChartCanvas matrix={matrix} cards={cards} />
        </div>
      )}

      {response?.reading && (
        <div className={styles.reading}>
          <h2>Интерпретация</h2>
          {response.reading.interpretation && (
            <>
              <div className={styles.readingSection}>
                <h3>Введение</h3>
                <p>{response.reading.interpretation.intro}</p>
              </div>
              <div className={styles.readingSection}>
                <h3>Анализ</h3>
                <p>{response.reading.interpretation.analysis}</p>
              </div>
              <div className={styles.readingSection}>
                <h3>Заключение</h3>
                <p>{response.reading.interpretation.final}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function ShufflePage() {
  return (
    <PreloadingContext>
      <ShufflePageContent />
    </PreloadingContext>
  )
}

