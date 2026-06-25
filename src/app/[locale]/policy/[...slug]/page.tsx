import { fetchGraphQL } from '@/lib/graphql';
import { getPolicy } from '@/graphql/queries/policy';
import { TPolicy } from '@/types/policy';
import { NotFoundPage, PolicyPage } from '@/components/pages';
import { parseSlug } from '@/utils/parseSlug';
import { redirect } from 'next/navigation';
import { TPageProps } from '@/types/page';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type TSeoProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateMetadata = async ({ params }: TSeoProps): Promise<Metadata> => {
  const t = await getTranslations('TarotSeo');
  const { locale, slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    // title: t('tarot'),
    // description: t('tarot') + t('descriptionTemplate'),
    // openGraph: {
    //   title: t('tarot'),
    //   description: t('tarot'),
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: t('tarot'),
    //   description: t('tarot'),
    // },
    alternates: {
      canonical: `${baseUrl}/${locale}/policy/${slug}`,
      languages: {
        'x-default': `${baseUrl}/policy/${slug}`,
        en: `${baseUrl}/en/policy/${slug}`,
        'uk-UA': `${baseUrl}/ua/policy/${slug}`,
        ru: `${baseUrl}/ru/policy/${slug}`,
      },
    },
  };
};

const Policy = async ({ params }: TPageProps) => {
  const { slug, locale } = await params;
  const { baseSlug, lang } = parseSlug(slug[0]);

  let policy: TPolicy | null = null;

  if (lang !== locale) {
    redirect(`/policy/${baseSlug}-${locale}`);
  } else {
    const { data, errors } = await fetchGraphQL(getPolicy(`${baseSlug}-${locale}`));
    policy = data?.allPolicy?.[0] || null;
  }

  if (!policy) return <NotFoundPage />;

  return <PolicyPage data={policy} />;
};

export default Policy;
