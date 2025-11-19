import styles from './styles.module.scss'
import type { TAnswer } from '../../quiz_schemas'
import type { ArchetypeKey } from '@/types/ArchetypeKey'
import { useTranslations } from 'next-intl'

type TProps = {
  currentStep: number;
  item: TAnswer
  active: boolean
  onSelect: (answerType: ArchetypeKey) => void;
}

const AnswerItem = ({item, currentStep, active, onSelect}: TProps) => {
  const t = useTranslations('Quiz.quests')

  return (
    <label className={styles.answer} onClick={() => onSelect(item.type)}>
      <input className={styles.answer__input} checked={active} type="radio" name={`step-${currentStep}`} onChange={() => {}}/>
      <div className={styles.answer__content}>
        <span className={styles.answer__text}>{t(item.text)}</span>
      </div>
    </label>
  )
}

export default AnswerItem