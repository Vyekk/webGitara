import React from "react";
import styles from "components/Card/Card.module.scss";

const Card = ({children}) => (
    <div className={styles.wrapper}>
        {children}
    </div>
);

export default Card;