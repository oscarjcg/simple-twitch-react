import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import io from 'socket.io-client';

import ChannelCont from './ChannelCont';
import { renderWithProviders, mockGet, mockPost, httpError, pressEnter, categoryApi, aChannel, aComment } from '../../testUtils';

const renderChannelPage = () =>
    renderWithProviders(<ChannelCont />, { route: '/steve', path: '/:channel' });

describe('ChannelCont', () => {
    beforeEach(() => {
        mockGet({
            '/api/channel/byname/steve': aChannel({ id: 7 }),
            '/api/comment/ByChannelName/steve': [aComment({ text: 'first!' })],
        });
        mockPost({});
    });

    it('shows a spinner, then the channel with its video and comments', async () => {
        const { container } = renderChannelPage();
        expect(container.querySelector('.Spinner')).toBeInTheDocument();

        expect(await screen.findByTestId('youtube')).toHaveAttribute('data-video-id', 'LembwKDo1Dk');
        expect(screen.getByText('steve')).toBeInTheDocument();
        expect(await screen.findByText('first!')).toBeInTheDocument();
        expect(screen.getByText('alex:')).toBeInTheDocument();
    });

    it('uses a 16:9 player sized from the stored header width', async () => {
        const { store } = renderChannelPage();
        await screen.findByTestId('youtube');

        act(() => store.dispatch({ type: 'UPDATE_HEADER_CHANNEL_WIDTH', headerChannelWidth: 1600 }));

        expect(screen.getByTestId('youtube')).toHaveAttribute('data-width', '1600');
        expect(screen.getByTestId('youtube')).toHaveAttribute('data-height', '900');
    });

    it('sends a comment on Enter and clears the input', async () => {
        const { user } = renderChannelPage();
        const input = await screen.findByPlaceholderText('Send a message');

        await user.type(input, 'nice stream');
        expect(categoryApi.post).not.toHaveBeenCalled();

        pressEnter(input);

        expect(categoryApi.post).toHaveBeenCalledTimes(1);
        const body = categoryApi.post.mock.calls[0][1];
        expect(body.get('channel_id')).toBe('7');
        expect(body.get('comment')).toBe('nice stream');
        expect(body.get('author')).toBe('ReactApp');
        expect(input).toHaveValue('');
    });

    it('reloads the comments when the socket announces a new message', async () => {
        renderChannelPage();
        await screen.findByText('first!');

        mockGet({
            '/api/channel/byname/steve': aChannel({ id: 7 }),
            '/api/comment/ByChannelName/steve': [aComment({ text: 'first!' }), aComment({ created_at: '2', text: 'second' })],
        });
        act(() => io.lastSocket().serverEmit('newMessage', {}));

        expect(await screen.findByText('second')).toBeInTheDocument();
    });

    it('shows an error when the channel does not exist', async () => {
        mockGet({
            '/api/channel/byname/steve': httpError(404),
            '/api/comment/ByChannelName/steve': [],
        });
        const { container } = renderChannelPage();

        expect(await screen.findByText('Error')).toBeInTheDocument();
        await waitFor(() => expect(container.querySelector('.Spinner')).not.toBeInTheDocument());
    });
});
