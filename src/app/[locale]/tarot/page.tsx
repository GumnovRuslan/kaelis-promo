import CategoriesPage from '@/components/pages/categories';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('TarotSeo');

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
  };
};

export default CategoriesPage;
