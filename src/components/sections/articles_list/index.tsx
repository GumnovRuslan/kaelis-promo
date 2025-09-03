'use client';

import styles from './styles.module.scss'
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Articles, ArticlesFilter, Pagination } from "@/components/ui";
import { useTranslations } from "next-intl";
import { TCategory } from "@/types/category";
import { TArticlePreview } from "@/types/articles";
import useScreenSize from '@/hooks/useScreenSize';

type TProps = {
  categories: TCategory[];
  articles: TArticlePreview[]
}

const ArticlesList = ({categories, articles}: TProps) => {
  const t = useTranslations('ArticlesPage')
  const [selectedCategories, setSelectedCategories] = useState<TCategory[] | []>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile } = useScreenSize();

  const ITEMS_PER_PAGE = isMobile ? 5 : 10;

  const handleCategorySelect = useCallback((category: TCategory) => {
    setSelectedCategories(prev => {
      const isSelected = prev.some(item => item.title === category.title);
      return isSelected 
        ? prev.filter(item => item.title !== category.title)
        : [...prev, category];
    });
  }, []);

  const filteredArticles = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    
    return articles.filter(article => {
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some(selectedCat => 
          article.category?.some(cat => cat.title === selectedCat.title)
        );

      const searchMatch = query === '' || 
        article.title.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [articles, selectedCategories, inputValue]);

  const paginationData = useMemo(() => {
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    const correctedPage = Math.min(Math.max(1, currentPage), totalPages || 1);
    const startIndex = (correctedPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredArticles.slice(startIndex, endIndex);

    return {
      currentItems,
      currentPage: correctedPage,
      totalPages,
      totalItems,
      hasNext: correctedPage < totalPages,
      hasPrev: correctedPage > 1,
    };
  }, [filteredArticles, currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, inputValue, ITEMS_PER_PAGE]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      document
        .getElementById('articles-top')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [paginationData.totalPages]);

  const nextPage = useCallback(() => {
    if (paginationData.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNext]);

  const prevPage = useCallback(() => {
    if (paginationData.hasPrev) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPrev]);

  return (
    <div className={styles.articles} id='articles-top'>
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
          {paginationData.currentItems.length > 0 ? (
            <>
              <Articles categoryIsShow articles={paginationData.currentItems.slice(0, 5)}/>
              {paginationData.currentItems.length > 5 && (!isMobile) && (
                <Articles categoryIsShow mirror articles={paginationData.currentItems.slice(5)}/>
              )}
              
              {paginationData.totalPages > 1 && (
                <Pagination 
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={goToPage}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                  hasNext={paginationData.hasNext}
                  hasPrev={paginationData.hasPrev}
                />
              )}
            </>
          ) : (
            <div className={styles.articles__empty}>
              <span className={styles.articles__empty_text}>{t('notFound')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;
