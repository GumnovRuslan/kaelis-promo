import styles from './styles.module.scss';
import { TArticle } from '@/types/articles';
import { ButtonShare, Breadcrumbs, ArticleCategory } from '@/components/ui';
import { ptComponents } from '@/utils/portableTextComponents';
import { PortableText } from '@portabletext/react';

type TProps = {
  data: TArticle
} 

const Article = ({data}: TProps) => {
  return (
    <section className={styles.article}>
      <div className={styles.article__inner}>
        <div className={styles.article__header}>
          <h1 className={styles.article__title}>{data.title}</h1>
          {data?.desc && (
            <p className={styles.article__desc}>{data.desc}</p>
          )}
          <div className={styles.article__info}>
            <div className={styles.article__info_left}>
              {data?.category?.length && (
                <div className={styles.article__categories}>
                  {data.category.map((cat, i) => (
                    <ArticleCategory label={cat.title} key={cat.title + i}/>
                  ))}
                </div>
              )}
              <span className={styles.article__date}>{data.date}</span>
            </div>
            <ButtonShare />
          </div>
        </div>
        {data?.breadcrumbs && (
          <Breadcrumbs data={data.breadcrumbs} className={styles.article__breadcrumbs}/>
        )}
        {data?.contentRaw && (
          <div className={styles.article__content}>
            <PortableText value={data.contentRaw} components={ptComponents}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default Article;