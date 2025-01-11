import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';
import loginPageImage from 'assets/login-page-background.png';
import styles from 'views/LoginView/LoginView.module.scss';
import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';

const LoginView = () => {
    const navigate = useNavigate();
    const loadUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/play/dashboard');
    };

    const users = [
        { username: 'user1', password: 'password123' },
        { username: 'user2', password: 'mysecurepassword' },
        { username: 'admin', password: 'admin123' },
    ];

    return (
        <Section url={loginPageImage}>
            <div className={styles.wrapper}>
                <Logo />
                <Link to="/">&lt; Wróć do strony głównej</Link>
                <Modal>
                    <Form submitFn={loadUser} />
                </Modal>
            </div>
        </Section>
    );
};

export default LoginView;
