import { SpreadsPage } from '@/components/pages';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TProps = {
  params: Promise<{
    locale: string;
    categorySlug: string;
  }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { categorySlug: slug, locale } = await params;
  const t = await getTranslations('TarotSeo');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

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
    alternates: {
      canonical: `${baseUrl}/${locale}/tarot/${slug}`,
      languages: {
        'x-default': `${baseUrl}/tarot/${slug}`,
        en: `${baseUrl}/en/tarot/${slug}`,
        'uk-UA': `${baseUrl}/ua/tarot/${slug}`,
        ru: `${baseUrl}/ru/tarot/${slug}`,
      },
    },
  };
};

export default SpreadsPage;
