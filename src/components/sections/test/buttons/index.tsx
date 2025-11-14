import styles from './styles.module.scss'
import { Button } from '@/components/ui'

type TProps = {
  currentStep: number;
  totalStep: number;
  next: () => void;
  prev: () => void;
}

const Buttons = ({currentStep, totalStep, next, prev}: TProps) => {

  return (
    <div className={styles.buttons}>
      <div>
        {currentStep > 1 && (
          <Button className={styles.button} as='button' text='Back' onClick={prev}/>
        )}
      </div>
      <div>
        <Button className={styles.button} as='button' text='Next' onClick={next}/>
      </div>
    </div>
  )
}

export default Buttons