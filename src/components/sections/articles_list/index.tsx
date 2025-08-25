import { fetchGraphQL } from "@/lib/graphql";
import { getArticles } from "@/graphql/queries/articles";
import styles from './styles.module.scss'
import { Articles, ArticlesFilter } from "@/components/ui";
import { getTranslations, getLocale } from "next-intl/server";

const ArticlesList = async () => {
  const t = await getTranslations('ArticlesPage')
  const locale = await getLocale();
  const { data, errors } = await fetchGraphQL(getArticles(locale || 'en'));
  const articles = data?.allArticlesItem

  return (
    <div className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h1 className={styles.articles__title}>{t('title')}</h1>
          <p className={styles.articles__description}>{t('desc')}</p>
        </div>
        {/* <ArticlesFilter/> */}
        <div className={styles.articles__content}>
          {articles && articles.length && (
            <Articles articles={articles}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;