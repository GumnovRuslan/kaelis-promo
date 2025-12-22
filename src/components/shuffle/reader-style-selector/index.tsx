'use client'

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { TarotSpeaker } from '@/lib/types/shuffle'
import { useEffect } from 'react'
import styles from './styles.module.scss'

type ReaderStyleSelectorProps = {
  isVisible?: boolean
}

export function ReaderStyleSelector({ isVisible = true }: ReaderStyleSelectorProps) {
  const selectedReaderStyle = useAppSelector(state => state.shuffle.readerStyle)
  const speakers = useAppSelector(state => state.shuffle.speakers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchTarotSpeaker = async () => {
      if (speakers) return
      await dispatch(shuffleActions.getTarotSpeaker())
    }
    fetchTarotSpeaker()
  }, [dispatch, speakers])

  const handleReaderStyleClick = (style: TarotSpeaker) => {
    dispatch(shuffleActions.setReaderStyle(style))
  }

  if (!isVisible || !speakers) {
    return null
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>Выберите стиль чтения</p>
      <div className={styles.grid}>
        {speakers.map((speaker: TarotSpeaker) => {
          const isSelected = selectedReaderStyle?.id === speaker.id
          return (
            <button
              key={speaker.id}
              className={`${styles.button} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleReaderStyleClick(speaker)}
            >
              <div
                className={styles.icon}
                dangerouslySetInnerHTML={{ __html: speaker.icon }}
              />
              <span className={styles.name}>{speaker.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

