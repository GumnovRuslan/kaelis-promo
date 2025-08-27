import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon } from '@/components/icons';
import { TArticlePreview } from '@/types/articles';

type TProps = {
  articles: TArticlePreview[];
  mirror?: boolean
};

const Articles = ({ articles, mirror = false}: TProps) => {
  return (
    <div className={`${styles.articles} ${mirror ? styles['articles--mirrored'] : ''}`}>
      {articles?.map((article, i) => (
        <Link href={'articles'+ article.slug?.current || '#'} className={styles.article} key={i}>
          <h3 className={styles.article__title}>{article.title}</h3>
          <Image 
            className={styles.article__image}
            src={article.coverImage?.image?.asset.url || ""} 
            fill 
            alt={article.coverImage?.altText || ''}
            // unoptimized
          />
          <div className={styles.article__bottom}>
            <span>{article.date}</span>
            {/* <div className={styles.article__views}>
              <span className={styles.article__views_icon}>
                <EyeIcon />
              </span>
              <span>{article.views}</span>
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Articles;