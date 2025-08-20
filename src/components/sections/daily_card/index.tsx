import styles from './styles.module.scss';

import { Button } from '@/components/ui';

const DailyCard = () => {
  return (
    <section className={styles.daily}>
      <div className={styles.daily__header}>
        <h2 className={styles.daily__title}>AI Daily Card</h2>
        <p className={styles.daily__description}>
          Get your personalized prediction for today. Artificial intelligence will choose a card especially for you
        </p>
      </div>
      <div className={styles.daily__spread}>
      </div>
      
      <Button as='button' text='Get a prediction'/>
    </section>
  )
}

export default DailyCard;