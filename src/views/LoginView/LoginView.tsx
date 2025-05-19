import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';
import loginPageImage from 'assets/login-page-background.png';
import styles from 'views/LoginView/LoginView.module.scss';
import Modal from 'components/Modal/Modal';
import AuthForm from 'components/Form/AuthForm';
import Button from 'components/Button/Button';
import { login } from 'utils/auth';

interface User {
    username: string;
    password: string;
}

const LoginView = () => {
    const [incorrectData, setIncorrectData] = React.useState(false);
    const navigate = useNavigate();
    const authError = (
        <div className={styles.authError}>
            <p>Nieprawidłowe dane logowania</p>
            <p>Aby spróbować jeszcze raz, kliknij przycisk poniżej</p>
            <Button isDark onClick={() => setIncorrectData(false)}>
                &lt; Powrót do logowania
            </Button>
        </div>
    );

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
        // Symulacja logowania
        e.preventDefault();
        const isUserLoggedIn = login(user.username, user.password);
        if (isUserLoggedIn) {
            navigate('/play/dashboard');
        } else {
            setIncorrectData(true);
        }
    };

    return (
        <Section url={loginPageImage}>
            <div className={styles.wrapper}>
                <Logo />
                <Link to="/"> &lt; wróć do strony głównej</Link>
                <Modal>{!incorrectData ? <AuthForm submitFn={handleLogin} /> : authError}</Modal>
            </div>
        </Section>
    );
};

export default LoginView;
