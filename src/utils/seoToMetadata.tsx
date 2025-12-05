import { TArticleSeo } from "@/types/articles";
import { Metadata } from "next";

const seoToMetadata = (seo: TArticleSeo, url: string): Metadata => {
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.ogType as "website" | "article",
      
      images: [
        {
          url: seo.image?.image.asset.url ?? '',
          alt: seo.image?.altText ?? '',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${url}`,
      languages: {
        'en': `${baseUrl}/en/${url}`,
        'ua': `${baseUrl}/ua/${url}`,
        'ru': `${baseUrl}/ru/${url}`,
      }
    },
    twitter: {
      card: seo.twitterCard as "summary" | "summary_large_image" | "app" | "player",
      title: seo.title,
      description: seo.description,
      images: [seo.image?.image.asset.url ?? ''],
    },
  };
}

export default seoToMetadata;