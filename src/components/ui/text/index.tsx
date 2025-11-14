import { ReactNode } from 'react';
import styles from './styles.module.scss'

type TProps = {
  className?: string;
  tag?: 'p' | 'span';
  text: string;
  style?: 'default' | 'secondary' | string
  children?: ReactNode
}

const Text = ({className, tag = 'p', text, children, style = 'default'}: TProps) => {
  const Tag = tag;
  
  return (
    <Tag className={`${styles.text} ${styles[`text--${style}`]} ${styles[tag]} ${className || ''}`}>
      {text ? text : children}
    </Tag>
  )
}

export default Text