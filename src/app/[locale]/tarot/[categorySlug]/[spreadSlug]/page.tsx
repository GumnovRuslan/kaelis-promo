import { ChartPage } from '@/components/pages';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TProps = {
  params: Promise<{
    locale: string;
    categorySlug: string;
    spreadSlug: string;
  }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { categorySlug, spreadSlug, locale } = await params;
  const t = await getTranslations('TarotSeo');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: t(`spread.${spreadSlug}`),
    description: t(`spread.${spreadSlug}`) + t('descriptionTemplate'),
    openGraph: {
      title: t(`spread.${spreadSlug}`),
      description: t(`spread.${spreadSlug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`spread.${spreadSlug}`),
      description: t(`spread.${spreadSlug}`),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/tarot/${categorySlug}/${spreadSlug}`,
      languages: {
        'x-default': `${baseUrl}/tarot/${categorySlug}/${spreadSlug}`,
        en: `${baseUrl}/en/tarot/${categorySlug}/${spreadSlug}`,
        'uk-UA': `${baseUrl}/ua/tarot/${categorySlug}/${spreadSlug}`,
        ru: `${baseUrl}/ru/tarot/${categorySlug}/${spreadSlug}`,
      },
    },
  };
};

export default ChartPage;
