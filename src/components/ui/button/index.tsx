import styles from "./styles.module.scss";

import Link from "next/link";

type TButton = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

type ButtonAsButton = TButton &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TButton> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = TButton &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TButton> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({children, className, text, as, ...props}: ButtonProps) => {

  if (as === 'link') {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={`${styles.button} ${text ? styles['button--text'] : ''} ${className}`} {...rest}>
        {text 
          ? <span className={styles.button__text}>{text}</span>
          : children
        }
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={`${styles.button} ${text ? styles['button--text'] : ''} ${className}`} {...buttonProps}>
      {text 
        ? <span className={styles.button__text}>{text}</span>
        : children
      }
    </button>
  );
}

export default Button;