import { useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import TabulatureEditor from 'components/TabulatureEditor/TabulatureEditor';
import Title from 'components/Title/Title';
import styles from 'views/TabulatureEditorView/TabulatureEditorView.module.scss';
import { useEffect, useState } from 'react';
import { Song } from 'types';
import { loadSongs } from 'utils/storage';
import { Link } from 'react-router-dom';

const TabulatureEditorView = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);
    const [numberOfTabulatureLines, setNumberOfTabulatureLines] = useState(1);
    const [newSongTitle, setNewSongTitle] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        setupSong();
    }, [id]);

    useEffect(() => {
        if (!song) return;
        console.log('Song:', song);
    }, [song]);

    const setupSong = () => {
        const fetchSong = async () => {
            const songs = await loadSongs();
            const song = songs.find((song: Song) => song.id === Number(id));
            if (!song) {
                console.error('Song not found');
                return;
            }
            setSong(song);
        };
        fetchSong();
    };

    const handleAddLine = () => {
        setNumberOfTabulatureLines((prev) => prev + 1);
    };

    const handleRemoveLine = () => {
        if (numberOfTabulatureLines > 1) {
            setNumberOfTabulatureLines((prev) => prev - 1);
        }
    };
    return (
        <div className={styles.tabulatureEditorViewWrapper}>
            <div className={styles.textContentWrapper}>
                <div className={styles.linkWrapper}>
                    <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
                </div>
                <Title>Edycja utworu {song ? `"${song.songTitle}"` : ''}</Title>
                <form>
                    <Input
                        id="songName"
                        value={song ? song.songTitle : newSongTitle}
                        onChange={(e) => setNewSongTitle(e.target.value)}
                    >
                        Nazwa utworu
                    </Input>
                    <Input id="authorName" readOnly>
                        {song ? song.author : 'Autor'}
                    </Input>
                    {Array.from({ length: numberOfTabulatureLines }, (_, i) => (
                        <TabulatureEditor key={i} numberOfStrings={6} />
                    ))}
                    <div className={styles.buttonsWrapper}>
                        <Button type="submit">Zapisz utwór</Button>
                        <div className={styles.tabulatureEditButtonsWrapper}>
                            {numberOfTabulatureLines > 1 && (
                                <Button type="button" onClick={handleRemoveLine}>
                                    Usuń linie
                                </Button>
                            )}
                            <Button type="button" onClick={handleAddLine}>
                                Dodaj linie
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { TabulatureEditorView };
