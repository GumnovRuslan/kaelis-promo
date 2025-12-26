'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, shuffleActions } from '@/store'
import { createSlug } from '@/utils/slug'
import { CategoryCard, CategoriesGrid, CategoriesContainer } from '@/components/categories'
import styles from './styles.module.scss'

export default function CategoriesPage() {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.shuffle.categories)
    const isLoading = useAppSelector(state => state.shuffle.isLoading)

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(shuffleActions.getTarotCategories({ page: 1, per_page: 20 }))
        }
    }, [dispatch, categories])

    if (isLoading && !categories) {
        return (
            <div className={styles.loading}>
                <p>Загрузка...</p>
            </div>
        )
    }

    return (
        <CategoriesContainer
            title="Категории Таро"
            description="От любви до карьеры — позвольте нам провести вас по вашему космическому путешествию."
        >
            <CategoriesGrid>
                {categories?.map((category) => {
                    const categorySlug = createSlug(category.name)
                    return (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                            href={`/categories/${categorySlug}`}
                        />
                    )
                })}
            </CategoriesGrid>
        </CategoriesContainer>
    )
}

