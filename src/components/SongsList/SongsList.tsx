import styles from 'components/SongsList/SongsList.module.scss';
import { SongTile } from 'components/SongTile/SongTile';
import { Song } from 'types';

type SongsListProps = {
    isVertical?: boolean;
    songs: Song[];
    searchTerm?: string;
};

const SongsList = ({ isVertical, songs, searchTerm }: SongsListProps) => {
    const filteredSongs = songs.filter((song) => (searchTerm ? song.songTitle.includes(searchTerm) : true));

    return (
        <div className={isVertical ? styles.verticalList : styles.horizontalList}>
            {filteredSongs.map((song, index) => (
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
