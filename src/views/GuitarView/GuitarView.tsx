import Title from 'components/Title/Title';
import Toolbar from 'components/Toolbar/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation } from 'react-router-dom';

const GuitarView = () => {
    const [song, setSong] = useState<Song | null>(null);
    const fretboardRef = useRef<HTMLDivElement | null>(null);
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const location = useLocation();

    useEffect(() => {
        setupSong();
    }, [currentUrl]);

    useEffect(() => {
        setCurrentUrl(location.pathname);
    }, [location]);

    const setupSong = () => {
        // Pobierz utwór z localStorage async
        const fetchSong = async () => {
            const songsData = localStorage.getItem('songs');
            const songs = songsData ? JSON.parse(songsData) : [];
            const songId = currentUrl.split('/').pop();
            const song = songs.find((song: Song) => song.id === Number(songId));
            setSong(song);
        };
        fetchSong();
        setupFretboard();
    };

    const setupFretboard = () => {
        const fretboard = fretboardRef.current;
        if (!fretboard) {
            return; // Wyjdź jeśli fretboard nie jest dostępny
        }
        fretboard.innerHTML = '';
        const numberOfStrings = 6;
        const numberOfFrets = 12;
        // Dodaj struny do fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            const string = document.createElement('div');
            string.classList.add(styles.string);
            fretboard.appendChild(string);

            // Stwórz progi
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                const noteFret = document.createElement('div');
                noteFret.classList.add(styles.noteFret);
                string.appendChild(noteFret);
            }
        }
    };

    return (
        <div>
            <div className={styles.wrapper}>
                <Title>{`${song?.songTitle} - ${song?.author}`}</Title>
            </div>
            <Toolbar />
            <div className={styles.fretboard} ref={fretboardRef}></div>
        </div>
    );
};
export { GuitarView };
