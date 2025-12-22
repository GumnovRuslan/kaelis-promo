'use client'

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import styles from './styles.module.scss'

type ChatProps = {
  isVisible?: boolean
}

export function Chat({ isVisible = true }: ChatProps) {
  const question = useAppSelector(state => state.shuffle.question)
  const { selectedCategory, selectedSpread, readerStyle } = useAppSelector(state => state.shuffle)
  const isDisabled = !selectedCategory || !selectedSpread || !readerStyle || !question
  const dispatch = useAppDispatch()

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(shuffleActions.setQuestion(e.target.value))
  }

  const handleGetReading = () => {
    const isTestPage = typeof window !== 'undefined' && window.location.pathname.includes('/shuffle-layout/test/test')
    
    if (isTestPage) {
      const mockResponse = {
        id: 1,
        tarot: {
          id: 1,
          name: selectedSpread?.name || 'Тестовый расклад',
          description: 'Тестовый расклад',
          matrix: {
            '0': [0, 0],
            '1': [1, 0],
            '2': [2, 0],
            '3': [0, 1],
            '4': [1, 1],
          }
        },
        question: question || '',
        cards: {
          '0': { id: '0', name: 'Карта 1', image: '/images/cards/card_astrology_1.svg' },
          '1': { id: '1', name: 'Карта 2', image: '/images/cards/card_astrology_2.svg' },
          '2': { id: '2', name: 'Карта 3', image: '/images/cards/card_astrology_3.svg' },
          '3': { id: '3', name: 'Карта 4', image: '/images/cards/card_astrology_4.svg' },
          '4': { id: '4', name: 'Карта 5', image: '/images/cards/card_astrology_1.svg' },
        },
        back_card: '/images/cards/card_back.png',
        chat_id: 1,
        reading: {
          status: 'ok',
          final_question: question || '',
          interpretation: {
            intro: 'Это тестовая интерпретация. Введение в расклад.',
            analysis: 'Анализ карт показывает тестовые результаты.',
            final: 'Заключение: это тестовый расклад для проверки функциональности.'
          }
        }
      }
      dispatch({ type: 'shuffle/getTarotResponse/fulfilled', payload: mockResponse } as any)
      return
    }

    const fetchTarotCards = async () => {
      try {
        const data = {
          question: question || '',
          category_id: selectedCategory?.id || '',
          tarot_id: selectedSpread?.id || '',
          speaker_id: readerStyle?.id || '',
        }

        console.log('Sending request with data:', data)
        const result = await dispatch(shuffleActions.getTarotResponse(data))
        console.log('Response received:', result)
      } catch (error) {
        console.error('Error fetching tarot cards:', error)
      }
    }
    fetchTarotCards()
  }

  if (!isVisible || !readerStyle) {
    return null
  }

  const baseClassNameText = 'text-white gradient-dark-section disable-border w-full rounded-xl bg-transparent p-4 h-[270px] resize-none transition-all duration-300'

  return (
    <div className={styles.container}>
      <label className={styles.label}>Задайте ваш вопрос</label>
      <textarea
        value={question || ''}
        onChange={handleQuestionChange}
        placeholder="Введите ваш вопрос..."
        className={baseClassNameText}
        style={{ lineHeight: '1.5' }}
      />
      <button
        onClick={handleGetReading}
        disabled={isDisabled}
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
      >
        Получить расклад
      </button>
    </div>
  )
}


