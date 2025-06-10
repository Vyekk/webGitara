import Button from 'components/Button/Button';
import styles from './SongsLibrary.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useEffect, useState } from 'react';
import Input from 'components/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSongs } from 'context/SongsContext';
import useRequiredUser from 'utils/useRequiredUser';
import { useAuth } from 'context/AuthContext';
import { Song } from 'types';

const SongsLibrary = () => {
    const [buttonType, setButtonType] = useState<'allSongs' | 'mySongs'>('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [isShowingFavourites, setIsShowingFavourites] = useState(false);
    const { isFavourite } = useAuth();

    const { songs } = useSongs();
    const user = useRequiredUser();
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleShowFavorites = () => {
        setIsShowingFavourites((prev) => !prev);
        if (!isShowingFavourites) {
            let newFilteredSongs: Song[] = [];
            if (buttonType === 'mySongs' && user) {
                newFilteredSongs = filteredSongs.filter((song) => {
                    return isFavourite(song.id);
                });
            } else {
                newFilteredSongs = songs.filter((song) => {
                    return isFavourite(song.id);
                });
            }
            setFilteredSongs(newFilteredSongs);
        } else {
            showSongs();
        }
    };

    const showSongs = () => {
        if (user && buttonType === 'mySongs') {
            const newFilteredSongs = songs.filter((song) => song.idUser === user.idUser);
            setFilteredSongs(newFilteredSongs);
        } else {
            setFilteredSongs(songs);
        }
    };

    useEffect(() => {
        showSongs();
    }, [buttonType]);

    return (
        <div className={styles.songsLibraryWrapper}>
            <div className={styles.playTopWrapper}>
                <div className={styles.searchWrapper}>
                    <Input id="search" onChange={handleSearch}>
                        Wyszukaj utwór
                    </Input>
                    <div
                        className={`${
                            isShowingFavourites ? styles.favourtiesIsShowing : styles.favourtiesIsNotShowing
                        } ${styles.favouriteWrapper}`}
                        onClick={handleShowFavorites}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <Button transparent isActive={buttonType === 'allSongs'} onClick={() => setButtonType('allSongs')}>
                    Wszystkie utwory
                </Button>
                <Button transparent isActive={buttonType === 'mySongs'} onClick={() => setButtonType('mySongs')}>
                    Moje utwory
                </Button>
            </div>
            <div className={styles.songsWrapper}>
                <SongsList songs={filteredSongs} searchTerm={searchTerm} isShowingFavourites={isShowingFavourites} />
            </div>
        </div>
    );
};

export default SongsLibrary;
