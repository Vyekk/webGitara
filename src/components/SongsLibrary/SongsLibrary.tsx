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
import Title from 'components/Title/Title';

interface SongsLibraryProps {
    isShowingDeletedSongs?: boolean;
}

const SongsLibrary = ({ isShowingDeletedSongs }: SongsLibraryProps) => {
    const [buttonType, setButtonType] = useState<'allSongs' | 'mySongs'>('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [isShowingFavourites, setIsShowingFavourites] = useState(false);
    const { isFavourite } = useAuth();

    const { songs, getDeletedSongs } = useSongs();
    const user = useRequiredUser();
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleShowFavourites = () => {
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
        if (isShowingDeletedSongs) {
            const deletedSongs = songs.filter((song) => song.deleted_by_idUser != null);
            setFilteredSongs(deletedSongs);
        } else if (user && buttonType === 'mySongs') {
            const mySongs = songs.filter((song) => song.idUser === user.idUser && song.deleted_by_idUser == null);
            setFilteredSongs(mySongs);
        } else {
            const allSongs = songs.filter((song) => song.deleted_by_idUser == null);
            setFilteredSongs(allSongs);
        }
    };

    useEffect(() => {
        if (isShowingDeletedSongs) {
            const deleted = getDeletedSongs();
            setFilteredSongs(deleted);
        } else {
            showSongs();
        }
    }, [songs, buttonType, isShowingDeletedSongs]);

    return (
        <div className={styles.songsLibraryWrapper}>
            <div className={styles.playTopWrapper}>
                <div className={styles.searchWrapper}>
                    <Input id="search" onChange={handleSearch}>
                        Wyszukaj utwór
                    </Input>
                    <div
                        className={`${
                            isShowingFavourites ? styles.favouritesIsShowing : styles.favouritesIsNotShowing
                        } ${styles.favouriteWrapper}`}
                        onClick={handleShowFavourites}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                {!isShowingDeletedSongs && (
                    <>
                        <Button
                            transparent
                            isActive={buttonType === 'allSongs'}
                            onClick={() => setButtonType('allSongs')}
                        >
                            Wszystkie utwory
                        </Button>

                        <Button
                            transparent
                            isActive={buttonType === 'mySongs'}
                            onClick={() => setButtonType('mySongs')}
                        >
                            Moje utwory
                        </Button>
                    </>
                )}
                {isShowingDeletedSongs && <Title tag="h3">Usunięte utwory</Title>}
            </div>
            <div className={styles.songsWrapper}>
                <SongsList songs={filteredSongs} searchTerm={searchTerm} isShowingFavourites={isShowingFavourites} />
            </div>
        </div>
    );
};

export default SongsLibrary;
