import { useAuth } from '../context/AuthContext';
import { User } from '../types';

const useRequiredUser = (): User => {
    const { user } = useAuth();

    if (!user) {
        throw new Error('User is required but not found. This component should only be used when user is logged in.');
    }

    return user;
};

export default useRequiredUser;
