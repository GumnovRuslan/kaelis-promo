'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { CategoryCard, CategoriesGrid, CategoryDetailContainer, CategoriesContainer } from '@/components/categories'
import styles from './styles.module.scss'
import { useLocale, useTranslations } from 'next-intl'
import { TarotCard } from '@/lib/types/shuffle'
import { ButtonBack } from '@/components/ui'
import { Loader } from '@/components/sections'

export default function SpreadsPage() {
  const locale = useLocale()
  const t = useTranslations('CategoriesPage')
  const dispatch = useAppDispatch()
  const {selectedCategory, spreads, isLoading} = useAppSelector(state => state.shuffle)

  const handleSelectSpread = (spread: TarotCard) => {
    if(!spreads.data || !spreads.lang) return
    dispatch(shuffleActions.setSelectedSpread({data: spread, lang: spreads.lang}))
  }

  useEffect(() => {
    dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))

    if(!selectedCategory.data || selectedCategory.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
  }, [locale])

  if (isLoading) {
    return <Loader text={t('loader.load')}/>
  }

  return (
    <CategoryDetailContainer>
      <div className={styles.header}>
        <ButtonBack href={"/categories"} text={t('buttons.back')}/>
        {selectedCategory.data?.name && <h1 className={styles.header__title}>{selectedCategory.data.name}</h1>}
        {selectedCategory.data?.description && <p className={styles.heder__description}>{selectedCategory.data.description}</p>}
      </div>
      {!selectedCategory.data 
        ? <Loader text={t('loader.categoryNotFound')}/> 
        : (!spreads.data || !spreads.data.length) 
          ? <Loader text={t('loader.spreadsNotFound')}/>
          : (
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
       )}
    </CategoryDetailContainer>
  )
}