import styles from './styles.module.scss'

type TData = {
  id: number;
  type: 'delete' | 'clear'
  text: string;
  hash: string;
}

type TProps = {
  data: TData[];
  selectData: TData | null;
  setSelectData: (data: TData) => void
}

const Switcher = ({data, selectData, setSelectData}: TProps) => {
  return (
    <div className={styles.switcher}>
      <div className={styles.switcher__inner}>
        {data.map((el, i) => 
          <button 
            className={`${styles.switcher__button} ${selectData?.id == el.id ? styles['switcher__button--active'] : styles['switcher__button--disable']}`}
            onClick={() => setSelectData(el)}
            type='button' 
            key={i}
          >
            {el.text}
          </button>
        )}
      </div>
    </div>
  )
}

export default Switcher