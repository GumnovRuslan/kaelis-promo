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
    const fetchTarotCards = async () => {
      try {
        const data = {
          question: question || '',
          category_id: selectedCategory?.id || '',
          tarot_id: selectedSpread?.id || '',
          speaker_id: readerStyle?.id || '',
        }

        const result = await dispatch(shuffleActions.getTarotResponse(data))
        console.log('Response received:', result)
      } catch (error) {
        console.error('Error fetching tarot cards:', error)
      }
    }
    fetchTarotCards()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>Задайте ваш вопрос</label>
      <textarea
        value={question || ''}
        onChange={handleQuestionChange}
        placeholder="Введите ваш вопрос..."
        className={styles.textarea}
        style={{ lineHeight: '1.5' }}
      />
      <button
        onClick={handleGetReading}
        disabled={isDisabled}
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
      >
        Get a Reading
      </button>
    </div>
  )
}


