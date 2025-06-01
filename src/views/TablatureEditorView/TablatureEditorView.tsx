import { useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import TablatureEditor from 'components/TablatureEditor/TablatureEditor';
import Title from 'components/Title/Title';
import styles from 'views/TablatureEditorView/TablatureEditorView.module.scss';
import { useEffect, useState } from 'react';
import { Song } from 'types';
import { loadSongs } from 'utils/storage';
import { Link } from 'react-router-dom';
import GuitarChords from 'utils/guitarChords';
import { ChordPosition } from 'types';
import { TablatureActiveLineColumn } from 'types';

const TablatureEditorView = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);
    const [numberOfTablatureLines, setNumberOfTablatureLines] = useState(1);
    const [newSongTitle, setNewSongTitle] = useState('');
    const [newSongBpm, setNewSongBpm] = useState(120);
    const [selectedChord, setSelectedChord] = useState<string>('A');
    const [insertChordPositions, setInsertChordPositions] = useState<ChordPosition[]>([]);
    const [activeColumn, setActiveColumn] = useState<TablatureActiveLineColumn | null>(null);

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
        setNumberOfTablatureLines((prev) => prev + 1);
    };

    const handleRemoveLine = () => {
        if (numberOfTablatureLines > 1) {
            setNumberOfTablatureLines((prev) => prev - 1);
        }
    };

    const handleInsertChord = () => {
        const selectedChordData = GuitarChords.find((chord) => chord.name === selectedChord);
        const positions = selectedChordData?.positions || [];
        setInsertChordPositions([...positions]);
    };

    const handleClearTabColumn = () => {
        setInsertChordPositions([]);
    };

    const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const bpmValue = parseInt(value, 10);
        if (!isNaN(bpmValue) && bpmValue >= 30 && bpmValue <= 300) {
            setNewSongBpm(bpmValue);
        }
    };

    const handleInsertBarline = () => {
        const barline = GuitarChords.find((chord) => chord.name === 'barline');
        const positions = barline?.positions || [];
        setInsertChordPositions([...positions]);
    };

    return (
        <div className={styles.tablatureEditorViewWrapper}>
            <div className={styles.textContentWrapper}>
                <div className={styles.linkWrapper}>
                    <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
                </div>
                <Title>Edycja utworu {song ? `"${song.songTitle}"` : ''}</Title>
                <form>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="songName">Nazwa utworu</label>
                            <Input
                                id="songName"
                                maxLength={40}
                                value={song ? song.songTitle : newSongTitle}
                                onChange={(e) => setNewSongTitle(e.target.value)}
                            >
                                Wprowadź nazwę
                            </Input>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="authorName">Autor</label>
                            <Input id="authorName" readOnly>
                                {song ? song.author : 'Autor'}
                            </Input>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="songName">Bpmn</label>
                            <Input
                                id="description"
                                type="number"
                                min={30}
                                max={300}
                                value={song ? song.bpm : newSongBpm}
                                onChange={handleBpmChange}
                            />
                        </div>
                    </div>
                    {Array.from({ length: numberOfTablatureLines }, (_, i) => (
                        <TablatureEditor
                            key={i}
                            numberOfStrings={6}
                            insertChordPositions={insertChordPositions}
                            activeColumn={activeColumn}
                            setActiveColumn={setActiveColumn}
                            tablatureLineIndex={i + 1}
                        />
                    ))}
                    <div className={styles.buttonsWrapper}>
                        <Button type="submit">Zapisz utwór</Button>

                        <div className={styles.tablatureEditButtonsWrapper}>
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
                            <Button type="button" onClick={handleClearTabColumn}>
                                X
                            </Button>
                            <Button type="button" onClick={handleInsertBarline}>
                                |
                            </Button>
                        </div>
                        <div className={styles.tablatureEditButtonsWrapper}>
                            {numberOfTablatureLines > 1 && (
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

export { TablatureEditorView };
