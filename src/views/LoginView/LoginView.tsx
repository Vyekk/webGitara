import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';
import loginPageImage from 'assets/login-page-background.png';
import styles from 'views/LoginView/LoginView.module.scss';
import Modal from 'components/Modal/Modal';
import AuthForm from 'components/Form/AuthForm';
import Button from 'components/Button/Button';
import { useAuth } from 'context/AuthContext';
import { UsersService } from 'services/UsersService';

const LoginView = () => {
    const [incorrectData, setIncorrectData] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const usersService = new UsersService();
    const authError = (
        <div className={styles.authError}>
            <p>Nieprawidłowe dane logowania</p>
            <p>Aby spróbować jeszcze raz, kliknij przycisk poniżej</p>
            <Button isDark onClick={() => setIncorrectData(false)}>
                &lt; Powrót do logowania
            </Button>
        </div>
    );

    const handleLogin = async ({ username, password }: { username: string; password: string }) => {
        try {
            await login(username, password);
            navigate('/play');
        } catch (error: any) {
            alert(error.error || 'Nieprawidłowe dane logowania');
        }
    };

    const handleRegister = async (user: { username: string; password: string; email: string }) => {
        await usersService.registerUser(user);
    };

    return (
        <Section url={loginPageImage}>
            <div className={styles.wrapper}>
                <Logo />
                <Link to="/"> &lt; wróć do strony głównej</Link>
                <Modal>
                    {!incorrectData ? <AuthForm loginFn={handleLogin} registerFn={handleRegister} /> : authError}
                </Modal>
            </div>
        </Section>
    );
};

export default LoginView;
