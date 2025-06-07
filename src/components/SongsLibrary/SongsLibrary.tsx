import Button from 'components/Button/Button';
import styles from './SongsLibrary.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useState } from 'react';
import Input from 'components/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSongs } from 'context/SongsContext';

const SongsLibrary = () => {
    const [buttonType, setButtonType] = useState<'allSongs' | 'mySongs'>('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const [isShowingFavourites, setIsShowingFavourites] = useState(false);

    const { songs } = useSongs();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleShowFavorites = () => {
        setIsShowingFavourites((prev) => !prev);
    };

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
                {buttonType === 'allSongs' ? (
                    <SongsList songs={songs} searchTerm={searchTerm} isShowingFavourites={isShowingFavourites} />
                ) : (
                    <SongsList songs={[]} searchTerm={searchTerm} />
                )}
            </div>
        </div>
    );
};

export default SongsLibrary;
