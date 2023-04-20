import React from "react";
import {HashLink} from 'react-router-hash-link';
import styles from "components/Header/HeaderNavigation.module.scss";


const HeaderNavigation = ({visible}) => {
    const wrapperStyle = visible ? styles.wrapper : styles.wrapperHide;
    return (
        <nav className={wrapperStyle}>
            <ul className={styles.navList}>
                <li className={styles.navListItem}><HashLink className={styles.hashLink} to="/#about">O projekcie</HashLink></li>
                <li className={styles.navListItem}><HashLink className={styles.hashLink} to="/#demo">Demo</HashLink></li>
                <li className={styles.navListItem}><HashLink className={styles.hashLink} to="/#profits">Zalety</HashLink></li>
                <li className={styles.navListItem}><HashLink className={styles.hashLink} to="/#contact">Kontakt</HashLink></li>
            </ul>
        </nav>
    );
}

export default HeaderNavigation;