import styles from './styles.module.scss';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { TArticlePreview } from '@/types/articles';
import ArticleCategoriesList from '../article_categories_list';

type TProps = {
  articles: TArticlePreview[];
  mirror?: boolean
  categoryIsShow?: boolean
};

const Articles = ({ articles, mirror = false, categoryIsShow = false}: TProps) => {
  return (
    <div className={`${styles.articles} ${mirror ? styles['articles--mirrored'] : ''}`}>
      {articles?.map((article, i) => {
        const isImage = article.coverImage?.image?.asset.url
        return (
        <Link 
          href={'articles'+ article.slug?.current || '#'} 
          className={`${styles.article} ${isImage ? styles["article--image"] : ''}`} 
          key={i}
        >
          <div className={styles.article__inner}>
            {isImage && (
              <div className={styles.article__image}>
                <Image 
                  src={article.coverImage?.image?.asset.url}
                  width={400}
                  height={250} 
                  alt={article.coverImage?.altText || ''}
                />
              </div>
            )}
            <div className={styles.article__content}>
              <h3 className={styles.article__title}>{article.title}</h3>
              <div className={styles.article__bottom}>
                <span>{article.date}</span>
                {article?.category && categoryIsShow && (
                  <ArticleCategoriesList categories={article?.category}/>
                )}
              </div>
            </div>
          </div>
        </Link>
      )})}
    </div>
  )
}

export default Articles;