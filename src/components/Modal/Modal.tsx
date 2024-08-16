import { ReactNode } from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface IModalProps {
    children: ReactNode;
    isMax?: boolean;
    onClose?: () => void;
}

const Modal = ({ children, isMax, onClose }: IModalProps) => (
    <div className={`${styles.wrapper} ${onClose ? styles.closeableWrapper : ''} ${isMax ? styles.max : ''}`}>
        {children}
        {onClose ? (
            <button className={styles.closeButton} onClick={onClose}>
                X
            </button>
        ) : null}
    </div>
);

export default Modal;
