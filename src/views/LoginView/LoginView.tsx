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
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'types';
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
        const found = await usersService.findUserByCredentials(username, password);

        if (!found) {
            alert('Nieprawidłowe dane logowania');
            return;
        }

        const token = crypto.randomUUID();
        login({ token, user: found });
        navigate('/play');
    };

    const handleRegister = async (user: { username: string; password: string; email: string }) => {
        const users = await usersService.loadUsers();

        const exists = users.some((u) => u.username === user.username);
        if (exists) {
            alert('Użytkownik o takim loginie już istnieje');
            return;
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser: User = {
            idUser: uuidv4(),
            username: user.username,
            password: hashedPassword,
            email: user.email,
            isAdmin: false,
            isModerator: false,
            isActivated: true,
            created_at: new Date().toISOString(),
            average_published_song_rating: 0,
            number_of_ratings_received: 0,
        };

        await usersService.saveUsers([...users, newUser]);
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
