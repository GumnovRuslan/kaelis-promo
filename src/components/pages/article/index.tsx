import { Article, Message, ArticleNotFound } from "@/components/sections";
import { getArticle } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { TArticle } from "@/types/articles";

type TProps = {
  slug: string;
}

const ArticlePage = async ({slug}: TProps) => {
  const { data, errors } = await fetchGraphQL(getArticle('/'+slug));
  const article: TArticle | null = data?.allArticlesItem?.[0] || null

  if(!article) return <ArticleNotFound/>
  else {
    return (
      <>
      <Article data={article}/>
      <Message/>
      </>
    )
  }
}

export default ArticlePage;