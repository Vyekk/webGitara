import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute() {
    const { user, isLoggedIn, isAuthLoaded } = useAuth();
    if (!isAuthLoaded) return null;
    return isLoggedIn && user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
