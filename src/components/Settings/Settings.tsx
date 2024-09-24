import Button from 'components/Button/Button';
import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';
import { useState } from 'react';

const Settings = () => {
    const [settingsScreen, setSettingsScreen] = useState('myAccount');

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
            <div className={styles.settingsOne}>
                <Title tag="h3">{(settingsScreen == 'myAccount' && 'Moje konto') || 'Ustawienia rozgrywki'}</Title>
            </div>
            <div className={styles.settingTwo}></div>
        </div>
    );
};

export { Settings };
