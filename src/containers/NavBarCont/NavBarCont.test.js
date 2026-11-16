import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import NavBarCont from './NavBarCont';
import { renderWithProviders, mockGet, currentPath, categoryApi } from '../../testUtils';

const searchResponse = {
    channels: [{ name: 'minerva', image: 'minerva.png' }],
    categories: [{ name: 'Minecraft', image: 'mc.png' }],
};

describe('NavBarCont', () => {
    beforeEach(() => {
        mockGet({ '/api/search/min': searchResponse });
    });

    it('shows the brand and the main links', () => {
        renderWithProviders(<NavBarCont />);

        expect(screen.getByText('Simple Twitch')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Discover' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Browse' })).toHaveAttribute('href', '/directory');
    });

    it('searches while typing (debounced) and shows channels and categories', async () => {
        const { user, store } = renderWithProviders(<NavBarCont />);

        await user.type(screen.getByPlaceholderText('Search'), 'min');

        expect(await screen.findByRole('link', { name: 'minerva' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Minecraft' })).toBeInTheDocument();
        expect(store.getState().userInterface.navBarSearchText).toBe('min');
        expect(categoryApi.get).toHaveBeenCalledTimes(1);
        expect(categoryApi.get).toHaveBeenCalledWith('/api/search/min');
    });

    it('navigates to a category result and closes the dropdown', async () => {
        const { user } = renderWithProviders(<NavBarCont />);
        await user.type(screen.getByPlaceholderText('Search'), 'min');

        await user.click(await screen.findByRole('link', { name: 'Minecraft' }));

        expect(currentPath(screen)).toBe('/directory/game/Minecraft');
        expect(screen.queryByRole('link', { name: 'Minecraft' })).not.toBeInTheDocument();
    });

    it('navigates to a channel result', async () => {
        const { user } = renderWithProviders(<NavBarCont />);
        await user.type(screen.getByPlaceholderText('Search'), 'min');

        await user.click(await screen.findByRole('link', { name: 'minerva' }));

        expect(currentPath(screen)).toBe('/minerva');
    });

    it('closes the dropdown when clicking outside', async () => {
        const { user } = renderWithProviders(<NavBarCont />);
        await user.type(screen.getByPlaceholderText('Search'), 'min');
        await screen.findByRole('link', { name: 'minerva' });

        fireEvent.mouseDown(screen.getByText('Simple Twitch'));

        await waitFor(() => expect(screen.queryByRole('link', { name: 'minerva' })).not.toBeInTheDocument());
    });

    it('searches immediately with the search icon', async () => {
        const { user, store, container } = renderWithProviders(<NavBarCont />);
        act(() => { store.dispatch({ type: 'UPDATE_NAVBAR_SEARCH_TEXT', searchText: 'min' }); });

        await user.click(container.querySelector('.IconContainer'));

        expect(await screen.findByRole('link', { name: 'minerva' })).toBeInTheDocument();
    });
});
