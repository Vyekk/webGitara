import { render } from '@testing-library/react';
import Fretboard from './Fretboard';

describe('Fretboard', () => {
    it('renderuje odpowiednią liczbę strun i progów', () => {
        const { container } = render(
            <Fretboard
                numberOfStrings={6}
                numberOfFrets={5}
                notesToShow={{ prevStep: null, step: null, nextStep: null }}
                isReversed={false}
            />,
        );
        // 6 strun
        expect(container.querySelectorAll('[data-testid="string"]').length).toBe(6);
        // 6 progów na każdej strunie (0-5)
        expect(container.querySelectorAll('[data-testid="noteFret"]').length).toBe(6 * 6);
    });
});
