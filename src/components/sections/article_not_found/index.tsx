import styles from './styles.module.scss';

import Image from 'next/image';
import { Button } from '@/components/ui';

const ArticleNotFound = () => {
  return (
    <section className={styles.page}>
      <Image className={styles.page__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
      <div className={styles.page__content}>
        <h1 className={styles.page__title}>Article not found</h1>
        <Button className={styles.page__button} as='link' href='/articles' text='Return to articles'/>
      </div>
    </section>
  )
}

export default ArticleNotFound