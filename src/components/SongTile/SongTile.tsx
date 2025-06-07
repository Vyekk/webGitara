import { useNavigate } from 'react-router-dom';
import { CommentsSection } from 'components/CommentsSection/CommentsSection';
import { ModalContext } from 'components/Modal/ModalContext';
import { Rating } from 'components/Rating/Rating';
import styles from 'components/SongTile/SongTile.module.scss';
import Title from 'components/Title/Title';
import { useContext, useRef, useState } from 'react';
import { Song } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSongs } from 'context/SongsContext';

type SongTileProps = {
    song: Song;
    isLarge?: boolean;
};

const SongTile = ({ song, isLarge }: SongTileProps) => {
    const [songLiked, setSongLiked] = useState(song.liked);
    const [isHover, setIsHover] = useState(false);
    const { openModal, setModal } = useContext(ModalContext);
    const likedRef = useRef<HTMLDivElement>(null);
    const managementButtonsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const handleMouseOver = () => {
        likedRef.current?.classList.add(styles.hoverItem);
        managementButtonsRef.current?.classList.add(styles.hoverItem);
        setIsHover(true);
    };
    const { deleteSong } = useSongs();

    const handleMouseOut = () => {
        likedRef.current?.classList.remove(styles.hoverItem);
        managementButtonsRef.current?.classList.remove(styles.hoverItem);
        setIsHover(false);
    };

    const handleLikeClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setSongLiked((prevState) => !prevState);
    };
    const handleCommentsClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setModal(<CommentsSection song={song} />);
        openModal();
    };

    const handleSongTileClick = () => {
        navigate(`/play/guitar/${song.id}`);
    };

    const handleModifyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/play/edit/${song.id}`);
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        deleteSong(song.id);
    };

    return (
        <div
            className={`${styles.songTile} ${isLarge ? styles.isLarge : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => handleSongTileClick()}
        >
            <div
                className={`${songLiked ? styles.liked : styles.unliked} ${styles.favouriteWrapper}`}
                ref={likedRef}
                onClick={handleLikeClick}
            >
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={styles.managementButtons} ref={managementButtonsRef}>
                <div className={styles.comments} onClick={handleCommentsClick}>
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div className={styles.modify} onClick={handleModifyClick}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div className={styles.delete} onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
            <Rating rating={song.rating} isHover={isHover} />
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
