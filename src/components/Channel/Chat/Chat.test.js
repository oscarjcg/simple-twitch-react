import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import Chat from './Chat';
import Comment from './CommentList/Comment/Comment';
import { renderWithRouter } from '../../../testUtils';

describe('Comment', () => {
    it('shows the author and the text', () => {
        renderWithRouter(<Comment author="alex" comment="hello there" />);
        expect(screen.getByText('alex:')).toBeInTheDocument();
        expect(screen.getByText('hello there')).toBeInTheDocument();
    });
});

describe('Chat', () => {
    const comments = [
        { created_at: '1', author: 'alex', comment: 'first' },
        { created_at: '2', author: 'steve', comment: 'second' },
    ];

    it('renders the title and every comment in order', () => {
        renderWithRouter(<Chat comments={comments} addComment={() => {}} />);

        expect(screen.getByText('CHAT')).toBeInTheDocument();
        const texts = screen.getAllByText(/first|second/).map(el => el.textContent);
        expect(texts).toEqual(['first', 'second']);
    });

    it('renders without comments', () => {
        renderWithRouter(<Chat comments={null} addComment={() => {}} />);
        expect(screen.getByPlaceholderText('Send a message')).toBeInTheDocument();
    });

    it('scrolls the comment list to the bottom', () => {
        const scrollTo = jest.spyOn(Element.prototype, 'scrollTo').mockImplementation(() => {});
        renderWithRouter(<Chat comments={comments} addComment={() => {}} />);
        expect(scrollTo).toHaveBeenCalled();
    });

    it('passes key presses in the input to addComment', () => {
        const addComment = jest.fn();
        renderWithRouter(<Chat comments={[]} addComment={addComment} />);

        fireEvent.keyDown(screen.getByPlaceholderText('Send a message'), { key: 'Enter', keyCode: 13 });

        expect(addComment).toHaveBeenCalledTimes(1);
        expect(addComment.mock.calls[0][0].keyCode).toBe(13);
    });
});
