import { PolicyPage } from "@/components/pages";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations('PrivacyPolicyPage.seo')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(item => item.trim()),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale,
      url: `${baseUrl}/${locale}/privacy-policy`,
      siteName: "Kaelis",
      type: 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description')
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy-policy`,
      languages: {
        "x-default": `${baseUrl}/privacy-policy`,
        'en': `${baseUrl}/en/privacy-policy`,
        'uk': `${baseUrl}/uk/privacy-policy`,
        'ru': `${baseUrl}/ru/privacy-policy`,
      }
    },
  }
}

const PrivacyPolicy = () => <PolicyPage/>

export default PrivacyPolicy;