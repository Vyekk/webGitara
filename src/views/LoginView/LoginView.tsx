import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';
import loginPageImage from 'assets/login-page-background.png';
import styles from 'views/LoginView/LoginView.module.scss';
import Modal from 'components/Modal/Modal';
import AuthForm from 'components/Form/AuthForm';

interface User {
    username: string;
    password: string;
}

const LoginView = () => {
    const navigate = useNavigate();
    const users: User[] = [
        { username: 'user1', password: 'password123' },
        { username: 'user2', password: 'mysecurepassword' },
        { username: 'admin', password: 'admin123' },
    ];

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
        // Symulacja logowania
        e.preventDefault();
        const loggingUser = users.find((u) => u.username === user.username && u.password === user.password);
        if (loggingUser) {
            localStorage.setItem('user', JSON.stringify({ username: user.username }));
            navigate('/play/dashboard');
        } else {
            alert('Nieprawidłowe dane logowania');
        }
    };

    return (
        <Section url={loginPageImage}>
            <div className={styles.wrapper}>
                <Logo />
                <Link to="/">&lt; Wróć do strony głównej</Link>
                <Modal>
                    <AuthForm submitFn={handleLogin} />
                </Modal>
            </div>
        </Section>
    );
};

export default LoginView;
