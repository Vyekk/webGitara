import { render, screen, fireEvent } from '@testing-library/react';
import Radio from './FormRadio';

describe('FormRadio', () => {
    it('renderuje radio z odpowiednią wartością i labelką', () => {
        render(<Radio name="testRadio" value="Opcja1" checked={false} onChange={() => {}} />);
        expect(screen.getByLabelText('Opcja1')).toBeInTheDocument();
        expect(screen.getByRole('radio')).toHaveAttribute('name', 'testRadio');
    });

    it('wywołuje onChange po kliknięciu', () => {
        const handleChange = jest.fn();
        render(<Radio name="testRadio" value="Opcja2" checked={false} onChange={handleChange} />);
        fireEvent.click(screen.getByLabelText('Opcja2'));
        expect(handleChange).toHaveBeenCalled();
    });
});
