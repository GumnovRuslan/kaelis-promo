import { getArticles } from '@/graphql/queries/articles';
import styles from './styles.module.scss';

import { Button, Articles } from '@/components/ui';
import { fetchGraphQL } from '@/lib/graphql';
import { getTranslations, getLocale } from 'next-intl/server';

const ArticlesPopular = async () => {
  const t = await getTranslations('HomePage.articles')
  const locale = await getLocale();
  const { data, errors } = await fetchGraphQL(getArticles(locale || 'en'));
  const articles = data?.allArticlesItem.slice(0, 5)

  return (
    <section className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h2 className={styles.articles__title}>{t('title')}</h2>
          <p className={styles.articles__description}>{t('desc')}</p>
        </div>
        <Articles articles={articles}/>
        <Button 
          as='link'
          className={styles.button} 
          href='/articles' text={t('button')} 
        />
      </div>
    </section>
  )
}

export default ArticlesPopular;