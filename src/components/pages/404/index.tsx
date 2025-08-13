import styles from './styles.module.scss';
import { Button } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.page__inner}>
        <h1 className={styles.page__title}>404</h1>
        <span className={styles.page__text}>Page Not Found</span>
        <p className={styles.page__text}>The page you're looking for doesn't exist or has been moved</p>
        <Button href='/' className={styles.button}>
          <span className={styles.button__text}>Return to home</span>
        </Button>
      </div>
    </section>
  )
}

export default NotFoundPage;
