import React from "react";
import styles from "components/Header/Header.module.scss";
import HeaderNavigation from "components/Header/HeaderNavigation";
const Header = () => (
    <nav className={styles.wrapper}>
        <p className={styles.logo}>web<span className={styles.logoPrimary}>Gitara</span></p>
        <HeaderNavigation />
    </nav>
);

export default Header;