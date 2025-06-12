import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import storage, { AuthData } from '../utils/storage';

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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const [favourites, setFavourites] = useState<string[]>([]);

    useEffect(() => {
        const auth = storage.loadAuth();
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
        storage.saveAuth(auth);
        setUser(auth.user);
        setToken(auth.token);
    };

    const logout = () => {
        storage.clearAuth();
        setUser(null);
        setToken(null);
    };

    const refreshUser = () => {
        if (!user) return;
        const updatedUser = storage.getUserById(user.idUser);
        if (updatedUser) {
            setUser(updatedUser);
            storage.saveAuth({ user: updatedUser, token: token!, favourites });
        }
    };

    const toggleFavourite = (songId: string) => {
        if (!user) return;
        if (!token) throw new Error('Brak tokena');
        const updatedFavourites = favourites.includes(songId)
            ? favourites.filter((id) => id !== songId)
            : [...favourites, songId];
        setFavourites(updatedFavourites);
        storage.saveAuth({ user, token, favourites: updatedFavourites });
    };

    const isFavourite = (songId: string) => favourites.includes(songId);

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
