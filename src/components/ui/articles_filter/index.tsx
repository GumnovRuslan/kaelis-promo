import styles from './styles.module.scss'

import Input from '../input';
import Tag from '../tag';
import { TCategory } from '@/types/category';

type TProps = {
  categories: TCategory[];
  selectedCategories: TCategory[];
  handleCategorySelect: (category: TCategory) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ArticlesFilter = ({
  categories, 
  selectedCategories, 
  handleCategorySelect, 
  inputValue, 
  setInputValue
}: TProps) => {
  const handleSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }

  return (
    <div className={styles.filters}>
      <Input type="text" value={inputValue} onChange={handleSetInputValue}/>
      {categories.length ? (
        <div className={styles.filters__tags}>
          {categories.map((category, i) => (
            <Tag 
              category={category} 
              isActive={selectedCategories.some(item => item.title === category.title)}
              selectCategory={() => handleCategorySelect(category)}
              key={i}
            />
            ))}
        </div>
      ): null}
    </div>
  )
}

export default ArticlesFilter;