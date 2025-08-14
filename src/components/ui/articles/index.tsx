import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon } from '@/components/icons';

type TArticle = {
  title: string;
  date: string;
  views: string;
  href: string;
}

type TProps = {
  articles: TArticle[];
};

const Articles = ({ articles }: TProps) => {
  return (
    <div className={styles.articles}>
      {articles.map((article, i) => (
        <Link href={article.href} className={styles.article} key={i}>
          <h3 className={styles.article__title}>{article.title}</h3>
          <Image 
            className={styles.article__image}
            src={'/images/cards/card_astrology_1.svg'} 
            fill 
            alt={'image article preview'}
          />
          <div className={styles.article__bottom}>
            <span>{article.date}</span>
            <div className={styles.article__views}>
              <span className={styles.article__views_icon}>
                <EyeIcon />
              </span>
              <span>{article.views}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Articles;