import React from "react";
import styles from "components/Button/Button.module.scss";

const Button = ({children, href, circle, dark, ...props}) => {

    const buttonStyle = circle ? styles.buttonCircle : styles.button;
    const darkStyle = dark ? styles.buttonDark : "";
    return (
        <>
            {href ? (<a href={href} className={buttonStyle + " " + darkStyle}>{children}</a>) : (<button {...props} className={buttonStyle + " " + darkStyle}>{children}</button>)}
        </>
    )
}

export default Button;