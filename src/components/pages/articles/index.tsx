import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { ALL_PAGES } from "@/graphql/queries/pages";
import styles from './styles.module.scss'

const ArticlesPage = async () => {
  const { data, errors } = await fetchGraphQL(ALL_PAGES);

  console.log("Fetched pages:", data);

  const articles = getAllArticles();

  return (
    <div className={styles.article}>
      <h1>Статьи</h1>
      <ul>
        {articles.map(({ slug }) => (
          <li key={slug}>
            <Link href={`/articles/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticlesPage;