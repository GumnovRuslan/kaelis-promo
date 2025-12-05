import { notFound } from "next/navigation";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
//   const { locale } = await params;
//   const t = await getTranslations('NotFoundPage.seo')
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

//   return {
//     title: t('title'),
//     description: t('description'),
//     robots: {
//       index: false,
//       follow: false,
//     },
//     openGraph: {
//       title: t('openGraph.title'),
//       description: t('openGraph.description'),
//       locale,
//       url: `${baseUrl}/${locale}/404`,
//       siteName: "Kaelis",
//       type: 'website'
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: t('title'),
//       description: t('description')
//     },
//     alternates: {
//       canonical: `${baseUrl}/${locale}/404`,
//       languages: {
//         "x-default": `${baseUrl}/404`,
//         'en': `${baseUrl}/en/404`,
//         'ua': `${baseUrl}/ua/404`,
//         'ru': `${baseUrl}/ru/404`,
//       }
//     },
//   }
// }

// This page is only here to catch all non-existent routes and return a 404
const CatchAll = () => notFound();

export default CatchAll;