import styles from './styles.module.scss';
import { Button } from '@/components/ui';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
   <section className={styles.page}>
      <div className={styles.page__inner}>
        <h1 className={styles.page__title}>404</h1>
        <span className={styles.page__text}>Page Not Found</span>
        <p className={styles.page__text}>The page you're looking for doesn't exist or has been moved</p>
        <Button as='link' href='/' className={styles.button} text='Return to home'/>
      </div>
      <Image className={styles.page__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
    </section>
  )
}

export default NotFoundPage;
