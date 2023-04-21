import React from "react";
import styles from "components/Modal/Modal.module.scss";

const Modal = ({children}) => (
    <div className={styles.wrapper}>
        {children}
    </div>
);

export default Modal;