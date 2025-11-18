import styles from './styles.module.scss'
import { Button } from '@/components/ui'

type TProps = {
  isAnswered: boolean;
  currentStep: number;
  totalStep: number;
  showResult: () => void;
  next: () => void;
  prev: () => void;
}

const Buttons = ({isAnswered, currentStep, totalStep, showResult, next, prev}: TProps) => {
  const isResult = currentStep === totalStep

  return (
    <div className={styles.buttons}>
      <div>
        {currentStep > 1 && (
          <Button 
            className={`${styles.button} ${styles['button--active']}`} 
            as='button' type='button' 
            text='Back' 
            onClick={prev}
          />
        )}
      </div>
      <div>
        <Button 
          className={`${styles.button} ${isAnswered ? styles['button--active'] : styles['button--disabled']}`} 
          as='button' 
          type='button' 
          text={isResult ? 'Result' : 'Next'}
          onClick={isResult ? showResult : next}
        />
      </div>
    </div>
  )
}

export default Buttons