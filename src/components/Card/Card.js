import React from "react";
import styles from "components/Card/Card.module.scss";
import Title from "components/Title/Title";

const Card = ({title, children}) => (
    <div className={styles.wrapper}>
        <Title tag="h2" orange>{title}</Title>
        <ul>
            {children}
        </ul>
    </div>
);

export default Card;