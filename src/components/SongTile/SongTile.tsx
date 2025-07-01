import { useNavigate } from 'react-router-dom';
import { CommentsSection } from 'components/CommentsSection/CommentsSection';
import { ModalContext } from 'components/Modal/ModalContext';
import { Rating } from 'components/Rating/Rating';
import styles from 'components/SongTile/SongTile.module.scss';
import Title from 'components/Title/Title';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faPenToSquare, faTrash, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSongs } from 'context/SongsContext';
import { useAuth } from 'context/AuthContext';
import useRequiredUser from 'utils/useRequiredUser';

type SongTileProps = {
    song: Song;
    isLarge?: boolean;
};

const SongTile = ({ song, isLarge }: SongTileProps) => {
    const [isHover, setIsHover] = useState(false);
    const [errorMessage, setErrorMessage] = useState<{ message: string }>({ message: '' });
    const { openModal, setModal } = useContext(ModalContext);
    const likedRef = useRef<HTMLDivElement>(null);
    const managementButtonsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const handleMouseOver = () => {
        likedRef.current?.classList.add(styles.hoverItem);
        managementButtonsRef.current?.classList.add(styles.hoverItem);
        setIsHover(true);
    };
    const { deleteSong, restoreSong } = useSongs();
    const user = useRequiredUser();
    const { toggleFavourite, isFavourite } = useAuth();
    const liked = isFavourite(song.idSong);
    const { saveLastPlayedSong } = useAuth();

    const handleMouseOut = () => {
        likedRef.current?.classList.remove(styles.hoverItem);
        managementButtonsRef.current?.classList.remove(styles.hoverItem);
        setIsHover(false);
    };

    const handleLikeClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        toggleFavourite(song.idSong);
    };
    const handleCommentsClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setModal(<CommentsSection song={song} />);
        openModal();
    };

    const handleSongTileClick = () => {
        navigate(`/play/guitar/${song.idSong}`);
        saveLastPlayedSong(song.idSong);
    };

    const handleModifyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/play/edit/${song.idSong}`);
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const canDelete = user.isAdmin || user.isModerator || user.idUser === song.idUser;

        if (!canDelete) {
            setErrorMessage({ message: 'Nie masz uprawnień do usunięcia tego utworu.' });
            return;
        }

        deleteSong(song.idSong);
    };

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    useEffect(() => {
        if (errorMessage.message) {
            handleOpenModal(<div className={styles.errorMessage}>{errorMessage.message}</div>);
        }
    }, [errorMessage]);

    return (
        <div
            className={`${styles.songTile} ${isLarge ? styles.isLarge : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => handleSongTileClick()}
        >
            <div
                className={`${liked ? styles.liked : styles.unliked} ${styles.favouriteWrapper}`}
                ref={likedRef}
                onClick={handleLikeClick}
            >
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={styles.managementButtons} ref={managementButtonsRef}>
                <div
                    className={`${!song.deleted_by_idUser ? styles.comments : styles.hidden}`}
                    onClick={handleCommentsClick}
                >
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div
                    className={`${
                        (user.isAdmin || user.isModerator || user.idUser == song.idUser) && !song.deleted_by_idUser
                            ? styles.show
                            : ''
                    } ${!song.deleted_by_idUser ? styles.songManageButtonsWrapper : styles.hidden} `}
                >
                    <div className={styles.modify} onClick={handleModifyClick}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div className={styles.delete} onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                {(user.isAdmin || user.isModerator) && !!song.deleted_by_idUser ? (
                    <div className={styles.delete} onClick={() => restoreSong(song.idSong)}>
                        <FontAwesomeIcon icon={faTrashCanArrowUp} />
                    </div>
                ) : null}
            </div>
            <Rating song={song} isHover={isHover} />
            <div className={styles.textWrapper}>
                <Title tag="h3">{song.songTitle}</Title>
                <div className={styles.songAuthor}>{song.author}</div>
            </div>
            {song.place === 1 && <div className={`${styles.songTop} ${styles.songTopGold}`}>{song.place}</div>}
            {song.place === 2 && <div className={`${styles.songTop} ${styles.songTopSilver}`}>{song.place}</div>}
            {song.place === 3 && <div className={`${styles.songTop} ${styles.songTopBronze}`}>{song.place}</div>}
        </div>
    );
};

export { SongTile };
