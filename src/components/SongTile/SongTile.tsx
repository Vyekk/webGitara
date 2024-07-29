import { Rating } from 'components/Rating/Rating';
import styles from 'components/SongTile/SongTile.module.scss';
import Title from 'components/Title/Title';
import { useRef, useState } from 'react';

interface SongTileProps {
    songTitle: string;
    author: string;
    place?: number;
    rating?: number[];
    liked?: boolean;
    comments?: string[][];
}

const SongTile = ({ songTitle, author, rating, place, liked, comments }: SongTileProps) => {
    const [songLiked, setSongLiked] = useState(liked);
    const [isHover, setIsHover] = useState(false);
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
        console.log('Comments:', comments);
    };

    return (
        <div className={styles.songTile} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={songLiked ? styles.liked : styles.unliked} ref={likedRef} onClick={handleLikeClick}></div>
            <div
                className={comments ? styles.comments : styles.noComments}
                ref={commentsRef}
                onClick={handleCommentsClick}
            ></div>
            <Rating rating={rating} isHover={isHover} />
            <Title tag="h3">{songTitle}</Title>
            <div className={styles.songAuthor}>{author}</div>
            {place === 1 && <div className={`${styles.songTop} ${styles.songTopGold}`}>{place}</div>}
            {place === 2 && <div className={`${styles.songTop} ${styles.songTopSilver}`}>{place}</div>}
            {place === 3 && <div className={`${styles.songTop} ${styles.songTopBronze}`}>{place}</div>}
        </div>
    );
};

export { SongTile };
