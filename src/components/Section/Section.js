import React from "react";
import styles from "components/Section/Section.module.scss";

const Section = ({children, url, dark, id}) => {
    const backgroundStyle = dark ? styles.wrapperDark : styles.wrapper;
    const backgroundImageStyle = {
        backgroundImage: url ? `url(${url})` : '',
        backgroundSize: url ? 'cover' : '',
        backgroundRepeat: url ? 'no-repeat' : '',
        backgroundAttachment: url ? 'fixed' : ''
      };
    return (
        <section id={id} style={backgroundImageStyle} className={backgroundStyle}>
            {children}
        </section>
    );
}

export default Section;