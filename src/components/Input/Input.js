import React from "react";
import styles from "components/Input/Input.module.scss";

const Input = ({label}) => (
    <div className={styles.wrapper}>
        <input type="text" className={styles.input} placeholder={label} id={label} required />
    </div>
);

export default Input;