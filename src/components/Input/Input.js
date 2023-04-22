import React from "react";
import styles from "components/Input/Input.module.scss";
import PropTypes from "prop-types";

const Input = ({children, id, type}) => (
    <div className={styles.wrapper}>
        <input type={type} className={styles.input} placeholder={children} id={id} required />
    </div>
);

Input.propTypes = {
    type: PropTypes.string,
};
Input.defaultProps = {
    type: "text",
};

export default Input;