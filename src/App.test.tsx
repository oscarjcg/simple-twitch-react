import React from 'react';
import { screen, within } from '@testing-library/react';

import App from './App';
import { renderWithProviders, mockGet, currentPath, aCategory, aChannel, aComment } from './testUtils';

const api = {
    '/api/channel': [aChannel(), aChannel({ id: 2, name: 'alex' })],
    '/api/category': [aCategory(), aCategory({ id: 2, name: 'Zelda' })],
    '/api/category/byname/Minecraft': aCategory(),
    '/api/category/byname/Minecraft/channels': [aChannel()],
    '/api/channel/byname/steve': aChannel(),
    '/api/comment/ByChannelName/steve': [aComment()],
};

const renderApp = (route: string) => renderWithProviders(<App />, { route });

describe('App', () => {
    beforeEach(() => mockGet(api));

    it('renders the layout: navbar, popular channels sidebar and stores the header height', async () => {
        const { store } = renderApp('/');

        expect(screen.getByText('Simple Twitch')).toBeInTheDocument();
        expect(screen.getByText('Popular channels')).toBeInTheDocument();
        expect(await screen.findAllByText('alex')).not.toHaveLength(0);
        expect(store.getState().userInterface.headerHeight).toEqual(expect.any(Number));
    });

    it('/ shows Discover', async () => {
        renderApp('/');
        expect(screen.getByText('categories')).toBeInTheDocument();
        expect(screen.getByText('Simulation')).toBeInTheDocument();
        expect(await screen.findAllByText('alex')).not.toHaveLength(0);
    });

    it('/directory shows Browse', async () => {
        renderApp('/directory');
        expect(screen.getByRole('heading', { name: 'Browse' })).toBeInTheDocument();
        expect(await screen.findByText('Zelda')).toBeInTheDocument();
    });

    it('/directory/game/:category shows the game page', async () => {
        renderApp('/directory/game/Minecraft');
        expect(await screen.findByRole('heading', { name: 'Minecraft' })).toBeInTheDocument();
    });

    it('/:channel shows the channel page', async () => {
        renderApp('/steve');
        expect(await screen.findByTestId('youtube')).toBeInTheDocument();
        expect(await screen.findByText('hello')).toBeInTheDocument();
    });

    it('navigates from the navbar to Browse', async () => {
        const { user } = renderApp('/');

        await user.click(within(screen.getByRole('banner')).getByRole('link', { name: 'Browse' }));

        expect(currentPath(screen)).toBe('/directory');
        expect(screen.getByRole('heading', { name: 'Browse' })).toBeInTheDocument();
    });

    it('opens a channel from the sidebar', async () => {
        const { user } = renderApp('/directory');

        const sidebar = screen.getByText('Popular channels').parentElement;
        await user.click(await within(sidebar!).findByText('steve'));

        expect(currentPath(screen)).toBe('/steve');
        expect(await screen.findByTestId('youtube')).toBeInTheDocument();
    });
});
