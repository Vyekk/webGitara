import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import playIcon from 'assets/play-icon.png';
import settingsIcon from 'assets/settings-icon.png';
import { ModalContext } from 'components/Modal/ModalContext';
import { useContext } from 'react';
import { SongsList } from 'components/SongsList/SongsList';

type ToolbarProps = {
    hasControls?: boolean;
    handleShowModal?: () => void;
};

const Toolbar = ({ hasControls }: ToolbarProps) => {
    const { openModal, setModal } = useContext(ModalContext);

    const songsListTest = [
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
    ];
    const handlePlayButtonClick = () => {
        const changeContent = (buttonType: string) => {
            const modalContent = (
                <div>
                    <div className={styles.playTopWrapper}>
                        <Button transparent onClick={() => changeContent('mySongs')}>
                            Moje utwory
                        </Button>
                        <Button transparent onClick={() => changeContent('allSongs')}>
                            Wszystkie utwory
                        </Button>
                    </div>
                    <div className={styles.songsWrapper}>
                        {buttonType === 'allSongs' ? <SongsList songs={songsListTest} /> : null}
                    </div>
                </div>
            );

            setModal(modalContent);
        };

        changeContent('allSongs');
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
