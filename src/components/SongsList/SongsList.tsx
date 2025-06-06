import styles from 'components/SongsList/SongsList.module.scss';
import { SongTile } from 'components/SongTile/SongTile';
import { Song } from 'types';

type SongsListProps = {
    isVertical?: boolean;
    songs: Song[];
    searchTerm?: string;
    isShowingFavourites?: boolean;
};

const SongsList = ({ isVertical, songs = [], searchTerm }: SongsListProps) => {
    const filteredSongs = songs.filter((song) =>
        searchTerm ? song.songTitle.toLowerCase().includes(searchTerm.toLowerCase()) : true,
    );

    return (
        <div className={isVertical ? styles.verticalList : styles.horizontalList}>
            {filteredSongs.map((song) => (
                <SongTile key={song.songTitle + song.author} song={song} isLarge={isVertical ? true : false} />
            ))}
        </div>
    );
};

export { SongsList };
