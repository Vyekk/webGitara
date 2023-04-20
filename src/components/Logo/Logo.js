import React from "react";
import styles from "components/Logo/Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => (
    <p className={styles.logo}>
        <Link to="/">
            web<span className={styles.logoPrimary}>Gitara</span>
        </Link>
    </p>
);

export default Logo;