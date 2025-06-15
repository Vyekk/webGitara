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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const [favourites, setFavourites] = useState<string[]>([]);

    const authService = new AuthService();

    const usersService = new UsersService();
    const songsService = new SongsService();

    useEffect(() => {
        const authData = authService.loadAuth();
        if (authData) {
            setUser(authData.user);
            setToken(authData.token);
            setFavourites(authData.favourites ?? []);
        }
        setIsAuthLoaded(true);
    }, []);

    const login = async (username: string, password: string) => {
        const authData = await authService.login({ username, password });
        if (!authData.user.isActivated) {
            throw new Error('Konto nieaktywne.');
        }
        const backendFavourites = await usersService.getUserFavourites(authData.user.idUser);
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
