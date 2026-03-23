'use client'

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { TarotSpeaker } from '@/lib/types/shuffle'
import { useEffect } from 'react'
import styles from './styles.module.scss'
import { useTranslations, useLocale } from 'next-intl'
import { SpeakerCard } from '@/components/ui'

type ReaderStyleSelectorProps = {
  isVisible?: boolean
}

export function ReaderStyleSelector({ isVisible = true }: ReaderStyleSelectorProps) {
  const {readerStyle, speakers} = useAppSelector(state => state.shuffle)
  const dispatch = useAppDispatch()
  const t = useTranslations('CategoriesPage')
  const locale = useLocale()

  useEffect(() => {
    const fetchTarotSpeaker = async () => {
      if (speakers.data && speakers.lang === locale) return
      await dispatch(shuffleActions.getTarotSpeaker({lang: locale}))
    }
    fetchTarotSpeaker()
  }, [dispatch, speakers.data, locale])

  const handleReaderStyleClick = (style: TarotSpeaker) => {
    dispatch(shuffleActions.setReaderStyle({data: style, lang: speakers.lang || ''}))
  }

  if (!isVisible || !speakers) {
    return null
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>{t('speaker.title')}</p>
      <div className={styles.grid}>
        {speakers.data?.map((speaker: TarotSpeaker) => (
          <SpeakerCard 
            name={speaker.name}
            key={speaker.id}
            icon={speaker.icon}
            isSelected={readerStyle.data?.id === speaker.id}
            onClick={() => handleReaderStyleClick(speaker)}
          />
        ))}
      </div>
    </div>
  )
}

