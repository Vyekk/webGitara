import { useEffect, useState } from 'react';
import { User } from 'types';
import useRequiredUser from './useRequiredUser';
import { UsersService } from 'services/UsersService';

type AccountRole = 'admin' | 'moderator' | 'user';

const useAdminUsers = () => {
    const currentUser = useRequiredUser();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const usersService = new UsersService();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!currentUser.isAdmin) {
                setError('Brak dostępu');
                return;
            }

            try {
                const loadedUsers = await usersService.loadUsers();
                setUsers(loadedUsers);
            } catch (err) {
                setError('Błąd wczytywania użytkowników brak admina');
            }
        };

        fetchUsers();
    }, [currentUser]);

    const changeUserRole = async (targetUserId: string, newRole: AccountRole) => {
        if (!currentUser.isAdmin) {
            setError('Brak uprawnień do zmiany roli.');
            return;
        }

        try {
            await usersService.updateUserRole(targetUserId, newRole);
            setUsers((prev) =>
                prev.map((user) =>
                    user.idUser === targetUserId
                        ? {
                              ...user,
                              isAdmin: newRole === 'admin',
                              isModerator: newRole === 'moderator',
                          }
                        : user,
                ),
            );
        } catch (err) {
            setError('Nie udało się zmienić roli');
        }
    };

    const deleteUser = async (targetUserId: string) => {
        if (!currentUser.isAdmin) {
            setError('Brak uprawnień do usuwania kont.');
            return;
        }

        try {
            await usersService.deleteUser(targetUserId);
            setUsers((prev) => prev.filter((u) => u.idUser !== targetUserId));
        } catch (err) {
            setError('Nie udało się usunąć użytkownika');
        }
    };

    const getUserById = async (idUser: string): Promise<User | null> => {
        return await usersService.getUserById(idUser);
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
