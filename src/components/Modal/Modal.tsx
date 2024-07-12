import { ReactNode } from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface IModalProps {
    children: ReactNode;
    onClose?: () => void;
}

const Modal = ({ children, onClose }: IModalProps) => (
    <div className={`${styles.wrapper} ${onClose ? styles.closeableWrapper : ''}`}>
        {children}
        {onClose ? (
            <button className={styles.closeButton} onClick={onClose}>
                X
            </button>
        ) : null}
    </div>
);

export default Modal;
