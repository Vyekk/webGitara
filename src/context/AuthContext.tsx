import { createContext, useContext, useEffect, useState } from 'react';
import { Song, User } from '../types';
import { AuthData } from '../types';
import { AuthService } from 'services/AuthService';
import { SongsService } from 'services/SongsService';
import { UsersService } from 'services/UsersService';

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (auth: AuthData) => void;
    logout: () => void;
    isLoggedIn: boolean;
    isAuthLoaded: boolean;
    toggleFavourite: (songId: string) => void;
    isFavourite: (songId: string) => boolean;
    refreshUser: () => void;
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
    const songsService = new SongsService();
    const usersService = new UsersService();

    useEffect(() => {
        const auth = authService.loadAuth();
        if (auth) {
            setUser(auth.user);
            setToken(auth.token);
            setFavourites(auth.favourites ?? []);
        }
        setIsAuthLoaded(true);
    }, []);

    const login = (auth: AuthData) => {
        if (!auth.user.isActivated) {
            throw new Error('Konto nie jest aktywne. Sprawdź e-mail, aby je aktywować.');
        }
        authService.saveAuth(auth);
        setUser(auth.user);
        setToken(auth.token);
    };

    const logout = () => {
        authService.clearAuth();
        setUser(null);
        setToken(null);
    };

    const refreshUser = () => {
        if (!user) return;
        const updatedUser = usersService.getUserById(user.idUser);
        if (updatedUser && token) {
            setUser(updatedUser);
            authService.saveAuth({ user: updatedUser, token, favourites });
        }
    };

    const toggleFavourite = (songId: string) => {
        if (!user) return;
        if (!token) throw new Error('Brak tokena');
        const updatedFavourites = favourites.includes(songId)
            ? favourites.filter((id) => id !== songId)
            : [...favourites, songId];
        setFavourites(updatedFavourites);
        authService.saveAuth({ user, token, favourites: updatedFavourites });
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
                isAuthLoaded,
                login,
                logout,
                isLoggedIn: !!user,
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
