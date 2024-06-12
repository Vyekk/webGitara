import { useState } from 'react';
import Title from 'components/Title/Title';
import styles from 'components/Form/Form.module.scss';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Radio from 'components/Form/FormRadio';

const types = {
    login: 'logowanie',
    register: 'rejestracja',
};

const Form = ({ submitFn }: any) => {
    const [activeOption, setActiveOption] = useState(types.login);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = () => {
        // Tutaj powinna być logika rejestracji, ale na razie ustawiamy stan na true
        setIsRegistered(true);
    };

    return (
        <div className={styles.wrapper}>
            {isRegistered ? (
                <>
                    <p className={styles.info}>
                        Konto założone <br /> pomyślnie
                    </p>
                    <Button onClick={() => setIsRegistered(false)}>Wróć do logowania</Button>
                </>
            ) : (
                <>
                    {activeOption === types.login ? <Title>Zaloguj się</Title> : <Title>Zarejestruj się</Title>}
                    {activeOption === types.login ? <p>i kontynuuj praktykę</p> : <p>i wkrocz do świata muzyki</p>}
                    <form className={styles.form} onSubmit={activeOption == types.login ? submitFn : handleRegister}>
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
                                <Input id="login">Login</Input>
                                <Input id="password" type="password">
                                    Hasło
                                </Input>
                                {activeOption !== types.login ? (
                                    <>
                                        <Input id="rePassword" type="password">
                                            Powtórz hasło
                                        </Input>
                                        <Input id="email" type="email">
                                            E-mail
                                        </Input>
                                    </>
                                ) : null}
                            </div>
                            {activeOption !== types.login ? (
                                <div className={styles.approvalWrapper}>
                                    <div className={styles.agreement}>
                                        <input id="statute" type="checkbox" />
                                        <label htmlFor="statute">
                                            Akceptuję regulamin platformy i zobowiązuje się do jego przestrzegania
                                        </label>
                                    </div>
                                    <div className={styles.agreement}>
                                        <input id="privacyPolicy" type="checkbox" />
                                        <label htmlFor="privacyPolicy">
                                            Akceptuję politykę prywatności platformy i wyrażam zgodę na przetwarzanie
                                            moich danych osobowych zgodnie z jej postanowieniami.
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <Button type="submit" onSubmit={handleRegister}>
                            {activeOption === types.login ? 'Zaloguj' : 'Zarejestruj'}
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Form;
