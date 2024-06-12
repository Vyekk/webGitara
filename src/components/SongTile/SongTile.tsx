import styles from 'components/SongTile/SongTile.module.scss';

interface SongTileProps {
    isTop: boolean;
    place: number;
}

const SongTile = ({ isTop, place }: SongTileProps) => {
    return (
        <div className={styles.songTile}>
            <div className={styles.songRating}></div>
            <div className={styles.songTitle}>Tytuł utworu</div>
            <div className={styles.songAuthor}>Autor utworu</div>
            {isTop ? <div className={styles.songTop}>{place}</div> : null}
        </div>
    );
};

export { SongTile };
