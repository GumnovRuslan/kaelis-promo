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

  const breadcrumbsData = [
    {
      label: selectedCategory.data?.name ?? '',
      url: '/categories'
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: '/categories/spread'
    }
  ]

  // useEffect(() => {
  //   const initializeGuest = async () => {
  //     const guestToken = typeof window !== 'undefined' ? localStorage.getItem('guestToken') : null
  //     const guestId = typeof window !== 'undefined' ? localStorage.getItem('guestId') : null

  //     if (!guestToken || !guestId) {
  //       const result = await dispatch(shuffleActions.authenticateGuest())
  //       if (shuffleActions.authenticateGuest.fulfilled.match(result)) {
  //         if (result.payload) {
  //           dispatch(shuffleActions.setGuestAuth(result.payload))
  //         }
  //       }
  //     } else {
  //       dispatch(shuffleActions.setGuestAuth({ guestId, token: guestToken }))
  //     }
  //   }

  //   initializeGuest()
  // }, [dispatch])

  useEffect(() => {
    if (!selectedCategory.data || selectedCategory.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
    if (!selectedSpread.data || selectedSpread.lang !== locale) {
      dispatch(shuffleActions.getTarotSpreads({selectedCategory: selectedCategory.data, lang: locale}))
    }
  }, [dispatch, locale])

  useEffect(() => {
    return () => {
      dispatch(shuffleActions.resetShuffleResponse())
    }
  }, [dispatch])

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
          <Breadcrumbs data={breadcrumbsData} lastActive/>
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