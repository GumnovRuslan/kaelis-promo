import { fetchGraphQL } from "@/lib/graphql";
import { ALL_PAGES } from "@/graphql/queries/pages";
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

const ArticlesList = async () => {
  const { data, errors } = await fetchGraphQL(ALL_PAGES);

  console.log("Fetched pages:", data);

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
          <Articles articles={ARTICLES}/>
          <Articles articles={ARTICLES} mirror={true}/>
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;