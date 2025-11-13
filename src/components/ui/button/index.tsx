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
        {text 
          ? (
            <span className={`${text ? styles['button__content'] : ''}`}>
              <span className={styles.button__text}>
                {text}
              </span>
            </span>
          )
          : children
        }
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={`${styles.button} ${styles[`button--${styleType}`]} ${className}`} {...buttonProps}>
      {text 
        ? (
          <span className={`${text ? styles['button__content'] : ''}`}>
            <span className={styles.button__text}>
              {text}
            </span>
          </span>
        )
        : children
      }
    </button>
  );
}

export default Button;