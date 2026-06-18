'use client';

import styles from './styles.module.scss';

import { useAppSelector } from '@/store';
import { CategoryCard, CategoriesGrid } from '@/components/categories';
import { useTranslations } from 'next-intl';
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import { Loader } from '@/components/sections';
import { useParams } from 'next/navigation';
import { TBreadcrumbs } from '@/types/breadcrumbs';

export default function SpreadsPage() {
  const t = useTranslations();
  const b = useTranslations('breadcrumbs');
  const { selectedCategory, selectedSpread, spreads, isLoading } = useAppSelector(
    (state) => state.shuffle,
  );
  const params = useParams();
  const categorySlug = params.categorySlug;

  const BREADCRUMBS_DATA: TBreadcrumbs[] = [
    {
      label: b('home'),
      url: '/',
    },
    {
      label: b('tarot'),
      url: '/tarot',
    },
    {
      label: selectedCategory.data?.name ?? '',
      url: `/tarot/${categorySlug}`,
    },
  ];

  if (isLoading) {
    return <Loader text={t('CategoriesPage.loader.load')} />;
  }

  return (
    <section className={styles.spreads}>
      <div className={styles.spreads__header}>
        <ButtonBack
          as='link'
          href={BREADCRUMBS_DATA.at(-2)?.url ?? ''}
          text={t('CategoriesPage.buttons.back')}
        />
        <Breadcrumbs data={BREADCRUMBS_DATA} className={styles.spreads__breadcrumbs} />
        {selectedCategory.data?.name && (
          <h1 className={styles.spreads__header_title}>{t(`TarotSeo.category.${categorySlug}`)}</h1>
        )}
        {selectedCategory.data?.description && (
          <p className={styles.spreads__heder_description}>{selectedCategory.data.description}</p>
        )}
      </div>

      {!selectedCategory.data ? (
        <Loader text={t('CategoriesPage.loader.categoryNotFound')} />
      ) : !spreads.data || !spreads.data.length ? (
        <Loader text={t('CategoriesPage.loader.spreadsNotFound')} />
      ) : (
        <CategoriesGrid>
          {spreads.data.map((spread) => (
            <CategoryCard
              key={spread.id}
              id={spread.id}
              name={spread.name}
              description={spread.description}
              image={spread.image}
              href={`/tarot/${categorySlug}/${spread.slug}`}
            />
          ))}
        </CategoriesGrid>
      )}
    </section>
  );
}
