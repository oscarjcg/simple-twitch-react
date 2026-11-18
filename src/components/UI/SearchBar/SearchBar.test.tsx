import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';

import SearchBar from './SearchBar';
import * as actions from '../../../store/actions/index';
import { renderWithProviders } from '../../../testUtils';
import type { SearchResult } from '../../../types';

const results: SearchResult[] = [
    { type: 'channel', name: 'steve', image: 'steve.png' },
    { type: 'category', name: 'Minecraft', image: 'mc.png' },
];

const setup = ({ visible = true, ...props } = {}) => {
    const handlers = {
        search: jest.fn(),
        searchButton: jest.fn(),
        selectSearch: jest.fn(),
        visibilitySearchResults: jest.fn(),
    };
    const utils = renderWithProviders(
        <div>
            <SearchBar searchResult={results} {...handlers} {...props} />
            <p>outside</p>
        </div>
    );
    if (visible) act(() => { utils.store.dispatch(actions.visibilityNavBarSearchResults(true)); });
    return { ...utils, ...handlers };
};

describe('SearchBar', () => {
    it('hides the results unless the dropdown is visible', () => {
        setup({ visible: false });
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('links channels to their page and categories to the game page', async () => {
        setup();

        expect(await screen.findByRole('link', { name: 'steve' })).toHaveAttribute('href', '/steve');
        expect(screen.getByRole('link', { name: 'Minecraft' })).toHaveAttribute('href', '/directory/game/Minecraft');
    });

    it('selects a result by clicking its link or image', async () => {
        const { user, selectSearch } = setup();

        await user.click(await screen.findByRole('link', { name: 'Minecraft' }));
        await user.click(screen.getByAltText('steve'));

        expect(selectSearch.mock.calls).toEqual([['category', 'Minecraft'], ['channel', 'steve']]);
    });

    it('calls search on typing and searchButton on the icon', async () => {
        const { user, search, searchButton, container } = setup();

        await user.type(screen.getByPlaceholderText('Search'), 'ab');
        await user.click(container.querySelector('.IconContainer')!);

        expect(search).toHaveBeenCalled();
        expect(search.mock.calls.at(-1)![0].target.value).toBe('ab');
        expect(searchButton).toHaveBeenCalledTimes(1);
    });

    it('closes the dropdown when clicking outside', () => {
        const { visibilitySearchResults } = setup();

        fireEvent.mouseDown(screen.getByPlaceholderText('Search'));
        expect(visibilitySearchResults).not.toHaveBeenCalled();

        fireEvent.mouseDown(screen.getByText('outside'));
        expect(visibilitySearchResults).toHaveBeenCalledWith(false);
    });

    it('removes the outside-click listener on unmount', () => {
        const { unmount, visibilitySearchResults } = setup();
        unmount();
        fireEvent.mouseDown(document.body);
        expect(visibilitySearchResults).not.toHaveBeenCalled();
    });
});
