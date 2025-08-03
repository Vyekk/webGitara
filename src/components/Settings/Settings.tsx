import Button from 'components/Button/Button';
import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'views/PlayView/PlayView';
import { SettingsService } from 'services/SettingsService';
import { UsersService } from 'services/UsersService';
import { useAuth } from 'context/AuthContext';
import useRequiredUser from 'utils/useRequiredUser';
import ChangePasswordForm from 'components/ChangePasswordForm/ChangePasswordForm';

const Settings = () => {
    const [settingsScreen, setSettingsScreen] = useState('myAccount');
    const reverseGuitarRef = useRef<HTMLInputElement>(null);
    const setIsFretboardReversed = useContext(Context)?.setIsFretboardReversed;
    const [message, setMessage] = useState('');
    const user = useRequiredUser();
    const fretboardService = new SettingsService();
    const usersService = new UsersService();
    const { refreshUser } = useAuth();

    const handeChangeInterface = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('Ustawienia zostały zapisane.');
        fretboardService.saveIsFretboardReversed(e.currentTarget.reverseGuitar.checked);
    };

    const handleCheckReverseGuitar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (setIsFretboardReversed) {
            setIsFretboardReversed(isChecked);
        }
    };

    useEffect(() => {
        if (settingsScreen === 'playgroundSettings') {
            const isFretboardReversedUser = fretboardService.loadIsFretboardReversed();
            if (isFretboardReversedUser) {
                if (reverseGuitarRef.current) {
                    reverseGuitarRef.current.checked = isFretboardReversedUser;
                }
            }
        }
    }, [settingsScreen]);

    useEffect(() => {
        const updateStats = async () => {
            await usersService.updateUserStats(user.idUser);
        };
        updateStats();
        refreshUser();
    }, []);

    const myAccountContent = (
        <div className={styles.accountSettingsWrapper}>
            <div className={styles.settingsContentLeft}>
                <Title tag="h4">Informacje o koncie</Title>
                <ul>
                    <li>
                        Nazwa: <span className={styles.lead}>{user.username}</span>
                    </li>
                    <li>
                        Email: <span className={styles.lead}>{user.email}</span>
                    </li>
                    <li>
                        Data założenia konta:{' '}
                        <span className={styles.lead}>
                            {new Date(user.created_at).toLocaleString('pl-PL', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </span>
                    </li>
                    <li>
                        Średnia ocena twoich utworów:{' '}
                        <span className={styles.lead}>
                            {Number(user.average_published_song_rating ?? 0).toFixed(2)}
                        </span>
                    </li>
                    <li>
                        Liczba ocen twoich utworów:{' '}
                        <span className={styles.lead}>{user.number_of_ratings_received}</span>
                    </li>
                </ul>
            </div>
            <div className={styles.settingsContentRight}>
                <Title tag="h4">Zmień dane</Title>
                <ChangePasswordForm />
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
                    </div>
                    <Button type="submit">Zapisz zmiany</Button>
                    {message && <p>{message}</p>}
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
