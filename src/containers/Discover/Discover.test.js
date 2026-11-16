import React from 'react';
import { screen, within } from '@testing-library/react';

import Discover from './Discover';
import { renderWithProviders, mockGet, currentPath, aCategory, aChannel } from '../../testUtils';

const WIDTH = 330;

beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => WIDTH });
});

afterAll(() => {
    delete HTMLElement.prototype.clientWidth;
});

const categories = ['A', 'B', 'C', 'D', 'E'].map((name, i) => aCategory({ id: i, name: 'cat' + name }));
const channels = ['a', 'b', 'c'].map((name, i) => aChannel({ id: i, name: 'chan' + name }));

const section = (title) => screen.getByText(title).closest('div');

describe('Discover', () => {
    beforeEach(() => {
        mockGet({ '/api/category': categories, '/api/channel': channels });
    });

    it('shows one row of each list and a "Show more" link', async () => {
        renderWithProviders(<Discover />);

        expect(await screen.findByText('catA')).toBeInTheDocument();
        expect(screen.getByText('catB')).toBeInTheDocument();
        expect(screen.queryByText('catC')).not.toBeInTheDocument();

        expect(await screen.findByText('chana')).toBeInTheDocument();
        expect(screen.queryByText('chanb')).not.toBeInTheDocument();

        expect(screen.getAllByText('Show more')).toHaveLength(2);
    });

    it('"Show more" expands a list to two rows', async () => {
        const { user } = renderWithProviders(<Discover />);
        await screen.findByText('catA');

        const categoriesSection = section('categories');
        await user.click(within(categoriesSection).getByText('Show more'));

        expect(screen.getByText('catC')).toBeInTheDocument();
        expect(screen.getByText('catD')).toBeInTheDocument();
        expect(screen.queryByText('catE')).not.toBeInTheDocument();
        expect(screen.getAllByText('Show more')).toHaveLength(1);
    });

    it('hides "Show more" when everything fits in one row', async () => {
        mockGet({ '/api/category': categories.slice(0, 2), '/api/channel': channels.slice(0, 1) });
        renderWithProviders(<Discover />);

        await screen.findByText('catB');
        await screen.findByText('chana');

        expect(screen.queryByText('Show more')).not.toBeInTheDocument();
    });

    it('navigates to a category or a channel', async () => {
        const { user } = renderWithProviders(<Discover />);

        await user.click(await screen.findByText('catA'));
        expect(currentPath(screen)).toBe('/directory/game/catA');

        await user.click(screen.getByText('chana'));
        expect(currentPath(screen)).toBe('/chana');
    });
});
