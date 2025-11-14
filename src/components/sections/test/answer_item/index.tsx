import styles from './styles.module.scss'
import type { TAnswer } from '../data'

type TProps = {
  currentStep: number;
  item: TAnswer
  active: boolean
  onSelect: (step: number, answerType: string) => void;
}

const AnswerItem = ({item, currentStep, active, onSelect}: TProps) => {
  return (
    <label className={styles.answer} onClick={() => onSelect(currentStep, item.type)}>
      <input className={styles.answer__input} checked={active} type="radio" name={`step-${currentStep}`}/>
      <div className={styles.answer__content}>
        <span className={styles.answer__text}>{item.text}</span>
      </div>
    </label>
  )
}

export default AnswerItem