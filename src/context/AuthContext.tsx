import { createContext, useContext, useEffect, useState } from 'react';
import { Song, User } from '../types';
import { SongsService } from 'services/SongsService';
import { UsersService } from 'services/UsersService';
import { AuthService } from 'services/AuthService';

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
    isAuthLoaded: boolean;
    toggleFavourite: (songId: string) => Promise<void>;
    isFavourite: (songId: string) => boolean;
    refreshUser: () => Promise<void>;
    saveLastPlayedSong: (songId: string) => void;
    getLastPlayedSongs: () => Promise<Song[]>;
    isReported: (idSong: string) => boolean;
    toggleReported: (idSong: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const [favourites, setFavourites] = useState<string[]>([]);
    const [reportedSongs, setReportedSongs] = useState<string[]>([]);

    const authService = new AuthService();
    const usersService = new UsersService();
    const songsService = new SongsService();

    useEffect(() => {
        // Przy starcie aplikacji pobierz aktualnego użytkownika z /me
        const fetchCurrentUser = async () => {
            const currentUser = await usersService.getCurrentUser();
            if (currentUser) {
                if (!Array.isArray(currentUser.roles)) currentUser.roles = [];
                setUser(currentUser);
                const backendFavourites = await usersService.getUserFavourites(currentUser.idUser);
                const reported = await usersService.getUserReportedSongs(currentUser.idUser);
                setFavourites(backendFavourites ?? []);
                setReportedSongs(reported ?? []);
            }
            setIsAuthLoaded(true);
        };
        fetchCurrentUser();
    }, []);

    const login = async (username: string, password: string) => {
        const authData = await authService.login({ username, password });
        if (!authData.user.isActivated) {
            throw new Error('Konto nieaktywne.');
        }
        const backendFavourites = await usersService.getUserFavourites(authData.user.idUser);
        const reported = await usersService.getUserReportedSongs(authData.user.idUser);
        if (!Array.isArray(authData.user.roles)) authData.user.roles = [];
        setUser(authData.user);
        setFavourites(backendFavourites ?? []);
        setReportedSongs(reported ?? []);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setFavourites([]);
        setReportedSongs([]);
    };

    const refreshUser = async () => {
        if (!user) return;
        const updatedUser = await usersService.getUserById(user.idUser);
        if (updatedUser) {
            if (!Array.isArray(updatedUser.roles)) updatedUser.roles = [];
            setUser(updatedUser);
        }
    };

    const toggleFavourite = async (songId: string) => {
        if (!user) return;
        const prevFavourites = [...favourites];
        const updatedFavourites = favourites.includes(songId)
            ? favourites.filter((id) => id !== songId)
            : [...favourites, songId];
        setFavourites(updatedFavourites);
        try {
            await usersService.updateUserFavourites(user.idUser, updatedFavourites);
        } catch (error) {
            setFavourites(prevFavourites);
        }
    };

    const toggleReported = async (songId: string) => {
        if (!user) return;
        const updatedReportedSongs = reportedSongs.includes(songId)
            ? reportedSongs.filter((id) => id !== songId)
            : [...reportedSongs, songId];
        setReportedSongs(updatedReportedSongs);
        await usersService.updateUserReportedSongs(user.idUser, updatedReportedSongs);
    };

    const isFavourite = (songId: string) => favourites.includes(songId);
    const isReported = (songId: string) => reportedSongs.includes(songId);

    const saveLastPlayedSong = (songId: string) => {
        if (!user) return;
        songsService.saveLastPlayedSong(user.idUser, songId);
    };

    const getLastPlayedSongs = async () => {
        if (!user) return [];
        return await songsService.getLastPlayedSongs(user.idUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token: null,
                isLoggedIn: !!user,
                isAuthLoaded,
                login,
                logout,
                toggleFavourite,
                isFavourite,
                refreshUser,
                saveLastPlayedSong,
                getLastPlayedSongs,
                isReported,
                toggleReported,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
