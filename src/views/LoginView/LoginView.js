import React from "react";
import Title from "components/Title/Title";
import Logo from "components/Logo/Logo";
import Section from "components/Section/Section";
import loginPageImage from "assets/login-page-background.png";
import styles from "views/LoginView/LoginView.module.scss";

const LoginView = () => (
    <Section url={loginPageImage}>
        <div className={styles.wrapper}>
            <Logo />
        </div>
    </Section>
);

export default LoginView;