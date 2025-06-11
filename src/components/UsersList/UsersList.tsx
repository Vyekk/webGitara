import { useState } from 'react';
import styles from './UsersList.module.scss';
import { User } from 'types';
import useAdminUsers from 'utils/admin';

interface UsersListProps {
    searchingTerm?: string;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersList = ({ searchingTerm = '', setSelectedUser }: UsersListProps) => {
    const { users, error } = useAdminUsers();
    const [activeUser, setActiveUser] = useState<User | null>(null);

    const filteredUsers = users.filter((u) => u.username.toLowerCase().includes(searchingTerm.toLowerCase()));

    if (error) return <div>{error}</div>;

    const handleUserClick = (user: User) => {
        setActiveUser(user);
        setSelectedUser(user);
    };

    return (
        <div className={styles.listOfUsers}>
            <ul>
                {filteredUsers.map((u) => (
                    <li
                        key={u.idUser}
                        className={`${activeUser && activeUser.idUser === u.idUser ? styles.active : ''}`}
                        onClick={() => handleUserClick(u)}
                    >
                        <span className={styles.userName}>{u.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
