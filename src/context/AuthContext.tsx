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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        const auth = storage.loadAuth();
        if (auth) {
            setUser(auth.user);
            setToken(auth.token);
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

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthLoaded,
                login,
                logout,
                isLoggedIn: !!user,
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
