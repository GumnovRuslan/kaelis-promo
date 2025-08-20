import { fetchGraphQL } from "@/lib/graphql";
import { ALL_ARTICLES } from "@/graphql/queries/articles";
import styles from './styles.module.scss'
import { Articles, ArticlesFilter } from "@/components/ui";

const ArticlesList = async () => {
  const { data, errors } = await fetchGraphQL(ALL_ARTICLES);
  const articles = data?.allArticlesItem

  return (
    <div className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h1 className={styles.articles__title}>Articles</h1>
          <p className={styles.articles__description}>
            Explore mystical practices and expand your knowledge with our expert materials
          </p>
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