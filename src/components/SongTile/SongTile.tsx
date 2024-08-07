import { CommentsSection } from 'components/CommentsSection/CommentsSection';
import { ModalContext } from 'components/Modal/ModalContext';
import { Rating } from 'components/Rating/Rating';
import styles from 'components/SongTile/SongTile.module.scss';
import Title from 'components/Title/Title';
import { useContext, useRef, useState } from 'react';

interface Song {
    songTitle: string;
    author: string;
    place?: number;
    rating?: number[];
    liked?: boolean;
    comments?: string[][];
}

interface SongTileProps {
    song: Song;
}

const SongTile = ({ song }: SongTileProps) => {
    const [songLiked, setSongLiked] = useState(song.liked);
    const [isHover, setIsHover] = useState(false);
    const { openModal, setModal } = useContext(ModalContext);
    const likedRef = useRef<HTMLDivElement>(null);
    const commentsRef = useRef<HTMLDivElement>(null);
    const handleMouseOver = () => {
        likedRef.current?.classList.add(styles.hoverItem);
        commentsRef.current?.classList.add(styles.hoverItem);
        setIsHover(true);
    };

    const handleMouseOut = () => {
        likedRef.current?.classList.remove(styles.hoverItem);
        commentsRef.current?.classList.remove(styles.hoverItem);
        setIsHover(false);
    };

    const handleLikeClick = () => {
        setSongLiked((prevState) => !prevState);
    };
    const handleCommentsClick = () => {
        setModal(<CommentsSection author={song.author} songTitle={song.songTitle} comments={song.comments} />);
        openModal();
    };

    return (
        <div className={styles.songTile} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={songLiked ? styles.liked : styles.unliked} ref={likedRef} onClick={handleLikeClick}></div>
            <div
                className={song.comments ? styles.comments : styles.noComments}
                ref={commentsRef}
                onClick={handleCommentsClick}
            ></div>
            <Rating rating={song.rating} isHover={isHover} />
            <Title tag="h3">{song.songTitle}</Title>
            <div className={styles.songAuthor}>{song.author}</div>
            {song.place === 1 && <div className={`${styles.songTop} ${styles.songTopGold}`}>{song.place}</div>}
            {song.place === 2 && <div className={`${styles.songTop} ${styles.songTopSilver}`}>{song.place}</div>}
            {song.place === 3 && <div className={`${styles.songTop} ${styles.songTopBronze}`}>{song.place}</div>}
        </div>
    );
};

export { SongTile };
