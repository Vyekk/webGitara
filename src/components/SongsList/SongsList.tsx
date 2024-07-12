import styles from 'components/SongsList/SongsList.module.scss';
import { SongTile } from 'components/SongTile/SongTile';
import { Song } from 'types';

type SongsListProps = {
    isVertical?: boolean;
    songs: Song[];
};

const SongsList = ({ isVertical, songs }: SongsListProps) => {
    return (
        <div className={isVertical ? styles.verticalList : styles.horizontalList}>
            {songs.map((song, index) => (
                <SongTile
                    key={index}
                    songTitle={song.songTitle}
                    author={song.author}
                    rating={song.rating}
                    place={song.place}
                    liked={song.liked}
                />
            ))}
        </div>
    );
};

export { SongsList };
