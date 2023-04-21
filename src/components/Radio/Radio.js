import React from "react";
import styles from "components/Radio/Radio.module.scss";

const Radio = ({name, value, ...props}) => (
    <div className={styles.wrapper}>
        <input {...props} id={value} className={styles.radio} type="radio" value={value} name={name}/>
        <label className={styles.radioLabel} htmlFor={name}>{value}</label>
    </div>
);

export default Radio;