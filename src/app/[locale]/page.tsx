import { HomePage } from "@/components/pages";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('HomePage.seo')

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description')
    },
  }
}

const Home = () => <HomePage />

export default Home;
