import Button from 'components/Button/Button';
import styles from './MainMenu.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useState } from 'react';
import Input from 'components/Input/Input';

export const MainMenu = () => {
    const [buttonType, setButtonType] = useState('allSongs');
    const [searchTerm, setSearchTerm] = useState('');
    const songsListTest = [
        { id: 1, songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { id: 2, songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { id: 3, songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { id: 4, songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { id: 5, songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { id: 6, songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { id: 7, songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { id: 8, songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { id: 9, songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { id: 10, songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { id: 11, songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        {
            id: 12,
            songTitle: 'Hotel Californiaa',
            author: 'Eagles',
            rating: [4, 4, 5, 5, 5],
            place: 9,
            liked: true,
            comments: [
                ['Great song!', 'Johnny'],
                ['I love it!', 'Maggie'],
            ],
        },
    ];
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                {buttonType === 'allSongs' && (
                    <Input id="search" onChange={handleSearch}>
                        Wyszukaj utwór
                    </Input>
                )}
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
