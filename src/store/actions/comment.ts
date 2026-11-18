import axios from '../../axios/axios-category';
import * as actionsTypes from './actionTypes';
import type { AppThunk } from '../index';
import type { Comment, RequestError } from '../../types';

// Fetch comments
export const fetchCommentsSuccess = (comments: Comment[]) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
};

export const fetchCommentsFail = (error: RequestError) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
};

export const fetchComments = (channelId: number): AppThunk => {
    return dispatch => {
        console.log("fetchComments");
        axios.get<Comment[]>('api/comment/' + channelId)
            .then(res => {
                let comments = res.data.map(comment => {
                    return comment;
                });

                dispatch(fetchCommentsSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err));
            });
    };
};

// Fetch comments by channel name
export const fetchCommentsByNameSuccess = (comments: Comment[]) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
};

export const fetchCommentsByNameFail = (error: RequestError) => {
    return {
        type: actionsTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
};

export const fetchCommentsByName = (channelName: string): AppThunk => {
    return dispatch => {
        axios.get<Comment[]>('/api/comment/ByChannelName/' + channelName)
            .then(res => {
                let comments = res.data.map(comment => {
                    comment.comment = comment.text
                    return comment;
                });

                dispatch(fetchCommentsByNameSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsByNameFail(err));
            });
    };
};

// Add comment
export const addCommentSuccess = () => {
    return {
        type: actionsTypes.ADD_COMMENT_SUCCESS
    }
};

export const addCommentFail = (error: RequestError) => {
    return {
        type: actionsTypes.ADD_COMMENT_FAIL,
        error: error
    }
};

export const addComment = (channelId: number, comment: string, author: string): AppThunk => {
    return dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.append('channel_id', String(channelId));
        bodyFormData.append('author', author);
        bodyFormData.append('comment', comment);

        axios.post('/api/comment', bodyFormData)
        .then(res => {
            dispatch(addCommentSuccess());
        })
        .catch(err => {
            dispatch(addCommentFail(err));
        });

    };
};

// Request update
export const updateComments = (update: boolean | null): AppThunk => {

    return dispatch => {
        dispatch(
            {
                type: actionsTypes.UPDATE_COMMENTS_SUCCESS,
                updateComments: update
            }
        );
    };
};
