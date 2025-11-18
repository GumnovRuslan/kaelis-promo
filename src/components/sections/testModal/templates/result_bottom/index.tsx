import { useTranslations } from 'next-intl';
import styles from './styles.module.scss'
import { Button } from '@/components/ui';

function ResultsBottom({affirmation}: {affirmation: string}) {
  const t = useTranslations('Archetypes');
  
  return (
    <div className={styles.bottom}>
      <div className={styles.bottom__affirmation}>
        <span className={styles.bottom__affirmation_text}>"{t(affirmation)}"</span>
      </div>
      <Button as='button' type='button' text='Get Practice' className={styles.bottom__button}/>
      <p className={styles.bottom__message}>
        You can receive a personalized <strong>7-day</strong> practice tailored to your archetype by leaving <strong>your e-mail to get</strong> it all in one message.
      </p>
    </div>
  )
}

export default ResultsBottom