'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { createSlug } from '@/utils/slug'
import { CategoryCard, CategoriesGrid, CategoriesContainer } from '@/components/categories'
import styles from './styles.module.scss'
import { useTranslations, useLocale } from 'next-intl'
import type { TarotCategory } from '@/lib/types/shuffle'

export default function CategoriesPage() {
  const t = useTranslations('CategoriesPage')
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const {categories, isLoading} = useAppSelector(state => state.shuffle)

  const onClickSelectCategory = (category: TarotCategory) => {
    dispatch(shuffleActions.setSelectedCategory({data: category, lang: locale}))
  }

  // useEffect(() => {
  //   // dispatch(shuffleActions.clearSelectedCategory())
  //   // dispatch(shuffleActions.clearShuffleSpreads())
  // }, [])

  useEffect(() => {
    if (!categories.data || categories.data?.length == 0 || categories.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
  }, [dispatch, categories.data, locale])

  if (isLoading || !categories.data) {
    return (
      <div className={styles.loading}>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <CategoriesContainer
      title={t('title')}
      description={t('subtitle')}
    >
      <CategoriesGrid>
        {categories.data?.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            image={category.image}
            href={`/categories/spread`}
            onClick={() => onClickSelectCategory(category)}
          />
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  )
}