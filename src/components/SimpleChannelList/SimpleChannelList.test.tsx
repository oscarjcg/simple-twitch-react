import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SimpleChannelList from './SimpleChannelList';
import { aChannel } from '../../testUtils';

describe('SimpleChannelList', () => {
    it('shows only the title when there are no channels yet', () => {
        render(<SimpleChannelList channels={null} selectChannel={() => {}} />);
        expect(screen.getByText('Popular channels')).toBeInTheDocument();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('lists channels and selects one on click', async () => {
        const user = userEvent.setup();
        const selectChannel = jest.fn();
        render(<SimpleChannelList channels={[aChannel(), aChannel({ id: 2, name: 'alex' })]} selectChannel={selectChannel} />);

        await user.click(screen.getByText('alex'));
        await user.click(screen.getByAltText('steve'));

        expect(selectChannel.mock.calls).toEqual([['alex'], ['steve']]);
    });
});
