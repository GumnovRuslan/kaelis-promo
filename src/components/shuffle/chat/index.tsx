'use client'

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import { Button } from '@/components/ui'
import { checkTarotLimit, incrementTarotLimit } from '@/utils/tarot/checkTarotLimit'
import { useRouter } from 'next/navigation'
import { useModalLimitContext } from '@/context/modalLimit'

type ChatProps = {
  isVisible?: boolean;
}

export function Chat({ isVisible = true}: ChatProps) {
  const t = useTranslations('CategoriesPage')
  const question = useAppSelector(state => state.shuffle.question)
  const { selectedCategory, selectedSpread, readerStyle, guestId } = useAppSelector(state => state.shuffle)
  const isDisabled = !selectedCategory || !selectedSpread || !readerStyle || !question
  const dispatch = useAppDispatch()
  const { allowed, key, used, limit } = checkTarotLimit(guestId || '')
  const { openModal} = useModalLimitContext()
  const router = useRouter()

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(shuffleActions.setQuestion(e.target.value))
  }

  const handleGetReading = async () => {
    if (!guestId) {
      alert('Пользователь не инициализирован')
      return
    }

    if (!allowed) {
      openModal()
      return
    }

    // увеличиваем лимит
    incrementTarotLimit(key!)

    // можно делать запрос
    try {
      const data = {
        question: question || '',
        category_id: selectedCategory.data?.id || '',
        tarot_id: selectedSpread.data?.id || '',
        speaker_id: readerStyle.data?.id || '',
      }

      await dispatch(shuffleActions.getTarotResponse(data))

      // и только теперь переходим
      router.push('/categories/spread/question/chart')
    } catch (error) {
      console.error('Error fetching tarot cards:', error)
    }
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
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`} 
        text={t('buttons.chat_get_reading')} 
      />
    </div>
  )
}