import { createContext, useContext, useEffect, useState } from 'react';
import { Song, Comment } from '../types';
import { SongsService } from 'services/SongsService';
import { UsersService } from 'services/UsersService';
import useRequiredUser from 'utils/useRequiredUser';

type SongBackendDto = {
    idSong?: string;
    idUser: string;
    title: string;
    default_bpm: number;
    tablature: any;
};

type SongHistoryVersion = { version_number: number; edited_at: string };

type ReportedSong = { idSong: string };
type SongsContextType = {
    songs: Song[];
    refreshSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    getDeletedSongs: () => Song[];
    addSong: (newSong: SongBackendDto) => Promise<void>;
    updateSong: (updatedSong: SongBackendDto) => Promise<void>;
    getTopRated?: () => Promise<Song[]>;
    addCommentToSong: (songId: string, comment: Comment) => Promise<void>;
    deleteCommentFromSong: (songId: string, commentId: string) => Promise<void>;
    restoreSong: (id: string) => Promise<void>;
    rateSong: (songId: string, value: number) => Promise<void>;
    getSongHistoryVersions: (idSong: string) => Promise<SongHistoryVersion[]>;
    getSongHistoryVersion: (idSong: string, version: string) => Promise<any>;
    getAllReportedSongs: () => Promise<ReportedSong[]>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [deletedSongs, setDeletedSongs] = useState<Song[]>([]);
    const user = useRequiredUser();
    const songsService = new SongsService();
    const userService = new UsersService();

    const refreshSongs = async () => {
        const allSongs = await songsService.loadSongs();
        const deletedSongs = await songsService.loadDeletedSongs();
        setSongs(Array.isArray(allSongs) ? allSongs : []);
        setDeletedSongs(Array.isArray(deletedSongs) ? deletedSongs : []);
    };

    const getAllReportedSongs = async () => {
        return await songsService.getAllReportedSongs();
    };

    const deleteSong = async (id: string) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');

        const song = songs.find((s) => s.idSong === id);
        if (!song) throw new Error('Nie znaleziono utworu.');

        const isAdminOrModerator =
            Array.isArray(user.roles) && (user.roles.includes('admin') || user.roles.includes('moderator'));
        if (!isAdminOrModerator && song.idUser !== user.idUser) {
            throw new Error('Nie możesz usunąć cudzego utworu.');
        }

        await songsService.deleteSongById(id);
        await refreshSongs();
    };

    const restoreSong = async (id: string) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');

        const isAdminOrModerator =
            Array.isArray(user.roles) && (user.roles.includes('admin') || user.roles.includes('moderator'));
        if (!isAdminOrModerator) {
            throw new Error('Nie masz uprawnień do przywracania utworów.');
        }

        const song = deletedSongs.find((s) => s.idSong === id);
        if (!song) throw new Error('Nie znaleziono utworu.');
        if (!song.deleted_by_idUser) {
            throw new Error('Utwór nie jest oznaczony jako usunięty.');
        }

        const updatedSong = {
            idSong: song.idSong,
            idUser: song.idUser,
            title: song.songTitle,
            default_bpm: song.bpm,
            tablature: song.tablature,
            deleted_by_idUser: null,
        };
        await songsService.updateSong(updatedSong);
        await refreshSongs();
    };

    const getDeletedSongs = () => deletedSongs;

    const addSong = async (newSong: SongBackendDto) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        if (newSong.idUser !== user.idUser) {
            throw new Error('Nie możesz dodać utworu w imieniu innego użytkownika.');
        }

        await songsService.addSong(newSong);
        await refreshSongs();
    };

    const updateSong = async (updatedSong: SongBackendDto) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        if (updatedSong.idUser !== user.idUser) {
            throw new Error('Nie możesz edytować utworu innego użytkownika.');
        }

        await songsService.updateSong(updatedSong);
        await refreshSongs();
    };

    const getTopRated = async () => {
        return await songsService.getTopRatedSongs();
    };

    const addCommentToSong = async (songId: string, comment: Comment) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        if (comment.author.idUser !== user.idUser) {
            throw new Error('Nie możesz dodać komentarza w imieniu innego użytkownika.');
        }

        await songsService.addCommentToSong(songId, comment);
        await refreshSongs();
    };

    const rateSong = async (songId: string, value: number) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');
        await songsService.rateSong(songId, value, user.idUser);
        await userService.updateUserSongStats?.();
        await refreshSongs();
    };

    const deleteCommentFromSong = async (songId: string, commentId: string) => {
        if (!user) throw new Error('Użytkownik niezalogowany.');

        const song = songs.find((s) => s.idSong === songId);
        if (!song) throw new Error('Nie znaleziono utworu.');

        const comment = song.comments?.find((c) => c.idComment === commentId);
        if (!comment) throw new Error('Nie znaleziono komentarza.');

        if (comment.author.idUser !== user.idUser) {
            throw new Error('Nie możesz usunąć cudzego komentarza.');
        }

        await songsService.deleteCommentFromSong(songId, commentId);
        await refreshSongs();
    };

    const getSongHistoryVersions = async (idSong: string): Promise<SongHistoryVersion[]> => {
        return await songsService.getSongHistoryVersions(idSong);
    };

    const getSongHistoryVersion = async (idSong: string, version: string): Promise<any> => {
        return await songsService.getSongHistoryVersion(idSong, version);
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
                updateSong,
                deleteCommentFromSong,
                getDeletedSongs,
                restoreSong,
                rateSong,
                getSongHistoryVersions,
                getSongHistoryVersion,
                getAllReportedSongs,
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
