import { ArticlePage } from "@/components/pages";
import { getArticle, getArticleSeo } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { TArticle, TArticleSeo } from "@/types/articles";
import seoToMetadata from "@/utils/seoToMetadata";
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string, locale: string }>
}

const LOCALES = ['ru', 'en', 'ua'] as const

type Locale = typeof LOCALES[number]

export const parseSlug = (slug: string) => {
  const parts = slug.split('-')
  const lastPart = parts.at(-1)

  if (LOCALES.includes(lastPart as Locale)) {
    return {
      baseSlug: parts.slice(0, -1).join('-'),
      lang: lastPart as Locale
    }
  }

  return {
    baseSlug: slug,
    lang: null
  }
}

export const generateMetadata = async ({params}: PageProps) => {
  const { slug } = await params;
  const url = `articles/${slug}`
  const { data, errors } = await fetchGraphQL(getArticleSeo(`/${slug}`));
  const seo: TArticleSeo | null = data?.allArticlesItem?.[0]?.seo || null
  console.log(seo)

  if(seo) return seoToMetadata(seo, url)
}

const Article = async ({params}: PageProps) =>  {
  const { slug, locale } = await params;
  const {baseSlug, lang} = parseSlug(slug)

  if(lang !== locale) {
    redirect(`/articles/${baseSlug}-${locale}`)
  }

  const { data, errors } = await fetchGraphQL(getArticle(`/${baseSlug}-${locale}`));
  const article: TArticle | null = data?.allArticlesItem?.[0] || null
  
  return (
    <ArticlePage article={article}/>
  )
}

export default Article;