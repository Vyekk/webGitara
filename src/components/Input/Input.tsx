import styles from 'components/Input/Input.module.scss';

interface InputProps {
    children: string;
    id: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ children, id, type = 'text', onChange }: InputProps) => (
    <div className={styles.wrapper}>
        <input type={type} className={styles.input} placeholder={children} id={id} onChange={onChange} required />
    </div>
);

export default Input;
