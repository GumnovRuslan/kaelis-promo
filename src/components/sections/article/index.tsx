import styles from './styles.module.scss';
import { TArticle } from '@/types/articles';
import { ButtonShare, Breadcrumbs } from '@/components/ui';
import { ptComponents } from '@/utils/portableTextComponents';
import { PortableText } from '@portabletext/react';

type TProps = {
  data: TArticle
} 

const Article = async ({data}: TProps) => {
  console.log('contentRaw', data.contentRaw)
  return (
    <section className={styles.article}>
      <div className={styles.article__inner}>
        <div className={styles.article__header}>
          <h1 className={styles.article__title}>{data.title}</h1>
          <p className={styles.article__desc}>{data.desc}</p>
          <div className={styles.article__info}>
            <span className={styles.article__date}>{data.date}</span>
            <ButtonShare />
          </div>
        </div>
        <Breadcrumbs data={data.breadcrumbs} className={styles.article__breadcrumbs}/>
        <div className={styles.article__content}>
          <PortableText value={data.contentRaw} components={ptComponents}/>
        </div>
      </div>
    </section>
  )
}

export default Article;