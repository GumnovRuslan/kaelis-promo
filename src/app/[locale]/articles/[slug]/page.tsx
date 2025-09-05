import { ArticlePage } from "@/components/pages";
import { getArticle, getArticleSeo } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { TArticle, TArticleSeo } from "@/types/articles";
import seoToMetadata from "@/utils/seoToMetadata";

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({params}: PageProps) => {
  const { slug } = await params;
  const url = `articles/${slug}`
  const { data, errors } = await fetchGraphQL(getArticleSeo('/'+slug));
  const seo: TArticleSeo | null = data?.allArticlesItem?.[0].seo || null

  if(seo) return seoToMetadata(seo, url)
}

const Article = async ({params}: PageProps) =>  {
  const { slug } = await params;
  const { data, errors } = await fetchGraphQL(getArticle('/'+slug));
  const article: TArticle | null = data?.allArticlesItem?.[0] || null
  
  return (
    <ArticlePage article={article}/>
  )

}

export default Article;