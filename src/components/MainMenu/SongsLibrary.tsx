import Button from 'components/Button/Button';
import styles from './SongsLibrary.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useEffect, useState } from 'react';
import Input from 'components/Input/Input';
import { Song } from 'types';
import { loadSongs } from 'utils/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const MainMenu = () => {
    const [buttonType, setButtonType] = useState('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const [songsList, setSongsList] = useState<Song[]>([]);
    const [isShowingFavourites, setIsShowingFavourites] = useState(false);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchSongsUserStorge = async () => {
        const songs = await loadSongs();
        setSongsList(songs);
    };

    const handleShowFavorites = () => {
        if (isShowingFavourites) {
            setIsShowingFavourites(false);
        } else {
            setIsShowingFavourites(true);
        }
    };

    useEffect(() => {
        fetchSongsUserStorge();
    }, []);

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
                <Button
                    transparent
                    isActive={buttonType === 'allSongs' ? true : false}
                    onClick={() => setButtonType('allSongs')}
                >
                    Wszystkie utwory
                </Button>
                <Button
                    transparent
                    isActive={buttonType === 'mySongs' ? true : false}
                    onClick={() => setButtonType('mySongs')}
                >
                    Moje utwory
                </Button>
            </div>
            <div className={styles.songsWrapper}>
                {buttonType === 'allSongs' ? (
                    <SongsList songs={songsList} searchTerm={searchTerm} isShowingFavourites />
                ) : (
                    <SongsList songs={[]} searchTerm={searchTerm} />
                )}
            </div>
        </div>
    );
};
