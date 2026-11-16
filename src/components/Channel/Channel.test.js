import React from 'react';
import { act, screen } from '@testing-library/react';
import io from 'socket.io-client';

import Channel from './Channel';
import { MODELS_3D_URL, SOCKET_URL } from '../../config';
import { renderWithProviders, aChannel } from '../../testUtils';

const renderChannel = (props = {}) => {
    const handlers = {
        selectChannel: jest.fn(),
        headerChannelWidth: jest.fn(),
        addComment: jest.fn(),
        updateComments: jest.fn(),
    };
    const utils = renderWithProviders(
        <Channel
            channel={{ ...aChannel(), type: 1 }}
            videoWidth={640}
            videoHeight={360}
            comments={[{ created_at: '1', author: 'alex', comment: 'hello' }]}
            {...handlers}
            {...props} />,
        { route: '/steve', path: '/:channel' }
    );
    return { ...utils, ...handlers };
};

describe('Channel', () => {
    it('shows the header, the chat and reports its width on mount', () => {
        const { headerChannelWidth } = renderChannel();

        expect(screen.getByText('steve')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/steve');
        expect(screen.getByText('hello')).toBeInTheDocument();
        expect(headerChannelWidth).toHaveBeenCalledWith(expect.any(Number));
    });

    it('renders the YouTube player for type 1 channels', () => {
        renderChannel();

        const player = screen.getByTestId('youtube');
        expect(player).toHaveAttribute('data-video-id', 'LembwKDo1Dk');
        expect(player).toHaveAttribute('data-width', '640');
        expect(player).toHaveAttribute('data-height', '360');
    });

    it('renders the 3D viewer for type 2 channels', () => {
        const { container } = renderChannel({ channel: { ...aChannel({ content: 'chair' }), type: 2 } });

        expect(screen.queryByTestId('youtube')).not.toBeInTheDocument();
        expect(container.querySelector('iframe')).toHaveAttribute('src', MODELS_3D_URL + 'chair');
    });

    it('renders no content for unknown types', () => {
        const { container } = renderChannel({ channel: { ...aChannel(), type: 99 } });

        expect(screen.queryByTestId('youtube')).not.toBeInTheDocument();
        expect(container.querySelector('iframe')).not.toBeInTheDocument();
    });

    it('connects to the chat socket, shows viewers and refreshes comments on new messages', () => {
        const { updateComments } = renderChannel();
        const socket = io.lastSocket();

        expect(socket.url).toBe(SOCKET_URL);
        expect(screen.getByText('People: 0')).toBeInTheDocument();

        act(() => socket.serverEmit('totalConnections', 12));
        expect(screen.getByText('People: 12')).toBeInTheDocument();

        act(() => socket.serverEmit('newMessage', {}));
        expect(updateComments).toHaveBeenCalledTimes(1);
    });

    it('disconnects the socket on unmount', () => {
        const { unmount } = renderChannel();
        const socket = io.lastSocket();

        unmount();

        expect(socket.connected).toBe(false);
    });

    it('selects the channel when clicking its name', async () => {
        const { user, selectChannel } = renderChannel();

        await user.click(screen.getByText('steve'));

        expect(selectChannel).toHaveBeenCalledWith('steve');
    });
});
