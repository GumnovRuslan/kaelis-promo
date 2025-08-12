import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div>
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