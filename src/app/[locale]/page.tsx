import { HomePage } from "@/components/pages";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: "Kaelis",
    description: "",
    keywords: "Kaelis",
    icons: {
      icon: "/images/favicon.svg",
    },
    openGraph: {
      title: 'Kaelis',
      description: '',
      locale,
      type: 'website',
      url: baseUrl,
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'uk': `${baseUrl}/uk`,
        'ru': `${baseUrl}/ru`,
      }
    }
  }
}

const Home = () => <HomePage />

export default Home;
