import { SpreadsPage } from '@/components/pages';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { categorySlug: slug } = await params;
  const t = await getTranslations('TarotSeo');

  return {
    title: t(`category.${slug}`),
    description: t(`category.${slug}`) + t('descriptionTemplate'),
    openGraph: {
      title: t(`category.${slug}`),
      description: t(`category.${slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`category.${slug}`),
      description: t(`category.${slug}`),
    },
  };
};

export default SpreadsPage;
