import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import Browse from './Browse';
import { renderWithProviders, mockGet, httpError, currentPath, aCategory, aChannel } from '../../testUtils';

const categories = [aCategory(), aCategory({ id: 2, name: 'Zelda' }), aCategory({ id: 3, name: 'Mario Kart' })];
const channels = [aChannel(), aChannel({ id: 2, name: 'alex' }), aChannel({ id: 3, name: 'stevie' })];

const renderBrowse = (route = '/directory') =>
    renderWithProviders(<Browse />, { route, path: '/directory/*' });

describe('Browse', () => {
    beforeEach(() => {
        mockGet({ '/api/category': categories, '/api/channel': channels });
    });

    it('shows the tabs and the categories on /directory', async () => {
        renderBrowse();

        expect(screen.getByRole('heading', { name: 'Browse' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Categories' })).toHaveClass('active');
        expect(await screen.findByText('Zelda')).toBeInTheDocument();
        expect(screen.getByText('Mario Kart')).toBeInTheDocument();
        expect(screen.queryByText('alex')).not.toBeInTheDocument();
    });

    it('shows the live channels on /directory/all', async () => {
        renderBrowse('/directory/all');

        expect(await screen.findByText('alex')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Live Channels' })).toHaveClass('active');
        expect(screen.queryByText('Zelda')).not.toBeInTheDocument();
    });

    it('filters categories while typing (debounced, case insensitive)', async () => {
        const { user } = renderBrowse();
        await screen.findByText('Zelda');

        await user.type(screen.getByPlaceholderText('Search'), 'ZEL');

        await waitFor(() => expect(screen.queryByText('Minecraft')).not.toBeInTheDocument());
        expect(screen.getByText('Zelda')).toBeInTheDocument();
    });

    it('filters channels on /directory/all', async () => {
        const { user } = renderBrowse('/directory/all');
        await screen.findByText('alex');

        await user.type(screen.getByPlaceholderText('Search'), 'stev');

        await waitFor(() => expect(screen.queryByText('alex')).not.toBeInTheDocument());
        expect(screen.getByText('steve')).toBeInTheDocument();
        expect(screen.getByText('stevie')).toBeInTheDocument();
    });

    it('opens the game page when a category is clicked', async () => {
        const { user } = renderBrowse();

        await user.click(await screen.findByText('Zelda'));

        expect(currentPath(screen)).toBe('/directory/game/Zelda');
    });

    it('opens the channel page when a channel is clicked', async () => {
        const { user } = renderBrowse('/directory/all');

        await user.click(await screen.findByText('alex'));

        expect(currentPath(screen)).toBe('/alex');
    });

    it('shows an error when categories cannot be loaded', async () => {
        mockGet({ '/api/category': httpError(500), '/api/channel': channels });
        renderBrowse();

        expect(await screen.findByText('Error')).toBeInTheDocument();
    });
});
