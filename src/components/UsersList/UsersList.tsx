import { useState } from 'react';
import styles from './UsersList.module.scss';
import { User } from 'types';
interface UsersListProps {
    users: User[];
    searchingTerm?: string;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersList = ({ users, searchingTerm = '', setSelectedUser }: UsersListProps) => {
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const filteredUsers = users.filter((u) => u.username.toLowerCase().includes(searchingTerm.toLowerCase()));

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
