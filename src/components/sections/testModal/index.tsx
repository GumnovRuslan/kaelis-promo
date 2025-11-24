'use client'

import styles from './styles.module.scss'
import { ModalWrapper, Animation } from '@/components/ui'
import { useTestModal } from '@/context/TestModalContext'
import Result from './templates/result'
import Quiz from './templates/quiz'
import { AnimatePresence } from 'motion/react'

const TestModal = () => {
  const { isOpen, closeTest, result } = useTestModal();

  return (
    <ModalWrapper isShow={isOpen} handlerClose={closeTest}>
      <div className={`${styles.content} ${!result ? styles['content--result'] : ''}`}>
        <AnimatePresence mode="wait">
          {!result ? (
            <Animation key="test-quiz">
              <Quiz/>
            </Animation>
          ) : (
            <Animation key="test-result">
              <Result result={result}/>
            </Animation>
          )}
        </AnimatePresence>
      </div>
    </ModalWrapper>
  )
}

export default TestModal