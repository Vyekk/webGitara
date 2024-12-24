import Title from 'components/Title/Title';
import Toolbar from 'components/Toolbar/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Slider from 'components/Slider/Slider';
import { Link } from 'react-router-dom';

const GuitarView = () => {
    const songsData = localStorage.getItem('songs');
    const songs = songsData ? JSON.parse(songsData) : [];
    const [song, setSong] = useState<Song>(songs[0]);
    const fretboardRef = useRef<HTMLDivElement | null>(null);
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setupSong();
    }, [currentUrl]);

    useEffect(() => {
        setCurrentUrl(location.pathname);
    }, [location]);

    const setupSong = () => {
        const fetchSong = async () => {
            const songId = currentUrl.split('/').pop();
            const song = songs.find((song: Song) => song.id === Number(songId));
            if (!song) {
                navigate('/play/guitar/1');
                return;
            }
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
            <div className={styles.linkWrapper}>
                <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
            </div>
            <div className={styles.wrapper}>
                <Title>{`${song?.songTitle} - ${song?.author}`}</Title>
            </div>
            <Toolbar />
            <div className={styles.fretboard} ref={fretboardRef}></div>
            <Slider max={song.tabulature.length} />
            <div className={styles.songControl}>
                <Button className={styles.goBackButton} transparent title="Cofnij"></Button>
                <Button className={styles.playButton} transparent title="Odtwórz"></Button>
                <Button className={styles.stopButton} transparent title="Stop"></Button>
                <Button className={styles.forwardButton} transparent title="Naprzód"></Button>
            </div>
        </div>
    );
};
export { GuitarView };
