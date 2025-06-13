import Title from 'components/Title/Title';
import styles from './Users.module.scss';
import Input from 'components/Input/Input';
import { useEffect, useState } from 'react';
import UsersList from 'components/UsersList/UsersList';
import Button from 'components/Button/Button';
import { User } from 'types';
import useAdminUsers from 'utils/admin';

type AccountRole = 'user' | 'moderator' | 'admin';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [accountType, setAccountType] = useState<AccountRole>('user');
    const { changeUserRole, deleteUser, users } = useAdminUsers();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (!selectedUser) {
            setAccountType('user');
            return;
        }
        if (selectedUser.isAdmin) {
            setAccountType('admin');
        } else if (selectedUser.isModerator) {
            setAccountType('moderator');
        } else {
            setAccountType('user');
        }
    }, [selectedUser]);

    const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountType(event.target.value as AccountRole);
    };

    const handleSaveChanges = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedUser) return;

        changeUserRole(selectedUser.idUser, accountType);

        const updatedUser = users.find((u) => u.idUser === selectedUser.idUser);
        if (updatedUser) {
            setSelectedUser(updatedUser);
        }

        alert('Zmieniono typ konta!');
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;

        if (window.confirm(`Czy na pewno chcesz usunąć konto użytkownika ${selectedUser.username}?`)) {
            deleteUser(selectedUser.idUser);
            alert('Konto zostało usunięte!');
            setSelectedUser(null);
        }
    };

    return (
        <div className={styles.usersWrapper}>
            <Title tag="h2">Użytkownicy</Title>
            <div className={styles.usersSettings}>
                <div className={styles.userChooseWrapper}>
                    <label>
                        <Title tag="h3">Wyszukaj użytkownika</Title>
                        <Input id="search" value={searchTerm} onChange={handleSearch}>
                            Wyszukaj użytkownika
                        </Input>
                    </label>
                    <UsersList users={users} searchingTerm={searchTerm} setSelectedUser={setSelectedUser} />
                </div>
                <div className={styles.userInfo}>
                    <Title tag="h3">Informacje o użytkowniku</Title>
                    <ul>
                        <li>E-mail: {selectedUser?.email || 'brak'}</li>
                        <li>
                            Data założenia konta:{' '}
                            {selectedUser?.created_at
                                ? new Date(selectedUser.created_at).toLocaleString('pl-PL', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                  })
                                : 'brak'}
                        </li>
                        <li>
                            Średnia ocena utworów: {selectedUser?.average_published_song_rating.toFixed(2) || 'brak'}
                        </li>
                        <li>Liczba ocen utworów: {selectedUser?.number_of_ratings_received || 'brak'}</li>
                    </ul>
                    <form onSubmit={handleSaveChanges}>
                        <Title tag="h3">Typ konta</Title>
                        <label>
                            <Input
                                type="radio"
                                id="isUser"
                                name="accountType"
                                value="user"
                                checked={accountType === 'user'}
                                onChange={handleAccountTypeChange}
                            />
                            Użytkownik
                        </label>
                        <label>
                            <Input
                                type="radio"
                                id="isModerator"
                                name="accountType"
                                value="moderator"
                                checked={accountType === 'moderator'}
                                onChange={handleAccountTypeChange}
                            />
                            Moderator
                        </label>
                        <label>
                            <Input
                                type="radio"
                                id="isAdmin"
                                name="accountType"
                                value="admin"
                                checked={accountType === 'admin'}
                                onChange={handleAccountTypeChange}
                            />
                            Administrator
                        </label>
                        <div className={styles.buttonsWrapper}>
                            <Button type="submit">Zapisz zmiany</Button>
                            <Button type="button" onClick={handleDeleteUser}>
                                Usuń konto
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Users;
