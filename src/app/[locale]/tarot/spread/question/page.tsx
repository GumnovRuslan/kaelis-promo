'use client'

import { useEffect } from 'react'
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { ReaderStyleSelector } from '@/components/shuffle/reader-style-selector'
import { Chat } from '@/components/shuffle/chat'
import styles from './styles.module.scss'
import { useLocale, useTranslations } from 'next-intl'
import { Loader } from '@/components/sections'
import { ButtonBack, Breadcrumbs } from '@/components/ui'

export default function SpreadDetailPage() {
  const t = useTranslations('CategoriesPage')
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const {categories, selectedCategory, selectedSpread, isLoading} = useAppSelector(state => state.shuffle)
  const BREADCRUMBS_DATA = [
    {
      label: selectedCategory.data?.name ?? '',
      url: '/categories'
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: '/categories/spread'
    }
  ]

  useEffect(() => {
    dispatch(shuffleActions.resetShuffleResponse())

    if (!selectedCategory.data || selectedCategory.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
    if (!selectedSpread.data || selectedSpread.lang !== locale) {
      dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
    }
  }, [dispatch, locale])

  if (isLoading && !categories || !selectedCategory || !selectedSpread) {
    return (
      <Loader text={t('loader.load')} />
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.section__header}>
          <ButtonBack  href={`/categories/spread`} text={t('buttons.back')}/>
          <Breadcrumbs data={BREADCRUMBS_DATA} lastActive/>
        </div>

        {/* {selectedSpread.data?.description && (
          <p className={styles.description}>{selectedSpread.data?.description}</p>
        )} */}

        <ReaderStyleSelector />
        <Chat />
      </div>
    </section>
  )
}