import { ReactNode } from 'react';
import styles from './styles.module.scss'

type TProps = {
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  text: string;
  style?: 'primary' | 'secondary' | string
  children?: ReactNode
}

const Title = ({className, tag = 'h2', text, children, style = 'secondary'}: TProps) => {
  const Tag = tag;
  
  return (
    <Tag className={`${styles.title} ${styles[`title--${style}`]} ${styles[tag]} ${className || ''}`}>
      {text ? text : children}
    </Tag>
  )
}

export default Title