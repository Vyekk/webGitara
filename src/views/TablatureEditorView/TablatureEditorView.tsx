import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import TablatureEditor from 'components/TablatureEditor/TablatureEditor';
import Title from 'components/Title/Title';
import styles from 'views/TablatureEditorView/TablatureEditorView.module.scss';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Song, TablatureActiveLineColumn, InfoMessage } from 'types';
import { Link } from 'react-router-dom';
import GuitarChords from 'utils/guitarChords';
import { ChordPosition } from 'types';
import { convertFormDataToTablature } from 'utils/tablatureConverters';
import { ModalContext } from 'components/Modal/ModalContext';
import { convertTablatureToFormData } from 'utils/tablatureConverters';
import { useSongs } from 'context/SongsContext';
import useRequiredUser from 'utils/useRequiredUser';

const TablatureEditorView = () => {
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
    const [errorMessage, setErrorMessage] = useState<InfoMessage>({ message: null });
    const [infoMessage, setInfoMessage] = useState<InfoMessage>({ message: null });
    const [fullFormData, setFullFormData] = useState<Record<string, string>>({});
    const [fullFormDataDuration, setFullFormDataDuration] = useState<Record<string, string>>({});
    const [selectedVersion, setSelectedVersion] = useState('');
    const [versionList, setVersionList] = useState<{ version_number: number; edited_at: string }[]>([]);
    const navigate = useNavigate();
    const { openModal, setModal } = useContext(ModalContext);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formDataDuration, setFormDataDuration] = useState<Record<string, string>>({});
    const location = useLocation();
    const { songs, addSong, updateSong, getSongHistoryVersions, getSongHistoryVersion } = useSongs();
    const user = useRequiredUser();

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
        if (errorMessage.message) {
            handleOpenModal(<div className={styles.errorMessage}>{errorMessage.message}</div>);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (infoMessage.message) {
            handleOpenModal(<div className={styles.infoMessage}>{infoMessage.message}</div>);
        }
    }, [infoMessage]);

    const handleOpenModal = (content: ReactNode) => {
        const modalContent = content;
        setModal(modalContent);
        openModal();
    };

    useEffect(() => {
        songReset();
        if (!songs || songs.length === 0) {
            return;
        }
        const songId = location.pathname.split('/').pop();
        const foundSong = songs.find((s) => s.idSong === songId);
        if (!foundSong) {
            navigate(`/play/edit`);
            return;
        }
        if (
            foundSong.idUser !== user.idUser &&
            !(Array.isArray(user.roles) && (user.roles.includes('admin') || user.roles.includes('moderator')))
        ) {
            setErrorMessage({ message: 'Nie masz uprawnień do edycji tego utworu' });
            navigate('/play/edit');
            return;
        }

        setSong(foundSong);
        setNewSongBpm(foundSong.bpm);
        setNewSongTitle(foundSong.songTitle);
    }, [songs, location.pathname]);

    useEffect(() => {
        const fetchVersions = async () => {
            if (!song || !song.idSong) return;
            try {
                const versions = await getSongHistoryVersions(song.idSong);
                setVersionList(versions);
            } catch (error) {
                setVersionList([]);
            }
        };
        fetchVersions();
    }, [song, getSongHistoryVersions]);

    useEffect(() => {
        setSelectedVersion(''); // resetuj wersję po zmianie piosenki
    }, [song]);

    const songReset = () => {
        setSong(null);
        setNewSongTitle('');
        setNewSongBpm(120);
        setFormData({});
        setFullFormData({});
        setFormDataDuration({});
        setFullFormDataDuration({});
    };

    const handleAddLine = () => {
        setNumberOfTablatureLines((prev) => prev + 1);
    };

    const handleRemoveLine = () => {
        if (numberOfTablatureLines > 1) {
            setNumberOfTablatureLines((prev) => prev - 1);
            const lineToRemove = numberOfTablatureLines;
            setFullFormData((prev) => {
                const updatedFormData = { ...prev };
                Object.keys(updatedFormData).forEach((key) => {
                    if (key.includes(`line-${lineToRemove}`)) {
                        delete updatedFormData[key];
                    }
                });
                return updatedFormData;
            });
            setFormData((prev) => {
                const updatedFormData = { ...prev };
                Object.keys(updatedFormData).forEach((key) => {
                    if (key.includes(`line-${lineToRemove}`)) {
                        delete updatedFormData[key];
                    }
                });
                return updatedFormData;
            });
            setFormDataDuration((prev) => {
                const updatedFormDataDuration = { ...prev };
                Object.keys(updatedFormDataDuration).forEach((key) => {
                    if (key.startsWith(`duration-${lineToRemove}-`)) {
                        delete updatedFormDataDuration[key];
                    }
                });
                return updatedFormDataDuration;
            });
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
        setErrorMessage({ message: null });
        if (!newSongTitle.trim()) {
            setTimeout(() => {
                setErrorMessage({ message: 'Proszę podać nazwę utworu' });
            }, 0);
            return;
        }

        const tablature = convertFormDataToTablature(fullFormData, fullFormDataDuration);
        const hasNotes = tablature.some((step) => step.length > 0);
        if (!hasNotes || tablature.length < 5) {
            setTimeout(() => {
                setErrorMessage({ message: 'Tablatura nie może być pusta lub zawierać mniej niż 5 dźwięków' });
            }, 0);
            return;
        }

        let newSongBackend;
        if (song) {
            newSongBackend = {
                idSong: song.idSong,
                idUser: user.idUser,
                title: newSongTitle,
                default_bpm: newSongBpm,
                tablature,
            };
        } else {
            newSongBackend = {
                idUser: user.idUser,
                title: newSongTitle,
                default_bpm: newSongBpm,
                tablature,
            };
        }

        try {
            if (song) {
                await updateSong(newSongBackend);
                setInfoMessage({ message: 'Pomyślnie zmodyfikowano utwór' });
                songReset();
            } else {
                await addSong(newSongBackend);
                setInfoMessage({ message: 'Pomyślnie stworzono utwór' });
            }
        } catch (error) {
            setErrorMessage({ message: 'Coś poszło nie tak podczas zapisu utworu.' });
        }
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

    const handleVersionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const version = e.target.value;
        setSelectedVersion(version);
    };

    useEffect(() => {
        const fetchVersion = async () => {
            if (selectedVersion && song) {
                try {
                    const history = await getSongHistoryVersion(song.idSong, selectedVersion);
                    const historyTablature = history.tablature;
                    const { formData: convertedFormData, formDataDuration: convertedFormDataDuration } =
                        convertTablatureToFormData(historyTablature);
                    setFormData(convertedFormData);
                    setFormDataDuration(convertedFormDataDuration);
                    setFullFormData(convertedFormData);
                    setFullFormDataDuration(convertedFormDataDuration);
                } catch (error) {
                    setErrorMessage({ message: 'Nie udało się pobrać wybranej wersji.' });
                }
            } else if (song) {
                // Przywróć aktualną wersję z song
                const { formData: convertedFormData, formDataDuration: convertedFormDataDuration } =
                    convertTablatureToFormData(song.tablature);
                setFormData(convertedFormData);
                setFormDataDuration(convertedFormDataDuration);
                setFullFormData(convertedFormData);
                setFullFormDataDuration(convertedFormDataDuration);
            }
        };
        fetchVersion();
    }, [selectedVersion, song, getSongHistoryVersion]);

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
                                value={newSongTitle}
                                onChange={(e) => setNewSongTitle(e.target.value)}
                            >
                                Wprowadź nazwę
                            </Input>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="authorName">Autor</label>
                            <Input name="authorName" id="authorName" readOnly>
                                {song ? song.author : user?.username || 'Anonim'}
                            </Input>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="bpm">Bpm</label>
                            <Input
                                name="bpm"
                                id="bpm"
                                type="number"
                                min={30}
                                max={300}
                                value={newSongBpm}
                                onChange={handleBpmChange}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="version">Wersja</label>
                            <select
                                id="version"
                                value={selectedVersion}
                                onChange={handleVersionChange}
                                disabled={!song}
                            >
                                <option value="">Aktualna</option>
                                {versionList.map((v) => (
                                    <option key={v.version_number} value={v.version_number}>
                                        {`Wersja ${v.version_number} (${new Date(v.edited_at).toLocaleString()})`}
                                    </option>
                                ))}
                            </select>
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
