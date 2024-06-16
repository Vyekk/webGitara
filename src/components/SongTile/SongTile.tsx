import { Rating } from 'components/Rating/Rating';
import styles from 'components/SongTile/SongTile.module.scss';
import Title from 'components/Title/Title';

interface SongTileProps {
    songTitle: string;
    author: string;
    place?: number;
    rating?: number;
}

const SongTile = ({ songTitle, author, rating, place }: SongTileProps) => {
    return (
        <div className={styles.songTile}>
            <Rating rating={rating} />
            <Title tag="h3">{songTitle}</Title>
            <div className={styles.songAuthor}>{author}</div>
            {place === 1 && <div className={`${styles.songTop} ${styles.songTopGold}`}>{place}</div>}
            {place === 2 && <div className={`${styles.songTop} ${styles.songTopSilver}`}>{place}</div>}
            {place === 3 && <div className={`${styles.songTop} ${styles.songTopBronze}`}>{place}</div>}
        </div>
    );
};

export { SongTile };
