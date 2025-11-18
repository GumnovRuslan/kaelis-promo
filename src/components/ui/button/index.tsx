import styles from "./styles.module.scss";

import { Link } from "@/i18n/navigation";

type TButton = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  styleType?: 'primary' | 'secondary';
}

type ButtonAsButton = TButton &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TButton> & {
    as?: 'button';
  };

type ButtonAsLink = TButton &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TButton> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({children, className, styleType = 'primary', text, as = 'button', ...props}: ButtonProps) => {

  if (as === 'link') {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link 
        href={href} 
        className={`${styles.button} ${styles[`button--${styleType}`]} ${className}`} 
        {...rest}
      >
        <ButtonInner text={text} children={children}/>
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={`${styles.button} ${styles[`button--${styleType}`]} ${className}`} {...buttonProps}>
      <ButtonInner text={text} children={children}/>
    </button>
  );
}

export default Button;

function ButtonInner({text, children}: {text?: string; children?:React.ReactNode}) {
  return (
    <span className={styles.button__content}>
      {text 
        ? <span className={styles.button__text}>{text}</span>
        : children
      }
    </span>
  )
}