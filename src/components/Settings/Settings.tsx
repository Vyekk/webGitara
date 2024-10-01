import Button from 'components/Button/Button';
import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';
import { useState } from 'react';

const Settings = () => {
    const [settingsScreen, setSettingsScreen] = useState('myAccount');

    const myAccountContent = (
        <>
            <div className={styles.settingsContentLeft}>
                <Title tag="h4">Informacje o koncie</Title>
                <ul>
                    <li>
                        Nazwa: <span className={styles.lead}>Nazwa użytkownika</span>
                    </li>
                    <li>
                        Email: <span className={styles.lead}>adres@email.com</span>
                    </li>
                    <li>
                        Data załozenia konta: <span className={styles.lead}>19.11.2023</span>
                    </li>
                    <li>
                        Średnia ocena twoich utworów: <span className={styles.lead}>4.33</span>
                    </li>
                    <li>
                        Liczba ocen twoich utworów: <span className={styles.lead}>233</span>
                    </li>
                </ul>
            </div>
            <div className={styles.settingsContentRight}>
                <Title tag="h4">Zmień dane</Title>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="oldPassword">Stare hasło</label>
                        <input type="password" id="oldPassword" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">Nowe hasło</label>
                        <input type="password" id="newPassword" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="repeatNewPassword">Powtórz nowe hasło</label>
                        <input type="password" id="repeatNewPassword" />
                    </div>
                    <Button>Zmień hasło</Button>
                </form>
            </div>
        </>
    );

    const mySettingsContent = (
        <>
            <Title tag="h3">Ustawienia rozgrywki</Title>
            <div></div>
        </>
    );

    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsNav}>
                <div className={styles.settingsLink}>
                    <Button
                        transparent
                        isActive={settingsScreen === 'myAccount' ? true : false}
                        onClick={() => {
                            setSettingsScreen('myAccount');
                        }}
                    >
                        Moje konto
                    </Button>
                </div>
                <div className={styles.settingsLink}>
                    <Button
                        transparent
                        isActive={settingsScreen === 'playgroundSettings' ? true : false}
                        onClick={() => {
                            setSettingsScreen('playgroundSettings');
                        }}
                    >
                        Ustawienia rozgrywki
                    </Button>
                </div>
            </div>
            <div className={styles.settingsContent}>
                {settingsScreen === 'myAccount' ? myAccountContent : mySettingsContent}
            </div>
        </div>
    );
};

export { Settings };
