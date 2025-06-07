import { createContext, useContext, useEffect, useState } from 'react';
import { Song } from '../types';
import { loadSongs, deleteSongById, addSong as storageAddSong } from '../utils/storage';

type SongsContextType = {
    songs: Song[];
    refreshSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    addSong: (newSong: Song) => Promise<void>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs, setSongs] = useState<Song[]>([]);

    const refreshSongs = async () => {
        const allSongs = await loadSongs();
        setSongs(allSongs);
    };

    const deleteSong = async (id: string) => {
        await deleteSongById(id);
        await refreshSongs();
    };

    const addSong = async (newSong: Song) => {
        await storageAddSong(newSong);
        await refreshSongs();
    };

    useEffect(() => {
        refreshSongs();
    }, []);

    return (
        <SongsContext.Provider value={{ songs, refreshSongs, deleteSong, addSong }}>{children}</SongsContext.Provider>
    );
};

export const useSongs = () => {
    const context = useContext(SongsContext);
    if (!context) throw new Error('useSongs must be used within SongsProvider');
    return context;
};
