'use client';

import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { ReaderStyleSelector } from '@/components/shuffle/reader-style-selector';
import { Chat } from '@/components/shuffle/chat';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { Loader } from '@/components/sections';
import { ButtonBack, Breadcrumbs } from '@/components/ui';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ChartPage() {
  const t = useTranslations();
  const b = useTranslations('breadcrumbs');
  const { selectedCategory, selectedSpread, isLoading, readerStyle } = useAppSelector(
    (state) => state.shuffle,
  );
  const params = useParams();
  const spreadSlug = params.spreadSlug;
  const categorySlug = params.categorySlug;
  const dispatch = useAppDispatch();

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
      url: `/tarot/${categorySlug}`,
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: `/tarot/${categorySlug}/${spreadSlug}`,
    },
  ];

  useEffect(() => {
    dispatch(shuffleActions.resetShuffleResponse());
  }, []);

  if (!selectedCategory.data && !isLoading) {
    return <Loader text={t('CategoriesPage.loader.categoryNotFound')} />;
  } else if (!selectedSpread.data && !isLoading) {
    return <Loader text={t('CategoriesPage.loader.spreadsNotFound')} />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.section__header}>
          <ButtonBack
            as='link'
            href={BREADCRUMBS_DATA.at(-2)?.url ?? ''}
            text={t('CategoriesPage.buttons.back')}
          />
          <Breadcrumbs data={BREADCRUMBS_DATA} />
          {spreadSlug && <h1 className={styles.title}>{t(`TarotSeo.spread.${spreadSlug}`)}</h1>}
        </div>

        {selectedSpread.data?.description && (
          <p className={styles.description}>{selectedSpread.data?.description}</p>
        )}

        <div className={styles.content}>
          <ReaderStyleSelector />

          {readerStyle.data && <Chat />}
        </div>
      </div>
    </section>
  );
}
