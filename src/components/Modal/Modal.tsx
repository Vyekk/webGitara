import { ReactNode, forwardRef } from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface IModalProps {
    children: ReactNode;
    isMax?: boolean;
    onClose?: () => void;
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(({ children, isMax, onClose }, ref) => (
    <div ref={ref} className={`${styles.wrapper} ${onClose ? styles.closeableWrapper : ''} ${isMax ? styles.max : ''}`}>
        {children}
        {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
                X
            </button>
        )}
    </div>
));

Modal.displayName = 'Modal';

export default Modal;
