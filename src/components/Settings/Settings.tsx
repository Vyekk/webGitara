import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';

const Settings = () => {
    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsNav}>
                <div className={styles.settingsLink}>
                    <Title tag="h4">Moje konto</Title>
                </div>
                <div className={styles.settingsLink}>
                    <Title tag="h4">Ustawienia rozgrywki</Title>
                </div>
            </div>
            <div className={styles.settingsOne}>
                <Title tag="h3">Moje konto</Title>
            </div>
            <div className={styles.settingTwo}></div>
        </div>
    );
};

export { Settings };
