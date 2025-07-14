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
    const [token, setToken] = useState<string | null>(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const [favourites, setFavourites] = useState<string[]>([]);
    const [reportedSongs, setReportedSongs] = useState<string[]>([]);

    const authService = new AuthService();

    const usersService = new UsersService();
    const songsService = new SongsService();

    useEffect(() => {
        const authData = authService.loadAuth();
        if (authData) {
            if (!Array.isArray(authData.user.roles)) authData.user.roles = [];
            setUser(authData.user);
            setToken(authData.token);
            setFavourites(authData.favourites ?? []);
        }
        setIsAuthLoaded(true);
    }, []);

    useEffect(() => {
        if (!user) return;
        const fetchReported = async () => {
            const reported = await songsService.getUserReportedSongs(user.idUser);
            setReportedSongs(reported ?? []);
        };
        fetchReported();
    }, [user]);

    const login = async (username: string, password: string) => {
        const authData = await authService.login({ username, password });
        if (!authData.user.isActivated) {
            throw new Error('Konto nieaktywne.');
        }
        const backendFavourites = await usersService.getUserFavourites(authData.user.idUser);
        if (!Array.isArray(authData.user.roles)) authData.user.roles = [];
        setUser(authData.user);
        setToken(authData.token);
        setFavourites(backendFavourites ?? []);
        authService.saveAuth({ user: authData.user, token: authData.token, favourites: backendFavourites ?? [] });
    };

    const logout = () => {
        authService.clearAuth();
        setUser(null);
        setToken(null);
        setFavourites([]);
    };

    const refreshUser = async () => {
        if (!user) return;

        const updatedUser = await usersService.getUserById(user.idUser);
        if (updatedUser) {
            // Wymuś obecność roles jako tablicy
            if (!Array.isArray(updatedUser.roles)) updatedUser.roles = [];
            setUser(updatedUser);
            authService.saveAuth({ user: updatedUser, token: token ?? '', favourites });
        }
    };

    const toggleFavourite = async (songId: string) => {
        if (!user) return;

        const updatedFavourites = favourites.includes(songId)
            ? favourites.filter((id) => id !== songId)
            : [...favourites, songId];

        setFavourites(updatedFavourites);
        authService.saveAuth({ user, token: token ?? '', favourites: updatedFavourites });

        await usersService.updateUserFavourites(user.idUser, updatedFavourites);
    };

    const isFavourite = (songId: string) => favourites.includes(songId);

    const saveLastPlayedSong = (songId: string) => {
        if (!user) return;
        songsService.saveLastPlayedSong(user.idUser, songId);
    };

    const getLastPlayedSongs = async () => {
        if (!user) return [];
        return await songsService.getLastPlayedSongs(user.idUser);
    };

    const isReported = (idSong: string) => reportedSongs.includes(idSong);

    const toggleReported = async (idSong: string) => {
        if (!user) return;
        let updatedReported: string[];
        if (isReported(idSong)) {
            updatedReported = reportedSongs.filter((id) => id !== idSong);
            await songsService.updateUserReportedSongs(user.idUser, updatedReported);
        } else {
            updatedReported = [...reportedSongs, idSong];
            await songsService.updateUserReportedSongs(user.idUser, updatedReported);
        }
        setReportedSongs(updatedReported);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
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
