import styles from './styles.module.scss';
import { TArticle } from '@/app/types/articles';

type TProps = TArticle

const Article = async ({title}: TProps) => {

  return (
    <section className={styles.article}>
      <div className={styles.article__inner}>
        <h1 className={styles.article__title}>{title}</h1>
      </div>
    </section>
  )
}

export default Article;