import { useState } from 'react';
import { UsersService } from 'services/UsersService';
import styles from './ChangePasswordForm.module.scss';
import Button from 'components/Button/Button';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const usersService = new UsersService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Nowe hasła nie są takie same.');
            return;
        }

        try {
            await usersService.updateUserPassword(oldPassword, newPassword);
            setMessage('Hasło zostało zmienione.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setMessage(err.message || 'Wystąpił błąd.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Stare hasło:
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            </label>
            <label>
                Nowe hasło:
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </label>
            <label>
                Potwierdź nowe hasło:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <Button type="submit">Zmień hasło</Button>
            {message && <p className={styles.message}>{message}</p>}
        </form>
    );
};

export default ChangePasswordForm;
