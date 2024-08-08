import styles from 'components/SongsList/SongsList.module.scss';
import { SongTile } from 'components/SongTile/SongTile';
import { Song } from 'types';

type SongsListProps = {
    isVertical?: boolean;
    songs: Song[];
    searchTerm?: string;
};

const SongsList = ({ isVertical, songs, searchTerm }: SongsListProps) => {
    const filteredSongs = songs.filter((song) =>
        searchTerm ? song.songTitle.toLowerCase().includes(searchTerm.toLowerCase()) : true,
    );

    return (
        <div className={isVertical ? styles.verticalList : styles.horizontalList}>
            {filteredSongs.map((song, index) => (
                <SongTile key={index} song={song} />
            ))}
        </div>
    );
};

export { SongsList };
