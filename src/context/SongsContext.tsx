import { createContext, useContext, useEffect, useState } from 'react';
import { Song } from '../types';
import storage from '../utils/storage';

type SongsContextType = {
    songs: Song[];
    refreshSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    addSong: (newSong: Song) => Promise<void>;
    getTopRated?: () => Promise<Song[]>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs, setSongs] = useState<Song[]>([]);

    const refreshSongs = async () => {
        const allSongs = await storage.loadSongs();
        setSongs(allSongs);
    };

    const deleteSong = async (id: string) => {
        await storage.deleteSongById(id);
        await refreshSongs();
    };

    const addSong = async (newSong: Song) => {
        await storage.addSong(newSong);
        await refreshSongs();
    };

    const getTopRated = async () => {
        await refreshSongs();
        return await storage.getTopRatedSongs();
    };

    useEffect(() => {
        refreshSongs();
    }, []);

    return (
        <SongsContext.Provider value={{ songs, refreshSongs, deleteSong, addSong, getTopRated }}>
            {children}
        </SongsContext.Provider>
    );
};

export const useSongs = () => {
    const context = useContext(SongsContext);
    if (!context) throw new Error('useSongs must be used within SongsProvider');
    return context;
};
