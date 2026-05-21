import { ArticlePage } from "@/components/pages";
import { getArticle, getArticleSeo } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { TPageProps } from "@/types";
import { TArticle, TArticleSeo } from "@/types/articles";
import { parseSlug } from "@/utils/parseSlug";
import seoToMetadata from "@/utils/seoToMetadata";
import { redirect } from 'next/navigation'

export const generateMetadata = async ({ params }: TPageProps) => {
  const { slug, locale } = await params
  const { lang } = parseSlug(slug)

  if (lang && lang !== locale) return

  const { data } = await fetchGraphQL(getArticleSeo(`/${slug}`));
  const seo: TArticleSeo | null = data?.allArticlesItem?.[0]?.seo ?? null
  if (seo) return seoToMetadata(seo, `articles/${slug}`)
}

const Article = async ({params}: TPageProps) =>  {
  const { slug, locale } = await params;
  const {baseSlug, lang} = parseSlug(slug)
  let article: TArticle | null = null

  if(lang !== locale) {
    redirect(`/articles/${baseSlug}-${locale}`)
  } else {
    const { data, errors } = await fetchGraphQL(getArticle(`/${baseSlug}-${locale}`));
    article = data?.allArticlesItem?.[0] || null
  }

  return (
    <ArticlePage article={article}/>
  )
}

export default Article;