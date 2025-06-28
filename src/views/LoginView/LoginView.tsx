import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';
import loginPageImage from 'assets/login-page-background.png';
import styles from 'views/LoginView/LoginView.module.scss';
import Modal from 'components/Modal/Modal';
import AuthForm from 'components/Form/AuthForm';
import Button from 'components/Button/Button';

const LoginView = () => {
    const [incorrectData, setIncorrectData] = useState(false);
    const authError = (
        <div className={styles.authError}>
            <p>Nieprawidłowe dane logowania</p>
            <p>Aby spróbować jeszcze raz, kliknij przycisk poniżej</p>
            <Button isDark onClick={() => setIncorrectData(false)}>
                &lt; Powrót do logowania
            </Button>
        </div>
    );

    return (
        <Section url={loginPageImage}>
            <div className={styles.wrapper}>
                <Logo />
                <Link to="/"> &lt; wróć do strony głównej</Link>
                <Modal>{!incorrectData ? <AuthForm /> : authError}</Modal>
            </div>
        </Section>
    );
};

export default LoginView;
