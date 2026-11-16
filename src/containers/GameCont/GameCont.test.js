import React from 'react';
import { screen } from '@testing-library/react';

import GameCont from './GameCont';
import { renderWithProviders, mockGet, httpError, currentPath, pressEnter, aCategory, aChannel } from '../../testUtils';

const renderGame = () =>
    renderWithProviders(<GameCont />, { route: '/directory/game/Minecraft', path: '/directory/game/:category' });

describe('GameCont', () => {
    beforeEach(() => {
        mockGet({
            '/api/category/byname/Minecraft': aCategory(),
            '/api/category/byname/Minecraft/channels': [aChannel(), aChannel({ id: 2, name: 'alex' })],
        });
    });

    it('shows the category header, the tab and its channels', async () => {
        renderGame();

        expect(await screen.findByRole('heading', { name: 'Minecraft' })).toBeInTheDocument();
        expect(screen.getByAltText('Minecraft')).toHaveAttribute('src', 'minecraft.png');
        expect(screen.getByRole('link', { name: 'Live Channels' })).toHaveAttribute('href', '/directory/game/Minecraft');
        expect(await screen.findByText('alex')).toBeInTheDocument();
        expect(screen.getByText('steve')).toBeInTheDocument();
    });

    it('filters channels when pressing Enter in the filter', async () => {
        const { user } = renderGame();
        await screen.findByText('alex');

        const input = screen.getByPlaceholderText('Search');
        await user.type(input, 'ALE');
        expect(screen.getByText('steve')).toBeInTheDocument();

        pressEnter(input);

        expect(screen.queryByText('steve')).not.toBeInTheDocument();
        expect(screen.getByText('alex')).toBeInTheDocument();
    });

    it('filters channels when clicking the search icon', async () => {
        const { user, container } = renderGame();
        await screen.findByText('alex');

        await user.type(screen.getByPlaceholderText('Search'), 'stev');
        await user.click(container.querySelector('.IconContainer'));

        expect(screen.queryByText('alex')).not.toBeInTheDocument();
    });

    it('opens a channel on click', async () => {
        const { user } = renderGame();

        await user.click(await screen.findByText('alex'));

        expect(currentPath(screen)).toBe('/alex');
    });

    it('shows an error in the header and in the channel list when the API fails', async () => {
        mockGet({
            '/api/category/byname/Minecraft': httpError(500),
            '/api/category/byname/Minecraft/channels': httpError(500),
        });
        const { container } = renderGame();

        expect(await screen.findAllByText('Error')).toHaveLength(2);
        expect(container.querySelector('.Spinner')).not.toBeInTheDocument();
    });
});
