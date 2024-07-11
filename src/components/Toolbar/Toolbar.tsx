import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import playIcon from 'assets/play-icon.png';
import settingsIcon from 'assets/settings-icon.png';

type ToolbarProps = {
    hasControls?: boolean;
    handleShowModal?: () => void;
};

const Toolbar = ({ hasControls, handleShowModal }: ToolbarProps) => {
    return (
        <div className={styles.wrapper}>
            {hasControls && <Button isDark>BPM</Button>}
            <Button className={styles.playButton} onClick={handleShowModal} circle>
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
