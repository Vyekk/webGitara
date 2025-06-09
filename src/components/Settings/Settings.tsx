import Button from 'components/Button/Button';
import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'views/PlayView/PlayView';
import storage from 'utils/storage';

const Settings = () => {
    const [settingsScreen, setSettingsScreen] = useState('myAccount');
    const reverseGuitarRef = useRef<HTMLInputElement>(null);
    const setIsFretboardReversed = useContext(Context)?.setIsFretboardReversed;

    const handeChangeInterface = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        storage.saveIsFretboardReversed(e.currentTarget.reverseGuitar.checked);
    };

    const handleCheckReverseGuitar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (setIsFretboardReversed) {
            setIsFretboardReversed(isChecked);
        }
    };
    useEffect(() => {
        if (settingsScreen === 'playgroundSettings') {
            const isFretboardReversedUser = storage.loadIsFretboardReversed();
            if (isFretboardReversedUser) {
                if (reverseGuitarRef.current) {
                    reverseGuitarRef.current.checked = isFretboardReversedUser;
                }
            }
        }
    }, [settingsScreen]);

    const myAccountContent = (
        <div className={styles.accountSettingsWrapper}>
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
                        <input className={styles.accountSettingsInput} type="password" id="oldPassword" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">Nowe hasło</label>
                        <input className={styles.accountSettingsInput} type="password" id="newPassword" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="repeatNewPassword">Powtórz nowe hasło</label>
                        <input className={styles.accountSettingsInput} type="password" id="repeatNewPassword" />
                    </div>
                    <Button>Zmień hasło</Button>
                </form>
            </div>
        </div>
    );

    const mySettingsContent = (
        <div className={styles.interfaceSettingsWrapper}>
            <Title tag="h4">Interfejs aplikacji</Title>
            <div className={styles.gameInterfaceSettingsContent}>
                <form onSubmit={handeChangeInterface}>
                    <div className={styles.formGroup}>
                        <div className={styles.formGroup}>
                            <input
                                ref={reverseGuitarRef}
                                name="reverseGuitar"
                                type="checkbox"
                                id="reverseGuitar"
                                onChange={handleCheckReverseGuitar}
                            />
                            <label htmlFor="reverseGuitar">Odwróć gitarę</label>
                        </div>
                        <div className={styles.formGroup}>
                            <input type="checkbox" id="reverseTab" />

                            <label htmlFor="reverseTab">Odwróć tabulaturę</label>
                        </div>
                    </div>
                    <Button>Zapisz zmiany</Button>
                </form>
            </div>
        </div>
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
