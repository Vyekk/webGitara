import styles from 'components/Input/Input.module.scss';

interface InputProps {
    children: string;
    id: string;
    type?: string;
}

const Input = ({ children, id, type = 'text' }: InputProps) => (
    <div className={styles.wrapper}>
        <input type={type} className={styles.input} placeholder={children} id={id} required />
    </div>
);

export default Input;
