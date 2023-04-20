import React from "react";
import styles from "components/Title/Title.module.scss";

const Title = ({children, center, tag: Tag, orange, black}) => {
    let titleStyle = orange ? styles.titleOrange : styles.title;
    titleStyle = black ? styles.titleBlack : titleStyle;
    const textCenter = center ? {textAlign: 'center'} : {};
    return (
        <Tag style={textCenter} className={titleStyle}>{children}</Tag>
    )
}

export default Title;