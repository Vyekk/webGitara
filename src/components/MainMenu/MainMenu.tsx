import Button from 'components/Button/Button';
import styles from './MainMenu.module.scss';
import { SongsList } from 'components/SongsList/SongsList';
import { useState } from 'react';

export const MainMenu = () => {
    const [buttonType, setButtonType] = useState('allSongs');
    const songsListTest = [
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
        { songTitle: 'Hey Jude', author: 'The Beatles', rating: [1, 2, 3, 4, 5, 4, 5, 5], place: 4 },
        { songTitle: 'Stairway to Heaven', author: 'Led Zeppelin', rating: [1, 1, 2, 2, 2, 5], place: 6 },
        { songTitle: 'Hotel California', author: 'Eagles', rating: [4, 4, 5, 5, 5], place: 9, liked: true },
    ];

    return (
        <div>
            <div className={styles.playTopWrapper}>
                <Button transparent onClick={() => setButtonType('mySongs')}>
                    Moje utwory
                </Button>
                <Button transparent onClick={() => setButtonType('allSongs')}>
                    Wszystkie utwory
                </Button>
            </div>
            <div className={styles.songsWrapper}>
                {buttonType === 'allSongs' ? <SongsList songs={songsListTest} /> : null}
            </div>
        </div>
    );
};
