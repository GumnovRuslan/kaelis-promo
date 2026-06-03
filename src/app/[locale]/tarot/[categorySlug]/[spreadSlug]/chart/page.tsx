'use client';
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import styles from './styles.module.scss';
import { Chart } from '@/components/sections';
import { useTranslations } from 'next-intl';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';

export default function ChartPage() {
  const t = useTranslations('CategoriesPage');
  const b = useTranslations('breadcrumbs');
  const { question, selectedCategory, selectedSpread } = useAppSelector((state) => state.shuffle);
  const route = useRouter();
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.section__header}>
          <ButtonBack
            as='button'
            text={t('buttons.back')}
            onClick={() => {
              dispatch(shuffleActions.resetShuffleResponse());
              route.push(BREADCRUMBS_DATA.at(-2)?.url ?? '/tarot');
            }}
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
