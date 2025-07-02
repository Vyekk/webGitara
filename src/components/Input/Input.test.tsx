import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
    it('renderuje input z placeholderem', () => {
        render(<Input id="test-input">Wpisz coś</Input>);
        expect(screen.getByPlaceholderText('Wpisz coś')).toBeInTheDocument();
    });

    it('wywołuje onChange po zmianie wartości', () => {
        const handleChange = jest.fn();
        render(
            <Input id="test-input" onChange={handleChange}>
                Test
            </Input>,
        );
        fireEvent.change(screen.getByPlaceholderText('Test'), { target: { value: 'nowa wartość' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
