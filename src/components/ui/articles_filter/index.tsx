import styles from './styles.module.scss'

import Input from '../input';
import Tag from '../tag';
import { TCategory } from '@/types/category';
import { CloseIcon, LoupeIcon } from '@/components/icons';

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

  const handlerClearInput = () => {
    setInputValue('');
  }

  return (
    <div className={styles.filters}>
      <label  className={styles.filters__search}>
        <span className={styles.filters__loupe} onClick={handlerClearInput}>
          <LoupeIcon />
        </span>
        <Input 
          placeholder='Search articles...'
          type="text" 
          inputClassName={styles.filters__input} 
          value={inputValue} 
          onChange={handleSetInputValue}
        />
        <button type='button' className={styles.filters__clear_input} onClick={handlerClearInput}>
          <CloseIcon/>
        </button>
      </label>
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