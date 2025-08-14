import styles from "./styles.module.scss";

import Link from "next/link";

type IProps = {
  children?: React.ReactNode;
  type?: "button" | "link";
  href?: string;
  text?: string;
  className?: string;
}

const Button = ({children, type, href = '#', className, text}: IProps) => {

  if (href) {
    return (
      <Link href={href} className={`${styles.button} ${styles.button_text} ${className}`}>
        {text 
          ? (<span className={styles.text}>{text}</span>) 
          : children
        }
      </Link>
    );
  }

  return (
    <button  className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}

export default Button;