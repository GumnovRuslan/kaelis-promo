'use client'

import styles from './styles.module.scss'
import { ModalWrapper } from '@/components/ui'
import QuestionContent from './questionsContent'
import Buttons from './buttons'
import ProgressBar from './progress_bar'
import { useState, useEffect } from 'react'
import { DATA } from './data'

const Test = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const totalStep = DATA.length;
  const [step, setStep] = useState<number>(1)
  const [currentData, setCurrentData] = useState(DATA[step-1])
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNextStep = () => {
    if(step < totalStep) setStep(prev => ++prev)
  }

  const handlePrevStep = () => {
    if(step > 0) setStep(prev => --prev)
  }

  const handleSelectAnswer = (step: number, answerType: string) => {
    setAnswers(prev => ({
      ...prev,
      [step]: answerType,
    }));
  };

  useEffect(() => {
    setCurrentData(DATA[step-1])
  }, [step])

  useEffect(() => {
    console.log(answers)
  }, [answers])

  return (
    <ModalWrapper isShow={isOpen} handlerClose={() => {setIsOpen(prev => !prev)}}>
      <div className={styles.questions}>
        <ProgressBar current={step} total={7}/>
        <QuestionContent 
          {...currentData} 
          currentStep={step}
          selected={answers[step]}      // вернуть выбранный вариант при возвращении назад
          onSelect={handleSelectAnswer} // сохранить ответ
        />
        <Buttons 
          currentStep={step}
          totalStep={totalStep}
          next={handleNextStep}
          prev={handlePrevStep}
        />
      </div>
    </ModalWrapper>
  )
}

export default Test