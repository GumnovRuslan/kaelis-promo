'use client';
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import styles from './styles.module.scss';
import { Chart } from '@/components/sections';
import { useLocale, useTranslations } from 'next-intl';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';
import { label } from 'motion/react-client';

export default function ChartPage() {
  const t = useTranslations('CategoriesPage');
  const b = useTranslations('breadcrumbs');
  const { question, selectedCategory, selectedSpread } = useAppSelector((state) => state.shuffle);
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const BREADCRUMBS_DATA = [
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
      url: `/tarot/${selectedCategory.data?.slug}`,
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: `/tarot/${selectedCategory.data?.slug}/${selectedSpread.data?.slug}`,
    },
    {
      label: b('chart'),
      url: `/tarot/${selectedCategory.data?.slug}/${selectedSpread.data?.slug}/chart`,
    },
  ];

  useEffect(() => {
    if (!selectedCategory.data || selectedCategory.lang !== locale) {
      dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20, lang: locale }));
    }
    if (!selectedSpread.data || selectedSpread.lang !== locale) {
      dispatch(
        shuffleActions.getTarotSpreads({ selectedCategory: selectedCategory.data, lang: locale }),
      );
    }
  }, [locale]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.section__header}>
          <ButtonBack
            as='link'
            href={BREADCRUMBS_DATA.at(-2)?.url ?? ''}
            text={t('buttons.back')}
          />
          <Breadcrumbs data={BREADCRUMBS_DATA} />
          {selectedSpread.data?.description && (
            <p className={styles.description}>{selectedSpread.data?.description}</p>
          )}
          {question && <p className={styles.userQuestion}>Вопрос: {question}</p>}
        </div>

        <Chart />
      </div>
    </section>
  );
}
