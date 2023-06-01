import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import playIcon from 'assets/play-icon.png';
import settingsIcon from 'assets/settings-icon.png';

const Toolbar = () => {
    return (
        <div className={styles.wrapper}>
            <Button className={styles.playButton} circle>
                <img src={playIcon} alt="play" />
            </Button>
            <Button className={styles.secondOption} href="/login" transparent>
                <img className={styles.settingsIcon} src={settingsIcon} alt="settings" />
            </Button>
            <Button className={styles.secondOption} href="/login" transparent>
                Wyloguj się
            </Button>
        </div>
    );
};

export default Toolbar;
