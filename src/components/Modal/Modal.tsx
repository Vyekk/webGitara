import { ReactNode } from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface IModalProps {
    children: ReactNode;
}

const Modal = ({ children }: IModalProps) => <div className={styles.wrapper}>{children}</div>;

export default Modal;
