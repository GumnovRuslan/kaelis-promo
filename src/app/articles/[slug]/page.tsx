import { getAllArticles, getArticle } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Статическая генерация списка путей
export function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }));
}

// Метаданные страницы
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getArticle(slug);

  return {
    title: meta.title,
    description: meta.description,
  };
}

// Основной компонент
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { content, meta } = getArticle(slug);

  return (
    <article className="prose max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-sm text-gray-500">{meta.date}</p>
      <MDXRemote source={content} />
    </article>
  );
}