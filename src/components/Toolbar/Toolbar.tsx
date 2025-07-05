import Button from 'components/Button/Button';
import styles from 'components/Toolbar/Toolbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGear, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from 'components/Modal/ModalContext';
import { ReactNode, useContext, forwardRef } from 'react';
import SongsLibrary from 'components/SongsLibrary/SongsLibrary';
import { Settings } from 'components/Settings/Settings';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router';
import Users from 'components/Users/Users';
import useRequiredUser from 'utils/useRequiredUser';

interface ToolbarProps {
    hasControls?: boolean;
    handleShowModal?: () => void;
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({ hasControls }, ref) => {
    const { openModal, setModal } = useContext(ModalContext);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user = useRequiredUser();

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div ref={ref} className={styles.wrapper}>
            {hasControls && <Button isDark>BPM</Button>}
            <Button className={styles.libraryButton} onClick={() => handleOpenModal(<SongsLibrary />)} circle>
                <div className={styles.libraryIcon}>
                    <FontAwesomeIcon icon={faBook} />
                </div>
            </Button>
            <Button className={styles.secondOption} href="/play/edit" transparent>
                Nowy utwór
            </Button>
            <Button
                className={`${
                    Array.isArray(user.roles) && user.roles.includes('admin') ? styles.secondOption : styles.hidden
                }`}
                onClick={() => handleOpenModal(<Users />)}
                transparent
            >
                <FontAwesomeIcon icon={faUsers} className={styles.settingsIcon} />
            </Button>
            <Button
                className={`${
                    Array.isArray(user.roles) && (user.roles.includes('admin') || user.roles.includes('moderator'))
                        ? styles.secondOption
                        : styles.hidden
                }`}
                onClick={() => handleOpenModal(<SongsLibrary isShowingDeletedSongs />)}
                transparent
            >
                <FontAwesomeIcon icon={faTrash} className={styles.settingsIcon} />
            </Button>
            <Button className={styles.secondOption} onClick={() => handleOpenModal(<Settings />)} transparent>
                <FontAwesomeIcon icon={faGear} className={styles.settingsIcon} />
            </Button>
            <Button className={styles.secondOption} onClick={handleLogout} transparent>
                Wyloguj się
            </Button>
        </div>
    );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
