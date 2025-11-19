'use client'

import { useTestModal } from '@/context/TestModalContext';
import styles from './styles.module.scss'
import ProgressBar from '../progress_bar';
import QuestionContent from '../questionsContent';
import Buttons from '../buttons';

const Quiz = () => {
  const {
    step,
    total,
    answers,
    currentQuestion,
    next,
    prev,
    selectAnswer,
    showResult
  } = useTestModal();

  return (
    <form className={styles.questions}>
      <ProgressBar current={step} total={7} answers={answers}/>
      <QuestionContent 
        {...currentQuestion} 
        currentStep={step}
        selected={answers[step]}
        onSelect={selectAnswer}
      />
      <Buttons 
        isAnswered={!!answers?.[step]}
        currentStep={step}
        totalStep={total}
        showResult={showResult}
        next={next}
        prev={prev}
      />
    </form>
  )
}

export default Quiz