'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { createSlug } from '@/utils/slug'
import { TarotCategory, TarotCard } from '@/lib/types/shuffle'
import styles from './styles.module.scss'
import { useLocale } from 'next-intl'

export function ShuffleSelector() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.shuffle.categories)
  const spreads = useAppSelector(state => state.shuffle.spreads)
  const selectedCategory = useAppSelector(state => state.shuffle.selectedCategory)
  const selectedSpread = useAppSelector(state => state.shuffle.selectedSpread)
  const isLoading = useAppSelector(state => state.shuffle.isLoading)

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSpreadOpen, setIsSpreadOpen] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)
  const spreadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
      if (spreadRef.current && !spreadRef.current.contains(event.target as Node)) {
        setIsSpreadOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!categories.data || categories.data.length === 0) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
  }, [dispatch, categories])

  useEffect(() => {
    if (selectedCategory) {
      dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
    }
  }, [dispatch, selectedCategory])

  const handleCategorySelect = (category: TarotCategory) => {
    dispatch(shuffleActions.setSelectedCategory({data: category, lang: locale}))
    dispatch(shuffleActions.clearSelectedSpread())
    setIsCategoryOpen(false)
  }

  const handleSpreadSelect = (spread: TarotCard, lang: string) => {
    dispatch(shuffleActions.setSelectedSpread({data: spread, lang}))
    setIsSpreadOpen(false)
    
    if (selectedCategory.data) {
      const categorySlug = createSlug(selectedCategory.data.name)
      const spreadSlug = createSlug(spread.name)
      router.push(`/${locale}/shuffle-layout/${categorySlug}/${spreadSlug}`)
    }
  }

  return (
    <div className={styles.selector}>
      <div className={styles.selectWrapper} ref={categoryRef}>
        <button
          className={`${styles.select} ${isCategoryOpen ? styles.selectOpen : ''}`}
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen)
            setIsSpreadOpen(false)
          }}
          disabled={isLoading}
        >
          <span>{selectedCategory.data?.name || 'Категория'}</span>
          <svg width="3" height="2" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isCategoryOpen && categories.data && categories.data.length > 0 && (
          <div className={styles.dropdown}>
            {categories.data.map((category) => (
              <button
                key={category.id}
                className={`${styles.option} ${selectedCategory.data?.id === category.id ? styles.optionActive : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.selectWrapper} ref={spreadRef}>
        <button
          className={`${styles.select} ${isSpreadOpen ? styles.selectOpen : ''}`}
          onClick={() => {
            setIsSpreadOpen(!isSpreadOpen)
            setIsCategoryOpen(false)
          }}
          disabled={isLoading || !selectedCategory}
        >
          <span>{selectedSpread.data?.name || 'Расклад'}</span>
          <svg width="3" height="2" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isSpreadOpen && spreads.data && spreads.lang && spreads.data.length > 0 && (
          <div className={styles.dropdown}>
            {spreads.data.map((spread) => (
              <button
                key={spread.id}
                className={`${styles.option} ${selectedSpread.data?.id === spread.id ? styles.optionActive : ''}`}
                onClick={() => handleSpreadSelect(spread, spreads.lang!)}
              >
                {spread.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

