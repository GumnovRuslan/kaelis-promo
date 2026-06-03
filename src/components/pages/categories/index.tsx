'use client';

import { useAppSelector } from '@/store';
import { useTranslations } from 'next-intl';
import { TarotCategorySection, Loader } from '@/components/sections';

export default function CategoriesPage() {
  const t = useTranslations('CategoriesPage.loader');
  const { categories, isLoading } = useAppSelector((state) => state.shuffle);

  return isLoading || !categories.data ? (
    <Loader text={t('load')} />
  ) : (
    <TarotCategorySection categories={categories.data} />
  );
}
