import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import playIcon from 'assets/play-icon.png';
import settingsIcon from 'assets/settings-icon.png';
import { ModalContext } from 'components/Modal/ModalContext';
import { useContext } from 'react';
import { MainMenu } from 'components/MainMenu/MainMenu';

type ToolbarProps = {
    hasControls?: boolean;
    handleShowModal?: () => void;
};

const Toolbar = ({ hasControls }: ToolbarProps) => {
    const { openModal, setModal } = useContext(ModalContext);

    const handlePlayButtonClick = () => {
        const content = <MainMenu />;
        setModal(content);
        openModal();
    };
    const handleSettingsButtonClick = () => {
        const content = <div>Settings</div>;
        setModal(content);
        openModal();
    };
    return (
        <div className={styles.wrapper}>
            {hasControls && <Button isDark>BPM</Button>}
            <Button className={styles.secondOption} href="../new" transparent>
                Nowy utwór
            </Button>
            <Button className={styles.playButton} onClick={handlePlayButtonClick} circle>
                <img src={playIcon} alt="play" />
            </Button>
            <Button className={styles.secondOption} onClick={handleSettingsButtonClick} transparent>
                <img className={styles.settingsIcon} src={settingsIcon} alt="settings" />
            </Button>
            <Button className={styles.secondOption} href="/login" transparent>
                Wyloguj się
            </Button>
        </div>
    );
};

export default Toolbar;
