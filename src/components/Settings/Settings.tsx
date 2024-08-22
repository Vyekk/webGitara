import styles from 'components/Settings/Settings.module.scss';

const Settings = () => {
    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsNav}></div>
            <div className={styles.settingsOne}></div>
            <div className={styles.settingTwo}></div>
        </div>
    );
};

export { Settings };
