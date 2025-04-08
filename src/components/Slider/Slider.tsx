import React, { useState } from 'react';
import styles from 'components/Slider/Slider.module.scss';

interface ISliderProps {
    max: number;
    onChange: (value: number) => void;
}

const Slider = ({ max, onChange }: ISliderProps) => {
    const [value, setValue] = useState(1); // Początkowa wartość slidera

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        console.log('wartość value:', newValue - 1);
        onChange(newValue - 1);
    };

    return (
        <div className={styles.slider}>
            <label>
                Krok: {value}
                <input type="range" min="1" max={max} value={value} onChange={handleChange} />
            </label>
        </div>
    );
};

export default Slider;
