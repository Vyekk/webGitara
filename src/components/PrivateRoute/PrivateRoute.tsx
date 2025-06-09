import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute() {
    const { isLoggedIn, isAuthLoaded } = useAuth();
    if (!isAuthLoaded) return null;
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
