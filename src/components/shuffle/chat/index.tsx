'use client'

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import { Button } from '@/components/ui'

type ChatProps = {
  isVisible?: boolean
}

export function Chat({ isVisible = true }: ChatProps) {
  const t = useTranslations('CategoriesPage')
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
          category_id: selectedCategory.data?.id || '',
          tarot_id: selectedSpread.data?.id || '',
          speaker_id: readerStyle.data?.id || '',
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
      <label className={styles.label}>{t('chat.title')}</label>
      <textarea
        value={question || ''}
        onChange={handleQuestionChange}
        placeholder={t('chat.placeholder')}
        className={styles.textarea}
        style={{ lineHeight: '1.5' }}
      />
      <Button
        as='button'
        onClick={handleGetReading}
        disabled={isDisabled}
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
        text={t('buttons.chat_get_reading')}
      />
      
      <Button 
        as='link' 
        onClick={handleGetReading}
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`} 
        href='/categories/spread/question/chart' 
        text={t('buttons.chat_get_reading')} 
      />
    </div>
  )
}


