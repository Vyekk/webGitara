import { useEffect, useState } from 'react';
import { User } from 'types';
import storage from './storage';
import useRequiredUser from './useRequiredUser';

type AccountRole = 'admin' | 'moderator' | 'user';

const useAdminUsers = () => {
    const currentUser = useRequiredUser();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!currentUser.isAdmin) {
            setError('Brak dostępu');
            return;
        }

        const loadedUsers = storage.loadUsers();
        setUsers(loadedUsers);
    }, [currentUser]);

    const changeUserRole = (targetUserId: string, newRole: AccountRole) => {
        if (!currentUser.isAdmin) {
            setError('Brak uprawnień do zmiany roli.');
            return;
        }

        const updatedUsers = users.map((user) =>
            user.idUser === targetUserId
                ? {
                      ...user,
                      isAdmin: newRole === 'admin',
                      isModerator: newRole === 'moderator',
                  }
                : user,
        );

        setUsers(updatedUsers);
        storage.saveUsers(updatedUsers);
    };

    const deleteUser = (targetUserId: string) => {
        if (!currentUser.isAdmin) {
            setError('Brak uprawnień do usuwania kont.');
            return;
        }

        const updatedUsers = users.filter((u) => u.idUser !== targetUserId);
        setUsers(updatedUsers);
        storage.saveUsers(updatedUsers);
    };

    const getUserById = (idUser: string): User | undefined => {
        return storage.getUserById(idUser);
    };

    return {
        users,
        error,
        changeUserRole,
        deleteUser,
        getUserById,
    };
};

export default useAdminUsers;
