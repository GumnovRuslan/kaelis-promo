'use client';

import styles from './styles.module.scss'
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Articles, ArticlesFilter } from "@/components/ui";
import { useTranslations } from "next-intl";
import { TCategory } from "@/types/category";
import { TArticlePreview } from "@/types/articles";

type TProps = {
  categories: TCategory[];
  articles: TArticlePreview[]
}

const ArticlesList = ({categories, articles}: TProps) => {
  const t = useTranslations('ArticlesPage')
  const [selectedCategories, setSelectedCategories] = useState<TCategory[] | []>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleCategorySelect = useCallback((category: TCategory) => {
    setSelectedCategories(prev => {
      const isSelected = prev.some(item => item.title === category.title);
      return isSelected 
        ? prev.filter(item => item.title !== category.title)
        : [...prev, category];
    });
  }, []);

  const filterArticles = useMemo(() => (articles: TArticlePreview[], selectedCategories: TCategory[], inputValue: string) => {
    return articles.filter(article => {
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some(selectedCat => 
          article.category?.some(cat => cat.title === selectedCat.title)
        );

      const searchMatch = inputValue.trim() === '' || 
        article.title.toLowerCase().includes(inputValue.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategories, inputValue]);

  return (
    <div className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__header}>
          <h1 className={styles.articles__title}>{t('title')}</h1>
          <p className={styles.articles__description}>{t('desc')}</p>
        </div>
        <ArticlesFilter 
          categories={categories} 
          selectedCategories={selectedCategories} 
          handleCategorySelect={handleCategorySelect}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <div className={styles.articles__content}>
          {articles && articles.length && (
            <Articles articles={filterArticles(articles, selectedCategories, inputValue)}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;

// function useDebounce(inputValue: string, arg1: number): [any] {
//   throw new Error('Function not implemented.');
// }
