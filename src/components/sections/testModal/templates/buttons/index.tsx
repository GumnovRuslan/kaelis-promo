import styles from './styles.module.scss'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TProps = {
  isAnswered: boolean;
  currentStep: number;
  totalStep: number;
  showResult: () => void;
  next: () => void;
  prev: () => void;
}

const Buttons = ({isAnswered, currentStep, totalStep, showResult, next, prev}: TProps) => {
  const t = useTranslations('TestSection')
  const isResult = currentStep === totalStep

  return (
    <div className={styles.buttons}>
      <div>
        {currentStep > 1 && (
          <Button 
            className={`${styles.button} ${styles['button--active']}`} 
            as='button' type='button' 
            text={t('buttons.prev.label')} 
            onClick={prev}
          />
        )}
      </div>
      <div>
        <Button 
          className={`${styles.button} ${isAnswered ? styles['button--active'] : styles['button--disabled']}`} 
          as='button' 
          type='button' 
          text={isResult ? t('buttons.next.result') : t('buttons.next.label')}
          onClick={isResult ? showResult : next}
        />
      </div>
    </div>
  )
}

export default Buttons