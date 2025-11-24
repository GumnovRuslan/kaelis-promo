import styles from './styles.module.scss'

type TProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
}

const Input = ({
  children, 
  wrapperClassName = '',
  inputClassName = '',
  ...inputProps
}: TProps) => {
  return (
    <div className={`${styles.input_wrapper} ${wrapperClassName}`}>
      <input className={`${styles.input} ${inputClassName}`} {...inputProps}/>
      {children}
    </div>
  )
}

export default Input;