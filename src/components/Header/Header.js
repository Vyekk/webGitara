import React from "react";
import styles from "components/Header/Header.module.scss";
import HeaderNavigation from "components/Header/HeaderNavigation";
import Logo from "components/Logo/Logo";
const Header = () => (
    <header className={styles.wrapper}>
        <Logo />
        <HeaderNavigation />
    </header>
);

export default Header;