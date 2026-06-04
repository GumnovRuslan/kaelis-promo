'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, useAppSelector, useAppDispatch, shuffleActions } from '@/store';
import { Loader } from '@/components/sections';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const LayoutTarot = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('CategoriesPage.loader');

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader text={t('load')} />} persistor={persistor}>
        <Wrapper>{children}</Wrapper>
      </PersistGate>
    </Provider>
  );
};

export default LayoutTarot;

function Wrapper({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const params = useParams();
  const categorySlug = params.categorySlug as string | undefined;
  const spreadSlug = params.spreadSlug as string | undefined;
  const { categories, spreads, speakers } = useAppSelector((state) => state.shuffle);

  //  Загружаем данные при смене языка
  useEffect(() => {
    if (!categories || locale === categories.lang) return;

    dispatch(shuffleActions.getTarotCategories({ lang: locale }));
  }, [dispatch, locale]);

  //  Загружаем данные при смене языка
  useEffect(() => {
    if (!speakers || locale === speakers.lang) return;

    dispatch(shuffleActions.getTarotSpeaker({ lang: locale }));
  }, [dispatch, locale]);

  // Выбираем категорию по slug
  useEffect(() => {
    if (!categorySlug) {
      dispatch(shuffleActions.clearSelectedCategory());
      return;
    }

    if (!categories.data?.length) return;

    const category = categories.data.find((item) => item.slug === categorySlug);

    if (!category) {
      dispatch(shuffleActions.clearSelectedCategory());
      return;
    }

    dispatch(shuffleActions.setSelectedCategory({ data: category, lang: locale }));
    dispatch(shuffleActions.getTarotSpreads({ selectedCategory: category, lang: locale }));
  }, [categorySlug, categories.data, locale, dispatch]);

  // Выбираем spread по slug
  useEffect(() => {
    if (!spreadSlug) {
      dispatch(shuffleActions.clearSelectedSpread());
      return;
    }

    if (!spreads.data?.length) return;

    const spread = spreads.data.find((item) => item.slug === spreadSlug);

    if (!spread) {
      dispatch(shuffleActions.clearSelectedSpread());
      return;
    }

    dispatch(shuffleActions.setSelectedSpread({ data: spread, lang: locale }));
  }, [spreadSlug, spreads.data, locale, dispatch]);

  return <>{children}</>;
}
