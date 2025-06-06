import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import TablatureEditor from 'components/TablatureEditor/TablatureEditor';
import Title from 'components/Title/Title';
import styles from 'views/TablatureEditorView/TablatureEditorView.module.scss';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Song } from 'types';
import { loadSongs } from 'utils/storage';
import { Link } from 'react-router-dom';
import GuitarChords from 'utils/guitarChords';
import { ChordPosition } from 'types';
import { TablatureActiveLineColumn } from 'types';
import { convertFormDataToTablature } from 'utils/tablatureConverters';
import { addSong } from 'utils/storage';
import { ModalContext } from 'components/Modal/ModalContext';
import { convertTablatureToFormData } from 'utils/tablatureConverters';
import { v4 as uuidv4 } from 'uuid';

const TablatureEditorView = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);
    const [numberOfTablatureLines, setNumberOfTablatureLines] = useState(1);
    const [newSongTitle, setNewSongTitle] = useState('');
    const [newSongBpm, setNewSongBpm] = useState(120);
    const [selectedChord, setSelectedChord] = useState<string>('A');
    const [insertChordPositions, setInsertChordPositions] = useState<ChordPosition[]>([]);
    const [activeColumn, setActiveColumn] = useState<TablatureActiveLineColumn | null>(null);
    const [duration, setDuration] = useState('♩');
    const [insertColumnDuration, setInsertColumnDuration] = useState<{ value: string }>({
        value: '♩',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);
    const [fullFormData, setFullFormData] = useState<Record<string, string>>({});
    const [fullFormDataDuration, setFullFormDataDuration] = useState<Record<string, string>>({});
    const navigate = useNavigate();
    const { openModal, setModal } = useContext(ModalContext);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formDataDuration, setFormDataDuration] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!id) {
            return;
        }
        setupSong();
    }, [id]);

    useEffect(() => {
        if (!song) return;
        const { formData: convertedFormData, formDataDuration: convertedFormDataDuration } = convertTablatureToFormData(
            song.tablature,
        );
        const numberOfLines = Math.ceil(song.tablature.length / 50);
        setNumberOfTablatureLines(numberOfLines);
        setFormData(convertedFormData);
        setFormDataDuration(convertedFormDataDuration);
    }, [song]);

    useEffect(() => {
        if (errorMessage) {
            handleOpenModal(<div className={styles.errorMessage}>{errorMessage}</div>);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (infoMessage) {
            handleOpenModal(<div className={styles.infoMessage}>{infoMessage}</div>);
        }
    }, [infoMessage]);

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    const setupSong = () => {
        const fetchSong = async () => {
            const songs = await loadSongs();
            const song = songs.find((song: Song) => song.id === id);
            if (!song) {
                navigate(`/play/edit/`);
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
        setInsertColumnDuration({ value: '' });
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

    const handleSetDuration = () => {
        setInsertColumnDuration({ value: duration });
    };

    const handleSaveSong = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        if (!newSongTitle.trim()) {
            setTimeout(() => {
                setErrorMessage('Proszę podać nazwę utworu');
            }, 0);
            return;
        }

        const tablature = convertFormDataToTablature(fullFormData, fullFormDataDuration);
        const hasNotes = tablature.some((step) => step.length > 0);
        if (!hasNotes || tablature.length < 5) {
            setTimeout(() => {
                setErrorMessage('Tablatura nie może być pusta lub zawierać mniej niż 5 dźwięków');
            }, 0);
            return;
        }

        const newSong: Song = {
            id: uuidv4(),
            songTitle: newSongTitle,
            author: 'Autor',
            bpm: newSongBpm,
            tablature,
            rating: [],
            place: 0,
        };
        await addSong(newSong);
        setTimeout(() => {
            setInfoMessage(`Pomyślnie ${song ? 'zmodyfikowano' : 'stworzono'} utwór`);
        }, 0);
        console.log(formData);
    };

    const handleTablatureDataChange = (lineData: Record<string, string>) => {
        setFullFormData((prev) => ({
            ...prev,
            ...lineData,
        }));
    };

    const handleDurationDataChange = (lineDurationData: Record<string, string>) => {
        setFullFormDataDuration((prev) => ({
            ...prev,
            ...lineDurationData,
        }));
    };

    return (
        <div className={styles.tablatureEditorViewWrapper}>
            <div className={styles.textContentWrapper}>
                <div className={styles.linkWrapper}>
                    <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
                </div>
                <Title>
                    {`${!song ? 'Tworzenie utworu' : 'Edycja utworu '}`}
                    {song ? `"${song.songTitle}"` : ''}
                </Title>
                <form onSubmit={handleSaveSong}>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="songName">Nazwa utworu</label>
                            <Input
                                name="songName"
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
                            <Input name="authorName" id="authorName" readOnly>
                                {song ? song.author : 'Autor'}
                            </Input>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="bpmn">Bpmn</label>
                            <Input
                                name="bpmn"
                                id="bpmn"
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
                            key={`tablature-line-${i + 1}`}
                            numberOfStrings={6}
                            insertChordPositions={insertChordPositions}
                            insertColumnDuration={insertColumnDuration}
                            activeColumn={activeColumn}
                            setActiveColumn={setActiveColumn}
                            tablatureLineIndex={i + 1}
                            onChangeTablatureData={handleTablatureDataChange}
                            onChangeDurationData={handleDurationDataChange}
                            formData={formData}
                            setFormData={setFormData}
                            formDataDuration={formDataDuration}
                            setFormDataDuration={setFormDataDuration}
                        />
                    ))}
                    <div className={styles.buttonsWrapper}>
                        <Button type="submit">{song ? 'Edytuj utwór' : 'Zapisz utwór'}</Button>

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
                                Wstaw akord
                            </Button>
                            <Button type="button" onClick={handleClearTabColumn}>
                                Czyść
                            </Button>
                            <Button type="button" onClick={handleInsertBarline}>
                                |
                            </Button>
                            <select
                                className={styles.durationSelect}
                                title="Wstaw rytm"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="𝅝">𝅝</option>
                                <option value="𝅗𝅥">𝅗𝅥</option>
                                <option value="♩">♩</option>
                                <option value="♪">♪</option>
                                <option value="𝅘𝅥𝅯">𝅘𝅥𝅯</option>
                                <option value="𝅘𝅥𝅰">𝅘𝅥𝅰</option>
                                <option value="𝅘𝅥𝅱">𝅘𝅥𝅱</option>
                            </select>
                            <Button type="button" onClick={handleSetDuration}>
                                Ustaw rytm
                            </Button>
                        </div>
                        <div className={styles.tablatureAddLineButtonsWrapper}>
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
