import styles from './styles.module.scss'

import Input from '../input';
import Tag from '../tag';

const TAGS = [
  'All',
  'Training',
  'Astrology',
  'Numerology',
  'Spreads',
  'Practices',
]

const ArticlesFilter = () => {
  return (
    <div className={styles.filters}>
      <Input type="text" />
      <div className={styles.filters__tags}>
        {TAGS.map((text, i) => <Tag text={text} key={i}/>)}
      </div>
    </div>
  )
}

export default ArticlesFilter;