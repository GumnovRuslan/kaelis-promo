'use client'

import { useEffect } from 'react'
import { ReduxProvider } from '@/providers/redux-provider'
import PreloadingContext from '@/contexts/animation'
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { ReaderStyleSelector } from '@/components/shuffle/reader-style-selector'
import { Chat } from '@/components/shuffle/chat'
import { ChartCanvas } from '@/components/shuffle/chart-canvas'
import styles from './styles.module.scss'

function TestShufflePageContent() {
  const dispatch = useAppDispatch()
  const speakers = useAppSelector(state => state.shuffle.speakers)
  const selectedCategory = useAppSelector(state => state.shuffle.selectedCategory)
  const selectedSpread = useAppSelector(state => state.shuffle.selectedSpread)
  const readerStyle = useAppSelector(state => state.shuffle.readerStyle)
  const response = useAppSelector(state => state.shuffle.response)
  const question = useAppSelector(state => state.shuffle.question)

  useEffect(() => {
    const mockSpeakers = [
      {
        id: '1',
        name: 'Классический',
        icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>'
      },
      {
        id: '2',
        name: 'Интуитивный',
        icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2L3 7v11h14V7L10 2z"/></svg>'
      },
      {
        id: '3',
        name: 'Эзотерический',
        icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><polygon points="10,2 4,18 16,18"/></svg>'
      },
      {
        id: '4',
        name: 'Современный',
        icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="2"/></svg>'
      }
    ]

    const mockCategory = {
      id: 'test-category',
      name: 'Тестовая категория'
    }

    const mockSpread = {
      id: 'test-spread',
      name: 'Тестовый расклад',
      image: '/images/cards/card_astrology_1.svg'
    }

    if (!speakers) {
      dispatch({ type: 'shuffle/getTarotSpeaker/fulfilled', payload: mockSpeakers } as any)
    }
    
    if (!selectedCategory) {
      dispatch(shuffleActions.setCategories([mockCategory]))
      dispatch(shuffleActions.setSelectedCategory(mockCategory))
    }
    
    if (!selectedSpread) {
      dispatch(shuffleActions.setSelectedSpread(mockSpread))
    }
  }, [dispatch, speakers, selectedCategory, selectedSpread])

  const mockMatrix = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]

  const mockCards: Record<string, { image: string; name: string }> = {
    '0': {
      image: '/images/cards/card_astrology_1.svg',
      name: 'Карта 1'
    },
    '1': {
      image: '/images/cards/card_astrology_2.svg',
      name: 'Карта 2'
    },
    '2': {
      image: '/images/cards/card_astrology_3.svg',
      name: 'Карта 3'
    },
    '3': {
      image: '/images/cards/card_astrology_4.svg',
      name: 'Карта 4'
    },
    '4': {
      image: '/images/cards/card_astrology_1.svg',
      name: 'Карта 5'
    },
  }


  const showReaderStyle = !readerStyle && !response
  const showChat = readerStyle && !response
  const showCanvas = response

  return (
    <div className={styles.container}>
      {showReaderStyle && (
        <div className={styles.section}>
          {speakers && speakers.length > 0 ? (
            <ReaderStyleSelector isVisible={true} />
          ) : (
            <p style={{ color: 'white' }}>Загрузка стилей чтения...</p>
          )}
        </div>
      )}

      {showChat && (
        <div className={styles.section}>
          <Chat isVisible={true} />
        </div>
      )}

      {showCanvas && (
        <div className={styles.chartContainer}>
          <ChartCanvas matrix={mockMatrix} cards={mockCards} />
        </div>
      )}
    </div>
  )
}

export default function TestPage() {
  return (
    <ReduxProvider>
      <PreloadingContext>
        <TestShufflePageContent />
      </PreloadingContext>
    </ReduxProvider>
  )
}

