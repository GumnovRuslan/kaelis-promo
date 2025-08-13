import styles from './styles.module.scss';

import { Button, Card } from '@/components/ui';

const Subscribe = () => {
  return (
    <section className={styles.subscribe}>
      <div className={styles.subscribe__inner}>
        <div className={styles.subscribe__header}>
          <Button className={styles.subscribe__button}>
            <span className={styles.subscribe__button_text}>
              Try it first
            </span>
          </Button>
          <p className={styles.subscribe__description}>
            Subscribe now and get premium access for a week after the launch
            </p>
        </div>
        <div className={styles.subscribe__content}>
          <Card>

          </Card>
          <Card>
            
          </Card>
          <Card>
            
          </Card>
          <Card>
            
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Subscribe;