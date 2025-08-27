import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import styles from './PasswordResetView.module.scss';
import Logo from 'components/Logo/Logo';
import Section from 'components/Section/Section';

const PasswordResetView = () => {
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token && step !== 'reset') setStep('reset');

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setInfo(null);
        try {
            const res = await axios.post('/api/users/request-password-reset', { email });
            setInfo(res.data.message || 'Jeśli konto istnieje, wysłano link do resetu hasła.');
        } catch (err) {
            setError('Błąd wysyłania maila.');
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setInfo(null);
        if (newPassword.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
            return;
        }
        if (newPassword !== repeatPassword) {
            setError('Hasła nie są takie same.');
            return;
        }
        try {
            const res = await axios.post('/api/users/reset-password', { token, newPassword });
            setInfo('Hasło zostało zmienione. Możesz się zalogować.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Błąd resetowania hasła.');
            }
        }
    };

    return (
        <div className={styles.passwordResetViewWrapper}>
            <div className={styles.wrapper}>
                <Section dark>
                    <Logo />
                    <div className={styles.container}>
                        <h2 className={styles.title}>Resetowanie hasła</h2>
                        {step === 'email' && !token && (
                            <form onSubmit={handleSendEmail} className={styles.form}>
                                <p className={styles.description}>
                                    Podaj e-mail powiązany z kontem, aby otrzymać link do resetu hasła.
                                </p>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                >
                                    E-mail
                                </Input>
                                <Button type="submit" className={styles.button}>
                                    Wyślij link resetujący
                                </Button>
                                {error && <div className={styles.error}>{error}</div>}
                                {info && <div className={styles.info}>{info}</div>}
                            </form>
                        )}
                        {((step === 'reset' && token) || (token && step !== 'email')) && (
                            <form onSubmit={handleResetPassword} className={styles.form}>
                                <p className={styles.description}>Wprowadź nowe hasło i potwierdź je poniżej.</p>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                >
                                    Nowe hasło
                                </Input>
                                <Input
                                    id="repeatPassword"
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    required
                                >
                                    Powtórz nowe hasło
                                </Input>
                                <Button type="submit" className={styles.button}>
                                    Zmień hasło
                                </Button>
                                {error && <div className={styles.error}>{error}</div>}
                                {info && <div className={styles.info}>{info}</div>}
                            </form>
                        )}
                        <hr className={styles.divider} />
                        <div className={styles.footer}>
                            <Link to="/" className={styles.link}>
                                Wróć do strony głównej
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default PasswordResetView;
