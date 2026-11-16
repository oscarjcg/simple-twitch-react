import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChannelList from './ChannelList';
import { aChannel } from '../../testUtils';

describe('ChannelList', () => {
    it('shows a spinner while channels are loading', () => {
        const { container } = render(<ChannelList channels={null} />);
        expect(container.querySelector('.Spinner')).toBeInTheDocument();
    });

    it('shows an error when loading failed', () => {
        render(<ChannelList channels={null} error={new Error('x')} />);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders preview, avatar and name for each channel', () => {
        render(<ChannelList channels={[aChannel(), aChannel({ id: 2, name: 'alex' })]} />);

        const [preview, avatar] = screen.getAllByAltText('steve');
        expect(preview).toHaveAttribute('src', 'steve-preview.png');
        expect(avatar).toHaveAttribute('src', 'steve.png');
        expect(screen.getByText('alex')).toBeInTheDocument();
    });

    it('selects a channel from the preview or the name', async () => {
        const user = userEvent.setup();
        const selectChannel = jest.fn();
        render(<ChannelList channels={[aChannel()]} selectChannel={selectChannel} />);

        await user.click(screen.getAllByAltText('steve')[0]);
        await user.click(screen.getByText('steve'));

        expect(selectChannel).toHaveBeenCalledTimes(2);
        expect(selectChannel).toHaveBeenCalledWith('steve');
    });
});
