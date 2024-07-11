import { ReactNode } from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: IModalProps) => (
    <div className={styles.wrapper}>
        {children}
        <button onClick={onClose}>Close Modal</button>
    </div>
);

export default Modal;
