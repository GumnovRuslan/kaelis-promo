import {ContactsPage} from "@/components/pages"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations('ContactsPage.seo')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(item => item.trim()),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      locale,
      url: `${baseUrl}/${locale}/contacts`,
      siteName: "Kaelis",
      type: 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description')
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contacts`,
      languages: {
        "x-default": `${baseUrl}/contacts`,
        'en': `${baseUrl}/en/contacts`,
        'uk-UA': `${baseUrl}/ua/contacts`,
        'ru': `${baseUrl}/ru/contacts`,
      }
    },
  }
}

const Contacts = () => <ContactsPage/>

export default Contacts