'use client'

import styles from './styles.module.scss'

import ArticleCategory from '../article_category'
import { TCategory } from '@/types/category'
import { useState, useRef } from 'react'

type TProps = {
  categories: TCategory[]
}

const ArticleCategoriesList = ({categories}: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const itemRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.categories}>
      {categories.length > 1 && (
        <div 
          className={styles.categories__list} 
          style={isOpen && itemRef.current 
            ? { height: itemRef.current.scrollHeight } 
            : { height: '0px' }
        }>
          <div className={styles.categories__list_inner} ref={itemRef}>
            {categories.slice(1).map((cat, i) => <ArticleCategory label={cat.title} key={i}/>)}
            <ArticleCategory label={categories[0].title}/>
          </div>
        </div>
      )}
      <div className={styles.categories__header}>
        <ArticleCategory label={categories[0]?.title} />
        {/* <ArticleCategory label={categories[0]?.title} more={{num: categories.slice(1).length, setIsOpen, isOpen}} /> */}
      </div>
    </div>
  )
}

export default ArticleCategoriesList