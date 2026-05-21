'use client'

import styles from './styles.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { CategoryCard, CategoriesGrid } from '@/components/categories'
import { useLocale, useTranslations } from 'next-intl'
import { TarotCard } from '@/lib/types/shuffle'
import { Breadcrumbs, ButtonBack } from '@/components/ui'
import { Loader } from '@/components/sections'
import { useSearchParams } from 'next/navigation'
import { TBreadcrumbs } from '@/types/breadcrumbs'

export default function SpreadsPage() {
  const locale = useLocale()
  const t = useTranslations('CategoriesPage')
  const b = useTranslations('breadcrumbs')
  const dispatch = useAppDispatch()
  const {selectedCategory, categories, spreads, isLoading} = useAppSelector(state => state.shuffle)
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');

  const breadcrumbsData: TBreadcrumbs[] = [
      {
        label: b('home'),
        url: '/'
      },
      {
        label: b('tarot'),
        url: '/tarot'
      },
      {
        label: selectedCategory.data?.name ?? '',
        url: '/tarot/spread'
      }
    ]

  const handleSelectSpread = (spread: TarotCard) => {
    if(!spreads.data || !spreads.lang) return
    dispatch(shuffleActions.setSelectedSpread({data: spread, lang: spreads.lang}))
  }

  useEffect(() => {
    if(!selectedCategory.data || selectedCategory.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
  }, [locale])

  useEffect(() => {
    dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
  }, [selectedCategory.data])

  useEffect(() => {
    if(!categoryId || !categories.data) return
    const foundCategory = categories.data.find((cat: any) => cat.id === Number(categoryId))

    if(!foundCategory) return 

    dispatch(shuffleActions.setSelectedCategory({data: foundCategory, lang: locale}))
  }, [categoryId, categories])

  if (isLoading) {
    return <Loader text={t('loader.load')}/>
  }

  return (
    <section className={styles.spreads}>

      <div className={styles.spreads__header}>
        <Breadcrumbs data={breadcrumbsData} className={styles.spreads__breadcrumbs}/>
        <ButtonBack href={"/tarot"} text={t('buttons.back')}/>
        {selectedCategory.data?.name && <h1 className={styles.spreads__header_title}>{selectedCategory.data.name}</h1>}
        {selectedCategory.data?.description && <p className={styles.spreads__heder_description}>{selectedCategory.data.description}</p>}
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
                href={`/tarot/spread/question`}
                onClick={() => {handleSelectSpread(spread)}}
              />
            ))}
          </CategoriesGrid>
       )}
    </section>
  )
}