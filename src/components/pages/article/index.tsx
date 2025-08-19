import { Article, Message } from "@/components/sections";
import { getArticle } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";

type TProps = {
  slug: string;
}

const ArticlePage = async ({slug}: TProps) => {
  const { data, errors } = await fetchGraphQL(getArticle('/'+slug));
  const article = data.allArticlesItem[0]

  console.log('data', article)
  
  return (
    <>
    <Article {...article}/>
    <Message/>
    </>
  )
}

export default ArticlePage;