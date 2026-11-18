import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategoryList from './CategoryList';
import { aCategory } from '../../testUtils';

describe('CategoryList', () => {
    it('shows a spinner while categories are loading', () => {
        const { container } = render(<CategoryList categories={null} selectCategory={() => {}} />);
        expect(container.querySelector('.Spinner')).toBeInTheDocument();
        expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    it('shows an error when loading failed', () => {
        const { container } = render(<CategoryList categories={null} selectCategory={() => {}} error={new Error('x')} />);
        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(container.querySelector('.Spinner')).not.toBeInTheDocument();
    });

    it('renders every category with its image', () => {
        render(<CategoryList categories={[aCategory(), aCategory({ id: 2, name: 'Zelda', image: 'zelda.png' })]} selectCategory={() => {}} />);

        expect(screen.getByText('Minecraft')).toBeInTheDocument();
        expect(screen.getByAltText('Zelda')).toHaveAttribute('src', 'zelda.png');
    });

    it('selects a category by clicking its name or image', async () => {
        const user = userEvent.setup();
        const selectCategory = jest.fn();
        render(<CategoryList categories={[aCategory()]} selectCategory={selectCategory} />);

        await user.click(screen.getByText('Minecraft'));
        await user.click(screen.getByAltText('Minecraft'));

        expect(selectCategory).toHaveBeenCalledTimes(2);
        expect(selectCategory).toHaveBeenCalledWith('Minecraft');
    });
});
