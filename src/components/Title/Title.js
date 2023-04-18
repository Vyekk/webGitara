import React from "react";
import styles from "components/Title/Title.module.scss";

const Title = ({children, tag: Tag, orange, white}) => {
    let titleStyle = orange ? styles.titleOrange : styles.title;
    titleStyle = white ? styles.titleWhite : titleStyle;
    return (
        <Tag className={titleStyle}>{children}</Tag>
    )
}

export default Title;