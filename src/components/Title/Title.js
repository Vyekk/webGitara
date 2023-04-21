import React from "react";
import styles from "components/Title/Title.module.scss";
import PropTypes from "prop-types";

const Title = ({children, center, tag: Tag, orange, black}) => {
    let titleStyle = orange ? styles.titleOrange : styles.title;
    titleStyle = black ? styles.titleBlack : titleStyle;
    const textCenter = center ? {textAlign: 'center'} : {};
    return (
        <Tag style={textCenter} className={titleStyle}>{children}</Tag>
    )
}

Title.propTypes = {
    tag: PropTypes.string,
};
Title.defaultProps = {
    tag: "h2",
};

export default Title;