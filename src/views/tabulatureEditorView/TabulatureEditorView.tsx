import { useParams } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import TabulatureEditor from 'components/TabulatureEditor/TabulatureEditor';
import Title from 'components/Title/Title';
import styles from 'views/TabulatureEditorView/TabulatureEditorView.module.scss';
import { useEffect, useState } from 'react';
import { Song } from 'types';
import { loadSongs } from 'utils/storage';

const TabulatureEditorView = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
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
    return (
        <div className={styles.tabulatureEditorViewWrapper}>
            <div className={styles.textContentWrapper}>
                <Title>Edycja utworu {song ? `"${song.songTitle}"` : ''}</Title>
                <form>
                    <TabulatureEditor />
                    <Input id="songName" value={song ? song.songTitle : ''}>
                        Nazwa utworu
                    </Input>
                    <Input id="authorName" readOnly>
                        {song ? song.author : 'Autor'}
                    </Input>
                    <Button>Zapisz utwór</Button>
                </form>
            </div>
        </div>
    );
};

export { TabulatureEditorView };
