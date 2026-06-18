import { ChartPage } from '@/components/pages';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TProps = {
  params: Promise<{
    spreadSlug: string;
  }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { spreadSlug: slug } = await params;
  const t = await getTranslations('TarotSeo');

  return {
    title: t(`spread.${slug}`),
    description: t(`spread.${slug}`) + t('descriptionTemplate'),
    openGraph: {
      title: t(`spread.${slug}`),
      description: t(`spread.${slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`spread.${slug}`),
      description: t(`spread.${slug}`),
    },
  };
};

export default ChartPage;
