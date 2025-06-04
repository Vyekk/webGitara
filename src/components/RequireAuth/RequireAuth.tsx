// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    // const { user } = useAuth();
    // if (!user) return <Navigate to="/login" />;
    return <>{children}</>;
};
