import { ALL_ARTICLES } from '@/graphql/queries/articles';
import styles from './styles.module.scss';

import { Button, Articles } from '@/components/ui';
import { fetchGraphQL } from '@/lib/graphql';

const ARTICLES = [
  {
    title: 'How to interpret Tarot cards for beginners',
    date: '8 Aug 2025',
    views: '1.8',
    href: '/',
  },
  {
    title: 'Numerology',
    date: '8 Aug 2025',
    views: '1.8',
    href: '/',
  },
  {
    title: 'Tarot Cards',
    date: '8 Aug 2025',
    views: '1.8',
    href: '/',
  },
  {
    title: 'Tarot Cards',
    date: '8 Aug 2025',
    views: '1.8',
    href: '/',
  },
  {
    title: 'Spread the "Celtic Cross"',
    date: '8 Aug 2025',
    views: '1.8',
    href: '/',
  },
]

const ArticlesPopular = async () => {
  const { data, errors } = await fetchGraphQL(ALL_ARTICLES);
    const articles = data?.allArticlesItem.slice(0, 5)
  return (
    <section className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h2 className={styles.articles__title}>Popular articles</h2>
          <p className={styles.articles__description}>
            Explore mystical practices and expand your knowledge with our expert materials
          </p>
        </div>
        <Articles articles={articles}/>
        <Button 
          as='link'
          className={styles.button} 
          href='/articles' text='Read all articles' 
        />
      </div>
    </section>
  )
}

export default ArticlesPopular;