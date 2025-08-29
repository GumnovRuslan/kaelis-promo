import styles from './styles.module.scss';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage');

  return (
   <section className={styles.page}>
      <div className={styles.page__inner}>
        <h1 className={styles.page__title}>404</h1>
        <span className={styles.page__text}>{t('title')}</span>
        <p className={styles.page__text}>{t('subtitle')}</p>
        <Button as='link' href='/' className={styles.button} text={t('button')}/>
      </div>
      <Image className={styles.page__bg} src={'/images/bg/bg.svg'} width={1920} height={1300} alt={"backgroud image"}/>
    </section>
  )
}

export default NotFoundPage;
