import type { UnknownAction } from '@reduxjs/toolkit';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import type { Comment, RequestError } from '../../types';

export interface CommentState {
    comments: Comment[] | null;
    error: RequestError | null;
    updateComments: boolean | null;
}

interface CommentAction {
    type: string;
    comments?: Comment[];
    error?: RequestError;
    updateComments?: boolean | null;
}

const initialState: CommentState = {
    comments: null,
    error: null,
    updateComments: null
};

const fetchCommentsSuccess = (state: CommentState, action: CommentAction) => {
    return updateObject(state, {
        comments: action.comments,
        error: null
    });
};

const fetchCommentsFail = (state: CommentState, action: CommentAction) => {
    return updateObject(state, {
        error: action.error
    });
};

const addCommentSuccess = (state: CommentState, action: CommentAction) => {
    return updateObject(state, {
        error: null
    });
};

const updateCommentsSucess = (state: CommentState, action: CommentAction) => {
    return updateObject(state, {
        updateComments: action.updateComments
    });
};

const reducer = (state: CommentState = initialState, unknownAction: UnknownAction): CommentState => {
    const action = unknownAction as CommentAction;
    switch(action.type) {
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL:
            return fetchCommentsFail(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS:
            return addCommentSuccess(state, action);
        case actionTypes.UPDATE_COMMENTS_SUCCESS:
            return updateCommentsSucess(state, action);
        default:
            return state;
    }
}

export default reducer;
