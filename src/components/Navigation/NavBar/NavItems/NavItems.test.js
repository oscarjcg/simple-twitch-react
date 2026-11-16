import React from 'react';
import { screen } from '@testing-library/react';

import NavItems from './NavItems';
import NavTab from '../../NavTab/NavTab';
import { renderWithRouter, currentPath } from '../../../../testUtils';

const items = [
    { link: '/', text: 'Discover', exact: true },
    { link: '/directory', text: 'Browse', exact: false },
];

describe('NavItems', () => {
    it('renders a link per item', () => {
        renderWithRouter(<ul><NavItems items={items} /></ul>);

        expect(screen.getByRole('link', { name: 'Discover' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Browse' })).toHaveAttribute('href', '/directory');
    });

    it('marks the current route as active (exact match for "/")', () => {
        renderWithRouter(<ul><NavItems items={items} /></ul>, { route: '/directory/all' });

        expect(screen.getByRole('link', { name: 'Browse' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Discover' })).not.toHaveClass('active');
    });

    it('navigates on click', async () => {
        const { user } = renderWithRouter(<NavTab tabs={items} />);

        await user.click(screen.getByRole('link', { name: 'Browse' }));

        expect(currentPath(screen)).toBe('/directory');
    });
});
