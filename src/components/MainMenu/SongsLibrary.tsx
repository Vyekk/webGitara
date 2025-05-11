import Button from 'components/Button/Button';
import styles from './SongsLibrary.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useEffect, useState } from 'react';
import Input from 'components/Input/Input';
import { Song } from 'types';

export const MainMenu = () => {
    const [buttonType, setButtonType] = useState('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const [songsListTest, setSongsListTest] = useState<Song[]>([]);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchSongsUserStorge = async () => {
        const songsData = localStorage.getItem('songs');
        const songs = songsData ? JSON.parse(songsData) : [];
        setSongsListTest(songs);
    };

    useEffect(() => {
        fetchSongsUserStorge();
    }, []);

    return (
        <div>
            <div className={styles.playTopWrapper}>
                <Button
                    transparent
                    isActive={buttonType === 'mySongs' ? true : false}
                    onClick={() => setButtonType('mySongs')}
                >
                    Moje utwory
                </Button>
                <Input id="search" onChange={handleSearch}>
                    Wyszukaj utwór
                </Input>
                <Button
                    transparent
                    isActive={buttonType === 'allSongs' ? true : false}
                    onClick={() => setButtonType('allSongs')}
                >
                    Wszystkie utwory
                </Button>
            </div>
            <div className={styles.songsWrapper}>
                {buttonType === 'allSongs' ? <SongsList songs={songsListTest} searchTerm={searchTerm} /> : null}
            </div>
        </div>
    );
};
