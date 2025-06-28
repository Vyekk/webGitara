import { useState } from 'react';
import Title from 'components/Title/Title';
import styles from 'components/Form/AuthForm.module.scss';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Radio from 'components/FormRadio/FormRadio';
import { UsersService } from 'services/UsersService';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

const types = {
    login: 'logowanie',
    register: 'rejestracja',
};

const AuthForm = () => {
    const [activeOption, setActiveOption] = useState(types.login);
    const [isRegistered, setIsRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [statuteAccepted, setStatuteAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const usersService = new UsersService();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username.length < 4) {
            alert('Nick jest za krótki, musi mieć co najmniej 4 litery');
            return;
        }

        if (password !== repeatPassword) {
            alert('Hasła nie są takie same');
            return;
        }

        if (!username || !password || !email) {
            alert('Wypełnij wszystkie pola');
            return;
        }

        if (!statuteAccepted || !privacyPolicyAccepted) {
            alert('Musisz zaakceptować regulamin i politykę prywatności');
            return;
        }

        const newUser = { username, password, email };
        await usersService.registerUser(newUser);
        setIsRegistered(true);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/play');
        } catch (error: any) {
            alert(error.error || 'Nieprawidłowe dane logowania');
        }
    };

    return (
        <div className={styles.wrapper}>
            {isRegistered ? (
                <>
                    <p className={styles.info}>
                        Konto założono pomyślnie, sprawdź swoją skrzynkę <br /> email, aby aktywować konto.
                    </p>
                    <Button
                        onClick={() => {
                            setIsRegistered(false);
                            setActiveOption(types.login);
                        }}
                    >
                        Wróć do logowania
                    </Button>
                </>
            ) : (
                <>
                    {activeOption === types.login ? <Title>Zaloguj się</Title> : <Title>Zarejestruj się</Title>}
                    {activeOption === types.login ? <p>i kontynuuj praktykę</p> : <p>i wkrocz do świata muzyki</p>}
                    <form className={styles.form} onSubmit={activeOption == types.login ? handleLogin : handleRegister}>
                        <div className={styles.radioWrapper}>
                            <Radio
                                name="formType"
                                value={types.login}
                                checked={activeOption === types.login}
                                onChange={() => setActiveOption(types.login)}
                            />
                            <Radio
                                name="formType"
                                value={types.register}
                                checked={activeOption === types.register}
                                onChange={() => setActiveOption(types.register)}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <div className={styles.loginPasswordWrapper}>
                                <Input id="login" onChange={(e) => setUsername(e.target.value)}>
                                    Login
                                </Input>
                                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)}>
                                    Hasło
                                </Input>
                                {activeOption !== types.login ? (
                                    <>
                                        <Input
                                            id="rePassword"
                                            type="password"
                                            onChange={(e) => setRepeatPassword(e.target.value)}
                                        >
                                            Powtórz hasło
                                        </Input>
                                        <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)}>
                                            E-mail
                                        </Input>
                                    </>
                                ) : null}
                            </div>
                            {activeOption !== types.login ? (
                                <div className={styles.approvalWrapper}>
                                    <div className={styles.agreement}>
                                        <input
                                            id="statute"
                                            type="checkbox"
                                            checked={statuteAccepted}
                                            onChange={(e) => setStatuteAccepted(e.target.checked)}
                                        />
                                        <label htmlFor="statute">
                                            Akceptuję regulamin platformy i zobowiązuje się do jego przestrzegania
                                        </label>
                                    </div>
                                    <div className={styles.agreement}>
                                        <input
                                            id="privacyPolicy"
                                            type="checkbox"
                                            checked={privacyPolicyAccepted}
                                            onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                                        />
                                        <label htmlFor="privacyPolicy">
                                            Akceptuję politykę prywatności platformy i wyrażam zgodę na przetwarzanie
                                            moich danych osobowych zgodnie z jej postanowieniami.
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <Button type="submit">{activeOption === types.login ? 'Zaloguj' : 'Zarejestruj'}</Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AuthForm;
