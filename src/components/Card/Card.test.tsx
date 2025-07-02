import { render, screen } from '@testing-library/react';
import Card from './Card';

it('renderuje Card z tytułem i dziećmi', () => {
    render(
        <Card title="Testowy tytuł">
            <li>Element 1</li>
            <li>Element 2</li>
        </Card>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Testowy tytuł');
    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('Element 2')).toBeInTheDocument();
});
