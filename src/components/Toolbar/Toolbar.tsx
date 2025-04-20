import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGear } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from 'components/Modal/ModalContext';
import { ReactNode, useContext } from 'react';
import { MainMenu } from 'components/MainMenu/MainMenu';
import { Settings } from 'components/Settings/Settings';

type ToolbarProps = {
    hasControls?: boolean;
    handleShowModal?: () => void;
};

const Toolbar = ({ hasControls }: ToolbarProps) => {
    const { openModal, setModal } = useContext(ModalContext);

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    return (
        <div className={styles.wrapper}>
            {hasControls && <Button isDark>BPM</Button>}
            <Button className={styles.secondOption} href="../new" transparent>
                Nowy utwór
            </Button>
            <Button className={styles.libraryButton} onClick={() => handleOpenModal(<MainMenu />)} circle>
                <div className={styles.libraryIcon}>
                    <FontAwesomeIcon icon={faBook} />
                </div>
            </Button>
            <Button className={styles.secondOption} onClick={() => handleOpenModal(<Settings />)} transparent>
                <FontAwesomeIcon icon={faGear} className={styles.settingsIcon} />
            </Button>
            <Button className={styles.secondOption} href="/login" transparent>
                Wyloguj się
            </Button>
        </div>
    );
};

export default Toolbar;
