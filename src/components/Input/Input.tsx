import styles from 'components/Input/Input.module.scss';

interface InputProps {
    children?: string;
    id?: string;
    name?: string;
    type?: string;
    value?: string | number;
    readOnly?: boolean;
    required?: boolean;
    maxLength?: number;
    min?: number;
    max?: number;
    checked?: boolean;
    accept?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ children, id, type = 'text', value, onChange, ...props }: InputProps) => (
    <div className={styles.wrapper}>
        <input
            type={type}
            className={styles.input}
            value={value}
            placeholder={children}
            id={id}
            onChange={onChange}
            {...props}
        />
    </div>
);

export default Input;
