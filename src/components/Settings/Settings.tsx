import styles from 'components/Settings/Settings.module.scss';
import Title from 'components/Title/Title';

const Settings = () => {
    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsNav}>
                <div>
                    <Title>Moje konto</Title>
                </div>
                <div>
                    <Title>Ustawienia rozgrywki</Title>
                </div>
            </div>
            <div className={styles.settingsOne}>
                <Title>Moje konto</Title>
            </div>
            <div className={styles.settingTwo}></div>
        </div>
    );
};

export { Settings };
