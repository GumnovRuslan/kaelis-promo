'use client';

import styles from './styles.module.scss';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store';
import { CategoryCard, CategoriesGrid } from '@/components/categories';
import { useLocale, useTranslations } from 'next-intl';
import { TarotCard, TarotCategory } from '@/lib/types/shuffle';
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import { Loader } from '@/components/sections';
import { useParams } from 'next/navigation';
import { TBreadcrumbs } from '@/types/breadcrumbs';

export default function SpreadsPage() {
  const locale = useLocale();
  const t = useTranslations('CategoriesPage');
  const b = useTranslations('breadcrumbs');
  const dispatch = useAppDispatch();
  const { selectedCategory, categories, spreads, isLoading } = useAppSelector(
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

  const handleSelectSpread = (spread: TarotCard) => {
    if (!spreads.data || !spreads.lang) return;
    dispatch(shuffleActions.setSelectedSpread({ data: spread, lang: spreads.lang }));
  };

  const changeSelectCategory = async () => {
    const res = await dispatch(shuffleActions.getTarotCategories({ lang: locale }));
    if (res.meta.requestStatus === 'fulfilled') {
      const categories = res.payload as { data: TarotCategory[]; lang: string };
      const foundCategory = categories.data?.find((cat) => cat.id === selectedCategory.data?.id);

      if (!foundCategory) return;

      dispatch(shuffleActions.setSelectedCategory({ data: foundCategory, lang: locale }));
    }
  };

  useEffect(() => {
    if (!selectedCategory.data || selectedCategory.lang !== locale) {
      changeSelectCategory();
    }
  }, [dispatch, locale]);

  useEffect(() => {
    if (!categorySlug || !categories.data || isLoading) return;
    const foundCategory = categories.data.find((cat) => cat.slug === categorySlug);

    if (!foundCategory) return;

    dispatch(shuffleActions.setSelectedCategory({ data: foundCategory, lang: locale }));
    dispatch(
      shuffleActions.getTarotSpreads({
        selectedCategory: foundCategory,
        lang: locale,
      }),
    );
  }, [categorySlug]);

  if (isLoading) {
    return <Loader text={t('loader.load')} />;
  }

  return (
    <section className={styles.spreads}>
      <div className={styles.spreads__header}>
        <ButtonBack as='link' href={BREADCRUMBS_DATA.at(-2)?.url ?? ''} text={t('buttons.back')} />
        <Breadcrumbs data={BREADCRUMBS_DATA} className={styles.spreads__breadcrumbs} />
        {selectedCategory.data?.name && (
          <h1 className={styles.spreads__header_title}>{selectedCategory.data.name}</h1>
        )}
        {selectedCategory.data?.description && (
          <p className={styles.spreads__heder_description}>{selectedCategory.data.description}</p>
        )}
      </div>

      {!selectedCategory.data ? (
        <Loader text={t('loader.categoryNotFound')} />
      ) : !spreads.data || !spreads.data.length ? (
        <Loader text={t('loader.spreadsNotFound')} />
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
              onClick={() => {
                handleSelectSpread(spread);
              }}
            />
          ))}
        </CategoriesGrid>
      )}
    </section>
  );
}
