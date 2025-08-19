import { fetchGraphQL } from "@/lib/graphql";
import { ALL_ARTICLES } from "@/graphql/queries/articles";
import styles from './styles.module.scss'
import { Input, Tag, Articles } from "@/components/ui";

const TAGS = [
  'All',
  'Training',
  'Astrology',
  'Numerology',
  'Spreads',
  'Practices',
]

const ArticlesList = async () => {
  const { data, errors } = await fetchGraphQL(ALL_ARTICLES);
  const articles = data?.allArticlesItem
  console.log()

  return (
    <div className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h1 className={styles.articles__title}>Articles</h1>
          <p className={styles.articles__description}>
            Explore mystical practices and expand your knowledge with our expert materials
          </p>
        </div>
        <div className={styles.articles__filters}>
          <Input type="text" />
          <div className={styles.articles__tags}>
            {TAGS.map((text, i) => <Tag text={text} key={i}/>)}
          </div>
        </div>
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