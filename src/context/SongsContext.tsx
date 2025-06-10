import { createContext, useContext, useEffect, useState } from 'react';
import { Song, Comment } from '../types';
import storage from '../utils/storage';
import useRequiredUser from 'utils/useRequiredUser';

type SongsContextType = {
    songs: Song[];
    refreshSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    addSong: (newSong: Song) => Promise<void>;
    getTopRated?: () => Promise<Song[]>;
    addCommentToSong: (songId: string, comment: Comment) => Promise<void>;
    deleteCommentFromSong: (songId: string, commentId: string) => Promise<void>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const user = useRequiredUser();

    const refreshSongs = async () => {
        const allSongs = await storage.loadSongs();
        setSongs(allSongs);
    };

    const deleteSong = async (id: string) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');

        const songs = await storage.loadSongs();
        const song = songs.find((s) => s.id === id);
        if (!song) throw new Error('Nie znaleziono utworu.');

        if (song.idUser !== user.idUser) {
            throw new Error('Nie możesz usunąć cudzego utworu.');
        }

        await storage.deleteSongById(id);
        await refreshSongs();
    };

    const addSong = async (newSong: Song) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        if (newSong.idUser !== user.idUser) {
            throw new Error('Nie możesz dodać utworu w imieniu innego użytkownika.');
        }

        await storage.addSong(newSong);
        await refreshSongs();
    };

    const getTopRated = async () => {
        await refreshSongs();
        return await storage.getTopRatedSongs();
    };

    const addCommentToSong = async (songId: string, comment: Comment) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        if (comment.author.idUser !== user.idUser) {
            throw new Error('Nie możesz dodać komentarza w imieniu innego użytkownika.');
        }

        await storage.addCommentToSong(songId, comment);
        await refreshSongs();
    };

    const deleteCommentFromSong = async (songId: string, commentId: string) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');

        const songs = await storage.loadSongs();
        const song = songs.find((s) => s.id === songId);
        if (!song) throw new Error('Nie znaleziono utworu.');

        const comment = song.comments?.find((c) => c.idComment === commentId);
        if (!comment) throw new Error('Nie znaleziono komentarza.');

        if (comment.author.idUser !== user.idUser) {
            throw new Error('Nie możesz usunąć cudzego komentarza.');
        }

        await storage.deleteCommentFromSong(songId, commentId);

        setSongs((prevSongs) =>
            prevSongs.map((s) =>
                s.id === songId
                    ? {
                          ...s,
                          comments: s.comments?.filter((c) => c.idComment !== commentId) || [],
                      }
                    : s,
            ),
        );
    };

    useEffect(() => {
        refreshSongs();
    }, []);

    return (
        <SongsContext.Provider
            value={{
                songs,
                refreshSongs,
                deleteSong,
                addSong,
                getTopRated,
                addCommentToSong,
                deleteCommentFromSong,
            }}
        >
            {children}
        </SongsContext.Provider>
    );
};

export const useSongs = () => {
    const context = useContext(SongsContext);
    if (!context) throw new Error('useSongs must be used within SongsProvider');
    return context;
};
