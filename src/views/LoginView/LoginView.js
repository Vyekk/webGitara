import React from "react";
import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";
import Section from "components/Section/Section";
import loginPageImage from "assets/login-page-background.png";
import styles from "views/LoginView/LoginView.module.scss";
import Modal from "components/Modal/Modal";
import Form from "components/Form/Form";

class LoginView extends React.Component {
    render() {
        return (
            <Section url={loginPageImage}>
                <div className={styles.wrapper}>
                    <Logo />
                    <Link to="/">&lt; Wróć do strony głównej</Link>
                    <Modal>
                        <Form />
                    </Modal>
                </div>
            </Section>
        );
    }
}

export default LoginView;