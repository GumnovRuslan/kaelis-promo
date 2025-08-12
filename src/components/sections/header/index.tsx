import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.header__logo}>KAELIS</span>
      <nav className={styles.header__menu}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>  
      </nav>
    </header>
  )
}

export default Header;