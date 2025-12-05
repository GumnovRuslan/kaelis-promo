import FAQPage from "@/components/pages/faq";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations('FaqPage.seo')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(item => item.trim()),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale,
      url: `${baseUrl}/${locale}/faq`,
      siteName: "Kaelis",
      type: 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description')
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/faq`,
      languages: {
        "x-default": `${baseUrl}/faq`,
        'en': `${baseUrl}/en/faq`,
        'ua': `${baseUrl}/ua/faq`,
        'ru': `${baseUrl}/ru/faq`,
      }
    },
  }
}

const FAQ = () => <FAQPage/>

export default FAQ;