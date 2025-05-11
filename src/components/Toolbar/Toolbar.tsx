import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGear } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from 'components/Modal/ModalContext';
import { ReactNode, useContext, forwardRef } from 'react';
import { MainMenu } from 'components/MainMenu/SongsLibrary';
import { Settings } from 'components/Settings/Settings';

interface ToolbarProps {
    hasControls?: boolean;
    handleShowModal?: () => void;
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({ hasControls }, ref) => {
    const { openModal, setModal } = useContext(ModalContext);

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    return (
        <div ref={ref} className={styles.wrapper}>
            {hasControls && <Button isDark>BPM</Button>}
            <Button className={styles.libraryButton} onClick={() => handleOpenModal(<MainMenu />)} circle>
                <div className={styles.libraryIcon}>
                    <FontAwesomeIcon icon={faBook} />
                </div>
            </Button>
            <Button className={styles.secondOption} href="/play/new" transparent>
                Nowy utwór
            </Button>
            <Button className={styles.secondOption} onClick={() => handleOpenModal(<Settings />)} transparent>
                <FontAwesomeIcon icon={faGear} className={styles.settingsIcon} />
            </Button>
            <Button className={styles.secondOption} href="/login" transparent>
                Wyloguj się
            </Button>
        </div>
    );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
