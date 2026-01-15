import styles from './styles.module.scss';

type TProps = {
  text?: string;
}

const Loader = ({text}: TProps) => {
  return (
    <div className={styles.loading}>
      <p>{text}</p>
    </div>
  )
}

export default Loader