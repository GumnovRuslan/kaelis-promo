'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { useLocale, useTranslations } from 'next-intl'
import { TarotCategorySection, Loader } from '@/components/sections'

export default function CategoriesPage() {
  const t = useTranslations('CategoriesPage.loader')
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const {categories, isLoading} = useAppSelector(state => state.shuffle)

  useEffect(() => {
    if (!categories.data || categories.data?.length == 0 || categories.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }))
    }
  }, [dispatch, categories.data, locale])

  return (
    (isLoading || !categories.data) 
    ? <Loader  text={t('load')}/> 
    : <TarotCategorySection categories={categories.data}/>
  )
}