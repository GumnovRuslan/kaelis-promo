'use client'

import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { createSlug } from '@/utils/slug'
import { CategoryCard, CategoriesGrid, CategoryDetailContainer, CategoriesContainer } from '@/components/categories'
import styles from './styles.module.scss'

export default function CategoryDetailPage() {
    const params = useParams()
    const categoryName = params.name as string
    const lastRequestedCategoryId = useRef<string | null>(null)

    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.shuffle.categories)
    const spreads = useAppSelector(state => state.shuffle.spreads)
    const selectedCategory = useAppSelector(state => state.shuffle.selectedCategory)
    const isLoading = useAppSelector(state => state.shuffle.isLoading)

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20 }))
        }
    }, [dispatch, categories])

    useEffect(() => {
        if (!categories || categories.length === 0) return
        
        const category = categories.find(cat => {
            const categorySlug = createSlug(cat.name)
            return categorySlug === categoryName || cat.id === categoryName
        })
        
        if (!category) return
        
        const currentCategorySlug = selectedCategory ? createSlug(selectedCategory.name) : null
        const needsUpdate = !selectedCategory || currentCategorySlug !== categoryName
        
        if (needsUpdate && category.id !== lastRequestedCategoryId.current) {
            lastRequestedCategoryId.current = category.id
            dispatch(shuffleActions.setSelectedCategory(category))
            dispatch(shuffleActions.getTarotSpreads(category))
        }
    }, [categories, categoryName, selectedCategory, dispatch])

    if (isLoading && !categories) {
        return (
            <CategoriesContainer>
                <div className={styles.loading}>Загрузка...</div>
            </CategoriesContainer>
        )
    }

    if (!selectedCategory) {
        return (
            <CategoriesContainer>
                <div className={styles.error}>Категория не найдена</div>
            </CategoriesContainer>
        )
    }

    const isLoadingSpreads = isLoading || spreads === null

    return (
        <CategoryDetailContainer
            title={selectedCategory.name}
            description={selectedCategory.description}
            backHref="/categories"
        >
            {isLoadingSpreads ? (
                <div className={styles.loading}>Загрузка спредов...</div>
            ) : spreads && spreads.length > 0 ? (
                <CategoriesGrid>
                    {spreads.map((spread) => {
                        const spreadSlug = createSlug(spread.name)
                        return (
                            <CategoryCard
                                key={spread.id}
                                id={spread.id}
                                name={spread.name}
                                description={spread.description}
                                image={spread.image}
                                href={`/categories/${categoryName}/${spreadSlug}`}
                            />
                        )
                    })}
                </CategoriesGrid>
            ) : (
                <div className={styles.error}>Спреды не найдены</div>
            )}
        </CategoryDetailContainer>
    )
}

