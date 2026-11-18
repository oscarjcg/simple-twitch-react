import { createAppStore, AppStore } from '../index';
import * as actions from './index';
import { mockGet, mockPost, httpError, flushPromises, categoryApi, aComment } from '../../testUtils';

describe('comment actions', () => {
    let store: AppStore;
    beforeEach(() => { store = createAppStore(); });

    it('fetchComments loads the comments of a channel id', async () => {
        mockGet({ '/api/comment/7': [{ author: 'alex', comment: 'hi' }] });

        store.dispatch(actions.fetchComments(7));
        await flushPromises();

        expect(store.getState().comment.comments).toEqual([{ author: 'alex', comment: 'hi' }]);
    });

    it('fetchComments stores the error on failure', async () => {
        mockGet({ '/api/comment/7': httpError(500) });

        store.dispatch(actions.fetchComments(7));
        await flushPromises();

        expect(store.getState().comment.error).toBeTruthy();
    });

    it('fetchCommentsByName copies text into comment', async () => {
        mockGet({ '/api/comment/ByChannelName/steve': [aComment({ text: 'hello' })] });

        store.dispatch(actions.fetchCommentsByName('steve'));
        await flushPromises();

        expect(store.getState().comment.comments![0]).toMatchObject({ author: 'alex', text: 'hello', comment: 'hello' });
    });

    it('fetchCommentsByName stores the error on failure', async () => {
        mockGet({ '/api/comment/ByChannelName/steve': httpError(500) });

        store.dispatch(actions.fetchCommentsByName('steve'));
        await flushPromises();

        expect(store.getState().comment.comments).toBeNull();
        expect(store.getState().comment.error).toBeTruthy();
    });

    it('addComment posts the comment as form data', async () => {
        mockPost({});

        store.dispatch(actions.addComment(7, 'nice stream', 'ReactApp'));
        await flushPromises();

        expect(categoryApi.post).toHaveBeenCalledTimes(1);
        const [url, body] = categoryApi.post.mock.calls[0];
        expect(url).toBe('/api/comment');
        expect(body).toBeInstanceOf(FormData);
        expect((body as FormData).get('channel_id')).toBe('7');
        expect((body as FormData).get('comment')).toBe('nice stream');
        expect((body as FormData).get('author')).toBe('ReactApp');
        expect(store.getState().comment.error).toBeNull();
    });

    it('addComment failure does not throw', async () => {
        mockPost(httpError(500));

        store.dispatch(actions.addComment(7, 'x', 'ReactApp'));
        await flushPromises();

        expect(store.getState().comment.error).toBeNull();
    });

    it('updateComments stores the update flag', () => {
        store.dispatch(actions.updateComments(true));
        expect(store.getState().comment.updateComments).toBe(true);
    });
});
