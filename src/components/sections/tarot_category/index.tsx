import { CategoriesContainer, CategoriesGrid, CategoryCard } from '@/components/categories';
import { useTranslations, useLocale } from 'next-intl';
import { TarotCategory } from '@/lib/types/shuffle';
import { shuffleActions, useAppDispatch } from '@/store';

type TProps = {
  categories: TarotCategory[] | null;
}

const TarotCategorySection = ({categories}: TProps) => {
  const t = useTranslations('CategoriesPage')
  const locale = useLocale()
  const dispatch = useAppDispatch()

  const onClickSelectCategory = (category: TarotCategory) => {
    dispatch(shuffleActions.setSelectedCategory({data: category, lang: locale}))
  }

  return (
    <CategoriesContainer
      title={t('title')}
      description={t('subtitle')}
    >
      <CategoriesGrid>
        {categories?.map((category: TarotCategory) => (
          <CategoryCard
            key={category.id}
            id={String(category.id)}
            name={category.name}
            description={category.site_description}
            image={category.image}
            href={`/tarot/spread`}
            onClick={() => onClickSelectCategory(category)}
          />
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  )
}

export default TarotCategorySection