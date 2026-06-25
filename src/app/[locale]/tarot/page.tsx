import CategoriesPage from '@/components/pages/categories';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TSeoProps = {
  params: Promise<{ locale: string; categorySlug: string }>;
};

export const generateMetadata = async ({ params }: TSeoProps): Promise<Metadata> => {
  const t = await getTranslations('TarotSeo');
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t('tarot'),
    description: t('tarot') + t('descriptionTemplate'),
    openGraph: {
      title: t('tarot'),
      description: t('tarot'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('tarot'),
      description: t('tarot'),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/tarot`,
      languages: {
        'x-default': `${baseUrl}/tarot`,
        en: `${baseUrl}/en/tarot`,
        'uk-UA': `${baseUrl}/ua/tarot`,
        ru: `${baseUrl}/ru/tarot`,
      },
    },
  };
};

export default CategoriesPage;
