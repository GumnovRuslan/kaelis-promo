'use client'

import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { CategoryCard, CategoriesGrid, CategoryDetailContainer, CategoriesContainer } from '@/components/categories'
import styles from './styles.module.scss'
import { useLocale } from 'next-intl'
import { TarotCard } from '@/lib/types/shuffle'

export default function CategoryDetailPage() {
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const {categories, selectedCategory, spreads, isLoading} = useAppSelector(state => state.shuffle)
  const isLoadingSpreads = isLoading || !spreads.data

  const handleSelectSpread = (spread: TarotCard) => {
    dispatch(shuffleActions.setSelectedSpread(spread))
  }

  useEffect(() => {
    dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
    dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
  }, [locale])

  if (isLoading && !categories) {
    return (
      <CategoriesContainer>
        <div className={styles.loading}>Загрузка...</div>
      </CategoriesContainer>
    )
  }

  if (!selectedCategory.data) {
    return (
      <CategoriesContainer>
        <div className={styles.error}>Категория не найдена</div>
      </CategoriesContainer>
    )
  }

  return (
    <CategoryDetailContainer
      title={selectedCategory.data.name}
      description={selectedCategory.data.description}
      backHref="/categories"
    >
      {isLoadingSpreads ? (
        <div className={styles.loading}>Загрузка спредов...</div>
      ) : spreads.data && spreads.data.length > 0 ? (
        <CategoriesGrid>
          {spreads.data.map((spread) => (
            <CategoryCard
              key={spread.id}
              id={spread.id}
              name={spread.name}
              description={spread.description}
              image={spread.image}
              href={`/categories/spread/question`}
              onClick={() => {handleSelectSpread(spread)}}
            />
          ))}
        </CategoriesGrid>
       ) : (
        <div className={styles.error}>Спреды не найдены</div>
      )}
    </CategoryDetailContainer>
  )
}

