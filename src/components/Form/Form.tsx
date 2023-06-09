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

    return (
        <div className={styles.wrapper}>
            {activeOption === types.login ? <Title>Zaloguj się</Title> : <Title>Zarejestruj się</Title>}
            {activeOption === types.login ? <p>i kontynuuj praktykę</p> : <p>i wkrocz do świata muzyki</p>}
            <form className={styles.form} onSubmit={submitFn}>
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
                            <input id="statute" type="checkbox" />
                            <label htmlFor="statute">
                                Akceptuję regulamin platformy i zobowiązuje się do jego przestrzegania
                            </label>
                            <br />
                            <input id="privacyPolicy" type="checkbox" />
                            <label htmlFor="privacyPolicy">
                                Akceptuję politykę prywatności platformy i wyrażam zgodę na przetwarzanie moich danych
                                osobowych zgodnie z jej postanowieniami.
                            </label>
                        </div>
                    ) : null}
                </div>
                <Button type="submit">{activeOption === types.login ? 'Zaloguj' : 'Zarejestruj'}</Button>
            </form>
        </div>
    );
};

export default Form;
