import { ArticlesPage } from "@/components/pages"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations('ArticlesPage.seo')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(item => item.trim()),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale,
      url: `${baseUrl}/${locale}/articles`,
      siteName: "Kaelis",
      type: 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description')
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/articles`,
      languages: {
        "x-default": `${baseUrl}/articles`,
        'en': `${baseUrl}/en/articles`,
        'uk': `${baseUrl}/uk/articles`,
        'ru': `${baseUrl}/ru/articles`,
      }
    },
  }
}

const Articles = () => <ArticlesPage />

export default Articles;