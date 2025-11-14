import styles from './styles.module.scss'
import AnswerItem from '../answer_item'
import type { TData } from '../data'

type TProps = TData & {
  currentStep: number;
  selected: string;
  onSelect: (step: number, answerType: string) => void
}

const QuestionContent = ({ question, answers, selected, currentStep, onSelect }: TProps) => {
  return (
    <div className={styles.content}>

      <span className={styles.content__title}>
        {question}
      </span>
      
      <span className={`${styles.content__shadow} ${styles['content__shadow--top']}`}/>
      <ul className={styles.content__answers}>
        {answers.map((item, i) => 
          <li className={styles.content__answers_item} key={i}>
            <AnswerItem item={item} currentStep={currentStep} active={selected === item.type} onSelect={onSelect}/>
          </li>
        )}
      </ul>
      <span className={`${styles.content__shadow} ${styles['content__shadow--bottom']}`}/>
    </div>
  )
}

export default QuestionContent