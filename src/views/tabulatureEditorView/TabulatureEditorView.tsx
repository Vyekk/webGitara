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
import GuitarChords from 'utils/guitarChords';
import { ChordPosition } from 'types';

const TabulatureEditorView = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);
    const [numberOfTabulatureLines, setNumberOfTabulatureLines] = useState(1);
    const [newSongTitle, setNewSongTitle] = useState('');
    const [selectedChord, setSelectedChord] = useState<string>('A');
    const [insertChordPositions, setInsertChordPositions] = useState<ChordPosition[]>([]);

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

    const handleInsertChord = () => {
        const selectedChordData = GuitarChords.find((chord) => chord.name === selectedChord);
        const positions = selectedChordData?.positions || [];
        setInsertChordPositions([...positions]);
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
                        <TabulatureEditor key={i} numberOfStrings={6} insertChordPositions={insertChordPositions} />
                    ))}
                    <div className={styles.buttonsWrapper}>
                        <Button type="submit">Zapisz utwór</Button>

                        <div className={styles.tabulatureEditButtonsWrapper}>
                            <select title="Wybierz akord" onChange={(e) => setSelectedChord(e.target.value)}>
                                <option value="A">A</option>
                                <option value="A#">A#</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="C#">C#</option>
                                <option value="D">D</option>
                                <option value="D#">D#</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="F#">F#</option>
                                <option value="G">G</option>
                                <option value="Am">Am</option>
                                <option value="Am#">Am#</option>
                                <option value="Bm">Bm</option>
                                <option value="Cm">Cm</option>
                                <option value="Cm#">Cm#</option>
                                <option value="Dm">Dm</option>
                                <option value="Dm#">Dm#</option>
                                <option value="Em">Em</option>
                                <option value="Fm">Fm</option>
                                <option value="Fm#">Fm#</option>
                                <option value="Gm">Gm</option>
                                <option value="Gm#">Gm#</option>
                            </select>
                            <Button type="button" onClick={handleInsertChord}>
                                Wprowadź
                            </Button>
                        </div>
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
