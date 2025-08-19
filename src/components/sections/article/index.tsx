import styles from './styles.module.scss';
import { TArticle } from '@/app/types/articles';
import { ButtonShare, Breadcrumbs } from '@/components/ui';

type TProps = TArticle

const Article = async ({title, desc, date, breadcrumbs, contentRaw}: TProps) => {
  console.log(contentRaw)
  return (
    <section className={styles.article}>
      <div className={styles.article__inner}>
        <div className={styles.article__header}>
          <h1 className={styles.article__title}>{title}</h1>
          <p className={styles.article__desc}>{desc}</p>
          <div className={styles.article__info}>
            <span className={styles.article__date}>{date}</span>
            <ButtonShare />
          </div>
        </div>
        <Breadcrumbs data={breadcrumbs} className={styles.article__breadcrumbs}/>
      </div>
    </section>
  )
}

export default Article;