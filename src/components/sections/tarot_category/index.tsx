'use client';

import styles from './styles.module.scss';

import { CategoriesGrid, CategoryCard } from '@/components/categories';
import { useTranslations, useLocale } from 'next-intl';
import { TarotCategory } from '@/lib/types/shuffle';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { Breadcrumbs } from '@/components/ui';
import { TBreadcrumbs } from '@/types/breadcrumbs';

type TProps = {
  categories: TarotCategory[] | null;
};

const TarotCategorySection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.shuffle);

  const breadcrumbsData: TBreadcrumbs[] = [
    {
      label: t('breadcrumbs.home'),
      url: '/',
    },
    {
      label: t('breadcrumbs.tarot'),
      url: '/tarot',
    },
  ];

  const onClickSelectCategory = (category: TarotCategory) => {
    dispatch(shuffleActions.setSelectedCategory({ data: category, lang: locale }));
  };

  return (
    <section className={styles.tarot}>
      <div className={styles.tarot__header}>
        <Breadcrumbs data={breadcrumbsData} />
        <h1 className={styles.tarot__title}>{t('CategoriesPage.title')}</h1>
        <p className={styles.tarot__description}>{t('CategoriesPage.subtitle')}</p>
      </div>

      <CategoriesGrid>
        {categories.data?.map((category: TarotCategory) => (
          <CategoryCard
            key={category.id}
            id={String(category.id)}
            name={category.name + 1}
            description={category.site_description}
            image={category.image}
            href={`/tarot/${category.slug}`}
            onClick={() => onClickSelectCategory(category)}
          />
        ))}
      </CategoriesGrid>
    </section>
  );
};

export default TarotCategorySection;
